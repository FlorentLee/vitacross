import { eq, and, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { InsertUser, User, users, InsertPatientConsultation, InsertMedicalFile, patientConsultations, medicalFiles } from "../drizzle/schema";
import { ENV } from './_core/env';
import bcrypt from 'bcrypt';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const client = new Client({
        connectionString: process.env.DATABASE_URL,
      });
      await client.connect();
      _db = drizzle(client);
      console.log("[Database] Connected to PostgreSQL");
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// Hash password
async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Verify password
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Create or update a user (for OAuth login)
 */
export async function upsertUser(user: InsertUser): Promise<User> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    throw new Error("Database not available");
  }

  try {
    const values: InsertUser = {
      email: user.email,
      loginMethod: user.loginMethod || 'email',
    };
    const updateSet: Record<string, unknown> = {};

    // Handle OAuth IDs
    if (user.googleId) {
      values.googleId = user.googleId;
      updateSet.googleId = user.googleId;
    }
    if (user.appleId) {
      values.appleId = user.appleId;
      updateSet.appleId = user.appleId;
    }

    // Handle other fields
    if (user.name !== undefined) {
      values.name = user.name;
      updateSet.name = user.name;
    }
    if (user.avatar !== undefined) {
      values.avatar = user.avatar;
      updateSet.avatar = user.avatar;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    }

    // Auto-accept terms and subscribe to emails
    values.termsAccepted = true;
    values.subscribedToEmails = true;
    values.termsAcceptedAt = new Date();
    updateSet.termsAccepted = true;
    updateSet.subscribedToEmails = true;
    updateSet.termsAcceptedAt = new Date();

    // Update timestamp
    updateSet.lastSignedIn = new Date();
    values.lastSignedIn = new Date();

    // Check if user exists by email or OAuth ID
    let existingUser: User | undefined;
    if (user.googleId) {
      const result = await db.select().from(users).where(eq(users.googleId, user.googleId)).limit(1);
      existingUser = result[0];
    } else if (user.appleId) {
      const result = await db.select().from(users).where(eq(users.appleId, user.appleId)).limit(1);
      existingUser = result[0];
    } else if (user.email) {
      const result = await db.select().from(users).where(eq(users.email, user.email)).limit(1);
      existingUser = result[0];
    }

    if (existingUser) {
      // Update existing user
      const updatedResult = await db.update(users).set(updateSet).where(eq(users.id, existingUser.id)).returning();
      console.log("[Database] Updated user:", updatedResult[0].email);
      return updatedResult[0];
    } else {
      // Create new user
      const insertedResult = await db.insert(users).values(values).returning();
      console.log("[Database] Created new user:", insertedResult[0].email);
      return insertedResult[0];
    }
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

/**
 * Create a new user (for registration)
 */
export async function createUser(email: string, password?: string, name?: string, loginMethod: 'email' | 'google' | 'apple' = 'email'): Promise<User> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create user: database not available");
    throw new Error("Database not available");
  }

  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const userData: InsertUser = {
      email,
      loginMethod,
      termsAccepted: true, // Auto-accept terms
      subscribedToEmails: true, // Auto-subscribe to emails
      termsAcceptedAt: new Date(),
    };

    if (name) {
      userData.name = name;
    }

    if (password && loginMethod === 'email') {
      userData.passwordHash = await hashPassword(password);
    }

    const result = await db.insert(users).values(userData).returning();
    return result[0];
  } catch (error) {
    console.error("[Database] Failed to create user:", error);
    throw error;
  }
}

/**
 * Authenticate user with email and password
 */
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot authenticate user: database not available");
    throw new Error("Database not available");
  }

  try {
    const user = await getUserByEmail(email);
    if (!user || !user.passwordHash) {
      return null;
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return null;
    }

    // Update last signed in
    await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, user.id));

    return user;
  } catch (error) {
    console.error("[Database] Failed to authenticate user:", error);
    throw error;
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0];
}

/**
 * Get user by ID
 */
export async function getUserById(id: number): Promise<User | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0];
}

/**
 * Get user by Google ID
 */
export async function getUserByGoogleId(googleId: string): Promise<User | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.googleId, googleId)).limit(1);
  return result[0];
}

/**
 * Get user by Apple ID
 */
export async function getUserByAppleId(appleId: string): Promise<User | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.appleId, appleId)).limit(1);
  return result[0];
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId: number, updates: Partial<InsertUser>): Promise<User> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update user: database not available");
    throw new Error("Database not available");
  }

  try {
    const result = await db.update(users).set({ ...updates, updatedAt: new Date() }).where(eq(users.id, userId)).returning();
    if (result.length === 0) {
      throw new Error("User not found");
    }
    return result[0];
  } catch (error) {
    console.error("[Database] Failed to update user:", error);
    throw error;
  }
}

// Legacy function for compatibility (using openId)
export async function getUserByOpenId(openId: string) {
  // Try to find by googleId or appleId, or treat it as email
  let user = await getUserByGoogleId(openId);
  if (user) return user;

  user = await getUserByAppleId(openId);
  if (user) return user;

  user = await getUserByEmail(openId);
  return user;
}

// Patient consultation queries
export async function createPatientConsultation(data: InsertPatientConsultation) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create consultation: database not available");
    throw new Error("Database not available");
  }

  const result = await db.insert(patientConsultations).values(data).returning();
  return result[0];
}

export async function getPatientConsultations(limit = 10, offset = 0) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get consultations: database not available");
    return [];
  }

  return db.select().from(patientConsultations).limit(limit).offset(offset);
}

export async function getPatientConsultationById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get consultation: database not available");
    return undefined;
  }

  const result = await db.select().from(patientConsultations).where(eq(patientConsultations.id, id)).limit(1);
  return result[0];
}

export async function updatePatientConsultation(id: number, data: Partial<InsertPatientConsultation>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update consultation: database not available");
    throw new Error("Database not available");
  }

  const result = await db.update(patientConsultations).set({ ...data, updatedAt: new Date() }).where(eq(patientConsultations.id, id)).returning();
  return result[0];
}

// Medical file queries
export async function createMedicalFile(data: InsertMedicalFile) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create medical file: database not available");
    throw new Error("Database not available");
  }

  const result = await db.insert(medicalFiles).values(data).returning();
  return result[0];
}

export async function getMedicalFilesByConsultationId(consultationId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get medical files: database not available");
    return [];
  }

  return db.select().from(medicalFiles).where(eq(medicalFiles.consultationId, consultationId));
}

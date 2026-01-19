import { pgEnum, pgTable, serial, text, timestamp, varchar, boolean, index } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const roleEnum = pgEnum("role", ["user", "admin"]);

export const loginMethodEnum = pgEnum("loginMethod", ["email", "google", "apple"]);

export const users = pgTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: serial("id").primaryKey(),
  /** OAuth identifier from providers (Google, Apple) */
  googleId: varchar("googleId", { length: 255 }).unique(),
  appleId: varchar("appleId", { length: 255 }).unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }).notNull(),
  passwordHash: varchar("passwordHash", { length: 255 }), // For email/password login (optional)
  loginMethod: loginMethodEnum("loginMethod").notNull().default("email"),
  role: roleEnum("role").default("user").notNull(),

  // User avatar
  avatar: text("avatar"),

  // Terms and subscription
  termsAccepted: boolean("termsAccepted").default(true).notNull(), // Auto-accept terms
  subscribedToEmails: boolean("subscribedToEmails").default(true).notNull(), // Auto-subscribe to 163 emails
  termsAcceptedAt: timestamp("termsAcceptedAt"),

  // Email verification
  emailVerified: timestamp("emailVerified"),
  emailVerificationCode: varchar("emailVerificationCode", { length: 64 }),
  emailVerificationExpires: timestamp("emailVerificationExpires"),

  // User profile information
  phone: varchar("phone", { length: 20 }),
  country: varchar("country", { length: 100 }),
  city: varchar("city", { length: 100 }),
  address: text("address"),

  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
}, (table: typeof users) => ({
  emailIdx: index("users_email_idx").on(table.email),
}));

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Patient consultation table - stores patient consultation requests and medical files
 */
export const statusEnum = pgEnum("status", ["pending", "reviewing", "approved", "rejected", "completed"]);

export const patientConsultations = pgTable("patient_consultations", {
  id: serial("id").primaryKey(),

  // Link to user (optional, can be null for non-registered users)
  userId: serial("userId").references(() => users.id),

  // Patient basic information
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),

  // Medical information
  medicalCondition: text("medicalCondition").notNull(), // Condition description
  treatmentType: varchar("treatmentType", { length: 100 }), // Treatment type: surgery, checkup, consultation, etc.
  preferredSpecialty: varchar("preferredSpecialty", { length: 100 }), // Preferred specialty

  // File storage information
  medicalFilesUrl: text("medicalFilesUrl"), // JSON array, stores multiple file S3 URLs
  medicalFilesKey: text("medicalFilesKey"), // JSON array, stores file S3 keys

  // Status and time
  status: statusEnum("status").default("pending").notNull(),
  notes: text("notes"), // Admin notes

  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type PatientConsultation = typeof patientConsultations.$inferSelect;
export type InsertPatientConsultation = typeof patientConsultations.$inferInsert;

/**
 * Medical file table - stores metadata for uploaded medical files
 */
export const medicalFiles = pgTable("medical_files", {
  id: serial("id").primaryKey(),

  // Relation information
  consultationId: serial("consultationId").references(() => patientConsultations.id),

  // File information
  fileName: varchar("fileName", { length: 255 }).notNull(),
  fileKey: varchar("fileKey", { length: 500 }).notNull(), // S3 key
  fileUrl: text("fileUrl").notNull(), // S3 URL
  fileSize: serial("fileSize"), // File size (bytes)
  mimeType: varchar("mimeType", { length: 100 }), // File type
  fileType: varchar("fileType", { length: 50 }), // File category: report, image, test result, etc.

  // Timestamps
  uploadedAt: timestamp("uploadedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MedicalFile = typeof medicalFiles.$inferSelect;
export type InsertMedicalFile = typeof medicalFiles.$inferInsert;

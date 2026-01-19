import type { Express, Request, Response } from "express";
import { SignJWT, jwtVerify } from "jose";
import * as db from "../db";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./cookies";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production");
const JWT_EXPIRY = "365d"; // 1 year

interface JWTPayload {
  userId: number;
  email: string;
  role: string;
}

/**
 * Generate JWT token for user
 */
async function generateToken(user: db.User): Promise<string> {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(JWT_EXPIRY)
    .setIssuedAt()
    .setSubject(user.id.toString())
    .sign(JWT_SECRET);
}

/**
 * Verify JWT token
 */
async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as JWTPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Get current user from request
 */
export async function getCurrentUser(req: Request): Promise<db.User | null> {
  const token = req.cookies[COOKIE_NAME];
  if (!token) {
    return null;
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return null;
  }

  return db.getUserById(payload.userId);
}

/**
 * Register REST API routes for authentication
 */
export function registerAuthRoutes(app: Express) {
  // Health check
  app.get("/api/auth/health", (req: Request, res: Response) => {
    res.json({ status: "ok", message: "Auth service is running" });
  });

  /**
   * POST /api/auth/register
   * Register a new user with email/password
   */
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      if (!password) {
        return res.status(400).json({ error: "Password is required" });
      }

      // Create user (auto-accepts terms and subscribes to emails)
      const user = await db.createUser(email, password, name, "email");

      // Generate JWT token
      const token = await generateToken(user);

      // Set cookie
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, token, cookieOptions);

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          loginMethod: user.loginMethod,
          termsAccepted: user.termsAccepted,
          subscribedToEmails: user.subscribedToEmails,
        },
      });
    } catch (error: any) {
      console.error("[Auth] Register failed:", error);
      if (error.message === "User with this email already exists") {
        return res.status(409).json({ error: "User with this email already exists" });
      }
      res.status(500).json({ error: "Registration failed" });
    }
  });

  /**
   * POST /api/auth/login
   * Login with email/password
   */
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      // Authenticate user
      const user = await db.authenticateUser(email, password);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Generate JWT token
      const token = await generateToken(user);

      // Set cookie
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, token, cookieOptions);

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          loginMethod: user.loginMethod,
          avatar: user.avatar,
        },
      });
    } catch (error: any) {
      console.error("[Auth] Login failed:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  /**
   * POST /api/auth/logout
   * Logout user
   */
  app.post("/api/auth/logout", async (req: Request, res: Response) => {
    const cookieOptions = getSessionCookieOptions(req);
    res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
    res.json({ success: true });
  });

  /**
   * GET /api/auth/me
   * Get current authenticated user
   */
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          loginMethod: user.loginMethod,
          avatar: user.avatar,
          phone: user.phone,
          country: user.country,
          city: user.city,
          address: user.address,
          termsAccepted: user.termsAccepted,
          subscribedToEmails: user.subscribedToEmails,
          createdAt: user.createdAt,
          lastSignedIn: user.lastSignedIn,
        },
      });
    } catch (error: any) {
      console.error("[Auth] Get user failed:", error);
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  /**
   * PUT /api/auth/profile
   * Update user profile
   */
  app.put("/api/auth/profile", async (req: Request, res: Response) => {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const { name, phone, country, city, address } = req.body;

      const updates: Partial<db.InsertUser> = {};
      if (name !== undefined) updates.name = name;
      if (phone !== undefined) updates.phone = phone;
      if (country !== undefined) updates.country = country;
      if (city !== undefined) updates.city = city;
      if (address !== undefined) updates.address = address;

      const updatedUser = await db.updateUserProfile(user.id, updates);

      res.json({
        success: true,
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          role: updatedUser.role,
          loginMethod: updatedUser.loginMethod,
          avatar: updatedUser.avatar,
          phone: updatedUser.phone,
          country: updatedUser.country,
          city: updatedUser.city,
          address: updatedUser.address,
          createdAt: updatedUser.createdAt,
          lastSignedIn: updatedUser.lastSignedIn,
        },
      });
    } catch (error: any) {
      console.error("[Auth] Update profile failed:", error);
      if (error.message === "User not found") {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  /**
   * POST /api/auth/google/callback
   * Google OAuth callback
   */
  app.post("/api/auth/google/callback", async (req: Request, res: Response) => {
    try {
      const { idToken, email, name, picture } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      // Check if user exists by Google ID or email
      let user = await db.getUserByGoogleId(idToken || email);

      if (!user) {
        // Create new user
        user = await db.createUser(email, undefined, name, "google");
      }

      // Update Google ID if provided
      if (idToken && !user.googleId) {
        user = await db.updateUserProfile(user.id, { googleId: idToken });
      }

      // Update profile info
      if (name || picture) {
        user = await db.updateUserProfile(user.id, {
          name: name || user.name,
          avatar: picture || user.avatar,
        });
      }

      // Generate JWT token
      const token = await generateToken(user);

      // Set cookie
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, token, cookieOptions);

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          loginMethod: user.loginMethod,
          avatar: user.avatar,
        },
      });
    } catch (error: any) {
      console.error("[Auth] Google callback failed:", error);
      res.status(500).json({ error: "Google authentication failed" });
    }
  });

  /**
   * POST /api/auth/apple/callback
   * Apple OAuth callback
   */
  app.post("/api/auth/apple/callback", async (req: Request, res: Response) => {
    try {
      const { idToken, email, name } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      // Check if user exists by Apple ID or email
      let user = await db.getUserByAppleId(idToken || email);

      if (!user) {
        // Create new user (Apple doesn't always return name)
        user = await db.createUser(email, undefined, name || email.split("@")[0], "apple");
      }

      // Update Apple ID if provided
      if (idToken && !user.appleId) {
        user = await db.updateUserProfile(user.id, { appleId: idToken });
      }

      // Update name if provided
      if (name) {
        user = await db.updateUserProfile(user.id, { name });
      }

      // Generate JWT token
      const token = await generateToken(user);

      // Set cookie
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, token, cookieOptions);

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          loginMethod: user.loginMethod,
          avatar: user.avatar,
        },
      });
    } catch (error: any) {
      console.error("[Auth] Apple callback failed:", error);
      res.status(500).json({ error: "Apple authentication failed" });
    }
  });

  /**
   * PUT /api/auth/preferences
   * Update user preferences (email subscription, etc.)
   */
  app.put("/api/auth/preferences", async (req: Request, res: Response) => {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const { subscribedToEmails } = req.body;

      const updatedUser = await db.updateUserProfile(user.id, {
        subscribedToEmails: subscribedToEmails !== undefined ? subscribedToEmails : user.subscribedToEmails,
      });

      res.json({
        success: true,
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          subscribedToEmails: updatedUser.subscribedToEmails,
        },
      });
    } catch (error: any) {
      console.error("[Auth] Update preferences failed:", error);
      res.status(500).json({ error: "Failed to update preferences" });
    }
  });
}

// Export helper functions for use in middleware
export { generateToken, verifyToken };

import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "wouter";
// API base URL
const API_BASE = import.meta.env.VITE_API_URL || "/api";

export interface User {
  id: number;
  email: string;
  name?: string;
  role: "user" | "admin";
  loginMethod: "email" | "google" | "apple";
  avatar?: string;
  phone?: string;
  country?: string;
  city?: string;
  address?: string;
  termsAccepted?: boolean;
  subscribedToEmails?: boolean;
  createdAt?: string;
  lastSignedIn?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: (idToken: string, email: string, name?: string, picture?: string) => Promise<void>;
  appleLogin: (idToken: string, email: string, name?: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updatePreferences: (data: { subscribedToEmails?: boolean }) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useLocation();

  // Fetch current user on mount
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  async function fetchCurrentUser() {
    try {
      const response = await fetch(`${API_BASE}/auth/me`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error("[Auth] Failed to fetch user:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Login failed");
      }

      const data = await response.json();
      setUser(data.user);

      // Redirect based on role
      if (data.user.role === "admin") {
        setLocation("/admin/dashboard");
      } else {
        setLocation("/account");
      }
    } catch (error: any) {
      console.error("[Auth] Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Registration failed");
      }

      const data = await response.json();
      setUser(data.user);

      setLocation("/account");
    } catch (error: any) {
      console.error("[Auth] Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setLocation("/login");
    } catch (error) {
      console.error("[Auth] Logout failed:", error);
      // Even if logout fails, clear user state
      setUser(null);
      setLocation("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async (idToken: string, email: string, name?: string, picture?: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/google/callback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ idToken, email, name, picture }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Google login failed");
      }

      const data = await response.json();
      setUser(data.user);

      setLocation("/account");
    } catch (error: any) {
      console.error("[Auth] Google login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const appleLogin = async (idToken: string, email: string, name?: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/apple/callback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ idToken, email, name }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Apple login failed");
      }

      const data = await response.json();
      setUser(data.user);

      setLocation("/account");
    } catch (error: any) {
      console.error("[Auth] Apple login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;

    try {
      const response = await fetch(`${API_BASE}/auth/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Profile update failed");
      }

      const result = await response.json();
      setUser(result.user);
    } catch (error: any) {
      console.error("[Auth] Profile update failed:", error);
      throw error;
    }
  };

  const updatePreferences = async (data: { subscribedToEmails?: boolean }) => {
    if (!user) return;

    try {
      const response = await fetch(`${API_BASE}/auth/preferences`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Preferences update failed");
      }

      const result = await response.json();
      setUser(result.user);
    } catch (error: any) {
      console.error("[Auth] Preferences update failed:", error);
      throw error;
    }
  };

  const refreshUser = async () => {
    await fetchCurrentUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        googleLogin,
        appleLogin,
        updateProfile,
        updatePreferences,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

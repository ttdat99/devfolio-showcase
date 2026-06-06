import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

const STORAGE_KEY = "admin_google_user";

// Comma-separated allowed emails from env, e.g. "you@gmail.com,other@gmail.com"
const ALLOWED_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS as string | undefined)
  ?.split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean) ?? [];

export interface AdminUser {
  email: string;
  name: string;
  picture?: string;
}

interface AdminAuthContextValue {
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  loginWithGoogle: (user: AdminUser) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as AdminUser) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = adminUser !== null;

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [adminUser]);

  function loginWithGoogle(user: AdminUser): boolean {
    if (!ALLOWED_EMAILS.includes(user.email.toLowerCase())) return false;
    setAdminUser(user);
    return true;
  }

  function logout() {
    setAdminUser(null);
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, adminUser, loginWithGoogle, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthContextValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}

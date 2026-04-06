// providers/auth-provider.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getMe } from '@/services/auth.api';
import { AuthContextType, User } from '@/lib/types/types';


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user on initial mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getMe();
        if (response.success && response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Failed to load user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    // Clear cookies/token on backend if needed
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setUser(null);
    window.location.href = "/login"; // or use router
  };

  const refreshUser = async () => {
    try {
      const response = await getMe();
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout,  refetchUser: refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
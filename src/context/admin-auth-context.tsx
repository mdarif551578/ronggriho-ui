
'use client'

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// For a real app, use Firebase Auth with custom claims to identify admins.
// For this prototype, we'll use a simplified mock authentication.
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'password';

interface AdminAuthContextType {
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export default function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
        const adminSession = sessionStorage.getItem('isAdmin');
        if (adminSession === 'true') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
            if (pathname !== '/admin/login') {
                router.push('/admin/login');
            }
        }
    } catch (error) {
        // sessionStorage is not available on server, ignore
    } finally {
        setLoading(false);
    }
  }, [pathname, router]);

  const login = async (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
      router.push('/admin');
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    sessionStorage.removeItem('isAdmin');
    setIsAdmin(false);
    router.push('/admin/login');
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!isAdmin && pathname !== '/admin/login') {
      return null; // Don't render children if not admin and not on login page
  }


  return (
    <AdminAuthContext.Provider value={{ isAdmin, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

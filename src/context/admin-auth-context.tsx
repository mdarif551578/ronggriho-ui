
'use client'

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

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
    // This effect now handles redirection based on auth state
    const adminSession = sessionStorage.getItem('isAdmin');
    const isAuthenticated = adminSession === 'true';
    setIsAdmin(isAuthenticated);
    
    if (!isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
    
    setLoading(false);
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

  const value = { isAdmin, loading, login, logout };

  if (loading) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                {/* Skeleton for Sidebar */}
                <div className="hidden border-r bg-muted/40 md:block p-4 space-y-4">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
                {/* Skeleton for Main Content */}
                <div className="flex flex-col p-8">
                     <Skeleton className="h-14 w-full mb-8" />
                     <Skeleton className="h-32 w-full" />
                </div>
            </div>
        </div>
    );
  }

  // If not admin and not on the login page, don't render children to prevent flashes of content
  if (!isAdmin && pathname !== '/admin/login') {
    return null;
  }

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

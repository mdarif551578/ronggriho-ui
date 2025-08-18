
'use client'

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/use-auth'; // Using the main app auth hook
import { clientFirestore } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { User as AppUser } from '@/lib/types';


interface AdminAuthContextType {
  isAdmin: boolean;
  loading: boolean;
  logout: () => void;
}

export const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export default function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const { user, loading: authLoading } = useAuth(); // main auth context
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (authLoading) return;

      if (user) {
        try {
          const userDocRef = doc(clientFirestore, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data() as AppUser;
            const userIsAdmin = userData.role === 'admin';
            setIsAdmin(userIsAdmin);
             if (!userIsAdmin && pathname !== '/admin/login') {
                router.push('/admin/login');
             }
          } else {
             setIsAdmin(false);
             if (pathname !== '/admin/login') {
                router.push('/admin/login');
             }
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
           if (pathname !== '/admin/login') {
             router.push('/admin/login');
           }
        }
      } else {
         setIsAdmin(false);
         if (pathname !== '/admin/login') {
           router.push('/admin/login');
         }
      }
      setLoading(false);
    };

    checkAdminStatus();
  }, [user, authLoading, pathname, router]);


  const logout = () => {
    // The main useAuth hook handles the actual sign out
    // We just clear our local state and redirect
    setIsAdmin(false);
    router.push('/auth/login'); // Redirect to main login page after logout
  };
  
  // No login function here as it's handled by the main app's login flow
  const value = { isAdmin, loading, logout };

  if (loading || authLoading) {
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

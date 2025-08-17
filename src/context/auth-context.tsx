
'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { 
    getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    updateProfile,
    reauthenticateWithCredential,
    EmailAuthProvider,
    updatePassword,
    type User 
} from 'firebase/auth';
import { app } from '@/lib/firebase'; // Ensure you have this file
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  register: (email: string, pass: string, displayName: string) => Promise<any>;
  logout: () => Promise<any>;
  updateUserProfile: (displayName: string) => Promise<void>;
  reauthenticate: (password: string) => Promise<void>;
  updateUserPassword: (newPassword: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const login = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const register = async (email: string, pass: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(userCredential.user, { displayName });
    // Manually update user state after profile update
    setUser({ ...userCredential.user, displayName });
    return userCredential;
  };
  
  const updateUserProfile = async (displayName: string) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName });
      // Manually trigger a state update
      setUser({ ...auth.currentUser, displayName });
    } else {
      throw new Error("No user is signed in to update the profile.");
    }
  };

  const reauthenticate = async (password: string) => {
    if (auth.currentUser && auth.currentUser.email) {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
      await reauthenticateWithCredential(auth.currentUser, credential);
    } else {
      throw new Error("No user is signed in to reauthenticate.");
    }
  }

  const updateUserPassword = async (newPassword: string) => {
    if (auth.currentUser) {
      await updatePassword(auth.currentUser, newPassword);
    } else {
      throw new Error("No user is signed in to update the password.");
    }
  }


  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUserProfile, reauthenticate, updateUserPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

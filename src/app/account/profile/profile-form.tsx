
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth, clientFirestore } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileForm() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    // State for user profile form
    const [displayName, setDisplayName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSavingProfile, setIsSavingProfile] = useState(false);

    // State for password change form
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isSavingPassword, setIsSavingPassword] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }

        if (user) {
            setDisplayName(user.displayName || '');
            // Fetch phone number from Firestore if it exists
            const fetchUserData = async () => {
                const userDocRef = doc(clientFirestore, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    setPhoneNumber(userDocSnap.data().phone || '');
                }
            };
            fetchUserData();
        }
    }, [user, loading, router]);


    const handleProfileUpdate = async (e: FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setIsSavingProfile(true);

        try {
            // Update Firebase Auth profile
            await updateProfile(user, { displayName });

            // Update user document in Firestore
            const userDocRef = doc(clientFirestore, 'users', user.uid);
            await updateDoc(userDocRef, {
                displayName,
                phone: phoneNumber,
            });

            toast({ title: "Profile Updated", description: "Your information has been saved." });
        } catch (error: any) {
            console.error("Error updating profile: ", error);
            toast({ title: "Update Failed", description: error.message, variant: "destructive" });
        } finally {
            setIsSavingProfile(false);
        }
    };
    
    const handlePasswordUpdate = async (e: FormEvent) => {
        e.preventDefault();
        if (!user || !user.email) return;
        setIsSavingPassword(true);

        try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            
            // Re-authenticate user before changing password
            await reauthenticateWithCredential(user, credential);
            
            // If re-authentication is successful, update the password
            await updatePassword(user, newPassword);

            toast({ title: "Password Updated", description: "Your password has been changed successfully." });
            setCurrentPassword('');
            setNewPassword('');
        } catch (error: any) {
             console.error("Error updating password: ", error);
             let errorMessage = "An unexpected error occurred. Please try again.";
             if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                 errorMessage = "The current password you entered is incorrect.";
             } else if (error.code === 'auth/weak-password') {
                 errorMessage = "The new password is too weak. It should be at least 6 characters.";
             } else if (error.code === 'auth/requires-recent-login') {
                 errorMessage = "For security, please log out and log back in before changing your password.";
             }
            toast({ title: "Password Update Failed", description: errorMessage, variant: "destructive" });
        } finally {
            setIsSavingPassword(false);
        }
    };


    if (loading || !user) {
        return (
             <div className="container mx-auto px-4 py-8">
                <Skeleton className="h-10 w-1/2 mb-8" />
                <Card>
                    <CardHeader>
                       <Skeleton className="h-6 w-1/4" />
                       <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid md:grid-cols-2 gap-4">
                           <Skeleton className="h-12 w-full" />
                           <Skeleton className="h-12 w-full" />
                        </div>
                        <Skeleton className="h-12 w-full" />
                        <div className="flex justify-end">
                            <Skeleton className="h-10 w-28" />
                        </div>
                    </CardContent>
                </Card>
             </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold font-headline mb-8">Profile Settings</h1>
            
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-6" onSubmit={handleProfileUpdate}>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" value={displayName} onChange={e => setDisplayName(e.target.value)} required />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={user.email || ""} disabled />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" placeholder="Add your phone number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={isSavingProfile}>{isSavingProfile ? "Saving..." : "Save Changes"}</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password here. For security, you'll need to enter your current password.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-6" onSubmit={handlePasswordUpdate}>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={isSavingPassword}>{isSavingPassword ? "Updating..." : "Update Password"}</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

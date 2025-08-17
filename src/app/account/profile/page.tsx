
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import type { RecaptchaVerifier } from "firebase/auth";

export default function ProfilePage() {
    const { user, loading, updateUserProfile, reauthenticate, updateUserPassword, resendVerificationEmail, setupRecaptcha, sendPhoneVerificationCode } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verifier, setVerifier] = useState<RecaptchaVerifier | null>(null);


    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }
        if (user) {
            setDisplayName(user.displayName || '');
            setEmail(user.email || '');
            setPhoneNumber(user.phoneNumber || '');
        }
    }, [user, loading, router]);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setupRecaptcha('recaptcha-container-profile').then(setVerifier);
        }
    }, [setupRecaptcha]);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateUserProfile(displayName);
            toast({ title: "Profile updated successfully!" });
        } catch (error: any) {
            toast({ title: "Error updating profile", description: error.message, variant: "destructive" });
        }
    }

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentPassword || !newPassword) {
            toast({ title: "Please fill in all password fields", variant: "destructive"});
            return;
        }
        try {
            await reauthenticate(currentPassword);
            await updateUserPassword(newPassword);
            toast({ title: "Password updated successfully!" });
            setCurrentPassword('');
            setNewPassword('');
        } catch (error: any) {
             toast({ title: "Error updating password", description: error.message, variant: "destructive" });
        }
    }
    
    const handlePhoneUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phoneNumber || !verifier) {
            toast({ title: "Please enter a phone number.", variant: "destructive" });
            return;
        }
        try {
            await sendPhoneVerificationCode(phoneNumber, verifier);
            toast({ title: "Verification code sent!", description: "Please enter the code to verify your phone number." });
        } catch (error: any) {
            toast({ title: "Error sending verification code", description: error.message, variant: "destructive" });
        }
    };


    if (loading || !user) {
         return (
            <div className="container mx-auto px-4 py-8">
                <Skeleton className="h-10 w-1/3 mb-8" />
                <Card>
                   <Skeleton className="h-96 w-full" />
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div id="recaptcha-container-profile"></div>
            <h1 className="text-4xl font-bold font-headline mb-8">Profile Settings</h1>
            
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     {!user.emailVerified ? (
                        <Alert variant="destructive">
                            <ShieldAlert className="h-4 w-4" />
                            <AlertTitle>Email Not Verified</AlertTitle>
                            <AlertDescription>
                                Your email address is not verified. Please check your inbox or click here to resend the verification email.
                                <Button variant="link" className="p-0 h-auto ml-1" onClick={resendVerificationEmail}>Resend email</Button>
                            </AlertDescription>
                        </Alert>
                    ) : (
                         <Alert>
                            <ShieldCheck className="h-4 w-4" />
                            <AlertTitle>Email Verified</AlertTitle>
                            <AlertDescription>
                                Your email address has been successfully verified.
                            </AlertDescription>
                        </Alert>
                    )}
                     {!user.phoneNumber ? (
                        <Alert variant="destructive">
                            <ShieldAlert className="h-4 w-4" />
                            <AlertTitle>Phone Number Not Added</AlertTitle>
                            <AlertDescription>
                                Please add and verify your phone number to complete your profile.
                            </AlertDescription>
                        </Alert>
                    ) : (
                         <Alert>
                            <ShieldCheck className="h-4 w-4" />
                            <AlertTitle>Phone Number Verified</AlertTitle>
                            <AlertDescription>
                                Your phone number has been successfully verified.
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleProfileUpdate} className="grid gap-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={email} disabled />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">Save Name</Button>
                        </div>
                    </form>
                    <form onSubmit={handlePhoneUpdate} className="grid gap-6 mt-6 pt-6 border-t">
                         <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <p className="text-sm text-muted-foreground">Add a phone number to enable features like order updates via SMS and account recovery. Example: +16505551234</p>
                            <div className="flex gap-2">
                                <Input id="phone" type="tel" placeholder="+880 123 456 7890" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} disabled={!!user.phoneNumber}/>
                                {!user.phoneNumber && <Button type="submit" disabled={!verifier}>Save & Verify Phone</Button>}
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePasswordUpdate} className="grid gap-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">Update Password</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

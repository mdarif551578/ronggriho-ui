
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

export default function ProfilePage() {
    const { user, loading, updateUserProfile, reauthenticate, updateUserPassword } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }
        if (user) {
            setDisplayName(user.displayName || '');
            setEmail(user.email || '');
        }
    }, [user, loading, router]);
    
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
            <h1 className="text-4xl font-bold font-headline mb-8">Profile Settings</h1>
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
                         <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" placeholder="+880 123 456 7890" />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">Save Changes</Button>
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


'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ShoppingBag, Heart, LogOut } from "lucide-react";
import Link from 'next/link';
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function AccountPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast({ title: "Logged Out", description: "You have been successfully logged out." });
            router.push('/');
        } catch (error) {
            toast({ title: "Logout Failed", description: "Something went wrong. Please try again.", variant: "destructive" });
        }
    };

    useEffect(() => {
        // Redirect to login page only when loading is finished and there's no user.
        if (!loading && !user) {
            router.push('/auth/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return <div className="container mx-auto px-4 py-8 text-center">Loading account details...</div>;
    }

    if (!user) {
        // Render nothing while the redirect is happening
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold font-headline mb-8">My Account</h1>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader className="text-center">
                            <User className="h-16 w-16 mx-auto rounded-full bg-primary/10 text-primary p-3" />
                            <CardTitle>{user.displayName || 'Rong Griho User'}</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                           <Button asChild variant="ghost" className="justify-start gap-2"><Link href="/account/profile"><User className="h-5 w-5" /> Profile Settings</Link></Button>
                           <Button asChild variant="ghost" className="justify-start gap-2"><Link href="/account/orders"><ShoppingBag className="h-5 w-5" /> My Orders</Link></Button>
                           <Button asChild variant="ghost" className="justify-start gap-2"><Link href="/wishlist"><Heart className="h-5 w-5" /> My Wishlist</Link></Button>
                           <Button variant="destructive" className="justify-start gap-2 mt-4" onClick={handleLogout}><LogOut className="h-5 w-5" /> Logout</Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className="text-center py-10 text-muted-foreground">
                             <ShoppingBag className="h-12 w-12 mx-auto mb-4" />
                             <p>You haven't placed any orders yet.</p>
                             <Button asChild className="mt-4"><Link href="/account/orders">View All Orders</Link></Button>
                           </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

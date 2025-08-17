
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ShoppingBag, Heart, LogOut } from "lucide-react";
import Link from 'next/link';
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }
    }, [user, loading, router]);

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    if (loading || !user) {
        return (
             <div className="container mx-auto px-4 py-8">
                <Skeleton className="h-10 w-1/3 mb-8" />
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <Skeleton className="h-64 w-full" />
                    </div>
                    <div className="md:col-span-2">
                        <Skeleton className="h-64 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold font-headline mb-8">My Account</h1>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader className="text-center">
                            <User className="h-16 w-16 mx-auto rounded-full bg-primary/10 text-primary p-3" />
                            <CardTitle>{user.displayName || 'User'}</CardTitle>
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

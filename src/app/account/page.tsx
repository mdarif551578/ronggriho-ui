
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ShoppingBag, Heart, LogOut } from "lucide-react";
import Link from 'next/link';
import { useAuth } from "@/hooks/use-auth";
import { auth, clientFirestore } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy, Timestamp, limit } from "firebase/firestore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Order } from "@/lib/types";


export default function AccountPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

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
        if (!authLoading && !user) {
            router.push('/auth/login');
        }
    }, [user, authLoading, router]);

     useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                try {
                    const q = query(
                        collection(clientFirestore, 'orders'), 
                        where('userId', '==', user.uid),
                        orderBy('createdAt', 'desc'),
                        limit(5)
                    );
                    const querySnapshot = await getDocs(q);
                    const userOrders = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    } as Order));
                    setOrders(userOrders);
                } catch (error) {
                    console.error("Error fetching orders: ", error);
                }
            }
            setLoading(false);
        };

        if (!authLoading) {
            fetchOrders();
        }
    }, [user, authLoading]);

    if (authLoading || !user) {
        return (
             <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold font-headline mb-8">My Account</h1>
                 <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <Card>
                            <CardHeader className="text-center">
                                <Skeleton className="h-16 w-16 mx-auto rounded-full" />
                                <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
                                <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                               <Skeleton className="h-10 w-full" />
                               <Skeleton className="h-10 w-full" />
                               <Skeleton className="h-10 w-full" />
                               <Skeleton className="h-10 w-full mt-4" />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                         <Card>
                            <CardHeader>
                                <CardTitle>My Orders</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <Skeleton className="h-12 w-full" />
                                    <Skeleton className="h-12 w-full" />
                                    <Skeleton className="h-12 w-full" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        )
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
                            <CardTitle>My Orders</CardTitle>
                        </CardHeader>
                         <CardContent className="p-0 md:p-6">
                            {loading ? (
                                <div className="space-y-4 p-6 md:p-0">
                                    <Skeleton className="h-12 w-full" />
                                    <Skeleton className="h-12 w-full" />
                                    <Skeleton className="h-12 w-full" />
                                </div>
                            ) : orders.length === 0 ? (
                               <div className="text-center py-10 text-muted-foreground">
                                 <ShoppingBag className="h-12 w-12 mx-auto mb-4" />
                                 <p>You haven't placed any orders yet.</p>
                                 <Button asChild className="mt-4"><Link href="/products">Start Shopping</Link></Button>
                               </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Order ID</TableHead>
                                            <TableHead className="hidden md:table-cell">Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orders.map((order) => {
                                            const latestStatus = order.status;
                                            return (
                                            <TableRow key={order.id}>
                                                <TableCell className="font-medium">
                                                    <Link href={`/tracking?orderId=${order.id}`} className="hover:underline">
                                                        #{order.id.slice(0, 7).toUpperCase()}
                                                    </Link>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">{new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    <Badge variant={latestStatus === 'Delivered' || latestStatus === 'Completed' ? 'default' : latestStatus === 'Cancelled' ? 'destructive' : 'secondary'}>
                                                        {latestStatus}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">৳{order.total.toFixed(2)}</TableCell>
                                            </TableRow>
                                        )})}
                                    </TableBody>
                                </Table>
                            )}
                             {orders.length > 0 && (
                                <div className="text-center mt-4 p-6 md:p-0">
                                    <Button asChild variant="outline"><Link href="/account/orders">View All Orders</Link></Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

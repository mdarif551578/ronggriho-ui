
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ShoppingBag } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { clientFirestore } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy, Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import type { Order } from "@/lib/types";


export default function OrdersPage() {
    const { user, loading: authLoading } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                try {
                    const q = query(
                        collection(clientFirestore, 'orders'), 
                        where('userId', '==', user.uid),
                        orderBy('createdAt', 'desc')
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

    if (authLoading || loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold font-headline mb-8">My Orders</h1>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/4" />
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
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold font-headline mb-8">My Orders</h1>
             {orders.length === 0 ? (
                <Card className="text-center py-20">
                    <CardContent>
                        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h2 className="text-2xl font-semibold">No Orders Yet</h2>
                        <p className="text-muted-foreground mt-2">You haven't placed any orders with us.</p>
                        <Button asChild className="mt-6">
                            <Link href="/products">Start Shopping</Link>
                        </Button>
                    </CardContent>
                </Card>
             ) : (
                <Card>
                    <CardContent className="p-0 md:p-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead className="hidden md:table-cell">Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order) => {
                                    const latestStatus = order.status;
                                    return (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium">#{order.id.slice(0, 7).toUpperCase()}</TableCell>
                                            <TableCell className="hidden md:table-cell">{new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Badge variant={latestStatus === 'Delivered' || latestStatus === 'Completed' ? 'default' : latestStatus === 'Cancelled' ? 'destructive' : 'secondary'}>
                                                    {latestStatus}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">৳{order.total.toFixed(2)}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/tracking?orderId=${order.id}`}>View</Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
             )}
        </div>
    );
}


'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, Timestamp, query, doc, updateDoc } from 'firebase/firestore';
import { clientFirestore } from '@/lib/firebase';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from '@/components/ui/skeleton';
import type { Order } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const orderStatuses = ['Processing', 'Shipped', 'Delivered', 'Completed', 'Cancelled'];

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchOrders = async () => {
        try {
            const q = query(collection(clientFirestore, 'orders'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const fetchedOrders = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Order));
            setOrders(fetchedOrders);
        } catch (error) {
            console.error("Error fetching orders: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleUpdateStatus = async (orderId: string, status: string) => {
        try {
            const orderRef = doc(clientFirestore, 'orders', orderId);
            await updateDoc(orderRef, { status });
            setOrders(prevOrders => prevOrders.map(o => o.id === orderId ? { ...o, status } : o));
            toast({ title: "Success", description: "Order status updated." });
        } catch (error) {
            console.error("Error updating status: ", error);
            toast({ title: "Error", description: "Failed to update order status.", variant: "destructive" });
        }
    };


    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Orders</h1>
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead className="hidden md:table-cell">Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                        <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-24" /></TableCell>
                                        <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                                        <TableCell className="text-right"><Skeleton className="h-5 w-16 ml-auto" /></TableCell>
                                        <TableCell className="text-right"><Skeleton className="h-8 w-8" /></TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                orders.map((order) => {
                                    const latestStatus = order.status;
                                    return (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium">
                                                <Link href={`/tracking?orderId=${order.id}`} className="hover:underline">
                                                    #{order.id.slice(0, 7).toUpperCase()}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{order.shippingFullName}</TableCell>
                                            <TableCell className="hidden md:table-cell">{new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Badge variant={latestStatus === 'Delivered' || latestStatus === 'Completed' ? 'default' : latestStatus === 'Cancelled' ? 'destructive' : 'secondary'}>
                                                    {latestStatus}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">৳{order.total.toFixed(2)}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Toggle menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/tracking?orderId=${order.id}`}>View Order</Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSub>
                                                            <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
                                                            <DropdownMenuSubContent>
                                                                {orderStatuses.map(status => (
                                                                    <DropdownMenuItem key={status} onSelect={() => handleUpdateStatus(order.id, status)}>
                                                                        {status}
                                                                    </DropdownMenuItem>
                                                                ))}
                                                            </DropdownMenuSubContent>
                                                        </DropdownMenuSub>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

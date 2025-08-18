
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, ShoppingBag, ArrowUpRight } from "lucide-react";
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { clientFirestore } from '@/lib/firebase';
import type { Order, User, Product } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({ revenue: 0, orders: 0, customers: 0 });
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [topProducts, setTopProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all orders for stats
                const ordersQuery = query(collection(clientFirestore, 'orders'));
                const ordersSnapshot = await getDocs(ordersQuery);
                const ordersData = ordersSnapshot.docs.map(doc => doc.data() as Order);

                const totalRevenue = ordersData.reduce((sum, order) => sum + order.total, 0);
                const totalOrders = ordersData.length;
                const uniqueCustomerIds = new Set(ordersData.map(order => order.userId));

                setStats({
                    revenue: totalRevenue,
                    orders: totalOrders,
                    customers: uniqueCustomerIds.size
                });

                // Fetch recent 5 orders
                const recentOrdersQuery = query(collection(clientFirestore, 'orders'), orderBy('createdAt', 'desc'), limit(5));
                const recentOrdersSnapshot = await getDocs(recentOrdersQuery);
                setRecentOrders(recentOrdersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)));
                
                // Fetch top 5 products (mocked logic, as it requires aggregation)
                 const productsQuery = query(collection(clientFirestore, 'products'), limit(5));
                 const productsSnapshot = await getDocs(productsQuery);
                 setTopProducts(productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));


            } catch (error) {
                console.error("Error fetching dashboard data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

  return (
    <div>
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    {loading ? <Skeleton className="h-8 w-3/4" /> : <div className="text-2xl font-bold">৳{stats.revenue.toFixed(2)}</div>}
                    <p className="text-xs text-muted-foreground">Across all orders</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                     {loading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{stats.orders}</div>}
                    <p className="text-xs text-muted-foreground">Total orders placed</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    {loading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{stats.customers}</div>}
                    <p className="text-xs text-muted-foreground">Unique customers</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Coming Soon</CardTitle>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                     <div className="text-2xl font-bold">...</div>
                    <p className="text-xs text-muted-foreground">More stats on the way</p>
                </CardContent>
            </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {loading ? (
                         <div className="space-y-2 p-6">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                         </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentOrders.map(order => (
                                    <TableRow key={order.id}>
                                        <TableCell>
                                            <div className="font-medium">{order.shippingFullName}</div>
                                            <div className="text-xs text-muted-foreground">#{order.id.slice(0, 7)}</div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={order.status === 'Delivered' || order.status === 'Completed' ? 'default' : order.status === 'Cancelled' ? 'destructive' : 'secondary'}>
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">৳{order.total.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
            <Card className="col-span-3">
                 <CardHeader>
                    <CardTitle>Top Products</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {loading ? (
                         <div className="space-y-2 p-6">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                         </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead className="text-right">Stock</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topProducts.map(product => (
                                     <TableRow key={product.id}>
                                         <TableCell>
                                             <Link href={`/admin/products/${product.id}/edit`} className="font-medium hover:underline">
                                                {product.name}
                                             </Link>
                                         </TableCell>
                                         <TableCell className="text-right">{product.stock}</TableCell>
                                     </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

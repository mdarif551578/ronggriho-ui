
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const orders = [
    { id: "ORD001", customer: "Liam Johnson", email: "liam@example.com", date: "2023-07-15", total: "250.00", status: "Delivered" },
    { id: "ORD002", customer: "Olivia Smith", email: "olivia@example.com", date: "2023-07-16", total: "150.75", status: "Processing" },
    { id: "ORD003", customer: "Noah Williams", email: "noah@example.com", date: "2023-07-17", total: "350.00", status: "Shipped" },
    { id: "ORD004", customer: "Emma Brown", email: "emma@example.com", date: "2023-07-18", total: "450.50", status: "Cancelled" },
];

export default function AdminOrdersPage() {
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
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.customer}</TableCell>
                                    <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={order.status === 'Cancelled' ? 'destructive' : 'default'}>{order.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">৳{order.total}</TableCell>
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
                                                <DropdownMenuItem>View Order</DropdownMenuItem>
                                                <DropdownMenuItem>Update Status</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

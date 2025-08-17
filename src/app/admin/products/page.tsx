
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";

// This is a placeholder for where you would fetch products from your database
const products = [
    { id: "1", name: "Ethnic Elegance Kurti", price: "1599.99", stock: 25, status: "Published" },
    { id: "2", name: "Urban Explorer T-Shirt", price: "799.99", stock: 150, status: "Published" },
    { id: "3", name: "Classic Denim Jeans", price: "2499.99", stock: 0, status: "Archived" },
    { id: "4", name: "Bohemian Printed Scarf", price: "399.99", stock: 42, status: "Published" },
];

export default function AdminProductsPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Products</h1>
                <Button asChild>
                    <Link href="/admin/products/new">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                    </Link>
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden md:table-cell">Price</TableHead>
                                <TableHead className="hidden md:table-cell">Stock</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="hidden sm:table-cell">
                                        <Image
                                            alt={product.name}
                                            className="aspect-square rounded-md object-cover"
                                            height="64"
                                            src="https://placehold.co/64x64.png"
                                            width="64"
                                            data-ai-hint="product image"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={product.status === "Archived" ? "secondary" : "default"}>{product.status}</Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">৳{product.price}</TableCell>
                                    <TableCell className="hidden md:table-cell">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Delete</DropdownMenuItem>
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

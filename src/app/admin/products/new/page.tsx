
'use client';

import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { clientFirestore } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState, FormEvent } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';

export default function NewProductPage() {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  
  const handleAddProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    
    const newProduct: Omit<Product, 'id' | 'slug' | 'images' | 'relatedProductIds' | 'longDescription' | 'reviewsInfo' | 'shippingReturnsInfo'> = {
        name,
        description: formData.get('description') as string,
        price: Number(formData.get('price')),
        stock: Number(formData.get('stock')),
        category: formData.get('category') as string,
        tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()).filter(Boolean),
        colors: (formData.get('colors') as string).split(',').map(c => c.trim()).filter(Boolean),
        sizes: (formData.get('sizes') as string).split(',').map(s => s.trim()).filter(Boolean),
    };
    
    // Create a slug from the name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    try {
        await addDoc(collection(clientFirestore, 'products'), {
            ...newProduct,
            slug,
            // Add placeholder values for fields not in the form
            images: ["https://placehold.co/400x500.png"], 
            relatedProductIds: [],
            longDescription: "<p>Detailed product description goes here.</p>",
            reviewsInfo: "<h3>Customer Reviews</h3><p>No reviews yet.</p>",
            shippingReturnsInfo: "<h3>Shipping & Returns</h3><p>Standard shipping policies apply.</p>",
            createdAt: serverTimestamp()
        });
        toast({ title: 'Success', description: 'Product added successfully.' });
        router.push('/admin/products');
    } catch (error) {
        console.error("Error adding product: ", error);
        toast({ title: 'Error', description: 'Failed to add product.', variant: 'destructive' });
    } finally {
        setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleAddProduct}>
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Add New Product</h1>
            <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Product'}
            </Button>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Fill in the information for the new product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" name="name" placeholder="e.g. Elegant Silk Saree" required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Short Description</Label>
                    <Textarea id="description" name="description" placeholder="A brief summary of the product." required />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="price">Price (৳)</Label>
                        <Input id="price" name="price" type="number" step="0.01" placeholder="e.g. 2500" required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="stock">Stock</Label>
                        <Input id="stock" name="stock" type="number" placeholder="e.g. 50" required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" name="category" placeholder="e.g. Ethnic Wear" required />
                    </div>
                </div>

                 <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input id="tags" name="tags" placeholder="e.g. featured, new-arrival, best-seller" />
                    <p className="text-sm text-muted-foreground">Enter tags separated by commas.</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="sizes">Sizes</Label>
                    <Input id="sizes" name="sizes" placeholder="e.g. S, M, L, XL" required />
                     <p className="text-sm text-muted-foreground">Enter sizes separated by commas.</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="colors">Colors</Label>
                    <Input id="colors" name="colors" placeholder="e.g. Red:#FF0000, Blue:#0000FF" required />
                    <p className="text-sm text-muted-foreground">Enter colors as `Name:Hex`, separated by commas.</p>
                </div>
            </CardContent>
        </Card>
    </form>
  );
}

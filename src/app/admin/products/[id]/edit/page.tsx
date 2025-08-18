
'use client';

import { notFound, useRouter } from 'next/navigation';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { clientFirestore } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState, FormEvent } from 'react';
import type { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductEditPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(clientFirestore, 'products', params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);
  
  const handleUpdateProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;

    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const rawData = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: Number(formData.get('price')),
        stock: Number(formData.get('stock')),
        category: formData.get('category') as string,
        tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()).filter(Boolean),
        colors: (formData.get('colors') as string).split(',').map(c => c.trim()).filter(Boolean),
    };

    try {
        const docRef = doc(clientFirestore, 'products', params.id);
        await updateDoc(docRef, rawData);
        toast({ title: 'Success', description: 'Product updated successfully.' });
        router.push('/admin/products');
    } catch (error) {
        console.error(error);
        toast({ title: 'Error', description: 'Failed to update product.', variant: 'destructive' });
    } finally {
        setIsSaving(false);
    }
  }

  if (loading) {
      return (
           <div>
                <div className="flex items-center justify-between mb-8">
                    <Skeleton className="h-10 w-1/3" />
                    <Skeleton className="h-10 w-28" />
                </div>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Skeleton className="h-12" />
                        <Skeleton className="h-20" />
                        <div className="grid md:grid-cols-2 gap-6">
                            <Skeleton className="h-12" />
                            <Skeleton className="h-12" />
                        </div>
                         <div className="grid md:grid-cols-2 gap-6">
                            <Skeleton className="h-12" />
                            <Skeleton className="h-12" />
                        </div>
                        <Skeleton className="h-12" />
                        <Skeleton className="h-12" />
                    </CardContent>
                </Card>
           </div>
      )
  }

  if (!product) {
    notFound();
  }

  return (
    <form onSubmit={handleUpdateProduct}>
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Edit Product</h1>
            <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Product'}
            </Button>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Update product information below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" name="name" defaultValue={product.name} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" defaultValue={product.description} />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="price">Price (৳)</Label>
                        <Input id="price" name="price" type="number" step="0.01" defaultValue={product.price} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="stock">Stock</Label>
                        <Input id="stock" name="stock" type="number" defaultValue={product.stock} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" name="category" defaultValue={product.category} />
                    </div>
                </div>

                 <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input id="tags" name="tags" defaultValue={product.tags.join(', ')} />
                    <p className="text-sm text-muted-foreground">Enter tags separated by commas.</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="colors">Colors</Label>
                    <Input id="colors" name="colors" defaultValue={product.colors.join(', ')} />
                    <p className="text-sm text-muted-foreground">Enter colors as `Name:Hex`, separated by commas (e.g., `Red:#FF0000, Blue:#0000FF`).</p>
                </div>
            </CardContent>
        </Card>
    </form>
  );
}

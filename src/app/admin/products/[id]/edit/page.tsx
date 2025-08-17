
import 'server-only';
import { notFound } from 'next/navigation';
import { getProductById, updateProduct } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { revalidatePath } from 'next/cache';

export default async function ProductEditPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  async function updateProductAction(formData: FormData) {
    'use server';

    const rawData = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: Number(formData.get('price')),
        category: formData.get('category') as string,
        tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()).filter(Boolean),
    };

    try {
        await updateProduct(params.id, rawData);
        revalidatePath('/admin/products');
        revalidatePath(`/products/${product.slug}`);
    } catch (error) {
        console.error(error);
        // Here you might want to return an error message to the user
    }
  }

  return (
    <form action={updateProductAction}>
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Edit Product</h1>
            <Button type="submit">Save Product</Button>
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

                <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="price">Price (৳)</Label>
                        <Input id="price" name="price" type="number" step="0.01" defaultValue={product.price} />
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
            </CardContent>
        </Card>
    </form>
  );
}

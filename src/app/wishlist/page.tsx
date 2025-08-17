
'use client';
import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProductCard from '@/components/product-card';
import { getProducts } from '@/lib/mock-data';

export default function WishlistPage() {
  const allProducts = getProducts();
  const wishlistItems = allProducts.slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-headline mb-8">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <Card className="text-center py-20">
            <CardContent>
                <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
                <p className="text-muted-foreground mt-2">Save your favorite items to view them here later.</p>
                <Button asChild className="mt-6">
                    <Link href="/products">Discover Products</Link>
                </Button>
            </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlistItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

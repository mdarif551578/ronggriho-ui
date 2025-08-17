import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function WishlistPage() {
  // This is a placeholder. In a real app, you'd fetch wishlist items.
  const wishlistItems: any[] = [];

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
        <div>
          {/* Placeholder for wishlist items */}
        </div>
      )}
    </div>
  );
}

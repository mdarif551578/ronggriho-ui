'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/mock-data';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const discountPercentage = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full flex flex-col overflow-hidden group border-0 shadow-none hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-0 relative">
          <Link href={`/products/${product.slug}`}>
            <Image
              src={product.images[0]}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-auto aspect-[4/5] object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="fashion product"
            />
          </Link>
          {discountPercentage > 0 && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              -{discountPercentage}%
            </Badge>
          )}
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/70 hover:bg-background"
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </CardContent>
        <CardFooter className="p-4 flex flex-col items-start flex-grow bg-background">
          <div className="flex-grow">
            <p className="text-xs text-muted-foreground">{product.category}</p>
            <h3 className="font-semibold text-sm leading-tight mt-1">
              <Link href={`/products/${product.slug}`} className="hover:underline transition-colors">
                {product.name}
              </Link>
            </h3>
            <div className="flex items-baseline gap-2 mt-2">
              {product.discountPrice ? (
                <>
                  <p className="text-base font-bold text-destructive">৳{product.discountPrice.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground line-through">৳{product.price.toFixed(2)}</p>
                </>
              ) : (
                <p className="text-base font-bold">৳{product.price.toFixed(2)}</p>
              )}
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

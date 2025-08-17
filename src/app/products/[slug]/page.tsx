'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getProductBySlug, getRelatedProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import ProductCard from '@/components/product-card';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { useWishlist } from '@/hooks/use-wishlist';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const fetchedProduct = await getProductBySlug(params.slug);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setSelectedSize(fetchedProduct.sizes[0]);
        setSelectedColor(fetchedProduct.colors[0].name);
        const fetchedRelated = await getRelatedProducts(params.slug);
        setRelatedProducts(fetchedRelated);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [params.slug]);


  if (loading) {
    return <ProductPageSkeleton />;
  }

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart.`,
    });
  };
  
  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
       toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
       toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div>
          <div className="aspect-[4/5] relative">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="w-full rounded-lg shadow-lg object-cover"
              data-ai-hint="fashion product closeup"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {product.images.map((img, index) => (
              <div key={index} className="aspect-square relative">
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="w-full rounded-md cursor-pointer border-2 border-transparent hover:border-primary object-cover"
                  data-ai-hint="fashion product thumbnail"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="py-4">
          <p className="text-sm font-medium text-primary uppercase tracking-wide">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold font-headline mt-2">{product.name}</h1>
          <div className="flex items-center gap-2 mt-4">
              <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-sm text-muted-foreground">(123 reviews)</p>
          </div>
          <div className="flex items-baseline gap-4 mt-4">
            {product.discountPrice ? (
              <>
                <p className="text-3xl font-bold text-destructive">৳{product.discountPrice.toFixed(2)}</p>
                <p className="text-xl text-muted-foreground line-through">৳{product.price.toFixed(2)}</p>
              </>
            ) : (
              <p className="text-3xl font-bold">৳{product.price.toFixed(2)}</p>
            )}
          </div>
          <Separator className="my-6" />

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold mb-2">Color</p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map(color => (
                  <Button key={color.name} variant={selectedColor === color.name ? 'default' : 'outline'} size="icon" className="h-8 w-8 rounded-full" onClick={() => setSelectedColor(color.name)}>
                    <span className="h-5 w-5 rounded-full" style={{ backgroundColor: color.hex }} />
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">Size</p>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map(size => <SelectItem key={size} value={size}>{size}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-sm font-semibold mb-2">Quantity</p>
            <div className="flex items-center border rounded-md w-fit">
              <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q + 1)}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}><ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart</Button>
            <Button size="lg" variant="outline" className="flex-1" onClick={handleWishlistToggle}>
              <Heart className={cn("mr-2 h-5 w-5", isInWishlist(product.id) && "fill-destructive text-destructive")} /> 
              Wishlist
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product Info Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4 text-muted-foreground">
            {product.description}
          </TabsContent>
          <TabsContent value="reviews" className="mt-4 text-muted-foreground">
            No reviews yet.
          </TabsContent>
          <TabsContent value="shipping" className="mt-4 text-muted-foreground">
            <p>Standard delivery within 3-5 business days. Express delivery available.</p>
            <p>Easy 7-day return policy. Please check our returns page for more info.</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold font-headline mb-6">Complete the Look</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}


function ProductPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <Skeleton className="w-full aspect-[4/5] rounded-lg" />
          <div className="grid grid-cols-4 gap-2 mt-2">
            <Skeleton className="w-full aspect-square rounded-md" />
            <Skeleton className="w-full aspect-square rounded-md" />
            <Skeleton className="w-full aspect-square rounded-md" />
            <Skeleton className="w-full aspect-square rounded-md" />
          </div>
        </div>
        <div className="py-4 space-y-4">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-8 w-1/3" />
          <Separator className="my-6" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-1/4" />
          <div className="flex gap-4 mt-6">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

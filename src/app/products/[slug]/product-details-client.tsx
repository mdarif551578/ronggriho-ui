
'use client';

import Image from 'next/image';
import { useState } from 'react';
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
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

interface ProductDetailsClientProps {
    product: Product;
    relatedProducts: Product[];
}

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors[0].name);
  const [activeImage, setActiveImage] = useState(product.images[0]);
  
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

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
          <div className="aspect-[4/5] relative w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              data-ai-hint="fashion product closeup"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {product.images.map((img, index) => (
              <div 
                key={index} 
                className={cn(
                  "aspect-square relative cursor-pointer rounded-md overflow-hidden border-2 transition-colors",
                  img === activeImage ? 'border-primary' : 'border-transparent hover:border-primary/50'
                )}
                onClick={() => setActiveImage(img)}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="w-full h-full object-cover"
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
          <p className="mt-4 text-muted-foreground">{product.description}</p>
          <Separator className="my-6" />

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-semibold mb-2 block">Color: <span className="font-normal">{selectedColor}</span></Label>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map(color => (
                  <button key={color.name} onClick={() => setSelectedColor(color.name)}
                    className={cn('h-8 w-8 rounded-full border-2 transition-all', selectedColor === color.name ? 'border-primary scale-110' : 'border-border')}>
                    <span className="h-full w-full rounded-full block" style={{ backgroundColor: color.hex }} />
                    <span className="sr-only">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm font-semibold mb-2 block">Size</Label>
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
            <Label className="text-sm font-semibold mb-2 block">Quantity</Label>
            <div className="flex items-center border rounded-md w-fit">
              <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q + 1)}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button size="lg" className="flex-1 text-lg py-6" onClick={handleAddToCart}><ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart</Button>
            <Button size="lg" variant="outline" className="flex-1 text-lg py-6" onClick={handleWishlistToggle}>
              <Heart className={cn("mr-2 h-5 w-5", isInWishlist(product.id) && "fill-destructive text-destructive")} /> 
              Wishlist
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product Info Tabs */}
       <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews (123)</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6 text-muted-foreground prose prose-sm max-w-none">
            <p>{product.description}</p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                    <h4 className="font-semibold text-foreground mb-2">Product Details</h4>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Material: 100% Premium Cotton</li>
                        <li>Fit: Regular</li>
                        <li>Neck: Round Neck</li>
                        <li>Sleeves: Half Sleeves</li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-foreground mb-2">Care Instructions</h4>
                     <ul className="list-disc list-inside space-y-1">
                        <li>Machine wash cold, inside-out, gentle cycle</li>
                        <li>Tumble dry low, or hang-dry in shade</li>
                        <li>Do not bleach</li>
                        <li>Do not dry clean</li>
                    </ul>
                </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                           <div key={i} className="border-b pb-4">
                                <div className="flex items-center mb-2">
                                    <div className="flex text-yellow-500">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                                    </div>
                                    <p className="ml-auto text-sm text-muted-foreground">October 26, 2023</p>
                                </div>
                                <p className="font-semibold">Jane Doe</p>
                                <p className="text-muted-foreground text-sm mt-1">Absolutely love this! The quality is amazing and it fits perfectly. Highly recommend.</p>
                           </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4">Rating Breakdown</h3>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2"><span className="w-12">5 star</span> <Progress value={80} className="flex-1" /> <span className="w-10 text-right">80%</span></div>
                        <div className="flex items-center gap-2"><span className="w-12">4 star</span> <Progress value={15} className="flex-1" /> <span className="w-10 text-right">15%</span></div>
                        <div className="flex items-center gap-2"><span className="w-12">3 star</span> <Progress value={5} className="flex-1" /> <span className="w-10 text-right">5%</span></div>
                        <div className="flex items-center gap-2"><span className="w-12">2 star</span> <Progress value={0} className="flex-1" /> <span className="w-10 text-right">0%</span></div>
                        <div className="flex items-center gap-2"><span className="w-12">1 star</span> <Progress value={0} className="flex-1" /> <span className="w-10 text-right">0%</span></div>
                    </div>
                    <Button className="mt-6 w-full">Write a Review</Button>
                </div>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="mt-6 text-muted-foreground prose prose-sm max-w-none">
            <h4 className="font-semibold text-foreground">Standard Shipping</h4>
            <p>We offer standard shipping across Bangladesh. Delivery times are as follows:</p>
            <ul className="list-disc list-inside">
                <li>Inside Dhaka: 2-3 business days</li>
                <li>Outside Dhaka: 3-5 business days</li>
            </ul>
            <p>You can track your order status from your <a href="/account/orders">account page</a>.</p>

            <h4 className="font-semibold text-foreground mt-6">Returns Policy</h4>
            <p>We have a 7-day return policy for items that are unused, in their original condition, and with all original tags attached. To initiate a return, please visit our <a href="/returns">Return Policy</a> page for detailed instructions.</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center font-headline mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}

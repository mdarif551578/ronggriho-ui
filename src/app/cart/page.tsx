'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-headline mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <Card className="text-center py-20">
            <CardContent>
                <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                <p className="text-muted-foreground mt-2">Looks like you haven't added anything to your cart yet.</p>
                <Button asChild className="mt-6">
                    <Link href="/products">Start Shopping</Link>
                </Button>
            </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <ul className="divide-y">
                  <AnimatePresence>
                    {cart.map(item => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-start gap-4 p-4"
                      >
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          width={100}
                          height={125}
                          className="w-24 h-auto rounded-md object-cover"
                          data-ai-hint="cart product"
                        />
                        <div className="flex-grow">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Price: ৳{(item.discountPrice || item.price).toFixed(2)}
                          </p>
                          <div className="flex items-center border rounded-md w-fit mt-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-10 text-center text-sm">{item.quantity}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                           <p className="font-semibold">৳{((item.discountPrice || item.price) * item.quantity).toFixed(2)}</p>
                           <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive mt-4" onClick={() => removeFromCart(item.id)}>
                            <Trash2 className="h-4 w-4" />
                           </Button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>৳{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>৳{shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>৳{total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button size="lg" className="w-full">
                  Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="link" asChild>
                    <Link href="/products">Continue Shopping</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowRight, CreditCard, Landmark, Truck } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPage() {
  const { cart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" />
              </div>
              <div className="col-span-full space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Dhaka" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal-code">Postal Code</Label>
                <Input id="postal-code" placeholder="1200" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="cod" className="space-y-4">
                <Label className="flex items-center gap-4 border rounded-md p-4 cursor-pointer hover:bg-muted has-[:checked]:bg-muted has-[:checked]:border-primary">
                    <RadioGroupItem value="cod" id="cod" />
                    <Truck className="h-6 w-6 text-primary" />
                    <div>
                        <p className="font-semibold">Cash on Delivery</p>
                        <p className="text-sm text-muted-foreground">Pay when your order arrives.</p>
                    </div>
                </Label>
                 <Label className="flex items-center gap-4 border rounded-md p-4 cursor-pointer hover:bg-muted has-[:checked]:bg-muted has-[:checked]:border-primary">
                    <RadioGroupItem value="card" id="card" />
                    <CreditCard className="h-6 w-6 text-primary" />
                    <div>
                        <p className="font-semibold">Credit/Debit Card</p>
                        <p className="text-sm text-muted-foreground">Pay with Visa, Mastercard.</p>
                    </div>
                </Label>
                 <Label className="flex items-center gap-4 border rounded-md p-4 cursor-pointer hover:bg-muted has-[:checked]:bg-muted has-[:checked]:border-primary">
                    <RadioGroupItem value="mobile" id="mobile" />
                    <Landmark className="h-6 w-6 text-primary" />
                    <div>
                        <p className="font-semibold">Mobile Banking</p>
                        <p className="text-sm text-muted-foreground">bKash, Nagad, etc.</p>
                    </div>
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {cart.map(item => (
                    <li key={item.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Image src={item.images[0]} alt={item.name} width={40} height={50} className="rounded-sm" data-ai-hint="cart product" />
                        <div>
                            <p className="font-medium truncate max-w-40">{item.name}</p>
                            <p className="text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span>৳{((item.discountPrice || item.price) * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <Separator />
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
              <CardFooter>
                <Button size="lg" className="w-full">
                  Place Order <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}

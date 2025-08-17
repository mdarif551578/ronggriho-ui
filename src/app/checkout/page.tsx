
'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Landmark, ShoppingCart, Truck } from 'lucide-react';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const districts = [
    "Bagerhat", "Bandarban", "Barguna", "Barisal", "Bhola", "Bogra", "Brahmanbaria", "Chandpur",
    "Chapai Nawabganj", "Chattogram", "Chuadanga", "Comilla", "Cox's Bazar", "Dhaka", "Dinajpur",
    "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore",
    "Jhalokati", "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj", "Kurigram",
    "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur",
    "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi",
    "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali",
    "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur",
    "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
];


export default function CheckoutPage() {
  const { cart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('bkash');

  const subtotal = cart.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);
  const shipping = subtotal > 0 ? 50 : 0;
  
  const bkashFeePercentage = 0.02; // 2% fee for bKash
  const nagadFeePercentage = 0.015; // 1.5% fee for Nagad

  let transactionFee = 0;
  if (paymentMethod === 'bkash') {
    transactionFee = subtotal * bkashFeePercentage;
  } else if (paymentMethod === 'nagad') {
    transactionFee = subtotal * nagadFeePercentage;
  }

  const total = subtotal + shipping + transactionFee;

  const OrderSummary = () => (
      <>
        <ul className="space-y-3">
          {cart.map(item => (
            <li key={item.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                    <Image src={item.images[0]} alt={item.name} width={50} height={65} className="rounded-md object-cover" data-ai-hint="cart product" />
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">{item.quantity}</span>
                </div>
                <p className="font-medium">{item.name}</p>
              </div>
              <span className="font-medium">৳{((item.discountPrice || item.price) * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <Separator className="my-4" />
        <div className="flex justify-between items-center">
            <Input placeholder="Coupon code" className="w-2/3" />
            <Button variant="outline">Apply</Button>
        </div>
        <Separator className="my-4" />
        <div className="space-y-2">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>৳{subtotal.toFixed(2)}</span>
            </div>
             <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>৳{shipping.toFixed(2)}</span>
            </div>
            {transactionFee > 0 && (
                 <div className="flex justify-between text-muted-foreground">
                  <span>Transaction Fee</span>
                  <span>৳{transactionFee.toFixed(2)}</span>
                </div>
            )}
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>৳{total.toFixed(2)}</span>
        </div>
    </>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col-reverse lg:flex-row lg:gap-12">

        {/* Left Column: Billing Details & Payment */}
        <div className="flex-1 lg:max-w-prose space-y-8 mt-8 lg:mt-0">
            <div>
                <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" placeholder="Doe" />
                    </div>
                    <div className="col-span-full space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input id="address" placeholder="House no, street name" />
                    </div>
                    <div className="col-span-full space-y-2">
                        <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                        <Input id="apartment" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="district">District</Label>
                        <Select>
                            <SelectTrigger id="district">
                                <SelectValue placeholder="Select a district" />
                            </SelectTrigger>
                            <SelectContent>
                                {districts.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="city">Town / City</Label>
                        <Input id="city" placeholder="e.g. Dhaka" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+8801..." />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="you@example.com" />
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
                <div className="space-y-2">
                    <Label htmlFor="order-notes">Order notes (optional)</Label>
                    <Textarea id="order-notes" placeholder="Notes about your order, e.g. special notes for delivery." />
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                 <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    <Label className="flex flex-col gap-4 border rounded-lg p-4 cursor-pointer hover:bg-muted has-[:checked]:bg-muted has-[:checked]:border-primary transition-colors">
                        <div className="flex items-center">
                            <RadioGroupItem value="bkash" id="bkash" className="mr-4"/>
                            <span className="font-semibold">bKash Payment</span>
                            <Image src="https://placehold.co/80x50.png" data-ai-hint="bKash logo" alt="bKash" width={40} height={25} className="ml-auto" />
                        </div>
                        {paymentMethod === 'bkash' && (
                            <div className="pl-8 pt-4 border-t mt-4 text-sm text-muted-foreground space-y-4 animate-accordion-down">
                                <p>Please complete your bKash payment at <strong className="text-foreground">01928558184</strong> (Agent), then fill the form below.</p>
                                <p>Your total payable amount is <strong className="text-foreground">৳{total.toFixed(2)}</strong> (including ৳{transactionFee.toFixed(2)} fee).</p>
                                <div className="space-y-2">
                                    <Label htmlFor="bkash-phone">Your bKash Phone Number</Label>
                                    <Input id="bkash-phone" placeholder="e.g. 01XXXXXXXXX" required/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bkash-trx">bKash Transaction ID (TrxID)</Label>
                                    <Input id="bkash-trx" placeholder="e.g. 8M7A9B2C1D" required/>
                                </div>
                            </div>
                        )}
                    </Label>
                     <Label className="flex flex-col gap-4 border rounded-lg p-4 cursor-pointer hover:bg-muted has-[:checked]:bg-muted has-[:checked]:border-primary transition-colors">
                         <div className="flex items-center">
                            <RadioGroupItem value="nagad" id="nagad" className="mr-4"/>
                            <span className="font-semibold">Nagad Payment</span>
                            <Image src="https://placehold.co/80x50.png" data-ai-hint="Nagad logo" alt="Nagad" width={40} height={25} className="ml-auto" />
                         </div>
                          {paymentMethod === 'nagad' && (
                            <div className="pl-8 pt-4 border-t mt-4 text-sm text-muted-foreground space-y-4 animate-accordion-down">
                                <p>Please complete your Nagad payment at <strong className="text-foreground">01928558185</strong> (Agent), then fill the form below.</p>
                                <p>Your total payable amount is <strong className="text-foreground">৳{total.toFixed(2)}</strong> (including ৳{transactionFee.toFixed(2)} fee).</p>
                                <div className="space-y-2">
                                    <Label htmlFor="nagad-phone">Your Nagad Phone Number</Label>
                                    <Input id="nagad-phone" placeholder="e.g. 01XXXXXXXXX" required/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nagad-trx">Nagad Transaction ID (TrxID)</Label>
                                    <Input id="nagad-trx" placeholder="e.g. 8M7A9B2C1D" required/>
                                </div>
                            </div>
                        )}
                    </Label>
                     <Label className="flex items-center gap-4 border rounded-lg p-4 cursor-pointer hover:bg-muted has-[:checked]:bg-muted has-[:checked]:border-primary transition-colors">
                        <RadioGroupItem value="cod" id="cod" />
                        <Truck className="h-6 w-6 text-primary" />
                        <div>
                            <p className="font-semibold">Cash on Delivery</p>
                            <p className="text-sm text-muted-foreground">Pay with cash upon delivery.</p>
                        </div>
                    </Label>
                </RadioGroup>
            </div>

            <div className="mt-8">
                 <p className="text-xs text-muted-foreground mb-4">
                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                </p>
                <Button size="lg" className="w-full" disabled={cart.length === 0}>
                    Place Order (৳{total.toFixed(2)})
                </Button>
            </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:w-1/3">
            <div className="lg:hidden mb-8">
                 <Card>
                    <CardHeader>
                        <CardTitle>Your Order</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <OrderSummary />
                    </CardContent>
                </Card>
            </div>
            
            <Card className="sticky top-24 hidden lg:block">
              <CardHeader>
                <CardTitle>Your Order</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderSummary />
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

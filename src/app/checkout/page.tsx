
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

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column: Billing Details & Payment */}
            <div className="space-y-8">
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
                            <Label htmlFor="country">Country / Region</Label>
                            <Input id="country" value="Bangladesh" disabled />
                        </div>
                        <div className="col-span-full space-y-2">
                            <Label htmlFor="address">Street address</Label>
                            <Input id="address" placeholder="House no, street name" />
                        </div>
                        <div className="col-span-full space-y-2">
                            <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                            <Input id="apartment" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="city">Town / City</Label>
                            <Input id="city" placeholder="e.g. Dhaka" />
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
                            <Label htmlFor="postal-code">Postcode / ZIP (optional)</Label>
                            <Input id="postal-code" placeholder="e.g. 1200" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" type="tel" placeholder="+8801..." />
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
                    <h2 className="text-2xl font-semibold mb-4">Payment</h2>
                     <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                        <Label className="flex flex-col gap-4 border rounded-md p-4 cursor-pointer hover:bg-muted has-[:checked]:bg-muted has-[:checked]:border-primary">
                            <div className="flex items-center">
                                <RadioGroupItem value="bkash" id="bkash" className="mr-4"/>
                                <span className="font-semibold">bKash</span>
                                <Image src="https://placehold.co/40x25.png" data-ai-hint="bKash logo" alt="bKash" width={40} height={25} className="ml-auto" />
                            </div>
                            {paymentMethod === 'bkash' && (
                                <div className="pl-8 pt-4 border-t mt-4 text-sm text-muted-foreground space-y-4">
                                    <p>You need to send us <strong className="text-foreground">৳{total.toFixed(2)}</strong> (Fees {transactionFee.toFixed(2)} BDT). Pay with bKash. Enter your bKash phone number and transaction ID.</p>
                                    <p><strong>Account Type:</strong> Agent</p>
                                    <p><strong>Account Number:</strong> 01928558184</p>
                                    <div className="space-y-2">
                                        <Label htmlFor="bkash-phone">bKash Phone Number *</Label>
                                        <Input id="bkash-phone" placeholder="01XXXXXXXXX" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bkash-trx">bKash Transaction ID *</Label>
                                        <Input id="bkash-trx" placeholder="Transaction ID" />
                                    </div>
                                </div>
                            )}
                        </Label>
                         <Label className="flex flex-col gap-4 border rounded-md p-4 cursor-pointer hover:bg-muted has-[:checked]:bg-muted has-[:checked]:border-primary">
                             <div className="flex items-center">
                                <RadioGroupItem value="nagad" id="nagad" className="mr-4"/>
                                <span className="font-semibold">Nagad</span>
                                <Image src="https://placehold.co/40x25.png" data-ai-hint="Nagad logo" alt="Nagad" width={40} height={25} className="ml-auto" />
                             </div>
                              {paymentMethod === 'nagad' && (
                                <div className="pl-8 pt-4 border-t mt-4 text-sm text-muted-foreground space-y-4">
                                    <p>You need to send us <strong className="text-foreground">৳{total.toFixed(2)}</strong> (Fees {transactionFee.toFixed(2)} BDT). Pay with Nagad. Enter your Nagad phone number and transaction ID.</p>
                                    <p><strong>Account Type:</strong> Agent</p>
                                    <p><strong>Account Number:</strong> 01928558185</p>
                                    <div className="space-y-2">
                                        <Label htmlFor="nagad-phone">Nagad Phone Number *</Label>
                                        <Input id="nagad-phone" placeholder="01XXXXXXXXX" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="nagad-trx">Nagad Transaction ID *</Label>
                                        <Input id="nagad-trx" placeholder="Transaction ID" />
                                    </div>
                                </div>
                            )}
                        </Label>
                         <Label className="flex items-center gap-4 border rounded-md p-4 cursor-pointer hover:bg-muted has-[:checked]:bg-muted has-[:checked]:border-primary">
                            <RadioGroupItem value="cod" id="cod" />
                            <Truck className="h-6 w-6 text-primary" />
                            <div>
                                <p className="font-semibold">Cash on Delivery</p>
                                <p className="text-sm text-muted-foreground">Pay when your order arrives.</p>
                            </div>
                        </Label>
                    </RadioGroup>
                </div>

                <div className="mt-8">
                     <p className="text-xs text-muted-foreground mb-4">
                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                    </p>
                    <Button size="lg" className="w-full" disabled={cart.length === 0}>
                        Place Order ৳{total.toFixed(2)}
                    </Button>
                </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Your Order</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 divide-y">
                      {cart.map(item => (
                        <li key={item.id} className="flex items-center justify-between text-sm pt-2">
                          <div className="flex items-center gap-2">
                            <Image src={item.images[0]} alt={item.name} width={40} height={50} className="rounded-sm" data-ai-hint="cart product" />
                            <p className="font-medium truncate max-w-40">{item.name} &times; {item.quantity}</p>
                          </div>
                          <span>৳{((item.discountPrice || item.price) * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                    <Separator />
                     <div className="flex justify-between items-center">
                        <Input placeholder="Coupon code" className="w-2/3" />
                        <Button variant="outline">Apply Coupon</Button>
                    </div>
                    <Separator />
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
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>৳{total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}

    
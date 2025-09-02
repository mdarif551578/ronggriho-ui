
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, RefreshCw, FileText } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Return Policy',
  description: 'Learn about our 7-day return policy. Find out how to easily process a return for your order at Rong Griho.',
  alternates: { canonical: '/returns' },
};

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold font-headline text-center mb-4">Return Policy</h1>
      <p className="text-lg text-muted-foreground text-center mb-12">Simple and hassle-free returns.</p>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <Card>
            <CardHeader>
                <Package className="h-12 w-12 mx-auto text-primary" />
                <CardTitle>7-Day Returns</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">You have 7 days from the delivery date to return an item. The item must be unused, in its original condition, with all tags attached.</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <RefreshCw className="h-12 w-12 mx-auto text-primary" />
                <CardTitle>Easy Process</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">To initiate a return, go to your account's 'My Orders' section, select the order, and click 'Request Return'. Follow the on-screen instructions.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <FileText className="h-12 w-12 mx-auto text-primary" />
                <CardTitle>Refunds</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Once we receive and inspect the item, your refund will be processed to your original payment method or as store credit within 5-7 business days.</p>
            </CardContent>
        </Card>
      </div>
      <div className="text-center mt-12">
        <p className="text-muted-foreground mb-4">Have more questions? Check out our FAQ or contact our support team.</p>
        <div className="flex justify-center gap-4">
            <Button asChild>
                <Link href="/faq">View FAQ</Link>
            </Button>
            <Button variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}

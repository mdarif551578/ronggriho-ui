import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Truck } from 'lucide-react';

export default function TrackingPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-15rem)] py-12 px-4">
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <Truck className="h-12 w-12 mx-auto text-primary" />
                <CardTitle className="text-2xl font-headline mt-4">Track Your Order</CardTitle>
                <CardDescription>Enter your order ID to see its status.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="order-id">Order ID</Label>
                        <Input id="order-id" placeholder="e.g., DT12345678" />
                    </div>
                    <Button type="submit" className="w-full">
                        Track Order
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
  );
}

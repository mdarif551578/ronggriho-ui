
'use client';

import { useState, FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Truck, PackageCheck, Package, CircleCheck, CircleX } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

type TrackingStatus = 'idle' | 'loading' | 'found' | 'not_found';
type TrackingEvent = {
    status: string;
    location: string;
    date: string;
    icon: React.ElementType;
};

const mockTrackingData: { [key: string]: TrackingEvent[] } = {
    'DT12345': [
        { status: 'Delivered', location: 'Dhaka, BD', date: '2023-10-26', icon: PackageCheck },
        { status: 'Out for delivery', location: 'Dhaka Hub', date: '2023-10-26', icon: Truck },
        { status: 'Package processed', location: 'Dhaka Hub', date: '2023-10-25', icon: Package },
        { status: 'Order created', location: 'Warehouse', date: '2023-10-24', icon: CircleCheck },
    ],
    'DT12343': [
        { status: 'Cancelled', location: 'Warehouse', date: '2023-08-01', icon: CircleX },
        { status: 'Order created', location: 'Warehouse', date: '2023-08-01', icon: CircleCheck },
    ]
};

export default function TrackingPage() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
  const [status, setStatus] = useState<TrackingStatus>('idle');
  const [trackingInfo, setTrackingInfo] = useState<TrackingEvent[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!orderId) return;
    setStatus('loading');
    setTimeout(() => {
        const data = mockTrackingData[orderId.toUpperCase()];
        if (data) {
            setTrackingInfo(data);
            setStatus('found');
        } else {
            setStatus('not_found');
        }
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="text-center">
                <Truck className="h-12 w-12 mx-auto text-primary" />
                <CardTitle className="text-2xl font-headline mt-4">Track Your Order</CardTitle>
                <CardDescription>Enter your order ID to see its status.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-grow space-y-2">
                        <Label htmlFor="order-id" className="sr-only">Order ID</Label>
                        <Input 
                            id="order-id" 
                            placeholder="e.g., DT12345" 
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full sm:w-auto" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Tracking...' : 'Track Order'}
                    </Button>
                </form>
            </CardContent>
        </Card>

        {status === 'not_found' && (
            <Card className="w-full max-w-2xl mx-auto mt-8">
                <CardContent className="py-10 text-center">
                    <p className="text-lg text-destructive">Order not found.</p>
                    <p className="text-muted-foreground">Please check the Order ID and try again.</p>
                </CardContent>
            </Card>
        )}

        {status === 'found' && (
            <Card className="w-full max-w-2xl mx-auto mt-8">
                <CardHeader>
                    <CardTitle>Tracking Details for #{orderId.toUpperCase()}</CardTitle>
                    <CardDescription>
                        Current status: <span className="font-semibold text-primary">{trackingInfo[0]?.status}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-6 border-l-2 border-primary/20 ml-2">
                        {trackingInfo.map((event, index) => (
                            <li key={index} className="relative pl-8">
                                <div className="absolute -left-[1.05rem] top-1 flex items-center justify-center bg-background">
                                    <event.icon className="h-8 w-8 p-1.5 rounded-full bg-primary text-primary-foreground" />
                                </div>
                                <p className="font-semibold">{event.status}</p>
                                <p className="text-sm text-muted-foreground">{event.location}</p>
                                <p className="text-xs text-muted-foreground">{event.date}</p>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        )}
    </div>
  );
}

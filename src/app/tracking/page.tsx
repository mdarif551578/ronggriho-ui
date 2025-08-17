
'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Truck, PackageCheck, Package, CircleCheck, CircleX, Warehouse } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { firestore } from '@/lib/firebase';
import { doc, getDoc, Timestamp } from 'firebase/firestore';

type TrackingStatus = 'idle' | 'loading' | 'found' | 'not_found';

interface TrackingEventData {
    status: string;
    location: string;
    date: Timestamp;
}

interface TrackingEvent extends TrackingEventData {
    icon: React.ElementType;
}

const statusIconMap: { [key: string]: React.ElementType } = {
    'order created': CircleCheck,
    'processing': Warehouse,
    'shipped': Truck,
    'delivered': PackageCheck,
    'completed': PackageCheck,
    'cancelled': CircleX,
};

const getIconForStatus = (status: string): React.ElementType => {
    return statusIconMap[status.toLowerCase()] || Package;
};


export default function TrackingPage() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<TrackingStatus>('idle');
  const [trackingInfo, setTrackingInfo] = useState<TrackingEvent[]>([]);
  const [currentStatus, setCurrentStatus] = useState('');

  const fetchOrder = async (id: string) => {
    if (!id) return;
    setStatus('loading');
    try {
        const orderRef = doc(firestore, 'orders', id);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
            const orderData = orderSnap.data();
            
            const history: TrackingEventData[] = orderData.trackingHistory || [
                { status: orderData.status, location: 'Dhaka, Bangladesh', date: orderData.createdAt }
            ];

            const processedHistory: TrackingEvent[] = history
                .sort((a, b) => b.date.seconds - a.date.seconds)
                .map(event => ({
                    ...event,
                    icon: getIconForStatus(event.status),
                }));

            setTrackingInfo(processedHistory);
            setCurrentStatus(orderData.status);
            setStatus('found');
        } else {
            setStatus('not_found');
        }
    } catch (error) {
        console.error("Error fetching tracking info:", error);
        setStatus('not_found');
    }
  }

  useEffect(() => {
    const paramOrderId = searchParams.get('orderId');
    if (paramOrderId) {
        setOrderId(paramOrderId);
        fetchOrder(paramOrderId);
    }
  }, [searchParams]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchOrder(orderId);
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
                            placeholder="Enter your Order ID" 
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full sm:w-auto" disabled={status === 'loading' || !orderId}>
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
                    <CardTitle>Tracking Details for #{orderId.toUpperCase().slice(0, 7)}</CardTitle>
                    <CardDescription>
                        Current status: <span className="font-semibold text-primary">{currentStatus}</span>
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
                                <p className="text-xs text-muted-foreground">{new Date(event.date.seconds * 1000).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        )}
    </div>
  );
}


'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Truck, PackageCheck, Package, CircleCheck, CircleX, Warehouse } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { clientFirestore } from '@/lib/firebase';
import { doc, getDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import type { Order } from '@/lib/types';


type TrackingStatus = 'idle' | 'loading' | 'found' | 'not_found';

interface TrackingEvent {
    status: string;
    date: Timestamp;
    icon: React.ElementType;
}

const statusIconMap: { [key: string]: React.ElementType } = {
    'order created': CircleCheck,
    'processing': Warehouse,
    'on the way': Truck,
    'shipped': Truck,
    'delivered': PackageCheck,
    'completed': PackageCheck,
    'cancelled': CircleX,
};

const getIconForStatus = (status: string): React.ElementType => {
    const normalizedStatus = status.toLowerCase();
    for (const key in statusIconMap) {
        if (normalizedStatus.includes(key)) {
            return statusIconMap[key];
        }
    }
    return Package;
};


export default function TrackingPage() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<TrackingStatus>('idle');
  const [trackingHistory, setTrackingHistory] = useState<TrackingEvent[]>([]);
  const [currentStatus, setCurrentStatus] = useState('');

  const fetchOrder = async (id: string) => {
    if (!id) return;
    setStatus('loading');
    try {
        const orderRef = doc(clientFirestore, 'orders', id);
        
        onSnapshot(orderRef, (docSnap) => {
             if (docSnap.exists()) {
                const orderData = docSnap.data() as Order;
                
                // The status field directly holds the latest status string.
                const latestStatus = orderData.status || 'Status Unavailable';
                setCurrentStatus(latestStatus);
                
                // Mocking history based on current status for now
                // A real app would have a history field in the order document
                const history: TrackingEvent[] = [
                    {
                        status: latestStatus,
                        date: orderData.createdAt, // Using createdAt as a placeholder
                        icon: getIconForStatus(latestStatus)
                    },
                     {
                        status: 'Order Created',
                        date: orderData.createdAt,
                        icon: getIconForStatus('order created')
                    }
                ].sort((a,b) => b.date.seconds - a.date.seconds);

                setTrackingHistory(history);
                setStatus('found');
            } else {
                setStatus('not_found');
            }
        });

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
                        {trackingHistory.map((event, index) => (
                            <li key={index} className="relative pl-8">
                                <div className="absolute -left-[1.05rem] top-1 flex items-center justify-center bg-background">
                                    <event.icon className="h-8 w-8 p-1.5 rounded-full bg-primary text-primary-foreground" />
                                </div>
                                <p className="font-semibold">{event.status}</p>
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

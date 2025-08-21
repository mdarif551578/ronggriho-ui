
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
import type { Order, StatusHistoryItem } from '@/lib/types';


type TrackingStatus = 'idle' | 'loading' | 'found' | 'not_found';

interface TrackingEvent {
    status: string;
    date: Timestamp;
    icon: React.ElementType;
    description: string;
}

const statusIconMap: { [key: string]: React.ElementType } = {
    'pending': CircleCheck,
    'order placed': CircleCheck,
    'processing': Warehouse,
    'shipped': Truck,
    'on the way': Truck,
    'delivered': PackageCheck,
    'cancelled': CircleX,
};

const statusDescriptionMap: { [key: string]: string } = {
    'pending': 'আপনার অর্ডারটি গৃহীত হয়েছে এবং পর্যালোচনার অপেক্ষায় আছে।',
    'order placed': 'আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে।',
    'processing': 'আপনার অর্ডারটি প্রস্তুত করা হচ্ছে।',
    'shipped': 'আপনার অর্ডারটি কুরিয়ারে পাঠানো হয়েছে।',
    'on the way': 'আপনার অর্ডারটি ডেলিভারির জন্য বের হয়েছে।',
    'delivered': 'আপনার অর্ডারটি সফলভাবে ডেলিভারি করা হয়েছে।',
    'cancelled': 'আপনার অর্ডারটি বাতিল করা হয়েছে।',
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

const getDescriptionForStatus = (status: string): string => {
    const normalizedStatus = status.toLowerCase();
    for (const key in statusDescriptionMap) {
        if (normalizedStatus.includes(key)) {
            return statusDescriptionMap[key];
        }
    }
    return 'আপনার অর্ডারের অবস্থা আপডেট করা হয়েছে।';
};


export default function TrackingPage() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<TrackingStatus>('idle');
  const [trackingHistory, setTrackingHistory] = useState<TrackingEvent[]>([]);
  const [latestStatusEvent, setLatestStatusEvent] = useState<TrackingEvent | null>(null);

  const fetchOrder = async (id: string) => {
    if (!id) return;
    setStatus('loading');
    try {
        const orderRef = doc(clientFirestore, 'orders', id);
        
        const unsubscribe = onSnapshot(orderRef, (docSnap) => {
             if (docSnap.exists()) {
                const orderData = docSnap.data() as Order;
                
                const history: TrackingEvent[] = (orderData.statusHistory || [])
                    .map(event => ({
                        status: event.status,
                        date: event.timestamp,
                        icon: getIconForStatus(event.status),
                        description: getDescriptionForStatus(event.status),
                    }))
                    .sort((a,b) => b.date.seconds - a.date.seconds);

                setTrackingHistory(history);
                setLatestStatusEvent(history[0] || null);
                setStatus('found');
            } else {
                setStatus('not_found');
                setTrackingHistory([]);
                setLatestStatusEvent(null);
            }
        });

        // Cleanup the listener when the component unmounts or the orderId changes
        return () => unsubscribe();

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
    } else {
        setStatus('idle');
        setTrackingHistory([]);
        setLatestStatusEvent(null);
    }
  }, [searchParams]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('orderId', orderId);
    window.history.pushState({}, '', newUrl);
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

        {status === 'found' && latestStatusEvent && (
            <Card className="w-full max-w-2xl mx-auto mt-8">
                <CardHeader>
                    <CardTitle>Tracking Details for #{orderId.toUpperCase().slice(0, 7)}</CardTitle>
                    <CardDescription>
                        Current status: <span className="font-semibold text-primary">{latestStatusEvent.status}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="mb-8 p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-4">
                           <latestStatusEvent.icon className="h-10 w-10 p-2 rounded-full bg-primary text-primary-foreground" />
                           <div>
                            <p className="font-bold text-lg">{latestStatusEvent.status}</p>
                            <p className="text-muted-foreground">{latestStatusEvent.description}</p>
                            <p className="text-sm text-muted-foreground mt-1">Last Updated: {new Date(latestStatusEvent.date.seconds * 1000).toLocaleString()}</p>
                           </div>
                        </div>
                    </div>
                    
                    <h3 className="font-semibold mb-4">Order History</h3>
                    <ul className="space-y-6 border-l-2 border-primary/20 ml-2">
                        {trackingHistory.map((event, index) => (
                            <li key={index} className="relative pl-8">
                                <div className="absolute -left-[1.05rem] top-1 flex items-center justify-center bg-background">
                                    <event.icon className="h-8 w-8 p-1.5 rounded-full bg-primary text-primary-foreground" />
                                </div>
                                <p className="font-semibold">{event.status}</p>
                                <p className="text-sm text-muted-foreground">{event.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">{new Date(event.date.seconds * 1000).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        )}
    </div>
  );
}

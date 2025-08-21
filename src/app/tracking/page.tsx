
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
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [trackingHistory, setTrackingHistory] = useState<TrackingEvent[]>([]);

  const fetchOrder = async (id: string) => {
    if (!id) return;
    setStatus('loading');
    try {
        const orderRef = doc(clientFirestore, 'orders', id);
        
        const unsubscribe = onSnapshot(orderRef, (docSnap) => {
             if (docSnap.exists()) {
                const fetchedOrderData = docSnap.data() as Order;
                setOrderData(fetchedOrderData);
                
                const history: TrackingEvent[] = (fetchedOrderData.statusHistory || [])
                    .map(event => ({
                        status: event.status,
                        date: event.timestamp,
                        icon: getIconForStatus(event.status),
                        description: getDescriptionForStatus(event.status),
                    }))
                    .sort((a,b) => b.date.seconds - a.date.seconds);

                setTrackingHistory(history);
                setStatus('found');
            } else {
                setStatus('not_found');
                setOrderData(null);
                setTrackingHistory([]);
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
        setOrderData(null);
        setTrackingHistory([]);
    }
  }, [searchParams]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('orderId', orderId);
    window.history.pushState({}, '', newUrl);
    fetchOrder(orderId);
  };
  
  const latestStatusEvent = trackingHistory[0] || null;
  const currentStatus = orderData?.status || 'Pending';
  const CurrentStatusIcon = getIconForStatus(currentStatus);
  const currentStatusDescription = getDescriptionForStatus(currentStatus);

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

        {status === 'found' && orderData && (
            <Card className="w-full max-w-2xl mx-auto mt-8">
                <CardHeader>
                    <CardTitle>Tracking Details for #{orderId.toUpperCase().slice(0, 7)}</CardTitle>
                    <CardDescription>
                        Current status: <span className="font-semibold text-primary">{currentStatus}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-4">
                           <CurrentStatusIcon className="h-10 w-10 p-2 rounded-full bg-primary text-primary-foreground" />
                           <div>
                            <p className="font-bold text-lg">{currentStatus}</p>
                            <p className="text-muted-foreground">{currentStatusDescription}</p>
                            {latestStatusEvent && (
                                <p className="text-sm text-muted-foreground mt-1">Last Updated: {new Date(latestStatusEvent.date.seconds * 1000).toLocaleString()}</p>
                            )}
                           </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )}
    </div>
  );
}

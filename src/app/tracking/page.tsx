
import { Suspense } from 'react';
import TrackingClient from './tracking-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function TrackingPage() {
  return (
    <Suspense fallback={<TrackingPageLoading />}>
      <TrackingClient />
    </Suspense>
  );
}

function TrackingPageLoading() {
    return (
        <div className="container mx-auto px-4 py-12">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader className="text-center">
                    <Truck className="h-12 w-12 mx-auto text-primary" />
                    <CardTitle className="text-2xl font-headline mt-4">Track Your Order</CardTitle>
                    <CardDescription>Enter your order ID to see its status.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Skeleton className="h-10 flex-grow" />
                        <Skeleton className="h-10 w-full sm:w-28" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

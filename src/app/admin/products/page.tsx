
'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { clientFirestore } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import AdminProductsClientPage from './products-client-page';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const q = query(collection(clientFirestore, 'products'));
                const querySnapshot = await getDocs(q);
                const fetchedProducts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Product));
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
             <div>
                <div className="flex items-center justify-between mb-8">
                    <Skeleton className="h-10 w-1/4" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <Card>
                    <CardContent className="p-0">
                        <div className="p-6">
                            <Skeleton className="h-12 w-full mb-4" />
                            <Skeleton className="h-12 w-full mb-4" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return <AdminProductsClientPage products={products} />;
}

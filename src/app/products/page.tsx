
'use client';

import { Suspense } from 'react';
import ProductsList from './products-list';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageLoading />}>
      <ProductsList />
    </Suspense>
  );
}

function ProductsPageLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 lg:sticky lg:top-20 self-start">
          <Skeleton className="h-10 w-full mb-4 lg:hidden" />
          <Skeleton className="h-96 w-full hidden lg:block" />
        </aside>
        <div className="lg:col-span-3">
          <Skeleton className="h-10 w-full mb-4 hidden lg:block" />
          <div className="flex flex-col sm:flex-row justify-between items-baseline mb-4">
            <Skeleton className="h-10 w-1/2" />
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-10 w-44" />
            </div>
          </div>
           <Skeleton className="h-8 w-full mb-4" />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-[4/5] w-full" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-9 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/product-card';
import { collection, getDocs, query, where, orderBy, limit, startAfter, DocumentData, Query } from 'firebase/firestore';
import { clientFirestore } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import ProductFilters from '@/components/product-filters';
import ActiveFilters from '@/components/active-filters';
import SortDropdown from '@/components/sort-dropdown';
import ProductSearch from '@/components/product-search';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PRODUCTS_PER_PAGE = 9;

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();

  const getSortOrder = useCallback(() => {
    const sort = searchParams.get('sort');
    if (sort === 'price-asc') return { field: 'price', direction: 'asc' as const };
    if (sort === 'price-desc') return { field: 'price', direction: 'desc' as const };
    return { field: 'createdAt', direction: 'desc' as const };
  }, [searchParams]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const { field, direction } = getSortOrder();
        let q: Query<DocumentData> = collection(clientFirestore, 'products');
        
        // Only apply sorting and simple price filters at the query level
        const price = searchParams.get('price');
        if (price) {
            const [min, max] = price.split('-').map(Number);
            if (!isNaN(min) && min > 0) q = query(q, where('price', '>=', min));
            if (!isNaN(max) && max > 0) q = query(q, where('price', '<=', max));
        }

        const tag = searchParams.get('tag');
        if (tag === 'flash-sale') q = query(q, where('isFlashSale', '==', true));
        if (tag === 'featured') q = query(q, where('isFeatured', '==', true));

        q = query(q, orderBy(field, direction), limit(100)); // Fetch a larger batch for client-side filtering

        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setAllProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [searchParams, getSortOrder]); // Refetch when sort order changes

  const filteredProducts = useMemo(() => {
    const categories = searchParams.getAll('category');
    const sizes = searchParams.getAll('size');
    const colors = searchParams.getAll('color').map(c => c.replace('-', ' '));
    const searchQuery = searchParams.get('q')?.toLowerCase();

    return allProducts.filter(product => {
      const categoryMatch = categories.length === 0 || categories.includes(product.category);
      const sizeMatch = sizes.length === 0 || product.sizes.some(s => sizes.includes(s));
      const colorMatch = colors.length === 0 || product.colors.some(c => colors.includes(c.split(':')[0]));
      const searchMatch = !searchQuery || product.name.toLowerCase().includes(searchQuery);

      return categoryMatch && sizeMatch && colorMatch && searchMatch;
    });
  }, [allProducts, searchParams]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, page]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  useEffect(() => {
    setPage(1); // Reset to first page when filters change
  }, [searchParams]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(p => p + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(p => p - 1);
    }
  };
  
  const getTitle = () => {
    const q = searchParams.get('q');
    if (q) {
      return `Search results for "${q}"`;
    }
    const categoryParam = searchParams.getAll('category');
    if (categoryParam.length === 1) {
      return categoryParam[0];
    }
    if (categoryParam.length > 1) {
        return 'Filtered Products';
    }
    return 'All Products';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        
        <aside className="lg:col-span-1 lg:sticky lg:top-20 self-start">
          <div className="lg:hidden mb-4">
            <ProductSearch />
          </div>
          <ProductFilters />
        </aside>
        
        <div className="lg:col-span-3">
          <div className="hidden lg:block mb-4">
             <ProductSearch />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-baseline mb-4">
            <h1 className="text-3xl md:text-4xl font-bold font-headline">{getTitle()}</h1>
             <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <p className="text-sm text-muted-foreground whitespace-nowrap">{filteredProducts.length} products found</p>
                <SortDropdown />
             </div>
          </div>

          <ActiveFilters />
          
          {loading ? (
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
          ) : paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8">
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button onClick={handlePrevPage} disabled={page === 1 || loading}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  <span className="font-medium text-sm">Page {page} of {totalPages}</span>
                  <Button onClick={handleNextPage} disabled={page === totalPages || loading}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
           ) : (
            <div className="text-center py-20 mt-8">
                <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
            </div>
           )}
        </div>
      </div>
    </div>
  );
}

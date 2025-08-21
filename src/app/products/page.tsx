
'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/product-card';
import { collection, getDocs, query, where, orderBy, limit, startAfter, endBefore, limitToLast, DocumentSnapshot, Query, DocumentData } from 'firebase/firestore';
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const [firstVisible, setFirstVisible] = useState<DocumentSnapshot | null>(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const searchParams = useSearchParams();

  const getSortOrder = useCallback(() => {
    const sort = searchParams.get('sort');
    if (sort === 'price-asc') return { field: 'price', direction: 'asc' };
    if (sort === 'price-desc') return { field: 'price', direction: 'desc' };
    return { field: 'createdAt', direction: 'desc' };
  }, [searchParams]);


  const buildQuery = useCallback(() => {
    const { field, direction } = getSortOrder();
    let q: Query<DocumentData> = collection(clientFirestore, 'products');

    const categories = searchParams.getAll('category');
    if (categories.length > 0) {
      q = query(q, where('category', 'in', categories.map(c => c.replace(/-/g, ' ').replace(/ > /g, ' > ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))));
    }

    const sizes = searchParams.getAll('size');
    if (sizes.length > 0) {
      q = query(q, where('sizes', 'array-contains-any', sizes));
    }
    
    const colors = searchParams.getAll('color');
    if (colors.length > 0) {
        const colorNames = colors.map(c => c.charAt(0).toUpperCase() + c.slice(1));
        q = query(q, where('colors', 'array-contains-any', colorNames.map(name => `${name}:${'#000000'}`))); // Firestore needs a full value to query
    }

    const price = searchParams.get('price');
    if (price) {
        const [min, max] = price.split('-').map(Number);
        if (!isNaN(min)) q = query(q, where('price', '>=', min));
        if (!isNaN(max)) q = query(q, where('price', '<=', max));
    }

    const searchQuery = searchParams.get('q');
    if (searchQuery) {
        // Firestore doesn't support partial string matches natively.
        // A more robust solution would use a search service like Algolia.
        // For now, we fetch all and filter client-side for search.
    }
    
    const tag = searchParams.get('tag');
    if (tag === 'flash-sale') q = query(q, where('isFlashSale', '==', true));
    if (tag === 'featured') q = query(q, where('isFeatured', '==', true));
    
    q = query(q, orderBy(field, direction));
    
    return q;
  }, [searchParams, getSortOrder]);
  
  const fetchPage = useCallback(async (direction: 'next' | 'prev' | 'first') => {
    setLoading(true);
    try {
        let q = buildQuery();
        
        if (direction === 'next' && lastVisible) {
            q = query(q, startAfter(lastVisible), limit(PRODUCTS_PER_PAGE));
        } else if (direction === 'prev' && firstVisible) {
            const prevQuery = query(buildQuery(), endBefore(firstVisible), limitToLast(PRODUCTS_PER_PAGE));
             const querySnapshot = await getDocs(prevQuery);
             const fetchedProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
             setProducts(fetchedProducts);
             setFirstVisible(querySnapshot.docs[0] || null);
             setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
             setHasNextPage(true);
             setLoading(false);
             return;
        } else { // First page
             q = query(q, limit(PRODUCTS_PER_PAGE));
        }

        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(fetchedProducts);
        
        setFirstVisible(querySnapshot.docs[0] || null);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] || null);

        // Check for next page
        if (querySnapshot.docs.length < PRODUCTS_PER_PAGE) {
          setHasNextPage(false);
        } else {
          const nextQuery = query(buildQuery(), startAfter(querySnapshot.docs[querySnapshot.docs.length - 1]), limit(1));
          const nextSnapshot = await getDocs(nextQuery);
          setHasNextPage(!nextSnapshot.empty);
        }
        
    } catch (error) {
        console.error("Error fetching products: ", error);
    } finally {
        setLoading(false);
    }
  }, [buildQuery, lastVisible, firstVisible]);


  useEffect(() => {
    // Fetch all products for filter options
    const fetchAllForFilters = async () => {
        try {
            const q = query(collection(clientFirestore, 'products'));
            const querySnapshot = await getDocs(q);
            const fetchedProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
            setAllProducts(fetchedProducts);
        } catch (error) {
            console.error("Error fetching all products for filters: ", error);
        }
    }
    fetchAllForFilters();

    // Fetch the first page of products whenever filters change
    setPage(1);
    setLastVisible(null);
    setFirstVisible(null);
    fetchPage('first');
  }, [searchParams]);

  const handleNextPage = () => {
    if (!lastVisible) return;
    setPage(p => p + 1);
    fetchPage('next');
  };

  const handlePrevPage = () => {
    if (page === 1) return;
    setPage(p => p - 1);
    fetchPage('prev');
  };
  
  const getTitle = () => {
    const q = searchParams.get('q');
    if (q) {
      return `Search results for "${q}"`;
    }
    const categoryParam = searchParams.getAll('category');
    if (categoryParam.length === 1) {
      const categoryName = categoryParam[0].replace(/-/g, ' ').replace(/ > /g, ' > ');
      return categoryName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
    if (categoryParam.length > 1) {
        return 'Filtered Products';
    }
    return 'All Products';
  };

  // Client-side search filtering (as Firestore doesn't support partial text search well)
  const finalProducts = useMemo(() => {
    const q = searchParams.get('q');
    if (q) {
      return products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()));
    }
    return products;
  }, [products, searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        
        <div className="lg:col-span-1">
          <div className="lg:hidden mb-4">
            <ProductSearch />
          </div>
          <ProductFilters allProducts={allProducts} />
        </div>
        
        <div className="lg:col-span-3">
          <div className="hidden lg:block mb-4">
             <ProductSearch />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-baseline mb-4">
            <h1 className="text-3xl md:text-4xl font-bold font-headline">{getTitle()}</h1>
             <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <p className="text-sm text-muted-foreground whitespace-nowrap">{finalProducts.length} products shown</p>
                <SortDropdown />
             </div>
          </div>

          <ActiveFilters allProducts={allProducts} />
          
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
          ) : finalProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8">
                {finalProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button onClick={handlePrevPage} disabled={page === 1 || loading}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <span className="font-medium text-sm">Page {page}</span>
                <Button onClick={handleNextPage} disabled={!hasNextPage || loading}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
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

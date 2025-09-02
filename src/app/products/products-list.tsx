
'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/product-card';
import type { Product } from '@/lib/types';
import ProductFilters from '@/components/product-filters';
import ActiveFilters from '@/components/active-filters';
import SortDropdown from '@/components/sort-dropdown';
import ProductSearch from '@/components/product-search';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PRODUCTS_PER_PAGE = 9;

interface ProductsListProps {
    allProducts: Product[];
}

export default function ProductsList({ allProducts }: ProductsListProps) {
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();

  const getSortOrder = useCallback(() => {
    const sort = searchParams.get('sort');
    if (sort === 'price-asc') return { field: 'price', direction: 'asc' as const };
    if (sort === 'price-desc') return { field: 'price', direction: 'desc' as const };
    return { field: 'createdAt', direction: 'desc' as const };
  }, [searchParams]);

  const sortedProducts = useMemo(() => {
    const { field, direction } = getSortOrder();
    const sorted = [...allProducts].sort((a, b) => {
        const aVal = field === 'price' ? (a.discountPrice || a.price) : new Date(a.createdAt).getTime();
        const bVal = field === 'price' ? (b.discountPrice || b.price) : new Date(b.createdAt).getTime();

        if (direction === 'asc') {
            return aVal - bVal;
        } else {
            return bVal - aVal;
        }
    });
    return sorted;
  }, [allProducts, getSortOrder]);


  const filteredProducts = useMemo(() => {
    const categories = searchParams.getAll('category');
    const sizes = searchParams.getAll('size');
    const colors = searchParams.getAll('color').map(c => c.replace('-', ' '));
    const searchQuery = searchParams.get('q')?.toLowerCase();
    const price = searchParams.get('price');
    const tag = searchParams.get('tag');

    return sortedProducts.filter(product => {
      const categoryMatch = categories.length === 0 || product.category.some(cat => categories.includes(cat));
      const sizeMatch = sizes.length === 0 || product.sizes.some(s => sizes.includes(s));
      const colorMatch = colors.length === 0 || product.colors.some(c => colors.includes(c.split(':')[0]));
      const searchMatch = !searchQuery || product.name.toLowerCase().includes(searchQuery);

      let priceMatch = true;
      if (price) {
          const [min, max] = price.split('-').map(Number);
          const productPrice = product.discountPrice || product.price;
          if (!isNaN(min) && min > 0) priceMatch = priceMatch && productPrice >= min;
          if (!isNaN(max) && max > 0) priceMatch = priceMatch && productPrice <= max;
      }
      
      let tagMatch = true;
      if (tag) {
          if (tag === 'flash-sale') tagMatch = product.isFlashSale;
          if (tag === 'featured') tagMatch = product.isFeatured;
      }


      return categoryMatch && sizeMatch && colorMatch && searchMatch && priceMatch && tagMatch;
    });
  }, [sortedProducts, searchParams]);

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
          
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8">
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button onClick={handlePrevPage} disabled={page === 1}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  <span className="font-medium text-sm">Page {page} of {totalPages}</span>
                  <Button onClick={handleNextPage} disabled={page === totalPages}>
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

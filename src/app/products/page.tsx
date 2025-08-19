
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/product-card';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { clientFirestore } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import ProductFilters from '@/components/product-filters';
import ActiveFilters from '@/components/active-filters';
import SortDropdown from '@/components/sort-dropdown';
import ProductSearch from '@/components/product-search';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const q = query(collection(clientFirestore, 'products'));
        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setAllProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const sortProducts = (products: Product[]): Product[] => {
    const sort = searchParams.get('sort');
    if (sort === 'newest') {
      return [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    if (sort === 'price-asc') {
      return [...products].sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    }
    if (sort === 'price-desc') {
      return [...products].sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    }
    return products;
  };

  const filterProducts = (products: Product[]): Product[] => {
    if (!searchParams) return products;

    let filtered = products;
    
    const categories = searchParams.getAll('category');
    if (categories.length > 0) {
      filtered = filtered.filter(product => categories.some(c => product.category.toLowerCase().replace(/ > /g, '-').replace(/ /g, '-') === c.toLowerCase()));
    }

    const sizes = searchParams.getAll('size');
    if (sizes.length > 0) {
      filtered = filtered.filter(product => product.sizes.some(s => sizes.includes(s)));
    }
    
    const colors = searchParams.getAll('color');
    if (colors.length > 0) {
        filtered = filtered.filter(product => 
            product.colors.some(c => {
                const [colorName] = c.split(':');
                return colors.includes(colorName.toLowerCase());
            })
        );
    }

    const price = searchParams.get('price');
    if (price) {
        const [min, max] = price.split('-').map(Number);
        if (!isNaN(min) && !isNaN(max)) {
            filtered = filtered.filter(product => {
                const effectivePrice = product.discountPrice || product.price;
                return effectivePrice >= min && effectivePrice <= max;
            });
        }
    }

    const q = searchParams.get('q');
    if (q) {
        filtered = filtered.filter(product => product.name.toLowerCase().includes(q.toLowerCase()));
    }
    
    const tag = searchParams.get('tag');
    if (tag === 'flash-sale') {
      filtered = filtered.filter(p => p.isFlashSale);
    }
    if (tag === 'featured') {
      filtered = filtered.filter(p => p.isFeatured);
    }


    return filtered;
  };
  
  const filtered = filterProducts(allProducts);
  const sortedAndFilteredProducts = sortProducts(filtered);

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
                <p className="text-sm text-muted-foreground whitespace-nowrap">{sortedAndFilteredProducts.length} products found</p>
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
          ) : sortedAndFilteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8">
              {sortedAndFilteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
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

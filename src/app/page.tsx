
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/product-card';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { clientFirestore } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';


export default function Home() {
  const [flashDeals, setFlashDeals] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ name: string; href: string; image: string; dataAiHint: string; }[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      setLoading(true);
      try {
        const productsRef = collection(clientFirestore, 'products');
        
        // Fetch Flash Deals
        const flashDealsQuery = query(productsRef, where('isFlashSale', '==', true), limit(4));
        const flashDealsSnapshot = await getDocs(flashDealsQuery);
        const fetchedFlashDeals = flashDealsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setFlashDeals(fetchedFlashDeals);

        // Fetch Featured Products
        const featuredQuery = query(productsRef, where('isFeatured', '==', true), limit(4));
        const featuredSnapshot = await getDocs(featuredQuery);
        const fetchedFeatured = featuredSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setFeaturedProducts(fetchedFeatured);

        // Define static modern categories
        const modernCategories = [
            { name: "Urban Desi", href: "/products?category=Urban+Desi", dataAiHint: "urban fashion" },
            { name: "Global Threads", href: "/products?category=Global+Threads", dataAiHint: "modern clothing" },
            { name: "T-Shirts", href: "/products?category=T-Shirts", dataAiHint: "t-shirt" },
            { name: "Accessories", href: "/products?category=Accessories", dataAiHint: "fashion accessory" },
        ];
        
        setCategories(modernCategories.map(cat => ({
            ...cat,
            image: "https://placehold.co/400x400.png"
        })));

      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsAndCategories();
  }, []);

  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1600x900.png"
          alt="Fashion model"
          fill
          className="z-0 object-cover"
          data-ai-hint="youth fashion banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
        <div className="z-20 p-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
            The Future of Dhaka Style
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl">
            Curated looks for the modern Bangladeshi.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/products">Shop New Arrivals <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      {/* Flash Deals */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-3xl font-bold font-headline">Flash Deals</h2>
          <Button variant="link" asChild>
            <Link href="/products?tag=flash-sale">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-[4/5] w-full" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-9 w-full" />
              </div>
            ))
          ) : (
            flashDeals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center font-headline mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {loading ? (
             Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                 <Skeleton className="aspect-square w-full" />
                 <Skeleton className="h-8 w-full mt-2" />
              </div>
            ))
          ) : (
            categories.map(category => (
              <Link key={category.name} href={category.href} className="group block">
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardContent className="p-0">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={400}
                      height={400}
                      className="w-full h-auto aspect-square object-cover"
                      data-ai-hint={category.dataAiHint}
                    />
                  </CardContent>
                  <CardFooter className="p-4">
                    <h3 className="text-lg font-semibold w-full text-center">{category.name}</h3>
                  </CardFooter>
                </Card>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-secondary/50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center font-headline mb-8">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-[4/5] w-full" />
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-9 w-full" />
                </div>
              ))
            ) : (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

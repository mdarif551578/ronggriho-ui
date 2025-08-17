import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/product-card';
import { getProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import StyleFinder from '@/components/style-finder';


export default async function Home() {
  const allProducts: Product[] = await getProducts();
  const flashDeals = allProducts.filter(p => p.discountPrice).slice(0, 4);
  const featuredProducts = allProducts.filter(p => p.tags.includes('featured')).slice(0, 4);

  const categories = [
    { name: "T-Shirts", image: "https://placehold.co/400x400.png", dataAiHint: "tshirt fashion" },
    { name: "Ethnic Wear", image: "https://placehold.co/400x400.png", dataAiHint: "saree model" },
    { name: "Accessories", image: "https://placehold.co/400x400.png", dataAiHint: "fashion accessories" },
    { name: "Western", image: "https://placehold.co/400x400.png", dataAiHint: "woman jeans" },
  ];

  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1600x900.png"
          alt="Fashion model"
          fill
          className="z-0 object-cover"
          data-ai-hint="fashion banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
        <div className="z-20 p-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
            Style Redefined, Locally Inspired
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl">
            Discover the best of Bangladeshi craftsmanship and contemporary trends.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/products">Shop Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      {/* Style Finder Section */}
      <section className="container mx-auto px-4">
        <StyleFinder />
      </section>

      {/* Flash Deals */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-3xl font-bold font-headline">Flash Deals</h2>
          <Button variant="link" asChild>
            <Link href="/products?sort=discount">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {flashDeals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center font-headline mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map(category => (
            <Link key={category.name} href={`/products?category=${category.name.toLowerCase().replace(' ', '-')}`} className="group block">
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
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-secondary/50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center font-headline mb-8">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

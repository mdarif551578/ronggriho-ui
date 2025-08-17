'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/mock-data';
import { useMemo, useState, useEffect } from 'react';

const allProducts = getProducts();
const allCategories = [...new Set(allProducts.map(p => p.category))];
const allColors = [...new Set(allProducts.flatMap(p => p.colors.map(c => c.name)))].sort();
const allSizes = [...new Set(allProducts.flatMap(p => p.sizes))].sort();

export default function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategories = searchParams.getAll('category');
  const selectedSizes = searchParams.getAll('size');
  const selectedColors = searchParams.getAll('color');
  const priceParam = searchParams.get('price');

  const { minProductPrice, maxProductPrice } = useMemo(() => {
    const prices = allProducts.map(p => p.discountPrice || p.price);
    return {
      minProductPrice: Math.floor(Math.min(...prices)),
      maxProductPrice: Math.ceil(Math.max(...prices)),
    };
  }, []);

  const [minPrice, setMinPrice] = useState<string | number>('');
  const [maxPrice, setMaxPrice] = useState<string | number>('');

  useEffect(() => {
    if (priceParam) {
      const parts = priceParam.split('-').map(Number);
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        setMinPrice(parts[0]);
        setMaxPrice(parts[1]);
      }
    } else {
        setMinPrice('');
        setMaxPrice('');
    }
  }, [priceParam]);


  const handleFilterChange = (type: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    const values = current.getAll(type);
    if (values.includes(value)) {
        current.delete(type);
        values.filter(v => v !== value).forEach(v => current.append(type, v));
    } else {
        current.append(type, value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  };

  const handlePriceSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const finalMinPrice = minPrice === '' || Number(minPrice) < minProductPrice ? minProductPrice : Number(minPrice);
    const finalMaxPrice = maxPrice === '' || Number(maxPrice) > maxProductPrice ? maxProductPrice : Number(maxPrice);

    current.set('price', `${finalMinPrice}-${finalMaxPrice}`);
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={['category', 'size', 'color', 'price']} className="space-y-4">
          <AccordionItem value="category">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent>
                <div className="space-y-2">
                    {allCategories.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                            <Checkbox 
                                id={`cat-${category}`} 
                                checked={selectedCategories.includes(category.toLowerCase())}
                                onCheckedChange={() => handleFilterChange('category', category.toLowerCase())}
                            />
                            <Label htmlFor={`cat-${category}`} className="font-normal">{category}</Label>
                        </div>
                    ))}
                </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="size">
            <AccordionTrigger>Size</AccordionTrigger>
            <AccordionContent>
                <div className="space-y-2">
                    {allSizes.map(size => (
                    <div key={size} className="flex items-center space-x-2">
                        <Checkbox 
                            id={`size-${size}`}
                            checked={selectedSizes.includes(size)}
                            onCheckedChange={() => handleFilterChange('size', size)}
                        />
                        <Label htmlFor={`size-${size}`} className="font-normal">{size}</Label>
                    </div>
                    ))}
                </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="color">
            <AccordionTrigger>Color</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {allColors.map(color => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color}`}
                      checked={selectedColors.includes(color.toLowerCase())}
                      onCheckedChange={() => handleFilterChange('color', color.toLowerCase())}
                    />
                    <Label htmlFor={`color-${color}`} className="font-normal">{color}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="price">
            <AccordionTrigger>Price</AccordionTrigger>
            <AccordionContent className="px-1 pt-4">
                <form onSubmit={handlePriceSubmit} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder={`Min (৳${minProductPrice})`}
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder={`Max (৳${maxProductPrice})`}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button type="submit" className="w-full">Apply Price</Button>
                </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

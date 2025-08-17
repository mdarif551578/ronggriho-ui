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
import { Slider } from '@/components/ui/slider';
import { getProducts } from '@/lib/mock-data';
import { useMemo } from 'react';

const allProducts = getProducts();
const allCategories = [...new Set(allProducts.map(p => p.category))];
const allColors = [...new Set(allProducts.flatMap(p => p.colors.map(c => c.name)))].sort();
const allSizes = [...new Set(allProducts.flatMap(p => p.sizes))].sort();

export default function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const handlePriceChange = (value: number[]) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('price', `${value[0]}-${value[1]}`);
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  }

  const { minProductPrice, maxProductPrice } = useMemo(() => {
    const prices = allProducts.map(p => p.discountPrice || p.price);
    return {
      minProductPrice: Math.floor(Math.min(...prices)),
      maxProductPrice: Math.ceil(Math.max(...prices)),
    };
  }, []);

  const selectedCategories = searchParams.getAll('category');
  const selectedSizes = searchParams.getAll('size');
  const selectedColors = searchParams.getAll('color');
  const priceParam = searchParams.get('price');
  const [minPrice, maxPrice] = useMemo(() => {
    if (priceParam) {
      const parts = priceParam.split('-').map(Number);
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        return parts;
      }
    }
    return [minProductPrice, maxProductPrice];
  }, [priceParam, minProductPrice, maxProductPrice]);

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
                <Slider
                    min={minProductPrice}
                    max={maxProductPrice}
                    step={100}
                    value={[minPrice, maxPrice]}
                    onValueCommit={handlePriceChange}
                    className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>৳{minPrice}</span>
                    <span>৳{maxPrice}</span>
                </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

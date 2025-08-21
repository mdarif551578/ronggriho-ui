
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
import { Product } from '@/lib/types';
import { useMemo, useState, useEffect } from 'react';
import { ScrollArea } from './ui/scroll-area';

interface FilterSidebarProps {
  allProducts: Product[];
  onFilterChange?: () => void;
}

export default function FilterSidebar({ allProducts, onFilterChange }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { allCategories, allColors, allSizes, minProductPrice, maxProductPrice } = useMemo(() => {
    const categories = [...new Set(allProducts.map(p => p.category))];
    const colors = [...new Set(allProducts.flatMap(p => p.colors))].sort();
    const sizes = [...new Set(allProducts.flatMap(p => p.sizes))].sort();
    const prices = allProducts.map(p => p.discountPrice || p.price);
    return {
      allCategories: categories,
      allColors: colors,
      allSizes: sizes,
      minProductPrice: prices.length > 0 ? Math.floor(Math.min(...prices)) : 0,
      maxProductPrice: prices.length > 0 ? Math.ceil(Math.max(...prices)) : 1000,
    };
  }, [allProducts]);

  const selectedCategories = searchParams.getAll('category');
  const selectedSizes = searchParams.getAll('size');
  const selectedColors = searchParams.getAll('color');
  const priceParam = searchParams.get('price');
  
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


  const handleMultiFilterChange = (type: string, value: string) => {
    const current = new URLSearchParams(searchParams.toString());
    
    const values = current.getAll(type);
    if (values.includes(value)) {
        // Create new params, excluding the one we want to remove
        const newParams = new URLSearchParams();
        current.forEach((val, key) => {
            if (key !== type || val !== value) {
                newParams.append(key, val);
            }
        });
        const search = newParams.toString();
        const query = search ? `?${search}` : '';
        router.push(`${pathname}${query}`, { scroll: false });
    } else {
        current.append(type, value);
        const search = current.toString();
        const query = search ? `?${search}` : '';
        router.push(`${pathname}${query}`, { scroll: false });
    }

    onFilterChange?.();
  };

  const handlePriceSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const current = new URLSearchParams(searchParams.toString());
    const minVal = minPrice === '' ? '' : Number(minPrice);
    const maxVal = maxPrice === '' ? '' : Number(maxPrice);

    if (minVal !== '' && maxVal !== '' && minVal > maxVal) {
        current.set('price', `${maxVal}-${minVal}`);
    } else if (minVal !== '' || maxVal !== '') {
        current.set('price', `${minVal}-${maxVal}`);
    } else {
        current.delete('price');
    }
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`, { scroll: false });
    onFilterChange?.();
  }

  const FilterContainer = ({ isMobile, children }: { isMobile: boolean, children: React.ReactNode }) => {
    if (isMobile) {
      return (
        <ScrollArea className="h-full">
            <div className="p-4">{children}</div>
        </ScrollArea>
      )
    }
    return (
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    );
  };


  return (
    <FilterContainer isMobile={!!onFilterChange}>
      <Accordion type="multiple" defaultValue={['category', 'size', 'color', 'price']} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
              <ScrollArea className="h-40">
                <div className="space-y-2 p-1">
                    {allCategories.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                            <Checkbox 
                                id={`cat-${category}`} 
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={() => handleMultiFilterChange('category', category)}
                            />
                            <Label htmlFor={`cat-${category}`} className="font-normal cursor-pointer">{category}</Label>
                        </div>
                    ))}
                </div>
              </ScrollArea>
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
                          onCheckedChange={() => handleMultiFilterChange('size', size)}
                      />
                      <Label htmlFor={`size-${size}`} className="font-normal cursor-pointer">{size}</Label>
                  </div>
                  ))}
              </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="color">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {allColors.map(colorString => {
                const [colorName] = colorString.split(':');
                return (
                    <div key={colorString} className="flex items-center space-x-2">
                    <Checkbox
                        id={`color-${colorName}`}
                        checked={selectedColors.includes(colorString)}
                        onCheckedChange={() => handleMultiFilterChange('color', colorString)}
                    />
                    <Label htmlFor={`color-${colorName}`} className="font-normal cursor-pointer">{colorName}</Label>
                    </div>
                )
            })}
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
                    min={0}
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder={`Max (৳${maxProductPrice})`}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full"
                    min={0}
                  />
                </div>
                <Button type="submit" className="w-full">Apply Price</Button>
              </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </FilterContainer>
  );
}

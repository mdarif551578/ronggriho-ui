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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Button } from './ui/button';
import { getProducts } from '@/lib/mock-data';

const allProducts = getProducts();
const allColors = [...new Set(allProducts.flatMap(p => p.colors.map(c => c.name)))];
const allSizes = [...new Set(allProducts.flatMap(p => p.sizes))];

export default function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (type: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    if (type === 'price') {
        current.set(type, value);
    } else if (type === 'color') {
        const colors = current.getAll(type);
        if (colors.includes(value)) {
            current.delete(type);
            colors.filter(c => c !== value).forEach(c => current.append(type, c));
        } else {
            current.append(type, value);
        }
    } else {
      if (current.get(type) === value) {
        current.delete(type);
      } else {
        current.set(type, value);
      }
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  };

  const handlePriceChange = (value: number[]) => {
    handleFilterChange('price', `${value[0]}-${value[1]}`);
  }

  const selectedColors = searchParams.getAll('color');
  const [minPrice, maxPrice] = searchParams.get('price')?.split('-').map(Number) || [0, 10000];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={['category', 'size', 'color', 'price']}>
          <AccordionItem value="category">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent>
              <RadioGroup onValueChange={(v) => handleFilterChange('category', v)} value={searchParams.get('category') || ''}>
                {['Western', 'Ethnic Wear', 'T-Shirts', 'Accessories'].map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <RadioGroupItem value={category.toLowerCase().replace(' ', '-')} id={`cat-${category}`} />
                    <Label htmlFor={`cat-${category}`}>{category}</Label>
                  </div>
                ))}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="size">
            <AccordionTrigger>Size</AccordionTrigger>
            <AccordionContent>
              <RadioGroup onValueChange={(v) => handleFilterChange('size', v)} value={searchParams.get('size') || ''}>
                {allSizes.map(size => (
                  <div key={size} className="flex items-center space-x-2">
                    <RadioGroupItem value={size} id={`size-${size}`} />
                    <Label htmlFor={`size-${size}`}>{size}</Label>
                  </div>
                ))}
              </RadioGroup>
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
                    <Label htmlFor={`color-${color}`}>{color}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="price">
            <AccordionTrigger>Price</AccordionTrigger>
            <AccordionContent className="px-1">
                <Slider
                    defaultValue={[minPrice, maxPrice]}
                    max={10000}
                    step={100}
                    onValueCommit={handlePriceChange}
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

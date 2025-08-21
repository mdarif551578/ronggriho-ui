
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useMemo } from 'react';
import type { Product } from '@/lib/types';

interface ActiveFiltersProps {
    allProducts: Product[];
}

export default function ActiveFilters({ allProducts }: ActiveFiltersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeFilters = useMemo(() => {
        const filters: { type: string, value: string, display: string }[] = [];
        const params = new URLSearchParams(searchParams.toString());

        params.forEach((value, key) => {
            if (key === 'category' || key === 'size' || key === 'color') {
                filters.push({
                    type: key,
                    value: value,
                    display: `${key}: ${key === 'color' ? value.split(':')[0] : value}`
                });
            } else if (key === 'price') {
                filters.push({ type: 'price', value, display: `Price: ৳${value.replace('-', ' - ৳')}` });
            }
        });

        return filters;
    }, [searchParams]);

    const handleRemoveFilter = (type: string, value: string) => {
        const current = new URLSearchParams(searchParams.toString());
        const newParams = new URLSearchParams();

        // Re-add all params except the one to be removed
        current.forEach((val, key) => {
            if (!(key === type && val === value)) {
                 newParams.append(key, val);
            }
        });
       
        const search = newParams.toString();
        const query = search ? `?${search}` : '';
        router.push(`${pathname}${query}`, { scroll: false });
    };

    const clearAllFilters = () => {
        const current = new URLSearchParams(searchParams.toString());
        current.delete('category');
        current.delete('size');
        current.delete('color');
        current.delete('price');
        const search = current.toString();
        const query = search ? `?${search}` : '';
        router.push(`${pathname}${query}`, { scroll: false });
    };

    if (activeFilters.length === 0) return null;

    return (
        <div className="flex items-center flex-wrap gap-2 mb-4 border-t pt-4">
            <span className="text-sm font-semibold">Active Filters:</span>
            {activeFilters.map(filter => (
                <Badge key={`${filter.type}-${filter.value}`} variant="secondary" className="capitalize text-sm py-1 pl-3 pr-2">
                    {filter.display}
                    <button onClick={() => handleRemoveFilter(filter.type, filter.value)} className="ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5">
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-primary hover:bg-primary/10">
                Clear All
            </Button>
        </div>
    );
}

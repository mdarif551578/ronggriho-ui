
'use client';

import FilterSidebar from './filter-sidebar';
import { Button } from './ui/button';
import { Filter } from 'lucide-react';
import type { Product } from '@/lib/types';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ProductFiltersProps {
    allProducts: Product[];
}

export default function ProductFilters({ allProducts }: ProductFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Filter Collapsible */}
            <div className="lg:hidden">
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <CollapsibleTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <Filter className="mr-2 h-4 w-4" />
                            Filters
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="py-4">
                        <FilterSidebar allProducts={allProducts} onFilterChange={() => setIsOpen(false)} />
                    </CollapsibleContent>
                </Collapsible>
            </div>

            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block">
                <FilterSidebar allProducts={allProducts} />
            </div>
        </>
    );
}

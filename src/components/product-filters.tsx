
'use client';

import FilterSidebar from './filter-sidebar';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from './ui/sheet';
import { Filter } from 'lucide-react';
import type { Product } from '@/lib/types';
import { useState } from 'react';

interface ProductFiltersProps {
    allProducts: Product[];
}

export default function ProductFilters({ allProducts }: ProductFiltersProps) {
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    return (
        <>
            {/* Mobile Filter Sheet */}
            <div className="lg:hidden mb-4">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <Filter className="mr-2 h-4 w-4" />
                            Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-3/4">
                         <SheetHeader className="mb-4">
                            <SheetTitle>Filters</SheetTitle>
                        </SheetHeader>
                        <FilterSidebar allProducts={allProducts} onFilterChange={() => setIsSheetOpen(false)} />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
                <FilterSidebar allProducts={allProducts} />
            </div>
        </>
    );
}

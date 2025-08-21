
'use client';

import FilterSidebar from './filter-sidebar';
import { Button } from './ui/button';
import { Filter } from 'lucide-react';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"


export default function ProductFilters() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Filter Sheet */}
             <div className="lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                         <Button variant="outline" className="w-full">
                            <Filter className="mr-2 h-4 w-4" />
                            Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-3/4 p-0">
                         <FilterSidebar onFilterChange={() => setIsOpen(false)} />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block">
                <FilterSidebar />
            </div>
        </>
    );
}


'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { FormEvent, useState, useEffect } from 'react';

export default function ProductSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    if (query) {
      current.set('q', query);
    } else {
      current.delete('q');
    }

    const search = current.toString();
    const newPath = search ? `${pathname}?${search}` : pathname;
    router.push(newPath, { scroll: false });
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <Input
        type="search"
        placeholder="Search for products..."
        className="pr-12"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full w-10 text-muted-foreground"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}

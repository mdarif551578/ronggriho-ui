
'use client';

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Github, Twitter, Instagram, Shirt } from 'lucide-react';
import Logo from '../logo';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { clientFirestore } from '@/lib/firebase';
import { Product } from '@/lib/types';

export default function Footer() {
  const [categories, setCategories] = useState<{name: string, href: string}[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
        try {
            const productsRef = collection(clientFirestore, 'products');
            const allProductsSnapshot = await getDocs(productsRef);
            const allProducts = allProductsSnapshot.docs.map(doc => doc.data() as Product);
            const uniqueCategories = [...new Set(allProducts.map(p => p.category))];
            
            const categoryLinks = uniqueCategories.map(cat => ({
                name: cat,
                href: `/products?category=${cat.toLowerCase().replace(/\s+/g, '-')}`
            }));
            setCategories(categoryLinks);
        } catch (error) {
            console.error("Failed to fetch categories for footer", error);
        }
    }
    fetchCategories();
  }, []);

  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="md:col-span-2 lg:col-span-1">
             <Link href="/" className="flex items-center gap-2 text-xl font-bold font-headline text-primary mb-4">
                <Logo />
              </Link>
            <p className="text-muted-foreground text-sm">
              Your one-stop shop for modern and traditional Bangladeshi fashion.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
              <Link href="#" aria-label="GitHub"><Github className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              {categories.map(cat => (
                 <li key={cat.name}><Link href={cat.href} className="text-muted-foreground hover:text-primary">{cat.name}</Link></li>
              ))}
              <li><Link href="/products?sort=newest" className="text-muted-foreground hover:text-primary">New Arrivals</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link href="/returns" className="text-muted-foreground hover:text-primary">Return Policy</Link></li>
              <li><Link href="/tracking" className="text-muted-foreground hover:text-primary">Track Order</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
             <ul className="space-y-2 text-sm">
                <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Rong Griho. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

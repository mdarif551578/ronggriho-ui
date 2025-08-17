import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold font-headline text-primary mb-4">Dhakai Threads</h3>
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
              <li><Link href="/products?category=men" className="text-muted-foreground hover:text-primary">Men</Link></li>
              <li><Link href="/products?category=women" className="text-muted-foreground hover:text-primary">Women</Link></li>
              <li><Link href="/products?category=accessories" className="text-muted-foreground hover:text-primary">Accessories</Link></li>
              <li><Link href="/products?sort=newest" className="text-muted-foreground hover:text-primary">New Arrivals</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link href="/returns" className="text-muted-foreground hover:text-primary">Return Policy</Link></li>
              <li><Link href="/tracking" className="text-muted-foreground hover:text-primary">Track Order</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-muted-foreground text-sm mb-2">Subscribe to our newsletter for the latest deals.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Your email" className="flex-grow"/>
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Dhakai Threads. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

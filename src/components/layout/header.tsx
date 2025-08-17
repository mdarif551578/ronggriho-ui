
'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { ShoppingBag, Heart, User, Search, Menu, X, Home, Shirt, ShoppingCart as ShoppingCartIcon, Info, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import ClientOnly from '../client-only';
import { useAuth } from '@/hooks/use-auth';


const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'All Products', href: '/products' },
  { name: 'Style Quiz', href: '/style-quiz' },
  { name: 'Ethnic Wear', href: '/products?category=ethnic-wear' },
  { name: 'T-Shirts', href: '/products?category=t-shirts' },
  { name: 'Accessories', href: '/products?category=accessories' },
];

const mobileNavLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Shop', href: '/products', icon: Shirt },
    { name: 'Cart', href: '/cart', icon: ShoppingCartIcon },
    { name: 'Account', href: '/account', icon: User },
]

export default function Header() {
  const { cart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleMobileSearch = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get('q') as string;
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };


  return (
    <>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
              <Link href="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold font-headline text-primary">
                <Shirt className="h-6 w-6" />
                <span>Rong Griho</span>
              </Link>
            </div>

            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1 md:gap-2">
              {pathname !== '/products' && (
                <Button variant="ghost" size="icon" asChild aria-label="Search">
                  <Link href="/products">
                    <Search className="h-5 w-5" />
                  </Link>
                </Button>
              )}
              <ClientOnly>
                <Button variant="ghost" size="icon" asChild aria-label="Wishlist">
                    <Link href="/wishlist">
                    <Heart className="h-5 w-5" />
                    </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="relative" aria-label="Shopping Cart">
                    <Link href="/cart">
                    <ShoppingBag className="h-5 w-5" />
                    {cartItemCount > 0 && (
                        <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                        >
                        {cartItemCount}
                        </Badge>
                    )}
                    </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild aria-label={user ? "Account" : "Login"}>
                    <Link href={user ? "/account" : "/auth/login"}>
                    <User className="h-5 w-5" />
                    </Link>
                </Button>
              </ClientOnly>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-0 left-0 w-full bg-background shadow-lg z-50"
            >
              <div className="container mx-auto px-4 pt-4 pb-6">
                <div className="flex justify-between items-center mb-6">
                   <Link href="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold font-headline text-primary" onClick={toggleMenu}>
                    <Shirt className="h-6 w-6" />
                    <span>Rong Griho</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Close menu">
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <div className="mb-6 border-b pb-6">
                  <form onSubmit={handleMobileSearch} className="relative w-full">
                      <Input name="q" type="search" placeholder="Search products..." className="pr-10" />
                      <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full w-10 text-muted-foreground">
                        <Search className="h-4 w-4" />
                      </Button>
                  </form>
                </div>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                      onClick={toggleMenu}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50">
        <div className="container mx-auto px-4">
            <div className="flex justify-around h-16">
                 {mobileNavLinks.map(link => (
                    <Link key={link.name} href={link.href} className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors w-1/5 text-center">
                        <link.icon className="h-6 w-6 mb-1" />
                        <span className="text-xs font-medium">{link.name}</span>
                    </Link>
                ))}
                 <Link href="/style-quiz" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors w-1/5 text-center">
                    <Wand2 className="h-6 w-6 mb-1" />
                    <span className="text-xs font-medium">Style Quiz</span>
                </Link>
            </div>
        </div>
      </nav>
    </>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag, Heart, User, Search, Menu, X, Home, Shirt, ShoppingCart, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'All Products', href: '/products' },
  { name: 'Ethnic Wear', href: '/products?category=ethnic-wear' },
  { name: 'T-Shirts', href: '/products?category=t-shirts' },
  { name: 'Accessories', href: '/products?category=accessories' },
];

const mobileNavLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Shop', href: '/products', icon: Shirt },
    { name: 'Cart', href: '/cart', icon: ShoppingCart },
    { name: 'Account', href: '/account', icon: User },
]

export default function Header() {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b">
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
              <Link href="/" className="text-2xl font-bold font-headline text-primary">
                Dhakai Threads
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

            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden md:block relative w-48">
                <Input type="search" placeholder="Search..." className="pr-10" />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <Button variant="ghost" size="icon" asChild aria-label="Wishlist">
                <Link href="/wishlist">
                  <Heart className="h-6 w-6" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="relative" aria-label="Shopping Cart">
                <Link href="/cart">
                  <ShoppingBag className="h-6 w-6" />
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
              <Button variant="ghost" size="icon" asChild aria-label="User Account">
                <Link href="/auth/login">
                  <User className="h-6 w-6" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-0 left-0 w-full bg-card shadow-lg z-50"
            >
              <div className="container mx-auto px-4 pt-4 pb-6">
                <div className="flex justify-between items-center mb-6">
                  <Link href="/" className="text-2xl font-bold font-headline text-primary" onClick={toggleMenu}>
                    Dhakai Threads
                  </Link>
                  <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Close menu">
                    <X className="h-6 w-6" />
                  </Button>
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
                <div className="mt-6 border-t pt-6">
                  <div className="relative w-full">
                      <Input type="search" placeholder="Search..." className="pr-10" />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t z-50">
        <div className="container mx-auto px-4">
            <div className="flex justify-around h-16">
                {mobileNavLinks.map(link => (
                    <Link key={link.name} href={link.href} className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                        <link.icon className="h-6 w-6 mb-1" />
                        <span className="text-xs font-medium">{link.name}</span>
                    </Link>
                ))}
            </div>
        </div>
      </nav>
    </>
  );
}

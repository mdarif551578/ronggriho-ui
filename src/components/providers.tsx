
'use client';

import { AuthProvider } from '@/hooks/use-auth';
import { CartProvider } from '@/context/cart-context';
import { WishlistProvider } from '@/context/wishlist-context';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export function Providers({ children }: { children: React.ReactNode }) {

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

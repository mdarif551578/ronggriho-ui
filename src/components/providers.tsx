
'use client';

import { AuthProvider } from '@/hooks/use-auth';
import { CartProvider } from '@/context/cart-context';
import { WishlistProvider } from '@/context/wishlist-context';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { usePathname } from 'next/navigation';

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="flex min-h-screen flex-col">
            {!isAdminRoute && <Header />}
            <main className="flex-grow">{children}</main>
            {!isAdminRoute && <Footer />}
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

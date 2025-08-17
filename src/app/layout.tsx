
'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { CartProvider } from '@/context/cart-context';
import { WishlistProvider } from '@/context/wishlist-context';
import { AuthProvider } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Dhakai Threads - Modern Bangladeshi Fashion</title>
        <meta name="description" content="Discover contemporary and traditional Bangladeshi fashion at Dhakai Threads. Shop for unique, high-quality apparel and accessories." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="flex min-h-screen flex-col">
                {!isAdminRoute && <Header />}
                <main className="flex-grow">{children}</main>
                {!isAdminRoute && <Footer />}
              </div>
              <Toaster />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

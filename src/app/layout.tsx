
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/components/providers';
import type { Metadata } from 'next';

const siteConfig = {
  name: "Rong Griho",
  url: "https://rong-griho.vercel.app", // Replace with your actual domain
  ogImage: "https://rong-griho.vercel.app/og-image.png", // Replace with your actual OG image URL
  description: "Discover contemporary and traditional Bangladeshi fashion at Rong Griho. Shop for unique, high-quality apparel and accessories.",
  title: "Rong Griho - Modern Bangladeshi Fashion",
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@ronggriho", // Replace with your Twitter handle
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
       "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteConfig.url}/products?q={search_term_string}`,
        "query-input": "required name=search_term_string"
    }
    };


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

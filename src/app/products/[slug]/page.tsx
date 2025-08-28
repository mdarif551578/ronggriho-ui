
import ProductDetailsClient from './product-details-client';
import fs from 'fs/promises';
import path from 'path';
import type { Product } from '@/lib/types';


// This function runs only at build time on the server.
export async function generateStaticParams() {
  try {
    // Get the path to the cached products JSON file
    const filePath = path.join(process.cwd(), '.products.json');
    // Read the file content
    const fileContent = await fs.readFile(filePath, 'utf-8');
    // Parse the JSON data
    const products: Product[] = JSON.parse(fileContent);

    if (!products || products.length === 0) {
      console.warn("No products found in .products.json, static pages for products will not be generated.");
      return [];
    }

    // Map the products to the format required by generateStaticParams
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    // If the file doesn't exist or there's an error parsing it, log a warning.
    // This prevents the build from crashing if the pre-build script hasn't run.
    console.warn(`Could not generate static params for products: ${(error as Error).message}`);
    // Return an empty array to avoid build failure.
    return [];
  }
}

// This is the server component wrapper for the product details page.
// It receives the slug from the dynamic route parameters.
export default function ProductDetailsPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // It renders the client component, passing the slug as a prop.
  // The client component will handle the actual data fetching and rendering.
  return <ProductDetailsClient slug={slug} />;
}

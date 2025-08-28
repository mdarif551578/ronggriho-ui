import ProductDetailsClient from './product-details-client';

// This function is required for static export of dynamic routes.
// We return an empty array because we want all product fetching and rendering
// to happen on the client side at runtime. This satisfies the build requirement
// without pre-rendering any pages at build time.
export async function generateStaticParams() {
  return [];
}

export default function ProductDetailsPage({ params }: { params: { slug: string } }) {
  // The Server Component simply passes the slug to the Client Component.
  return <ProductDetailsClient slug={params.slug} />;
}

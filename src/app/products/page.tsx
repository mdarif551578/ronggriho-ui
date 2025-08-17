import ProductCard from '@/components/product-card';
import { getProducts } from '@/lib/mock-data';

export default function ProductsPage() {
  const products = getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-headline mb-8">All Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

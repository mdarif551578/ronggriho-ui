import ProductCard from '@/components/product-card';
import { getProducts } from '@/lib/mock-data';
import { Product } from '@/lib/mock-data';
import FilterSidebar from '@/components/filter-sidebar';

export default function ProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const allProducts = getProducts();

  const filterProducts = (products: Product[]): Product[] => {
    if (!searchParams) return products;

    return products.filter(product => {
      if (searchParams.category && product.category.toLowerCase() !== searchParams.category) {
        return false;
      }
      if (searchParams.size && !product.sizes.includes(searchParams.size as string)) {
        return false;
      }
      if (searchParams.color) {
        const colors = Array.isArray(searchParams.color) ? searchParams.color : [searchParams.color];
        if (!product.colors.some(c => colors.includes(c.name.toLowerCase()))) {
            return false;
        }
      }
      if (searchParams.price) {
        const [min, max] = (searchParams.price as string).split('-').map(Number);
        const price = product.discountPrice || product.price;
        if (price < min || price > max) {
            return false;
        }
      }
      if (searchParams.q && !product.name.toLowerCase().includes((searchParams.q as string).toLowerCase())) {
          return false;
      }
      return true;
    });
  };

  const filteredProducts = filterProducts(allProducts);

  const getTitle = () => {
    if (searchParams?.q) {
      return `Search results for "${searchParams.q}"`;
    }
    if (searchParams?.category) {
        const categoryName = (searchParams.category as string).replace('-', ' ');
        return categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    }
    return 'All Products';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterSidebar />
        </div>
        <div className="lg:col-span-3">
          <h1 className="text-4xl font-bold font-headline mb-8">{getTitle()}</h1>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
           ) : (
            <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
            </div>
           )}
        </div>
      </div>
    </div>
  );
}

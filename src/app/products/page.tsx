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

    let filtered = products;
    
    const categories = searchParams.category ? (Array.isArray(searchParams.category) ? searchParams.category : [searchParams.category]) : [];
    if (categories.length > 0) {
      filtered = filtered.filter(product => categories.includes(product.category.toLowerCase()));
    }

    const sizes = searchParams.size ? (Array.isArray(searchParams.size) ? searchParams.size : [searchParams.size]) : [];
    if (sizes.length > 0) {
      filtered = filtered.filter(product => product.sizes.some(s => sizes.includes(s)));
    }
    
    const colors = searchParams.color ? (Array.isArray(searchParams.color) ? searchParams.color : [searchParams.color]) : [];
    if (colors.length > 0) {
      filtered = filtered.filter(product => product.colors.some(c => colors.includes(c.name.toLowerCase())));
    }

    if (searchParams.price && typeof searchParams.price === 'string') {
        const [min, max] = searchParams.price.split('-').map(Number);
        if (!isNaN(min) && !isNaN(max)) {
            filtered = filtered.filter(product => {
                const price = product.discountPrice || product.price;
                return price >= min && price <= max;
            });
        }
    }

    if (searchParams.q && typeof searchParams.q === 'string') {
        filtered = filtered.filter(product => product.name.toLowerCase().includes(searchParams.q!.toLowerCase()));
    }

    return filtered;
  };

  const filteredProducts = filterProducts(allProducts);

  const getTitle = () => {
    if (searchParams?.q) {
      return `Search results for "${searchParams.q}"`;
    }
    if (searchParams?.category) {
        const categoryParam = searchParams.category;
        const categories = Array.isArray(categoryParam) ? categoryParam : [categoryParam];
        if (categories.length === 1) {
            const categoryName = categories[0].replace('-', ' ');
            return categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        }
        return 'Filtered Products';
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

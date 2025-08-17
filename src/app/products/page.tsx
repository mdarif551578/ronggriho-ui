import ProductCard from '@/components/product-card';
import { getProducts } from '@/lib/data';
import { Product } from '@/lib/types';
import ProductFilters from '@/components/product-filters';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const allProducts = await getProducts();

  const sortProducts = (products: Product[]): Product[] => {
    const sort = searchParams?.sort;
    if (sort === 'newest') {
      // Assuming higher ID means newer product.
      return [...products].sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }
     if (sort === 'price-asc') {
      return [...products].sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    }
    if (sort === 'price-desc') {
      return [...products].sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    }
    if (sort === 'discount') {
      return [...products].sort((a, b) => (b.discountPrice ? 1 : -1) - (a.discountPrice ? 1 : -1) || (b.discountPrice || 0) - (a.discountPrice || 0));
    }
    return products;
  };

  const filterProducts = (products: Product[]): Product[] => {
    if (!searchParams) return products;

    let filtered = products;
    
    const categories = searchParams.category ? (Array.isArray(searchParams.category) ? searchParams.category : [searchParams.category]) : [];
    if (categories.length > 0) {
      filtered = filtered.filter(product => categories.map(c => c.toLowerCase()).includes(product.category.toLowerCase().replace(' ', '-')));
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
  
  const filtered = filterProducts(allProducts);
  const sortedAndFilteredProducts = sortProducts(filtered);


  const getTitle = () => {
    if (searchParams?.q) {
      return `Search results for "${searchParams.q}"`;
    }
    if (searchParams?.category) {
        const categoryParam = searchParams.category;
        const categories = Array.isArray(categoryParam) ? categoryParam : [categoryParam];
        if (categories.length === 1) {
            const categoryName = categories[0].replace(/-/g, ' ');
            return categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        }
        return 'Filtered Products';
    }
    return 'All Products';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        
        <ProductFilters allProducts={allProducts} />
        
        <div className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row justify-between items-baseline mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-headline">{getTitle()}</h1>
            <p className="text-sm text-muted-foreground mt-2 sm:mt-0">{sortedAndFilteredProducts.length} products found</p>
          </div>
          {sortedAndFilteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {sortedAndFilteredProducts.map(product => (
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

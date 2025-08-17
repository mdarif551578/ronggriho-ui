import { getProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import AdminProductsClientPage from './products-client-page';

export default async function AdminProductsPage() {
    const products = await getProducts();
    return <AdminProductsClientPage products={products} />;
}

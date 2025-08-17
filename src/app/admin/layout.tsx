
import AdminSidebar from '@/components/admin/admin-sidebar';
import AdminAuthProvider from '@/context/admin-auth-context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import { Home, Menu, Package, ShoppingBag, Shirt, Users } from 'lucide-react';

function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                    <Link
                        href="/admin"
                        className="flex items-center gap-2 text-lg font-semibold mb-4"
                    >
                        <Shirt className="h-6 w-6" />
                        <span>Dhakai Threads</span>
                    </Link>
                    <Link href="/admin" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                        <Home className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link href="/admin/products" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                        <Package className="h-5 w-5" />
                        Products
                    </Link>
                     <Link href="/admin/orders" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                        <ShoppingBag className="h-5 w-5" />
                        Orders
                    </Link>
                    <Link href="/admin/users" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                        <Users className="h-5 w-5" />
                        Users
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthProvider>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <AdminSidebar />
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <MobileNav />
                    <div className="w-full flex-1">
                        {/* Can add a search bar here in the future */}
                    </div>
                </header>
                <main className="flex-1 p-4 sm:px-6 sm:py-0 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    </AdminAuthProvider>
  )
}

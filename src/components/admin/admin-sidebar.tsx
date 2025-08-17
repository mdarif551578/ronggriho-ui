
'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, ShoppingBag, Package, Users, LogOut, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/use-admin-auth";

const navLinks = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { href: "/admin/users", label: "Users", icon: Users },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { logout } = useAdminAuth();

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/admin" className="flex items-center gap-2 font-semibold">
                    <Shirt className="h-6 w-6" />
                    <span>Dhakai Threads Admin</span>
                </Link>
            </div>
            <nav className="flex-1 overflow-auto py-4">
                <div className="grid items-start px-4 text-sm font-medium">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                pathname === link.href && "bg-muted text-primary"
                            )}
                        >
                            <link.icon className="h-4 w-4" />
                            {link.label}
                        </Link>
                    ))}
                </div>
            </nav>
             <div className="mt-auto p-4">
                <Button variant="ghost" className="w-full justify-start gap-3" onClick={logout}>
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
        </aside>
    );
}

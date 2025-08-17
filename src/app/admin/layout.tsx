
import AdminSidebar from '@/components/admin/admin-sidebar';
import AdminAuthProvider from '@/context/admin-auth-context';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthProvider>
        <div className="min-h-screen bg-muted/40">
            <AdminSidebar />
            <div className="md:pl-64">
                <main className="p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    </AdminAuthProvider>
  )
}

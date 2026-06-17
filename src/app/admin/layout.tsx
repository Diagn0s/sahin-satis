import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PlusCircle, LayoutDashboard, Package, ShoppingCart, Settings, LineChart } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Middleware also protects this, but just in case:
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row w-full bg-muted/20">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex flex-col bg-card border-r border-border p-6 min-h-screen shrink-0">
        <div className="mb-8">
          <h2 className="font-heading font-extrabold text-2xl text-foreground">Admin Paneli</h2>
          <p className="text-sm text-muted-foreground mt-1">Şahin Satış Yönetim</p>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-sm font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5 text-muted-foreground" />
            Özet & Siparişler
          </Link>
          <Link href="/admin/ilanlar" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-sm font-medium transition-colors">
            <Package className="w-5 h-5 text-muted-foreground" />
            İlanlar
          </Link>
          <Link href="/admin/kategoriler" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-sm font-medium transition-colors">
            <PlusCircle className="w-5 h-5 text-muted-foreground" />
            Kategoriler
          </Link>
          <Link href="/admin/raporlar" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-sm font-medium transition-colors">
            <LineChart className="w-5 h-5 text-muted-foreground" />
            Raporlar
          </Link>
          <Link href="/admin/ayarlar" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-sm font-medium transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
            Ayarlar
          </Link>
          
          <div className="mt-auto pt-4">
            <Link href="/admin/ilanlar/yeni" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sahred text-white text-sm font-medium hover:bg-sahred-hover transition-colors shadow-md justify-center w-full">
              <PlusCircle className="w-5 h-5" />
              Yeni İlan Ekle
            </Link>
            <Link href="/" className="flex items-center gap-3 px-4 py-3 mt-2 rounded-xl text-muted-foreground hover:bg-muted text-sm font-medium transition-colors justify-center w-full">
              Siteye Dön
            </Link>
          </div>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

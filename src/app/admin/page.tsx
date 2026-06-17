import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const [orders, listingsCount, usersCount] = await Promise.all([
    prisma.order.findMany({
      include: {
        listing: true,
        user: true,
      },
      orderBy: { createdAt: "desc" },
      take: 20, // Son 20 sipariş
    }),
    prisma.listing.count(),
    prisma.user.count(),
  ]);

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl mb-6">Özet</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground mb-1">Toplam İlan</p>
          <h3 className="font-heading font-extrabold text-3xl">{listingsCount}</h3>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground mb-1">Toplam Sipariş</p>
          <h3 className="font-heading font-extrabold text-3xl">{orders.length}</h3>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground mb-1">Toplam Kullanıcı</p>
          <h3 className="font-heading font-extrabold text-3xl">{usersCount}</h3>
        </div>
      </div>

      <h2 className="font-heading font-bold text-xl mb-4">Son Siparişler</h2>
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">Tarih</th>
                <th className="px-6 py-4 font-semibold">Müşteri</th>
                <th className="px-6 py-4 font-semibold">İlan</th>
                <th className="px-6 py-4 font-semibold">Tutar</th>
                <th className="px-6 py-4 font-semibold">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    Henüz sipariş yok.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">{order.user.name}</div>
                      <div className="text-xs text-muted-foreground">{order.user.email}</div>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {order.listing.title}
                    </td>
                    <td className="px-6 py-4 font-semibold text-sahred">
                      {order.listing.price} ₺
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

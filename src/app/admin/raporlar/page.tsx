import { prisma } from "@/lib/prisma";
import { ReportsChart } from "./ReportsChart";

export const metadata = {
  title: "Raporlar | Admin",
};

export default async function ReportsPage() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Fetch orders from last 30 days
  const orders = await prisma.order.findMany({
    where: {
      createdAt: { gte: thirtyDaysAgo },
      status: "APPROVED"
    },
    include: {
      listing: true
    },
    orderBy: { createdAt: "asc" }
  });

  // Aggregate by date
  const dailyData: Record<string, { date: string; sales: number; orders: number }> = {};
  
  // Initialize last 30 days with 0
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString("tr-TR", { day: '2-digit', month: 'short' });
    dailyData[dateStr] = { date: dateStr, sales: 0, orders: 0 };
  }

  let totalSales = 0;
  let totalOrders = orders.length;

  orders.forEach(order => {
    const dateStr = new Date(order.createdAt).toLocaleDateString("tr-TR", { day: '2-digit', month: 'short' });
    if (dailyData[dateStr]) {
      dailyData[dateStr].sales += order.listing.price;
      dailyData[dateStr].orders += 1;
    }
    totalSales += order.listing.price;
  });

  const chartData = Object.values(dailyData);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading font-extrabold text-3xl text-foreground">Satış Raporları</h1>
        <p className="text-muted-foreground mt-2">Son 30 günün finansal ve sipariş analizleri</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-gradient-to-br from-sahred to-sahred-hover text-white rounded-xl p-6 shadow-md">
          <p className="text-sm font-medium text-white/80 mb-1">Aylık Ciro</p>
          <h3 className="font-heading font-extrabold text-3xl">{totalSales.toLocaleString('tr-TR')} ₺</h3>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl p-6 shadow-md">
          <p className="text-sm font-medium text-white/80 mb-1">Onaylanan Sipariş</p>
          <h3 className="font-heading font-extrabold text-3xl">{totalOrders}</h3>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-md">
          <p className="text-sm font-medium text-white/80 mb-1">Ort. Sepet Tutarı</p>
          <h3 className="font-heading font-extrabold text-3xl">
            {totalOrders > 0 ? Math.round(totalSales / totalOrders).toLocaleString('tr-TR') : 0} ₺
          </h3>
        </div>
      </div>

      <ReportsChart data={chartData} />
    </div>
  );
}

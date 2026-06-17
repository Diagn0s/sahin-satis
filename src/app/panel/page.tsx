import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { ReviewButton } from "./ReviewButton";

export const metadata = {
  title: "Siparişlerim",
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "PENDING":
      return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 gap-1"><Clock className="w-3 h-3" /> Bekliyor</Badge>;
    case "APPROVED":
      return <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 gap-1"><CheckCircle className="w-3 h-3" /> Onaylandı</Badge>;
    case "CANCELLED":
      return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 gap-1"><XCircle className="w-3 h-3" /> İptal Edildi</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default async function PanelPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/giris");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      listing: {
        include: {
          category: true
        }
      },
      review: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="max-w-[1200px] mx-auto py-12 px-4 md:px-8 min-h-[60vh]">
      <div className="mb-8">
        <h1 className="font-heading font-extrabold text-3xl text-foreground">Siparişlerim</h1>
        <p className="text-muted-foreground mt-2">Satın almak istediğiniz ilanların durumu</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <div className="text-4xl mb-4">🛒</div>
          <h3 className="font-heading font-bold text-lg mb-2">Henüz Siparişiniz Yok</h3>
          <p className="text-muted-foreground text-sm mb-6">Satın almak istediğiniz ilanlar burada listelenir.</p>
          <Link href="/ilanlar">
            <Button className="bg-sahred hover:bg-sahred-hover text-white">
              İlanlara Göz At
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-card rounded-xl border border-border p-5 flex flex-col md:flex-row gap-5 md:items-center">
              <div className={`w-full md:w-[120px] h-[100px] rounded-lg overflow-hidden flex items-center justify-center text-4xl relative ${order.listing.bgColor}`}>
                {order.listing.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">{order.listing.category.name}</span>
                  {getStatusBadge(order.status)}
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                  <Link href={`/ilanlar/${order.listing.slug}`} className="hover:underline">
                    {order.listing.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">Sipariş Tarihi: {new Date(order.createdAt).toLocaleDateString("tr-TR")}</p>
              </div>
              <div className="text-left md:text-right">
                <div className="font-heading font-extrabold text-2xl text-sahred mb-2">{order.listing.price} ₺</div>
                <a
                  href={`https://wa.me/905331685213?text=Merhaba!%20Siparişim%20hakkında%20bilgi%20almak%20istiyorum.%20Sipariş%20Numaram:%20${order.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-sm text-wa hover:underline font-semibold w-full sm:w-auto"
                >
                  WhatsApp'tan Sor
                </a>
                {order.status === "APPROVED" && !order.review && (
                  <ReviewButton orderId={order.id} />
                )}
                {order.review && (
                  <div className="mt-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded inline-flex items-center gap-1 border border-emerald-200">
                    <CheckCircle className="w-3 h-3" /> Değerlendirildi
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

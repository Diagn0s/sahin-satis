import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ListingActions } from "./ListingActions";

export const metadata = {
  title: "İlan Yönetimi",
};

export default async function AdminListingsPage() {
  const listings = await prisma.listing.findMany({
    include: {
      category: true,
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-heading font-extrabold text-2xl">İlanlar</h1>
        <Link href="/admin/ilanlar/yeni">
          <Button className="bg-sahred hover:bg-sahred-hover text-white gap-2">
            <PlusCircle className="w-4 h-4" /> Yeni İlan
          </Button>
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">İlan Adı</th>
                <th className="px-6 py-4 font-semibold">Kategori</th>
                <th className="px-6 py-4 font-semibold">Fiyat</th>
                <th className="px-6 py-4 font-semibold">Görüntülenme</th>
                <th className="px-6 py-4 font-semibold text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {listings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    Henüz ilan yok.
                  </td>
                </tr>
              ) : (
                listings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${listing.bgColor}`}>
                          {listing.icon}
                        </div>
                        <div className="font-medium text-foreground">
                          {listing.title}
                          <div className="text-xs text-muted-foreground font-normal">/{listing.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                        {listing.category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-sahred">
                      {listing.price} ₺
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {listing.views}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ListingActions id={listing.id} />
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

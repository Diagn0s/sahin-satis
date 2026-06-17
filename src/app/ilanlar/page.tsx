import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";
import { ListingCard } from "@/components/shared/ListingCard";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Tüm İlanlar",
  description: "Şahin Satış üzerindeki tüm ikinci el ilanları keşfedin.",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function IlanlarPage() {
  const listings = await prisma.listing.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="max-w-[1200px] mx-auto py-12 px-4 md:px-8 min-h-[60vh]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading font-extrabold text-3xl text-foreground">Tüm İlanlar</h1>
        <p className="text-muted-foreground mt-2">İhtiyacınız olan ürünleri hemen bulun ve WhatsApp üzerinden iletişime geçin.</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {listings.map((listing, index) => (
          <ListingCard key={listing.id} listing={listing as any} index={index} />
        ))}
      </div>
    </div>
  );
}

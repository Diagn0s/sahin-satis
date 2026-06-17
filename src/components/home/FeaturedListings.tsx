import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ListingCard } from "@/components/shared/ListingCard";
import { prisma } from "@/lib/prisma";

export async function FeaturedListings() {
  const listings = await prisma.listing.findMany({
    include: {
      category: true,
    },
    orderBy: { views: "desc" },
    take: 6,
  });

  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { listings: true }
      }
    },
    orderBy: { name: "asc" }
  });

  return (
    <section id="urunler" className="max-w-[1200px] mx-auto py-16 md:py-20 px-4 md:px-8">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground tracking-tight">
            Öne Çıkan İlanlar
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Satın almak için WhatsApp&apos;tan iletişime geçin
          </p>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex gap-2 flex-wrap mb-8">
        <Link
          href="/ilanlar"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap bg-sahred text-white border-sahred"
        >
          ✨ Tümü
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/kategori/${cat.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap bg-card text-foreground/70 border-border hover:bg-foreground hover:text-white hover:border-foreground"
          >
            {cat.icon} {cat.name}
            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-muted text-muted-foreground">
              {cat._count.listings}
            </span>
          </Link>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {listings.map((listing, i) => (
          <ListingCard key={listing.id} listing={listing as any} index={i} />
        ))}
      </div>
    </section>
  );
}

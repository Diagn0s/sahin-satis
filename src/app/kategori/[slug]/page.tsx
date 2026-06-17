import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { ListingCard } from "@/components/shared/ListingCard";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { title: "Kategori Bulunamadı" };
  return {
    title: `${category.name} İlanları`,
    description: `${category.name} kategorisindeki ikinci el ilanları inceleyin.`,
  };
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany();
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function KategoriPage({ params }: { params: Params }) {
  const { slug } = await params;
  
  const category = await prisma.category.findUnique({ where: { slug } });
  
  if (!category) {
    return (
      <div className="max-w-[1200px] mx-auto py-20 px-4 text-center">
        <h1 className="font-heading font-extrabold text-2xl mb-4">Kategori Bulunamadı</h1>
        <p className="text-muted-foreground mb-6">Aradığınız kategori mevcut değil.</p>
        <Link href="/ilanlar" className={buttonVariants()}>
          ← Tüm İlanlara Dön
        </Link>
      </div>
    );
  }

  const allCategories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
  
  const listings = await prisma.listing.findMany({
    where: { categoryId: category.id },
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-[1200px] mx-auto py-8 md:py-12 px-4 md:px-8">
      <div className="mb-8">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground tracking-tight flex items-center gap-2">
          {category.icon} {category.name} İlanları
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {listings.length} ilan bulundu
        </p>
      </div>

      {/* Category Chips */}
      <div className="flex gap-2 flex-wrap mb-8">
        <Link
          href="/ilanlar"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-[13px] font-semibold transition-all whitespace-nowrap bg-card text-foreground/70 border-border hover:bg-foreground hover:text-white hover:border-foreground"
        >
          Tümü
        </Link>
        {allCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/kategori/${cat.slug}`}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-[13px] font-semibold transition-all whitespace-nowrap ${
              cat.slug === slug
                ? "bg-sahred text-white border-sahred"
                : "bg-card text-foreground/70 border-border hover:bg-foreground hover:text-white hover:border-foreground"
            }`}
          >
            {cat.icon} {cat.name}
          </Link>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {listings.map((listing, index) => (
          <ListingCard key={listing.id} listing={listing as any} index={index} />
        ))}
      </div>

      {listings.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">Bu kategoride henüz ilan bulunmuyor.</p>
          <Link href="/ilanlar" className={cn(buttonVariants(), "mt-4")}>
            Tüm İlanları Göster
          </Link>
        </div>
      )}
    </div>
  );
}

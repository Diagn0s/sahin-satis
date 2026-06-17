import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Heart, Eye, Clock, ArrowLeft, Share2, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { createOrder } from "@/actions/order";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const listing = await prisma.listing.findUnique({ where: { slug } });
  if (!listing) return { title: "İlan Bulunamadı" };
  return {
    title: `${listing.title} - ${listing.price} ₺`,
    description: listing.description,
  };
}

export async function generateStaticParams() {
  const listings = await prisma.listing.findMany({ select: { slug: true } });
  return listings.map((l) => ({ slug: l.slug }));
}

export default async function ListingDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const listing = await prisma.listing.findUnique({
    where: { slug },
    include: { category: true }
  });

  if (!listing) {
    return (
      <div className="max-w-[1200px] mx-auto py-20 px-4 text-center">
        <h1 className="font-heading font-extrabold text-2xl mb-4">İlan Bulunamadı</h1>
        <p className="text-muted-foreground mb-6">Aradığınız ilan mevcut değil veya kaldırılmış olabilir.</p>
        <Link href="/ilanlar" className={buttonVariants()}>
          ← İlanlara Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto py-8 md:py-12 px-4 md:px-8">
      <Link href="/ilanlar" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> İlanlara Dön
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12">
        {/* Left - Image */}
        <div className={`${listing.bgColor} rounded-2xl aspect-[4/3] flex items-center justify-center text-[8rem] border border-border overflow-hidden relative`}>
          {listing.imageUrl ? (
            <img src={listing.imageUrl} alt={listing.title} className="object-cover w-full h-full" />
          ) : (
            listing.icon
          )}
        </div>

        {/* Right - Info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-xs font-semibold uppercase tracking-wider">
              {listing.category.name}
            </Badge>
            {listing.badge && listing.badgeLabel && (
              <Badge className={`text-[10px] font-bold ${listing.badge === "hot" ? "bg-sahred hover:bg-sahred text-white" : "bg-emerald-600 hover:bg-emerald-600 text-white"}`}>
                {listing.badgeLabel}
              </Badge>
            )}
          </div>

          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground leading-tight mb-2">
            {listing.title}
          </h1>

          <div className="text-xs text-amber-400 mb-3">
            {"★".repeat(listing.stars)}{"☆".repeat(5 - listing.stars)}
          </div>

          <div className="font-heading font-extrabold text-3xl md:text-4xl text-sahred mb-4">
            {listing.price} ₺
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {listing.description}
          </p>

          <div className="flex gap-3 text-xs text-muted-foreground mb-6">
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {listing.views} görüntülenme</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <form action={async () => {
              "use server";
              await createOrder(listing.id, listing.title);
            }}>
              <Button type="submit" size="lg" className="bg-wa hover:bg-wa-hover text-white w-full text-base shadow-[0_6px_20px_rgba(37,211,102,0.3)]">
                <MessageCircle className="w-4 h-4 mr-2" />
                Sipariş Ver (WhatsApp)
              </Button>
            </form>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <Heart className="w-4 h-4 mr-2" /> Favorilere Ekle
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" /> Paylaş
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

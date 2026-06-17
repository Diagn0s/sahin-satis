"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Listing {
  id: string;
  title: string;
  slug: string;
  category: string | any;
  categorySlug?: string;
  description: string;
  price: number | string;
  badge?: string | null;
  badgeLabel?: string | null;
  icon: string;
  bgColor: string;
  stars: number;
  views: number;
  age?: string;
  imageUrl?: string | null;
}

function StarRating({ stars }: { stars: number }) {
  return (
    <span className="text-xs text-amber-400">
      {"★".repeat(stars)}{"☆".repeat(5 - stars)}
    </span>
  );
}

export function ListingCard({ listing, index = 0 }: { listing: Listing; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={`/ilanlar/${listing.slug}`}
        className="group block bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(0,0,0,0.1)] hover:border-border/80"
      >
        {/* Image */}
        <div className={`h-[205px] overflow-hidden relative ${listing.bgColor} flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500`}>
          {listing.imageUrl ? (
            <img src={listing.imageUrl} alt={listing.title} className="object-cover w-full h-full" />
          ) : (
            listing.icon
          )}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            <Badge
              className={`text-[10px] font-bold tracking-wider ${
                listing.badge === "hot"
                  ? "bg-sahred hover:bg-sahred text-white"
                  : "bg-emerald-600 hover:bg-emerald-600 text-white"
              }`}
            >
              {listing.badgeLabel}
            </Badge>
          </div>
          <button
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-muted-foreground hover:text-sahred hover:scale-110 transition-all"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {/* Category & Badge */}
          <div className="flex justify-between items-start mb-2">
            <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              {(listing.category as any)?.name || "KATEGORİ"}
            </div>
          </div>
          <h3 className="font-heading font-bold text-[15px] text-foreground mb-1.5 leading-snug">
            {listing.title}
          </h3>
          <p className="text-[13px] text-muted-foreground font-light leading-relaxed mb-3">
            {listing.description}
          </p>
          <div className="flex gap-3 text-[11px] text-muted-foreground mb-4">
            <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {listing.views}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {listing.age}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>
              <StarRating stars={listing.stars} />
              <div className="font-heading font-extrabold text-xl text-sahred">
                {listing.price} ₺
              </div>
              <div className="text-[10px] text-muted-foreground">2. El Fiyat</div>
            </div>
            <form action={async (formData) => {
              // Client Component can call imported Server Action directly
              // We'll import createOrder at the top
              await import("@/actions/order").then((m) => m.createOrder(listing.id.toString(), listing.title));
            }}>
              <Button
                type="submit"
                size="sm"
                className="bg-wa hover:bg-wa-hover text-white text-xs px-3.5 shadow-[0_4px_12px_rgba(37,211,102,0.25)]"
                onClick={(e) => {
                  // Link component in parent would catch the click, so we stop propagation
                  e.stopPropagation();
                }}
              >
                💬 Satın Al
              </Button>
            </form>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

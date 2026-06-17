"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const quickCategories = [
  { label: "📱 Telefon", slug: "telefon-tablet" },
  { label: "💻 Bilgisayar", slug: "bilgisayar" },
  { label: "🏠 Mobilya", slug: "ev-mobilya" },
  { label: "🎮 Konsol", slug: "oyun-konsol" },
  { label: "📷 Kamera", slug: "fotograf" },
  { label: "🚗 Araç", slug: "arac-motor" },
];

export function Hero() {
  return (
    <section className="bg-navy py-20 md:py-28 px-4 md:px-8 relative overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute w-[580px] h-[580px] -top-[200px] -right-[120px] bg-sahred/7 rounded-full animate-hero-float" />
        <span className="absolute w-[380px] h-[380px] -bottom-[80px] -left-[80px] bg-gold/6 rounded-full animate-hero-float [animation-delay:4s]" />
        <span className="absolute w-[220px] h-[220px] top-[35%] left-[42%] bg-wa/4 rounded-full animate-hero-float [animation-delay:7s]" />
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center relative z-10">
        {/* Left - Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-white/6 border border-white/12 rounded-full px-4 py-1.5 text-xs text-white/65 font-medium mb-6 tracking-wide">
            🟢 Türkiye&apos;nin Güvenilir 2. El Platformu
          </div>

          <h1 className="font-heading font-extrabold text-4xl md:text-[3.5rem] text-white leading-[1.07] tracking-tight">
            Akıllıca Al,
            <br />
            Hızlıca <span className="text-sahred">Sat.</span>
          </h1>

          <p className="text-white/50 text-base mt-6 mb-10 leading-7 font-light max-w-[470px]">
            Binlerce ikinci el ürün, güvenilir satıcılar ve WhatsApp üzerinden
            anlık iletişim. Şahin Satış ile kazanmaya başla.
          </p>

          <div className="flex gap-3 flex-wrap">
            <Link 
              href="/ilanlar"
              className={cn(buttonVariants({ size: "lg" }), "bg-sahred hover:bg-sahred-hover text-white text-base px-7 shadow-[0_6px_20px_rgba(230,57,70,0.3)]")}
            >
              İlanları Keşfet <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/905331685213?text=Merhaba!%20Şahin%20Satış%27tan%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "bg-wa hover:bg-wa-hover text-white text-base px-7 shadow-[0_6px_20px_rgba(37,211,102,0.3)]")}
            >
              💬 WhatsApp
            </a>
            <Link 
              href="/auth/kayit"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "bg-white/8 text-white border-white/14 hover:bg-white/14 text-base px-7")}
            >
              İlan Ver
            </Link>
          </div>
        </motion.div>

        {/* Right - Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="bg-white/6 border border-white/10 rounded-2xl p-7 backdrop-blur-xl"
        >
          <h3 className="font-heading font-bold text-white text-lg mb-5">
            🔍 Ürün Ara
          </h3>

          <div className="relative mb-3">
            <Input
              type="text"
              placeholder="iPhone, laptop, koltuk..."
              className="w-full bg-white/8 border-white/15 text-white placeholder:text-white/30 pr-12 h-11 rounded-xl focus-visible:border-white/35 focus-visible:ring-0"
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 bg-sahred hover:bg-sahred-hover rounded-lg"
            >
              <Search className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {quickCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategori/${cat.slug}`}
                className="flex items-center gap-2 bg-white/6 border border-white/8 rounded-lg px-3 py-2 text-white/65 text-[13px] font-medium hover:bg-white/12 hover:text-white transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

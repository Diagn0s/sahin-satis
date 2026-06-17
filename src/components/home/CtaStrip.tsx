"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CtaStrip() {
  return (
    <section className="bg-sahred py-12 md:py-14 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute -top-[60px] -right-[60px] w-[280px] h-[280px] bg-white/7 rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10"
      >
        <div className="text-center md:text-left">
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-white tracking-tight">
            Ürününüzü Satmak İster misiniz?
          </h2>
          <p className="text-white/72 text-sm mt-1.5 font-light">
            Ücretsiz ilan verin, binlerce alıcıya ulaşın. Çok kolay!
          </p>
        </div>
        <div className="flex gap-3 flex-wrap justify-center">
          <a
            href="https://wa.me/905331685213?text=Merhaba!%20Ürün%20satmak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "bg-white text-sahred font-bold hover:bg-white/90 px-7 text-base")}
          >
            💬 WhatsApp&apos;tan Sat
          </a>
          <Link 
            href="/auth/kayit" 
            className={cn(buttonVariants({ size: "lg", variant: "outline" }), "bg-transparent text-white border-white/45 hover:bg-white/10 px-7 text-base")}
          >
            Ücretsiz Üye Ol →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

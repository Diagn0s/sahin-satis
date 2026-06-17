"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";

const navItems = [
  { label: "Ana Sayfa", href: "/" },
  { label: "İlanlar", href: "/ilanlar" },
  { label: "Nasıl Çalışır?", href: "/#nasil" },
  { label: "Yorumlar", href: "/#yorumlar" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white/93 backdrop-blur-xl border-b border-border px-4 md:px-8 h-[66px] flex items-center justify-between transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-black/5" : ""
      }`}
    >
      <Link href="/" className="flex items-center gap-2.5 font-heading font-extrabold text-xl text-navy no-underline">
        <div className="w-[33px] h-[33px] bg-sahred rounded-lg flex items-center justify-center text-base">
          🦅
        </div>
        Şahin<span className="text-sahred">Satış</span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-0.5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex gap-2 items-center">
        {session?.user ? (
          <div className="flex items-center gap-3">
            {session.user.role === "ADMIN" && (
              <Link href="/admin" className="text-sm font-semibold text-sahred hover:underline">
                Admin Paneli
              </Link>
            )}
            <Link href="/panel" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2")}>
              <User size={16} /> Hesabım
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Çıkış Yap
            </button>
          </div>
        ) : (
          <>
            <Link href="/auth/giris" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
              Giriş Yap
            </Link>
            <Link href="/auth/kayit" className={cn(buttonVariants({ size: "sm" }), "bg-sahred hover:bg-sahred-hover text-white")}>
              Ücretsiz Üye Ol
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-muted-foreground hover:text-foreground"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menüyü aç"
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[66px] left-0 right-0 bg-white border-b border-border p-4 flex flex-col gap-1 shadow-lg z-50 md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-border">
              {session?.user ? (
                <>
                  {session.user.role === "ADMIN" && (
                    <Link href="/admin" onClick={() => setMobileOpen(false)} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full border-sahred text-sahred")}>
                      Admin Paneli
                    </Link>
                  )}
                  <Link href="/panel" onClick={() => setMobileOpen(false)} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full gap-2")}>
                    <User size={16} /> Hesabım
                  </Link>
                  <button onClick={() => signOut({ callbackUrl: "/" })} className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-full text-muted-foreground")}>
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link href="/auth/giris" onClick={() => setMobileOpen(false)} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex-1")}>
                    Giriş Yap
                  </Link>
                  <Link href="/auth/kayit" onClick={() => setMobileOpen(false)} className={cn(buttonVariants({ size: "sm" }), "flex-1 bg-sahred hover:bg-sahred-hover text-white")}>
                    Üye Ol
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

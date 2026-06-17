"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useActionState } from "react";
import { registerUser } from "@/actions/register";

export default function KayitPage() {
  const [state, formAction, isPending] = useActionState(
    registerUser,
    null,
  );

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-card rounded-3xl w-full max-w-[440px] overflow-hidden shadow-lg border border-border"
      >
        {/* Header */}
        <div className="p-8 pb-4 text-center">
          <Link href="/" className="inline-flex items-center gap-2 font-heading font-extrabold text-xl text-navy mb-4">
            <div className="w-[33px] h-[33px] bg-sahred rounded-lg flex items-center justify-center text-base">🦅</div>
            Şahin<span className="text-sahred">Satış</span>
          </Link>
          <h1 className="font-heading font-extrabold text-2xl text-foreground">Ücretsiz Üye Olun</h1>
          <p className="text-sm text-muted-foreground mt-1">Hemen sipariş vermek için hesap oluşturun</p>
        </div>

        {/* Body */}
        <div className="px-8 pb-8">
          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1.5">Ad Soyad</label>
              <Input type="text" name="name" placeholder="Ahmet Yılmaz" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1.5">E-posta</label>
              <Input type="email" name="email" placeholder="ornek@mail.com" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1.5">Şifre</label>
              <Input type="password" name="password" placeholder="En az 6 karakter" required minLength={6} />
            </div>

            {state?.error && (
              <p className="text-sm text-red-500 font-medium">{state.error}</p>
            )}

            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full mt-5 bg-sahred hover:bg-sahred-hover text-white h-11 text-sm font-semibold"
            >
              {isPending ? "Kayıt olunuyor..." : "Kayıt Ol"}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-5">
            Zaten üye misiniz?{" "}
            <Link href="/auth/giris" className="text-sahred font-semibold hover:underline">
              Giriş yapın.
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

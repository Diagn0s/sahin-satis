"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useActionState } from "react";
import { authenticate } from "@/actions/auth";

export default function GirisPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-card rounded-3xl w-full max-w-[440px] overflow-hidden shadow-lg border border-border"
      >
        <div className="p-8 pb-4 text-center">
          <Link href="/" className="inline-flex items-center gap-2 font-heading font-extrabold text-xl text-navy mb-4">
            <div className="w-[33px] h-[33px] bg-sahred rounded-lg flex items-center justify-center text-base">🦅</div>
            Şahin<span className="text-sahred">Satış</span>
          </Link>
          <h1 className="font-heading font-extrabold text-2xl text-foreground">Giriş Yapın</h1>
          <p className="text-sm text-muted-foreground mt-1">Hesabınıza giriş yaparak devam edin</p>
        </div>

        <div className="px-8 pb-8">
          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1.5">E-posta</label>
              <Input type="email" name="email" placeholder="ornek@mail.com" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1.5">Şifre</label>
              <Input type="password" name="password" placeholder="••••••••" required />
            </div>

            {errorMessage && (
              <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
            )}

            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full mt-5 bg-sahred hover:bg-sahred-hover text-white h-11 text-sm font-semibold"
            >
              {isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-5">
            Hesabınız yok mu?{" "}
            <Link href="/auth/kayit" className="text-sahred font-semibold hover:underline">
              Üye olun!
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

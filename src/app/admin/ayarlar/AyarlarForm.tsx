"use client";

import { useActionState } from "react";
import { updateSettings } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AyarlarForm({ initialData }: { initialData: any }) {
  const [state, formAction, isPending] = useActionState(
    updateSettings,
    null
  );

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm max-w-xl">
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1.5">WhatsApp Numarası</label>
          <Input type="text" name="whatsapp" defaultValue={initialData?.whatsapp || "905331685213"} required placeholder="Örn: 905331685213" />
          <p className="text-xs text-muted-foreground mt-1">Başında + olmadan, ülke kodu ile birlikte girin.</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5">Görünen Telefon Numarası</label>
          <Input type="text" name="phone" defaultValue={initialData?.phone || "0533 168 52 13"} required placeholder="Örn: 0533 168 52 13" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5">İletişim E-posta Adresi</label>
          <Input type="email" name="email" defaultValue={initialData?.email || "info@sahinsatis.com"} required placeholder="info@sahinsatis.com" />
        </div>

        {state?.error && (
          <p className="text-sm text-red-500 font-medium">{state.error}</p>
        )}
        {state?.success && (
          <p className="text-sm text-emerald-500 font-medium">{state.success}</p>
        )}

        <Button type="submit" disabled={isPending} className="w-full bg-sahred hover:bg-sahred-hover text-white mt-4">
          {isPending ? "Kaydediliyor..." : "Ayarları Kaydet"}
        </Button>
      </form>
    </div>
  );
}

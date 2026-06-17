"use client";

import { useActionState } from "react";
import { createListing } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function YeniIlanForm({ categories }: { categories: any[] }) {
  const [state, formAction, isPending] = useActionState(
    createListing,
    null
  );

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm max-w-2xl">
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1.5">Başlık</label>
          <Input type="text" name="title" required placeholder="iPhone 13 Pro Max" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5">Açıklama</label>
          <textarea 
            name="description" 
            required 
            rows={4}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Ürün durumu, kutu içeriği vb."
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5">Fiyat (₺)</label>
            <Input type="text" name="price" required placeholder="18.500" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Kategori</label>
            <select
              name="categoryId"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Kategori Seçin</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5">Ürün Görseli (Opsiyonel)</label>
          <Input type="file" name="image" accept="image/*" />
          <p className="text-xs text-muted-foreground mt-1">Sadece .jpg, .png, .webp (max 4MB)</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5">İkon (Emoji)</label>
            <Input type="text" name="icon" defaultValue="📦" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Rozet (Opsiyonel)</label>
            <Input type="text" name="badge" placeholder="hot / new" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Rozet Metni</label>
            <Input type="text" name="badgeLabel" placeholder="FIRSAT" />
          </div>
        </div>

        {state?.error && (
          <p className="text-sm text-red-500 font-medium">{state.error}</p>
        )}

        <Button type="submit" disabled={isPending} className="w-full bg-sahred hover:bg-sahred-hover text-white mt-4">
          {isPending ? "Ekleniyor..." : "İlanı Ekle"}
        </Button>
      </form>
    </div>
  );
}

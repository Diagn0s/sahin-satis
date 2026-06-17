"use client";

import { useActionState } from "react";
import { updateListing } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function EditForm({ categories, listing }: { categories: any[], listing: any }) {
  const [state, formAction, isPending] = useActionState(
    updateListing,
    null
  );

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm max-w-2xl">
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="id" value={listing.id} />
        
        <div>
          <label className="block text-sm font-semibold mb-1.5">Başlık</label>
          <Input type="text" name="title" defaultValue={listing.title} required />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5">Açıklama</label>
          <textarea 
            name="description" 
            defaultValue={listing.description}
            required 
            rows={4}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-sahred">Güncel Fiyat (₺)</label>
            <Input type="text" name="price" defaultValue={listing.price} required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-muted-foreground">Eski Fiyat (₺) (Opsiyonel)</label>
            <Input type="text" name="oldPrice" defaultValue={listing.oldPrice || ""} placeholder="İndirimliyse girin" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Kategori</label>
            <select
              name="categoryId"
              defaultValue={listing.categoryId}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
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
          <div className="flex gap-4 items-center">
            {listing.imageUrl && (
              <img src={listing.imageUrl} alt="" className="w-16 h-16 rounded-md object-cover border" />
            )}
            <div className="flex-1">
              <Input type="file" name="image" accept="image/*" />
              <p className="text-xs text-muted-foreground mt-1">Sadece .jpg, .png, .webp (max 4MB). Yeni resim yüklerseniz eskisi değişir.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5">İkon (Emoji)</label>
            <Input type="text" name="icon" defaultValue={listing.icon} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Rozet (Opsiyonel)</label>
            <Input type="text" name="badge" defaultValue={listing.badge || ""} placeholder="hot / new" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Rozet Metni</label>
            <Input type="text" name="badgeLabel" defaultValue={listing.badgeLabel || ""} placeholder="FIRSAT" />
          </div>
        </div>

        {state?.error && (
          <p className="text-sm text-red-500 font-medium">{state.error}</p>
        )}

        <Button type="submit" disabled={isPending} className="w-full bg-sahred hover:bg-sahred-hover text-white mt-4">
          {isPending ? "Güncelleniyor..." : "Değişiklikleri Kaydet"}
        </Button>
      </form>
    </div>
  );
}

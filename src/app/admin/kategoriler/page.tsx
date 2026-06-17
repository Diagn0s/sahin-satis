import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { createCategory } from "@/actions/admin";

export const metadata = {
  title: "Kategori Yönetimi",
};

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { listings: true }
      }
    },
    orderBy: { name: "asc" }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-heading font-extrabold text-2xl">Kategoriler</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sol Taraf: Kategori Listesi */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground text-xs uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">İkon & Ad</th>
                  <th className="px-6 py-4 font-semibold">Slug</th>
                  <th className="px-6 py-4 font-semibold">İlan Sayısı</th>
                  <th className="px-6 py-4 font-semibold text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                      Henüz kategori yok.
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="text-xl">{category.icon}</div>
                          <div className="font-medium text-foreground">{category.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {category.slug}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                          {category._count.listings} İlan
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <form action={async () => {
                          "use server";
                          await prisma.category.delete({ where: { id: category.id } });
                        }}>
                          <Button variant="ghost" size="sm" type="submit" className="text-red-500 hover:text-red-600 hover:bg-red-50" disabled={category._count.listings > 0}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </form>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sağ Taraf: Yeni Kategori Ekleme Formu */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-fit">
          <h2 className="font-heading font-bold text-lg mb-4">Yeni Kategori Ekle</h2>
          <form action={async (formData) => {
            "use server";
            // Normalde useActionState kullanılır ama sade olması için server action çağıralım.
            await createCategory(null, formData);
          }} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Kategori Adı</label>
              <Input type="text" name="name" required placeholder="Örn: Ev & Yaşam" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-1.5">İkon (Emoji)</label>
              <Input type="text" name="icon" defaultValue="📁" placeholder="Örn: 🏠" />
            </div>

            <Button type="submit" className="w-full bg-sahred hover:bg-sahred-hover text-white mt-2">
              Kategori Ekle
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}

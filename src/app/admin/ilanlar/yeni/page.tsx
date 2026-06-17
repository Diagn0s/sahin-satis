import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { YeniIlanForm } from "./YeniIlanForm";

export const metadata = {
  title: "Yeni İlan Ekle",
};

export default async function YeniIlanPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" }
  });

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/ilanlar" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> İlanlara Dön
        </Link>
        <h1 className="font-heading font-extrabold text-2xl">Yeni İlan Ekle</h1>
      </div>

      <YeniIlanForm categories={categories} />
    </div>
  );
}

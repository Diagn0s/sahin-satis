import { prisma } from "@/lib/prisma";
import { EditForm } from "./EditForm";
import { redirect } from "next/navigation";

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({ where: { id } });

  if (!listing) {
    redirect("/admin/ilanlar");
  }

  const categories = await prisma.category.findMany();

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl mb-6">İlanı Düzenle</h1>
      <EditForm categories={categories} listing={listing} />
    </div>
  );
}

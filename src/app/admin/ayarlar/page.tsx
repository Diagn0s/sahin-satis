import { prisma } from "@/lib/prisma";
import { AyarlarForm } from "./AyarlarForm";

export const metadata = {
  title: "Site Ayarları",
};

export default async function AdminSettingsPage() {
  const settings = await prisma.settings.findUnique({
    where: { id: "global" }
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading font-extrabold text-2xl">Site Ayarları</h1>
        <p className="text-muted-foreground text-sm mt-1">Sitenin genel iletişim bilgilerini buradan güncelleyebilirsiniz.</p>
      </div>

      <AyarlarForm initialData={settings} />
    </div>
  );
}

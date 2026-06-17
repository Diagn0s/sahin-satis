"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";

export async function createListing(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Yetkisiz işlem." };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const categoryId = formData.get("categoryId") as string;
  const icon = (formData.get("icon") as string) || "📦";
  const badge = formData.get("badge") as string;
  const badgeLabel = formData.get("badgeLabel") as string;
  const image = formData.get("image") as File | null;

  if (!title || !description || !price || !categoryId) {
    return { error: "Lütfen gerekli alanları doldurun." };
  }

  // Generate slug
  const slug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 8);

  let imageUrl: string | null = null;
  if (image && image.size > 0) {
    try {
      const blob = await put(image.name, image, {
        access: 'public',
      });
      imageUrl = blob.url;
    } catch (e) {
      console.error("Blob upload error:", e);
      return { error: "Görsel yüklenemedi. Lütfen .env dosyasında BLOB_READ_WRITE_TOKEN yapılandırıldığından emin olun." };
    }
  }

  try {
    await prisma.listing.create({
      data: {
        title,
        slug,
        description,
        price: parseFloat(price.replace(/\./g, "").replace(/,/g, ".")),
        categoryId,
        icon,
        imageUrl,
        bgColor: "bg-muted", // default
        badge: badge || null,
        badgeLabel: badgeLabel || null,
        stars: 5,
        views: 0,
      }
    });
  } catch (error) {
    return { error: "Bir hata oluştu." };
  }

  revalidatePath("/admin/ilanlar");
  revalidatePath("/ilanlar");
  revalidatePath("/");
  redirect("/admin/ilanlar");
}

export async function createCategory(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Yetkisiz işlem." };
  }

  const name = formData.get("name") as string;
  const icon = (formData.get("icon") as string) || "📁";

  if (!name) {
    return { error: "Kategori adı gereklidir." };
  }

  const slug = name.toLowerCase().trim()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-');

  try {
    await prisma.category.create({
      data: {
        name,
        slug,
        icon,
      }
    });
  } catch (error) {
    return { error: "Bu kategori zaten mevcut olabilir veya bir hata oluştu." };
  }

  revalidatePath("/admin/kategoriler");
  revalidatePath("/admin/ilanlar/yeni");
  redirect("/admin/kategoriler");
}

export async function updateSettings(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Yetkisiz işlem." };
  }

  const phone = formData.get("phone") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const email = formData.get("email") as string;

  try {
    await prisma.settings.upsert({
      where: { id: "global" },
      update: { phone, whatsapp, email },
      create: { id: "global", phone, whatsapp, email },
    });
  } catch (error) {
    return { error: "Ayarlar güncellenirken bir hata oluştu." };
  }

  revalidatePath("/", "layout"); // Revalidate entire app structure
  return { success: "Ayarlar başarıyla güncellendi." };
}

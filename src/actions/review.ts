"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createReview(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Yetkisiz işlem." };
  }

  const orderId = formData.get("orderId") as string;
  const starsStr = formData.get("stars") as string;
  const text = formData.get("text") as string;
  const stars = parseInt(starsStr, 10);

  if (!orderId || !stars || !text) {
    return { error: "Lütfen tüm alanları doldurun." };
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId, userId: session.user.id },
      include: { review: true }
    });

    if (!order) {
      return { error: "Sipariş bulunamadı." };
    }

    if (order.status !== "APPROVED") {
      return { error: "Sadece onaylanmış siparişlere yorum yapabilirsiniz." };
    }

    if (order.review) {
      return { error: "Bu siparişe zaten yorum yapmışsınız." };
    }

    await prisma.review.create({
      data: {
        orderId,
        userId: session.user.id,
        stars,
        text
      }
    });

    revalidatePath("/panel");
    revalidatePath("/");
    
    return { success: "Yorumunuz eklendi. Teşekkürler!" };
  } catch (error) {
    console.error("Yorum ekleme hatası:", error);
    return { error: "Yorum eklenirken bir hata oluştu." };
  }
}

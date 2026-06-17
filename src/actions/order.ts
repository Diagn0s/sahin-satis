"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createOrder(listingId: string, title: string) {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/auth/giris");
  }

  // Check if order already exists for this user and listing
  const existingOrder = await prisma.order.findFirst({
    where: {
      userId: session.user.id,
      listingId: listingId,
    }
  });

  if (!existingOrder) {
    await prisma.order.create({
      data: {
        userId: session.user.id,
        listingId: listingId,
        status: "PENDING",
      }
    });
  }

  revalidatePath("/panel");
  
  // WhatsApp yollama linki
  const text = encodeURIComponent(`Merhaba! ${title} hakkında bilgi almak ve siparişimi tamamlamak istiyorum.`);
  redirect(`https://wa.me/905331685213?text=${text}`);
}

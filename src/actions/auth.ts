"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const { email, password } = Object.fromEntries(formData.entries());
    
    // Check role before redirect
    const { prisma } = await import("@/lib/prisma");
    const user = await prisma.user.findUnique({
      where: { email: email as string }
    });
    const redirectTo = user?.role === "ADMIN" ? "/admin" : "/panel";

    await signIn("credentials", {
      email,
      password,
      redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Geçersiz e-posta veya şifre.";
        default:
          return "Bir hata oluştu.";
      }
    }
    throw error;
  }
}

import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Topbar } from "@/components/layout/Topbar";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Şahin Satış — Güvenilir 2. El Alışveriş Platformu",
    template: "%s | Şahin Satış",
  },
  description:
    "Türkiye'nin güvenilir 2. el alışveriş platformu. Binlerce ikinci el ürün, güvenilir satıcılar ve WhatsApp üzerinden anlık iletişim.",
  keywords: [
    "2. el",
    "ikinci el",
    "alışveriş",
    "satış",
    "telefon",
    "bilgisayar",
    "elektronik",
  ],
  openGraph: {
    title: "Şahin Satış — Güvenilir 2. El Alışveriş",
    description:
      "Binlerce ikinci el ürün, güvenilir satıcılar ve WhatsApp üzerinden anlık iletişim.",
    type: "website",
    locale: "tr_TR",
  },
};

import { SessionProvider } from "@/components/providers/SessionProvider";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const settings = await prisma.settings.findUnique({ where: { id: "global" } });

  const globalSettings = {
    phone: settings?.phone || "0533 168 52 13",
    whatsapp: settings?.whatsapp || "905331685213",
    email: settings?.email || "info@sahinsatis.com"
  };

  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable} antialiased`}>
        <SessionProvider session={session}>
          <LayoutWrapper settings={globalSettings}>
            {children}
          </LayoutWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}

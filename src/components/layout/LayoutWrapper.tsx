"use client";

import { usePathname } from "next/navigation";
import { Topbar } from "./Topbar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";

export function LayoutWrapper({ 
  children, 
  settings 
}: { 
  children: React.ReactNode; 
  settings: any;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Topbar settings={settings} />
      <Navbar />
      <main>{children}</main>
      <Footer settings={settings} />
      <WhatsAppFloat settings={settings} />
    </>
  );
}

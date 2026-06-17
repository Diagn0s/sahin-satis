"use client";

import { motion } from "framer-motion";

export function WhatsAppFloat({ settings }: { settings: any }) {
  return (
    <motion.a
      href={`https://wa.me/${settings.whatsapp}?text=Merhaba!%20Şahin%20Satış%27tan%20yardım%20almak%20istiyorum.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-wa text-white py-3 px-5 pl-4 rounded-full font-bold text-sm shadow-[0_6px_22px_rgba(37,211,102,0.4)] hover:shadow-[0_10px_32px_rgba(37,211,102,0.55)] transition-shadow no-underline"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="w-[7px] h-[7px] bg-white rounded-full animate-wa-blink" />
      💬 WhatsApp Destek
    </motion.a>
  );
}

"use client";

import { motion } from "framer-motion";

export function TestimonialsList({ reviews }: { reviews: any[] }) {
  if (reviews.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {reviews.map((r, i) => (
        <motion.div
          key={r.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-border/80 hover:shadow-[0_8px_22px_rgba(0,0,0,0.07)]"
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-[42px] h-[42px] rounded-full bg-gradient-to-br ${r.gradient} flex items-center justify-center font-heading font-bold text-sm text-white shrink-0`}
            >
              {r.initials}
            </div>
            <div>
              <div className="font-semibold text-sm text-foreground">
                {r.name}
              </div>
            </div>
          </div>
          <div className="text-xs text-amber-400 mb-2">
            {"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}
          </div>
          <p className="text-[13px] text-muted-foreground leading-relaxed font-light">
            {r.text}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

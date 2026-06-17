"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [value, setValue] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ""));
          const prefix = target.replace(/[0-9.]/g, "").replace("+", "");
          const hasPlus = target.includes("+");
          const hasDot = target.includes(".");
          const duration = 2000;
          const start = Date.now();

          const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = numericTarget * eased;

            if (hasDot) {
              setValue(prefix + current.toFixed(target.split(".")[1]?.replace(/[^0-9]/g, "").length || 0).replace(".", ".") + (hasPlus && progress >= 1 ? "+" : ""));
            } else {
              setValue(prefix + Math.floor(current).toLocaleString("tr-TR") + (hasPlus && progress >= 1 ? "+" : ""));
            }

            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-heading font-extrabold text-4xl md:text-5xl leading-none mb-1.5">
      {value}{suffix}
    </div>
  );
}

const stats = [
  { value: "850+", label: "Aktif İlan", color: "text-sahred" },
  { value: "1.240", label: "Mutlu Müşteri", color: "text-gold" },
  { value: "%98.4", label: "Memnuniyet", color: "text-wa" },
  { value: "7/24", label: "WhatsApp Destek", color: "text-white", static: true },
];

export function StatsSection() {
  return (
    <section className="bg-navy py-14 md:py-16 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-white tracking-tight">
          Rakamlarla Şahin Satış
        </h2>
        <p className="text-white/40 text-sm mt-1">Güvenin kanıtı</p>
      </motion.div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-[2px] bg-white/5 rounded-2xl overflow-hidden border border-white/7">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-navy py-10 px-6 text-center hover:bg-white/3 transition-colors"
          >
            <div className={stat.color}>
              {stat.static ? (
                <div className="font-heading font-extrabold text-4xl md:text-5xl leading-none mb-1.5">
                  {stat.value}
                </div>
              ) : (
                <AnimatedNumber target={stat.value} />
              )}
            </div>
            <div className="text-white/45 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

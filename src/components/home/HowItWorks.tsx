"use client";

import { motion } from "framer-motion";

const steps = [
  { num: 1, title: "Üye Ol", desc: "Ad, e-posta ve telefon numaranızla 30 saniyede ücretsiz hesap oluşturun." },
  { num: 2, title: "İlanları Gözat", desc: "Kategoriye göre filtreleyin, detayları inceleyin, favorilerinize ekleyin." },
  { num: 3, title: "WhatsApp'tan Yaz", desc: "\"Satın Al\" butonuna tıklayın. Doğrudan WhatsApp'a yönlenin, anında iletişim kurun." },
  { num: 4, title: "Teslim Al", desc: "Ödeme yönteminizi belirleyin, anlaşın ve ürününüzü güvenle teslim alın." },
];

export function HowItWorks() {
  return (
    <section id="nasil" className="bg-card border-y border-border">
      <div className="max-w-[1200px] mx-auto py-16 md:py-20 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground tracking-tight">
            Nasıl Çalışır?
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            4 adımda güvenli alışveriş
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-background border border-border rounded-2xl p-8 text-center transition-all duration-300 hover:border-sahred hover:shadow-[0_8px_28px_rgba(230,57,70,0.1)] group"
            >
              <div className="w-[50px] h-[50px] rounded-xl flex items-center justify-center font-heading font-extrabold text-lg mx-auto mb-5 text-white bg-sahred group-hover:scale-110 transition-transform">
                {step.num}
              </div>
              <h3 className="font-heading font-bold text-[15px] text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed font-light">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

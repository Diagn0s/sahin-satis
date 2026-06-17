import Link from "next/link";

export function Footer({ settings }: { settings: any }) {
  return (
    <footer className="bg-[#060912] text-white/48 pt-16 px-4 md:px-8 pb-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2.2fr_1fr_1fr_1fr] gap-8 lg:gap-12 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 font-heading font-extrabold text-xl text-white">
            <div className="w-[33px] h-[33px] bg-sahred rounded-lg flex items-center justify-center text-base">
              🦅
            </div>
            Şahin<span className="text-sahred">Satış</span>
          </div>
          <p className="text-sm leading-7 font-light mt-4 max-w-[280px] text-white/50">
            Türkiye&apos;nin güvenilir 2. el alışveriş platformu. Kaliteli ürünler, dürüst satıcılar, hızlı iletişim.
          </p>
          <div className="flex flex-col gap-2 mt-5">
            <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-white/55 text-sm hover:text-white transition-colors">
              <span className="w-7 h-7 rounded-lg bg-white/7 flex items-center justify-center text-xs">💬</span>
              {settings.phone} — WhatsApp
            </a>
            <a href={`mailto:${settings.email}`} className="flex items-center gap-2.5 text-white/55 text-sm hover:text-white transition-colors">
              <span className="w-7 h-7 rounded-lg bg-white/7 flex items-center justify-center text-xs">📧</span>
              {settings.email}
            </a>
            <span className="flex items-center gap-2.5 text-white/55 text-sm">
              <span className="w-7 h-7 rounded-lg bg-white/7 flex items-center justify-center text-xs">📍</span>
              Türkiye geneli hizmet
            </span>
          </div>
        </div>

        {/* Site Links */}
        <div>
          <h5 className="text-white/82 font-heading font-bold text-sm mb-4 tracking-wide">Site</h5>
          <ul className="space-y-1">
            {[
              { label: "Ana Sayfa", href: "/" },
              { label: "İlanlar", href: "/ilanlar" },
              { label: "Nasıl Çalışır?", href: "/#nasil" },
              { label: "Yorumlar", href: "/#yorumlar" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm py-1 block hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h5 className="text-white/82 font-heading font-bold text-sm mb-4 tracking-wide">Kategoriler</h5>
          <ul className="space-y-1">
            {[
              { label: "Telefon & Tablet", slug: "telefon-tablet" },
              { label: "Bilgisayar", slug: "bilgisayar" },
              { label: "Ev & Mobilya", slug: "ev-mobilya" },
              { label: "Oyun & Konsol", slug: "oyun-konsol" },
              { label: "Fotoğraf", slug: "fotograf" },
              { label: "Araç & Motor", slug: "arac-motor" },
            ].map((item) => (
              <li key={item.slug}>
                <Link href={`/kategori/${item.slug}`} className="text-sm py-1 block hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h5 className="text-white/82 font-heading font-bold text-sm mb-4 tracking-wide">Hesap</h5>
          <ul className="space-y-1">
            {[
              { label: "Üye Ol", href: "/auth/kayit" },
              { label: "Giriş Yap", href: "/auth/giris" },
              { label: "Gizlilik Politikası", href: "#" },
              { label: "Kullanım Koşulları", href: "#" },
            ].map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm py-1 block hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-[1200px] mx-auto border-t border-white/7 pt-5 flex flex-wrap justify-between items-center gap-3 text-xs">
        <span>© 2024 Şahin Satış. Tüm hakları saklıdır.</span>
        <div className="inline-flex items-center gap-1.5 bg-wa/10 border border-wa/18 rounded-full px-3 py-1 text-wa text-xs font-semibold">
          🟢 7/24 Aktif Destek
        </div>
        <span>Güvenli Alışveriş Platformu</span>
      </div>
    </footer>
  );
}

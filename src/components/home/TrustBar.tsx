const trustItems = [
  { icon: "🛡️", label: "Güvenli", sublabel: "Alışveriş", color: "bg-sahred-dim" },
  { icon: "💬", label: "Anlık Destek", sublabel: "WhatsApp ile", color: "bg-wa-dim" },
  { icon: "⚡", label: "Hızlı", sublabel: "İlan Yayını", color: "bg-gold-dim" },
  { icon: "✅", label: "Onaylı", sublabel: "Satıcılar", color: "bg-blue-50" },
  { icon: "📦", label: "850+", sublabel: "Aktif İlan", color: "bg-sahred-dim" },
];

export function TrustBar() {
  return (
    <div className="bg-white border-b border-border py-3.5 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto flex items-center justify-around flex-wrap gap-4">
        {trustItems.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 text-muted-foreground text-sm font-medium">
            <div className={`w-[34px] h-[34px] rounded-lg flex items-center justify-center text-base ${item.color}`}>
              {item.icon}
            </div>
            <div>
              <strong className="text-foreground font-bold">{item.label}</strong>{" "}
              {item.sublabel}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

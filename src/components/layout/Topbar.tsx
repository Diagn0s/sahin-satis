export function Topbar({ settings }: { settings: any }) {
  return (
    <div className="bg-navy text-white/60 text-[12.5px] text-center py-2 px-4">
      🔥 Türkiye&apos;nin güvenilir 2. el platformu — Sorular için:{" "}
      <a
        href={`https://wa.me/${settings.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-wa font-semibold hover:underline"
      >
        {settings.phone}
      </a>
    </div>
  );
}

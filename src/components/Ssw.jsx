import { ArrowRight, BookOpenCheck, GraduationCap, Tractor } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

const MODULES = [
  {
    id: "modul",
    title: "Modul Interaktif SSW Pertanian",
    desc: "Teori lengkap Bab A–F + Bonus Choukai, quiz per bab, rekap skor. Format asli.",
    meta: "6 Bab + Bonus • Quiz + Rekap",
    icon: BookOpenCheck,
    href: `${BASE}ssw/modul-interaktif-ssw-pertanian.html`,
  },
  {
    id: "bank",
    title: "Bank Soal 200+ V2",
    desc: "Full furigana di opsi A/B/C + terjemahan Indonesia. 10 bab, mode 20/35/70/200 soal.",
    meta: "200 soal • 10 Bab • Furigana",
    icon: GraduationCap,
    href: `${BASE}ssw/bank-soal-200-v2.html`,
  },
];

export function Ssw() {
  return (
    <div className="max-w-[720px] mx-auto space-y-6">
      <div className="text-center pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-[11px] font-bold tracking-widest uppercase">
          <Tractor size={12} /> Tokutei Ginou Pertanian
        </div>
        <h2 className="pop mt-3 text-[24px] md:text-[30px] font-bold tracking-tight">
          SSW Pertanian
        </h2>
        <p className="mt-1 text-[13px] text-[#2E7D32]/70">
          Modul asli dibuka di tab baru — progres JLPT di aplikasi ini tetap tersimpan di sesi ini
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MODULES.map((m) => {
          const Icon = m.icon;
          return (
            <a
              key={m.id}
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-left rounded-[16px] bg-white border border-[#2E7D32]/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-5 hover:shadow-md hover:border-[#2E7D32]/30 active:scale-[0.99] transition-all block"
            >
              <span className="w-11 h-11 rounded-[12px] grid place-items-center bg-[#2E7D32] text-white">
                <Icon size={20} />
              </span>
              <div className="pop mt-3 text-[16px] font-bold leading-tight">{m.title}</div>
              <div className="mt-1 text-[12px] leading-[1.5] text-[#2E7D32]/70">{m.desc}</div>
              <div className="mt-2 text-[11px] font-bold text-[#2E7D32]/60">{m.meta}</div>
              <div className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-[#2E7D32]">
                Buka modul <ArrowRight size={14} />
              </div>
            </a>
          );
        })}
      </div>
      <p className="text-center text-[11px] text-[#2E7D32]/50 pb-8">
        File modul asli (single-file HTML) disajikan apa adanya dari folder ssw/
      </p>
    </div>
  );
}

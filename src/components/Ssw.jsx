import { useState } from "react";
import { ArrowLeft, ArrowRight, BookOpenCheck, ExternalLink, GraduationCap, Tractor } from "lucide-react";

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

export function Ssw({ onHome }) {
  const [openId, setOpenId] = useState(null);
  const active = MODULES.find((m) => m.id === openId);

  if (active) {
    const ActiveIcon = active.icon;
    return (
      <div className="max-w-[960px] mx-auto space-y-4">
        <div className="rounded-[16px] bg-white border border-[#2E7D32]/10 p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-10 h-10 rounded-[12px] grid place-items-center bg-[#2E7D32] text-white shrink-0">
              <ActiveIcon size={18} />
            </span>
            <div className="min-w-0">
              <div className="text-[14px] font-bold leading-tight truncate">{active.title}</div>
              <div className="text-[11px] text-[#2E7D32]/60">{active.meta}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={active.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buka di tab baru"
              className="w-10 h-10 rounded-full grid place-items-center bg-white border border-[#2E7D32]/20 text-[#2E7D32] hover:bg-[#E8F5E9]"
            >
              <ExternalLink size={16} />
            </a>
            <button
              onClick={() => setOpenId(null)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#2E7D32] text-white text-[12px] font-bold hover:bg-[#1B5E20] active:scale-[0.98]"
            >
              <ArrowLeft size={14} /> Daftar modul
            </button>
          </div>
        </div>
        <div className="rounded-[16px] overflow-hidden border border-[#2E7D32]/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] bg-white">
          <iframe
            key={active.id}
            src={active.href}
            title={active.title}
            className="w-full h-[75vh] block"
          />
        </div>
        <p className="text-center text-[11px] text-[#2E7D32]/50 pb-8">
          Tombol Home di atas selalu tersedia untuk kembali ke N5–N2
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[720px] mx-auto space-y-6">
      <button
        onClick={onHome}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-[#3949AB]/20 text-[#3949AB] text-[12px] font-bold hover:bg-[#E8EAF6] active:scale-[0.98]"
      >
        <ArrowLeft size={14} /> Beranda
      </button>
      <div className="text-center pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-[11px] font-bold tracking-widest uppercase">
          <Tractor size={12} /> Tokutei Ginou Pertanian
        </div>
        <h2 className="pop mt-3 text-[24px] md:text-[30px] font-bold tracking-tight">
          SSW Pertanian
        </h2>
        <p className="mt-1 text-[13px] text-[#2E7D32]/70">
          Modul terbuka di dalam aplikasi — tombol Home selalu bisa dipakai kembali ke N5–N2
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MODULES.map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => setOpenId(m.id)}
              className="text-left rounded-[16px] bg-white border border-[#2E7D32]/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-5 hover:shadow-md hover:border-[#2E7D32]/30 active:scale-[0.99] transition-all"
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
            </button>
          );
        })}
      </div>
      <p className="text-center text-[11px] text-[#2E7D32]/50 pb-8">
        File modul asli (single-file HTML) disajikan apa adanya dari folder ssw/
      </p>
    </div>
  );
}

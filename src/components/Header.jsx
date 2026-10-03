import { Award, House, Languages } from "lucide-react";

export default function Header({ answered, total, pct, correct, onRecap, showHome, onHome }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#FFF8E1]/90 border-b border-[#2E7D32]/10" style={{ paddingTop: "var(--safe-area-inset-top)" }}>
      <div className="max-w-[960px] mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {showHome && (
            <button
              onClick={onHome}
              aria-label="Kembali ke pilih level"
              className="w-10 h-10 rounded-xl bg-white border border-[#2E7D32]/20 text-[#2E7D32] grid place-items-center hover:bg-[#E8F5E9] active:scale-[0.98] transition-all"
            >
              <House size={18} />
            </button>
          )}
          <div className="w-10 h-10 rounded-xl bg-[#2E7D32] text-white grid place-items-center shadow-lg shadow-[#2E7D32]/20">
            <Languages size={20} />
          </div>
          <div>
            <h1 className="pop text-[15px] md:text-[17px] font-bold leading-tight tracking-tight">
              Belajar Bahasa Jepang N5–N2
            </h1>
            <p className="text-[11px] md:text-[12px] text-[#2E7D32]/70 font-medium">
              JLPT • Moji-Goi • Bunpou • Dokkai • Choukai
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="text-right">
            <div className="text-[11px] font-semibold text-[#2E7D32]/60 uppercase tracking-widest">
              Progress Belajar
            </div>
            <div className="text-sm font-bold">
              {answered}/{total} soal • {pct}%
            </div>
          </div>
          <div className="w-20 h-2 rounded-full bg-[#2E7D32]/10 overflow-hidden">
            <div
              className="h-full bg-[#2E7D32] transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <button
          onClick={onRecap}
          className="md:hidden px-3 py-2 rounded-full bg-[#2E7D32] text-white text-xs font-bold flex items-center gap-1 shadow"
        >
          <Award size={14} /> {correct}/{total}
        </button>
      </div>
      <div className="md:hidden h-1 w-full bg-[#2E7D32]/10">
        <div
          className="h-full bg-[#2E7D32] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </header>
  );
}

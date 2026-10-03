import { ArrowRight, Award } from "lucide-react";

export function Home({ levels, pctById, scoreById, totals, onSelect, onRecap }) {
  return (
    <div className="max-w-[720px] mx-auto space-y-6">
      <div className="text-center pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EAF6] text-[#3949AB] text-[11px] font-bold tracking-widest uppercase">
          JLPT • N5 – N2
        </div>
        <h2 className="pop mt-3 text-[24px] md:text-[30px] font-bold tracking-tight">
          Pilih Level Belajarmu
        </h2>
        <p className="mt-1 text-[13px] text-[#3949AB]/70">
          Tiap level berisi materi + soal latihan per skill (Goi, Bunpou, Dokkai, Choukai)
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {levels.map((lv) => {
          const pct = pctById(lv.id);
          const sc = scoreById(lv.id);
          const Icon = lv.icon;
          return (
            <button
              key={lv.id}
              onClick={() => onSelect(lv.id)}
              className="text-left rounded-[16px] bg-white border border-[#3949AB]/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-5 hover:shadow-md hover:border-[#3949AB]/30 active:scale-[0.99] transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-[12px] grid place-items-center bg-[#3949AB] text-white shrink-0">
                  <Icon size={20} />
                </span>
                <div>
                  <div className="pop text-[18px] font-bold leading-tight">{lv.short}</div>
                  <div className="text-[11px] text-[#3949AB]/60">{lv.label}</div>
                </div>
              </div>
              <div className="mt-3 text-[11px] text-[#3949AB]/60">
                {lv.vocab.length} kosakata • {lv.quiz.length} soal • {sc.correct}/
                {sc.total} benar
              </div>
              <div className="mt-2 h-2 rounded-full bg-[#3949AB]/10 overflow-hidden">
                <div
                  className="h-full bg-[#3949AB] transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-[#3949AB]">
                {pct === 0 ? "Mulai belajar" : pct === 100 ? "Ulas lagi" : "Lanjutkan"} ({pct}
                %) <ArrowRight size={14} />
              </div>
            </button>
          );
        })}
      </div>
      <button
        onClick={onRecap}
        className="w-full rounded-[16px] bg-[#3949AB] text-white p-5 shadow-[0_8px_24px_rgba(57,73,171,0.25)] flex items-center justify-between gap-3 hover:bg-[#283593] active:scale-[0.99] transition-all"
      >
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-[12px] grid place-items-center bg-white/15">
            <Award size={20} className="text-[#FFECB3]" />
          </span>
          <div className="text-left">
            <div className="font-bold text-[14px]">Rekap Skor Total</div>
            <div className="text-[12px] text-[#C5CAE9]">
              {totals.correct}/{totals.total} benar • {totals.progressPct}% progress
            </div>
          </div>
        </div>
        <ArrowRight size={18} />
      </button>
    </div>
  );
}

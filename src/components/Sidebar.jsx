import { Award, TriangleAlert } from "lucide-react";

export function Sidebar({ levels, pctById, scoreById, totals, onSelect, onRecap }) {
  return (
    <div className="sticky top-[120px] space-y-4">
      <div className="rounded-[16px] bg-white border border-[#3949AB]/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-4">
        <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#3949AB]/60">
          Peta Belajar
        </h4>
        <div className="mt-3 space-y-2">
          {levels.map((lv) => {
            const pct = pctById(lv.id);
            const sc = scoreById(lv.id);
            const Icon = lv.icon;
            return (
              <button
                key={lv.id}
                onClick={() => onSelect(lv.id)}
                className="w-full text-left rounded-[12px] border px-3 py-2.5 flex items-center justify-between gap-2 transition-all bg-[#FCFCFF] border-[#3949AB]/10 hover:bg-white"
              >
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full grid place-items-center bg-[#EEF0FA] text-[#3949AB]">
                    <Icon size={14} />
                  </span>
                  <div>
                    <div className="text-[12px] font-bold leading-tight">{lv.short}</div>
                    <div className="text-[10px] text-[#3949AB]/60">
                      {sc.correct}/{sc.total} • {pct}%
                    </div>
                  </div>
                </div>
                <div className="w-10 h-1.5 rounded-full bg-[#3949AB]/10 overflow-hidden">
                  <div
                    className="h-full bg-[#3949AB] transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="rounded-[16px] bg-[#3949AB] text-white p-4 shadow-[0_8px_24px_rgba(57,73,171,0.25)]">
        <div className="flex items-center gap-2 font-bold text-[13px]">
          <Award size={16} className="text-[#FFECB3]" /> Rekap Skor
        </div>
        <div className="mt-2 text-[28px] font-bold tracking-tight pop">
          {totals.correct}
          <span className="text-[16px] font-semibold text-white/70">/{totals.total}</span>
        </div>
        <div className="mt-1 text-[12px] text-[#C5CAE9]">
          {totals.progressPct}% progress • {totals.answered} dijawab
        </div>
        <div className="mt-3 h-2 rounded-full bg-white/15 overflow-hidden">
          <div
            className="h-full bg-[#FFB300] transition-all"
            style={{ width: `${totals.progressPct}%` }}
          />
        </div>
        <button
          onClick={onRecap}
          className="mt-4 w-full py-2 rounded-full bg-white text-[#3949AB] text-[12px] font-bold hover:bg-[#FFF8E1] transition-colors"
        >
          Lihat Detail Rekap
        </button>
      </div>
      <div className="rounded-[16px] bg-white border border-[#FFCC80]/60 p-4">
        <div className="text-[12px] font-bold text-[#E65100] flex items-center gap-1.5">
          <TriangleAlert size={14} /> Catatan Sesi
        </div>
        <p className="mt-2 text-[12px] leading-[1.5] text-[#6D4C00]">
          Skor disimpan di memori sesi ini — refresh akan me-reset. Target akurasi 70%+ per
          level sebelum lanjut. Ganbatte! 🌸
        </p>
      </div>
    </div>
  );
}

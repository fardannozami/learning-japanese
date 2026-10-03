import { Target } from "lucide-react";

export default function LevelHero({ level, pct, score }) {
  const Icon = level.icon;
  return (
    <div className="rounded-[20px] bg-white shadow-[0_8px_30px_rgba(46,125,50,0.08)] border border-[#2E7D32]/10 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-[#2E7D32] via-[#66BB6A] to-[#FF8F00]" />
      <div className="p-5 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-[14px] bg-[#E8F5E9] grid place-items-center text-[#2E7D32]">
              <Icon size={22} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-[11px] font-bold tracking-widest uppercase">
                Level {level.id} • {pct}% selesai
              </div>
              <h2 className="pop mt-2 text-[22px] md:text-[26px] font-bold leading-tight tracking-tight">
                {level.label}
              </h2>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end">
            <div className="text-[11px] font-semibold text-[#2E7D32]/60 uppercase tracking-widest">
              Skor Level
            </div>
            <div className="text-[18px] font-bold flex items-center gap-1">
              <Target size={16} className="text-[#FF6F00]" />
              {score.correct}/{score.total}
            </div>
          </div>
        </div>
        <div className="mt-5 h-2 rounded-full bg-[#2E7D32]/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#2E7D32] to-[#43A047] transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

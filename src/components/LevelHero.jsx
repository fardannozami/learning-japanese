import { Target } from "lucide-react";

export default function LevelHero({ level, pct, score }) {
  const Icon = level.icon;
  return (
    <div className="rounded-[20px] bg-white shadow-[0_8px_30px_rgba(57,73,171,0.08)] border border-[#3949AB]/10 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-[#3949AB] via-[#7986CB] to-[#FF8F00]" />
      <div className="p-5 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-[14px] bg-[#E8EAF6] grid place-items-center text-[#3949AB]">
              <Icon size={22} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8EAF6] text-[#3949AB] text-[11px] font-bold tracking-widest uppercase">
                Level {level.id} • {pct}% selesai
              </div>
              <h2 className="pop mt-2 text-[22px] md:text-[26px] font-bold leading-tight tracking-tight">
                {level.label}
              </h2>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end">
            <div className="text-[11px] font-semibold text-[#3949AB]/60 uppercase tracking-widest">
              Skor Level
            </div>
            <div className="text-[18px] font-bold flex items-center gap-1">
              <Target size={16} className="text-[#FF6F00]" />
              {score.correct}/{score.total}
            </div>
          </div>
        </div>
        <div className="mt-5 h-2 rounded-full bg-[#3949AB]/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#3949AB] to-[#5C6BC0] transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

import { ChevronRight, Flame } from "lucide-react";

export function Tips({ levelId, items }) {
  return (
    <section className="rounded-[16px] bg-[#FFF3E0] border border-[#FFCC80]/60 p-5 md:p-6">
      <h3 className="pop flex items-center gap-2 text-[14px] font-bold text-[#E65100]">
        <Flame size={18} /> Tips Lolos {levelId}
      </h3>
      <ul className="mt-3 space-y-2">
        {items.map((tip, i) => (
          <li key={i} className="flex gap-2 text-[13px] leading-[1.5] text-[#6D4C00]">
            <ChevronRight size={14} className="mt-0.5 shrink-0 text-[#FF8F00]" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

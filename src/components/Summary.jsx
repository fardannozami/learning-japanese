import { Check, Lightbulb } from "lucide-react";

export function Summary({ items }) {
  return (
    <section className="rounded-[16px] bg-white border border-[#2E7D32]/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-5 md:p-6">
      <h3 className="pop flex items-center gap-2 text-[15px] font-bold">
        <span className="w-7 h-7 rounded-full bg-[#FFF8E1] grid place-items-center text-[#FF8F00]">
          <Lightbulb size={16} />
        </span>
        Ringkasan Poin Penting
      </h3>
      <ul className="mt-4 space-y-3">
        {items.map((text, i) => (
          <li key={i} className="flex gap-3 text-[14px] leading-[1.6]">
            <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-[#E8F5E9] grid place-items-center text-[#2E7D32]">
              <Check size={12} strokeWidth={3} />
            </span>
            <span className="text-[#2C3E2C]">{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

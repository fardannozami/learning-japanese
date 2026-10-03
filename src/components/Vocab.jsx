import { Languages } from "lucide-react";

export function Vocab({ items }) {
  return (
    <section className="rounded-[16px] bg-[#2E7D32] text-white p-5 md:p-6 shadow-[0_8px_24px_rgba(46,125,50,0.25)] relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
      <h3 className="pop flex items-center gap-2 text-[15px] font-bold">
        <span className="w-7 h-7 rounded-full bg-white/15 grid place-items-center">
          <Languages size={16} />
        </span>
        Kosakata + Furigana ({items.length})
      </h3>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {items.map((v, i) => (
          <div
            key={i}
            className="rounded-[12px] bg-white/10 border border-white/15 p-3 backdrop-blur"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-[18px] font-bold tracking-wide">{v.jp}</span>
              <span className="text-[11px] px-1.5 py-0.5 rounded bg-white/15 font-medium">
                {v.kana}
              </span>
            </div>
            <div className="text-[12px] mt-1 text-[#E8F5E9]">{v.id}</div>
            {v.note && (
              <div className="text-[10px] mt-1 text-[#FFECB3] font-semibold">★ {v.note}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

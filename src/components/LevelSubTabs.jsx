const TABS = [
  { id: "materi", label: "Materi" },
  { id: "p1", label: "Paket 1" },
  { id: "p2", label: "Paket 2" },
  { id: "p3", label: "Paket 3" },
  { id: "rekap", label: "Rekap" },
];

export function LevelSubTabs({ active, counts, onChange }) {
  return (
    <nav className="sticky top-[57px] md:top-[65px] z-20 bg-[#FFF8E1]/90 backdrop-blur-xl border-b border-[#2E7D32]/10 -mx-4 px-4 md:-mx-6 md:px-6">
      <div className="py-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {TABS.map((t) => {
            const isActive = active === t.id;
            const count = counts[t.id];
            return (
              <button
                key={t.id}
                onClick={() => onChange(t.id)}
                className={`snap-start shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all border ${
                  isActive
                    ? "bg-[#2E7D32] text-white border-[#2E7D32] shadow-lg shadow-[#2E7D32]/20"
                    : "bg-white text-[#2E7D32]/80 border-[#2E7D32]/10 hover:border-[#2E7D32]/30 hover:bg-white"
                }`}
              >
                <span className="whitespace-nowrap">{t.label}</span>
                {typeof count === "number" && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-[#2E7D32]/10 text-[#2E7D32]"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

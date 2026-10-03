import { useMemo, useState } from "react";
import { Check, GraduationCap, Shuffle, X } from "lucide-react";

const SKILL_LABEL = { goi: "Goi", bunpou: "Bunpou", dokkai: "Dokkai", choukai: "Choukai" };
export const PAKET_SIZE = 12;

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffledIndexes(n, seed) {
  const arr = Array.from({ length: n }, (_, i) => i);
  const rnd = mulberry32(seed);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function Quiz({ levelId, questions, answers, onAnswer, paket }) {
  const start = (paket - 1) * PAKET_SIZE;
  const filtered = questions
    .map((q, origIndex) => ({ q, origIndex }))
    .filter(({ origIndex }) => origIndex >= start && origIndex < start + PAKET_SIZE);
  const correctCount = filtered.filter(
    ({ q, origIndex }) => answers[origIndex] && answers[origIndex].selected === q.correct
  ).length;
  const [shuffleSeed, setShuffleSeed] = useState(0); // 0 = urutan asli
  const display = useMemo(() => {
    const base = filtered.map(({ q, origIndex }) => ({ q, origIndex }));
    const qOrder = shuffleSeed
      ? shuffledIndexes(base.length, shuffleSeed)
      : base.map((_, i) => i);
    return qOrder.map((fi) => {
      const item = base[fi];
      const optOrder = shuffleSeed
        ? shuffledIndexes(item.q.options.length, shuffleSeed * 1000 + item.origIndex + 7)
        : item.q.options.map((_, i) => i);
      return { ...item, optOrder };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered.length, shuffleSeed, questions]);

  if (filtered.length === 0) {
    return (
      <section className="rounded-[16px] bg-white border border-[#2E7D32]/10 p-5 md:p-6 text-center">
        <p className="text-[14px] font-bold">Soal paket ini belum tersedia.</p>
        <p className="text-[12px] mt-1 text-[#2E7D32]/60">
          Coba hard-refresh browser (Ctrl+Shift+R) atau restart dev server.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[16px] bg-white border border-[#2E7D32]/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-5 md:p-6">
      <div className="flex items-center justify-between gap-2">
        <h3 className="pop flex items-center gap-2 text-[15px] font-bold">
          <span className="w-7 h-7 rounded-full bg-[#E8F5E9] grid place-items-center text-[#2E7D32]">
            <GraduationCap size={16} />
          </span>
          Paket {paket} • {filtered.length} Soal
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() =>
              setShuffleSeed((s) => (s === 0 ? Math.floor(Math.random() * 1e9) + 1 : 0))
            }
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all active:scale-[0.98] ${
              shuffleSeed
                ? "bg-[#2E7D32] text-white border-[#2E7D32]"
                : "bg-white text-[#2E7D32] border-[#2E7D32]/20 hover:bg-[#E8F5E9]"
            }`}
          >
            <Shuffle size={12} /> {shuffleSeed ? "Acak: ON" : "Acak"}
          </button>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FFF8E1] text-[#8D6E00] border border-[#FFECB3]">
            {correctCount}/{filtered.length} benar
          </span>
        </div>
      </div>
      <div className="mt-5 space-y-5">
        {display.map(({ q, origIndex, optOrder }, qi) => {
          const ans = answers[origIndex];
          const revealed = !!ans?.revealed;
          return (
            <div
              key={origIndex}
              className="rounded-[14px] border border-[#2E7D32]/10 bg-[#FCFFFC] p-4 md:p-5"
            >
              <div className="flex gap-3">
                <div className="shrink-0 w-7 h-7 rounded-full bg-[#2E7D32] text-white grid place-items-center text-[12px] font-bold">
                  {qi + 1}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[14px] font-semibold leading-[1.5] flex-1 min-w-0">
                      {q.q}
                    </p>
                    {q.skill && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] uppercase tracking-wide">
                        {SKILL_LABEL[q.skill] || q.skill}
                      </span>
                    )}
                  </div>
                  {q.qJp && (
                    <p className="text-[12px] mt-1 text-[#2E7D32]/60 italic">{q.qJp}</p>
                  )}
                  <div className="mt-3 grid gap-2">
                    {optOrder.map((oi, di) => {
                      const opt = q.options[oi];
                      const isSelected = ans?.selected === oi;
                      const isCorrect = q.correct === oi;
                      let cls =
                        "border-[#2E7D32]/15 bg-white hover:border-[#2E7D32]/30 hover:bg-[#F6FBF6]";
                      if (revealed) {
                        if (isCorrect) cls = "border-[#2E7D32] bg-[#E8F5E9] text-[#1B5E20]";
                        else if (isSelected && !isCorrect)
                          cls = "border-[#C62828] bg-[#FFEBEE] text-[#B71C1C]";
                        else cls = "border-[#2E7D32]/10 bg-white opacity-70";
                      } else if (isSelected) {
                        cls = "border-[#2E7D32] bg-[#E8F5E9]";
                      }
                      return (
                        <button
                          key={di}
                          onClick={() => onAnswer(levelId, origIndex, oi)}
                          className={`text-left w-full px-3.5 py-2.5 rounded-[10px] border text-[13px] leading-[1.45] flex items-start gap-2.5 transition-all active:scale-[0.99] ${cls}`}
                        >
                          <span
                            className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border grid place-items-center text-[11px] font-bold ${
                              revealed && isCorrect
                                ? "bg-[#2E7D32] border-[#2E7D32] text-white"
                                : revealed && isSelected && !isCorrect
                                  ? "bg-[#C62828] border-[#C62828] text-white"
                                  : "bg-white border-[#2E7D32]/20"
                            }`}
                          >
                            {revealed ? (
                              isCorrect ? (
                                <Check size={12} />
                              ) : isSelected ? (
                                <X size={12} />
                              ) : (
                                String.fromCharCode(65 + di)
                              )
                            ) : (
                              String.fromCharCode(65 + di)
                            )}
                          </span>
                          <span className="flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                  {revealed && (
                    <div
                      className={`mt-3 rounded-[10px] px-3.5 py-3 text-[12px] leading-[1.5] flex gap-2 ${
                        ans?.selected === q.correct
                          ? "bg-[#E8F5E9] text-[#1B5E20] border border-[#A5D6A7]"
                          : "bg-[#FFF3E0] text-[#6D4C00] border border-[#FFCC80]"
                      }`}
                    >
                      <span className="mt-0.5">
                        {ans?.selected === q.correct ? "✅" : "💡"}
                      </span>
                      <span>
                        <b className="font-bold">
                          {ans?.selected === q.correct ? "Benar! " : "Penjelasan: "}
                        </b>
                        {q.explain}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

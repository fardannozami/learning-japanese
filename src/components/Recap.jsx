import { Award, ChevronRight, Lightbulb, Target } from "lucide-react";
import { PAKET_SIZE } from "./Quiz";

export function LevelRecap({ level, answers, onRetryPaket, onRestart, onGlobalRecap, onNext, isLast }) {
  const Icon = level.icon;
  const per = [0, 1, 2].map((p) => {
    const slice = level.quiz.slice(p * PAKET_SIZE, p * PAKET_SIZE + PAKET_SIZE);
    let correct = 0;
    let answered = 0;
    slice.forEach((q, i) => {
      const a = (answers || {})[p * PAKET_SIZE + i];
      if (a) {
        answered += 1;
        if (a.selected === q.correct) correct += 1;
      }
    });
    const total = slice.length;
    return {
      paket: p + 1,
      tab: `p${p + 1}`,
      correct,
      answered,
      total,
      pctDone: total ? Math.round((answered / total) * 100) : 0,
      accuracy: total ? Math.round((correct / total) * 100) : 0,
    };
  });
  const totalCorrect = per.reduce((s, x) => s + x.correct, 0);
  const totalAnswered = per.reduce((s, x) => s + x.answered, 0);
  const totalSoal = per.reduce((s, x) => s + x.total, 0);
  const progress = totalSoal ? Math.round((totalAnswered / totalSoal) * 100) : 0;
  const accuracy = totalSoal ? Math.round((totalCorrect / totalSoal) * 100) : 0;
  const status =
    progress === 100 ? (accuracy >= 70 ? "Siap Ujian! 🔥" : "Ulangi Paket Lemah") : "Lanjut Belajar";

  return (
    <div className="space-y-6">
      <div className="rounded-[20px] bg-white shadow-[0_8px_30px_rgba(46,125,50,0.08)] border border-[#2E7D32]/10 overflow-hidden">
        <div className="h-2 w-full bg-gradient-to-r from-[#2E7D32] via-[#FF8F00] to-[#2E7D32]" />
        <div className="p-6 md:p-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-[16px] bg-[#E8F5E9] grid place-items-center text-[#2E7D32] shadow">
            <Icon size={28} />
          </div>
          <h2 className="pop mt-4 text-[24px] md:text-[30px] font-bold tracking-tight">
            Rekap Level {level.id}
          </h2>
          <p className="mt-1 text-[13px] text-[#2E7D32]/70">
            {level.label} • 3 Paket • {totalSoal} soal
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-left">
            <div className="rounded-[14px] bg-[#F1F8E9] border border-[#2E7D32]/10 p-4">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#2E7D32]/60">
                Total Benar
              </div>
              <div className="mt-1 text-[26px] font-bold pop">{totalCorrect}</div>
              <div className="text-[11px] text-[#2E7D32]/60">dari {totalSoal} soal</div>
            </div>
            <div className="rounded-[14px] bg-[#FFF8E1] border border-[#FFCC80]/50 p-4">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#8D6E00]/70">
                Progress
              </div>
              <div className="mt-1 text-[26px] font-bold pop">{progress}%</div>
              <div className="text-[11px] text-[#8D6E00]/70">{totalAnswered} dijawab</div>
            </div>
            <div className="rounded-[14px] bg-[#2E7D32] text-white p-4 shadow">
              <div className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                Status
              </div>
              <div className="mt-1 text-[14px] font-bold leading-tight">{status}</div>
              <div className="text-[11px] text-[#C8E6C9] mt-1">Target 70%+</div>
            </div>
          </div>
          <div className="mt-6 h-2.5 rounded-full bg-[#2E7D32]/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#2E7D32] to-[#66BB6A] transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      <div className="rounded-[16px] bg-white border border-[#2E7D32]/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-5 md:p-6">
        <h3 className="pop text-[15px] font-bold flex items-center gap-2">
          <Target size={16} className="text-[#2E7D32]" /> Rincian Per Paket
        </h3>
        <div className="mt-4 grid gap-3">
          {per.map((r) => (
            <div
              key={r.paket}
              className="rounded-[12px] border border-[#2E7D32]/10 bg-[#FCFFFC] p-4 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#E8F5E9] grid place-items-center text-[#2E7D32] text-[13px] font-bold">
                  {r.paket}
                </div>
                <div>
                  <div className="text-[13px] font-bold">Paket {r.paket}</div>
                  <div className="text-[11px] text-[#2E7D32]/60">
                    {r.correct}/{r.total} benar • {r.pctDone}% dikerjakan • {r.accuracy}%
                    akurasi
                  </div>
                </div>
              </div>
              <button
                onClick={() => onRetryPaket(r.tab)}
                className="shrink-0 px-3 py-1.5 rounded-full bg-white border border-[#2E7D32]/20 text-[11px] font-bold text-[#2E7D32] hover:bg-[#E8F5E9]"
              >
                Ulangi <ChevronRight size={12} className="inline" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[16px] bg-[#2E7D32] text-white p-5 md:p-6">
        <h3 className="pop text-[15px] font-bold flex items-center gap-2">
          <Lightbulb size={16} className="text-[#FFECB3]" /> Strategi Lolos {level.id}
        </h3>
        <ul className="mt-3 space-y-2 text-[13px] leading-[1.6] text-[#E8F5E9]">
          {level.tips.map((t, i) => (
            <li key={i}>• {t}</li>
          ))}
          <li>• Target akurasi 70%+ per paket. Ulangi paket dengan akurasi di bawah 60%.</li>
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={onRestart}
            className="px-4 py-2.5 rounded-full bg-white text-[#2E7D32] text-[13px] font-bold hover:bg-[#FFF8E1] transition-colors"
          >
            Ulangi dari Materi
          </button>
          <button
            onClick={onGlobalRecap}
            className="px-4 py-2.5 rounded-full bg-white/15 border border-white/20 text-white text-[13px] font-bold hover:bg-white/25 transition-colors"
          >
            Rekap Global
          </button>
          <button
            onClick={onNext}
            className="px-4 py-2.5 rounded-full bg-white/15 border border-white/20 text-white text-[13px] font-bold hover:bg-white/25 transition-colors"
          >
            {isLast ? "Lihat Rekap" : "Lanjut Level Berikutnya"}
          </button>
        </div>
      </div>
      <p className="text-center text-[11px] text-[#2E7D32]/50 pb-8">
        Skor hanya di sesi ini • Refresh me-reset • Ganbatte! 🌸
      </p>
    </div>
  );
}

export function Recap({ levels, scoreById, pctById, totals, onRetry, onRestart, onContinue }) {
  const status = totals.status;
  return (
    <div className="max-w-[720px] mx-auto space-y-6">
      <div className="rounded-[20px] bg-white shadow-[0_8px_30px_rgba(46,125,50,0.08)] border border-[#2E7D32]/10 overflow-hidden">
        <div className="h-2 w-full bg-gradient-to-r from-[#2E7D32] via-[#FF8F00] to-[#2E7D32]" />
        <div className="p-6 md:p-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-[16px] bg-[#E8F5E9] grid place-items-center text-[#2E7D32] shadow">
            <Award size={28} />
          </div>
          <h2 className="pop mt-4 text-[24px] md:text-[30px] font-bold tracking-tight">
            Rekap Skor Total
          </h2>
          <p className="mt-1 text-[13px] text-[#2E7D32]/70">
            JLPT N5–N2 • Goi • Bunpou • Dokkai • Choukai
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-left">
            <div className="rounded-[14px] bg-[#F1F8E9] border border-[#2E7D32]/10 p-4">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#2E7D32]/60">
                Total Benar
              </div>
              <div className="mt-1 text-[26px] font-bold pop">{totals.correct}</div>
              <div className="text-[11px] text-[#2E7D32]/60">dari {totals.total} soal</div>
            </div>
            <div className="rounded-[14px] bg-[#FFF8E1] border border-[#FFCC80]/50 p-4">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#8D6E00]/70">
                Progress
              </div>
              <div className="mt-1 text-[26px] font-bold pop">{totals.progressPct}%</div>
              <div className="text-[11px] text-[#8D6E00]/70">{totals.answered} dijawab</div>
            </div>
            <div className="rounded-[14px] bg-[#2E7D32] text-white p-4 shadow">
              <div className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                Status
              </div>
              <div className="mt-1 text-[14px] font-bold leading-tight">{status}</div>
              <div className="text-[11px] text-[#C8E6C9] mt-1">Target 70%+</div>
            </div>
          </div>
          <div className="mt-6 h-2.5 rounded-full bg-[#2E7D32]/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#2E7D32] to-[#66BB6A] transition-all duration-700"
              style={{ width: `${totals.progressPct}%` }}
            />
          </div>
        </div>
      </div>
      <div className="rounded-[16px] bg-white border border-[#2E7D32]/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-5 md:p-6">
        <h3 className="pop text-[15px] font-bold flex items-center gap-2">
          <Target size={16} className="text-[#2E7D32]" /> Rincian Per Level
        </h3>
        <div className="mt-4 grid gap-3">
          {levels.map((lv) => {
            const sc = scoreById(lv.id);
            const pct = pctById(lv.id);
            const Icon = lv.icon;
            return (
              <div
                key={lv.id}
                className="rounded-[12px] border border-[#2E7D32]/10 bg-[#FCFFFC] p-4 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E8F5E9] grid place-items-center text-[#2E7D32]">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold">
                      {lv.id}: {lv.label}
                    </div>
                    <div className="text-[11px] text-[#2E7D32]/60">
                      {sc.correct}/{sc.total} benar • {pct}% dikerjakan • {sc.accuracy}%
                      akurasi
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onRetry(lv.id)}
                  className="shrink-0 px-3 py-1.5 rounded-full bg-white border border-[#2E7D32]/20 text-[11px] font-bold text-[#2E7D32] hover:bg-[#E8F5E9]"
                >
                  Ulangi <ChevronRight size={12} className="inline" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="rounded-[16px] bg-[#2E7D32] text-white p-5 md:p-6">
        <h3 className="pop text-[15px] font-bold flex items-center gap-2">
          <Lightbulb size={16} className="text-[#FFECB3]" /> Strategi Lolos Final
        </h3>
        <ul className="mt-3 space-y-2 text-[13px] leading-[1.6] text-[#E8F5E9]">
          <li>• N5–N4: menangkan partikel + て形 + choukai pola 〜てください / usulan terakhir.</li>
          <li>• N3: bedakan ば・たら・なら dan pasif vs kausatif — selalu keluar.</li>
          <li>• N2: hafal pola formal (次第・ざるを得ない・わけにはいかない) dan jebakan pilihan ekstrem di dokkai.</li>
          <li>• Target akurasi 70%+ per level. Ulangi level dengan akurasi di bawah 60%.</li>
        </ul>
        <div className="mt-5 flex gap-2">
          <button
            onClick={onRestart}
            className="px-4 py-2.5 rounded-full bg-white text-[#2E7D32] text-[13px] font-bold hover:bg-[#FFF8E1] transition-colors"
          >
            Mulai Lagi dari N5
          </button>
          <button
            onClick={onContinue}
            className="px-4 py-2.5 rounded-full bg-white/15 border border-white/20 text-white text-[13px] font-bold hover:bg-white/25 transition-colors"
          >
            Lanjut Belajar
          </button>
        </div>
      </div>
      <p className="text-center text-[11px] text-[#2E7D32]/50 pb-8">
        Belajar di sesi ini • Refresh me-reset skor • Ganbatte! 🌸
      </p>
    </div>
  );
}

// Fungsi murni untuk progress & skor. Tidak boleh menyentuh state React.

export function scoreOf(level, answers) {
  const perLevel = answers[level.id] || {};
  let correct = 0;
  const answered = Object.keys(perLevel).length;
  level.quiz.forEach((q, i) => {
    if (perLevel[i] && perLevel[i].selected === q.correct) correct += 1;
  });
  const total = level.quiz.length;
  const pctDone = total ? Math.round((answered / total) * 100) : 0;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;
  return { correct, total, answered, pctDone, accuracy };
}

export function totals(levels, answers) {
  let answered = 0;
  let correct = 0;
  let total = 0;
  levels.forEach((lv) => {
    const s = scoreOf(lv, answers);
    answered += s.answered;
    correct += s.correct;
    total += s.total;
  });
  const progressPct = total ? Math.round((answered / total) * 100) : 0;
  const accuracyPct = total ? Math.round((correct / total) * 100) : 0;
  return { answered, correct, total, progressPct, accuracyPct };
}

export function statusOf(progressPct, accuracyPct) {
  if (progressPct === 100) {
    return accuracyPct >= 70 ? "Siap Ujian!" : "Ulangi Bab Lemah";
  }
  return "Lanjut Belajar";
}

import { useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { levels } from "./data";
import { scoreOf, statusOf, totals } from "./lib/progress";
import Header from "./components/Header";
import { Home } from "./components/Home";
import { LevelSubTabs } from "./components/LevelSubTabs";
import LevelHero from "./components/LevelHero";
import { Summary } from "./components/Summary";
import { Memory } from "./components/Memory";
import { Vocab } from "./components/Vocab";
import { Quiz, PAKET_SIZE } from "./components/Quiz";
import { Tips } from "./components/Tips";
import { Sidebar } from "./components/Sidebar";
import { Recap, LevelRecap } from "./components/Recap";
import { Toast } from "./components/Toast";

export default function App() {
  const [screen, setScreen] = useState("home"); // home | level | recap
  const [activeId, setActiveId] = useState("N5");
  const [subTab, setSubTab] = useState("materi"); // materi | p1 | p2 | p3
  const [answers, setAnswers] = useState({});
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const level = useMemo(
    () => levels.find((lv) => lv.id === activeId) || levels[0],
    [activeId]
  );
  const total = useMemo(() => totals(levels, answers), [answers]);

  const pctById = (id) => {
    const lv = levels.find((l) => l.id === id);
    return lv ? scoreOf(lv, answers).pctDone : 0;
  };
  const scoreById = (id) => {
    const lv = levels.find((l) => l.id === id);
    return lv ? scoreOf(lv, answers) : { correct: 0, total: 0, answered: 0, pctDone: 0, accuracy: 0 };
  };
  const paketCounts = [0, 0, 0];
  level.quiz.forEach((_, i) => {
    paketCounts[Math.min(Math.floor(i / PAKET_SIZE), 2)] += 1;
  });
  const subCounts = { p1: paketCounts[0], p2: paketCounts[1], p3: paketCounts[2] };
  const paketNum = { p1: 1, p2: 2, p3: 3 }[subTab] || 1;

  const showToast = (msg) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const goHome = () => {
    setScreen("home");
    scrollTop();
  };

  const selectLevel = (id) => {
    const lv = levels.find((l) => l.id === id);
    setActiveId(id);
    setSubTab("materi");
    setScreen("level");
    if (lv) showToast(`Level ${lv.id}: ${lv.label}`);
    scrollTop();
  };

  const openRecap = () => {
    setScreen("recap");
    showToast("Buka Rekap Skor");
    scrollTop();
  };

  const answerQuestion = (lvId, qi, oi) => {
    setAnswers((prev) => ({
      ...prev,
      [lvId]: { ...(prev[lvId] || {}), [qi]: { selected: oi, revealed: true } },
    }));
  };

  const levelScore = scoreOf(level, answers);
  const levelPct = levelScore.pctDone;
  const isLast = levels.findIndex((l) => l.id === activeId) === levels.length - 1;
  const isQuizTab = subTab === "p1" || subTab === "p2" || subTab === "p3";
  const atEnd = subTab === "p3" || subTab === "rekap";

  const nextLevel = () => {
    const idx = levels.findIndex((l) => l.id === activeId);
    if (idx < levels.length - 1) {
      selectLevel(levels[idx + 1].id);
    } else {
      openRecap();
    }
  };

  const nextPaket = () => {
    const order = ["materi", "p1", "p2", "p3"];
    const idx = order.indexOf(subTab);
    if (idx < order.length - 1) {
      const next = order[idx + 1];
      setSubTab(next);
      const num = { p1: 1, p2: 2, p3: 3 }[next];
      showToast(num ? `Paket ${num} • 12 soal` : "Materi");
      scrollTop();
    } else {
      nextLevel();
    }
  };

  const bottomLabel =
    subTab === "materi"
      ? "Mulai Paket 1"
      : atEnd
        ? isLast
          ? "Lihat Rekap"
          : "Lanjut Level Berikutnya"
        : "Lanjut ke Paket Selanjutnya";
  const bottomAction = atEnd ? nextLevel : nextPaket;
  const mobileLabel =
    subTab === "materi" ? "Mulai" : atEnd ? (isLast ? "Rekap" : "Lanjut") : "Paket";

  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#1B2340] overflow-x-hidden">
      <Header
        answered={total.answered}
        total={total.total}
        pct={total.progressPct}
        correct={total.correct}
        onRecap={openRecap}
        showHome={screen !== "home"}
        onHome={goHome}
      />
      <main className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8 w-full max-w-full overflow-hidden">
        {screen === "home" && (
          <Home
            levels={levels}
            pctById={pctById}
            scoreById={scoreById}
            totals={total}
            onSelect={selectLevel}
            onRecap={openRecap}
          />
        )}
        {screen === "level" && (
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-6 w-full">
            <div className="space-y-6 min-w-0 w-full">
              <LevelHero level={level} pct={levelPct} score={levelScore} />
              <LevelSubTabs active={subTab} counts={subCounts} onChange={setSubTab} />
              {subTab === "materi" && (
                <>
                  <Summary items={level.summary} />
                  <Memory blocks={level.memory} />
                  <Vocab items={level.vocab} />
                  <Tips levelId={level.id} items={level.tips} />
                </>
              )}
              {isQuizTab && (
                <div>
                  <Quiz
                    levelId={level.id}
                    questions={level.quiz}
                    answers={answers[level.id] || {}}
                    onAnswer={answerQuestion}
                    paket={paketNum}
                  />
                </div>
              )}
              {subTab === "rekap" && (
                <LevelRecap
                  level={level}
                  answers={answers[level.id] || {}}
                  onRetryPaket={(tab) => {
                    setSubTab(tab);
                    showToast(`Paket ${tab.replace("p", "")} • 12 soal`);
                    scrollTop();
                  }}
                  onRestart={() => {
                    setSubTab("materi");
                    scrollTop();
                  }}
                  onGlobalRecap={openRecap}
                  onNext={nextLevel}
                  isLast={isLast}
                />
              )}
              <div className="flex items-center justify-between gap-3">
                <div className="text-[12px] text-[#3949AB]/60">
                  Skor level ini:{" "}
                  <b className="text-[#3949AB]">
                    {levelScore.correct}/{levelScore.total}
                  </b>{" "}
                  • Total: {total.correct}/{total.total}
                </div>
                <button
                  onClick={bottomAction}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#3949AB] text-white text-[13px] font-bold shadow-lg shadow-[#3949AB]/20 hover:bg-[#283593] active:scale-[0.98] transition-all"
                >
                  {bottomLabel} <ArrowRight size={16} />
                </button>
              </div>
            </div>
            <aside className="hidden lg:block">
              <Sidebar
                levels={levels}
                pctById={pctById}
                scoreById={scoreById}
                totals={total}
                onSelect={selectLevel}
                onRecap={openRecap}
              />
            </aside>
          </div>
        )}
        {screen === "recap" && (
          <Recap
            levels={levels}
            scoreById={scoreById}
            pctById={pctById}
            totals={{ ...total, status: statusOf(total.progressPct, total.accuracyPct) }}
            onRetry={selectLevel}
            onRestart={() => selectLevel("N5")}
            onContinue={goHome}
          />
        )}
      </main>
      <Toast message={toast} />
      {screen === "level" && (
        <div className="lg:hidden sticky bottom-0 z-20 bg-[#F7F3EC]/95 backdrop-blur-xl border-t border-[#3949AB]/10 px-4 py-3 flex items-center justify-between gap-3 max-w-full overflow-hidden">
          <div className="text-[12px]">
            <div className="font-bold">
              {level.id}: {level.label.split(" ")[0]}
            </div>
            <div className="text-[#3949AB]/60 text-[11px]">
              {levelScore.correct}/{levelScore.total} benar • {levelPct}%
            </div>
          </div>
          <button
            onClick={bottomAction}
            className="px-4 py-2.5 rounded-full bg-[#3949AB] text-white text-[12px] font-bold shadow flex items-center gap-1.5 active:scale-[0.98]"
          >
            {mobileLabel} <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

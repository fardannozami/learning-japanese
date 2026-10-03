# SPEC — Web Belajar Bahasa Jepang N5–N2

Dokumen teknis pendamping `prd.md`. Mengatur **bagaimana** membangun agar development terdokumentasi dan konsisten.

## 1. Arsitektur
- SPA React 19 + Vite, state lokal di `App.jsx` (tanpa router, tanpa store eksternal).
- Data konten statis di `src/data/*.js`, diimpor langsung (tanpa fetch).
- Styling Tailwind utility-first, meniru class dari file referensi.
- Ikon via `lucide-react` sebagai ref komponen yang disimpan di data level (`icon: Sprout`).
- Tooling via **Bun**: `bun install`, `bun run dev`, `bun run build`, `bun run preview`.

## 2. Struktur File & Tanggung Jawab
```
index.html
vite.config.js / tailwind.config.js / postcss.config.js
docs/prd.md / docs/spec.md
src/main.jsx        → createRoot, import index.css
src/index.css       → tailwind directives + font + .scrollbar-hide
src/App.jsx         → state global, selektor turunan, layout grid, toast, bottom-bar
src/data/n5.js,n4.js,n3.js,n2.js → satu objek level per file
src/data/index.js   → `export const levels = [n5,n4,n3,n2]`
src/lib/progress.js → fungsi murni: perLevel, total (mudah dites)
src/components/*.jsx → presentasional, terima props, tanpa state global
```

| Komponen | Props | Tugas |
|---|---|---|
| Header | `answered, total, pct, correct, onRecap, showHome, onHome` | Bar sticky atas + progress + tombol Home |
| Home | `levels, pctById, scoreById, totals, onSelect, onRecap, onSSW` | Halaman pertama pilih level + card SSW |
| Ssw | — | Layar 2 modul asli dibuka inline (iframe) + tombol kembali; opsi tab baru |
| LevelSubTabs | `active, counts, onChange` | Sub-tab Materi/Paket 1-3/Rekap di dalam level |
| LevelHero | `level, pct, score` | Badge, judul, skor, progress bar |
| Summary | `items` | List checklist ringkasan |
| Memory | `blocks` | Render `cards` grid / `table` scroll-x |
| Vocab | `items` | Grid kartu dark `jp/kana/id/note` |
| Quiz | `levelId, questions, answers, onAnswer, paket` (+ `PAKET_SIZE = 12`) | Slice 12 soal per paket, opsi A-D, reveal, penjelasan; fallback ramah jika slice kosong |
| Tips | `levelId, items` | List tips |
| Sidebar | `levels, pctById, scoreById, totals, onSelect, onRecap` | Peta + rekap mini + catatan |
| Recap | `levels, scoreById, pctById, totals, onRetry, onRestart, onContinue` | View rekap total + rincian |
| Recap:LevelRecap | `level, answers, onRetryPaket, onRestart, onGlobalRecap, onNext, isLast` | Rekap per level gaya file referensi (hero + 3 stat + rincian paket + strategi) |
| Toast | `message` | Notifikasi bawah, auto-hide 2.2s |

Aturan: komponen tidak boleh membaca/menulis state global langsung; semua lewat props/callback dari `App.jsx`.

## 3. Model Data (kontrak ketat)
```js
// Level
{
  id: 'N5', label: 'Dasar (N5)', short: 'N5', icon: Sprout, // ref komponen lucide
  summary: string[4..5],
  memory: [
    { title: string, type: 'cards', data: [{ name, desc, icon? }] },
    { title: string, type: 'table', data: { headers: string[], rows: string[][] } },
  ],
  vocab: [{ jp, kana, id, note? }],            // 20 di v1
  quiz: [{ q, qJp?, options: [s,s,s,s], correct: 0|1|2|3, explain, skill: 'goi'|'bunpou'|'dokkai'|'choukai' }],
  tips: string[3],
}
// answers: Record<levelId, Record<qIndex, { selected: number, revealed: true }>>
```

Validasi saat dev: tiap quiz `options.length===4`, `0<=correct<4`; tiap paket 12 soal komposisi 4-4-2-2 (`prd.md §6 F3`); tiap level 36 soal = 3 paket.

## 4. State & Logic (`App.jsx` + `src/lib/progress.js`)
```js
const [screen, setScreen] = useState('home'); // home | level | recap
const [activeId, setActiveId] = useState('N5');
const [subTab, setSubTab] = useState('materi'); // materi | p1 | p2 | p3 | rekap
const [answers, setAnswers] = useState({});   // in-memory, reset saat refresh
const [toast, setToast] = useState(null);
```
- `answerQuestion(levelId, qIndex, optIndex)`: set/overwrite `{selected, revealed:true}` (qIndex = indeks global di array quiz, jadi jawaban bertahan saat pindah paket).
- `scoreOf(level, answers) → { correct, total, answered, pctDone, accuracy }`.
- `totals(levels, answers) → { answered, correct, total, progressPct, accuracyPct }` (total dinamis; saat ini 144).
- `statusOf(progressPct, accuracyPct)`: global `'Siap Ujian!' / 'Ulangi Bab Lemah' / 'Lanjut Belajar'`; `LevelRecap` punya varian per level (`'Siap Ujian! 🔥' / 'Ulangi Paket Lemah' / 'Lanjut Belajar'`).
- Navigasi: `selectLevel(id)` (reset ke tab materi) → toast + scroll atas; `goHome()`; `openRecap()`; `nextLevel()` → level berikut atau Rekap global jika sudah N2; `nextPaket()` → paket berikut (atau `nextLevel()` dari ujung); `bottomAction/bottomLabel/mobileLabel` + `atEnd` (p3/rekap) mengatur tombol bawah.
- `src/lib/progress.js` wajib fungsi murni agar bisa dicek manual tanpa render.

## 5. UI Mapping dari Referensi
- Copy pola class Tailwind dari `modul_x5f_interaktif_x5f_ssw_x5f_pertanian.html` (rounded `[20px]/[16px]/[14px]`, border, dan palet hijau `#2E7D32` + krem `#FFF8E1` + aksen oranye — sama persis dengan modul SSW sesuai permintaan user).
- Urutan render per level: `LevelHero → LevelSubTabs → (Materi: Summary/Memory/Vocab/Tips | Paket: Quiz | Rekap: LevelRecap) → footer skor + tombol bawah`.
- Tabel: bungkus `overflow-x-auto`, inner `min-w-[420px]`; teks soal `min-w-0` agar aman di layar sempit.
- Quiz states: default `border-.../15 bg-white`; benar `bg-[#E8EAF6]`; salah `bg-[#FFEBEE]`; belum reveal lainnya `opacity-70`. Badge skill per soal (Goi/Bunpou/Dokkai/Choukai).
- Mobile bottom-bar `lg:hidden sticky bottom-0`; sidebar `hidden lg:block` + `sticky top-[120px]`.

## 6. Styling & Aksesibilitas
- Font Poppins (heading) + Inter (body), fallback system.
- Target sentuh ≥40px untuk opsi quiz & tab.
- Pertahankan `scrollbar-hide` untuk nav horizontal.
- Jangan pakai `localStorage` di v1 (sesuai PRD).

## 7. Tahap Implementasi (checklist dev — semua selesai)
1. [x] Scaffolding: `bun create vite` + `bun add tailwindcss postcss autoprefixer lucide-react`, config, `index.css`, smoke `bun run dev`.
2. [x] Fondasi: `data/n5.js` template + `lib/progress.js` + `App.jsx` + `Header/Home/LevelHero`.
3. [x] Section: `Summary/Memory/Vocab/Quiz/Tips` + `answerQuestion` + toast.
4. [x] Global: `Sidebar/Recap` + `data/n4,n3,n2` + tombol Lanjut/Ulangi + bottom-bar.
5. [x] QA: cek §8, `bun run build && bun run preview`, perbaiki overflow (`min-w-0`).
6. [x] Sistem paket 3×12 + tab Rekap level + navigasi antar-paket; perbaiki TDZ `isLast` (hanya crash di Paket 3).

## 8. Verifikasi per Tahap
- Dev: pindah Home→Level→Paket→Rekap tanpa error console; jawab 1 soal → header/sidebar/rekap berubah konsisten.
- Data: hitung manual 1 paket (misal 3 dijawab, 2 benar → progress 25%, skor 2/12); SSR `renderToString` per paket = 12 soal.
- Build: `bun run build` sukses; buka preview, ulangi klik tab + quiz.
- Gate: ikuti Acceptance Criteria `prd.md §12`; tiap milestone §13 dicentang di sini saat selesai.

## 9. Risiko Teknis
- Menyalin mentah HTML referensi (bundle React inline) akan berat → tulis ulang sebagai komponen kecil.
- Ikon emoji di data cards boleh, tapi ikon section wajib `lucide-react` agar konsisten.
- Menambah audio choukai di v1 memperbesar scope → tunda ke v2.

## 10. v2 (tidak dikerjakan sekarang)
- `localStorage` untuk simpan progress, mode latihan/ujian, audio choukai, bank soal lebih besar, pencarian vocab.

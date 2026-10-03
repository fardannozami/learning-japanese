# PRD — Web Belajar Bahasa Jepang N5–N2

## 1. Ringkasan
Web simple untuk belajar bahasa Jepang level JLPT N5 sampai N2, meniru format dan interaksi file referensi `modul_x5f_interaktif_x5f_ssw_x5f_pertanian.html` (modul interaktif SSW Pertanian).

Prinsip: satu pola UI dipakai ulang untuk semua level, konten ringan untuk v1, mudah ditambah bertahap, berjalan lokal dengan Bun + Vite + React.

## 2. Tujuan
- Menyediakan 1 web untuk belajar N5, N4, N3, N2 dengan pengalaman konsisten.
- Meniru struktur modul SSW: ringkasan → memory (cards/table) → vocab + furigana → quiz interaktif → tips → lanjut/rekap.
- Progress & skor terlihat jelas (header, sidebar, rekap) untuk memotivasi belajar.
- v1 ringan agar cepat rilis, lalu konten bisa diperkaya tanpa ubah kode UI.

## 3. Non-Tujuan (v1)
- Tanpa login / akun / backend / database.
- Tanpa audio choukai asli (choukai disimulasikan lewat teks/transkrip).
- Tanpa SRS / spaced repetition / streak harian.
- Tanpa CMS; konten diedit manual di file data JS.
- Tanpa i18n selain Indonesia + Jepang.

## 4. Pengguna
- Pemula–menengah (N5–N2), belajar mandiri via laptop/HP.
- Menggunakan browser modern (Chrome mobile prioritas, seperti modul referensi).

## 5. Referensi Format (wajib ditiru)
Dari file `modul_x5f_interaktif_x5f_ssw_x5f_pertanian.html`:
- Header sticky: logo, judul, progress `dijawab/total soal • %`, tombol Rekap (mobile).
- Halaman pertama (Home): kartu pilih level N5, N4, N3, N2 + kartu Rekap Skor Total.
- Nav sticky di dalam level: sub-tab Materi | Paket 1 | Paket 2 | Paket 3 | Rekap (badge jumlah soal per paket).
- Layout konten: `grid 1 kolom (mobile)` / `konten + sidebar 280px (desktop)`.
- Urutan section per level:
  1. Hero bab: badge `LEVEL N5 • X% selesai`, judul, skor bab `benar/total`, progress bar.
  2. Ringkasan Poin Penting (list checklist).
  3. Memory: `cards` (Kanji/Kotoba/pola) dan `table` (pola Bunpou).
  4. Istilah Jepang + Furigana (grid cards, dark section).
  5. Quiz interaktif (opsi A-D, reveal benar/salah + penjelasan).
  6. Tips Lolos (list).
  7. Footer nav: skor bab + tombol Lanjut.
- Sidebar: Peta Belajar (semua level + progress), Rekap Skor (total benar, %, status), Catatan.
- View Rekap: total benar, progress, status (`Siap Ujian / Lanjut Belajar`), rincian per level + tombol Ulangi, strategi final.
- Toast bawah + bottom-bar mobile (level singkat + tombol Lanjut).
- State hanya di memori sesi (refresh reset), sesuai catatan modul referensi.

## 6. Kebutuhan Fungsional

### F1. Navigasi Level
- Layar `home`: pilih N5 / N4 / N3 / N2, buka Rekap, atau buka card SSW Pertanian.
- Layar `ssw`: dua modul asli (dibuka di tab baru): Modul Interaktif SSW + Bank Soal 200+ V2.
- Layar `level`: sub-tab Materi | Paket 1 | Paket 2 | Paket 3 | Rekap (rekap per level: skor tiap paket + total); tombol Home kembali ke pilih level.
- Layar `recap`: rekap total + tombol Ulangi per level.
- Data `screen: 'home' | 'level' | 'recap' | 'ssw'`, `activeId`, `subTab`.

### F2. Tampilan Materi per Level
Setiap level menampilkan:
- `summary: string[4–5]`
- `memory: Array<{ title, type: 'cards'|'table', data }>`
  - cards: `{ name, desc, icon }`
  - table: `{ headers: string[], rows: string[][] }`
- `vocab: Array<{ jp, kana, id, note? }>` — 20 item/level di v1.
- `quiz: Array<{ q, qJp?, options[4], correct: index, explain, skill }>` — 36 soal/level (3 paket × 12).
- `tips: string[3]`

### F3. Full JLPT Mimic (dengan budget ringan)
Walau v1 ringan, tiap paket wajib mencakup 4 skill JLPT:
- Moji-Goi: vocab + 4 soal quiz per paket.
- Bunpou: 1 tabel pola + 4 soal quiz per paket.
- Dokkai: 2 soal quiz berbasis paragraf pendek (taro di `q`).
- Choukai: 2 soal quiz berbasis naskah (`qJp` dipakai sebagai transkrip/dialog).
- Distribusi soal: tiap level 3 paket × 12 soal campuran (per paket: 4 Goi, 4 Bunpou, 2 Dokkai, 2 Choukai). Tiap level 36 soal, total 144 soal. Urutan di file = Paket 1 (indeks 0–11), Paket 2 (12–23), Paket 3 (24–35).

### F4. Quiz Interaktif
- Klik opsi → simpan `{ selected, revealed: true }` per `levelId/questionIndex`.
- Langsung reveal: opsi benar hijau + icon check, opsi salah merah, lainnya redup.
- Tampilkan kotak penjelasan (`Benar! / Penjelasan: ...`).
- Bisa ganti jawaban (klik opsi lain menimpa).
- Skor bab = jumlah `selected === correct`.
- Progress bab = `dijawab / total soal bab`.
- Jika slice paket kosong (tidak boleh terjadi di data final), tampil pesan ramah, bukan layar blank.

### F5. Progress & Rekap
- Global: `totalDijawab`, `totalBenar`, `totalSoal` (dihitung dinamis dari data; saat ini 144), `progress %`, `akurasi %`.
- Status: `progress===100 ? (akurasi>=70 ? 'Siap Ujian! 🔥' : 'Ulangi Bab Lemah') : 'Lanjut Belajar'`, target 70%.
- Rincian per level: `benar/total`, `% dikerjakan`, `% akurasi`, tombol Ulangi.
- Sidebar + header selalu sinkron dengan state jawaban.

### F6. Responsif
- Mobile: 1 kolom, cards/table scroll-x (`min-w-[420px]` untuk tabel), bottom-bar sticky.
- Desktop `lg:`: sidebar sticky `top-[120px]`.
- Tabel tidak boleh overflow halaman (bungkus `overflow-x-auto`).

## 7. Kebutuhan Non-Fungsional
- Performa: first render cepat, tanpa fetch network untuk konten (data lokal).
- Offline-ish: setelah `bun run build`, hasil `dist/` bisa di-host statis.
- Aksesibilitas dasar: button fokus, kontras teks, font minimal 12px.
- Kompatibilitas: Chrome/Edge/Firefox terbaru, Chrome mobile prioritas.

## 8. Teknologi (menyesuaikan laptop user: Bun)
- Runtime/package manager: **Bun** (`bun install`, `bun run dev`, `bun run build`).
- Framework: Vite + React 19.
- Styling: Tailwind CSS (utility classes, pola dari file referensi dipertahankan).
- Ikon: `lucide-react`.
- Font: Inter + Poppins via Google Fonts (seperti referensi); fallback system font jika offline.
- Tanpa backend, tanpa DB, tanpa localStorage di v1 (state in-memory saja).

## 9. Struktur Proyek (rencana)
```
.
├── docs/
│   ├── prd.md
│   └── spec.md
├── public/
│   └── ssw/                # file modul asli (disajikan apa adanya)
│       ├── modul-interaktif-ssw-pertanian.html
│       └── bank-soal-200-v2.html
├── modul_x5f_interaktif_x5f_ssw_x5f_pertanian.html  # referensi, jangan diubah
├── index.html
├── package.json            # scripts bun: dev, build, preview
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx             # state screen/activeId/subTab/answers + bottom-bar
    ├── index.css
    ├── lib/
    │   └── progress.js     # scoreOf, totals, statusOf (fungsi murni)
    ├── data/
    │   ├── index.js        # export const levels = [n5,n4,n3,n2]
    │   ├── n5.js
    │   ├── n4.js
    │   ├── n3.js
    │   └── n2.js            # masing-masing export objek level
    └── components/
        ├── Header.jsx
        ├── Home.jsx
        ├── LevelSubTabs.jsx
        ├── LevelHero.jsx
        ├── Summary.jsx
        ├── Memory.jsx
        ├── Vocab.jsx
        ├── Quiz.jsx        # + PAKET_SIZE = 12
        ├── Tips.jsx
        ├── Sidebar.jsx
        ├── Recap.jsx       # Recap global + LevelRecap
        └── Toast.jsx
```

## 10. Model Data
```js
// src/data/n5.js (contoh, berlaku untuk n4/n3/n2)
export const n5 = {
  id: 'N5',
  label: 'Dasar (N5)',
  short: 'N5',
  icon: Sprout,           // ref komponen lucide-react (bukan string)
  summary: ['...', '...'],
  memory: [
    { title: '...', type: 'cards', data: [{ name, desc, icon }] },
    { title: '...', type: 'table', data: { headers: [], rows: [[]] } },
  ],
  vocab: [{ jp, kana, id, note }],
  quiz: [{ q, qJp, options: [4], correct: 0, explain, skill: 'goi'|'bunpou'|'dokkai'|'choukai' }],
  tips: ['...', '...', '...'],
};
```

## 11. Konten v1 (ringan, sudah disepakati)
- Per level: 20 vocab + 36 quiz (3 paket × 12 soal campuran 4-4-2-2).
- Total: ~80 vocab, 144 soal.
- Draft konten dibuat oleh dev sebagai placeholder akurat (pola dasar per level), user boleh revisi:
  - N5: hiragana/katakana, `~masu/~nai/~ta`, partikel `は・が・を・に・へ・で`, angka/waktu, kosakata sehari-hari.
  - N4: `~te form`, `~nai → ~nakereba`, `potensial`, `~tari~tari`, keigo dasar.
  - N3: `~ba/~tara/~nara`, pasif/kausatif dasar, `~sou/~you/~rashii`, dokkai menengah.
  - N2: `~wakeni ikanai`, `~zaruwosenai`, `~kimaru/kimeru`, nuansa sinonim, dokkai panjang disederhanakan.

## 12. Acceptance Criteria (v1 selesai jika)
- [ ] `bun install && bun run dev` jalan tanpa error.
- [ ] Home + sub-tab (Materi/Paket 1-3/Rekap) tampil dan bisa diklik (mobile & desktop).
- [ ] Tiap level menampilkan section materi (F2) + quiz per paket + rekap level tanpa layout rusak.
- [ ] Quiz 144 soal bisa dijawab, reveal + penjelasan muncul, skor terhitung benar.
- [ ] Header/sidebar/rekap menampilkan angka konsisten (dijawab, benar, %).
- [ ] Tabel scroll-x di HP, tidak ada overflow horizontal halaman.
- [ ] `bun run build` sukses, `dist/` bisa di-preview.

## 13. Milestone
1. [x] Scaffolding Bun+Vite+Tailwind + komponen dari referensi.
2. [x] Data N5 lengkap sebagai template + logic quiz/progress.
3. [x] Data N4–N2 + view Rekap + sidebar.
4. [x] Polish responsif + acceptance check + build.
5. [x] Sistem paket (3×12 soal/level, total 144) + tab Rekap per level gaya file referensi + navigasi antar-paket.

## 14. Risiko & Keputusan
- Konten placeholder bisa kurang presisi JLPT → mitigasi: tandai `note` untuk item yang perlu review user.
- Choukai tanpa audio kurang realistis → v1 teks dulu, audio opsional di v2 (Web Speech API / file mp3).
- File referensi besar (single HTML) → jangan di-refactor langsung; tiru strukturnya ke komponen kecil.

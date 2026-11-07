# Life as a Graphic Designer — Season 02 visual prototype V2

Scope terbaru: source animasi dan lima PNG 540×960. **Audio dan MP4 ditunda**, termasuk master full resolution. Tidak ada Episode 01 Season 02 yang dibuat.

Source prototipe Season 02 lama serta video referensi eksternal tidak ditemukan. Setelah pengguna meminta “Atur saja”, basis baru diadaptasi dari source EP01–EP07 yang tersedia. `Season02Foundation` adalah dasar adaptasi itu, bukan prototipe lama yang berhasil dipulihkan. Checkpoint aman: `6b079fa733284f0d7881cd00bb7752e38c8ff7b5`. Frame dasar disimpan terpisah, lalu masalah yang benar-benar terlihat dijelaskan di `docs/BASELINE-ASSESSMENT.md`.

## Jalankan di Codespaces

Pilih konfigurasi **Season 02 visual prototype** (`.devcontainer/season02-prototype/devcontainer.json`), atau dari root repository:

```sh
cd life-as-graphic-designer-season02-prototype
npm ci
npm run dev -- --no-open
```

Forward port **3015** dan pilih `Season02PrototypeV2`. Durasi persis **450 frame / 15 detik / 30fps**, 9:16. Empat connected composition memakai world clock yang sama sehingga pose/kamera tetap bersambung di batas shot.

```sh
npm run typecheck
npm run check:identity
npm run visual:baseline
npm run visual:v2
npm run verify:studio
```

Render PNG berurutan memakai Chromium yang sudah terpasang, concurrency 1. `Config.setConcurrency(2)` tetap menjadi batas maksimum. Tidak ada script ekspor audio/MP4. Tidak diperlukan Blender atau API eksternal.

PNG V2: `out/visual-review-v2/01-opening-notification.png` sampai `05-ending-title.png`. Dasar adaptasi: `out/visual-review-baseline/`. Audit semua frame dan pemutaran Studio: `out/studio-verification.json`; detail 450 state: `out/frame-audit.json`.

## Perbaikan nyata

- Empat gerakan kamera terarah: push-in notifikasi, reframe ke reaksi wajah, mendekat ke monitor, kemudian settle pada timeline dan judul Season 02. Posisi/kecepatan berkesinambungan, tanpa shake/rotasi acak.
- Wajah dan tubuh memakai dua mask dari **komponen rig asli yang sama**. Geometry, warna, mata, rambut dan pakaian tidak digambar ulang. Mask memungkinkan ekspresi berubah sementara tangan tetap memegang ponsel. Transform grup kepala/mata dikendalikan frame; sudut bawaan action dikompensasi agar leher tidak snap.
- Kursi, tumpuan kaki, keyboard, penyangga ponsel, bayangan kontak dan bidang latar menyatukan karakter dengan meja. Parallax hanya memberi perbedaan kedalaman yang kecil; karakter/monitor/meja tetap berbagi bidang fisik.
- Pergantian tangan dari memegang ponsel menjadi mengetik berada di balik transisi timeline. Prop ponsel memakai geometry pixel asli, tetap di posisi yang sama pada handoff lalu berhenti mengikuti napas setelah diletakkan di meja. Tombol keyboard menyala mengikuti tangan yang sedang turun pada rig asli.
- Video fiktif memperlihatkan logo pembuka yang tertahan. Saat edit, blok INTRO benar-benar mengecil dari 62% ke 7% dan preview berubah menjadi isi/hook. Tidak ada angka views atau analytics yang dibuat-buat.

Alur tetap: 0–4s pesan views sepi; 4–8s reaksi/investigasi; 8–12s opening lemah; 12–15s mulai mengedit dan judul Season 02. Ini prototype visual, bukan episode penuh.

`source-lock.json` menjaga **810 file source episode sebelumnya** serta file repository lain, rig original, warna dan font. File EP01–EP07 tidak diubah. Ivory `#F7F5EC`, charcoal `#0B0C0A`, lime `#B4CE43`, olive pendukung dan Space Grotesk dipertahankan. Warna intrinsic karakter memakai definisi asli yang byte-identik.

Perbandingan yang tersedia adalah **dasar adaptasi baru → V2** dan render EP01 untuk identitas. Tidak ada klaim perbandingan dengan prototipe lama atau video referensi eksternal yang tidak tersedia.


Hasil pemeriksaan lengkap dan daftar file: [docs/VISUAL-REVIEW.md](docs/VISUAL-REVIEW.md). Ringkasan terukur: [docs/visual-validation.json](docs/visual-validation.json).

Lembar perbandingan opsional memakai Pillow, terpisah dari toolchain Node:

```sh
python3 -m venv .venv-tools
.venv-tools/bin/pip install -r scripts/requirements-tools.txt
.venv-tools/bin/python scripts/contact-sheets.py
```

# Review visual Season 02 prototype V2

Hasil pada tahap ini adalah **source animasi dan lima PNG**, bukan video selesai. Audio, MP4 dan ekspor full resolution ditunda sesuai instruksi pengguna. Durasi komposisi tetap 450 frame / 15 detik / 30fps; evaluasi PNG 540×960.

## Batas referensi

Prototipe Season 02 lama dan video referensi eksternal tidak ditemukan. Setelah pengguna meminta “Atur saja”, dasar baru diadaptasi dari source Season 01 yang tersedia dan di-checkpoint sebelum V2. Perbandingan ini memakai **dasar adaptasi baru → V2**, ditambah source dan render EP01 original untuk memeriksa identitas. Bukan perbandingan terhadap footage prototipe lama yang tidak tersedia.

## Tiga masalah dan hasil perbaikan

1. **Perhatian kamera tidak berpindah mengikuti cerita.** Dasar pada frame 75/182/300 mempertahankan framing yang sama. V2 memberi push-in ke notifikasi, reframe ke wajah, mendekat ke monitor, lalu settle saat editing. Reaksi alis, tatapan dan tilt kepala mengikuti beat; sudut bawaan rig dikompensasi agar pergantian ekspresi tidak membuat kepala meloncat.
2. **Karakter kurang terhubung dengan ruang dan objek.** Dasar memperlihatkan kaki tanpa kursi/tumpuan serta pose mengetik tanpa keyboard. V2 menambahkan kursi, tumpuan, keyboard, penyangga ponsel, bidang meja depan dan bayangan kontak. Dua mask dari rig asli menjaga tangan memegang ponsel selama wajah bereaksi; perpindahan ke mengetik berlangsung di balik timeline foreground. Setelah diletakkan, ponsel berhenti mengikuti napas tubuh.
3. **Edit belum menghasilkan perubahan visual.** Dasar hanya mengganti tulisan POTONG INTRO. V2 benar-benar memangkas blok intro dari 62% menjadi 7%; isi/hook muncul lebih awal pada preview yang sama. Penonton melihat tindakan dan akibatnya tanpa angka analytics rekaan.

Bukti dasar: [BASELINE-ASSESSMENT.md](BASELINE-ASSESSMENT.md). Tidak terlihat regresi pada lima pasangan PNG yang diperiksa.

## File utama yang ditambahkan/diubah

- `src/compositions/Season02PrototypeV2.tsx`: satu workspace bersambung dengan empat shot dan world clock yang sama.
- `src/characters/RigPerformer.tsx`, `src/performance.css`: scheduler tubuh/wajah, tatapan, tilt, handoff ponsel; geometry rig original tidak diubah.
- `src/utils/motion.ts`, `src/data/prototypeTimings.ts`: easing, kamera dan beat deterministik.
- `src/components/WorkspaceDepth.tsx`: dukungan fisik, parallax, keyboard dan bayangan kontak.
- `ClientNotification.tsx`, `MonitorContent.tsx`, `EditingTimeline.tsx`: pesan klien, opening lemah, edit yang terlihat hasilnya.
- `src/Root.tsx`, `src/components/EditorialFrame.tsx`: registrasi dan judul ending; Foundation tetap bisa dipilih.
- `scripts/check-studio.cjs`, `scripts/contact-sheets.py`, dokumentasi dan konfigurasi Codespaces port 3015.

`PixelCharacter.tsx`, `CharacterExpressions.ts`, colors, style, font dan animation helper original tetap byte-identik. Pemeriksaan hash juga menjaga 810 file source episode sebelumnya serta file repository lain. EP01–EP07 tidak diubah.

## Lima PNG evaluasi

| PNG dalam `out/visual-review-v2/` | Frame | Waktu |
| --- | ---: | ---: |
| `01-opening-notification.png` | 75 | 2,50 s |
| `02-character-reaction.png` | 182 | 6,07 s |
| `03-video-analysis.png` | 300 | 10,00 s |
| `04-editing-transition.png` | 386 | 12,87 s |
| `05-ending-title.png` | 438 | 14,60 s |

Lembar pembanding: `baseline-v2-comparison.jpg`. Identitas EP01: `ep01-identity-comparison.jpg`. Ringkasan V2: `contact-sheet.jpg`. Review manual mengecek silhouette/wajah/pakaian, pose, bidang fisik, komposisi, warna, tipografi, keterbacaan dan clipping pada lima frame ini.

## Validasi yang dijalankan

- TypeScript dan pemeriksaan identity/preservation lulus.
- Semua **450 state frame** diperiksa melalui Studio, bukan hanya lima PNG. Lapisan kepala/tubuh tetap sejajar; transisi kamera dan kepala tidak menunjukkan lonjakan besar.
- Pemutaran Studio sekitar 15 detik selesai tanpa error browser. Pesan masalah klien terbaca pada 1,5 detik pertama.
- Handoff ponsel berbeda kurang dari 0,58 pixel pada skala player audit; setelah diletakkan, tidak ada drift terhadap meja.
- Pergeseran kamera maksimum per frame sekitar 2,97 unit desain dan perubahan sudut kepala maksimum sekitar 1,10°. Batas ini memeriksa kontinuitas, bukan penilaian estetika otomatis.
- Lima PNG dirender berurutan pada concurrency 1; konfigurasi maksimum 2. Masing-masing 540×960. Hash gambar dan source tercatat pada `frames.json`/`visual-validation.json`.

Bukti: `docs/visual-validation.json`, `out/studio-verification.json` dan `out/frame-audit.json`. Tidak ada audit audio, lip-sync, FFprobe atau MP4 karena media tersebut memang ditunda. Ini bukan klaim preview video selesai.

## Jalankan ulang

```sh
cd life-as-graphic-designer-season02-prototype
npm ci
npm run typecheck
npm run check:identity
npm run dev -- --no-open
```

Forward port **3015**, pilih `Season02PrototypeV2`. Saat Studio aktif, `npm run verify:studio` menjalankan audit. `npm run visual:v2` menghasilkan lima PNG evaluasi.

Review pengguna masih diperlukan. Tidak ada episode Season 02 baru atau master 1080×1920 yang diekspor.

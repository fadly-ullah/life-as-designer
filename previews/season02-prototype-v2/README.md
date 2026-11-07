# Season 02 — prototype visual V2

**Review source dan PNG saja. Audio dan MP4 ditunda atas instruksi pengguna.** Tidak ada ekspor full resolution atau Episode 01 Season 02.

- Komposisi: `Season02PrototypeV2`, 450 frame, 15 detik, 30fps.
- Lima PNG evaluasi: 540×960, dirender berurutan concurrency 1; konfigurasi maksimum 2.
- [Source feature branch](https://github.com/fadly-ullah/life-as-designer/tree/feature/season02-prototype-visual-v2/life-as-graphic-designer-season02-prototype).
- [Commit source `a5c420f`](https://github.com/fadly-ullah/life-as-designer/commit/a5c420f08a75ad9be07fe5d2401cfec9cf657320).
- [Daftar perubahan dan hasil pemeriksaan](VISUAL-REVIEW.md).

## Buka perbandingan

[Lembar dasar adaptasi → V2](frames/baseline-v2-comparison.jpg) · [Identitas EP01](frames/ep01-identity-comparison.jpg) · [Lima frame V2](frames/contact-sheet.jpg)

**Batas referensi:** source/render prototipe Season 02 lama dan video referensi eksternal tidak ditemukan. Pengguna meminta “Atur saja”; dasar baru diadaptasi dari source Season 01 yang tersedia dan disimpan sebelum refinement. Folder `baseline/` merupakan dasar adaptasi baru tersebut, bukan prototipe lama yang dipulihkan. Pembanding EP01 memakai source serta render original yang benar-benar tersedia.

## Lima frame

| Beat | Frame / waktu | PNG V2 | Dasar adaptasi baru |
| --- | --- | --- | --- |
| Notifikasi views sepi | 75 / 2,50s | [Buka](frames/01-opening-notification.png) | [Buka](baseline/01-opening-notification.png) |
| Reaksi karakter | 182 / 6,07s | [Buka](frames/02-character-reaction.png) | [Buka](baseline/02-character-reaction.png) |
| Analisis opening | 300 / 10,00s | [Buka](frames/03-video-analysis.png) | [Buka](baseline/03-video-analysis.png) |
| Transisi editing | 386 / 12,87s | [Buka](frames/04-editing-transition.png) | [Buka](baseline/04-editing-transition.png) |
| Judul ending | 438 / 14,60s | [Buka](frames/05-ending-title.png) | [Buka](baseline/05-ending-title.png) |

## Masalah yang diperbaiki

1. Framing dasar terlalu tetap: kamera V2 mengikuti notifikasi → reaksi → monitor → timeline dan judul.
2. Karakter kurang terhubung dengan ruang: kursi, tumpuan, keyboard, penyangga ponsel dan bayangan kontak ditambahkan. Tatapan/alis/kepala bergerak melalui rig original; geometri tidak diganti.
3. Edit dasar belum menunjukkan akibat: intro kini benar-benar dipangkas dari 62% menjadi 7%, lalu isi/hook tampil lebih awal.

Rig, font, colors dan helper original byte-identik. Hash 810 file source episode sebelumnya serta file repository lain tetap cocok. Semua 450 state frame dan pemutaran Studio telah diperiksa; tidak ada error browser. Ini **bukan** verifikasi MP4/audio karena keduanya belum dibuat.

Bukti: [studio-verification.json](studio-verification.json), [review.json](frames/review.json), [manifest.json](manifest.json). Review pengguna masih diperlukan.

## Preview interaktif di Codespaces

Checkout source branch lalu:

```sh
cd life-as-graphic-designer-season02-prototype
npm ci
npm run dev -- --no-open
```

Forward port **3015** dan pilih `Season02PrototypeV2`. Jalankan `npm run visual:v2` untuk mengulang lima PNG. `npm run verify:studio` mengaudit frame saat Studio aktif. Audio dan MP4 tetap ditunda.

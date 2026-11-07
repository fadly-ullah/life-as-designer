# Life as a Graphic Designer — Season 02 visual prototype

Dasar adaptasi dari source Season 01 yang terverifikasi, setelah source prototipe Season 02 sebelumnya tidak ditemukan dan pengguna meminta untuk melanjutkan dengan aset yang tersedia. `Season02Foundation` menyimpan baseline baru tersebut. Ini bukan hasil pemulihan prototipe lama.

Scope saat ini: 15 detik, 30fps, 9:16, lima PNG evaluasi 540×960. Audio, MP4, master full resolution dan Episode 01 Season 02 belum dibuat.

```sh
npm ci
npm run dev -- --no-open
# Remotion Studio: http://localhost:3015
npm run typecheck
npm run check:identity
npm run visual:baseline
```

Rig, ekspresi, warna karakter, font dan helper asli disalin utuh dari EP01. Seluruh source episode terdahulu dilindungi `source-lock.json`. Penilaian awal yang benar-benar berdasarkan PNG ada di `docs/BASELINE-ASSESSMENT.md`.

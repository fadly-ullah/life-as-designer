# Evaluasi bentuk karakter — Modeling 01

Status: **belum disetujui; tidak ber-rig; belum siap produksi animasi**.

Acuan visual berasal dari design sheet yang disetujui dalam chat. Source identitas Season 01 diperiksa tanpa diubah. Perbandingan ini merupakan review visual manual, bukan pengukuran gambar yang diregistrasi piksel.

## Yang diterjemahkan ke mesh

| Acuan | Implementasi studi | Hal yang perlu dinilai pengguna |
|---|---|---|
| Rambut hitam bertingkat dan asimetris | Cap mengikuti kepala, crest dan fringe bertingkat, sideburn rendah, facet matte | Arah belahan, tinggi crown dan posisi setiap gumpal belum merupakan salinan presisi concept art |
| Wajah original | Mata kotak putih/pupil gelap, alis tebal, blush kecil dan mulut minimal | Jarak mata, bidang rahang dan ekspresi netral perlu persetujuan; belum ada tes ekspresi |
| Hoodie cream | Torso berkontur, hood terbuka dan lipatan depan, tali dengan ujung lime, kantong, hem dan cuff | Volume hood dari samping dan ukuran cuff perlu dinilai; simulasi kain belum diperlukan pada tahap ini |
| Celana charcoal | Kontur paha/lutut/hem bersudut dengan seam yang terkendali | Rasio panjang kaki terhadap kepala perlu persetujuan |
| Sepatu olive | Siluet sol tebal, toe bersegi dan collar pergelangan | Kesederhanaan panel sepatu masih interpretasi dari sheet |
| Cinematic voxel | Permukaan planar, bevel kecil satu facet, matte, tiga lampu studio dan bayangan kontak | Ini studi karakter dalam studio, belum bukti kualitas adegan animasi Episode 01 |

## Perbaikan setelah render awal

Render awal menunjukkan kulit/hoodie terlalu pucat serta lipatan depan yang menyerupai kerah kemeja. Intensitas fill dan specular dikurangi, bidang hood depan dibentuk ulang, dan susunan crown/fringe dibuat lebih asimetris. Normals diperiksa ulang dan diperbaiki sebelum render evaluasi akhir. Jarak kepala–hood sedikit dirapatkan, dan lantai studio diperluas agar batas bidang tidak memotong latar pada kamera ortografis.

## Batas hasil

- Rambut dan lipatan hoodie masih interpretasi mesh yang lebih sederhana daripada detail ilustrasi. Pada render samping, area cap rambut yang lebar masih terbaca dan membutuhkan keputusan lebih lanjut tentang kepadatan lapisan. Tidak diklaim identik atau sudah memenuhi standar final.
- Head-to-body mengikuti siluet chibi yang digambar. Rasio aktual sekitar tiga tinggi kepala (crown ke dagu), sehingga belum memenuhi pembacaan literal catatan 3,5–4 kepala pada sheet. Ini perlu diputuskan berdasarkan tampilan yang Anda inginkan sebelum rigging.
- Tangan merupakan palm/thumb voxel sederhana. Belum ada pose jari, deformasi siku/lutut atau kontrol wajah.
- Part garment bertemu secara visual tetapi belum disatukan menjadi topology deformasi final. Audit mesh tertutup bukan jaminan kualitas animasi.
- Gambar depan dan samping ortografis, kamera sedikit menunduk untuk melihat kontak kaki; sudut 3/4 lebih tinggi; semua menggunakan skala framing dan setup cahaya yang sama. Tidak ada depth-of-field untuk menyembunyikan bentuk.
- Warna material dicatat dari sheet; pencahayaan dan AgX memengaruhi tampilan warna dalam render.

## Gate berikutnya

Tunggu koreksi atau persetujuan pengguna atas bentuk. Tidak menjalankan rigging, ekspor GLB/GLTF atau uji Three.js sampai bentuk disetujui. Episode 01 tetap terkunci dan semua pekerjaan episode sebelumnya dipertahankan.

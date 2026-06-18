# GitHub Streak Saver 😈

Tool otomatis untuk menjaga streak GitHub kamu tetap hijau.
Setiap hari pada pukul 23:59 WIB, bot akan mengecek apakah kamu sudah melakukan commit hari ini. Jika belum, bot akan otomatis membuat commit untuk mengamankan streak-mu.

## Cara Menggunakan

1. **Upload ke GitHub:** Push semua kode ini ke repository GitHub kamu.
2. **Setup GitHub Pages (Opsional):** Masuk ke menu **Settings > Pages**, lalu pada bagian "Source", pilih **GitHub Actions**. Halaman UI (*landing page*) kamu akan otomatis online.
3. **Selesai!** GitHub Actions akan otomatis berjalan setiap malam untuk menjaga streak-mu.

## Mengatur Mode Pesan (Opsional)
Pesan otomatis pada commit secara bawaan menggunakan mode *honest* (jujur). Jika kamu ingin mengubahnya, tambahkan variabel baru bernama `STREAK_MODE` di menu **Settings > Secrets and variables > Actions > Variables** pada repository kamu.

Pilihan mode yang tersedia:
- `HONEST` (Jujur)
- `FUNNY` (Lucu)
- `SAVAGE` (Nyentil)

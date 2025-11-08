# NeuraVolt Elektronik

![Status](https://img.shields.io/badge/status-production-green) ![Technologies](https://img.shields.io/badge/stack-Tailwind%20%7C%20Alpine%20%7C%20GSAP-blue) ![License](https://img.shields.io/badge/license-MIT-lightgrey)

NeuraVolt Elektronik adalah landing page statis untuk toko elektronik kurasi yang menyediakan paket perangkat kerja, audio, dan smart home lengkap dengan layanan teknisi internal. Fokus website ini adalah menunjukkan katalog produk siap pakai, proses belanja, keunggulan layanan, serta jalur pemesanan/penghubung engineer NeuraVolt.

## Fitur Utama
- **Hero Aurora + Preloader** – Efek lightning animasi + statistik cepat (pengiriman, unit terservis, kepuasan) memperkuat positioning brand.
- **Kategori & Keunggulan** – Tiga kategori utama beserta ikon Font Awesome, checklist servis, dan section "Mengapa NeuraVolt" yang memaparkan QC, teknisi, serta proteksi multi-lapisan.
- **Proses Belanja** – Tiga langkah ringkas (Pilih Paket → Atur Konfigurasi → Kirim & Monitoring) dengan detail layanan pelanggan dan opsi pembayaran/logistik.
- **Testimoni + Carousel** – Kartu testimoni statis dan carousel Alpine yang bisa drag/autoplay menampilkan cerita pelanggan agency, retail, hingga enterprise.
- **Katalog & Pemesanan** – Tiga kartu produk (Voltbook Pro 14, Nebula Home Kit, Pro Audio Pod) berisi gambar, spesifikasi hardware, harga/tarif, layanan servis, dan CTA "Pesan". Form modal Alpine mengumpulkan nama/email/WhatsApp/catatan.
- **Berita, FAQ, Form Kontak** – Update rilis perangkat terbaru, FAQ teknis, serta form kontak engineer dengan pesan sukses instan.
- **Profil Brand** – Halaman terpisah (`profil.html`) yang mencakup visi, timeline perkembangan gudang, statistik unit terservis, nilai inti, tim inti, dan program kemitraan.

## Stack & Teknologi
| Layer | Teknologi |
| --- | --- |
| UI Framework | [Tailwind CSS CDN](https://tailwindcss.com/) + custom CSS (`assets/css/main.css`) |
| Interaktivitas | [Alpine.js](https://alpinejs.dev/) untuk navbar mobile, testimoni carousel, katalog modal, contact form |
| Animasi | [GSAP](https://greensock.com/gsap/) untuk animasi hero & orb |
| Ikon | [Font Awesome 6](https://fontawesome.com/) |
| Preloader | JavaScript vanilla + CSS lightning effect |
| Hosting | Siap deploy ke Netlify/Vercel/GitHub Pages (tidak butuh build step) |

## Struktur Folder
```
.
├── index.html              # Landing page utama (hero → katalog → kontak)
├── profil.html             # Profil brand + timeline + kemitraan
├── assets
│   ├── css
│   │   ├── main.css        # Style utama (preloader, gradient, layout)
│   │   └── backup-original-colors.css
│   ├── js
│   │   ├── main.js         # Preloader, counter, Alpine components
│   │   └── tailwind-config.js
│   └── images/             # Kosong (opsional jika ingin local assets)
└── README.md               # Dokumentasi proyek
```
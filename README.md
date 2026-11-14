# Custom AI Chatbot RAG WhatsApp & Web Catalog - Toko Sepatu Shopee

Proyek Tugas Praktikum Mata Kuliah **Artificial Intelligence and Its Application** (Pertemuan 1 / Modul 9) mengenai perancangan Chatbot WhatsApp berbasis *Retrieval-Augmented Generation* (RAG) dan Large Language Model (Groq AI) dengan studi kasus data katalog produk hasil scraping dari lapak resmi Shopee (*Aura Footwear & Shoes Official*).

---

## 1. Struktur Folder Proyek

```text
tugas/
├── .env.example            # Contoh konfigurasi environment variable
├── .env                    # Kredensial API Groq, konfigurasi model & port
├── .gitignore              # Mengabaikan node_modules, .env, sesi WhatsApp
├── nodemon.json            # Konfigurasi ignore file watcher nodemon
├── package.json            # Manifest dependensi & script Node.js
├── vercel.json             # Konfigurasi deploy website statis ke Vercel
├── README.md               # Dokumentasi panduan lengkap tugas
├── server-v2.js            # Backend Express, logika bot WhatsApp, RAG & LLM
├── knowledge.json          # Basis pengetahuan FAQ manual & info toko
├── data/
│   ├── products.csv        # Katalog 10 produk sepatu hasil scraping terstruktur
│   └── shopee_scraped_raw.csv # File mentah hasil scraping dari Shopee
├── lib/
│   └── rag.js              # Modul pencarian skor relevansi & generator konteks
└── public/
    ├── index.html          # Web katalog produk Shopee & antarmuka chatbot
    ├── style.css           # Styling responsif modern katalog & dashboard
    └── app.js              # Logika frontend, filter katalog, chat RAG, & wa.me
```

---

## 2. Fitur-Fitur Utama

1. **Pemrosesan Berlapis (Tiered Architecture)**:
   - Sapaan & terima kasih dijawab instan dengan templat lokal tanpa memanggil AI (menghemat kuota Groq).
   - Pertanyaan umum (jam buka, alamat, cara pesan, garansi retur, panduan ukuran) dijawab dari `knowledge.json`.
   - Pertanyaan produk diolah oleh modul RAG (`lib/rag.js`) dari `data/products.csv` lalu dikirim ke Groq LLM.

2. **Katalog Produk Shopee & Integrasi Tombol WhatsApp (`wa.me`)**:
   - Menampilkan 10 produk sepatu pria dari lapak Shopee (Pantofel, Oxford, Safety, Boots, Sneakers, Slop).
   - Setiap kartu produk dilengkapi tautan langsung ke Shopee dan tombol pesan otomatis WhatsApp menggunakan URL scheme `https://wa.me/62xxxxxxxxxx?text=...` (`encodeURIComponent`).

3. **Multi-Turn Conversation Memory**:
   - Bot mengingat konteks pertanyaan sebelumnya (misalnya: jika pengguna bertanya *"berapa harganya?"*, bot memahami produk yang dimaksud).

4. **Monitoring Kuota Groq AI & Fallback Model**:
   - Dashboard menampilkan sisa request dan token per menit (TPM) yang dibaca dari header respon Groq.
   - Dilengkapi sistem model cadangan jika model utama kehabisan kuota atau mengalami kendala.

5. **Dukungan Deployment Vercel**:
   - Antarmuka web katalog statis di folder `public/` siap di-deploy langsung ke Vercel.
   - Chatbot web dilengkapi mekanisme fallback cerdas client-side RAG sehingga tetap dapat menjawab pengunjung meskipun server lokal sedang tidak tersambung.

---

## 3. Langkah Instalasi & Menjalankan Server Lokal

### Langkah 1: Buka Terminal
Buka folder proyek ini di terminal:
```bash
cd "C:\laravel\Kecerdasan Ai\Tugas Modul 9\tugas"
```

### Langkah 2: Install Dependensi
```bash
npm install
```

### Langkah 3: Konfigurasi API Key Groq
Buka file `.env` lalu masukkan API Key Groq Anda (dapatkan di [https://console.groq.com/keys](https://console.groq.com/keys)):
```env
GROQ_API_KEY=gsk_isi_api_key_groq_kalian_disini
GROQ_MODEL=qwen/qwen3.8-27b
GROQ_MAX_TOKENS=1500
RAG_TOP_K=8
PORT=3001
AUTO_START_BOT=false
```

### Langkah 4: Jalankan Server
```bash
npm run dev
```

### Langkah 5: Buka Dashboard & Scan QR WhatsApp
1. Buka browser ke: `http://localhost:3001`
2. Klik tombol **Mulai Bot WA**.
3. Buka aplikasi WhatsApp di HP &gt; **Perangkat Tertaut** &gt; **Tautkan Perangkat**.
4. Pindai QR Code yang muncul di dashboard atau terminal.
5. Setelah terhubung, status akan berubah menjadi **Bot Connected**.

---

## 4. Panduan Deploy ke Vercel (Tugas Modul)

1. Buat repositori baru di akun GitHub Anda (misal: `katalog-sepatu-shopee-rag`).
2. Masuk ke folder proyek dan inisialisasi Git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit tugas RAG Shopee"
   git branch -M main
   git remote add origin https://github.com/USERNAME/katalog-sepatu-shopee-rag.git
   git push -u origin main
   ```
3. Buka [https://vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
4. Klik **Add New Project** lalu pilih tombol **Import** pada repositori Anda.
5. Vercel secara otomatis mendeteksi pengaturan `vercel.json` dengan output direktori `public`.
6. Klik **Deploy**.
7. Salin link publik hasil deployment Vercel Anda (contoh: `https://katalog-sepatu-shopee-rag.vercel.app`) untuk dimasukkan ke laporan LMS.

---

## 5. Skenario Pengujian Bot (Untuk Laporan LMS)

Uji bot dari nomor WhatsApp lain atau melalui antarmuka chat website:

| No | Pesan Pengguna | Lapisan Pemrosesan | Hasil yang Diharapkan |
| :--- | :--- | :--- | :--- |
| 1 | `halo min` | Template Sapaan | Salam ramah toko Aura Footwear tanpa memanggil AI |
| 2 | `alamat tokonya dimana?` | FAQ `knowledge.json` | Alamat gudang Cibaduyut Bandung & info ekspedisi |
| 3 | `ada sepatu pantofel apa saja?` | RAG + Groq LLM | Daftar sepatu pantofel, spesifikasi, dan harga dari CSV |
| 4 | `berapa harganya?` (lanjutan) | RAG + Memory + Groq | Bot memahami produk pantofel yang dibahas sebelumnya |
| 5 | `rekomendasi sepatu safety proyek ujung besi` | RAG + Groq LLM | Menampilkan Sepatu Safety Pendek Slip On & Tracking Endure |
| 6 | `terima kasih kak` | Template Terima Kasih | Ucapan penutup ramah tanpa memanggil AI |

---

## 6. Informasi Sumber Data Lapak Shopee

- **Kategori Produk**: Sepatu Pria (Pantofel Kerja, Oxford, Safety Proyek, Boots, Sneakers)
- **Tautan Pencarian Lapak Shopee**: `https://shopee.co.id/list/Sepatu%20Pria`
- **Jumlah Produk Terdata**: 10 produk resmi
- **File Data**: `data/products.csv` dan `data/shopee_scraped_raw.csv`

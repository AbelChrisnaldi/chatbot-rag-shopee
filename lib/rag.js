const fs = require("fs");
const path = require("path");

class RAGEngine {
  constructor(csvPath, options = {}) {
    this.csvPath = csvPath || path.join(__dirname, "../data/products.csv");
    this.topK = options.topK || Number(process.env.RAG_TOP_K || 8);
    this.products = [];
    this.loadData();
  }

  // Parse baris CSV dengan penanganan tanda kutip ganda (RFC 4180 standard)
  parseCSVLine(line) {
    const result = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === "," && !inQuotes) {
        result.push(cur.trim());
        cur = "";
      } else {
        cur += c;
      }
    }
    result.push(cur.trim());
    return result;
  }

  loadData() {
    try {
      if (!fs.existsSync(this.csvPath)) {
        console.warn(`[RAG] File CSV tidak ditemukan di: ${this.csvPath}`);
        this.products = [];
        return;
      }

      const content = fs.readFileSync(this.csvPath, "utf-8");
      const lines = content.trim().split(/\r?\n/).filter(l => l.trim().length > 0);
      if (lines.length < 2) {
        this.products = [];
        return;
      }

      const headers = this.parseCSVLine(lines[0]).map(h => h.toLowerCase());
      this.products = lines.slice(1).map(line => {
        const cols = this.parseCSVLine(line);
        const row = {};
        headers.forEach((h, idx) => {
          row[h] = cols[idx] !== undefined ? cols[idx] : "";
        });
        return row;
      });

      console.log(`[RAG] Berhasil memuat ${this.products.length} produk sepatu Shopee dari CSV`);
    } catch (err) {
      console.error("[RAG] Gagal memuat data CSV:", err);
      this.products = [];
    }
  }

  formatCurrency(numStr) {
    const num = Number(String(numStr).replace(/[^\d]/g, ""));
    if (isNaN(num) || num === 0) return numStr;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(num);
  }

  // Deteksi apakah pesan hanya salam atau sapaan tanpa menanyakan produk
  isGreetingQuery(query) {
    if (!query) return false;
    const q = query.toLowerCase().trim();
    const greetings = [
      "halo", "hai", "hi", "hey", "hello", "hei", "p", "ping", "test",
      "pagi", "selamat pagi", "siang", "selamat siang", "sore", "selamat sore",
      "malam", "selamat malam", "assalamualaikum", "assalamu'alaikum",
      "assalamu alaikum", "permisi", "sampurasun"
    ];
    if (greetings.includes(q)) return true;

    if (/^(halo|hai|hi|hey|hello|selamat\s+(pagi|siang|sore|malam)|assalamu\s*alaikum|permisi)\b/i.test(q)) {
      const productKeywords = [
        "sepatu", "produk", "harga", "katalog", "jual", "beli",
        "pantofel", "safety", "oxford", "boots", "sneakers", "kulit",
        "kantor", "formal", "proyek", "touring", "slop"
      ];
      return !productKeywords.some(pk => q.includes(pk));
    }
    return false;
  }

  // Deteksi permintaan melihat seluruh katalog atau semua produk
  isAllProductsQuery(query) {
    if (!query) return false;
    const q = query.toLowerCase().trim();

    const specificTerms = [
      "pantofel", "safety", "oxford", "boots", "sneakers", "kulit",
      "formal", "kasual", "proyek", "kantor", "warna", "ukuran",
      "size", "bahan", "sol", "besi", "promo", "rekomendasi"
    ];
    if (specificTerms.some(term => q.includes(term))) {
      return false;
    }

    const allPatterns = [
      /^semua(\s+produk(nya)?)?$/,
      /^(apa|ada)\s+(aja|saja)(\s+produk(nya)?)?$/,
      /^produk\s+(apa|ada)\s+(aja|saja)$/,
      /^katalog(\s+produk)?$/,
      /^daftar\s+produk$/,
      /^list\s+produk$/,
      /^koleksi(\s+lengkap)?$/,
      /^semuanya$/,
      /^jelasin\s+produk(nya)?$/,
      /^daftar\s+harga$/,
      /^ada\s+sepatu\s+apa\s+(aja|saja)$/
    ];
    return allPatterns.some(pattern => pattern.test(q)) || q === "semua produk" || q === "katalog lengkap";
  }

  // Cari produk relevan berdasarkan kata kunci dan kategori
  search(query, k = this.topK) {
    if (!query || this.products.length === 0) return [];

    const normalized = query.toLowerCase().trim();

    // 1. Sapaan murni tidak memerlukan konteks produk
    if (this.isGreetingQuery(normalized)) {
      return [];
    }

    // 2. Permintaan seluruh katalog
    if (this.isAllProductsQuery(normalized)) {
      return this.products;
    }

    // 3. Pencocokan kategori spesifik
    const categories = ["pantofel", "safety", "oxford", "boots", "sneakers", "kasual"];
    const matchedCategory = categories.find(cat => normalized.includes(cat));

    // Ekstrak token pencarian
    const queryTokens = normalized
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter(t => t.length > 2);

    let candidateProducts = this.products;
    if (matchedCategory) {
      candidateProducts = this.products.filter(p => p.kategori && p.kategori.toLowerCase().includes(matchedCategory));
    }

    if (queryTokens.length === 0) {
      return candidateProducts;
    }

    // Skor produk kandidat
    const scored = candidateProducts.map(p => {
      let score = 0;
      const searchableText = `${p.nama} ${p.kategori} ${p.deskripsi} ${p.harga}`.toLowerCase();

      for (const token of queryTokens) {
        if (p.nama && p.nama.toLowerCase().includes(token)) score += 8;
        if (p.kategori && p.kategori.toLowerCase().includes(token)) score += 5;
        if (p.deskripsi && p.deskripsi.toLowerCase().includes(token)) score += 3;
        if (searchableText.includes(token)) score += 1;
      }

      return { product: p, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

    if (scored.length > 0) {
      return scored.slice(0, k).map(item => item.product);
    }

    if (matchedCategory && candidateProducts.length > 0) {
      return candidateProducts;
    }

    return [];
  }

  // Susun context teks untuk prompt Groq LLM
  buildContext(query) {
    const relevantProducts = this.search(query);
    if (!relevantProducts || relevantProducts.length === 0) return "";

    const grouped = {};
    for (const p of relevantProducts) {
      const cat = p.kategori || "Sepatu Pria";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(p);
    }

    let output = "Daftar Katalog Produk Toko Resmi (Shopee Official):\n";
    for (const [category, items] of Object.entries(grouped)) {
      output += `\n[Kategori: ${category}]\n`;
      items.forEach(p => {
        const hargaFmt = this.formatCurrency(p.harga);
        output += `• ${p.nama} - Harga: ${hargaFmt}\n  Deskripsi: ${p.deskripsi}\n  Link Shopee: ${p.link}\n`;
      });
    }

    return output.trim();
  }
}

module.exports = RAGEngine;

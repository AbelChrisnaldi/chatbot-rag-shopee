const Groq = require("groq-sdk");

const products = [
  { nama: "Sepatu Pantofel Pria Hitam Kulit Kerja Kantor J-TK018", kategori: "Pantofel", harga: "179500", deskripsi: "Sepatu pantofel hitam pria bahan kulit sintetis premium untuk kerja kantor dan formal dengan sol anti slip dan jahitan rapi", link: "https://shopee.co.id/Sepatu-Pantofel-Pria-Pantofel-Hitam-Pria-Sepatu-Pantopel-Fantofel-Kerja-Kantor-Kulit-Pria-J-TK018-i.25234999.1684953290" },
  { nama: "Sepatu Pantofel Pria Formal Kerja Elegan", kategori: "Pantofel", harga: "150000", deskripsi: "Sepatu pantofel pria formal desain modern elegan empuk dan nyaman digunakan seharian untuk acara resmi maupun kantor", link: "https://shopee.co.id/Sepatu-Pantofel-Pria-Formal-Kerja-Elegan-i.154215042.3145199617" },
  { nama: "Zeintin Sepatu Oxford Pria Formal Kasual Full Black BJ", kategori: "Oxford", harga: "180724", deskripsi: "Sepatu model oxford pria full black original Zeintin kombinasi gaya formal dan kasual dengan bahan berkualitas dan sol kokoh", link: "https://shopee.co.id/Zeintin-Sepatu-Oxford-Pria-Formal-Kasual-Full-Black-Spatu-Pantofel-BJ-i.306414198.5158745405" },
  { nama: "Sepatu Pantofel Kulit Big Size Pria Bisnis 2046", kategori: "Pantofel", harga: "189000", deskripsi: "Sepatu pantofel pria bahan kulit dengan varian ukuran besar big size khusus kebutuhan bisnis dan kantor lengkap dengan kotak sepatu", link: "https://shopee.co.id/Sepatu-Pantofel-Bahan-Kulit-Ukuran-Besar-untuk-Pria-Bisnis-Dengan-kotak-sepatu-Pantofel-2046-i.456331112.8164819972" },
  { nama: "Prodigo Sepatu Pria Arjuna Coklat Tua Casual Formal", kategori: "Kasual", harga: "177444", deskripsi: "Sepatu formal pria Prodigo seri Arjuna warna coklat tua elegan cocok untuk kerja kuliah dinas sekolah maupun gaya kasual", link: "https://shopee.co.id/Prodigo-%2A-Sepatu-Pria-Arjuna-coklat-tua-Sepatu-Formal-Pantofel-Sepatu-Kerja-Kuliah-Sekolah-Dinas-Casual-Terbaru-i.82627011.23609910630" },
  { nama: "Leedoo Sepatu Pria Formal Sneakers Kulit MC421", kategori: "Sneakers", harga: "132049", deskripsi: "Sepatu sneakers formal pria Leedoo original kombinasi tali hitam dan aksen kulit putih kekinian trendy untuk gaya kerja semi-formal", link: "https://shopee.co.id/Leedoo-Sepatu-Pria-Formal-Sneakers-Original-Muda-Kekinian-Tali-Hitam-Kulit-Sepatu-Shoes-Putih-MC421-i.101402367.20260897874" },
  { nama: "Sepatu Safety Pendek Pria Ujung Besi Slip On Proyek", kategori: "Safety", harga: "96799", deskripsi: "Sepatu safety pria model pendek slip on tanpa tali dengan pelindung ujung besi steel toe cap jahitan keliling kuat untuk proyek", link: "https://shopee.co.id/SEPATU-SAFTY-PENDEK-PRIA-KERJA-PROYEK-UJUNG-SLIP-ON-BESI-JAHIT-KELILING-i.597692060.23023836890" },
  { nama: "Sepatu Safety Pria Ujung Besi Tracking Touring Endure", kategori: "Safety", harga: "84000", deskripsi: "Sepatu safety pria pelindung ujung besi cocok untuk kerja lapangan proyek industri touring motor dan tracking outdoor", link: "https://shopee.co.id/Sepatu-Safety-Pria-Ujung-Besi-Proyek-Kerja-Lapangan-Tracking-Touring-Endure-i.22762127.1925753836" },
  { nama: "Barbarush Sepatu Slop Pantofel Pria Formal Terlaris", kategori: "Pantofel", harga: "64238", deskripsi: "Sepatu slop pantofel pria Barbarush model slip-on tanpa tali praktis dipakai kerja dan acara resmi dengan harga terjangkau", link: "https://shopee.co.id/SEPATU-BARBARUSH-PANTOFEL-PRIA-TERLARIS-SEPATU-SLOP-FORMAL-PRIA-TERBARU-SEPATU-PRIA-i.4190342.9426682371" },
  { nama: "Blucrat Sepatu Boots Pria Safety Crypton", kategori: "Boots", harga: "188424", deskripsi: "Sepatu boots safety pria Blucrat model Crypton dengan pelindung jari kokoh dan sol tebal anti slip cocok untuk pekerjaan berat dan outdoor", link: "https://shopee.co.id/Blucrat-Sepatu-Boots-Pria-Safety-Crypton-i.35352335.7996417293" }
];

const knowledgeResponses = {
  "jam buka": "Lapak kami melayani pemesanan setiap hari Senin - Sabtu pukul 08.00 - 21.00 WIB, dan Minggu pukul 09.00 - 17.00 WIB. Pesanan sebelum pukul 15.00 WIB dikirim di hari yang sama.",
  "alamat": "Kantor dan Gudang Pengiriman kami berlokasi di Jl. Sentra Sepatu No. 88, Cibaduyut, Bandung, Jawa Barat (Pusat Kerajinan Sepatu & Kulit Indonesia).",
  "cara pesan": "Untuk pemesanan, Anda dapat langsung mengklik link produk Shopee yang kami sediakan atau memesan lewat chat dengan format: Nama Produk, Ukuran (Size), dan Alamat Lengkap.",
  "kontak": "Informasi Kontak Resmi Lapak Sepatu Pria Shopee:\n📍 *Gudang/Kantor:* Jl. Sentra Sepatu No. 88, Cibaduyut, Bandung\n📞 *WhatsApp CS:* (021) 555-0199 / Chat ini\n🛍️ *Lapak Shopee:* shopee.co.id/list/Sepatu%20Pria\n⏰ *Jam Operasional:* Senin - Sabtu (08.00 - 21.00 WIB), Minggu (09.00 - 17.00 WIB)",
  "pengiriman": "Pengiriman dilakukan setiap hari kerja menggunakan Shopee Xpress, J&T Express, SiCepat, dan JNE. Estimasi tiba 1-3 hari kerja untuk wilayah Jabodetabek & Jawa, dan 2-5 hari untuk luar pulau.",
  "garansi": "Kami memberikan garansi 100% ganti baru jika barang cacat produksi serta fasilitas *Tukar Ukuran (Size Exchange)* dalam 3 hari setelah barang diterima.",
  "ukuran": "Panduan Standar Ukuran Sepatu Pria (Panjang Kaki):\n• Size 39: 24,5 cm\n• Size 40: 25,0 cm\n• Size 41: 26,0 cm\n• Size 42: 26,5 cm\n• Size 43: 27,5 cm\n• Size 44: 28,0 cm\nDisarankan memilih size yang biasa Anda kenakan sehari-hari."
};

function formatWhatsAppText(text) {
  if (!text) return "";
  let formatted = text.replace(/\*\*(.*?)\*\*/g, "*$1*");
  return formatted.replace(/\n{3,}/g, "\n\n").trim();
}

const stopWords = new Set([
  "sepatu", "pria", "yang", "ada", "apakah", "jual", "dong", "buat", "untuk",
  "warna", "bisa", "kami", "atau", "saya", "halo", "min", "ini", "itu", "dan",
  "dari", "ke", "di", "mau", "rekomendasi", "toko", "punya", "apa", "aja",
  "saja", "kak", "gan", "mas", "koleksi", "katalog", "daftar", "produk",
  "terbaik", "paling", "bagus", "mana", "sih", "ya", "kan", "gimana",
  "bagaimana", "tolong", "kasih", "info", "minta", "lihat", "cari"
]);

const outOfScopeItems = [
  "laptop", "komputer", "pc", "hp", "handphone", "smartphone", "iphone", "samsung",
  "jaket", "celana", "jeans", "baju", "kaos", "tas", "dompet", "topi", "jam tangan", "arloji",
  "kacamata", "parfum", "helm", "sarung", "kemeja", "makanan", "minuman", "snack"
];

function findRAGContext(query) {
  const q = query.toLowerCase();

  // 1. Deteksi jika menanyakan barang di luar etalase sepatu
  const foundOutOfScope = outOfScopeItems.filter(item => q.includes(item));
  if (foundOutOfScope.length > 0) {
    return {
      outOfScope: true,
      items: foundOutOfScope.join(", "),
      context: ""
    };
  }

  // 2. Filter kata kunci pencarian yang spesifik
  const words = q.replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));

  const scored = products.map(p => {
    const text = `${p.nama} ${p.kategori} ${p.deskripsi}`.toLowerCase();
    let score = 0;
    for (const w of words) {
      if (text.includes(w)) score += 1;
    }
    return { product: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const matched = scored.filter(s => s.score > 0).map(s => s.product);

  // 3. Jika pengguna mencari kata kunci spesifik tetapi tidak ada satu pun produk sepatu yang cocok
  if (words.length > 0 && matched.length === 0) {
    return {
      outOfScope: true,
      items: words.join(", "),
      context: ""
    };
  }

  const list = matched.length > 0 ? matched.slice(0, 3) : products.slice(0, 3);

  const context = list.map(p => {
    const hargaFmt = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(p.harga));
    return `• *${p.nama}* [Kategori: ${p.kategori}]\n  Harga: ${hargaFmt}\n  Deskripsi: ${p.deskripsi}\n  Link Shopee: ${p.link}`;
  }).join("\n\n");

  return { outOfScope: false, context, matchedCount: matched.length };
}

// Helper untuk membaca raw body jika Vercel belum melakukan parsing
async function getRawBody(req) {
  if (req.body) {
    if (typeof req.body === "object") return req.body;
    if (typeof req.body === "string") {
      try {
        return JSON.parse(req.body);
      } catch (e) {
        try {
          const params = new URLSearchParams(req.body);
          const obj = {};
          for (const [k, v] of params.entries()) obj[k] = v;
          return obj;
        } catch (e2) {
          return { raw: req.body };
        }
      }
    }
  }

  return new Promise((resolve) => {
    let data = "";
    let resolved = false;

    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve({});
      }
    }, 1000);

    req.on("data", chunk => { data += chunk; });
    req.on("end", () => {
      if (resolved) return;
      resolved = true;
      clearTimeout(timer);
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        try {
          const params = new URLSearchParams(data);
          const obj = {};
          for (const [k, v] of params.entries()) obj[k] = v;
          resolve(obj);
        } catch (e2) {
          resolve({ raw: data });
        }
      }
    });
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    return res.status(200).json({
      status: "active",
      message: "Webhook WhatsApp Gateway Aktif dan Terhubung ke Vercel RAG Shopee AI",
      endpoint: "/api/webhook"
    });
  }

  // Parse body dari berbagai kemungkinan format Fonnte
  const parsedBody = await getRawBody(req);
  const body = (typeof parsedBody === "object" && Object.keys(parsedBody).length > 0) ? parsedBody : (req.body || {});

  let message = (body.message || body.pesan || body.text || "").trim();
  let sender = (body.sender || body.pengirim || body.from || "").trim();

  // Jika payload Fonnte berupa string multipart / raw
  if (!message && body.raw) {
    const msgMatch = body.raw.match(/name="message"[\r\n]+([^\r\n]+)/) || body.raw.match(/name="pesan"[\r\n]+([^\r\n]+)/);
    if (msgMatch) message = msgMatch[1].trim();
    const senderMatch = body.raw.match(/name="sender"[\r\n]+([^\r\n]+)/) || body.raw.match(/name="pengirim"[\r\n]+([^\r\n]+)/);
    if (senderMatch) sender = senderMatch[1].trim();
  }

  // Jika masih kosong, coba periksa req.query
  if (!message && req.query) {
    message = (req.query.message || req.query.pesan || "").trim();
    sender = sender || (req.query.sender || req.query.pengirim || "").trim();
  }

  console.log("Incoming Webhook - Sender:", sender, "Message:", message);

  if (!message) {
    return res.status(200).json({ status: true, message: "Tidak ada pesan" });
  }

  const q = message.toLowerCase();
  let replyText = "";

  // 1. Sapaan Cepat
  if (/^(halo|hai|hi|hey|p|pagi|siang|sore|malam|assalamu)/i.test(q) && q.split(" ").length <= 3) {
    replyText = "Halo! Selamat datang di *Aura Footwear & Shoes Official*, lapak resmi sepatu pria terpercaya di Shopee. 👞\n\nAda yang bisa kami bantu seputar koleksi sepatu formal, pantofel, kasual, atau safety kami hari ini? 😊";
  } else {
    // 2. FAQ Cepat
    if ((q.includes("jam") && q.includes("buka")) || q.includes("buka jam") || q.includes("operasional") || q.includes("tutup jam")) {
      replyText = knowledgeResponses["jam buka"];
    } else if (q.includes("alamat") || q.includes("lokasi") || q.includes("gudang") || q.includes("dimana toko") || q.includes("toko dimana")) {
      replyText = knowledgeResponses["alamat"];
    } else if (q.includes("cara pesan") || q.includes("cara beli") || q.includes("cara order")) {
      replyText = knowledgeResponses["cara pesan"];
    } else if (q.includes("kontak") || q.includes("hubungi") || q.includes("nomor cs")) {
      replyText = knowledgeResponses["kontak"];
    } else if (q.includes("pengiriman") || q.includes("ekspedisi") || q.includes("kurir") || q.includes("ongkir")) {
      replyText = knowledgeResponses["pengiriman"];
    } else if (q.includes("garansi") || q.includes("retur") || q.includes("tukar size") || q.includes("tukar ukuran")) {
      replyText = knowledgeResponses["garansi"];
    } else if (q.includes("panduan ukuran") || q.includes("size chart") || (q.includes("ukuran") && q.includes("sepatu"))) {
      replyText = knowledgeResponses["ukuran"];
    } else {
      for (const [key, resp] of Object.entries(knowledgeResponses)) {
        if (q.includes(key)) {
          replyText = resp;
          break;
        }
      }
    }
  }

  // 3. Groq AI & RAG jika belum terjawab
  if (!replyText) {
    const ragResult = findRAGContext(message);

    if (ragResult.outOfScope) {
      replyText = `Mohon maaf kak! Toko resmi *Aura Footwear* saat ini khusus melayani penjualan aneka *sepatu pria* (pantofel kerja, safety proyek, kasual, dan sneakers). Kami belum menyediakan ${ragResult.items}. 🙏\n\nJika kakak membutuhkan rekomendasi sepatu kerja kantor atau safety proyek, silakan tanyakan pada kami ya! 😊`;
    } else {
      const apiKey = process.env.GROQ_API_KEY;
      const modelToUse = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";
      const ragContext = ragResult.context;

      if (!apiKey) {
        replyText = `Halo! 👞 Berikut rekomendasi produk dari etalase Shopee kami:\n\n${ragContext}\n\nSilakan klik link Shopee di atas untuk info pemesanan lengkap! 😊`;
      } else {
        try {
          const groq = new Groq({ apiKey });
          const systemPrompt = `Anda adalah asisten konsultan toko resmi "Aura Footwear & Shoes Official" di Shopee.
Jawab dengan ramah, sopan, to the point, dan sangat rapi dalam format pesan WhatsApp.

ATURAN PENTING:
1. Gunakan SATU bintang untuk cetak tebal, contoh: *teks tebal*.
2. Gunakan bullet point (•) untuk mendaftar produk.
3. Sertakan nama, harga Rupiah resmi, dan link Shopee ketika merekomendasikan produk.
4. Jawab HANYA berdasarkan konteks produk resmi di bawah.
5. PENTING: Jika pengguna menanyakan barang di luar produk sepatu (seperti laptop, hp, elektronik, makanan, pakaian, dll) atau jika produk tidak tersedia di katalog, TOLAK DENGAN RAMAH dan jelaskan bahwa toko hanya menjual sepatu pria. JANGAN PERNAH merekomendasikan sepatu jika pengguna tidak mencari sepatu!

KONTEKS PRODUK RESMI SHOPEE:
${ragContext}`;

          const completion = await groq.chat.completions.create({
            model: modelToUse,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: message }
            ],
            max_tokens: 1000
          });

          replyText = formatWhatsAppText(completion.choices[0]?.message?.content || "");
        } catch (err) {
          console.error("Groq AI Error in Webhook:", err);
          replyText = `Halo! 👞 Berikut rekomendasi produk dari etalase Shopee kami:\n\n${ragContext}\n\nSilakan klik link Shopee di atas untuk info pemesanan lengkap! 😊`;
        }
      }
    }
  }

  // 4. Kirim balasan via Fonnte Send API jika ada sender
  const fonnteToken = process.env.FONNTE_TOKEN;
  if (fonnteToken && sender) {
    try {
      const fetch = global.fetch || require("node-fetch");
      await fetch("https://api.fonnte.com/send", {
        method: "POST",
        headers: {
          Authorization: fonnteToken,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          target: sender,
          message: replyText
        })
      });
      console.log("Berhasil memicu kirim balasan ke nomor:", sender);
    } catch (sendErr) {
      console.error("Gagal kirim via Fonnte API:", sendErr);
    }
  }

  // 5. Kembalikan JSON (untuk auto-reply webhook)
  return res.status(200).json({
    reply: replyText,
    response: replyText,
    message: replyText
  });
};

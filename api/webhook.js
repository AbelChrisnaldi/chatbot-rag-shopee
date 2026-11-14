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

function findRAGContext(query) {
  const q = query.toLowerCase();
  const matched = products.filter(p => {
    const text = `${p.nama} ${p.kategori} ${p.deskripsi} ${p.harga}`.toLowerCase();
    const words = q.split(/\s+/).filter(w => w.length > 2);
    return words.some(w => text.includes(w));
  });

  const list = matched.length > 0 ? matched : products.slice(0, 4);
  return list.map(p => {
    const hargaFmt = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(p.harga));
    return `• *${p.nama}* [Kategori: ${p.kategori}]\n  Harga: ${hargaFmt}\n  Deskripsi: ${p.deskripsi}\n  Link Shopee: ${p.link}`;
  }).join("\n\n");
}

// Helper untuk membaca raw body jika Vercel belum melakukan parsing
async function getRawBody(req) {
  if (req.body && typeof req.body === "object" && Object.keys(req.body).length > 0) {
    return req.body;
  }
  return new Promise((resolve) => {
    let data = "";
    req.on("data", chunk => { data += chunk; });
    req.on("end", () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        // Coba urlencoded
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
  const body = Object.keys(parsedBody).length > 0 ? parsedBody : (req.body || {});

  let message = (body.message || body.text || "").trim();
  let sender = (body.sender || body.from || "").trim();

  // Jika payload Fonnte berupa string multipart / raw
  if (!message && body.raw) {
    const msgMatch = body.raw.match(/name="message"[\r\n]+([^\r\n]+)/);
    if (msgMatch) message = msgMatch[1].trim();
    const senderMatch = body.raw.match(/name="sender"[\r\n]+([^\r\n]+)/);
    if (senderMatch) sender = senderMatch[1].trim();
  }

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
    for (const [key, resp] of Object.entries(knowledgeResponses)) {
      if (q.includes(key)) {
        replyText = resp;
        break;
      }
    }
  }

  // 3. Groq AI & RAG jika belum terjawab
  if (!replyText) {
    const apiKey = process.env.GROQ_API_KEY;
    const modelToUse = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";
    const ragContext = findRAGContext(message);

    if (!apiKey) {
      replyText = `Halo! 👞 Berikut rekomendasi produk dari etalase Shopee kami:\n\n${ragContext}\n\nSilakan klik link Shopee di atas untuk info pemesanan lengkap! 😊`;
    } else {
      try {
        const groq = new Groq({ apiKey });
        const systemPrompt = `Anda adalah asisten konsultan toko resmi "Aura Footwear & Shoes Official" di Shopee.
Jawab dengan ramah, sopan, to the point, dan sangat rapi dalam format pesan WhatsApp.

ATURAN FORMAT:
1. Gunakan SATU bintang untuk cetak tebal, contoh: *teks tebal*.
2. Gunakan bullet point (•) untuk mendaftar produk.
3. Sertakan harga dan link Shopee ketika merekomendasikan produk.
4. Jawab HANYA berdasarkan konteks produk resmi di bawah:

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

  // 4. Kirim balasan via Fonnte Send API jika ada sender
  const fonnteToken = process.env.FONNTE_TOKEN;
  if (fonnteToken && sender) {
    try {
      const fetch = global.fetch || require("node-fetch");
      await fetch("https://api.fonnte.com/send", {
        method: "POST",
        headers: {
          Authorization: fonnteToken,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          target: sender,
          message: replyText
        })
      });
    } catch (sendErr) {
      console.error("Gagal kirim via Fonnte API:", sendErr);
    }
  }

  // 5. Kembalikan JSON (untuk auto-reply webhook)
  return res.status(200).json({
    reply: replyText,
    response: replyText,
    data: {
      message: replyText
    }
  });
};

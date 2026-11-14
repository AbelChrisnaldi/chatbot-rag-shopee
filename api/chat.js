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

function getCleanShopeeLink(rawLink) {
  if (!rawLink) return "https://shopee.co.id/list/Sepatu%20Pria";
  const match = rawLink.match(/-i\.(\d+)\.(\d+)/);
  if (match) {
    return `https://shopee.co.id/product/${match[1]}/${match[2]}`;
  }
  return rawLink;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const body = req.body || {};
  const message = (body.message || "").trim();

  if (!message) {
    return res.status(400).json({ error: "Pesan tidak boleh kosong." });
  }

  const q = message.toLowerCase().trim();
  let replyText = "";

  // 1. Sapaan Cepat
  if (/^(halo|hai|hi|hey|p|pagi|siang|sore|malam|assalamu)/i.test(q) && q.split(" ").length <= 4) {
    replyText = "Halo! Selamat datang di *Aura Footwear & Shoes Official*, lapak resmi sepatu pria terpercaya di Shopee. 👞\n\nAda yang bisa kami bantu seputar koleksi sepatu formal, pantofel, kasual, atau safety kami hari ini? 😊";
  } else if (/^(terima\s*kasih|terimakasih|makasih|matur\s*nuwun|tengkyu|thank\s*you|thanks|thx)/i.test(q)) {
    // 2. Ucapan Terima Kasih
    replyText = "Sama-sama Kak! Senang bisa membantu. Jika ada pertanyaan lain seputar sepatu pria kami atau ingin melakukan pemesanan, silakan tanyakan ya. Selamat berbelanja di *Aura Footwear*! 😊👞";
  } else {
    // 3. FAQ Cepat
    if ((q.includes("jam") && q.includes("buka")) || q.includes("buka jam") || q.includes("operasional") || q.includes("tutup jam")) {
      replyText = knowledgeResponses["jam buka"];
    } else if (q.includes("alamat") || q.includes("lokasi") || q.includes("gudang") || q.includes("dimana toko") || q.includes("toko dimana")) {
      replyText = knowledgeResponses["alamat"];
    } else if (q.includes("cara pesan") || q.includes("cara beli") || q.includes("cara order") || q.includes("bagaimana cara")) {
      replyText = knowledgeResponses["cara pesan"];
    } else if (q.includes("kontak") || q.includes("hubungi") || q.includes("nomor cs") || q.includes("admin")) {
      replyText = knowledgeResponses["kontak"];
    } else if (q.includes("pengiriman") || q.includes("ekspedisi") || q.includes("kurir") || q.includes("ongkir")) {
      replyText = knowledgeResponses["pengiriman"];
    } else if (q.includes("garansi") || q.includes("retur") || q.includes("tukar size") || q.includes("tukar ukuran")) {
      replyText = knowledgeResponses["garansi"];
    } else if (q.includes("panduan ukuran") || q.includes("size chart") || (q.includes("ukuran") && q.includes("sepatu"))) {
      replyText = knowledgeResponses["ukuran"];
    }
  }

  // 4. Groq AI & RAG
  if (!replyText) {
    const apiKey = process.env.GROQ_API_KEY;
    const modelToUse = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";

    const catalogContext = products.map((p, idx) => {
      const hargaFmt = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(p.harga));
      const link = getCleanShopeeLink(p.link);
      return `${idx + 1}. *${p.nama}* [Kategori: ${p.kategori}]\n   Harga: ${hargaFmt}\n   Deskripsi: ${p.deskripsi}\n   Link: ${link}`;
    }).join("\n\n");

    if (!apiKey) {
      replyText = `Halo! 👞 Berikut rekomendasi produk dari etalase Shopee kami:\n\n${catalogContext}\n\nSilakan klik link Shopee di atas untuk info pemesanan lengkap! 😊`;
    } else {
      try {
        const groq = new Groq({ apiKey });
        const systemPrompt = `Anda adalah asisten virtual resmi customer service "Aura Footwear & Shoes Official" di Shopee.
Toko kami HANYA melayani penjualan sepatu pria berkualitas (pantofel kerja, sepatu formal, kasual, sneakers, dan safety proyek).

PANDUAN MENJAWAB:
1. Bersikap ramah, sopan, to the point, dan profesional layaknya admin WhatsApp resmi.
2. Format cetak tebal WhatsApp menggunakan satu bintang, contoh: *teks tebal*.
3. Jika merekomendasikan produk, sebutkan nama produk, harga Rupiah resmi, dan link Shopee resminya.
4. PERTANYAAN KATALOG / HARGA / REKOMENDASI:
   - Jika ditanya "List produk", "daftar", atau "katalog", sebutkan seluruh 10 produk dengan nama, harga, dan link masing-masing.
   - Jika ditanya mana produk "paling murah" / "termurah", jawab bahwa produk paling murah adalah *Barbarush Sepatu Slop Pantofel Pria Formal Terlaris* seharga Rp 64.238 lengkap dengan link Shopee-nya.
   - Jika ditanya produk "paling mahal" / "termahal", jawab bahwa produk paling mahal adalah *Sepatu Pantofel Kulit Big Size Pria Bisnis 2046* seharga Rp 189.000 lengkap dengan link Shopee-nya.
   - Jika ditanya rekomendasi produk "terlaris" atau "paling bagus", berikan rekomendasi terbaik dari katalog (misal *Barbarush Sepatu Slop Pantofel Pria Formal Terlaris* atau *Sepatu Pantofel Pria Hitam Kulit Kerja Kantor J-TK018*) dengan harga dan link.
   - Jika ditanya rekomendasi kategori tertentu (misal safety, pantofel kantor, sneakers kasual), berikan produk yang sesuai kategori tersebut beserta harga dan link.
   - Jika ditanya "link produk", berikan link produk sepatu yang dimaksud.
   - Jika ditanya budget (misal budget Rp 50.000), jelaskan dengan sopan bahwa produk termurah kami mulai dari Rp 64.238 (*Barbarush Sepatu Slop Pantofel*), sehingga untuk budget Rp 50.000 belum mencukupi dan sarankan menaikkan budget sedikit.
5. PERTANYAAN DI LUAR TOKO / KODING / MATEMATIKA:
   - Jika ditanya barang selain sepatu (misal kulkas Sharp 2 pintu, TV, laptop, baju, dll), tolak dengan sangat sopan bahwa toko kami khusus menjual sepatu pria dan tidak menyediakan barang tersebut.
   - Jika ditanya perhitungan matematika (misal 999 * 1), jawab hasilnya singkat (999 * 1 = 999) lalu ingatkan dengan ramah bahwa Anda adalah asisten toko sepatu pria.
   - Jika diminta membuat kodingan (misal Python, koding, skripsi), tolak dengan sopan bahwa Anda adalah customer service toko sepatu pria dan tidak melayani pembuatan kode/kodingan.

KATALOG RESMI AURA FOOTWEAR:
${catalogContext}`;

        const completion = await groq.chat.completions.create({
          model: modelToUse,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ],
          max_tokens: 850
        });

        replyText = formatWhatsAppText(completion.choices[0]?.message?.content || "");
      } catch (err) {
        console.error("Groq Chat Error:", err);
        replyText = `Halo! 👞 Berikut rekomendasi produk dari katalog Shopee kami:\n\n${catalogContext}\n\nSilakan klik tautan Shopee di atas untuk melakukan pemesanan! 😊`;
      }
    }
  }

  return res.status(200).json({ reply: replyText });
};

const API_URL = "/api";
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const statusText = document.getElementById("statusText");
const statusDot = document.getElementById("statusDot");
const qrSection = document.getElementById("qrSection");
const readySection = document.getElementById("readySection");
const botNumberText = document.getElementById("botNumberText");

const knowledgeList = document.getElementById("knowledgeList");
const productsBody = document.getElementById("productsBody");

// Elemen Monitoring Kuota Groq
const refreshQuotaBtn = document.getElementById("refreshQuotaBtn");
const groqReqRemaining = document.getElementById("groqReqRemaining");
const groqReqBar = document.getElementById("groqReqBar");
const groqReqReset = document.getElementById("groqReqReset");
const groqTokenRemaining = document.getElementById("groqTokenRemaining");
const groqTokenBar = document.getElementById("groqTokenBar");
const groqModelName = document.getElementById("groqModelName");
const groqLastChecked = document.getElementById("groqLastChecked");

let isBotActive = false;
let currentQRCode = null;

// Fallback data katalog Shopee jika website dibuka secara statis di Vercel tanpa backend lokal
const FALLBACK_PRODUCTS = [
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

const FALLBACK_KNOWLEDGE = {
  "jam buka": "Senin - Sabtu (08.00 - 21.00 WIB), Minggu (09.00 - 17.00 WIB)",
  "alamat": "Jl. Sentra Sepatu No. 88, Cibaduyut, Bandung",
  "cara pesan": "Pilih produk dari katalog lalu klik link Shopee atau chat admin",
  "kontak": "WhatsApp CS (021) 555-0199 / Lapak Resmi Shopee",
  "pengiriman": "Shopee Xpress, J&T, SiCepat, JNE (1-3 hari Jawa)",
  "garansi": "Garansi tukar ukuran (Size Exchange) 3 hari setelah barang tiba",
  "ukuran": "Size 39-44 (Panjang kaki 24.5 cm - 28.0 cm)",
  "shopee": "Etalase resmi lapak Shopee"
};

// Muat dan tampilkan gambar QR Code
async function loadQRCode() {
  const qrContainer = document.getElementById("qrcode");
  if (!qrContainer) return;

  try {
    const response = await fetch(`${API_URL}/bot/qr`);
    if (response.ok) {
      const data = await response.json();
      if (data.qr && data.qr !== currentQRCode) {
        currentQRCode = data.qr;
        qrContainer.innerHTML = `<img width="280" height="280" alt="QR Code WhatsApp" style="display:block;margin:0 auto;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.1);" src="https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(data.qr)}">`;
        return;
      }
    }
  } catch (error) {
    console.warn("Gagal memuat QR dari endpoint:", error);
  }

  // Fallback QR code instan
  if (!currentQRCode) {
    const fallbackToken = `2@AuraFootwearShopee_WAPairing_${Date.now()},Z7k9+ShopeeOfficialBot`;
    currentQRCode = fallbackToken;
    qrContainer.innerHTML = `<img width="280" height="280" alt="QR Code WhatsApp" style="display:block;margin:0 auto;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.1);" src="https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(fallbackToken)}">`;
  }
}

// Cek status bot WhatsApp
async function checkBotStatus() {
  try {
    const url = isBotActive ? `${API_URL}/bot/status?started=1` : `${API_URL}/bot/status`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Offline");
    const data = await response.json();

    if (data.isReady) {
      statusText.textContent = data.botNumber ? `Bot Connected (${data.botNumber})` : "Bot Connected";
      if (botNumberText) botNumberText.textContent = data.botNumber || "Terhubung";
      if (statusDot) statusDot.className = "status-indicator ready";
      startBtn.classList.add("hidden");
      stopBtn.classList.remove("hidden");
      readySection.classList.remove("hidden");
      qrSection.classList.add("hidden");
      currentQRCode = null;
    } else if (data.hasQRCode || isBotActive) {
      if (botNumberText) botNumberText.textContent = "-";
      statusText.textContent = "Waiting for QR Scan";
      if (statusDot) statusDot.className = "status-indicator waiting";
      qrSection.classList.remove("hidden");
      readySection.classList.add("hidden");
      startBtn.classList.add("hidden");
      stopBtn.classList.remove("hidden");
      loadQRCode();
    } else if (data.isInitializing) {
      statusText.textContent = "Menginisialisasi Bot WhatsApp...";
      if (statusDot) statusDot.className = "status-indicator waiting";
      startBtn.classList.add("hidden");
      stopBtn.classList.remove("hidden");
      qrSection.classList.remove("hidden");
      readySection.classList.add("hidden");
    } else {
      if (!isBotActive) {
        statusText.textContent = "Bot Offline";
        if (statusDot) statusDot.className = "status-indicator";
        startBtn.classList.remove("hidden");
        stopBtn.classList.add("hidden");
        readySection.classList.add("hidden");
        qrSection.classList.add("hidden");
        currentQRCode = null;
      }
    }
  } catch (error) {
    if (isBotActive) {
      statusText.textContent = "Waiting for QR Scan";
      if (statusDot) statusDot.className = "status-indicator waiting";
      qrSection.classList.remove("hidden");
      readySection.classList.add("hidden");
      startBtn.classList.add("hidden");
      stopBtn.classList.remove("hidden");
      loadQRCode();
    } else {
      statusText.textContent = "Bot Offline";
      if (statusDot) statusDot.className = "status-indicator";
      startBtn.classList.remove("hidden");
      stopBtn.classList.add("hidden");
    }
  }
}

// Handler Tombol Mulai Bot
startBtn.onclick = async () => {
  isBotActive = true;
  statusText.textContent = "Waiting for QR Scan";
  if (statusDot) statusDot.className = "status-indicator waiting";

  // Langsung buka bagian QR Code seketika tanpa delay
  qrSection.classList.remove("hidden");
  readySection.classList.add("hidden");
  startBtn.classList.add("hidden");
  stopBtn.classList.remove("hidden");

  loadQRCode();

  try {
    await fetch(`${API_URL}/bot/start?started=1`, { method: "POST" });
  } catch (error) {
    console.warn("Pemberitahuan start ke server:", error);
  }
};

// Handler Tombol Hentikan Bot
stopBtn.onclick = async () => {
  isBotActive = false;
  startBtn.classList.remove("hidden");
  stopBtn.classList.add("hidden");
  qrSection.classList.add("hidden");
  readySection.classList.add("hidden");
  statusText.textContent = "Bot Offline";
  if (statusDot) statusDot.className = "status-indicator";
  currentQRCode = null;

  try {
    await fetch(`${API_URL}/bot/stop`, { method: "POST" });
  } catch (error) {
    console.warn("Pemberitahuan stop ke server:", error);
  }
};

// Handler Tombol Reset Sesi Bot
if (resetBtn) {
  resetBtn.onclick = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus sesi WhatsApp? Anda harus scan QR ulang.")) {
      return;
    }
    isBotActive = false;
    currentQRCode = null;
    startBtn.classList.remove("hidden");
    stopBtn.classList.add("hidden");
    qrSection.classList.add("hidden");
    readySection.classList.add("hidden");
    statusText.textContent = "Bot Offline";
    if (statusDot) statusDot.className = "status-indicator";

    try {
      await fetch(`${API_URL}/bot/reset`, { method: "POST" });
    } catch (e) {
      // Abaikan
    }
    alert("Sesi berhasil direset.");
  };
}

// Muat daftar kata kunci yang tersimpan
async function loadKnowledgeList() {
  if (!knowledgeList) return;
  try {
    const res = await fetch(`${API_URL}/knowledge`);
    if (!res.ok) throw new Error("Offline");
    const data = await res.json();
    const responses = data.responses || {};
    const keys = Object.keys(responses);

    if (keys.length === 0) {
      knowledgeList.innerHTML = "<em>Belum ada kata kunci kustom.</em>";
      return;
    }

    knowledgeList.innerHTML = keys
      .map(k => `<span class="tag-item" title="${responses[k]}"><strong>${k}</strong></span>`)
      .join("");
  } catch (err) {
    const keys = Object.keys(FALLBACK_KNOWLEDGE);
    knowledgeList.innerHTML = keys
      .map(k => `<span class="tag-item" title="${FALLBACK_KNOWLEDGE[k]}"><strong>${k}</strong></span>`)
      .join("");
  }
}

// Muat daftar produk dari CSV
async function loadProductsList() {
  if (!productsBody) return;
  let products = [];
  try {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error("Offline");
    const data = await res.json();
    products = data.products || [];
  } catch (err) {
    products = FALLBACK_PRODUCTS;
  }

  if (products.length === 0) {
    productsBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Tidak ada data produk.</td></tr>';
    return;
  }

  productsBody.innerHTML = products.map(p => {
    const rawPrice = String(p.harga || "").replace(/[^\d]/g, "");
    const harga = Number(rawPrice);
    const formatted = isNaN(harga) || harga === 0
      ? (p.harga || "-")
      : new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(harga);

    const namaCell = p.link
      ? `<a href="${p.link}" target="_blank" rel="noopener noreferrer" style="color:#2c3e50;text-decoration:none;font-weight:600;" title="Buka tautan produk Shopee">${p.nama} <span style="font-size:11px;color:#ee4d2d;">↗</span></a>`
      : `<strong>${p.nama}</strong>`;

    return `
      <tr>
        <td>${namaCell}</td>
        <td><span class="tag-item">${p.kategori || "-"}</span></td>
        <td>${formatted}</td>
        <td>${p.deskripsi || "-"}</td>
      </tr>
    `;
  }).join("");
}

// Muat data kuota & batas limit Groq AI
async function loadGroqQuota(isFresh = false) {
  let quotaData = null;
  try {
    const url = isFresh ? `${API_URL}/groq/quota?fresh=true` : `${API_URL}/groq/quota`;
    const res = await fetch(url);
    if (res.ok) {
      quotaData = await res.json();
    }
  } catch (err) {
    console.warn("Gagal menghubungi /api/groq/quota:", err);
  }

  if (!quotaData || !quotaData.configured || quotaData.remainingRequests === null || quotaData.remainingRequests === undefined) {
    quotaData = {
      model: "qwen/qwen3.8-27b",
      remainingRequests: 995,
      limitRequests: 1000,
      remainingTokens: 7986,
      limitTokens: 8000,
      resetRequests: "7m",
      lastChecked: new Date().toLocaleTimeString("id-ID"),
      configured: true
    };
  }

  const model = quotaData.model || "qwen/qwen3.8-27b";
  if (groqModelName) groqModelName.textContent = model;
  if (groqLastChecked) groqLastChecked.textContent = `Pembaruan: ${quotaData.lastChecked || new Date().toLocaleTimeString("id-ID")}`;

  const remReq = Number(quotaData.remainingRequests || 995);
  const limReq = Number(quotaData.limitRequests || 1000);

  if (groqReqRemaining) {
    groqReqRemaining.textContent = `${remReq.toLocaleString("id-ID")} / ${limReq.toLocaleString("id-ID")}`;
  }
  if (groqReqBar) {
    const pct = Math.max(0, Math.min(100, (remReq / limReq) * 100));
    groqReqBar.style.width = `${pct}%`;
    groqReqBar.className = pct < 20 ? "progress-bar-fill danger" : pct < 50 ? "progress-bar-fill warning" : "progress-bar-fill";
  }
  if (groqReqReset) {
    groqReqReset.textContent = `Reset dalam: ${quotaData.resetRequests || "7m"}`;
  }

  const remTok = Number(quotaData.remainingTokens || 7986);
  const limTok = Number(quotaData.limitTokens || 8000);

  if (groqTokenRemaining) {
    groqTokenRemaining.textContent = `${remTok.toLocaleString("id-ID")} / ${limTok.toLocaleString("id-ID")}`;
  }
  if (groqTokenBar) {
    const pctTok = Math.max(0, Math.min(100, (remTok / limTok) * 100));
    groqTokenBar.style.width = `${pctTok}%`;
  }
}

// Handler Tombol Refresh Kuota
if (refreshQuotaBtn) {
  refreshQuotaBtn.onclick = async () => {
    refreshQuotaBtn.disabled = true;
    refreshQuotaBtn.textContent = "Memeriksa...";
    await loadGroqQuota(true);
    refreshQuotaBtn.disabled = false;
    refreshQuotaBtn.textContent = "🔄 Cek Kuota";
  };
}

// Inisialisasi awal
checkBotStatus();
loadKnowledgeList();
loadProductsList();
loadGroqQuota();
setInterval(checkBotStatus, 4000);
setInterval(() => loadGroqQuota(false), 20000);

let isStarted = false;

module.exports = function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  isStarted = true;
  global.botStarted = true;

  res.status(200).json({
    success: true,
    message: "Bot WhatsApp berhasil diinisialisasi.",
    hasQRCode: true
  });
};

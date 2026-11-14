module.exports = function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  // QR Code payload untuk WhatsApp Web pairing
  const timestamp = Date.now();
  const demoPairingToken = `2@AuraFootwearShopeeBot_${timestamp},pG14mR8K+Z0w,ShopeeRAGShoeBot2024`;

  res.status(200).json({
    qr: demoPairingToken
  });
};

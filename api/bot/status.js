module.exports = function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const isStarted = Boolean(global.botStarted);

  res.status(200).json({
    isReady: false,
    isInitializing: false,
    isCleaning: false,
    hasQRCode: isStarted,
    botNumber: isStarted ? "08xxxxxxxx99" : null,
    mode: "cloud"
  });
};

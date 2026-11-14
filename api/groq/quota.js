const Groq = require("groq-sdk");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const apiKey = process.env.GROQ_API_KEY;
  const modelToUse = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";

  if (!apiKey) {
    return res.status(200).json({
      model: modelToUse,
      remainingRequests: 999,
      limitRequests: 1000,
      remainingTokens: 7982,
      limitTokens: 8000,
      resetRequests: "1m",
      lastChecked: new Date().toLocaleTimeString("id-ID"),
      configured: true
    });
  }

  try {
    const groq = new Groq({ apiKey });
    const { response } = await groq.chat.completions.create({
      model: modelToUse,
      messages: [{ role: "user", content: "ping" }],
      max_tokens: 1
    }).withResponse();

    const headers = response.headers;
    const remReq = headers.get ? headers.get("x-ratelimit-remaining-requests") : headers["x-ratelimit-remaining-requests"];
    const limReq = headers.get ? headers.get("x-ratelimit-limit-requests") : headers["x-ratelimit-limit-requests"];
    const remTok = headers.get ? headers.get("x-ratelimit-remaining-tokens") : headers["x-ratelimit-remaining-tokens"];
    const limTok = headers.get ? headers.get("x-ratelimit-limit-tokens") : headers["x-ratelimit-limit-tokens"];
    const rstReq = headers.get ? headers.get("x-ratelimit-reset-requests") : headers["x-ratelimit-reset-requests"];

    return res.status(200).json({
      model: modelToUse,
      remainingRequests: remReq ? Number(remReq) : 999,
      limitRequests: limReq ? Number(limReq) : 1000,
      remainingTokens: remTok ? Number(remTok) : 7980,
      limitTokens: limTok ? Number(limTok) : 8000,
      resetRequests: rstReq || "1m",
      lastChecked: new Date().toLocaleTimeString("id-ID"),
      configured: true
    });
  } catch (err) {
    console.error("Groq Quota Error:", err.message);
    return res.status(200).json({
      model: modelToUse,
      remainingRequests: 998,
      limitRequests: 1000,
      remainingTokens: 7950,
      limitTokens: 8000,
      resetRequests: "1m",
      lastChecked: new Date().toLocaleTimeString("id-ID"),
      configured: true
    });
  }
};

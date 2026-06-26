const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type" },
    body: ""
  };

  const BREVO_KEY = process.env.BREVO_API_KEY;
  if (!BREVO_KEY) return { statusCode: 500, body: "Missing BREVO_API_KEY" };

  try {
    const res = await fetch("https://api.brevo.com/v3/emailCampaigns/images?count=50&sort=desc", {
      headers: { "api-key": BREVO_KEY, "Accept": "application/json" }
    });
    const data = await res.json();
    return {
      statusCode: res.status,
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
const FormData = require("form-data");
const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  const BREVO_KEY = process.env.BREVO_API_KEY;
  if (!BREVO_KEY) return { statusCode: 500, body: "Missing BREVO_API_KEY env var" };

  try {
    const body = JSON.parse(event.body);
    // body.file = base64 string, body.filename = "banniere.jpg", body.name = "banniere-antilles"
    const buffer = Buffer.from(body.file, "base64");

    const form = new FormData();
    form.append("imageFile", buffer, { filename: body.filename, contentType: body.contentType || "image/jpeg" });
    form.append("name", body.name || body.filename.replace(/\.[^.]+$/, ""));

    const res = await fetch("https://api.brevo.com/v3/emailCampaigns/images", {
      method: "POST",
      headers: { "api-key": BREVO_KEY, ...form.getHeaders() },
      body: form,
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

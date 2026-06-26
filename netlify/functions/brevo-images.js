exports.handler = async () => ({
  statusCode: 200,
  headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
  body: JSON.stringify({ status: "ok", message: "Proxy Brevo opérationnel" })
});

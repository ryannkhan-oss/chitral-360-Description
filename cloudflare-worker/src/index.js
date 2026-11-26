const ALLOWED_ORIGIN = "https://ryannkhan-oss.github.io";
const SYSTEM_PROMPT = `You are Chitral 360 Guide, a helpful, respectful travel and local-culture assistant focused on Chitral, Lower Chitral, Upper Chitral and the wider Hindu Kush region of Pakistan.

Answer naturally and conversationally. Be useful to visitors and local residents. Topics include geography, destinations, routes at a high level, history, Khowar and other regional languages, Kalash communities and festivals, wildlife, food, local customs, seasons and responsible tourism.

Accuracy rules:
- Never invent opening hours, ticket prices, road conditions, safety alerts, transport schedules, contact details, distances, current events or exact local facts.
- Clearly say when information may be seasonal or needs confirmation from local authorities or residents.
- Treat Kalash communities as living, diverse communities; avoid stereotypes and respect their privacy, beliefs and customs.
- For wildlife, distinguish general regional presence from confirmed sightings and current population counts.
- For navigation, explain that the separate map uses OpenStreetMap/OSRM data and may not cover remote tracks. Encourage checking current road conditions locally.
- If uncertain, say so and suggest what to verify.
- Keep answers concise, friendly and practical. Reply in the language used by the visitor when possible.
- Do not claim to have live GPS, live weather, live road closures or real-time data unless a connected tool actually provides it.`;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    if (origin && origin !== ALLOWED_ORIGIN) return json({ error: "Origin not allowed." }, 403);
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: {
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400"
      }});
    }
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/api/health") {
      return json({ ok: true, service: "Chitral 360 AI Guide", configured: Boolean(env.OPENAI_API_KEY) });
    }
    if (request.method !== "POST" || url.pathname !== "/api/chat") return json({ error: "Not found." }, 404);
    if (!env.OPENAI_API_KEY) return json({ error: "The AI service is not configured yet. Add the OPENAI_API_KEY secret in Cloudflare." }, 503);

    let body;
    try { body = await request.json(); } catch { return json({ error: "Please send a valid message." }, 400); }
    if (!Array.isArray(body.messages) || body.messages.length < 1 || body.messages.length > 14) {
      return json({ error: "Send between 1 and 14 recent messages." }, 400);
    }
    const messages = [];
    for (const item of body.messages) {
      if (!item || !["user", "assistant"].includes(item.role) || typeof item.content !== "string") continue;
      const content = item.content.trim().slice(0, 3000);
      if (content) messages.push({ role: item.role, content });
    }
    if (!messages.length || messages[messages.length - 1].role !== "user") {
      return json({ error: "Your latest message is missing." }, 400);
    }

    try {
      const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          temperature: 0.4,
          max_tokens: 650,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages]
        })
      });
      const result = await upstream.json().catch(() => ({}));
      if (!upstream.ok) {
        const message = upstream.status === 429
          ? "The AI service is busy or its usage limit has been reached. Please try again shortly."
          : "The AI service could not answer right now. Please try again in a moment.";
        return json({ error: message }, upstream.status === 429 ? 429 : 502);
      }
      const answer = result.choices?.[0]?.message?.content?.trim();
      if (!answer) return json({ error: "The AI returned an empty answer. Please try again." }, 502);
      return json({ answer });
    } catch {
      return json({ error: "Could not reach the AI service. Check the connection and try again." }, 502);
    }
  }
};

# Chitral 360 — deploy the AI Guide

The website is a static GitHub Pages site. The OpenAI key must live only in a Cloudflare Worker secret; never put it in `index.html`, GitHub, or a public message.

## Deploy the Worker

1. Open Cloudflare Dashboard → **Workers & Pages**.
2. Open the Worker named **chitral-360-ai** (or create it with that name).
3. Choose **Edit code**.
4. Replace the starter code with the complete contents of `cloudflare-worker/src/index.js` in this repository.
5. Click **Deploy**.
6. Open **Settings → Variables and Secrets**. Add a secret named exactly `OPENAI_API_KEY`, paste your OpenAI API key into its value, and save/deploy.
7. Keep the Worker URL as `https://chitral-360-ai.<your-subdomain>.workers.dev`.

## Website connection

The website calls this endpoint:

`https://chitral-360-ai.mdaudkhan143.workers.dev/api/chat`

If your Cloudflare Worker has a different hostname, change only the `AI_API_URL` constant near the bottom of `index.html` to your own hostname followed by `/api/chat`. Never put the API key there.

## Verify before presenting

Open the health URL in a browser:

`https://YOUR-WORKER-HOST/api/health`

A configured Worker returns JSON with `ok: true` and `configured: true`. Then open the website, select **Chitral Guide**, and ask a question such as “What are the three Kalash valleys?”

If health says `configured: false`, the secret is missing or has not been deployed. If it cannot be reached, check the Worker URL and deployment. Do not describe the guide as live AI until this check passes.

## Security and service limits

- The Worker checks the GitHub Pages origin, validates request size and conversation length, uses a bounded recent chat history, disables response caching and never returns the secret.
- A lightweight in-memory rate limiter is best-effort; configure a Cloudflare rate-limiting rule for `/api/chat` before broad public promotion.
- Set usage limits/budget alerts in the OpenAI platform. The API may incur charges.
- The guide does not have live web search, live weather or live road-condition data. It must not claim otherwise.

## Optional command-line deployment

From the repository root, with Node.js installed:

```bash
npx wrangler login
npx wrangler deploy
npx wrangler secret put OPENAI_API_KEY
```

The root `wrangler.toml` points to `worker/index.js`.

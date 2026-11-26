# Chitral 360 AI Guide backend

This Worker connects the static GitHub Pages site to the OpenAI Responses API. The OpenAI key is read only from the Cloudflare Worker secret named `OPENAI_API_KEY`; it is never sent to the browser or committed to Git.

## Deploy

1. Create a Cloudflare account and open **Workers & Pages**.
2. Create a Worker named **chitral-360-ai** and deploy the contents of `worker/index.js` (or connect this repository to a Workers project using the included `wrangler.toml`).
3. In the Worker, open **Settings → Variables and Secrets → Add → Secret**.
4. Set the variable name to `OPENAI_API_KEY`, paste the API key into the secret value field, and deploy.
5. Your Worker endpoint will be `https://chitral-360-ai.<your-cloudflare-subdomain>.workers.dev`.
6. Add `/api/chat` to the endpoint and set the full URL in the `AI_API_URL` configuration line in `index.html` (replace the empty fallback with your Worker URL plus `/api/chat`). The health endpoint is `/api/health`.

Do not paste the API key into GitHub, `index.html`, chat messages, or a public issue.

## Local deployment with Wrangler

From the repository root:

```bash
npm install --save-dev wrangler
npx wrangler login
npx wrangler deploy
npx wrangler secret put OPENAI_API_KEY
```

Wrangler prompts for the secret value without adding it to source control. The Worker uses the OpenAI Responses API with `gpt-4.1-mini`, short bounded conversation history, input-size checks, a best-effort per-isolate request limit, and an origin allowlist for the GitHub Pages site.

## Notes

- This Worker is a separate backend. GitHub Pages cannot execute server-side code.
- Cloudflare's in-memory request limiter is best-effort; for a public production launch, configure a Cloudflare rate-limiting rule for `/api/chat` as well.
- The browser keeps a short conversation history only in page memory. The Worker sends `store: false` to the Responses API.
- The guide does not have live web search or live road/weather data. It should not claim otherwise.

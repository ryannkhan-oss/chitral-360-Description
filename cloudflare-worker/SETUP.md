# Chitral 360 — OpenAI Guide backend

This Worker keeps the OpenAI API key on the server. Never put the key in `index.html`, GitHub, or a browser-side environment variable.

## 1. Create the Cloudflare Worker
1. Sign in to Cloudflare and open **Workers & Pages**.
2. Choose **Create application → Worker** and name it `chitral-360-ai`.
3. Open **Edit code** and replace the starter code with the contents of `src/index.js` from this folder.
4. Deploy. Cloudflare will give you a URL similar to `https://chitral-360-ai.<your-account>.workers.dev`.

## 2. Add the private OpenAI key
1. Open the Worker → **Settings → Variables and Secrets**.
2. Add a secret named exactly `OPENAI_API_KEY`.
3. Paste your OpenAI API key into the secret value and save.
4. Redeploy if Cloudflare asks.

Do not send the key in chat or commit it to GitHub. Create it in the Cloudflare secret field only.

## 3. Connect the website
In `index.html`, find `AI_API_URL` and replace only the placeholder hostname with the exact Worker URL Cloudflare gave you, keeping `/api/chat` at the end. Commit and push the change to `main`.

## 4. Verify
Open `https://<your-worker-host>/api/health`. It should return JSON with `"ok":true` and `"configured":true`. Then open Chitral 360, go to **Ask Chitral**, and ask a question.

## Endpoints
- `GET /api/health` — deployment and secret readiness (does not reveal the key).
- `POST /api/chat` — accepts recent `{role, content}` messages and returns `{answer}`.

The Worker restricts browser requests to the published GitHub Pages origin, limits message count/length, avoids caching responses and never returns the API key. Configure Cloudflare usage/billing limits in your OpenAI account too.

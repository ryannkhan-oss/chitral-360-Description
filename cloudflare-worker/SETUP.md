# Chitral 360 — OpenAI Guide backend

The Worker keeps the OpenAI API key server-side. Never put the key in index.html, GitHub, or browser-side code.

## 1. Create the Worker
1. Sign in to Cloudflare → Workers & Pages.
2. Create a Worker named `chitral-360-ai`.
3. Open Edit code and replace the starter code with `cloudflare-worker/src/index.js` from this repository.
4. Deploy and copy the `workers.dev` URL Cloudflare gives you.

## 2. Add the private API key
1. Open the Worker → Settings → Variables and Secrets.
2. Add a secret named exactly `OPENAI_API_KEY`.
3. Paste your OpenAI API key into the secret value and save.
4. Never paste the key into chat or commit it to GitHub.

## 3. Connect the website
In `index.html`, find `AI_API_URL` in the Chitral Guide script. Replace the empty string with your exact Worker URL plus `/api/chat`, for example:
`const AI_API_URL = 'https://chitral-360-ai.YOUR-SUBDOMAIN.workers.dev/api/chat';`
Commit and push the website change to main.

## 4. Verify
Open `https://YOUR-WORKER-HOST/api/health`. Expect `{"ok":true,"service":"Chitral 360 AI Guide","configured":true}`. Then open the live website, visit Ask Chitral and test a question.

## Endpoints
- GET /api/health — reports whether the secret is configured, never reveals it.
- POST /api/chat — accepts recent role/content messages and returns an answer.

The Worker restricts browser requests to the GitHub Pages origin, validates message count and length, disables response caching and does not return the key. Set usage/billing limits in your OpenAI account as an additional cost control. Public endpoints can still be abused, so monitor usage and add Cloudflare rate limiting before promoting the site widely.

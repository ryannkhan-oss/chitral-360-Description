# Chitral 360 AI Guide backend

The live website uses a Cloudflare Worker to call the OpenAI Responses API. The OpenAI key is read only from the Worker secret `OPENAI_API_KEY`; it is never sent to the browser or committed to Git.

Follow [cloudflare-worker/SETUP.md](cloudflare-worker/SETUP.md) for deployment, secret configuration and the health-check test.

The website endpoint is configured in `index.html` as `AI_API_URL` and must end in `/api/chat`. The Worker health endpoint is `/api/health`.

The Worker uses `gpt-4.1-mini`, a short bounded conversation history, input-size validation, a best-effort per-isolate request limiter, an origin allowlist for the GitHub Pages site, and `store: false` for Responses API requests. For a public launch, also configure a Cloudflare rate-limiting rule and OpenAI usage limits.

The guide has no live web search, live weather or live road-condition feed. It must not claim to have checked those sources.

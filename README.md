# CHITRAL 360
### A living atlas of the Hindu Kush

Chitral 360 is a cinematic, mobile-first guide to the landscapes, destinations, culture, wildlife and heritage of Chitral, Pakistan.

## Experience

- **Cinematic home:** full-screen Chitral photography, slow movement, and a rotating landscape hero.
- **Explore:** six visual chapters for destinations, culture, wildlife, heritage, the interactive map and the AI guide.
- **Destination stories:** photography-led pages with local context and responsible-tourism notes.
- **Interactive map:** OpenStreetMap + Leaflet, labelled Chitral-area places, current-location permission, place search and OSRM road directions.
- **Chitral AI Guide:** OpenAI-powered answers through a Cloudflare Worker. The browser never receives the OpenAI secret.
- **Responsive design:** mobile and desktop layouts, keyboard-friendly controls, and reduced-motion support.

## Local preview

This is a static site. Open `index.html` through a local static server (recommended) or deploy the repository with GitHub Pages.

## AI backend

The Worker source is in `worker/index.js`. The Cloudflare-ready copy is in `cloudflare-worker/src/index.js`. Both should remain in sync.

See [cloudflare-worker/SETUP.md](cloudflare-worker/SETUP.md) for deployment and the secret setup. The browser endpoint is configured in `index.html` as `AI_API_URL` and must end with `/api/chat`.

Required Cloudflare secret:

- `OPENAI_API_KEY`

Never commit the secret or place it in browser code.

## Map data and limitations

- Map tiles and place data are provided by OpenStreetMap.
- Road routes use the public OSRM demo service; it may not cover every remote mountain road.
- The map is not an emergency-navigation service. Confirm road and weather conditions locally before travelling.
- Browser geolocation is optional and only runs after the visitor presses the location button.

## Accuracy and respect

Chitral includes diverse communities and changing local conditions. The guide should avoid inventing current prices, schedules, road closures or safety alerts. Visitors should respect local customs and ask permission before photographing people.

## Project structure

```
index.html
worker/
  index.js
wrangler.toml
cloudflare-worker/
  SETUP.md
  src/index.js
  wrangler.toml
```

# CHITRAL 360 — Beyond the Mountains

A ground-up static website rebuild designed as an interactive exhibition experience.

## Features
- Cinematic intro portal and responsive navigation
- Illustrated, clickable exploration map with category filters
- Location field notes and discovery missions
- Wildlife clue cards
- Culture and language section with device speech pronunciation (not verified Khowar audio)
- Past / Present / Future views
- Sustainability scenario simulator with transparent illustrative score
- Ten-question quiz with score and results
- Searchable curated knowledge guide (not live AI)
- Optional synthesized ambience (no audio recording)
- Responsive layout, reduced-motion support, and offline shell/image caching after first visit

## Run
Open `index.html` in a modern browser, or serve the folder with any static web server.

## Deploy with GitHub Pages
Repository Settings → Pages → Deploy from a branch → `main` → `/` (root). Save and wait for deployment.

## Notes / honesty
- Map is a stylized exploration illustration, not a geographically precise GIS map.
- External landscape photographs are loaded from Unsplash; internet is needed for those images.
- The guide is a local curated keyword knowledge base, not an AI model or live search.
- Future simulator is an illustrative calculation, not an environmental forecast or measured score.
- Ambient sound is generated in-browser; the phrase uses browser text-to-speech, which may not accurately pronounce Khowar.
- The demo stores mission progress in session storage only.


## Photo credits
- The City of Chitral and Tirich Mir — Emaad Paracha, Wikimedia Commons, CC BY-SA 4.0: https://commons.wikimedia.org/wiki/File:The_City_of_Chitral_and_Tirich_Mir.jpg
- On the way to Kalash Valley Chitral Pakistan — Zindagi-zoq-e-Safar, Wikimedia Commons, CC BY-SA 4.0: https://commons.wikimedia.org/wiki/File:On_the_way_to_Kalash_Valley_Chitral_Pakistan.jpg

## Offline use
The service worker caches the site shell and successfully fetched image/font assets after an online visit. Visit each section once while connected for best offline coverage. The map is schematic and the knowledge guide is local; no live network data is required for interactions.

## Expanded content experience (November 2026)

- Culture notes: music, clothing/crafts, food, language, polo, oral heritage, with consent and community-source guidance.
- Stories: short editorial entries about history, landscape, cultural life and oral memory; story filters and accessible reading modal.
- Photo archive: 13 Chitral-related Wikimedia Commons photographs with fullscreen viewer, category filters, previous/next controls and source links. Check each Commons file page for its author and license before reuse.
- Hidden Chitral: discovery picker and destination cards, connected to the map field notes.
- Chitral in 60 seconds: six-scene, manually navigated intro.
- Exploration map: 17 selectable markers in an illustrative schematic. Marker positions are approximate—not navigation/GPS data. Each place panel includes a map-search link.
- Homepage shortcuts and responsive layouts for the new sections.

The cultural and story content is intentionally introductory. Community-contributed stories, recordings, recipes and language content should be reviewed and shared with consent before adding them.

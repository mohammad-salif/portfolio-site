# Portfolio website

Static site: plain HTML, CSS and JavaScript. No build step.

## Structure
- `index.html` — page markup
- `css/style.css` — all styles
- `js/main.js` — pages, routing, animations and content (projects, journal, FAQ)
- `images/` — photos used on the site

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Publish with GitHub Pages
1. Push this folder to a GitHub repository.
2. Repository Settings > Pages > Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Your site will be live at `https://<username>.github.io/<repo>/`.

## Edit your content
All text for projects, journal posts, FAQ, quotes and services is at the top of `js/main.js` (arrays named `PR`, `J`, `SV`, `QS`, `FQ`). Static text (name, bio, email) is in `index.html`.
Replace the placeholder name "Ora Studio" and `hello@example.com` before publishing.

## Libraries (loaded from CDN)
GSAP and ScrollTrigger (cdnjs), Lenis (jsDelivr), Google Fonts. An internet connection is needed for these.

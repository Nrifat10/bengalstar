# Bangla Star Co., Ltd — Website

A modern, fully responsive, **pure static** website (no build step, no frameworks, no npm)
for **Bangla Star Co., Ltd** — manpower supply for petrol stations in Saudi Arabia.

**Design:** Premium light theme — white / cool-light surfaces, ink-navy `#0E1F3D`,
brand navy `#16305E` and gold `#D4A017` accents, soft shadows, rounded photo cards.
**Stack:** Plain HTML + CSS + vanilla JavaScript · English / العربية (with full RTL) ·
Sora + Inter (EN) + Tajawal (AR)

**Sections:** Navbar (glass, desktop ≥ 960px) · Hero (light split layout + image-card
slider with Saudi station photos + floating badges + mini stats) · Client marquee ·
About (photo collage + years badge + checklist) · Services (6 cards with images &
includes-lists) · Why Us (6 cards + 72-hour guarantee banner) · How It Works
(4 steps with timeline) · Stats band (navy, animated counters) · Coverage (region
chips) · Testimonials (slider) · FAQ (accordion) · CTA band · Contact (navy info
card + form + map) · Footer · Floating WhatsApp + back-to-top.

---

## 📁 File structure

```
/index.html          Main page (all sections + SEO + JSON-LD)
/css/style.css       All styles (mobile-first, RTL-aware, reduced-motion)
/js/translations.js  Every visible string in EN + AR
/js/images.js        All image URLs in ONE array (easy to replace)
/js/main.js          Slider, language toggle, form, animations
/vercel.json         Clean URLs, security headers, long-term caching
/robots.txt          robots.txt (+ sitemap reference)
/sitemap.xml         Sitemap with en/ar hreflang alternates
/favicon.svg         Gold star on deep blue
/README.md           This file
```

**Local preview:** just open `index.html` in a browser, or run a tiny static server
(e.g. `npx serve .` or `python3 -m http.server`).

---

## 🚀 Deploying to Vercel (3 ways)

### Option A — GitHub import (recommended)

1. Create a new GitHub repository (e.g. `banglastar-website`).
2. Upload **all files and folders above to the repository root** (no extra nesting —
   `index.html` must sit at the repo root).
3. Go to **[vercel.com/new](https://vercel.com/new)** and sign in.
4. Click **Import Git Repository → Continue with GitHub**, pick your repo.
5. Framework Preset: **Other** (Vercel auto-detects a static site).
6. Click **Deploy** — your site is live in seconds at `your-project.vercel.app`.

### Option B — Drag & drop

1. Put all the files/folders listed above into one local folder (the site root).
2. Go to **[vercel.com/new](https://vercel.com/new)** and log in.
3. Drag the folder into the deploy area of the page.
   *(If your account doesn't show drag & drop, use Option A or C.)*
4. Name the project and confirm — done.

### Option C — Vercel CLI

```bash
npm i -g vercel
cd path/to/this-folder     # the folder containing index.html
vercel                     # first-time login + preview deploy
vercel --prod              # production deploy
```

Then attach your custom domain in **Project → Settings → Domains**
(e.g. `banglastar.com` + `www.banglastar.com`).

---

## ✏️ Placeholders to replace before going live

| # | What | Where | Current placeholder |
|---|------|-------|---------------------|
| 1 | **WhatsApp number** | `js/main.js` → `SITE_CONFIG.whatsappNumber` **and** every `https://wa.me/9665XXXXXXXX` link in `index.html` | `9665XXXXXXXX` |
| 2 | **Phone number** | `js/main.js` → `SITE_CONFIG.phoneHref` **and** `index.html` (`tel:+9665XXXXXXXXXX`, JSON-LD `telephone`) **and** display strings in `js/translations.js` (`contact.phone`) | `+966 5X XXX XXXX` |
| 3 | **Email address** | `js/main.js` → `SITE_CONFIG.email`, `index.html` (JSON-LD + `mailto:`), `js/translations.js` (`contact.email`) | `info@banglastar.com` |
| 4 | **Office address** | `js/translations.js` → `contact.address` (EN + AR), `index.html` JSON-LD `address` | `Office 12, Business District, Riyadh` |
| 5 | **Formspree form ID** | `js/main.js` → `SITE_CONFIG.formspreeId` **and** the `<form action="…">` in `index.html` | `YOUR_FORM_ID` |
| 6 | **Domain name** | `index.html` (canonical, hreflang, OG, Twitter, JSON-LD), `robots.txt`, `sitemap.xml` | `https://www.banglastar.com` |
| 7 | **Google Maps embed** | `index.html` → `.map-embed` iframe `src` | Generic Riyadh map |
| 8 | **Social links** | `index.html` footer + JSON-LD `sameAs` | `banglastar` handles |
| 9 | **Stats & testimonials** | `index.html` (`.counter` values + testimonial texts in `js/translations.js`) | Sample numbers/reviews |
| 10 | **Images** | `js/images.js` → the single `IMAGES` array | Curated stock photos |

> **Formspree quick setup:** create a free form at
> [formspree.io](https://formspree.io) → copy your form ID (looks like `xyzabcd`) →
> paste it in both `js/main.js` (`formspreeId`) and the form `action` in
> `index.html`. Submissions arrive in your inbox — no backend needed.

---

## 🖼️ Managing images

All images live in **one array** in `js/images.js`:

```js
const IMAGES = [
  { key: "hero-1",      src: "https://images.unsplash.com/..." },
  ...
];
```

- HTML tags reference images by key: `<img data-img="hero-1">`.
- Hero/about images use Unsplash URLs with
  `?auto=format&fit=crop&w=1600&q=70`; service cards use `w=800` for speed.
- Two hero images (petrol station at night, car wash) are hosted on a fast
  external CDN and were picked for exact subject match — swap them for any
  Unsplash URL you prefer by editing the `src` values.
- If any image fails to load, a branded SVG placeholder is shown automatically
  (`FALLBACK_IMAGE`), so the layout never breaks.
- To use your own photos: drop files into an `/images/` folder and point
  `src` to `/images/your-file.jpg` (that folder already gets long-term cache
  headers via `vercel.json`).

---

## 🌐 Languages (EN / العربية)

- Toggle with the **العربية / EN** button in the navbar.
- Arabic switches the whole document to RTL (`dir="rtl"`, `lang="ar"`) and swaps
  the font to Cairo; English uses LTR + Poppins.
- The visitor's choice is saved in `localStorage` and restored on the next visit.
- Sharing a direct Arabic link works too: `yoursite.com/?lang=ar`.
- To change any wording, edit `js/translations.js` — keep the same key paths in
  both `en` and `ar`.

---

## 🧰 Customization cheatsheet

| Change | File |
|--------|------|
| Colors | `css/style.css` → `:root` variables at the top |
| Fonts | `<head>` Google Fonts link in `index.html` + `--font-en/--font-ar` in CSS |
| Menu items | `index.html` navbar + `nav` keys in `js/translations.js` |
| Hero slides | `index.html` `.hero-slide` blocks + `hero.slides` in translations |
| Services / steps / stats | matching blocks in `index.html` + arrays in translations |
| Slider speed | `js/main.js` → `new Slider(..., { interval: 6000 })` |
| Section order | reorder `<section>` blocks in `index.html` |

---

## ✅ Included quality features

- Sticky navbar (transparent → solid on scroll) + mobile slide-in menu
- Full-screen hero slider: autoplay, fade, arrows, dots, swipe, pause on hover,
  keyboard arrows, respects `prefers-reduced-motion`
- Scroll-reveal animations, animated stat counters, scrollspy
- Contact form via Formspree fetch submit with success/error messages +
  WhatsApp fallback + floating WhatsApp button + back-to-top button
- SEO: meta description, Open Graph, Twitter card, canonical, hreflang en/ar,
  `sitemap.xml`, `robots.txt`, JSON-LD LocalBusiness schema
- Accessibility: skip-link, ARIA labels/roles, focus-visible styles, keyboard
  navigation, semantic HTML, image alt text (translated), lazy loading
- Performance: `preconnect` for fonts, deferred JS, lazy images
  (except the first hero slide), width/height on all images to avoid layout shift
- Security/headers via `vercel.json`: `nosniff`, `SAMEORIGIN`,
  `strict-origin-when-cross-origin`, immutable caching for `/css`, `/js`, `/images`

---

© Bangla Star Co., Ltd — replace sample content, numbers, reviews and contact
details with your real business information before launch.

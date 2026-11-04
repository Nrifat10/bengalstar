# Bengal Star Limited Company

Production website for **Bengal Star Limited Company** — a specialist manpower supply
company serving petrol stations across the Kingdom of Saudi Arabia since 2014.

Bilingual (English / Arabic, RTL-aware), multi-page, PWA-enabled, and ready to deploy
to **Vercel** from GitHub.

---

## Tech stack

| Area | Choice |
|------|--------|
| Framework | Next.js 16 (App Router) + TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui (New York) |
| Database | Prisma ORM with SQLite (local) — switchable to Turso / Postgres for production |
| Icons | lucide-react |
| Fonts | Sora, Inter, Tajawal (Arabic) |
| PWA | Web App Manifest + theme-color + apple-touch-icon (configured) |

---

## Prerequisites

- **Node.js 18.18+** (or **Bun** — used in this repo)
- A GitHub account
- A Vercel account (free tier is fine)

---

## Local development

```bash
# 1. Install dependencies
bun install

# 2. Create the local SQLite database + generate Prisma client
bun run db:push

# 3. Start the dev server (http://localhost:3000)
bun run dev
```

The dev server runs on port 3000 and writes logs to `dev.log`.

### Environment variables

Copy `.env.example` to `.env` and adjust if needed:

```bash
cp .env.example .env
```

| Variable | Required | Default | Notes |
|----------|----------|---------|-------|
| `DATABASE_URL` | Local dev: yes | `file:./dev.db` | SQLite path (relative to `prisma/`). See below for Vercel. |

> `.env` is gitignored. `.env.example` is committed as a template.

---

## Production deployment (GitHub → Vercel)

### 1. Push to GitHub

```bash
git init            # if not already a repo
git add .
git commit -m "Production-ready: Bengal Star website"
git branch -M main
git remote add origin https://github.com/<your-user>/bengal-star.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to <https://vercel.com/new>
2. Import your GitHub repository.
3. Vercel auto-detects Next.js — **Framework Preset: Next.js**.
4. **Build Command:** `next build` (already set in `package.json`).
5. **Install Command:** `bun install` (or leave default — Vercel auto-detects Bun from `bun.lockb`).

### 3. Set the `DATABASE_URL` environment variable

In **Vercel → Project → Settings → Environment Variables**, add one of:

**Option A — No database (WhatsApp fallback, zero setup):**
Leave `DATABASE_URL` unset. The `/api/requests` contact form will validate input,
return success to the user, and compose a pre-filled **WhatsApp deep link** with the
lead details so no enquiry is ever lost. Leads arrive directly on the company WhatsApp.

**Option B — Turso (libSQL, SQLite-compatible, recommended for persistence):**
1. Create a free DB at <https://turso.tech>
2. Add env vars on Vercel:
   - `DATABASE_URL` = `libsql://<your-db>.turso.io`
   - `DATABASE_AUTH_TOKEN` = `<token>`
3. In `prisma/schema.prisma` change the datasource provider:
   ```prisma
   datasource db {
     provider = "libsql"          // was "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
4. Run `bun run db:push` locally to sync the schema, then redeploy.

**Option C — Neon Postgres:**
1. Create a free DB at <https://neon.tech>
2. Set `DATABASE_URL` = your Neon connection string.
3. Switch the provider to `"postgresql"` in `prisma/schema.prisma` and `bun run db:push`.

### 4. Deploy

Click **Deploy**. Vercel runs `bun install` → `postinstall` (`prisma generate`) →
`next build`. The site is live on `https://<project>.vercel.app`.

> **Custom domain:** add `bengalstarltd.com` in Vercel → Settings → Domains.
> The OpenGraph metadata in `src/app/layout.tsx` already uses
> `metadataBase: https://bengalstarltd.com`.

---

## PWA

The site is installable as a Progressive Web App:

- `public/site.webmanifest` — name, short_name, theme color (`#0e1f3d`), icons
  (SVG + 96/192/512 PNG + apple-touch-icon), `display: standalone`
- `src/app/layout.tsx` — `manifest`, `icons`, `appleWebApp`, and `viewport.themeColor`
  metadata are all wired up

Visitors can **“Add to Home Screen”** for a standalone app experience with a navy
status bar and the colorful Bengal Star icon.

---

## Scripts

| Script | What it does |
|--------|--------------|
| `bun run dev` | Start the dev server on port 3000 |
| `bun run build` | Production build (`next build`) |
| `bun run start` | Run the production server (`next start`) |
| `bun run lint` | ESLint check |
| `bun run db:push` | Create / sync the SQLite schema + generate Prisma client |
| `bun run db:generate` | Regenerate the Prisma client only |

> `postinstall` automatically runs `prisma generate` after `bun install` —
> required for the build to find `@prisma/client`.

---

## Project structure

```
prisma/
  schema.prisma          # WorkerRequest model (SQLite)
public/
  favicon.svg, favicon.ico, apple-touch-icon.png,
  web-app-manifest-{192,512}.png, site.webmanifest,
  og-bengal-star.jpeg, images/                 # brand + station photos
src/
  app/
    layout.tsx           # metadata, PWA manifest, theme-color, fonts
    page.tsx             # single user-visible route (hash-routed SPA)
    api/requests/route.ts# contact form endpoint (DB + WhatsApp fallback)
    globals.css          # design tokens + component styles
  components/
    pages/               # home, about, services, why-us, process, coverage, faq, contact
    site/                # navbar, footer, hero, brand-marquee, lang-provider, router, ...
    ui/                  # shadcn/ui component library
  lib/
    i18n.ts              # bilingual EN/AR content + SITE constants + BRANDS
    db.ts                # Prisma client singleton
    utils.ts
```

---

## Notes

- **Type-safe build:** `typescript.ignoreBuildErrors: false` — the build fails on
  type errors (`tsc --noEmit` passes clean).
- **No standalone output:** `output: "standalone"` was removed so Vercel uses its
  native Next.js runtime. For self-hosting, `bun run build && bun run start` works.
- **Bilingual:** every string lives in `src/lib/i18n.ts` (EN + AR). The language
  toggle in the navbar switches live; RTL is applied automatically for Arabic.
- **Lead capture:** the contact form POSTs to `/api/requests`, which validates,
  persists to the DB when available, and otherwise falls back to WhatsApp — so it
  works on Vercel with **zero external services**.

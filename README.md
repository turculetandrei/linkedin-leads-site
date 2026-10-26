# Glowlist: landing page

Landing page for Glowlist, a managed service that turns the people who engage with competitors' LinkedIn posts into scored, warm leads.

Every person and company in the sample leads is invented.

## Stack

Next.js (App Router, static export), TypeScript, CSS Modules, Inter via `next/font`. Tailwind is only used for the base reset in `app/globals.css`. No backend.

## Run

```
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

## Content

All copy (EN and RO), sample leads, prices and links are in `components/Landing.tsx`. Links still to fill in before launch are in its `LINKS` object. The page is `noindex, nofollow` (set in `app/layout.tsx`) until the placeholders are gone.

## Structure

| Path | What it is |
|---|---|
| `app/page.tsx` | `/`: renders the landing |
| `app/layout.tsx` | Inter font (`--font-inter`), title, robots |
| `app/icon.svg` | Favicon |
| `components/Landing.tsx` | The whole page: copy, lead inbox, compare, pricing, bonuses, guarantee, FAQ |
| `components/Landing.module.css` | Its styles |

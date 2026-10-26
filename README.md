# Heatseeker: landing page

Landing page for Heatseeker (working name), a managed service that turns the people who engage with competitors' LinkedIn posts into scored, warm leads.

Every person and company in the sample leads is invented. The engagement averages are real aggregates.

## Stack

Next.js (App Router, static export), TypeScript, Tailwind CSS 4, Motion. No backend.

## Run

```
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

## Content

All copy, prices, limits, links and placeholders are in `content.ts`. Search it for `PLACEHOLDER` and `TODO`.

**Niche pages:**
- Each key in `niches` gets its own page at `/<key>`.
- `/` shows `DEFAULT_NICHE`.
- To add a niche, add an entry with the `Niche` type; the page is generated at build time.

## Structure

| Path | What it is |
|---|---|
| `content.ts` | All copy and settings: product name, links, pricing, bonuses, guarantee, niche pages |
| `app/page.tsx` | `/`: the default niche |
| `app/[niche]/page.tsx` | `/agencies` and any future niche |
| `app/welcome/page.tsx` | Post-payment page with the "Book your setup call" button |
| `components/NichePage.tsx` | The section order for a niche page |
| `components/Hero.tsx` | Headline, CTA, daily digest card |
| `components/Sections.tsx` | Outcome, proof, effort, sources |
| `components/Speed.tsx` | The 24-hour timeline |
| `components/Offer.tsx` | Bonuses, guarantee, pricing |
| `components/LeadTable.tsx` | Sample leads table (stacked list on phones) |
| `components/Faq.tsx`, `Closing.tsx` | FAQ, final CTA, footer |

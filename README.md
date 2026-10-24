# LinkedIn Leads: landing page

Landing page for a local CLI that turns engagement on LinkedIn posts into a scored lead list: it collects the people who react to, comment on or reshare chosen posts, scores each one 1–10 against an ideal customer profile with AI, and writes a sorted CSV.

Live: https://linkedin-leads-site.vercel.app

Every name, company and number in the demo is invented.

## Stack

Next.js (App Router, static export), TypeScript, Tailwind CSS 4, Motion. No backend.

## Run

```
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

All copy, including the product name, price and checkout link placeholders, is in `content.ts`.

## Structure

| Path | What it is |
|---|---|
| `content.ts` | All text and demo data |
| `app/` | Layout, page, global styles, icon |
| `components/Hero.tsx` | Headline, call to action, lead list preview |
| `components/HowItWorks.tsx` | Four steps with an animated flow line |
| `components/Demo.tsx`, `Terminal.tsx`, `LeadTable.tsx` | Replayed terminal run, then the lead table |
| `components/Facts.tsx`, `Faq.tsx`, `Closing.tsx` | Facts, FAQ, final call to action and footer |

# Polar Plunge Therapy Co.

Website for a Reykjavik cold-exposure therapy clinic, built with **Wix Headless** (Astro + React islands). The design system is a "laboratory paper + cornflower-steel" aesthetic — soft rounded shapes, self-hosted serif/sans typography, and a signature concentric **contour-ripple** motif that reads as both water and data contours.

🔗 **Live site:** https://www.plungetherapyco.com

## Tech stack

- **[Astro](https://astro.build/)** 5 — static-first site with selective hydration (React islands)
- **[Wix Headless](https://dev.wix.com/docs/go-headless)** — `@wix/astro`, `@wix/sdk`, content via Wix Data (CMS)
- **React** 18 — interactive islands
- **Tailwind CSS** 4
- Self-hosted [Fontsource](https://fontsource.org/) fonts — Newsreader (display) + IBM Plex Sans (body)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home / hero |
| `/protocol` | The cold-exposure protocol |
| `/safety` | Safety guidance |
| `/evidence` | Research evidence |
| `/intake` | Screening intake form |
| `/data` | Adaptation data dashboard |
| `/about` | About the clinic |
| `/api/screening` | `POST` endpoint backing the intake form |

Plus a custom `404`.

## CMS collections

Content is stored in Wix Data and queried in [`src/lib/cms.ts`](src/lib/cms.ts):

- `ResearchSummary` — evidence summaries
- `StoryBlock` — narrative content
- `Outcome` — adaptation outcomes
- `ScreeningIntake` — submission target for the intake form

## Interactive islands

- `NavScreeningButton` + `MobileScreeningStickyBar` (`client:load`)
- `AdaptationDashboard` (`client:visible`)
- `ScreeningIntakeForm` (`client:idle`)

## Getting started

```bash
npm install
npm run dev      # wix dev — local dev server
```

### Environment

This project uses Wix Headless credentials, which are **not** committed. Create a `.env.local` (gitignored) with your own values from the Wix dashboard:

```bash
WIX_CLIENT_ID="..."
WIX_CLIENT_SECRET="..."
# (plus the other WIX_CLIENT_* values from your Wix Headless app)
```

## Build & deploy

```bash
npm run build    # wix build
npm run release  # wix release
```

## Project structure

```
src/
  components/    # Astro + React components (ui/ holds shared primitives)
  layouts/       # Layout.astro shell
  lib/           # cms.ts (Wix Data queries), site.ts
  pages/         # routes + api/screening.ts endpoint
  styles/        # global.css (design system, fonts)
  utils/         # helpers
```

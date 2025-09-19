# StyleAI Desktop (prototype)

This repository contains an Electron + React desktop shell for the StyleAI smart wardrobe experience. It provides a typed IPC surface, SQLite (via Prisma) data models, a Tailwind-powered renderer, and scaffolding for premium wardrobe automation features such as the virtual mannequin, weather-aware recommendations, and community challenges.

> **Note**: This codebase is an architectural foundation. Many production features are stubbed or simulated in-memory to demonstrate flow without the full backend pipeline.

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

The development script starts Vite for the renderer, compiles the Electron process with `tsc --watch`, and launches Electron. Build artefacts are emitted into `dist` (renderer) and `dist-electron` (main/preload).

### Database

The Prisma schema lives in `app/prisma/schema.prisma`. Use SQLite locally:

```bash
npx prisma migrate dev
npm run db:seed
```

The seed script provisions a demo user with two closets, sample items, outfits, wishlist entries, and a styling challenge.

### Key scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Run renderer (Vite), compile Electron code in watch mode, and launch Electron. |
| `npm run build` | Build renderer + Electron bundles and package via `electron-builder`. |
| `npm run lint` | ESLint across the `app` directory. |
| `npm run test` | Vitest unit tests (jsdom). |
| `npm run test:e2e` | Placeholder Playwright command for future end-to-end coverage. |
| `npm run db:migrate` | Apply Prisma migrations. |
| `npm run db:seed` | Seed the SQLite database with demo data. |

## Application layout

```
app/
├── electron/          # Main process, Prisma integration, typed IPC handlers
├── renderer/          # React + Tailwind UI, Zustand state
├── common/ipc/        # zod schemas and bridge types shared between layers
├── prisma/            # Prisma schema and migrations
└── scripts/           # Seed helpers
```

### Renderer routes

- **Home** – Today’s Outfit, weather chip, outfit ideas, premium upsell cards.
- **Closet** – Digitize flow, filters, insights, multiple closets.
- **Outfit Studio** – Virtual mannequin, swipe rail, export controls.
- **Outfits** – Tabs, filters, favourites, sharing badges.
- **Analysis** – AI analysis trigger and daily tips.
- **Analytics** – Snapshot dashboards and export stubs.
- **Community** – Private groups, challenges, voting leaderboards.
- **Wishlist** – Web clipper stub, similarity explorer, resale toggle placeholder.
- **Profile** – Activity feed, stats, subscription upsell.
- **Settings** – Weather/location + notifications controls.

## IPC surface

All IPC handlers live under `app/electron/ipcHandlers` and validate payloads with `zod`. The preload bridge exposes the following namespaces on `window.styleAI`:

- `items.create/updateMeta/findMany`
- `outfits.create/list`
- `analysis.analyzeOutfit/dailyAdvice`
- `closets.create/switch`
- `share.createLink`
- `groups.create/invite`
- `wishlist.clip/create`
- `analytics.summary`
- `concierge.request`
- `challenges.create/join/submitEntry/vote`

## Testing

Unit tests live beside renderer routes. Run `npm run test` to execute the Vitest suite. End-to-end automation with Playwright is scaffolded via `npm run test:e2e`.

## Keyboard shortcuts

- `U` – Jump to Closet upload flow.
- `S` – Open Outfit Studio and prepare to save a look.
- `F` – Navigate to Outfits favourites.
- `/` – Focus search in the global header.

## QA checklist

- [ ] Upload widget triggers background removal stub and surfaces fallback messaging.
- [ ] Weather chip resolves Open-Meteo summary (with offline fallback).
- [ ] Closet filters adjust in real time and insights update.
- [ ] Virtual mannequin layers respond to selection controls.
- [ ] Outfit creation stub saves preview metadata via IPC.
- [ ] Analytics summary reflects Prisma counts when connected to DB.
- [ ] Group creation, share links, and challenge actions emit activity entries.
- [ ] Wishlist clipper sanitises URLs and surfaces similarity results.
- [ ] Concierge request logs activity and returns confirmation stub.
- [ ] Challenges show entries and vote increments via IPC.

## Packaging

Build distributables using `npm run build`. Electron Builder targets macOS (dmg) and Windows (NSIS) packages by default.

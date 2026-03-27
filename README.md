# emm.blue

Interactive portfolio built with Next.js App Router and a 5x5 navigable cell map UI.

## Overview

- Main app lives in `app/`.
- Navigation is cell-based (`5 x 5` grid).
- Content is split into lazy-loaded cell modules in `app/app/cells/`.
- Shared UI and nav systems are in `app/app/components/`.

## Key Structure

- `app/app/page.tsx` - main map viewport, transitions, overlays, and global nav wiring
- `app/app/cells/index.ts` - cell loader map and lazy import registry
- `app/app/cells/Cell_*.tsx` - per-cell content and chevron labels
- `app/app/components/ChevronNav.tsx` - directional chevrons and label animation
- `app/app/components/MapGridNav.tsx` - map modal and jump navigation

## Run Locally

From `app/`:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Build

From `app/`:

```bash
npm run build
npm run start
```

## Asteroids Cell Notes

`Cell_4_4` contains an embedded Asteroids-style mini-game.

- Controls (desktop): `A/D` rotate, `W` thrust, `Space` fire
- Controls (mobile): on-screen buttons
- A controls bubble appears at ~25% from top and hides after first input
- While instructions are visible, simulation is paused (no asteroid motion, no UFO progression, no invincibility drain)
- Initial invincibility begins on first input

## Notes

- This repository currently has a boilerplate `app/README.md` from `create-next-app`.
- Root `README.md` is intended as the project-level guide.

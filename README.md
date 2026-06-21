# Semika Anusara — Portfolio

A modern rebuild of the portfolio using **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Features

- **Day / Night mode** — toggle in the navbar. Persists via `localStorage` and respects system preference on first visit.
- **Liquid theme transition** — toggling the mode triggers a circular "liquid" reveal (via the View Transitions API) that ripples out from the toggle button. Falls back to an instant swap on unsupported browsers or when `prefers-reduced-motion` is set.
- **Liquid glass UI** — frosted glass navbar, cards, and buttons (`backdrop-filter` blur + saturation) with a refraction "sheen" sweep on hover.
- **Modern motion** — scroll-triggered reveals and micro-interactions via `framer-motion`.
- **Self-hosted fonts** — Orbitron (display) + Rajdhani (body) via `@fontsource`, no runtime dependency on Google Fonts.
- Fully responsive, keyboard-accessible, and respects reduced-motion preferences.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Project structure

```
src/
  app/            # App Router entry (layout, page, global styles)
  components/     # Navbar, Hero, About, Projects, Contact, Footer, ThemeToggle
  components/providers/ThemeProvider.tsx   # day/night state + liquid transition
  lib/data.ts     # project list, social links, skills (edit content here)
```

## Editing content

All text content — project list, social links, and skill bars — lives in `src/lib/data.ts`. Update that file rather than the components.

## Deploying

The project is a standard Next.js app — deploy directly to Vercel, or run `npm run build && npm run start` on any Node host.

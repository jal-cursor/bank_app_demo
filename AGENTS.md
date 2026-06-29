# AGENTS.md

## Cursor Cloud specific instructions

This is a single-service frontend app: a mobile banking UI demo built with Vite + React 19 + TypeScript + Tailwind CSS v4 + React Router, using mock data only (no backend, no database, no env vars).

Standard commands live in `package.json` scripts:
- `npm run dev` — Vite dev server (default port `5173`).
- `npm run build` — type-check (`tsc -b`) then production build.
- `npm run lint` — `oxlint`.

Non-obvious notes:
- Auth is mocked: the Sign in / Sign up forms accept any non-empty email and password and navigate straight to `/home`. There are no real credentials.
- The app renders inside a fixed 430×932 phone frame, so use a tall/mobile viewport when testing the UI.
- `npm run lint` emits one expected `react/only-export-components` warning in `src/data/StoreContext.tsx` and still exits 0.

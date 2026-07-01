# Pipeline setup guide

This is a static Vite + React site. A pipeline installs dependencies, lints, builds, and (optionally) publishes the `dist/` folder. There are no secrets, environment variables, or backends. Mock data lives in `src/data/mock.ts`.

No workflow files ship in this repo yet. Copy the examples below into your fork or hosting platform.

## Prerequisites

- Node.js 22 (or 20.19+; Vite 8 requires this)
- npm (ships with Node)
- This code in a git repository

Run the same three steps CI runs, and make sure they pass, before wiring anything up:

```bash
npm ci
npm run lint
npm run build
```

## Pipeline stages

| Stage | Command | Purpose |
| --- | --- | --- |
| Install | `npm ci` | Reproducible install from `package-lock.json` |
| Lint | `npm run lint` | Runs oxlint (config in `.oxlintrc.json`) |
| Build | `npm run build` | Type-checks with `tsc`, writes static files to `dist/` |
| Deploy | Platform-specific | Serves `dist/` as static files (optional) |

## GitHub Actions (CI)

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist
```

This runs on every push and pull request to `main`. Download the `dist` artifact from a run to inspect the build without deploying.

## Deploy to GitHub Pages

Add a second workflow, `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then set repository settings → Pages → source to **GitHub Actions**.

## Deploy to Vercel or Netlify

Both detect Vite automatically. Connect the repo, then confirm:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: default

Pull request preview deploys are a toggle in each platform's settings.

## SPA fallback (required for both)

React Router handles routing in the browser. If deep links like `/home` or `/transfer` return 404 on refresh, the host isn't serving `index.html` for unknown paths. Add the rewrite your host expects:

- Netlify: a `public/_redirects` file containing `/* /index.html 200`
- Vercel: a `vercel.json` rewrite of `/(.*)` to `/index.html`
- GitHub Pages: copy `dist/index.html` to `dist/404.html` during the build

## Branch protection

Once CI is green on `main`: settings → Branches → add a rule for `main`, require status checks, and select the `build` check. Broken builds stay off `main`.

## Troubleshooting

- `npm ci` lockfile error: run `npm install` locally, commit the updated `package-lock.json`, push.
- Type errors on build: run `npm run build` locally and fix the TypeScript errors under `src/`.
- Blank page after deploy: check the SPA fallback above, and that assets resolve at the deployed base path.
- Lint failures: run `npm run lint` locally; rules live in `.oxlintrc.json`.

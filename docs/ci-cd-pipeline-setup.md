# CI/CD Pipeline Setup Guide

This guide walks you through setting up continuous integration and deployment
(CI/CD) pipelines for the Banking App Demo. It is written for consumers of this
application who want to fork or clone the repo and stand up their own automated
build, test, and deploy flow.

By the end you will have:

- A **CI pipeline** that lints, type-checks, and builds the app on every push
  and pull request.
- A **deploy pipeline** that publishes the built static site to a host
  (instructions for Vercel, GitHub Pages, and any static host).

Starter workflow files referenced in this guide already live in
[`.github/workflows/`](../.github/workflows). You can use them as-is or adapt
them.

---

## 1. Prerequisites

Before wiring up a pipeline, confirm the app builds and runs locally. The
pipeline just automates these same commands.

```bash
npm install
npm run lint      # oxlint
npm run build     # tsc -b && vite build  -> outputs to dist/
npm run preview   # serve the built dist/ locally
```

| Requirement | Version / Notes |
| --- | --- |
| Node.js | 20 LTS or newer (22 recommended) |
| npm | Ships with Node; the repo commits `package-lock.json` for reproducible installs |
| Git host | GitHub (examples use GitHub Actions) |

> The build output is a **static bundle** in `dist/`. There is no server-side
> runtime, so deployment is just hosting static files.

---

## 2. Pipeline overview

```
push / pull_request
        │
        ▼
┌──────────────────────┐
│  CI  (ci.yml)        │
│  1. checkout         │
│  2. setup-node + cache
│  3. npm ci           │
│  4. npm run lint     │
│  5. tsc -b (typecheck)
│  6. npm run build    │
│  7. upload dist/     │  (artifact)
└──────────┬───────────┘
           │  on push to main (green CI)
           ▼
┌──────────────────────┐
│  Deploy (deploy.yml) │
│  build → publish     │
└──────────────────────┘
```

Keep CI and deploy as **separate workflows** so pull requests get fast feedback
without triggering a deployment.

---

## 3. Set up the CI pipeline

The CI workflow validates every push and pull request. Copy
[`.github/workflows/ci.yml`](../.github/workflows/ci.yml) into your repo (it is
already included here) — no secrets required.

What each step does:

1. **Checkout** — pulls your code.
2. **Setup Node + cache** — installs Node and caches `~/.npm` keyed on
   `package-lock.json` for faster installs.
3. **`npm ci`** — clean, reproducible install from the lockfile.
4. **`npm run lint`** — runs oxlint.
5. **Type check** — `tsc -b` catches type errors independent of the bundle.
6. **`npm run build`** — produces the production bundle in `dist/`.
7. **Upload artifact** — saves `dist/` so the deploy job (or a reviewer) can
   grab the exact built output.

Once the file is committed and pushed, open the **Actions** tab in GitHub to see
the run. To require it before merging, add it as a branch protection rule (see
section 6).

---

## 4. Set up the deploy pipeline

Pick the host that fits you. All three publish the static `dist/` output.

### Option A — Vercel (recommended)

Vercel auto-detects Vite. Two ways to connect:

**Zero-config (simplest):** Import the repo at
[vercel.com/new](https://vercel.com/new). Vercel builds with `npm run build`,
serves `dist/`, and deploys every push + PR preview automatically. No workflow
file needed.

**Via GitHub Actions** (when you want the deploy gated behind your own CI): use
[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) and add these
repository secrets under **Settings → Secrets and variables → Actions**:

| Secret | Where to find it |
| --- | --- |
| `VERCEL_TOKEN` | Vercel → Account Settings → Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` after running `vercel link`, or project settings |
| `VERCEL_PROJECT_ID` | Same as above |

### Option B — GitHub Pages

Free hosting straight from the repo. Because the app deploys to a subpath
(`https://<user>.github.io/<repo>/`), set Vite's `base`:

```ts
// vite.config.ts
export default defineConfig({
  base: '/<your-repo-name>/',
  plugins: [react(), tailwindcss()],
})
```

Then in **Settings → Pages**, set **Source = GitHub Actions**, and use the
Pages deploy steps documented in
[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) (the Pages job
is included there, commented, alongside the Vercel job).

> Because this is a single-page app with client-side routing, deep links can
> 404 on static hosts. On GitHub Pages, copy `dist/index.html` to
> `dist/404.html` during the build so refreshes on nested routes work.

### Option C — Any static host (Netlify, S3 + CloudFront, Nginx, etc.)

1. Run `npm run build`.
2. Upload the contents of `dist/` to your host.
3. Configure an SPA fallback so unknown paths serve `index.html`.

---

## 5. Environment variables

The app currently ships with **mock data** and needs no secrets to run. When you
connect a real backend, follow Vite's convention:

- Only variables prefixed with `VITE_` are exposed to the client bundle, e.g.
  `VITE_API_BASE_URL`.
- Anything in the client bundle is **public**. Never put API keys, tokens, or
  other secrets in `VITE_` variables — proxy sensitive calls through a backend.
- Add build-time env vars to your CI/host settings (GitHub Actions secrets,
  Vercel/Netlify env config), not to committed files.

---

## 6. Recommended safeguards

- **Branch protection:** require the CI check to pass before merging into
  `main` (Settings → Branches → Add rule).
- **PR previews:** Vercel and Netlify create a unique preview URL per pull
  request — great for reviewing UI changes before merge.
- **Pin Node:** the workflows pin a Node major version so builds stay
  reproducible; bump it deliberately.
- **Keep the lockfile:** always commit `package-lock.json` changes so `npm ci`
  stays deterministic.

---

## 7. Troubleshooting

| Symptom | Likely cause / fix |
| --- | --- |
| `npm ci` fails in CI | Lockfile out of sync — run `npm install` locally and commit `package-lock.json`. |
| Build passes locally, fails in CI | Node version mismatch — align the workflow's Node version with yours. |
| Blank page after deploy | Wrong `base` in `vite.config.ts` for subpath hosting (GitHub Pages). |
| Routes 404 on refresh | Missing SPA fallback — configure the host to serve `index.html`, or add `404.html` for Pages. |
| Type errors only in CI | CI runs `tsc -b`; run it locally to reproduce. |

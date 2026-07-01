# Banking App Demo

Mobile banking UI built from the Figma "Banking / E-Money Management App" design. Vite + React + TypeScript + Tailwind CSS + React Router with mock data.

## Run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal. The app renders inside a 430×932 phone frame.

## CI/CD pipelines

Setting up automated build, test, and deploy pipelines? See
[docs/ci-cd-pipeline-setup.md](docs/ci-cd-pipeline-setup.md). Starter GitHub
Actions workflows live in [`.github/workflows/`](.github/workflows).

## Build

```bash
npm run build
npm run preview
```

## Core flows

- Auth: landing, sign in, sign up, forgot password, change password
- Home dashboard with card and category grid
- Account and cards management
- Transfer (contacts → confirm → success)
- Transaction report with spending chart
- Transaction history

Tab destinations Search, Messages, and Settings are placeholders for a later phase.

## Documentation

- [Pipeline setup guide](docs/pipelines.md) — CI/CD for lint, build, and deploy

## Docs

- [Setting up pipelines](docs/pipelines.md) — add multi-step flows (transfer is the reference)

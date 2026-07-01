---
name: investigation-canvas
description: Produces a structured investigation report as a Cursor Canvas named <ticket-id>_investigation_<slug>. Prompts for a Rally ticket ID first. Use when the user invokes /investigation-canvas, attaches this skill, or asks for an investigation report canvas.
disable-model-invocation: true
---

# Investigation Canvas

Produce investigation findings as a standalone canvas the user can open beside the chat.

## Prerequisites

1. Read the [canvas skill](~/.cursor/skills-cursor/canvas/SKILL.md) and follow its file rules, design guidance, and pre-delivery self-check.
2. Read SDK exports in `~/.cursor/skills-cursor/canvas/sdk/index.d.ts` when unsure of component props.

## When to use

Use this skill when the deliverable is a **finished investigation report**, not intermediate research or a code fix. Gather evidence first (MCP tools, logs, code, git history), then render the report.

If you lack data for the report, do not create an empty canvas — tell the user what is missing.

## Naming

Canvas filename **must** follow:

```
<ticket-id>_investigation_<slug>.canvas.tsx
```

- `<ticket-id>` — Rally ticket ID from Step 0, normalized for filenames: uppercase letters, digits, and hyphens only (e.g. `RAL-1234`, `RALLY-567`). Strip spaces; replace underscores with hyphens.
- `<slug>` — kebab-case topic identifier (2–5 words), e.g. `transfer-failures`, `ci-flaky-tests`, `auth-token-leak`.
- Full path: `/Users/<user>/.cursor/projects/<workspace>/canvases/<ticket-id>_investigation_<slug>.canvas.tsx`
- Before creating, list `canvases/` to avoid overwriting an existing investigation canvas. If the same ticket and topic already exist, update that file instead of creating a duplicate.

## Workflow

```
Investigation progress:
- [ ] Step 0: Capture Rally ticket ID
- [ ] Step 1: Clarify scope (subject, time range, success criteria)
- [ ] Step 2: Gather evidence (queries, logs, code paths, diffs)
- [ ] Step 3: Synthesize findings with severity and confidence
- [ ] Step 4: Write <ticket-id>_investigation_<slug>.canvas.tsx
- [ ] Step 5: Run canvas pre-delivery self-check
- [ ] Step 6: Link canvas in chat response
```

**Step 0 — Rally ticket.** Before any investigation work, capture the Rally ticket ID.

- If the user did not provide a ticket ID in their message or prior context, use `AskQuestion` with a single prompt: **"What is the Rally ticket ID for this investigation?"** Do not proceed to Step 1 until the user answers.
- If the user already supplied a ticket ID (e.g. in the slash command, attachment, or chat), normalize it and continue without asking.
- Record the ticket ID in the canvas header metadata (`Pill` or `Text` beside the title) and in the executive summary when relevant.

**Step 1 — Scope.** Confirm what is being investigated, the time window, and what "resolved" looks like. Infer from context when the user already stated these.

**Step 2 — Evidence.** Prefer primary sources (MCP query results, stack traces, commit SHAs, metric snapshots). Embed concrete values in the canvas — no live fetches.

**Step 3 — Synthesize.** Rank findings by impact. Assign severity (`critical`, `high`, `medium`, `low`) and note confidence when evidence is partial.

**Step 4 — Write canvas.** Follow the layout in [reference.md](reference.md). Omit any section without real data.

**Step 5 — Self-check.** Canvas skill slop check plus: every finding traceable to evidence shown in the canvas; filename matches `<ticket-id>_investigation_<slug>`; Rally ticket ID appears in canvas header metadata.

**Step 6 — Introduce.** Link the canvas with its full absolute path. One sentence on what the report covers.

## Report principles

- **Standalone.** A reader opening only the canvas understands the investigation without chat context.
- **Evidence-first.** Lead with facts; separate interpretation in summary and recommendations.
- **Severity-driven hierarchy.** Critical findings get top placement, `Callout` with `tone="danger"`, or `Stat` with `tone="danger"`.
- **No filler.** Skip sections, charts, and stats that would be empty or generic.
- **Source captions.** Every chart and table includes source system and time range (e.g. "Source: Datadog · last 24h").

## Severity mapping

| Severity | Callout tone | Pill tone | Stat tone |
|----------|--------------|-----------|-----------|
| critical | danger | deleted | danger |
| high | warning | warning | warning |
| medium | info | info | info |
| low | neutral | neutral | info |

## Component hints

- Header metadata: `H1`, `Text`, `Pill` for Rally ticket ID and investigation status (`open`, `resolved`, `inconclusive`)
- Executive summary: top `Callout` — one paragraph, conclusion-first
- Key metrics: `Row` of `Stat` components
- Findings table: `Table` with columns ID, severity, finding, evidence ref
- Finding detail: `CollapsibleSection` per critical/high finding
- Trends: `LineChart` or `BarChart` with labeled axes
- Distribution: `PieChart` or `UsageBar`
- Timeline: `Table` sorted chronologically, or `CollapsibleSection` entries
- Next steps: `TodoList` or numbered `Stack` of `Text`

## Additional resources

- Section layout and composition patterns: [reference.md](reference.md)

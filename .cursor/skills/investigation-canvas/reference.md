# Investigation Canvas Layout Reference

Use as a composition guide. Include only sections backed by gathered evidence.

## Recommended layout

```
┌─────────────────────────────────────────┐
│ H1: Investigation title                 │
│ Pills: ticket ID · status · severity · date range   │
├─────────────────────────────────────────┤
│ Callout: Executive summary (conclusion) │
├─────────────────────────────────────────┤
│ Row: Stat · Stat · Stat  (key metrics)  │
├─────────────────────────────────────────┤
│ H2: Findings                            │
│ Table: ranked findings                  │
├─────────────────────────────────────────┤
│ H2: Evidence                            │
│ Charts / tables with source captions    │
│ CollapsibleSection: detail per finding  │
├─────────────────────────────────────────┤
│ H2: Timeline (if temporal)              │
│ Table or CollapsibleSection entries     │
├─────────────────────────────────────────┤
│ H2: Open questions (if any)             │
│ Stack of Text items                     │
├─────────────────────────────────────────┤
│ H2: Recommended actions                 │
│ TodoList or numbered actions            │
└─────────────────────────────────────────┘
```

## Section guidance

### Header

- `H1`: "[Subject] investigation" — specific, not "Investigation Report"
- Metadata row: `Pill` for Rally ticket ID (required), `Pill` for investigation status, date range as `Text`, optional scope label
- Do not repeat the filename slug in the title unless it reads naturally

### Executive summary

- Single `Callout` at the top of the body
- Answer: what happened, root cause (or best hypothesis), and recommended next action
- Max 3–4 sentences

### Key metrics

- 2–4 `Stat` components in a `Row`
- Each stat names one concrete number from the investigation (error count, affected users, duration, failure rate)
- Use `tone` to reflect whether the metric is alarming

### Findings table

Minimum columns:

| Column | Content |
|--------|---------|
| ID | F1, F2, … |
| Severity | Pill with mapped tone |
| Finding | One-line statement |
| Evidence | Pointer to section, chart, or source |

Sort by severity (critical first). Use `TableRowTone` on rows when the SDK supports highlighting critical rows.

### Evidence

- One `H2` per evidence category (e.g. "Error logs", "Deployment timeline", "Query results")
- Prefer charts for trends, tables for row-level detail
- `CollapsibleSection` for verbose excerpts (stack traces, query output, diff snippets via `DiffView`)
- Caption under each visual: `Text` with muted weight — source, time range, aggregation if any

### Timeline

Include when the investigation spans events over time.

- Columns: timestamp, event, actor/system, relevance
- Newest-first or chronological — pick whichever aids understanding; state sort order in caption

### Open questions

Only when evidence is incomplete.

- Short bullet list of unresolved items
- Note what data or access would resolve each

### Recommended actions

- Ordered by priority
- Each action is specific and owned (team, system, or user action)
- `TodoList` when items are discrete tasks; plain numbered list for strategic recommendations

## Composition variety

Avoid a single column of identical cards. Mix:

- Open sections (`H2` + content) for narrative blocks
- `Card` for grouped evidence clusters
- Full-width charts between compact text sections
- `Grid` when comparing two evidence sources side by side

## Filename examples

| Rally ticket | Topic | Filename |
|--------------|-------|----------|
| RAL-1042 | Transfer confirmation bug | `RAL-1042_investigation_transfer-confirm-bug.canvas.tsx` |
| RAL-2201 | CI pipeline failures | `RAL-2201_investigation_ci-pipeline-failures.canvas.tsx` |
| RAL-0891 | Auth session expiry | `RAL-0891_investigation_auth-session-expiry.canvas.tsx` |
| RAL-3300 | API latency spike | `RAL-3300_investigation_api-latency-spike.canvas.tsx` |

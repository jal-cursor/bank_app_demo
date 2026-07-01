---
name: figma-to-elevate
description: Implements a feature design from Figma using the appropriate Elevate UI Kit components. Use when the user wants to build/implement a Figma feature design, frame, or flow with Elevate components, or invokes /figma-to-elevate.
disable-model-invocation: true
---

# Figma to Elevate

Take a feature design from Figma and implement it using the appropriate Elevate components.

## Principles

- When writing UI code, ONLY use the elevate UI Kit. If you cannot find the appropriate element flag this to the user. If you use a component that you are less confident in its accuracy, provide a report to outline at the end

## Inputs

Before starting, make sure you have:

- A Figma reference for the feature to implement (file/frame/node link or an active selection). If none is provided, ask the user for a Figma URL or active selection before proceeding.
- Where the new UI code should live in this repo (target file/screen). Infer from context when obvious; otherwise ask.

## Workflow

```
Figma to Elevate progress:
- [ ] Step 1: Analyze the Figma feature design -> required components (design-component-analyzer)
- [ ] Step 2: Correlate Elevate UI kit Figma designs with Elevate library code (elevate-design-correlator)
- [ ] Step 3: Implement the original design using the correlated Elevate code
- [ ] Step 4: Confidence & flags report
```

### Step 1: Define required components

Take the figma design for the feature we are looking to implement and define which components are required to build. spawn the `/design-component-analyzer` for this step.

- Pass the Figma reference and any feature context to the subagent.
- Ask it to return its full structured inventory, especially the **Handoff for design-system fetch** list (deduplicated component identifiers with source Figma node IDs) and any **Flags & unresolved items**.
- Carry unresolved/custom flags forward — they feed the Step 4 report.

### Step 2: Correlate with the Elevate library

Use the elevate UI kit figma to identify the most up to date designs. Correlate the designs with the code in the elevate library. Use the `/elevate-design-correlator`.

- Give the subagent the Step 1 handoff list (component identifiers + Figma node IDs) as its scope.
- Ask it to return the **Correlation matrix** (Figma component -> Elevate component, path, variant/token match, confidence, status) plus **Drift & gaps**.
- For each required component, record the concrete Elevate import/symbol, path, and the props/variants to use.
- Any component with status `missing-in-elevate`, `unresolved`, or low confidence is a flag for Step 4.

### Step 3: Implement

Use this code to implement the original design from step 1.

- Build the feature in the target file(s) using ONLY the Elevate components resolved in Step 2 (correct import paths, props, variants, and tokens from the correlation matrix).
- Match the Step 1 design: layout, composition/nesting, states, and tokens (color, typography, spacing, radius).
- If a required element has no Elevate counterpart, do NOT substitute a raw/custom element silently — flag it to the user (see Principles) and either pause for guidance or clearly mark the gap.
- After editing, run `ReadLints` on changed files and fix issues you introduced.

### Step 4: Confidence & flags report

End with a short report covering:

- **Low-confidence components** — any Elevate component you used but were less confident about (per Principles), with the Figma source and why.
- **Missing / unresolved** — required elements with no Elevate counterpart or unresolved correlation, surfaced explicitly to the user.
- **Drift** — notable Figma-vs-Elevate divergences (variant or token) from Step 2 that affected the implementation.

If nothing is uncertain and everything mapped cleanly, say so in one line instead of padding the report.

## Constraints

- ONLY Elevate UI Kit components in UI code. Never introduce a non-Elevate UI element without flagging it first.
- Steps 1 and 2 are read-only analysis (delegated to subagents); only Step 3 writes code.
- Do not fabricate Elevate components, props, or tokens — use only what Step 2 actually resolved from the Elevate library.

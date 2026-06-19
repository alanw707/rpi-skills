---
name: rpi-spec
description: Use only when scattered requirements must be normalized into a formal RPI spec artifact before research or planning. Not for ordinary chat clarification, lightweight scoping, or simple task breakdown.
---
# rpi-spec
Create a compact, implementation-neutral spec for one feature, bug, or refactor.

**Role:** `requirements-analyst`. Read `..\rpi-pipeline\rpi-pipeline.yml` for the authoritative contract.


## Use When
- Raw or externally defined ask needs normalization before research or greenfield interrogation
- Requirements or acceptance criteria are scattered
- You need one implementation-neutral change contract before discovery
- For bugs: current and expected behavior can already be stated

## Do Not Use When
- Scope is already clear enough to go straight to `rpi-research` or `rpi-grillme`
- You need repo/module mapping; use `rpi-context`
- You need files, symbols, or workflow tracing; use `rpi-research`
- You need task sequencing or design shape; use `rpi-plan`

## Before Starting
1. Read the source work item, comments, refinement notes, and child tasks that materially affect scope or verification.
2. Read `docs/project-context.md` if present.
3. Read `docs/project-structure.md` or `docs/state-graph.md` only for durable terminology and workflow names.
4. Vault: reuse session findings; query sparingly; prefer Decision notes; max 3 reads.
5. Keep backlog workflow metadata in the source system. Pull over only what affects scope, constraints, or delivery risk.
6. Reuse existing domain terms. Capture only what is specific to this change.

## Phase Duties
- **Requirement normalizer** — state what is changing, why it matters, who is affected, and whether this is feature / bug / refactor / mixed.
- **Scope shaper** — define in-scope behavior, explicit non-goals, affected workflows, dependencies, and any source-derived workstream checklist.
- **Acceptance designer** — define observable, testable done criteria; for bugs capture current vs expected behavior; for refactors state what must remain unchanged; add preliminary state assessment with `already true` / `not true` / `unknown`; use stable `R#` / `AC#` labels when needed.
- **Design question harvester** — capture only implementation-shaping questions; if none are material, say `none`.
- **Risks & unknowns** — record assumptions, edge cases, compatibility/migration concerns, and blockers.
- **Output validator** — re-read the spec and keep it task-scoped, not design-scoped.

## Output
- Write `docs/specs/<slug>.md`
- If sourced from Azure DevOps, prefer `docs/specs/spec-<id>-<slug>.md`
- Required sections:
  - `Source Workstream Checklist`
  - `Goals`
  - `Non-Goals`
  - `Preliminary Assessment`
  - `Requirements`
  - `Acceptance Criteria`
- Optional sections:
  - `Design Questions`
  - `Open Questions`
- Keep it tight; prefer ~50-100 lines unless source complexity demands more

## Must Preserve
- Non-goals must not be empty
- Do not invent files, classes, or methods
- Do not write an implementation plan or structure outline here
- If vault knowledge was used, carry forward only new constraints or decisions

## Self-Check
- Source work item populated when one exists
- Goals and non-goals present
- Acceptance criteria observable and testable
- Current-state assessment evidence-backed (preliminary only; research will verify with code)
- Design questions remain questions, not solutions
- Stable labels used when traceability needs them
- Vault findings reused selectively
- Output still reads like a spec, not a plan

## Next Step
Write `docs/specs/<slug>.md`; usually next: `rpi-research` for existing codebases, or `rpi-grillme` when the repo is absent or too thin for honest current-state research. This phase is optional — skip it entirely when no normalization is needed.

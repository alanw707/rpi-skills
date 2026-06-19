---
name: rpi-research
description: Use only when the task requires a formal RPI research artifact under `docs/scope-research/` before planning or implementation for a non-trivial existing-code change. Not for ordinary debugging, quick file discovery, or lightweight investigation.
---
# rpi-research
Produce a minimal, evidence-backed research artifact for one change. No code.

**Role:** `forensic-investigator`. Read `..\rpi-pipeline\rpi-pipeline.yml` for the authoritative contract.


## Use When
- Non-trivial work needs current-state proof before planning
- You need exact files, symbols, workflow path, or local patterns
- You must verify whether requirements or ACs are already true

## Do Not Use When
- The ask still needs scope or acceptance criteria; use `rpi-spec`
- The edit is trivial and the file set is already obvious
- You need recommendations or task sequencing; use `rpi-plan`

## Before Starting
1. Read `docs/project-context.md` first if module boundaries are unclear.
2. Read `docs/project-structure.md` or `docs/state-graph.md` only for durable structure/workflow cues.
3. Read the spec next when one exists; it is the task-scope source of truth.
4. If only raw story/refinement text exists and the task is non-trivial, prefer `rpi-spec` first. If scope is already clear enough, direct research is fine.
5. Vault: reuse session findings; query sparingly; prefer Decision notes; max 3 reads.
6. Only then fall back to `README.md`, `CONTRIBUTING.md`, architecture docs, ADRs, or repo `docs/` for specific remaining gaps; prefer the most durable source over incidental notes.
7. If spec and repo docs conflict, prefer the spec for scope and repo docs for stable constraints; surface the conflict.

## Phase Duties
- **Bootstrap** — once per session, learn module map, build/test commands, naming conventions, and architecture rules.
- **Verify current state** — classify key requirements / ACs as `already true`, `not true`, or `unknown` with evidence.
- **Locate code** — extract keywords/symbols, then find candidate files by semantic symbols plus path-only discovery first.
- **Trace workflow** — capture trigger → orchestration → downstream effect when runtime shape matters; otherwise say not needed.
- **Analyze code** — inspect the highest-signal files only; every finding cites `file:line`.
- **Map structure** — describe the current affected slice only; no solution shape.
- **Collect design evidence** — gather facts and constraints for each material design question; do not choose a solution.
- **Find patterns** — capture adjacent conventions implementation should follow.
- **Compact context** — distill findings into one plan-ready artifact with facts separate from unknowns.
- **Validate output** — re-read and add any missing fact that would materially change planning.

## Output
- Write `docs/scope-research/<slug>-research.md`
- Required sections:
  - `Current State Assessment`
  - `Workflow Trace`
  - `Project Slice Code Map`
  - `File Map`
  - `Structure Outline`
  - `Verified Facts`
  - `Design Question Evidence`
  - `Open Unknowns`
  - `Remaining Blocker`
  - `Plan Readiness`
- Optional sections:
  - `Time Boundary`
- Keep it dense; prefer ~50-100 lines unless the evidence truly needs more
- Include exact build/test commands and `file:line` evidence

## Must Preserve
- Research proves current state; it does not recommend a solution
- Structure outline is current-state only
- Primary file list stays tight; if it grows, say why
- Vault findings reused selectively
- Facts and unknowns stay separated

## Self-Check
- Bootstrap completed once per session
- Current-state assessment evidence-backed
- Build and test commands exact
- Every File Map row has `file:line`
- Workflow trace present when needed
- Design-question evidence records facts, not solutions
- Architecture constraints stay filtered to task-relevant guardrails
- Vault findings reused selectively
- End state says `Ready` or `Not Ready` explicitly

## Next Step
Write `docs/scope-research/<slug>-research.md`; usually next: `rpi-plan` only if `Plan Readiness` is `Ready`. `rpi-spec` is optional upstream, not a universal prerequisite.

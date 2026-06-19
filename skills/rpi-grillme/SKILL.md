---
name: rpi-grillme
description: Greenfield interrogator for brand-new or too-thin codebases. Use to resolve scope, terminology, stack, architecture, bootstrap shape, and first slice before planning.
---

# rpi-grillme
Pressure-test a new project idea or thin codebase until it is planning-ready.

**Role:** `greenfield-interrogator`. If `..\rpi-pipeline\rpi-pipeline.yml` is available, treat it as authoritative. If unavailable, use the rules in this skill and note the missing contract under `Constraints and Assumptions`.

## Use When
- Repo is absent, nearly empty, or too thin for honest `rpi-research`
- A new idea still needs terminology, boundary, stack, bootstrap, or first-slice decisions

## Do Not Use When
- Existing code can be inspected honestly; use `rpi-context` then `rpi-research`
- A raw requirement source still needs normalization or the foundation is already clear; use `rpi-spec` or `rpi-plan`

## Inputs
Load any available spec, user constraints, delivery context, hosting/runtime preferences, integrations, security/compliance limits, timeline pressure, and reference products or prior notes.
Treat thin repos or rough notes as signals only. Do not invent seams, files, or behavior.
Vault/session-memory lookups only: reuse session findings, prefer Decision notes, query sparingly, max 3 vault reads.
Carry forward only vault findings first loaded in this session that are not already captured in the current artifact draft.

## Interactive Contract
1. Analyze available input for ambiguity, overloaded terms, hidden assumptions, irreversible decisions, and fake certainty.
2. If no spec, constraints, or prior notes exist, start with: `In one sentence, what problem does this product solve and for whom?`
3. Ask one question at a time: the highest-leverage unresolved question.
4. Use this shape:
   ```
   Q<n>: <question>
   Why it matters: <execution or architecture consequence>
   Option A: <choice> — <tradeoff>
   Option B: <choice> — <tradeoff>
   Recommended: <choice> — <rationale>
   ➜ Approve, override, or clarify?
   ```
5. Wait for the user's answer before continuing.
6. If the user gives a non-answer (`I don't know`, `skip`, silence, or equivalent), record it under `Open Unknowns`, state a working assumption only if needed, then ask one narrower reframing question or move to the next highest-leverage topic.
7. After each substantive answer, restate it as one concrete decision, constraint, or unknown.
8. Then ask at most one challenge follow-up aimed at the most likely failure, rollback, retry, permission, migration, partial completion, or bad-input risk.
9. If the user approves the recommended choice and no material ambiguity remains, record it and move on. If the user overrides, blends options, or stays vague, pressure-test before moving on.
10. Challenge fuzzy terminology immediately.
11. Resolve naming, stack direction, data ownership, boundaries, bootstrap shape, and first vertical slice before planning.
12. Once terminology, stack direction, architecture shape, bootstrap shape, and first vertical slice are tentatively resolved, show a brief outline preview.
13. Before writing, run `Self-Check`. For each failed item, ask one targeted follow-up or mark the blocker under `Open Unknowns` and set `Plan Readiness` to `Not Ready`.
14. Only then write the foundation artifact.

## Execution Priorities
1. Terminology auditor — resolve overloaded terms
2. Constraint extractor — surface delivery, hosting, team, integration, cost, security, and time constraints
3. Decision shaper — narrow stack, architecture style, persistence, auth, deployment, and integration choices
4. Scenario prober — test happy path, edge cases, failure paths, rollback paths, and permission mismatches
5. Bootstrap cartographer — define repo shape, module boundaries, and exact bootstrap/build/test commands
6. Slice definer — define the first vertical slice
7. Risk/spike checker — isolate unresolved technical risk
8. Output validator — keep the artifact planning-ready
Relentless interrogator applies throughout: ask the hardest next question that collapses the most uncertainty.

## Output
Derive `<slug>` from the confirmed project name using kebab-case. If no project name has been confirmed by write time, ask: `What slug should I use for the output file? (example: my-project)`.
- Write `docs/scope-research/<slug>-foundation.md`
- Optional ADRs: `docs/adr/NNNN-[title].md`

Required sections:
- `Vision Summary`
- `Actor Model`
- `Goals and Non-Goals Alignment`
- `Terminology Decisions`
- `Constraints and Assumptions`
- `Decision Surface`
- `Recommended Stack`
- `Architecture Shape`
- `Bootstrap Shape`
- `Bootstrap Commands`
- `First Vertical Slice`
- `Risks and Spikes`
- `Open Unknowns`
- `Plan Readiness`

Optional sections: `Reference Signals`, `ADR Candidates`
Keep it dense. Target ~60-120 lines. Exceed 120 only when needed to capture multiple explicit decisions or unresolved spikes; prefer staying under 180 lines.

## Must Preserve
- Ask one question at a time
- Every recommendation includes rationale
- No fake `file:line` evidence when no real code exists
- Separate chosen decisions from open unknowns
- Keep product scope, architecture shape, and bootstrap shape distinct
- First vertical slice is small, demonstrable, and architecture-revealing

## Plan Readiness
Mark `Ready` only when terminology decisions are explicit where needed, the recommended stack and architecture shape are concrete enough to sequence work, bootstrap shape and exact bootstrap commands are explicit, the first vertical slice is defined, and remaining unknowns are isolated to non-blocking spikes. Mark `Not Ready` otherwise and list blockers.

## Self-Check
- If a spec exists, it was read first
- Major ambiguities were resolved or explicitly isolated
- Stack recommendation includes rationale
- Bootstrap commands are exact enough to start implementation
- First vertical slice is small, demonstrable, and architecture-revealing
- Output reads like a foundation artifact, not a task plan or speculative brainstorm

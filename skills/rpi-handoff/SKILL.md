---
name: rpi-handoff
description: Use only when the task explicitly asks for a formal RPI handoff artifact at `docs/scope-research/<slug>-handoff.md` so later RPI phases can resume from one file. Not for ordinary status updates, chat summaries, or lightweight pause notes.
disable-model-invocation: true
---
# rpi-handoff
Create or refresh one compact handoff artifact for an RPI workstream. No implementation.

**Role:** `handoff-curator`. Read `..\rpi-pipeline\rpi-pipeline.yml` for the authoritative phase order, gates, and handoff rules.

## Use When
- You are about to switch contexts or start a new session
- You want one small resume surface instead of re-reading the full artifact chain first
- An optional spec, source artifact, plan pack, or review already exists and you want the next phase pinned explicitly
- You need a durable handoff for yourself or another agent run

## Do Not Use When
- The work still lacks a clear slug or artifact location
- Current phase status is ambiguous or contradictory
- Required upstream artifacts are missing and the work is not ready for handoff
- You need to create the spec, research/foundation, or plan itself; use the appropriate RPI phase first

## Inputs
Resolve the work by `<slug>` and load the artifact chain that exists today.
Preferred order:
1. `docs/specs/<slug>.md` when present
2. source artifact: `docs/scope-research/<slug>-research.md` or `docs/scope-research/<slug>-foundation.md`
3. `docs/scope-research/<slug>-plan.md`
4. `docs/scope-research/<slug>-planned-structure.md`
5. `docs/scope-research/<slug>-design-discussion.md`
6. `docs/scope-research/<slug>-review.md` when present

If artifacts are staged outside a repo, keep the handoff beside that artifact set in the same `docs/scope-research/` folder.
Do not invent artifact paths. Reuse exact paths already in use.
Vault: optional and sparse; prefer session findings already in memory.

## Phase Duties
- **Artifact enumerator** — identify which RPI phases are complete and which artifact files are authoritative
- **Decision distiller** — compress the non-negotiable decisions, constraints, and defaults another phase must preserve
- **Next-step pinning** — state the exact next recommended RPI phase and the first concrete action to take
- **Validation curator** — carry forward the exact planned verification commands that matter next
- **Readiness gatekeeper** — if the chain is incomplete, say `Not Ready` and name the missing artifact or broken gate explicitly

## Execution
1. Determine the slug and artifact root.
2. Load the existing artifacts in pipeline order.
3. Identify the current completed phase and the recommended next phase from `rpi-pipeline.yml`.
4. Extract only the decisions and constraints that materially affect the next phase.
5. Capture the next concrete action, not a vague suggestion.
6. Write or refresh the handoff doc.
7. Include a copy-paste resume prompt that tells the next session which `rpi-*` skill to use.

## Output
Write `docs/scope-research/<slug>-handoff.md`.

Required sections:
- `Status`
- `Objective`
- `Source Artifact Chain`
- `Decisions Locked`
- `Constraints`
- `Next Step`
- `Implementation Scope` or `Review Scope` or `Open Scope` (pick the section title that matches the next phase)
- `Validation Commands`
- `Replan Triggers`
- `Resume Prompt`

### Section rules
- **Status** must include: current phase, recommended next phase, and readiness (`Ready` or `Not Ready`)
- **Objective** = 1-3 lines, no task list dump
- **Source Artifact Chain** = exact file paths, one line each
- **Decisions Locked** = bullets only; keep to things the next phase must not silently change
- **Constraints** = only active guardrails, not every historical note
- **Next Step** = exact first action for the next phase
- **Scope section** = summarize upcoming task/review/open items in terse bullets
- **Validation Commands** = exact commands if known; otherwise state why not yet available
- **Replan Triggers** = only triggers that would force routing back to an earlier RPI phase
- **Resume Prompt** = short copy-paste prompt naming the next `rpi-*` skill and this handoff file path

## Must Preserve
- Do not replace source artifacts; handoff is a summary pointer, not a substitute
- Do not invent files, symbols, commands, or acceptance coverage when spec exists, or source-contract coverage when it does not
- Do not hide missing artifacts behind optimistic wording; say `Not Ready`
- Keep exact artifact paths and phase names
- Keep the handoff compact enough that a new session can read it first
- If both `research` and `foundation` exist, state which one is authoritative for the next phase and why

## Self-Check
- Handoff path is correct and stable
- Current phase and recommended next phase match the pipeline contract
- Every listed decision or constraint is grounded in an existing artifact
- Next Step is concrete enough to start immediately
- Resume Prompt names the right next `rpi-*` skill
- Handoff stays concise and points to the full artifacts instead of duplicating them

## Next Step
Write `docs/scope-research/<slug>-handoff.md`; then the next session should read it first and continue with the named `rpi-*` phase.

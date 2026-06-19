---
name: rpi-plan
description: Use after a Ready research artifact or greenfield foundation artifact to resolve ambiguity, sequence tasks, and produce an execution plan plus design discussion. No code. Relentlessly asks material questions one at a time until the design is crisp enough to execute.
disable-model-invocation: true
---
# rpi-plan
Create a planning pack from a Ready research artifact or greenfield foundation artifact. No code.

**Role:** `delivery-architect`. Read `..\rpi-pipeline\rpi-pipeline.yml` for the authoritative contract.

**References** (load when needed):
- `references/example-session.md` — full iterative Q&A session walkthrough
- `references/output-format.md` — task breakdown automation format + required output sections per file

## Use When
- Research is `Ready` or greenfield foundation says `Plan Readiness: Ready`
- Work spans multiple files, contracts, or validation steps
- Material choices still need explicit user clarification before coding

## Do Not Use When
- Existing-code behavior still unproven → `rpi-research`
- Architecture/bootstrap decisions still unresolved → `rpi-grillme`
- Scope or acceptance criteria unclear → `rpi-spec`
- Ready to code from an approved pack → `rpi-implement`

## Inputs
Read and hold in working memory: optional spec plus the source artifact (`research` for brownfield, `foundation` for greenfield), build/test or bootstrap/test commands, remaining blocker, structure outline, design questions and evidence, host surface, local patterns, and architecture constraints.
Do not re-read broad repo context docs during planning. Vault: reuse session findings; max 3 reads; prefer Decision notes.

## Interactive Contract (Iterative Single-Question Mode)

1. **Analyze** the source artifact for unknowns, assumptions, design questions, and blockers.
2. **Identify blocking questions** — what would unblock the next step?
3. **Ask the MOST CRITICAL question first** (one per iteration):
   ```
   Q<n>: <question>

   Context: [Why this matters for execution]

   Option A: <choice> — <tradeoff> / <why>
   Option B: <choice> — <tradeoff> / <why>

   Recommended: <choice> — <rationale>

   ➜ Approve this recommendation, override, or clarify?
   ```
4. **Wait for user answer. Do not proceed to next question until answered.**
5. Synthesize answer. Ask next question. Repeat until no material ambiguities remain.
6. **Show outline preview** — validate user agrees with shape.
7. **Only then:** Write the final planning pack.

See `references/example-session.md` for a full worked example.

### Grilling Posture

- Default assumption: the first description is incomplete. Pressure-test it.
- Challenge fuzzy nouns and verbs immediately (platform, workspace, sync, simple, scalable → force precision).
- Turn each approved answer into an explicit invariant, boundary, dependency, or validation consequence.
- Prefer concrete scenarios: ask what happens on failure, retry, partial completion, rollback, permission mismatch, bad input.

### Key Rules

- **One question at a time.** Do not batch Q1–6. Ask Q1, wait, then ask Q2.
- **No fixed template.** Ask only what this project needs clarified.
- **Context-aware follow-ups.** Previous answers inform next question.
- **Stop when done.** If Q3 resolves all ambiguities, there is no Q4.

### Self-Check (Single-Question Mode)

- [ ] Questions asked one at a time, never batched
- [ ] Each answer explicitly informed the next question
- [ ] Questions emerged from actual ambiguity, not a fixed template
- [ ] Stopped when blocking ambiguities were resolved
- [ ] User approved/overrode each question before the next appeared
- [ ] Outline preview shown before final pack
- [ ] Outline reflected all user clarifications

---

## Phase Duties
- **Ambiguity audit** — enumerate every material unknown (not a checklist template).
- **Relentless interrogator** — one question, listen, then ask the hardest next question implied by the answer.
- **Terminology sharpener** — force canonical terms when the user's wording is overloaded or soft.
- **Scenario pressure-tester** — probe happy path, edge cases, failure modes, rollback consequences.
- **Outline preview** — show draft plan shape after all questions resolved.
- **Design discussion** — capture chosen shape, patterns, and resolved design questions.
- **Roadmap** — break work into atomic tasks with exact files, dependencies, rollback, parallel-safety, and review/risk signals.
- **Constraints** — identify invariants and compatibility risks with `file:line` evidence.
- **Validation** — for every task: test file, test name, assertion, and verify command.
- **Automation contract** — emit stable task metadata when plan supports orchestrated execution (see `references/output-format.md`).

## Output
Write the planning pack with one shared `<slug>`:
- `docs/scope-research/<slug>-plan.md` — execution source of truth
- `docs/scope-research/<slug>-planned-structure.md` — canonical planned file list + shape handoff
- `docs/scope-research/<slug>-design-discussion.md` — historical context for future code readers
- Optional ADRs: `docs/adr/NNNN-[title].md` for hard-to-reverse, surprising, traded decisions

Required sections and automation task format: see `references/output-format.md`.

## Must Preserve
- Planning pack must read from proven facts, not guesses
- No material ambiguity may remain unresolved or hidden behind silent assumptions
- Questions asked one at a time, not in batch; questions emerge from context, not fixed template
- Vault findings reused selectively

## Final Self-Check (Before Output)
- Research is `Ready`, or greenfield foundation says `Plan Readiness: Ready`
- Blocking ambiguity is `none` before final output
- Every ambiguity question had a concrete recommendation and rationale
- Fuzzy terms were challenged until canonical enough for execution
- User explicitly answered or approved the recommendation for every material clarification item
- User saw and reacted to open questions + outline
- Every task ties to a requirement or blocker
- Every task has a rollback condition
- Task blocks use stable `T<n>` ids and explicit metadata fields when automation support is needed
- Validation rows are specific and traceable
- Constraints have `file:line`
- Plan, planned structure, and design discussion tell the same story

## ADR Creation
Capture material architecture decisions as ADRs if they satisfy all three: (1) hard to reverse, (2) surprising without context, (3) result of real trade-off. Otherwise record in design discussion or code comments.

## Next Step
Write the full planning pack; usually next: `rpi-implement`, or `rpi-review` for a planning quality check. Route back to `rpi-research` for existing-code proof gaps or `rpi-grillme` for unresolved greenfield foundation gaps.

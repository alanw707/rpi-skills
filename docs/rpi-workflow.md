# RPI Workflow

RPI is a phased delivery workflow for using skills together instead of as isolated prompts.

It is designed to make the agent behave more like a disciplined teammate:
- understand the repo before changing it
- normalize formal or messy requirement inputs only when needed
- prove current state before planning
- grill ambiguity instead of planning from vibes
- execute only against an approved plan
- review the artifact chain, not just the code diff

---

## What RPI stands for

Short version in practice:
- **R** = requirements and repo reality
- **P** = proof and planning
- **I** = implementation with validation

The exact names of the skills matter more than the acronym:
- `rpi-context`
- `rpi-spec`
- `rpi-research`
- `rpi-grillme`
- `rpi-plan`
- `rpi-implement`
- `rpi-review`
- `rpi-handoff` (context-switch and session-pause utility)

---

## Two operating modes

## 1. Brownfield: existing codebase

Use this when the repo already exists and there is enough real code to inspect honestly.

**Default flow:**

```text
rpi-context -> rpi-research -> rpi-plan -> rpi-implement -> rpi-review
```

**With formal story / ticket / scattered requirements:**

```text
rpi-context -> [rpi-spec] -> rpi-research -> rpi-plan -> rpi-implement -> rpi-review
```

### Why this order
- `rpi-context` maps the repo once
- `rpi-spec` is optional and only normalizes raw or external requirement input
- `rpi-research` proves current state with real evidence
- `rpi-plan` grills remaining ambiguity and creates the execution pack
- `rpi-implement` executes only planned work in validated batches
- `rpi-review` checks artifact coherence plus the implementation

---

## 2. Greenfield: brand-new idea or too-thin repo

Use this when the repo does not exist yet, is nearly empty, or is too thin for honest current-state research.

**Default flow:**

```text
rpi-grillme -> rpi-plan -> rpi-implement -> rpi-context -> rpi-review
```

**With formal product requirement / scattered notes:**

```text
[rpi-spec] -> rpi-grillme -> rpi-plan -> rpi-implement -> rpi-context -> rpi-review
```

### Why this order
- `rpi-spec` is optional and only normalizes formal or messy requirement input
- `rpi-grillme` can act as the first real contract-maker for true greenfield work
- `rpi-plan` converts that foundation into an executable task pack
- `rpi-implement` builds the first real slice
- `rpi-context` comes after enough code exists to scan reality honestly
- `rpi-review` validates the chain and the resulting implementation

**Important:** `rpi-context` is phase 0 for existing repos, but not for repo-less ideas. It is intentionally reality-based.

## Decision rule for `rpi-spec`

Use `rpi-spec` when you have:
- an ADO story, ticket, PR feedback, or formal requirement doc
- scattered notes that need one clean contract
- acceptance criteria or non-goals that need explicit normalization before discovery

Skip `rpi-spec` when:
- scope is already clear enough to research directly in brownfield work
- `rpi-grillme` will establish the first real contract in greenfield work
- adding a spec would only restate what the source artifact already makes explicit

---

## Phase-by-phase summary

| Phase | Skill | Main job | Typical output |
|---|---|---|---|
| Repo context | `rpi-context` | Build durable repo maps and workflow docs | `docs/project-context.md`, `docs/project-structure.md`, `docs/state-graph.md` |
| Optional scope normalization | `rpi-spec` | Turn raw or formal requirement input into goals, non-goals, requirements, ACs | `docs/specs/<slug>.md` |
| Current-state proof | `rpi-research` | Prove what exists today with exact code evidence | `docs/scope-research/<slug>-research.md` |
| Greenfield interrogation | `rpi-grillme` | Pressure-test stack, terminology, boundaries, bootstrap, first slice | `docs/scope-research/<slug>-foundation.md` |
| Execution planning | `rpi-plan` | Grill remaining ambiguity, sequence tasks, define validation | `...-plan.md`, `...-planned-structure.md`, `...-design-discussion.md` |
| Controlled execution | `rpi-implement` | Implement only approved tasks in validated batches | code changes + resumable summary |
| Coherence + quality review | `rpi-review` | Check artifact chain, code quality, architecture opportunities | `docs/scope-research/<slug>-review.md` |
| **Utility** | **`rpi-handoff`** | **Compress artifact chain for session pause/resume** | **`...-handoff.md`** |

---

## Core idea: each phase has one job

## `rpi-context`
Use when:
- repo is new to the team
- context docs are missing or stale
- repeated work keeps rediscovering repo shape

Produces durable repo-level docs. Not story scope. Not code-level research.

## `rpi-spec`
Use when:
- the ask is raw, external, or scattered
- acceptance criteria are scattered
- you need one implementation-neutral contract before discovery

Optional pre-phase. Produces a compact spec. Not a plan.

## `rpi-research`
Use when:
- the codebase exists
- the task is non-trivial
- planning needs proof, not guesses

Produces current-state evidence. Not a solution.

## `rpi-grillme`
Use when:
- there is no honest codebase proof available yet
- the project is greenfield or nearly greenfield
- stack / architecture / terminology are still fuzzy

Produces a planning-ready foundation artifact. Not a task plan.

## `rpi-plan`
Use when:
- research says `Ready`, or foundation says `Plan Readiness: Ready`
- there is enough truth to task the work
- ambiguity still remains and must be interrogated

Produces the execution pack.

## `rpi-implement`
Use when:
- the plan is approved
- the file scope is known
- validation commands are known

Implements in small controlled batches.

## `rpi-review`
Use when:
- you want pre-implementation plan review
- or post-implementation coherence and code review

Routes findings back to the right phase.

## `rpi-handoff`
Use when:
- you are about to switch contexts or pause work
- you need one small resume surface instead of re-reading the full artifact chain
- you want exact next-step instructions pinned explicitly
- you need a durable handoff for another agent run or session

Creates a compact resume artifact. Do not use when required upstream artifacts are missing.

---

## Key artifacts

## Repo-level artifacts
Created by `rpi-context`:
- `docs/project-context.md`
- `docs/project-structure.md`
- `docs/state-graph.md`

## Task-level artifacts
Created by `rpi-spec` when used:
- `docs/specs/<slug>.md`

Created by `rpi-research`:
- `docs/scope-research/<slug>-research.md`

Created by `rpi-grillme`:
- `docs/scope-research/<slug>-foundation.md`

Created by `rpi-plan`:
- `docs/scope-research/<slug>-plan.md`
- `docs/scope-research/<slug>-planned-structure.md`
- `docs/scope-research/<slug>-design-discussion.md`

Created by `rpi-review`:
- `docs/scope-research/<slug>-review.md`

Created by `rpi-handoff`:
- `docs/scope-research/<slug>-handoff.md`

---

## The difference between `rpi-research`, `rpi-grillme`, and `rpi-plan`

This is the most important mental model.

## `rpi-research`
Question it answers:
- **What is true in the code today?**

If you need `file:line`, workflow traces, touched seams, and exact symbols, use this.

## `rpi-grillme`
Question it answers:
- **What must be decided before code can safely begin?**

If there is no honest current-state code evidence yet, use this.

## `rpi-plan`
Question it answers:
- **Given the proven or agreed foundation, what exact work should be done next?**

If you already have enough truth but still need task sequencing and validation, use this.

---

## What makes RPI different from ad hoc prompting

RPI intentionally avoids these failure modes:
- planning from fuzzy requirements
- inventing repo structure
- jumping straight to coding before proving assumptions
- vague "here's a plan" answers with no validation strategy
- code review with no traceability to requirements

It does this by separating:
- scope
- evidence
- decisions
- tasks
- implementation
- review

---

## Planning style: relentless, one question at a time

`rpi-plan` and `rpi-grillme` are intentionally proactive.

They should:
- ask the hardest uncertainty-reducing question first
- challenge vague terms immediately
- keep drilling if an answer opens another dependency chain
- pressure-test with failure, retry, rollback, boundary, permission, and bad-input scenarios
- avoid batching 5-10 shallow questions at once

This style is deliberate. It is meant to prevent fake certainty.

---

## Suggested team usage

## For an existing feature in an existing repo

```text
1. Run rpi-context if repo context is stale or missing.
2. If the source is a story/ticket/chat dump, run rpi-spec first.
3. Run rpi-research on the feature scope.
4. Run rpi-plan on the research artifact.
5. Run rpi-implement on the approved plan.
6. Run rpi-review before merge or after implementation.
```

## For a brand-new project idea

```text
1. If a formal requirement doc exists, run rpi-spec first; otherwise skip it.
2. Run rpi-grillme on the idea or spec.
3. Run rpi-plan on the foundation artifact.
4. Run rpi-implement for the first slice.
5. Run rpi-context once enough code exists to scan honestly.
6. Run rpi-review for coherence and quality.
```

---

## Example prompts

### Brownfield

```text
Use rpi-spec to turn this story into a change contract.
```

```text
Run rpi-research on this feature and prove the current state before planning.
```

```text
Run rpi-research for docs/specs/spec-123-example.md.
```

```text
Run rpi-plan on docs/scope-research/spec-123-example-research.md and grill me until the plan is execution-ready.
```

```text
Use rpi-implement for docs/scope-research/spec-123-example-plan.md and validate each task.
```

### Greenfield

```text
Use rpi-grillme on this app idea and grill me on stack, terminology, bootstrap shape, and first slice.
```

```text
Use rpi-spec to turn this PRD into a scoped spec before greenfield planning.
```

```text
Use rpi-grillme on docs/specs/my-app.md and grill me on stack, terminology, bootstrap shape, and first slice.
```

```text
Run rpi-plan on docs/scope-research/my-app-foundation.md and keep grilling until the task graph is crisp.
```

---

## When to route backward

Routing backward is a feature, not a failure.

Route back to:
- `rpi-spec` when a formal scope source changed or new external requirements must be normalized
- `rpi-research` when existing-code proof is missing or contradicted
- `rpi-grillme` when greenfield foundation decisions are still fuzzy
- `rpi-plan` when implementation invalidates the plan or opens a new branch of ambiguity

---

## Team guidance

If you adopt only three habits, make them these:
1. use `rpi-spec` only when requirement input actually needs normalization
2. do not plan from unproven assumptions
3. do not implement outside the planned file/task boundaries without explicitly routing back

That is where most of the value comes from.

---

## Related files

- [`rpi-context`](../skills/rpi-context/SKILL.md)
- [`rpi-spec`](../skills/rpi-spec/SKILL.md)
- [`rpi-research`](../skills/rpi-research/SKILL.md)
- [`rpi-grillme`](../skills/rpi-grillme/SKILL.md)
- [`rpi-plan`](../skills/rpi-plan/SKILL.md)
- [`rpi-implement`](../skills/rpi-implement/SKILL.md)
- [`rpi-review`](../skills/rpi-review/SKILL.md)
- [`rpi-handoff`](../skills/rpi-handoff/SKILL.md)
- [`rpi-pipeline`](../skills/rpi-pipeline/rpi-pipeline.yml)

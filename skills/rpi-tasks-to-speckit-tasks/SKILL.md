---
name: rpi-tasks-to-speckit-tasks
description: Convert RPI task list to Spec-Kit tasks format. Maps dependencies, parallelization markers, and phasing while ensuring task independence, explicit file paths, and checkpoint validation.
disable-model-invocation: true
---

# rpi-tasks-to-speckit-tasks

Convert an RPI-format task list to Spec-Kit task format for organizational compatibility and spec-kit execution.

**Role**: task translator / execution normalizer.

**References** (load when needed):
- `templates/spec-kit-tasks.md` — target `tasks.md` structure
- `references/phase-and-checkpoint-rules.md` — required phase order and checkpoint rules
- `references/dependency-and-parallelism.md` — `[P]` marking and dependency rules
- `references/execution-strategies.md` — MVP-first, incremental, and parallel-team strategies
- `references/faq.md` — common sequencing questions

## Use When
- an RPI task list is ready to execute
- tasks need conversion to spec-kit format for delegation or organizational standards
- next step is execution, staffing, or review of the task plan
- you want to preserve RPI dependencies and parallelization hints

## Do Not Use When
- there is no task list yet; finish `rpi-plan` first
- work will execute directly from RPI without spec-kit translation
- tasks are still being sequenced or clarified

## Before Starting
1. Locate tasks in `docs/scope-research/<slug>-plan.md` (`## Task Breakdown`) or a separate extracted task file if your workflow made one.
2. Keep the matching spec-kit plan ready: `specs/[###-slug]/plan.md`.
3. Keep the matching spec-kit spec ready: `specs/[###-slug]/spec.md`.
4. Verify the source tasks have explicit descriptions, file paths, dependencies, and story assignment or equivalent grouping.

## Workflow

### 1. Source Validation
Verify:
- every task has a clear description
- file paths are explicit
- dependencies are documented
- story assignment or phase grouping is clear

If gaps remain, **stop** and return to `rpi-plan`.

### 2. Phasing Structure
Organize tasks into spec-kit phases:
1. **Setup** — scaffold, dependencies, config
2. **Foundational** — shared blocking prerequisites
3. **User Story phases** — one per priority or story group
4. **Polish** — docs, refactors, performance, cross-cutting hardening

No user story work starts before Foundational is complete.

### 3. Task Format Conversion
Convert each RPI task to:
- `[ID] [P?] [Story] Description`

Rules:
- use sequential IDs (`T001`, `T002`, ...)
- mark `[P]` only when the task is truly parallel-safe
- include exact file paths and expected action
- keep tasks small enough to complete in roughly 1–4 hours when possible

### 4. Dependency Mapping
Preserve and surface:
- phase-to-phase ordering
- within-story ordering
- blocking dependencies between tasks
- parallel opportunities for different files or isolated contracts

Create a **Dependencies & Execution Order** section in the output.

### 5. Checkpoint Definition
After each phase and each user story, define what done means.
Use `references/phase-and-checkpoint-rules.md`.
Each story checkpoint should prove the story is independently testable.

### 6. Testing Strategy Preservation
If the source plan is test-first:
- put test tasks before implementation tasks inside the same story
- require tests to fail before implementation starts
- keep validation tied to the user-story checkpoint

### 7. Story Independence Verification
Verify each user story can be:
- implemented independently
- tested in isolation
- deployed or demoed without hidden dependence on optional stories

If not, document the dependency explicitly.

## Output Contract

Write only:
- `specs/[###-slug]/tasks.md`

RPI keeps tasks embedded in `docs/scope-research/<slug>-plan.md`; do not invent a separate RPI output unless the broader workflow already created one.

Use `templates/spec-kit-tasks.md` as the target structure.
Use the reference files for phase ordering, dependency handling, checkpoint definitions, and execution strategy.

## Self-Check
- setup, foundational, user-story, and polish phases are clearly separated
- no user story work begins before foundational work completes
- every task has explicit file paths and a concrete action
- `[P]` markers appear only on truly parallel-safe tasks
- dependencies are visible, not implicit
- each user story has an independent checkpoint
- tests appear before implementation when the plan is test-first
- output reads like an executable task list, not an architecture document

## Next Steps
1. Share `specs/[###-slug]/tasks.md` with implementers or spec-kit agents.
2. Execute by phase and stop at each checkpoint.
3. Replan if hidden dependencies or oversize tasks emerge.
4. Run `rpi-review` or other post-implementation validation after execution.

---

**Skill role**: Translator (RPI → Spec-Kit tasks)
**Input artifact**: task list embedded in `docs/scope-research/<slug>-plan.md`
**Output artifact**: `specs/[###-slug]/tasks.md`
**Note**: RPI keeps tasks embedded in the plan; this adapter primarily creates the spec-kit task file.
**Next step**: execute by phase and validate at each checkpoint

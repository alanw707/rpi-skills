# rpi-plan — Output Format Reference

## Task Breakdown Automation Format

When a plan may be consumed by automation, each task block under `## Task Breakdown` must use this stable shape:

```md
### T1. Short task title
- Files: `path/a`, `path/b`
- Action: concise execution intent
- Depends on: none | T0, T3
- Rollback: how to back out safely
- Parallel: yes | no
- Risk: low | medium | high
- Review required: yes | no
- Verify: exact command
```

### Task block rules

- Task ids must be stable `T<n>` labels.
- `Depends on` must reference prior task ids or `none`.
- `Parallel` means safe to run concurrently **if** no runtime file overlap appears.
- `Risk` is the planner's default risk classification.
- `Review required` is the planner's explicit review gate.
- `Verify` must be an exact runnable command when one exists.
- If a separate `## Validation` table exists, keep the `Task` column aligned to the same `T<n>` ids.

---

## Required Sections Per Output File

### `<slug>-plan.md`

Plan Status, Preconditions, Clarifications Resolved, Design Summary, Structure Summary (concise current + planned + responsibilities + dependencies summary), Solution Path, Task Breakdown, Requirements Traceability, Constraints, Validation, Replan Triggers.

Keep tight: ~50–100 lines for execution.

### `<slug>-planned-structure.md`

Scope and Intent, Current Shape, Planned Shape, File List, Responsibility Changes, Dependency Notes, Review Diff Basis.

Keep tight: ~30–80 lines for file scope and shape.

### `<slug>-design-discussion.md`

Context Summary, Design Goals, Proposed Solution Shape, Intended Placement, Architecture Patterns, Design Questions and Answers, Tradeoffs and Rejected Options, Follow-Up Decisions.

Keep tight: ~50–100 lines for reasoning.

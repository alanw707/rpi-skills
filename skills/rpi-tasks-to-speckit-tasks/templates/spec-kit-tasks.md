# Spec-Kit Tasks Template

```markdown
# Tasks: [FEATURE NAME]

**Input**: RPI plan from `docs/scope-research/<slug>-plan.md` + spec from `specs/[###-slug]/spec.md`

**Prerequisites**: `plan.md` required, `spec.md` required for user stories, `research.md` if brownfield

**Tests**: Write tests FIRST, ensure they FAIL before implementation, then implement to make them PASS

**Organization**: Tasks grouped by user story so each story can be implemented and tested independently.

## Format: `[ID] [P?] [Story] Description`

- **[ID]**: `T001`, `T002`, ...
- **[P]**: can run in parallel
- **[Story]**: `Setup`, `Foundational`, `US1`, `US2`, `US3`, `Polish`
- include exact file paths in descriptions
- aim for tasks completable in 1–4 hours

---

## Phase 1: Setup
[shared infrastructure tasks]

**Checkpoint**: project scaffold ready, dependencies installed, dev environment configured

## Phase 2: Foundational
[blocking prerequisites only]

**Checkpoint**: core infrastructure ready; user story work can begin

## Phase 3+: User Stories
One phase per user story / priority band:
- tests first
- implementation second
- checkpoint after each story proving independent testability

## Final Phase: Polish
[documentation, refactoring, performance, security, cross-cutting cleanup]

## Dependencies & Execution Order
- phase ordering
- story ordering or independence
- within-story ordering
- parallel opportunities

## Notes
- `[P]` means no blocking dependency and no overlapping files
- stop at each checkpoint and validate before continuing
```

# Dependency and Parallelism Rules

## Task format
Convert each task to:
- `[ID] [P?] [Story] Description`

Where:
- `[ID]` = `T001`, `T002`, ...
- `[P]` = parallel-safe task
- `[Story]` = story or phase label
- Description includes exact file paths, clear action, expected output

## Dependency mapping
Extract and preserve:
- blocking dependencies (`Task X` must finish before `Task Y`)
- within-story ordering (tests → models → services → endpoints → cleanup)
- phase-to-phase ordering

Create a **Dependencies & Execution Order** section showing:
- phase order
- story independence or coupling
- within-story ordering rules
- parallel opportunities

## Mark a task `[P]` only when
- it does not share runtime file overlap with sibling tasks
- it has no unsatisfied blocking dependency
- it does not mutate the same contract or schema as another parallel task

## Story independence verification
Verify each user story can be:
- implemented independently
- tested in isolation
- deployed or demoed without hidden dependence on other optional stories

If not, document the dependency explicitly.

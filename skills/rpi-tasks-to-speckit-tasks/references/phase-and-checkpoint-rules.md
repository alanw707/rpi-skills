# Phase and Checkpoint Rules

## Required phase order
1. **Setup** — project initialization, dependencies, config
2. **Foundational** — shared blocking prerequisites; no user story work starts before this is complete
3. **User Story phases** — one phase per priority or story cluster
4. **Polish** — docs, refactors, performance, cross-cutting hardening

## Checkpoint rules

Define what "done" means after each phase:
- **Setup**: scaffold exists, tools installed, basic commands run
- **Foundational**: shared infrastructure exists and user stories can start safely
- **Each User Story**: independently testable; stakeholder demo / deploy possible in isolation
- **Polish**: desired stories complete, cleanup and validation complete, ready for release or handoff

## Testing order
If the RPI plan implies test-first work:
- create test tasks before implementation tasks in the same story
- explicitly require tests to fail before implementation starts
- keep validation tied to the story checkpoint

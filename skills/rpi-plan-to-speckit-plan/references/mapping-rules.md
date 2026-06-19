# RPI Plan → Spec-Kit Plan Mapping Rules

| RPI Section | Spec-Kit Section | Conversion Rule |
|---|---|---|
| Technical Context | Technical Context | Copy directly; mark unclear items with `[NEEDS CLARIFICATION]` |
| Architecture Decisions | Design Decisions | Extract core patterns and rationale, not code-level detail |
| Data Model | Data Model | Preserve entities and relationships, not schema DDL |
| Complexity Justification | Complexity Tracking | Preserve violations + why simpler options were rejected |
| Project Structure | Project Structure | Copy the selected structure and preserve rationale |
| Assumptions | Risk & Assumption Review | Preserve dependencies, timeline assumptions, external constraints |
| Blockers / Unknowns | Risk & Assumption Review | Surface deferred decisions and unresolved risks |

## Required technical-context fields
- Language/Version
- Primary Dependencies
- Storage
- Testing
- Target Platform
- Project Type
- Performance Goals
- Constraints
- Scale/Scope

## Dual-output rule
After writing `specs/[###-slug]/plan.md`, also:
1. mirror full content to `docs/scope-research/<slug>-plan.md`
2. extract `docs/scope-research/<slug>-planned-structure.md`
3. extract `docs/scope-research/<slug>-design-discussion.md`

# Spec-Kit Plan Template

```markdown
# Implementation Plan: [FEATURE NAME]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link to spec.md]

**Input**: RPI plan from `docs/scope-research/<slug>-plan.md` + spec from `specs/[###-slug]/spec.md`

## Summary

[2-3 sentence summary of primary requirement + technical approach from RPI]

## Technical Context

**Language/Version**: [value or NEEDS CLARIFICATION]
**Primary Dependencies**: [value or NEEDS CLARIFICATION]
**Storage**: [value or N/A]
**Testing**: [value or NEEDS CLARIFICATION]
**Target Platform**: [value or NEEDS CLARIFICATION]
**Project Type**: [value or NEEDS CLARIFICATION]
**Performance Goals**: [value or NEEDS CLARIFICATION]
**Constraints**: [value or NEEDS CLARIFICATION]
**Scale/Scope**: [value or NEEDS CLARIFICATION]

## Constitution Check

_GATE: Must pass before execution. Re-check during implementation._

- [ ] Project count within org limits (or justified in Complexity Tracking)
- [ ] Tech stack approved by org
- [ ] Performance constraints met or documented
- [ ] Testing strategy meets org standards
- [ ] Data handling complies with org policy

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── spec.md
├── plan.md
├── research.md         # if brownfield
├── data-model.md       # if applicable
├── contracts/          # if applicable
└── tasks.md
```

### Source Code (repository root)

Select the applicable structure and remove the rest:
- single project
- web application
- mobile + API

**Structure Decision**: [selected option + rationale]

## Complexity Tracking

> Fill only if constraints or constitution violations need explicit justification

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| ... | ... | ... |

## Design Decisions

### Core Architecture
[high-level design decisions]

### Key Design Patterns
[patterns chosen and why]

### Data Model (if applicable)
[key entities and relationships, not DDL]

### Security & Performance Considerations
[non-functional choices and trade-offs]

## Risk & Assumption Review
[assumptions, risks, blockers, unknowns]

## Next Steps
1. Generate tasks using `rpi-tasks-to-speckit-tasks`
2. Execute tasks per phasing
3. Validate each user story independently
4. Run `rpi-review` post-implementation

## Notes
* Converted from RPI plan: `docs/scope-research/<slug>-plan.md`
* Preserves design decisions and complexity justifications
* Constitution Check should be validated before development begins
* Coordinates with spec: `specs/[###-slug]/spec.md`
```

# RPI Spec → Spec-Kit Spec Mapping Rules

## Section mapping

| RPI Section | Spec-Kit Section | Conversion Rule |
|---|---|---|
| Goals | User Scenarios | Extract each goal as a titled story; order by priority |
| Non-Goals | Story boundaries | Use to constrain scope; mention only when helpful |
| Requirements | Functional Requirements (`FR-###`) | Copy directly; mark unclear items with `[NEEDS CLARIFICATION]` |
| Acceptance Criteria | Acceptance Scenarios | Reformat as Given-When-Then scenarios |
| Design Questions | Clarification markers | Carry unresolved items into output as `[NEEDS CLARIFICATION: ...]` |
| Data/State | Key Entities | Describe entities and relationships without implementation |
| Success Metrics | Success Criteria (`SC-###`) | Keep measurable, observable outcomes |
| Risks & Unknowns | Assumptions | Translate blockers and dependencies into explicit assumptions |
| Edge Cases | Edge Cases | Copy directly and tighten wording if needed |

## Priority mapping

- **P1** = MVP / must-have / core value
- **P2** = important / significant capability
- **P3** = nice-to-have / later iteration

## Clarification propagation

Search for all of:
- `[NEEDS CLARIFICATION]`
- `?` inside requirements / acceptance criteria
- `TODO`
- `TBD`

Carry each unresolved item into the spec-kit output so `/speckit.clarify` can run next.

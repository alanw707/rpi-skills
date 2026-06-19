# ADR Format

## Template

```markdown
# ADR-NNNN: [Title - Concise decision name]

**Status:** Accepted | Proposed | Deprecated | Superseded  
**Date:** YYYY-MM-DD  
**Deciders:** [Names]  
**Consulted:** [Names]  
**Informed:** [Names]  

## Context

The issue motivating this decision, and any constraints or forces that affect the decision.

## Decision

What we decided to do.

## Rationale

Why we made this decision (the trade-offs we considered and why we chose this approach over alternatives).

### Alternatives Considered
- **Option A:** [description] — rejected because [reason]
- **Option B:** [description] — rejected because [reason]

## Consequences

### Positive
- [consequence 1]
- [consequence 2]

### Negative
- [consequence 1]
- [consequence 2]

## Related Decisions
- [Links to related ADRs or decisions]

## References
- [Links to relevant docs, issues, PRs, or discussions]
```

## Naming Convention

Number ADRs sequentially: `0001-`, `0002-`, etc.

Use kebab-case for filenames: `docs/adr/0001-event-sourced-orders.md`

## When to Create an ADR

Create an ADR only when **all three** are true:

1. **Hard to reverse** — the cost of changing your mind later is meaningful
2. **Surprising without context** — a future reader will wonder "why did they do it this way?"
3. **Result of a real trade-off** — there were genuine alternatives and you picked one for specific reasons

If any of the three is missing, skip the ADR and record the decision in a comment, ticket, or PR instead.

## When NOT to Create an ADR

- Trivial implementation choices (e.g., "use this library helper")
- Reversible decisions (e.g., "add a field to a struct")
- Obvious choices with no alternatives (e.g., "fix this bug")
- Local code patterns that don't affect architecture
- Decisions that don't affect future maintainers or new contributors

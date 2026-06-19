# rpi-plan — Example Planning Session

This is an example of the iterative single-question planning flow for a strict validation project.

```
Analyzing research...
Found ambiguities:
  - Entry validation strategy (strict vs. lazy)
  - Error propagation model (exceptions vs. results)
  - Transaction scope (per-operation vs. batch)
  - Testing focus (unit vs. integration)

Q1: Should validation happen at entry (strict/fail-fast) or inline (lazy/progressive)?

Context: This affects error recovery, transaction scope, and user experience.

Strict validation:
  + Fail immediately on invalid input
  + Single validation point
  + Clear responsibility boundary
  - More code upfront

Lazy validation:
  + Better UX (accept input, validate progressively)
  + Minimal validation overhead
  - Errors surface later in execution
  - Harder to reason about state

Recommended: STRICT. API code should fail fast at boundary.

➜ Approve this recommendation, override, or clarify?

[User: "Approve — strict is right for this API"]

---

Q2: Given strict entry validation, should we validate BEFORE or AFTER starting the database transaction?

Context: This affects rollback scope and error handling.

Before transaction:
  + Fail without touching DB
  + Cleaner error path
  - Extra DB round-trip if validation fails

After transaction:
  + Single database interaction
  - More DB work if validation fails

Recommended: BEFORE. Validation shouldn't touch DB; fail first.

➜ Approve?

[User: "Approve"]

---

Q3: Should we cache validation results for retries, or re-validate each attempt?

Context: Batch operations may retry multiple times.

Cache:
  + Avoid redundant validation work
  - Extra state to track

Re-validate:
  + Simple, stateless
  - Redundant validation on each retry

Recommended: CACHE. Validation is deterministic; no reason to repeat.

➜ Approve?

[User: "Approve"]

---

No more material ambiguities. All blocking questions resolved.

Outline Preview (before final pack):

  Preconditions:
    - Input parsed + in memory
    - DB connection open

  Step 1: Validate input (strict, at entry)
    Files: ValidationService.cs
    Validation rules: [list]
    Error: throw ValidationException

  Step 2: Call repository to [operation]
    Files: Repository.cs
    Transaction: wrapped, single
    Rollback: on any exception

  Step 3: Return result
    Files: ApiController.cs
    Format: JSON + status code

  ✓ Confirm this outline. Proceed to final pack?

[User: "Confirm"]

→ Writing final planning pack (plan + planned structure + design discussion)...
```

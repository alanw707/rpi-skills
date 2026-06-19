---
name: rpi-plan-to-speckit-plan
description: Convert RPI plan format (internal design + sequencing) to Spec-Kit plan format (organizational standard). Maps technical context, design decisions, and project structure while preserving execution clarity.
disable-model-invocation: true
---

# rpi-plan-to-speckit-plan

Convert an RPI-format plan to Spec-Kit format for organizational compatibility and spec-kit execution.

**Role**: design translator / plan normalizer.

**References** (load when needed):
- `templates/spec-kit-plan.md` — target spec-kit `plan.md` structure
- `templates/rpi-planned-structure.md` — extracted RPI structure artifact shape
- `templates/rpi-design-discussion.md` — extracted RPI design-discussion artifact shape
- `references/mapping-rules.md` — section mapping + dual-output contract
- `references/example-conversion.md` — full worked example
- `references/faq.md` — edge cases and rerun guidance

## Use When
- `rpi-plan` is complete and design is crisp enough to execute
- next step is spec-kit task generation or org review
- you want to preserve RPI design decisions and complexity justifications in spec-kit format

## Do Not Use When
- the RPI plan is still under interrogation or ambiguity resolution
- you need executable task conversion immediately instead of design translation
- output feeds only `rpi-implement` and no spec-kit workflow is needed

## Before Starting
1. Locate `docs/scope-research/<slug>-plan.md`.
2. Verify the plan has technical context, architecture decisions, project structure, and any complexity justification.
3. Have the related spec-kit spec ready: `specs/[###-slug]/spec.md`.
4. Set the spec-kit target path: `specs/[###-slug]/plan.md`.

## Workflow

### 1. Source Validation
Verify the RPI plan contains:
- technical context (language, framework, storage, testing)
- clear architecture decisions
- project structure decision
- justified complexity or explicit note that none exists

If gaps remain, **stop** and return to `rpi-plan`.

### 2. Summary Extraction
Extract the primary requirement and technical approach.
Write a concise 2–3 sentence summary suitable for spec-kit readers.

### 3. Technical Context Mapping
Copy or normalize these fields into spec-kit format:
- Language/Version
- Primary Dependencies
- Storage
- Testing
- Target Platform
- Project Type
- Performance Goals
- Constraints
- Scale/Scope

If a field is unclear, mark it `[NEEDS CLARIFICATION]`.

### 4. Constitution Check
Map RPI constraints to org-level execution gates.
- preserve any explicit standards or limits from the RPI plan
- document violations in Complexity Tracking
- if no org constitution exists, keep the section as a placeholder gate list

### 5. Project Structure Preservation
Preserve the selected structure and why it was chosen.
Common shapes:
- single project
- web application
- mobile + API

Keep rationale, not just the tree.

### 6. Complexity Tracking
If the plan justified exceptions or extra complexity, preserve:
- the violation / exception
- why it is needed
- why a simpler option was rejected

### 7. Dual RPI Output Extraction
After writing spec-kit `plan.md`, also produce compatible RPI artifacts:
1. `docs/scope-research/<slug>-plan.md` — mirrored full plan content
2. `docs/scope-research/<slug>-planned-structure.md` — extracted structure artifact
3. `docs/scope-research/<slug>-design-discussion.md` — extracted design context artifact

Use the templates in `templates/rpi-planned-structure.md` and `templates/rpi-design-discussion.md`.

## Output Contract

Write:
- `specs/[###-slug]/plan.md`
- `docs/scope-research/<slug>-plan.md`
- `docs/scope-research/<slug>-planned-structure.md`
- `docs/scope-research/<slug>-design-discussion.md`

Use `templates/spec-kit-plan.md` as the primary plan structure.
Use `references/mapping-rules.md` for section-by-section conversion.

## Self-Check
- technical context is complete or intentionally marked unclear
- architecture decisions stay design-level, not code-level
- project structure is clear and matches the selected repo shape
- RPI design decisions and rationale were preserved
- complexity exceptions are justified when present
- data model shows entities + relationships, not schema DDL
- security and performance considerations are explicit
- risks, assumptions, blockers, and unknowns are surfaced
- constitution gates exist, even if only placeholders
- output reads like an architectural review document, not a task list

## Next Steps
1. Share the spec-kit plan for architecture or org review.
2. Validate constitution gates before execution.
3. Run `rpi-tasks-to-speckit-tasks` to generate executable tasks.
4. Or continue in RPI execution if spec-kit tasks are not needed.

---

**Skill role**: Translator (RPI → Spec-Kit plan)
**Input artifact**: `docs/scope-research/<slug>-plan.md`
**Output artifacts**:
- `specs/[###-slug]/plan.md`
- `docs/scope-research/<slug>-plan.md` (mirrored full plan)
- `docs/scope-research/<slug>-planned-structure.md`
- `docs/scope-research/<slug>-design-discussion.md`
**Next skill in chain**: `rpi-tasks-to-speckit-tasks` or `/speckit.tasks`

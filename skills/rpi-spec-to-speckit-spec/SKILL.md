---
name: rpi-spec-to-speckit-spec
description: Convert RPI spec format (internal discovery) to Spec-Kit spec format (organizational standard). Maps goals→user stories, requirements→FR-###, acceptance criteria→Given-When-Then scenarios, and questions→NEEDS CLARIFICATION markers.
disable-model-invocation: true
---

# rpi-spec-to-speckit-spec

Convert an RPI-format spec to Spec-Kit format for organizational compatibility.

**Role**: format translator / spec normalizer.

**References** (load when needed):
- `templates/spec-kit-spec.md` — target spec structure
- `references/mapping-rules.md` — section mapping, priority rules, clarification propagation
- `references/example-conversion.md` — full worked conversion example
- `references/faq.md` — edge cases and rerun guidance

## Use When
- `rpi-spec` is complete and you want spec-kit format
- `rpi-research` findings already inform a mature spec
- open design questions are resolved or explicitly marked
- next step is spec-kit planning or org review

## Do Not Use When
- the RPI spec is still draft or under clarification
- you need executable task mapping instead of spec translation
- output feeds only `rpi-implement` and no spec-kit workflow is needed

## Before Starting
1. Locate the completed RPI spec under `docs/specs/`.
2. If brownfield, keep the related `docs/scope-research/<slug>-research.md` nearby for context.
3. If ambiguity remains, return to `rpi-spec` or `rpi-plan` first.
4. Pick the spec-kit target path: `specs/[###-slug]/spec.md`.
   - `[###]` = next sequential 3-digit number from `specs/`
   - `[slug]` = URL-safe feature name

## Workflow

### 1. Source Validation
Verify the RPI spec has:
- goals
- non-goals
- clear requirements or explicit `[NEEDS CLARIFICATION]`
- observable, testable acceptance criteria
- resolved design questions or clearly captured unknowns

If gaps remain, **stop** and return to `rpi-spec`.

### 2. User Story Extraction
- Convert each RPI goal or scoped requirement cluster into a user story.
- Assign priority:
  - **P1** = MVP / must-have / core value
  - **P2** = important / significant capability
  - **P3** = nice-to-have / later iteration
- For each story include:
  - title
  - plain-language description
  - why this priority
  - independent test
  - acceptance scenarios rewritten in Given-When-Then form

### 3. Requirements + Entity Mapping
- Convert RPI requirements into `FR-###` functional requirements.
- Preserve wording where possible.
- Mark unclear items with `[NEEDS CLARIFICATION: ...]`.
- If the source includes Data / State, create a Key Entities section with entities, attributes, and relationships — no implementation detail.

### 4. Success Criteria Mapping
- Convert measurable success metrics or acceptance outcomes into `SC-###` success criteria.
- Keep them observable and testable.

### 5. Clarification Marker Propagation
Scan the source for unresolved items:
- `[NEEDS CLARIFICATION]`
- `?` in requirements or acceptance criteria
- `TODO`
- `TBD`

Carry each unresolved item into the spec-kit output so `/speckit.clarify` can run next.

### 6. Assumptions + Edge Cases
- Translate RPI Risks & Unknowns into Assumptions.
- Copy RPI Edge Cases into the Edge Cases section.
- Preserve scope boundaries and dependency assumptions.

## Output Contract

Write the spec-kit-formatted content to:
1. `specs/[###-slug]/spec.md`
2. `docs/specs/<slug>.md` (mirror copy for RPI compatibility)

Use `templates/spec-kit-spec.md` as the target structure.
Use `references/mapping-rules.md` for section-by-section conversion rules.

## Self-Check
- all RPI goals map to at least one user story
- every story has a priority and independent test
- all requirements appear in `FR-###`
- acceptance criteria became Given-When-Then scenarios
- unresolved items were preserved as clarification markers
- key entities extracted when the feature is data-heavy
- success criteria are measurable
- output reads like a spec, not a plan
- feature branch naming matches org convention

## Next Steps
1. Share `specs/[###-slug]/spec.md` with stakeholders.
2. Run `/speckit.clarify` for unresolved items.
3. Run `/speckit.plan` for implementation planning.
4. Or stay in RPI and continue with `rpi-plan`, then convert later.

---

**Skill role**: Translator (RPI → Spec-Kit spec)
**Input artifact**: `docs/specs/<slug>.md`
**Output artifacts**:
- `specs/[###-slug]/spec.md`
- `docs/specs/<slug>.md` (mirrored spec-kit content for compatibility)
**Next skill in chain**: `rpi-plan-to-speckit-plan` or `/speckit.plan`

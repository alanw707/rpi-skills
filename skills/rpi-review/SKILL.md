---
name: rpi-review
description: Use after rpi-implement (post-implementation) or rpi-plan (planning review) to validate the rpi artifact chain, perform a two-axis code review on the touched slice, and surface inline architecture deepening opportunities — every finding routed back to the originating rpi phase, including `rpi-grillme` when greenfield foundation gaps remain.
steps:
  - { id: git-context-preflight,    required: true }
  - { id: load-artifacts,           required: true }
  - { id: artifact-coherence,       required: true }
  - { id: parallel-code-and-arch,   required: false }
  - { id: aggregate-report,         required: true }
---

# rpi-review
Validate the rpi artifact chain and code. Two modes: **post-implementation** (artifact coherence + code review + architecture) and **planning review** (artifact coherence only).

**Role:** `post-implementation-reviewer`. Read `..\rpi-pipeline\rpi-pipeline.yml` for the authoritative contract.

## Use When
- Post-implementation: validate code, artifact integrity, and architecture on the touched slice
- Planning review: catch artifact gaps before coding starts

Skip when any required artifact is missing, the change is trivial, or the request is a standalone PR review — use the appropriate direct review skill instead (for example `dotnet-code-review`).

## Inputs
Resolve by `<slug>`: optional `docs/specs/<slug>.md`, source artifact (`docs/scope-research/<slug>-research.md` for brownfield or `docs/scope-research/<slug>-foundation.md` for greenfield), `docs/scope-research/<slug>-plan.md`, `docs/scope-research/<slug>-design-discussion.md`, `docs/scope-research/<slug>-planned-structure.md`. Post-impl: code diff defaults to planned-structure file list; ask for explicit diff base only if absent.

## Preflight
1. Confirm mode before loading artifacts.
2. Post-impl: verify git context (`git-context-check`). Do not continue from mismatched worktree.
3. Confirm all required artifacts exist; stop and return to missing phase if not.
4. Vault: reuse session findings; max 2 reads.

## Pass 1 — Artifact Coherence (both modes)
- **Spec → Source Artifact** *(when spec exists)*: ACs, scope assumptions, and design questions grounded honestly?
- **Source Artifact → Plan**: Tasks trace to verified facts or explicit foundation decisions? No unproven seams or hand-wavy bootstrap gaps?
- **Plan → Implementation** *(post-impl)*: Decisions honored? Replan triggers documented? Design questions reopened?
- **Coverage Traceability**: If spec exists, every AC label is traceable spec → plan validation → implementation. If no spec exists, trace source-artifact goals/decisions → plan validation → implementation.

## Pass 2 — Code Review (post-impl only)
Two-axis review on planned-structure files. Standards: `AGENTS.md`, `CONTRIBUTING.md`, `docs/adr/`, project skill files. Scope contract axis: ACs from spec + plan validation rows when spec exists; otherwise source-artifact goals/decisions + plan validation rows. If the plan defines stable task metadata (`T<n>`, `Risk`, `Review required`, `Depends on`, `Verify`), use those fields directly in the coverage/review narrative rather than re-inferring them. Run Standards and scope-contract passes separately or in parallel with the normal session tooling. Keep each under 400 words.

## Pass 3 — Architecture Inline (post-impl only)
Deletion-test scan on touched slice. Max 3–5 candidates, inline prose. Each: files, friction signal, deepened shape, recommendation (`Strong` / `Worth exploring` / `Speculative`). Run in parallel with Pass 2.

## Execution
Pass 1 first. Post-impl: Passes 2+3 in parallel after. Planning review: stop after Pass 1.

## Output
Write `docs/scope-research/<slug>-review.md`. Required sections: Mode, Artifact Coherence (checks table + AC coverage table when spec exists, otherwise source-artifact coverage table), Code Review *(post-impl)*, Architecture Opportunities *(post-impl)*, Summary (totals + route destinations + next step). Every finding carries a **route label**: `→ rpi-spec` | `→ rpi-research` | `→ rpi-grillme` | `→ rpi-plan` | `→ rpi-implement` | `→ improve-codebase-architecture` | `→ defer` (requires reason). When a plan defines stable task ids, cite the relevant `T<n>` in findings and summary coverage. Keep under 100 lines.

## Must Preserve
- Pass 1 before Passes 2+3; every finding has route label
- If spec exists, AC traceability covers every spec AC; otherwise coverage traces source-artifact goals/decisions; planning-review mode skips code + arch
- If the plan defines stable task ids/metadata, review findings preserve those ids instead of renaming task scope ad hoc
- Architecture candidates cite files/symbols; `→ defer` always has reason
- Vault findings reused selectively

## Self-Check
- Mode confirmed, artifacts loaded, git context verified (post-impl)
- Diff from planned-structure files (or explicit base confirmed)
- Every finding routed; required coverage complete; candidates evidence-backed
- Review doc under ~100 lines

## Next Step
Write `docs/scope-research/<slug>-review.md`; route findings to the appropriate rpi phase — including `rpi-grillme` when greenfield foundation gaps remain — or hand off to `improve-codebase-architecture`.

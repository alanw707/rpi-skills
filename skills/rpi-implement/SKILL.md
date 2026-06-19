---
name: rpi-implement
description: Use after a source artifact (`rpi-research` for brownfield or `rpi-grillme` for greenfield), an optional spec, and a Ready planning pack exist to execute planned tasks in small validated batches, honor clarified design decisions, architecture patterns, and plan constraints, stop on scope drift or broken premises, and leave a resumable implementation summary.
disable-model-invocation: true
---
# rpi-implement
Execute one approved source-artifact + planning-pack slice, plus spec when one exists. This phase writes code, but it does not invent scope or push through broken premises.

**Role:** `implementation-executor`. Read `..\rpi-pipeline\rpi-pipeline.yml` for the authoritative contract.


## Use When
- `rpi-plan` produced a `Ready` planning pack
- You want disciplined task-by-task execution tied to planned files, constraints, and validation
- You are resuming an approved implementation slice

## Do Not Use When
- Source artifact or any required planning-pack artifact is missing
- A spec exists but has not been loaded
- Implementation needs more discovery or broader file scope
- Acceptance scope changed; go back to research, grillme, plan, or spec first

## Inputs
Resolve the slug/path and load, in order: source artifact, plan, planned structure, and spec when one exists.
Use them this way: plan = execution source of truth for task order, constraints, validation, and any explicit task metadata; planned structure = canonical planned file list, responsibility map, and dependency-shape handoff; source artifact = `research` for brownfield proven facts and commands, or `foundation` for greenfield stack/bootstrap/architecture decisions; spec = optional requirements and ACs when a formal contract exists.
Design discussion is supplementary context for understanding architectural reasoning but not execution-critical.
Do not reload broad repo context docs during implementation. If a guardrail is missing or disputed, return to research or context.

## Preflight
Before the first edit, confirm:
- the plan says `Ready`
- the remaining blocker is acceptable for coding
- every planned task is explicit and maps to requirement / AC / blocker
- current work fits the plan's task list and the planned-structure file list
- design questions are resolved or explicitly recorded in the pack
- current path still fits the source artifact's structure or architecture shape and the plan constraints
- current branch/worktree context is correct when branch-sensitive
- vault use is materially justified; reuse session findings first, prefer Decision notes, max one targeted check
If any preflight check fails, stop and return to `rpi-plan`, `rpi-research`, or `rpi-grillme`.

## Execution Rules
- **Task gatekeeper** — execute tasks in order; restate task goal, linked requirements, relevant decisions, patterns, validation target, and any explicit metadata (`Depends on`, `Parallel`, `Risk`, `Review required`) before editing; refuse any unplanned change.
- **Incremental editor** — make the smallest cohesive edit batch inside the planned-structure file list and the source artifact's intended seam; if a safe fix needs broader scope, stop and replan.
- **Validation runner** — run the build command after every meaningful edit batch, planned task validation before moving on, and the full planned test command at the final gate.
- **Scope guard** — stop and return to spec, research, grillme, or plan if a needed change is unplanned, scope widens, evidence contradicts the researched seam or greenfield foundation decision surface, upstream package or reference behavior differs from the premise, a required build/test command cannot be stated exactly, or a resolved design question becomes ambiguous again.
- **Automation compatibility** — when the plan includes stable task metadata, preserve those ids/meanings in your resumable summary so orchestration can map completed, failed, blocked, and review-required work without reinterpretation.
- **Resume & handoff** — at any pause or completion point, leave a resumable summary.

## Output
No dedicated markdown artifact required. Return a concise implementation summary with:
- completed tasks (prefer exact `T<n>` ids when the plan defines them)
- remaining tasks (prefer exact `T<n>` ids when the plan defines them)
- files changed
- validation run
- acceptance coverage when spec exists, otherwise source-contract coverage
- residual risks / replan
- any design-discussion drift

## Self-Check
- Source artifact, plan, and planned structure were read before coding; spec was also read when one exists
- Every code change maps to a planned task
- If the plan defines stable task metadata, completed/remaining work is reported against those exact task ids
- No clarified design decision or structure rule was ignored silently
- Build ran after each meaningful edit batch
- Planned validation ran before moving to the next task
- Full test command ran at the final gate unless blocker made explicit
- Any discovery that broke a researched premise, clarified decision, or plan constraint was routed back before continuing
- Vault findings reused selectively
- Final summary is resumable without rediscovery

## Next Step
Finish implementation or return to `rpi-plan`, `rpi-research`, or `rpi-grillme` if a premise breaks; hand off to `rpi-review` for post-implementation validation. If this is the first real greenfield codebase slice, run `rpi-context` once the repo has enough reality to scan usefully.

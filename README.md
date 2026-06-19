# RPI Skills

RPI (Requirements-Planning-Implementation) skill family for Pi — a structured delivery workflow for software development.

## Overview

The RPI pipeline breaks down complex software delivery into 7 phases, each with a specific role and artifact:

1. **rpi-context** — Project orientation, structure maps, and durable context (systems-cartographer)
2. **rpi-spec** — Normalize raw requirements into a scoped, testable contract (requirements-analyst)
3. **rpi-research** — Prove current state and map the affected code slice (forensic-investigator)
4. **rpi-grillme** — Resolve greenfield foundation decisions one question at a time (greenfield-interrogator)
5. **rpi-plan** — Transform verified gaps into sequenced tasks and design decisions (delivery-architect)
6. **rpi-implement** — Execute planned tasks in validated batches (implementation-executor)
7. **rpi-review** — Validate artifact chain and code against spec/plan (post-implementation-reviewer)

Plus three converters:
- **rpi-plan-to-speckit-plan** — Convert RPI plan format to SpecKit format
- **rpi-spec-to-speckit-spec** — Convert RPI spec format to SpecKit format
- **rpi-tasks-to-speckit-tasks** — Convert RPI task format to SpecKit format

And the shared contract:
- **rpi-pipeline** — Authoritative pipeline contract: phases, gates, roles, ordering rules, replan triggers

## Installation

### From git
```bash
pi install git:github.com/axwang/rpi-skills
```

### Pinned version
```bash
pi install git:github.com/axwang/rpi-skills@v0.1.0
```

### Local path (development)
```bash
pi install /c/rpi-skills
```

## Usage

### Quick start
1. Read `rpi-context` to understand project scope and structure
2. Use `rpi-spec` if raw requirements need normalization
3. Use `rpi-research` for non-trivial existing-code changes
4. Use `rpi-grillme` for greenfield foundation decisions
5. Use `rpi-plan` to sequence work and resolve design questions
6. Use `rpi-implement` to execute planned tasks with validation
7. Use `rpi-review` to validate the full artifact chain

### Loading a specific skill
```
/skill:rpi-plan
/skill:rpi-research
```

See each skill's `SKILL.md` for detailed role definitions and workflow steps.

## Key Concepts

### Phases
- **context:** repo-level understanding, structure, workflows
- **spec:** requirement normalization, acceptance criteria, design questions
- **research:** current-state proof, code mapping, blocker identification
- **greenfield-foundation:** architecture and bootstrap decisions for new projects
- **plan:** task sequencing, design discussion resolution, validation planning
- **implement:** code execution with incremental validation
- **review:** artifact chain validation, two-axis code review, architecture feedback

### Artifacts
Each phase produces specific, reusable artifacts under `docs/`:
- `docs/project-context.md`, `project-structure.md`, `state-graph.md` (context phase)
- `docs/specs/<slug>.md` (spec phase)
- `docs/scope-research/<slug>-research.md` (research phase)
- `docs/scope-research/<slug>-foundation.md` (greenfield phase)
- `docs/scope-research/<slug>-plan.md`, `<slug>-design-discussion.md`, `<slug>-planned-structure.md` (plan phase)
- code changes + validation evidence (implement phase)
- `docs/scope-research/<slug>-review.md` (review phase)

## Workflows & Entry Points

**Typical brownfield (existing repo):**
- start at `rpi-context` once per repo
- then `rpi-research` for non-trivial changes
- then `rpi-plan` if multiple files or sequencing needed
- then `rpi-implement` with continuous validation
- then `rpi-review` post-implementation

**Typical greenfield (new project):**
- start at `rpi-grillme` for foundation decisions
- then `rpi-plan` to sequence bootstrap and first vertical slice
- then `rpi-implement` with the planned tasks
- then `rpi-review` for validation

## License

MIT

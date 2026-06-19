---
name: rpi-context
description: Use only when the task explicitly asks for durable repo-level RPI context artifacts such as `docs/project-context.md`, `docs/project-structure.md`, or `docs/state-graph.md`. Not for story-specific scoping, ordinary repo exploration, or code-level research.
steps:
  - { id: repository-orientation,      required: true }
  - { id: structure-tree-cartographer, required: true }
  - { id: domain-workflow-synthesizer, required: true }
  - { id: system-graph-cartographer,   required: true }
  - { id: system-shape-guardrails,     required: true }
  - { id: context-compactor,           required: true }
  - { id: output-validator,            required: true }
---

# rpi-context
Creates a stable, reusable project brief plus structure maps — not a task spec and not a task-scoped code map.

**Role:** `systems-cartographer`. Read `..\rpi-pipeline\rpi-pipeline.yml` for the authoritative contract.

## Use When
- Durable repo-level context is missing, stale, or disputed
- Future work keeps rediscovering the same purpose, workflows, or structure

## Do Not Use When
- Story-specific scope or ACs → `rpi-spec`
- The repo does not exist yet or is too thin to scan honestly → `rpi-grillme`
- Exact files, symbols, or code-path tracing → `rpi-research`
- Task sequencing → `rpi-plan`

## Boundaries
- Create or refresh all three docs together; keep repo-level and reusable
- No story scope, ACs, task breakdowns, or ADO workflow metadata
- `project-structure.md`: box-drawing tree (`├──` `│` `└──`), one node per line; no `|--` or glob shorthand
- `state-graph.md`: Mermaid preferred (plain ASCII labels, `-->` only, no `==>` or Unicode); ASCII fallback; same filename for every repo type

## Process

**1. Orientation** — Read existing context docs, `README.md`, `CONTRIBUTING.md`, root manifests (`*.sln`, `package.json`, `go.mod`, etc.), architecture docs. Extract: purpose, tech stack, modules, exact build/test commands, guardrails.

**2. Structure tree** — Curated box-drawing tree, 2-4 levels deep. Omit generated dirs (`bin`, `obj`, `dist`, `.next`, caches). Neutral labels: app, service, package, library, worker.

**3. Domain & workflows** — Primary actors, core domain terms, 3-5 key workflows, external dependencies.

**4. Graph** — Highest-signal type first: state graph → request/handler flow → service interaction → data pipeline → dependency graph. Mermaid: blank line before fence, `graph LR;` or `flowchart LR`, semicolon-terminated statements, short single-line labels, no `==>`.

**5. System shape** — Module map, responsibilities, boundary rules, runtime composition notes (DI, startup, worker, message bus), workflow hotspots (fan-in/fan-out, orchestration, projection seams).

**6. Compact & validate** — Cut speculative, change-specific, or file-name-obvious content. Re-read all three docs; fix any Self-Check miss before finishing.

## Output
Write or overwrite all three under `docs/`. Each ~50-100 lines.

**`docs/project-context.md`** — Project Purpose, Primary Actors, Core Domain Concepts, Key Workflows (3-5), Workflow Hotspots *(optional)*, Supporting Architecture Docs (links to structure + graph), System Shape (table), Engineering Workflow (exact commands), Guardrails, Conventions That Matter, Known Unknowns *(optional)*.

**`docs/project-structure.md`** — Purpose, Project Tree (box-drawing), Major Areas (table), Where Changes Usually Belong (table), Notes *(optional)*.

**`docs/state-graph.md`** — Scope, Legend, Core Graph (Mermaid or ASCII fallback), Important Notes, Reading this graph in the repo.

## Self-Check
- [ ] Purpose repo-specific; build/test commands exact
- [ ] `project-context.md` links to `project-structure.md` and `state-graph.md`
- [ ] Tree uses box-drawing characters, one node per line, no `|--` or glob shorthand
- [ ] Graph uses most durable type; Mermaid labels plain ASCII; no `==>`, blank line before fence
- [ ] Workflow Hotspots present when repo is event/state/pipeline/orchestration-driven
- [ ] No story scope, ACs, or implementation steps in any doc
- [ ] Each doc within 50-100 lines

## Next Step
Usually next: `rpi-research` for existing-code discovery, with `rpi-spec` first only when a story, ticket, PRD, or scattered notes need normalization. If this repo was just bootstrapped from a greenfield idea, `rpi-context` becomes the first honest repo-scan phase once enough real structure exists.

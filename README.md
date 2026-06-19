# RPI Skills

[![validate](https://github.com/alanw707/rpi-skills/actions/workflows/validate.yml/badge.svg)](https://github.com/alanw707/rpi-skills/actions/workflows/validate.yml)
[![license](https://img.shields.io/github/license/alanw707/rpi-skills)](LICENSE)
[![agent skills](https://img.shields.io/badge/agent-skills-standard-blue)](https://agentskills.io/specification)

RPI (Requirements, Planning, Implementation) skill family. Agent Skills standard package for brownfield and greenfield delivery work: normalize requirements, prove current state, plan in explicit artifacts, implement in validated batches, then review against the artifact chain.

Compatible with Pi and any coding agent harness that can load standard Agent Skills directories.

## What this package includes

### Core pipeline skills
- `rpi-context` — durable repo-level context, structure map, state graph
- `rpi-spec` — normalize raw requirements into a scoped, testable contract
- `rpi-research` — prove current state and map the affected code slice
- `rpi-grillme` — resolve greenfield foundation decisions one question at a time
- `rpi-plan` — turn verified gaps into tasks, design decisions, and validation
- `rpi-implement` — execute planned tasks in validated batches
- `rpi-review` — review artifact coherence, code, and architecture follow-through
- `rpi-handoff` — capture resumable implementation/review handoff context
- `rpi-pipeline` — authoritative shared vocabulary and pipeline contract

### Conversion helpers
- `rpi-plan-to-speckit-plan`
- `rpi-spec-to-speckit-spec`
- `rpi-tasks-to-speckit-tasks`

## Install

### Generic Agent Skills layout
If your coding agent supports the Agent Skills standard, point it at the `skills/` directory from this repo or package.

### Pi install from git
```bash
pi install git:github.com/alanw707/rpi-skills
```

### Pi install pinned tag
```bash
pi install git:github.com/alanw707/rpi-skills@v0.1.0
```

### Pi install from npm
```bash
pi install npm:@alanw707/rpi-skills
```

### Local development path
```bash
pi install /c/rpi-skills
```

## Usage

Load explicitly:

```text
/skill:rpi-plan
/skill:rpi-research
/skill:rpi-review
```

Or let your coding agent auto-load the right skill from its description.

## Recommended entry points

### Brownfield / existing repo
1. `rpi-context` once per repo when durable context is missing or stale
2. `rpi-spec` when requirements are scattered, raw, or ambiguous
3. `rpi-research` for non-trivial existing-code change
4. `rpi-plan` for sequencing, design discussion, and validation planning
5. `rpi-implement` for execution
6. `rpi-review` for artifact and code review

### Greenfield / too-thin repo
1. `rpi-spec` if external requirements need normalization
2. `rpi-grillme` for stack, terminology, bootstrap, and first-slice decisions
3. `rpi-plan`
4. `rpi-implement`
5. `rpi-review`
6. `rpi-context` later, once a real codebase slice exists

## Artifact model

Typical artifacts written by the family:
- `docs/project-context.md`
- `docs/project-structure.md`
- `docs/state-graph.md`
- `docs/specs/<slug>.md`
- `docs/scope-research/<slug>-research.md`
- `docs/scope-research/<slug>-foundation.md`
- `docs/scope-research/<slug>-plan.md`
- `docs/scope-research/<slug>-design-discussion.md`
- `docs/scope-research/<slug>-planned-structure.md`
- `docs/scope-research/<slug>-review.md`

## Development

Validate all packaged skills locally:

```bash
npm run validate
```

For Pi users, the package manifest lives in `package.json` under `pi.skills`. Other harnesses can consume the `skills/` directory directly.

## Publish to npm

Package prepared for scoped public publish:
- package name: `@alanw707/rpi-skills`
- `publishConfig.access = public`
- `prepublishOnly` runs validation before publish

When ready:

```bash
npm login
npm publish
```

## Repo layout

```text
skills/
  rpi-context/
  rpi-grillme/
  rpi-handoff/
  rpi-implement/
  rpi-pipeline/
  rpi-plan/
  rpi-plan-to-speckit-plan/
  rpi-research/
  rpi-review/
  rpi-spec/
  rpi-spec-to-speckit-spec/
  rpi-tasks-to-speckit-tasks/
scripts/
  validate-skills.js
```

## License

MIT

# RPI Skills

[![validate](https://github.com/alanw707/rpi-skills/actions/workflows/validate.yml/badge.svg)](https://github.com/alanw707/rpi-skills/actions/workflows/validate.yml)
[![license](https://img.shields.io/github/license/alanw707/rpi-skills)](LICENSE)
[![agent skills](https://img.shields.io/badge/agent-skills-standard-blue)](https://agentskills.io/specification)

RPI (Requirements, Planning, Implementation) skill family. Agent Skills standard package for brownfield and greenfield delivery work: normalize requirements, prove current state, plan in explicit artifacts, implement in validated batches, then review against the artifact chain.

Compatible with Pi and any coding agent harness that can load standard Agent Skills directories.

> **New to RPI?** Start with the [RPI Workflow Guide](docs/rpi-workflow.md) — covers all phases, when to use each skill, recommended flows, and example prompts.

## Credits

This framework draws inspiration and patterns from:

- **Human Layers' RPI methodology** ([GitHub](https://github.com/humanlayer)) — foundational delivery phases, discipline structure, and replan triggers that form the core pipeline

- **Matt Pollock's Agent Skills** ([GitHub: mattpocock/skills](https://github.com/mattpocock/skills)) — skill architecture, artifact organization patterns, harness integration, and cross-harness compatibility design

- **BMAD (Best Model for Architectural Decisions)** — decision documentation discipline, architecture validation gates, and design-question evidence collection practices that inform the `rpi-plan` and `rpi-review` phases

## Influences in Practice

**From Human Layers:**
- Phase ordering and entry gates
- Replan triggers and decision checkpoints
- Artifact-driven workflow discipline

**From Matt Pollock's Skills:**
- Portable skill structure (works across harnesses)
- SKILL.md frontmatter convention
- Artifact naming and co-location patterns
- Multi-harness installation patterns

**From BMAD:**
- Design-question evidence collection in `rpi-spec`
- Architecture decision recording in plan phase
- Review gates for decision validation
- Separation of facts from unknowns in artifacts

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

## Installation

### Quick Start (Interactive Installer)

If you have Node.js installed:

```bash
npx @alanw707/rpi-skills setup
```

The installer asks which harness to install for, where to install skills, whether to copy or symlink, and which skills to install. Copy mode is recommended for `npx` because npm cache paths can be temporary.

For automation:

```bash
# Install every skill for Pi
npx @alanw707/rpi-skills setup --harness pi --all --copy --yes

# Install selected skills into a custom directory
npx @alanw707/rpi-skills setup --target ~/.agents/skills --skills rpi-spec,rpi-plan --copy --yes

# Print commands without changing files
npx @alanw707/rpi-skills setup --harness pi --all --print --yes
```

### Pi (Coding Agent)

```bash
# From git (always latest)
pi install git:github.com/alanw707/rpi-skills

# From git with pinned tag
pi install git:github.com/alanw707/rpi-skills@v0.1.0

# From npm registry
pi install npm:@alanw707/rpi-skills

# Local development path
pi install /path/to/rpi-skills
```

### Claude Code

**Option 1: Symlink (recommended)**
```bash
git clone https://github.com/alanw707/rpi-skills.git /tmp/rpi-skills
ln -s /tmp/rpi-skills/skills ~/.claude/skills/rpi-skills
```

**Option 2: Copy**
```bash
git clone https://github.com/alanw707/rpi-skills.git
cp -r rpi-skills/skills/* ~/.claude/skills/
```

Then restart Claude.

### OpenAI Codex

**Symlink:**
```bash
git clone https://github.com/alanw707/rpi-skills.git /tmp/rpi-skills
ln -s /tmp/rpi-skills/skills ~/.openai-codex/skills/rpi-skills
```

### Generic Agent Skills Harness

If your harness loads from `~/.agents/skills/` or a custom path:

```bash
# Clone repo
git clone https://github.com/alanw707/rpi-skills.git

# Symlink skills directory
ln -s ./rpi-skills/skills ~/.agents/skills/rpi-skills
```

Or configure your harness to load skills from: `<repo>/rpi-skills/skills`

### NPM Dependency (For Custom Harnesses)

If your harness supports npm packages:

```bash
npm install @alanw707/rpi-skills
```

Then reference: `node_modules/@alanw707/rpi-skills/skills`


## Detailed Usage Guide

### Understanding the RPI Pipeline

The RPI pipeline structures delivery work into **7 ordered phases**, each with a specific role, inputs, outputs, and exit gates. The phases are not linear dogma — they're a discipline to prevent common mistakes like implementing unresearched solutions or skipping specification clarity.

**Key concept:** Each phase produces durable artifacts in `docs/` that serve as input to downstream phases. Artifacts stay in the repo so future work doesn't rediscover the same facts.

### Phase Breakdown

#### 1. **rpi-context** (systems-cartographer)
**When:** Once per repo, when durable repo-level context is missing, stale, or disputed.

**What it does:**
- Captures project purpose, tech stack, and exact build/test commands
- Produces a curated project structure tree (box-drawing ASCII, no glob shorthand)
- Maps the core domain: actors, workflows, hotspots
- Creates a durable state graph (Mermaid or ASCII) showing the most stable system representation

**Produces:**
- `docs/project-context.md` (50–100 lines: purpose, actors, workflows, guardrails)
- `docs/project-structure.md` (tree + module map)
- `docs/state-graph.md` (Mermaid or ASCII)

**How to use:**
```
/skill:rpi-context
```
Then answer: What is this repo's purpose? What's the tech stack? What are the 3–5 key workflows? The skill will guide you through 7 steps and validate completeness at the end.

---

#### 2. **rpi-spec** (requirements-analyst)
**When:** Raw requirements are scattered (tickets, chat, PRD, PR comments) and acceptance criteria are ambiguous.

**What it does:**
- Normalizes raw asks into a scoped, testable contract
- Separates goals from non-goals
- Maps current-state against requested changes (matrix: already true, not true, unknown)
- Surfaces design questions and open blockers explicitly

**Produces:**
- `docs/specs/<slug>.md` — normalization contract with ACs, design questions, current-state matrix

**How to use:**
```
/skill:rpi-spec
```
Provide the scattered requirements (link, paste, or describe). The skill structures them into a scoped contract. Do **not** start here if scope is already crystal clear; skip to `rpi-research` instead.

---

#### 3. **rpi-research** (forensic-investigator)
**When:** Non-trivial existing-code change and you need current-state proof before planning.

**What it does:**
- Traces the code path from trigger → orchestration → downstream effects
- Maps the affected module slice (current state only, no solution shape)
- Collects evidence for design questions
- Separates verified facts from unknowns

**Produces:**
- `docs/scope-research/<slug>-research.md` — facts, workflow trace, code map, design evidence, blockers

**How to use:**
```
/skill:rpi-research
```
Provide: spec (if one exists), or the raw change request. The skill will bootstrap from `docs/project-context.md` if present, then dive into the code. It outputs plan-readiness verdict: ready or not-ready.

---

#### 4. **rpi-grillme** (greenfield-interrogator)
**When:** Repo is absent or too thin for honest current-state research. New idea needs foundation decisions before planning.

**What it does:**
- Interrogates one question at a time: What is the goal? What's the stack? What's the architecture shape? How do we bootstrap?
- Resolves terminology and constraints explicitly
- Defines first vertical slice to avoid analysis paralysis

**Produces:**
- `docs/scope-research/<slug>-foundation.md` — goals, stack, architecture shape, bootstrap, first slice

**How to use:**
```
/skill:rpi-grillme
```
Use when starting a new repo or when the current repo is too thin. Answer questions one at a time. Do not batch them or skip them.

---

#### 5. **rpi-plan** (delivery-architect)
**When:** Research is done (or greenfield foundation is set), and you need to sequence work and resolve design questions.

**What it does:**
- Transforms verified gaps into ordered tasks with dependencies
- Creates design-discussion artifact (decision evidence for ambiguous choices)
- Maps planned structure (file layout, module shape, seams, integrations)
- Specifies validation per task and at final gate

**Produces:**
- `docs/scope-research/<slug>-plan.md` — ordered tasks, per-task validation, rollback
- `docs/scope-research/<slug>-design-discussion.md` — design choices and evidence
- `docs/scope-research/<slug>-planned-structure.md` — file layout, module responsibilities

**How to use:**
```
/skill:rpi-plan
```
Provide: research artifact (or foundation artifact if greenfield). The skill creates a planning pack and validates against `rpi-pipeline.yml` ordering rules.

---

#### 6. **rpi-implement** (implementation-executor)
**When:** Plan exists, decisions are recorded, and it's time to code.

**What it does:**
- Executes planned tasks one batch at a time
- Runs validation after each batch
- Stops immediately if implementation reaches outside planned scope or breaks a design decision
- Produces resumable summary at end

**Produces:**
- Code changes in the repository
- Validation evidence in session transcript
- Implementation summary (completed tasks, remaining, risks)

**How to use:**
```
/skill:rpi-implement
```
The skill loads your plan pack and guides you through each task. It enforces:
- Every code change maps to a planned task
- Validation runs after meaningful edits
- Scope drift is caught and routed back to planning

---

#### 7. **rpi-review** (post-implementation-reviewer)
**When:** Implementation is complete, or you want a planning-phase quality check.

**What it does:**
- **Post-impl mode:** Validates artifact chain, runs code review against spec/plan, surfaces architecture opportunities
- **Planning-phase mode:** Checks planning artifact coherence before implementation begins

**Produces:**
- `docs/scope-research/<slug>-review.md` — findings with routing labels (back to spec, research, plan, etc.)

**How to use:**
```
/skill:rpi-review
```
Provide: all artifacts (spec if it exists, plan, design-discussion, planned-structure). The skill validates completeness and surfaces issues for re-planning if needed.

---

### Recommended Workflows

#### Brownfield / Existing Repository

**Typical path:**

1. **Context** (once per repo)
   ```
   /skill:rpi-context
   → docs/project-context.md, project-structure.md, state-graph.md
   ```

2. **Spec** (if requirements are scattered)
   ```
   /skill:rpi-spec
   → docs/specs/<slug>.md
   ```

3. **Research** (prove current state)
   ```
   /skill:rpi-research
   → docs/scope-research/<slug>-research.md
   ```

4. **Plan** (sequence the work)
   ```
   /skill:rpi-plan
   → docs/scope-research/<slug>-plan.md
   → docs/scope-research/<slug>-design-discussion.md
   → docs/scope-research/<slug>-planned-structure.md
   ```

5. **Implement** (execute tasks)
   ```
   /skill:rpi-implement
   → code changes + validation
   ```

6. **Review** (validate everything)
   ```
   /skill:rpi-review
   → docs/scope-research/<slug>-review.md
   ```

#### Greenfield / Too-Thin Repository

**Typical path:**

1. **Foundation** (architecture + bootstrap decisions)
   ```
   /skill:rpi-grillme
   → docs/scope-research/<slug>-foundation.md
   ```

2. **Plan** (sequence first vertical slice)
   ```
   /skill:rpi-plan
   → docs/scope-research/<slug>-plan.md
   ```

3. **Implement** (build first slice)
   ```
   /skill:rpi-implement
   → code + validation
   ```

4. **Review** (validate architecture)
   ```
   /skill:rpi-review
   → docs/scope-research/<slug>-review.md
   ```

5. **Context** (once repo has real code)
   ```
   /skill:rpi-context
   → docs/project-context.md, etc.
   ```

#### Direct Research (Scope Already Clear)

Skip spec, go straight to research:

```
/skill:rpi-research
→ /skill:rpi-plan
→ /skill:rpi-implement
→ /skill:rpi-review
```

### Key Discipline Rules

**Do:**
- Run `rpi-context` **once per repo** — reuse it for all future work
- Separate **facts from unknowns** during research
- **Name design questions** explicitly in spec or research
- Write **validation commands exactly** (e.g., `npm test -- --testNamePattern="auth flow"`, not "run tests")
- Keep artifacts **focused and under 100 lines** (except trees/graphs which need more room)
- **Trace every code change back to a planned task** during implement

**Do Not:**
- Skip research on non-trivial changes to existing code
- Implement unresearched or unplanned scope
- Batch design questions ("we'll figure it out later")
- Leave ambiguity in specifications
- Change planned design decisions mid-implement without re-planning
- Use repo-level context docs for story-specific scope

### Replan Triggers

Stop and return to an earlier phase if any of these occur:

- Research disproves a spec premise
- Implementation reaches outside researched module slice
- Design question becomes ambiguous again
- Build/test command cannot be stated exactly
- A researched premise or design decision proves invalid

When triggered, route findings back to the phase that produced the bad assumption, fix it, and proceed.

### Artifact Model

Standard locations and naming:

```
docs/
├── project-context.md
├── project-structure.md
├── state-graph.md
└── scope-research/
    ├── <slug>-spec.md
    ├── <slug>-foundation.md
    ├── <slug>-research.md
    ├── <slug>-plan.md
    ├── <slug>-design-discussion.md
    ├── <slug>-planned-structure.md
    └── <slug>-review.md
```

Each artifact stays in the repo permanently. Future work references them, saving rediscovery.

---

## Development

Validate all packaged skills locally:

```bash
npm run validate
```

For Pi users, the package manifest lives in `package.json` under `pi.skills`. Other harnesses can consume the `skills/` directory directly.

## Publishing to npm

This package is prepared for scoped public publish on npm. When ready to publish:

### Prerequisites

1. **npm account** — Create one at [npmjs.com](https://www.npmjs.com) if you don't have one
2. **Authenticated locally:**
   ```bash
   npm login
   ```
   (Enter your npm username, password, and 2FA code if enabled)

### Pre-publish checklist

- [ ] All skills validated: `npm run validate` ✓
- [ ] Version bumped in `package.json` (semantic versioning)
- [ ] `CHANGELOG.md` updated (optional but recommended)
- [ ] All changes committed and pushed to GitHub
- [ ] Git tag created: `git tag v0.1.0 && git push origin v0.1.0`

### Publish

```bash
npm publish
```

The `prepublishOnly` script in `package.json` will run validation automatically before publishing.

### After publish

Users can install immediately:
```bash
# Pi
pi install npm:@alanw707/rpi-skills

# NPM + custom harness
npm install @alanw707/rpi-skills
```

### Unpublish (if needed)

Within 72 hours of publish:
```bash
npm unpublish @alanw707/rpi-skills@0.1.0
```

After 72 hours, contact npm support.

### Future versions

For subsequent releases:

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Commit and push
4. Tag: `git tag v0.2.0 && git push origin v0.2.0`
5. Publish: `npm publish`

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

## See Also

- [RPI Workflow Guide](docs/rpi-workflow.md) — detailed workflow doc with phase-by-phase breakdown
- [Agent Skills Standard](https://agentskills.io/specification)
- [Human Layers](https://github.com/humanlayer) — RPI methodology and delivery discipline
- [Matt Pollock's Agent Skills](https://github.com/mattpocock/skills) — skill architecture and harness patterns
- [Pi Coding Agent](https://pi.dev) — Pi harness implementation

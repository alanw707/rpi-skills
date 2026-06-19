# RPI Handoff Format

```md
# RPI Handoff — <slug>

## Status
- Current phase: <phase>
- Recommended next phase: <phase>
- Readiness: Ready | Not Ready

## Objective
<1-3 lines>

## Source Artifact Chain
- Spec: `<path>`
- Research or Foundation: `<path>`
- Plan: `<path>`
- Planned Structure: `<path>`
- Design Discussion: `<path>`
- Review: `<path or omitted if absent>`

## Decisions Locked
- <decision>
- <decision>

## Constraints
- <constraint>
- <constraint>

## Next Step
- <exact first action>

## Implementation Scope
- T1: <summary>
- T2: <summary>

## Validation Commands
- `<command>`
- `<command>`

## Replan Triggers
- <trigger>
- <trigger>

## Resume Prompt
Use `rpi-<phase>`. Read handoff doc:
`<path-to-handoff>`
Treat the handoff doc and referenced artifacts as source of truth.
Resume from the declared Next Step.
```

Notes:
- Replace `Implementation Scope` with `Review Scope` or `Open Scope` when another heading fits better.
- Keep exact paths.
- Keep it compact.
- Handoff summarizes; source artifacts stay authoritative.

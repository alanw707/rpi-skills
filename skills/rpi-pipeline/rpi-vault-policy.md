# RPI Vault Retrieval Policy

Apply this in `rpi-spec`, `rpi-research`, `rpi-plan`, and `rpi-implement` when the Second Brain vault is available.

## Rules

1. **Reuse first**
   - Reuse already-loaded vault findings from the current session, spec, research artifact, plan pack, or user-provided notes.
   - Do not repeat the same lookup across phases unless a new unresolved question appears.

2. **Query only when material**
   - Use the vault only when project-, feature-, workflow-, or decision-specific knowledge could materially change scope, constraints, defaults, naming, architecture, discovery, planning, validation, or boundary safety.

3. **Start shallow**
   - Use `sb_auto_context` only when project tag or search terms are unclear.
   - Start with `sb_search` excerpts.

4. **Prefer Decision notes**
   - Read Decision notes first.
   - Read at most 1 directly relevant Project note when excerpts leave constraints or workflow unclear.
   - Max 3 full note reads per phase.

5. **Skip when obvious**
   - Skip vault lookup entirely when the task is isolated, repo-internal, or the source material already answers the question.

6. **Gap checks are selective**
   - Use `sb_gap_check` only for unresolved or obviously sparse topics.
   - Never run it blindly on the full spec.

7. **Carry only new findings forward**
   - Add only new constraints, decisions, gaps, or terminology to the phase artifact.
   - Do not restate facts already captured elsewhere.

8. **Degrade gracefully**
   - If second-brain MCP is unavailable, skip vault retrieval and continue.

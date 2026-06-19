# FAQ — rpi-spec-to-speckit-spec

### Do I need to use spec-kit tools after this conversion?
No. You can continue with `/speckit.plan` / `/speckit.tasks`, or stay in RPI and use the other adapters.

### What if the RPI spec has more than 3 user stories?
Convert all of them. Order P1 first, then P2, then P3.

### Should I delete the RPI spec after converting?
No. Keep both locations by design for compatibility.

### What if there are no user stories in the RPI spec?
Group related requirements into stories. If the work is only a technical refactor or chore, reconsider whether spec-kit is the right format.

### Can I re-run this skill after the spec changes?
Yes. The conversion should stay deterministic; re-run whenever the RPI source changes.

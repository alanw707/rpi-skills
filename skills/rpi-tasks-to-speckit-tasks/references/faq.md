# FAQ — rpi-tasks-to-speckit-tasks

### Can User Story 2 start before User Story 1 is done?
Sometimes, if the foundational layer is complete and the stories are truly independent. Prefer sequential MVP validation unless schedule pressure justifies parallel work.

### What if a task takes longer than estimated?
Split it. Tasks should stay in the 1–4 hour range when possible.

### Should I write all tests before all implementation?
Write tests first within each story or task cluster, confirm they fail, then implement.

### Can I skip tests for v1?
Not recommended. Minimum: independent validation per user story.

### What if one task depends on another story?
Document the dependency explicitly and reconsider whether the story split is actually independent.

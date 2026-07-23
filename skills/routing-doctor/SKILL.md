---
name: routing-doctor
description: Audit or develop a Codex setup's global AGENTS.md, skill descriptions, project skill packs, routing boundaries, agent delegation rules, or routing regression corpus. Use only when Codex routing/configuration itself is the subject; do not use to dispatch ordinary domain work.
---

# Routing Doctor

Keep routing native and measurable. Diagnose the setup, change it only when authorized, then validate the same behavioral contract.

## Workflow

1. Read the active global/project `AGENTS.md`, `config.toml`, custom agent definitions, visible skill descriptions, and relevant project skill roots.
2. Establish the request's intent and effect ceiling. An audit or proposal is read-only; configuration edits require explicit create/modify authority.
3. Prefer native skill-description matching. Remove runtime meta-routing layers that repeat global instructions.
4. Check the four independent slots: one `primary`, optional `adapter`, optional `verifier`, and conditional `safety` overlay.
5. Check agent economics: parallel work requires at least two independent substantial axes; keep one writer and depth one. A sequential reviewer/verifier is allowed after substantial or risky work.
6. Run the static validator and routing corpus check before and after changes.
7. For a costly behavioral evaluation, run only a representative sample first; run the full corpus only when the user wants it or a major routing change warrants it.

## Commands

From this skill directory:

```bash
python3 scripts/audit_routing.py
python3 scripts/audit_routing.py --run --ids R03,R13,R18,R27,R35,R39
python3 scripts/audit_routing.py --run
```

The default command is deterministic and makes no model calls. `--run` launches ephemeral read-only Codex classification tasks and compares their JSON output with the corpus.

Read [references/routing-policy.md](references/routing-policy.md) for invariants and score gates. The labeled Korean cases are in [references/routing-cases.yaml](references/routing-cases.yaml).

## Boundaries

- Never select skills for an ordinary user task from inside this skill.
- Never treat a rough prompt as permission to write.
- Do not optimize for more skill or agent activation; optimize for correct ownership, authorized effects, independent evidence, and verified outcomes.
- Report exact failing case IDs and fields instead of subjective routing impressions.

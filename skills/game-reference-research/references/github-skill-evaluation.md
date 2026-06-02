# GitHub Skill Evaluation

Use this when researching external skills, Claude skills, Codex skills, or game-dev repos to adapt into local Codex skills.

## Candidate Table

| Candidate | Source | License | Action | Why |
| --- | --- | --- | --- | --- |
| {name} | {url} | {license} | install/adapt/watch/skip | {fit} |

## Evaluation Criteria

### Fit

- Does it solve a repeated local workflow?
- Does it match mobile game, game UI, prototype, QA, or reference-building needs?
- Is it narrow enough to trigger reliably?

### Skill Structure

- Has a clear `SKILL.md`.
- Has useful `references/`, `scripts/`, or `assets/`.
- Uses concise trigger descriptions.
- Avoids loading huge context by default.

### Codex Compatibility

- No hard dependency on unsupported slash commands.
- No telemetry or shell preamble required for normal use.
- Tool assumptions match available Codex tools.
- Subagent usage is optional and only when the user asks.
- External side effects are explicit.

### Trust and Maintenance

- License allows adaptation.
- Repo has understandable ownership and recent enough activity for the task.
- Dependencies are reasonable.
- Docs are inspectable without running unknown scripts.

## Actions

- `install`: use the skill-installer or copy as-is because it follows Codex conventions.
- `adapt`: extract workflow and references, rewrite as Codex skill, remove incompatible parts.
- `watch`: promising but too broad, immature, or not needed now.
- `skip`: poor fit, unsafe, unclear license, stale, or too noisy.

## Adaptation Notes

When adapting from Claude-oriented repos:

- Remove `allowed-tools`, telemetry, slash-command assumptions, and long shell preambles.
- Convert slash-command names into natural-language trigger descriptions.
- Move long checklists into `references/`.
- Keep `SKILL.md` focused on routing, workflow, and reference-loading rules.
- Add `agents/openai.yaml` with a short default prompt.

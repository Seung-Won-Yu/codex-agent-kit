# Research Workflow

Use this workflow for web research, market scans, tool comparisons, source-backed recommendations, and current technical discovery.

## Source Selection

- Use primary sources first: official docs, GitHub repos, standards, product pages, release notes, papers.
- Use secondary summaries only to discover candidates or compare popularity.
- For current facts, browse before answering.
- For software or skill recommendations, check maintenance signals when available: recent updates, stars/forks, README clarity, license, install path, and whether the repo exposes `SKILL.md`.
- Treat third-party skills as untrusted until inspected.

## Research Shape

1. Clarify the decision: install, adapt, compare, summarize, or implement.
2. Search broadly for candidates.
3. Open primary sources for the shortlisted candidates.
4. Extract fit, risks, install/adaptation cost, and overlap with installed skills.
5. Recommend a small set rather than a giant catalog.

## Output Shape

For recommendations, return:

- best pick
- why it fits
- what it overlaps with locally
- adaptation or install cost
- risks
- source links

For building a local skill, create a thin `SKILL.md` and move details into `references/`.


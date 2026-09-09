---
name: research-synthesizer
description: 'Research current facts, tools, libraries, markets, or documentation on the web and synthesize cited comparisons or recommendations. Use when freshness or source evidence matters.'
---

# Research Synthesizer

Use this skill when the answer depends on current or source-backed information. Use current primary evidence and return a concise synthesis with links. Reuse relevant verified sources while current.

## Workflow

1. Resolve the decision or research question from the conversation; restate it only when useful.
2. Inspect a supplied authoritative source or known official reference directly. Search for candidates or broaden coverage when comparison, discovery, or an evidence gap requires it.
3. Open the primary sources needed to establish the answer; do not repeat searches after a narrow question is resolved.
4. Compare fit, evidence quality, freshness, risks, and implementation cost.
5. Cite sources used in the final answer.

## Source Priority

1. Official documentation, specs, standards, release notes, GitHub repositories.
2. Primary product pages, changelogs, package registries, benchmark pages.
3. Papers or credible research reports.
4. High-quality secondary summaries for discovery only.
5. Forums and Reddit only for sentiment, pitfalls, and lead discovery.

## Recommendation Criteria

For tools, skills, libraries, APIs, or frameworks, check:

- maintenance: recent commits, releases, docs freshness, issue activity
- adoption: stars, downloads, community references, official backing
- fit: matches user's platform, workflow, constraints, and skill level
- cost: install effort, dependencies, migration work, context bloat
- risk: security, license, lock-in, unstable API, untrusted scripts

## Output Patterns

For comparisons:

- best pick
- runner-up
- avoid or defer
- why
- source links

For implementation research:

- recommended approach
- exact docs or files to follow
- important caveats
- verification plan

For skill discovery:

- install now
- adapt locally
- watch later
- skip

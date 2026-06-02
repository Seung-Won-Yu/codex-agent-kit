---
name: game-reference-research
description: Research mobile game, game UI, game design, prototype, engine, tooling, GitHub skill, and competitor references, then convert findings into concise Codex skill reference Markdown. Use when the user wants 자료조사, 참고서, 레퍼런스, GitHub 후보, 공식문서 요약, 패턴 조사, or skill-ready reference files for mobile game work.
---

# Game Reference Research

## Overview

Use this skill to turn outside research into reusable Codex reference material. The goal is not a long report; it is a compact, source-backed reference file that another skill can load later without redoing the research.

## When To Use

- The user asks to research game design, mobile game UI, retention, FTUE, game feel, engines, libraries, tools, GitHub repos, or external skills.
- The output should become `references/*.md` inside a Codex skill.
- The user asks for "자료조사", "참고서", "레퍼런스", "깃에서 찾아봐", "스킬화", or "Codex화".
- The request depends on current facts, official documentation, GitHub repos, or external examples.

Pair with `$research-synthesizer` for current web research and citations. Pair with `$skill-creator` when actually creating or updating a skill folder. Pair with `$game-ui-art-direction`, `$mobile-game-design`, or `$prototype-slice-planner` when the researched material should feed one of those skills.

## Workflow

1. Restate the reference target: topic, intended skill, and decision it should support.
2. Search current sources. Prefer official docs, GitHub repositories, package docs, engine docs, and primary product pages.
3. Open and inspect shortlisted sources instead of relying on search snippets.
4. Extract only reusable guidance: patterns, constraints, checklists, examples, risks, and links.
5. Classify each source as `install`, `adapt`, `watch`, or `skip` when researching skills or repos.
6. Convert findings into a compact Markdown reference using `references/reference-template.md`.
7. Include source links and retrieval dates where freshness matters.
8. Recommend where the reference should live, for example `$game-ui-art-direction/references/mobile-hud-patterns.md`.

## Source Rules

- Use primary sources first: official docs, engine docs, GitHub repos, package registries, app store policy docs, and published changelogs.
- Use secondary articles for discovery only unless they contain uniquely useful pattern analysis.
- When researching GitHub skills, inspect `SKILL.md`, license, repo activity, structure, external dependencies, and fit with Codex.
- Do not copy large chunks from sources. Paraphrase into reusable rules and cite the source.
- Strip Claude-specific commands, telemetry, slash commands, or unsupported tool assumptions before recommending Codex adaptation.

## Output Modes

- Quick shortlist: best candidates, why, source links, action.
- Reference file draft: concise Markdown ready to place under `references/`.
- Skill adaptation brief: what to install, what to extract, what to remove, what to rewrite.
- Research backlog: topics worth investigating later.

## Reference Loading

- Read `references/reference-template.md` when drafting a reusable reference file.
- Read `references/github-skill-evaluation.md` when evaluating GitHub repos or external skills.
- Read `references/source-map-template.md` when the user wants a source inventory or bibliography.

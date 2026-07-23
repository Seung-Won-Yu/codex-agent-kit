---
name: mobile-game-design
description: 'Shape a mobile-game concept or GDD into a playable design brief covering core loop, FTUE, progression, retention, missions, rewards, economy, and moment-to-moment play.'
---

# Mobile Game Design

## Overview

Use this skill to turn a rough mobile game idea into a design that can be prototyped. Keep the work player-centered: what the player wants, what they do in 10 seconds, why they return tomorrow, and what must be tested first.

## When To Use

- The user says "mobile game", "game-like app", "casual game", "RPG", "idle", "puzzle", "arcade", "gacha", "battle pass", "quests", "levels", "missions", "retention", "D1", or "GDD".
- The output is a concept brief, GDD, feature spec, first-session flow, economy outline, or retention loop.
- The user has a game idea but no clear core loop.
- The user asks whether a game concept is fun, sticky, too complex, or worth prototyping.

Do not use this skill for pure visual polish; use `$game-ui-art-direction` for HUD, theme, UI tokens, and screen styling. For first playable scope, use `$prototype-slice-planner` after the concept is clear.

## Workflow

1. Name the player fantasy in one sentence.
2. Define the core action, obstacle, reward, and reason to repeat.
3. Map the loop at three scales: 10-second action loop, 3-minute session loop, and next-day return loop.
4. Identify the twist: what makes this different from the obvious genre default.
5. Sketch the first session: first tap, first win, first failure, first upgrade, first reason to return.
6. Separate what must be real from what can be faked in the first prototype.
7. Call out design risks as testable hypotheses, not vague concerns.

## Core Loop Template

Use this compact table unless the user asks for a full GDD:

| Layer | Question | Output |
| --- | --- | --- |
| Moment | What does the player do with one thumb in 5-10 seconds? | Core action |
| Feedback | How does the game answer immediately? | Animation, sound, number, state change |
| Reward | What improves after the action? | Score, resource, unlock, progress |
| Choice | What decision changes the next action? | Risk, route, loadout, timing, target |
| Session | What closes a 2-5 minute play session? | Level, run, quest, match, chest |
| Return | Why open the game tomorrow? | Quest, streak, upgrade, social, event |

## Output Shapes

- Concept one-pager: player fantasy, audience, core loop, twist, first session, prototype hypothesis.
- GDD outline: screens, systems, controls, progression, economy, content, analytics, risks.
- Design review: what works, what is unclear, what will fail in playtest, next edits.
- Prototype brief: must-build, can-fake, success metric, failure signal.

## Reference Loading

- Read `references/gdd-checklist.md` when creating or reviewing a GDD.
- Read `references/retention-hooks.md` when the request mentions retention, monetization, daily play, quests, economy, or live ops.

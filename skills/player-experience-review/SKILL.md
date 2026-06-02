---
name: player-experience-review
description: Review a mobile game flow by simulating a target player moment by moment. Use when evaluating onboarding, first session, gameplay friction, confusion, churn risk, feature discoverability, reward clarity, or whether a prototype actually feels fun.
---

# Player Experience Review

## Overview

Use this skill to find friction by walking through the experience as a player, not as the designer. The output should show what the player sees, thinks, tries, misunderstands, enjoys, ignores, and abandons.

## When To Use

- The user has a GDD, screen flow, Figma concept, prototype, or gameplay description.
- The user asks "will players understand this?", "is this fun?", "where will users drop?", "review the UX", or "playtest this concept".
- The main risk is comprehension, motivation, pacing, control, or reward clarity.

For implementation bugs or release readiness, use `$mobile-game-qa`. For visual style critique, use `$game-ui-art-direction`.

## Workflow

1. Choose or infer a player persona and play context.
2. State what the player knows before opening the game.
3. Walk through the first 3 minutes in chronological order.
4. For each beat, record: visible cue, likely action, emotional state, confusion, and next motivation.
5. Mark breakpoints where the player may stop, mis-tap, ignore a system, or feel punished.
6. Convert findings into concrete fixes.
7. End with the next playtest question.

## Output Format

Use concise sections:

- Persona and context
- Moment-by-moment walkthrough
- Friction points
- Churn risks
- Highest-leverage fixes
- Playtest questions

## Friction Labels

- Confusion: player does not know what to do.
- Mismatch: player expectation differs from game response.
- Overload: too many systems arrive before the core loop is learned.
- Dead input: tap, swipe, or claim does not visibly respond.
- Reward fog: player receives something but does not know why it matters.
- Punishment spike: failure feels arbitrary or too expensive.
- Menu drift: player enters a screen and forgets the goal.
- Return gap: no clear reason to reopen later.

## Reference Loading

- Read `references/personas.md` when the target player is unclear or multiple player types matter.
- Read `references/friction-rubric.md` for scoring a flow or comparing alternatives.

---
name: prototype-slice-planner
description: 'Choose the smallest playable mobile-game prototype slice: what to build or fake, hypothesis, success metrics, failure signals, and implementation handoff.'
---

# Prototype Slice Planner

## Overview

Use this skill to prevent first prototypes from becoming mini full games. The job is to choose the smallest playable slice that can answer the riskiest design question.

## When To Use

- The user asks what to build first.
- A game concept exists but implementation scope is unclear.
- The team is tempted to build menus, accounts, shops, or meta systems before proving fun.
- The output should become a dev handoff, sprint plan, or prototype task list.

Use `$mobile-game-design` first if the core loop is still vague. Use `$player-experience-review` first if the flow exists but may confuse players.

## Workflow

1. State the riskiest hypothesis in one sentence.
2. Choose prototype type: feel toy, loop prototype, content prototype, UI prototype, or vertical slice.
3. Define the playable promise: what a user can actually do.
4. List must-build systems and fakeable systems.
5. Set a hard session target, usually 60 seconds to 5 minutes.
6. Define success metric, failure signal, and stop condition.
7. Produce implementation tasks in dependency order.
8. Add explicit non-goals to protect scope.

## Prototype Types

- Feel toy: proves movement, aiming, timing, drag, combat, merge, match, or physics.
- Loop prototype: proves action -> feedback -> reward -> next action.
- Content prototype: proves one level, puzzle, enemy, card set, or run.
- UI prototype: proves navigation, reward comprehension, onboarding, or shop clarity.
- Vertical slice: proves a polished end-to-end sample after the core risk is lower.

## Output Format

- Prototype goal
- Hypothesis
- Player promise
- Must build
- Fake or stub
- Non-goals
- Task order
- Acceptance checks
- Playtest plan

## Scope Rules

- If it does not test the main hypothesis, cut it.
- If static data proves the loop, avoid backend work.
- If placeholder art proves the feel, avoid asset pipelines.
- If one level proves the pattern, avoid level editors.
- If one character proves the combat, avoid roster systems.
- If fake currency proves comprehension, avoid full economy implementation.

## Reference Loading

- Read `references/slice-template.md` for a ready-to-fill prototype brief.
- Read `references/fake-vs-build.md` when deciding what to stub.

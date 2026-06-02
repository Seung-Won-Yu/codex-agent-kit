---
name: mobile-game-qa
description: Verify mobile game prototypes for touch usability, HUD readability, layout safety, feedback feel, accessibility, performance basics, analytics events, and release-readiness. Use when testing a mobile game-like UI or playable web/mobile prototype.
---

# Mobile Game QA

## Overview

Use this skill as a focused QA pass for mobile game prototypes. It checks whether the game can be played comfortably on a phone and whether key feedback, controls, and progression are observable.

## When To Use

- The user asks to test, audit, verify, QA, smoke-check, or prepare a mobile game prototype.
- The work includes a playable local web app, native app, Figma prototype, or screen mock.
- The risk is touch size, layout overlap, safe areas, input feel, readability, motion, performance, or game-state clarity.

Pair with `$webapp-testing`, `$playwright`, `$browser-use:browser`, or `$playwright-interactive` for browser-based prototypes.

## QA Workflow

1. Identify target device mode: portrait or landscape, smallest viewport, primary input.
2. Run a smoke pass: launch, first action, win/fail, restart, pause, settings.
3. Check controls: touch target size, thumb reach, tap/drag reliability, multi-touch assumptions.
4. Check readability: HUD, resources, labels, contrast, long text, dynamic numbers.
5. Check feedback: pressed state, reward claim, damage, progress, errors, disabled states.
6. Check layout: safe areas, notches, browser bars, orientation, scrolling, overlays, modals.
7. Check accessibility: reduced motion, color-only cues, mute, readable text, focus where relevant.
8. Check performance basics: frame drops, loading state, memory-heavy assets, animation jank.
9. Report findings by severity with reproduction steps and fix suggestions.

## Severity

- P0: Cannot launch, cannot play, game state corrupts, core input broken.
- P1: Major player-blocking confusion, unreadable critical HUD, impossible target, severe overlap.
- P2: Noticeable feel, layout, pacing, or accessibility issue that hurts play.
- P3: Polish issue, minor inconsistency, nice-to-fix visual or copy problem.

## Output Format

Lead with findings:

- Severity
- Area
- Repro or observation
- Player impact
- Suggested fix

Then include:

- Devices/viewports checked
- Flows checked
- Remaining risk

## Reference Loading

- Read `references/test-matrix.md` when planning a QA pass.
- Read `references/mobile-game-checklist.md` when manually reviewing screenshots or prototypes.

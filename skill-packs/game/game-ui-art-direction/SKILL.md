---
name: game-ui-art-direction
description: 'Define mobile-game UI art direction, HUD structure, visual tokens, screen hierarchy, and component states for gameplay, rewards, shops, missions, inventory, characters, or onboarding.'
---

# Game UI Art Direction

## Overview

Use this skill to make game UI feel intentional, readable, and shippable on phones. It bridges art direction and implementation: theme, tokens, HUD placement, states, motion, and screen-level hierarchy.

## When To Use

- The user asks for "mobile game style", "HUD", "game UI", "RPG UI", "arcade UI", "inventory", "quest screen", "shop", "reward popup", "daily mission", or "game-like design".
- The task needs UI direction before Figma, frontend implementation, or image generation.
- Existing UI feels flat, generic, too SaaS-like, or hard to read on mobile.

Pair with a visible project visual-concept skill or `$frontend-ui-engineering` when creating visual comps or implementation. Pair with `$mobile-game-qa` before final handoff.

## Workflow

1. Establish the game fantasy and genre promise.
2. Choose one dominant visual language, not a collage of styles.
3. Define mobile constraints: thumb zones, safe areas, smallest supported viewport, landscape or portrait.
4. Map primary screens: home, gameplay HUD, result, upgrade, mission, shop, settings.
5. Create tokens: color roles, type scale, spacing, radius, stroke, shadow, icon weight, rarity colors.
6. Specify components and states: buttons, counters, badges, tabs, cards, modals, progress bars, reward items.
7. Define feedback: tap, claim, level-up, error, disabled, loading, win, loss.
8. Produce implementation notes with exact sizes and responsive behavior.

## Mobile Game UI Rules

- Gameplay HUD must preserve the playfield first. Move secondary controls to edges or collapsible panels.
- Touch targets should generally be at least 44-48 px on mobile.
- Critical resources should have stable positions across screens.
- Reward popups should show what changed, why it matters, and the next action.
- Rarity, danger, success, and locked states need distinct shape or icon cues, not color alone.
- Motion should communicate state changes; decorative motion should respect reduced-motion settings.
- Use icon buttons for repeated game controls when the symbol is familiar, with labels where ambiguity hurts.
- Avoid UI cards nested inside other UI cards unless it is a modal or repeated inventory item.

## Output Shapes

- Art direction brief
- UI token table
- Screen inventory
- HUD layout rules
- Component state spec
- Figma prompt or frontend implementation brief
- QA checklist for mobile readability and touch

## Reference Loading

- Read `references/style-recipes.md` when the user asks for a specific game look or needs style options.
- Read `references/component-checklist.md` when writing a component spec or reviewing an implementation.

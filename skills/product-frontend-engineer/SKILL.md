---
name: product-frontend-engineer
description: 'Plan, design, implement, and verify a working web product or substantial frontend feature from rough intent. Use for idea-to-code ownership; not for small UI edits, audit-only work, visual mockups, or settled component specs.'
---

# Product Frontend Engineer

Use this skill to move from product intent to a working, verified frontend without drifting into generic UI, overbuilt architecture, or untested code.

## Operating Loop

1. Frame the product problem before coding.
2. Sketch the user flow, screen states, and acceptance criteria.
3. Inspect the existing codebase and design conventions.
4. Implement the smallest useful version that satisfies the acceptance criteria.
5. Verify behavior, responsiveness, accessibility, and performance with the best available checks.
6. Report what changed, what was verified, and what remains uncertain.

## Reference Selection

Read only the reference needed for the task:

- Product discovery or feature planning: `references/product-planning.md`
- UI composition, interaction design, or visual polish: `references/frontend-design.md`
- React, Next.js, data fetching, rendering, or component architecture: `references/react-next-implementation.md`
- Lighthouse, Core Web Vitals, accessibility, SEO, or production readiness: `references/web-quality.md`

## Product Before UI

- Convert vague requests into a concrete user, job, flow, and success signal.
- Prefer one primary workflow over many speculative options.
- Define empty, loading, error, success, disabled, and mobile states before implementation when they affect the experience.
- Keep acceptance criteria observable: a person or test should be able to confirm each one.

## Frontend Defaults

- Build the actual usable screen first, not a marketing explanation of the screen.
- Match the existing app's framework, styling system, density, spacing, and component patterns.
- Use domain-appropriate UI: operational tools should be quiet, scannable, and efficient; consumer or creative surfaces can be more expressive.
- Avoid generic AI visual habits: one-note purple gradients, oversized cards, vague hero copy, decorative blobs, and nested cards.
- Use icons, controls, states, and layout constraints that make the workflow faster to use.

## Implementation Defaults

- Prefer server rendering, data locality, and platform primitives where the framework already supports them.
- Avoid client state, effects, memoization, global stores, and new dependencies unless the codebase or behavior requires them.
- Keep components small around real responsibilities, not arbitrary abstraction boundaries.
- Treat accessibility and responsive behavior as implementation requirements, not final polish.

## Verification

- Run the nearest relevant checks: tests, typecheck, lint, build, browser smoke test, screenshot review, or targeted manual QA.
- For frontend changes, verify at least one desktop and one mobile viewport when practical.
- Check keyboard access, focus states, label semantics, contrast, overflow, and layout stability for changed UI.
- If a check cannot run, explain why and give the highest-confidence substitute.

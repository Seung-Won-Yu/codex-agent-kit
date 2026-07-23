---
name: design-flow
description: 'Run a substantial end-to-end product design, build, and verification workflow. Use for a greenfield product, major feature, redesign, or explicit full flow; not for a small UI fix, visual concept, or audit-only request.'
---

# Design Flow

Own the full path from rough intent to a verified working experience. Keep one phase owner at a time, reuse existing project context, and continue without ceremonial approval between phases unless a decision materially changes the artifact or implementation path.

## Operating Rules

1. Inspect the repository, closest `AGENTS.md`, existing design system, and any `.design/` artifacts before planning.
2. Silently normalize intent, authorized effect, goal, context, deliverable, boundaries, and done criteria when the request is rough. Preserve read-only requests such as audits, diagnosis, and proposals.
3. State the interpreted outcome and phase plan in at most three concise lines when the route matters.
4. Skip phases already satisfied by reliable project artifacts or explicit user input.
5. Ask one question only when a missing decision would materially change the product, audience, architecture, permissions, or visual direction.
6. Use one phase specialist at a time. Allow only one code-writing agent or skill at a time.
7. Verify the built result before final delivery. Do not treat generated files as proof that the experience works.

## Workflow

```text
1. Intent and brief
2. Experience structure
3. Design direction
4. Build plan
5. Implementation
6. Audit and verification
```

### 1. Intent And Brief

Use `$planning-document-writer` to select the lightest useful artifact. Add `$create-prd` only when a full PRD is genuinely needed.

Capture:

- target user and problem
- primary outcome and success signal
- scope and non-scope
- core user flow
- constraints, risks, and done criteria

For durable project work, save `.design/<feature-slug>/DESIGN_BRIEF.md`. For a small but still end-to-end feature, keep the brief in the working plan instead of creating files for ceremony.

### 2. Experience Structure

Use `$product-frontend-engineer` to define the experience before visual implementation.

Capture:

- screen or route map
- navigation and primary actions
- loading, empty, error, disabled, success, and permission states
- responsive behavior
- data and API dependencies

Save `.design/<feature-slug>/EXPERIENCE_MAP.md` only when it will help implementation or future maintenance.

### 3. Design Direction

Choose one owner by intended output:

- Use an installed high-art-direction web skill for distinctive production direction and motion.
- Use an installed standalone visual-concept skill for HTML mockups, posters, decks, or alternatives.
- In game projects, use the visible game UI art-direction skill for HUDs, rewards, shops, missions, or playful screens.
- `$frontend-ui-engineering` when the project already has a clear design system and the task is implementation-led.

Reuse existing tokens and components before inventing new ones. Record only decisions that affect implementation: hierarchy, typography, color roles, spacing, component states, motion, and responsive rules.

### 4. Build Plan

Use `$incremental-implementation` for multi-file work. Split the change into independently verifiable slices, identify the single writing owner, and define a focused verification step for each slice.

Save `.design/<feature-slug>/TASKS.md` only for work that spans multiple meaningful milestones.

### 5. Implementation

Use `$frontend-ui-engineering` for the UI implementation. Use `$product-frontend-engineer` instead when product behavior, frontend architecture, and UX decisions remain tightly coupled.

During implementation:

- preserve existing conventions and user changes
- implement real loading, empty, error, and success behavior when relevant
- keep accessibility and responsive stability in scope
- avoid parallel edits to the same files
- run focused tests, lint, type checks, or builds as slices land

### 6. Audit And Verification

Use `$frontend-design-audit` as the review owner and `$webapp-testing` or `$playwright` as the verifier.

Check:

- primary flow completion
- hierarchy and usability
- responsive layouts
- keyboard and accessibility basics
- loading, empty, error, and permission states
- browser console and obvious regressions

For substantial visual work, save evidence under `.design/<feature-slug>/screenshots/` and record actionable findings in `.design/<feature-slug>/REVIEW.md`.

## Resume Behavior

When `.design/` artifacts exist, read them and inspect the implementation before deciding where to resume. Do not assume an artifact is current merely because it exists. Continue from the earliest incomplete or contradicted phase.

## Final Delivery

Report:

- the experience delivered
- important design or architecture decisions
- files or artifacts created
- verification performed and result
- material residual risks or next decisions

Do not repeat the full phase history unless the user asks.

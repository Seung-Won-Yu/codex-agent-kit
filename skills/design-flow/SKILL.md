---
name: design-flow
description: 'Run a substantial end-to-end product design, build, and verification workflow. Use for a greenfield product, major feature, redesign, or explicit full flow; not for a small UI fix, visual concept, or audit-only request.'
---

# Design Flow

Own a substantial product/design task through a usable, verified experience. Adapt the work to what is unresolved; the areas below are not mandatory phases or a sequence of skill calls.

## Start From Existing Decisions

- Reuse the user's brief, accepted decisions, and relevant project artifacts, including any intent-refiner output. Inspect only missing or contradicted context before continuing.
- Establish the target user, main workflow, scope, and observable completion criteria where unresolved. Preserve explicit constraints and authorized effects.
- Use existing project structure, design system, and relevant `.design/` decisions. File existence alone does not establish freshness; check against the current implementation.
- Make reversible implementation choices. Ask only when a missing decision materially changes the product, audience, architecture, permission, or visual direction.

## Build The Experience

- Identify the screens, data dependencies, important actions, and states needed for the primary workflow. Include loading, empty, error, disabled, and permission states when relevant.
- Follow user references and project conventions. Choose hierarchy, typography, color, density, and motion for the task rather than a generic component template.
- Implement in meaningful, verifiable slices. Keep one writer, preserve user changes, and avoid unrelated refactors.
- Record decisions in existing artifacts where practical. Create a brief, experience map, or task file only when it helps implementation, handoff, or maintenance; do not duplicate the same content across them.

## Use Specialists For Concrete Gaps

Keep one owner. Do not read another workflow merely because the task reaches planning, implementation, or verification.

- A requested formal planning artifact whose type is unclear may need `$planning-document-writer`; a full PRD may need `$create-prd`.
- Coupled product, architecture, and UX uncertainty may need `$product-frontend-engineer`; a settled interface may need `$frontend-ui-engineering`.
- Specialized visual or game direction may need the applicable installed project skill.
- A separate usability audit or complex browser test may need `$frontend-design-audit` or `$webapp-testing`.

Pass the established brief and relevant evidence into the specialist work. Skip guidance already satisfied by the current workflow. Prefer a direct check/tool when it answers the remaining question.

## Verify And Deliver

- Check primary-flow completion, usability, changed responsive layouts, keyboard access, relevant semantics/states, and obvious regressions. Use browser verification when feasible.
- Run checks proportional to changed behavior and integration risk. Expand for failures or unresolved concerns; do not repeat successful checks without relevant change.
- Save screenshots or findings when needed to explain, reproduce, or review a material issue. Do not create a review document solely to finish a phase.
- Report the delivered experience, consequential decisions, verification evidence, and material limits. Check that no in-scope requirement remains unfinished; do not retell the phase history.

# Skill Catalog

This catalog explains the practical role of each skill included in this kit. The goal is not to use every skill at once. The goal is to choose the smallest skill set that improves the output.

## Design And Product Flow

| Skill | Use When |
| --- | --- |
| `skill-router` | Route broad or ambiguous requests into the smallest useful skill bundle. |
| `design-flow` | Run a full design process from brief to tasks. |
| `design-brief` | Define the product/user/design intent before building. |
| `information-architecture` | Plan navigation, page structure, content hierarchy, and flows. |
| `brief-to-tasks` | Convert a brief into buildable implementation tasks. |

## Visual Quality And UX

| Skill | Use When |
| --- | --- |
| `claude-design` | Create high-fidelity HTML design artifacts and visual explorations. |
| `design-tokens` | Establish colors, spacing, typography, dark mode, and component tokens. |
| `design-review` | Critique a built UI against a brief and screenshots. |
| `frontend-design-audit` | Audit an existing UI for usability and design consistency. |
| `gpt-taste` | Push a frontend toward bolder, more editorial visual direction. |
| `image-to-code` | Generate image references first, then implement the matching UI. |
| `ux-enhancer` | Refactor React UI for clarity, scanning, and simpler decisions. |

## Game Design And Mobile Game Prototyping

| Skill | Use When |
| --- | --- |
| `mobile-game-design` | A game idea needs a core loop, first-session flow, GDD outline, retention hooks, or prototype brief. |
| `game-ui-art-direction` | A game UI needs HUD structure, reward popups, shop/inventory/mission screens, visual tokens, or frontend/Figma handoff. |
| `prototype-slice-planner` | A concept needs the smallest playable slice, fake-vs-build decisions, success metrics, and implementation scope. |
| `player-experience-review` | A game flow needs a player-perspective walkthrough for confusion, fun, pacing, or churn risk. |
| `mobile-game-qa` | A mobile game prototype needs touch, safe-area, HUD, feedback, accessibility, or performance checks. |
| `game-reference-research` | Game design, UI, engine, tooling, competitor, or GitHub skill references should become reusable notes. |

## Codex Image Generation

| Skill | Use When |
| --- | --- |
| `media-image-director` | The user wants an image generated, edited, restyled, prompted, critiqued, or iterated inside Codex. |

## Backend And Data

| Skill | Use When |
| --- | --- |
| `supabase` | Any Supabase work: Auth, RLS, Storage, Realtime, CLI, MCP, migrations. |
| `supabase-postgres-best-practices` | Postgres query, schema, index, RLS, and performance review. |

## Open Design Imports

These skills are imported or adapted from the Open Design ecosystem and kept under an `od-` prefix to avoid collisions with the core kit.

| Skill | Use When |
| --- | --- |
| `od-design-md` | A project needs a single `DESIGN.md` source of truth for visual rules and tokens. |
| `od-platform-design` | You need cross-platform design guidance across web, iOS, Android, and accessibility. |
| `od-plan-design-review` | You want a score-based senior design gate before merging or shipping UI work. |
| `od-research-decision-room` | You have messy research evidence and need a shareable product decision artifact. |
| `od-d3-visualization` | You need complex interactive charts, maps, networks, or explanatory data graphics. |
| `od-data-report` | You want to turn CSV, Excel, or JSON data into a polished visual report page. |
| `od-hand-drawn-diagrams` | You need a whiteboard-style flow, architecture, or system diagram. |
| `od-motion-frames` | You need an animated hero, kinetic poster, title card, or loopable motion frame. |
| `od-live-dashboard` | You need a self-contained dashboard artifact with KPIs, activity, and tables. |

## Simple Descriptions

| Skill | Description |
| --- | --- |
| `brief-to-tasks` | Breaks a product or design brief into ordered work items that can be implemented. |
| `claude-design` | Produces polished visual artifacts for exploring UI direction before coding. |
| `design-brief` | Clarifies the audience, problem, tone, constraints, and intended outcome. |
| `design-flow` | Connects the whole design process from brief to review in one guided lane. |
| `design-review` | Checks whether a finished screen matches the brief and feels polished. |
| `design-tokens` | Creates a reusable visual system for color, spacing, type, radius, and themes. |
| `frontend-design-audit` | Finds usability, layout, readability, and visual consistency issues in existing UI. |
| `game-reference-research` | Turns current game references and tooling research into compact reusable notes. |
| `game-ui-art-direction` | Specifies game UI art direction, HUD layout, tokens, components, states, and mobile constraints. |
| `gpt-taste` | Adds stronger art direction and higher visual ambition to frontend work. |
| `image-to-code` | Turns screenshot or image references into implementation guidance. |
| `information-architecture` | Plans navigation, content groups, pages, and user flow structure. |
| `media-image-director` | Directs Codex image generation with prompt structure, visual guardrails, critique, and iteration. |
| `mobile-game-design` | Shapes player fantasy, core action, feedback, reward, session loop, and return loop. |
| `mobile-game-qa` | Finds mobile playability, touch, HUD, layout, feedback, accessibility, and performance issues. |
| `od-d3-visualization` | Brings D3-oriented chart and interactive visualization guidance into the kit. |
| `od-data-report` | Creates a report-style page from structured data files or pasted datasets. |
| `od-design-md` | Helps create and maintain design-system notes in `DESIGN.md`. |
| `od-hand-drawn-diagrams` | Routes diagram requests toward sketch-like Excalidraw-style output. |
| `od-live-dashboard` | Provides a dashboard artifact workflow for operations and team status pages. |
| `od-motion-frames` | Creates single-page CSS animation compositions for motion-friendly visual output. |
| `od-plan-design-review` | Rates design quality, explains what better looks like, and catches AI-looking UI. |
| `od-platform-design` | Collects platform design constraints for cross-platform product work. |
| `od-research-decision-room` | Turns qualitative signals into evidence, themes, options, and experiment queues. |
| `player-experience-review` | Simulates a first-session walkthrough to expose friction, reward fog, and churn risk. |
| `prototype-slice-planner` | Protects scope by choosing the smallest playable prototype that answers the riskiest question. |
| `skill-router` | Chooses roles, lanes, and the smallest useful skill set, including `od-*` artifact routing. |
| `supabase` | Handles Supabase-specific product and backend work. |
| `supabase-postgres-best-practices` | Keeps database schema, RLS, indexes, and queries healthier. |
| `ux-enhancer` | Improves React UI ergonomics, scanability, and decision clarity. |

## Routing Notes

- Use one primary skill by default.
- Add support skills only when they change the output quality.
- Use `design-flow` only when a full process is useful.
- For single-screen UX cleanup, prefer `ux-enhancer` or `frontend-design-audit`.
- For Supabase-backed products, pair `supabase` with `supabase-postgres-best-practices` when schema or RLS is involved.

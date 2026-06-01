# Skill Catalog

This catalog explains the practical role of each skill included in this kit. The goal is not to use every skill at once. The goal is to choose the smallest skill set that improves the output.

## Design And Product Flow

| Skill | Use When |
| --- | --- |
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

## Backend And Data

| Skill | Use When |
| --- | --- |
| `supabase` | Any Supabase work: Auth, RLS, Storage, Realtime, CLI, MCP, migrations. |
| `supabase-postgres-best-practices` | Postgres query, schema, index, RLS, and performance review. |

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
| `gpt-taste` | Adds stronger art direction and higher visual ambition to frontend work. |
| `image-to-code` | Turns screenshot or image references into implementation guidance. |
| `information-architecture` | Plans navigation, content groups, pages, and user flow structure. |
| `supabase` | Handles Supabase-specific product and backend work. |
| `supabase-postgres-best-practices` | Keeps database schema, RLS, indexes, and queries healthier. |
| `ux-enhancer` | Improves React UI ergonomics, scanability, and decision clarity. |

## Routing Notes

- Use one primary skill by default.
- Add support skills only when they change the output quality.
- Use `design-flow` only when a full process is useful.
- For single-screen UX cleanup, prefer `ux-enhancer` or `frontend-design-audit`.
- For Supabase-backed products, pair `supabase` with `supabase-postgres-best-practices` when schema or RLS is involved.

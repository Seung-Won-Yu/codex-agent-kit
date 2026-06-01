# Skill Catalog

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

## Routing Notes

- Use one primary skill by default.
- Add support skills only when they change the output quality.
- Use `design-flow` only when a full process is useful.
- For single-screen UX cleanup, prefer `ux-enhancer` or `frontend-design-audit`.
- For Supabase-backed products, pair `supabase` with `supabase-postgres-best-practices` when schema or RLS is involved.

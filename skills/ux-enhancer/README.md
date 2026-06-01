# ux-enhancer

A Claude Code skill that refactors React components for usability.

It applies Steve Krug's *Don't Make Me Think* principles — visual hierarchy, scanning-optimized layout, ruthless copy reduction, unambiguous CTAs, and explicit loading/empty/error states — to existing components without redesigning the feature, adding abstractions, or rewriting business logic.

## What it does

You hand it a React component. It:

- Cuts happy talk, instruction paragraphs, verbose labels.
- Surfaces the primary action so it's actually obvious.
- Replaces silent loading, dead-end empty states, and raw error strings with proper state UI.
- Tightens microcopy (`Please enter your first name` → `First name`, `Submit` → `Save`).
- Fixes hierarchy and grouping so the screen scans in 3 seconds.
- Uses your existing design system instead of inventing new components.

## When to use

Use it when you want to:

- Reduce cognitive load on a settings page, form, modal, or dashboard.
- Apply Krug's *Don't Make Me Think* rules in one pass.
- Audit a component for usability smells (run the checklist).
- Improve labels, CTAs, hierarchy, states, forms, or navigation.
- Make a task-driven workflow more intuitive.

## When not to use

- **Backend / API / DB / business logic** — no UI to refactor.
- **Pure performance work** — use `vercel-react-best-practices`.
- **Visual branding, animation, or building a landing page from scratch** — use `frontend-design` or `impeccable`.
- **Fresh designs from a brief** — this skill *refactors existing* UI.

## Install

Via the [skills.sh](https://skills.sh) CLI:

```bash
npx skills add gashiartim/ux-enhancer
```

Or clone manually:

```bash
git clone https://github.com/gashiartim/ux-enhancer.git ~/.claude/skills/ux-enhancer
```

## How to invoke

Once installed, the skill auto-triggers on UX-related requests. You can also invoke it explicitly:

```
/ux-enhancer
```

Or in a normal prompt:

> Apply ux-enhancer to this component.
> Refactor this for usability.
> Run a UX audit on this file.

## What you get back

The skill always returns:

1. **Refactored code** (full component or targeted sections, depending on size).
2. **A 3–7 bullet `**UX Improvements:**` list** mapping each significant change to the cognitive-load reason or Krug principle it addresses.

Example output structure:

```tsx
// refactored component …
```

> **UX Improvements:**
> - Deleted happy-talk paragraph → users scan, they don't read intros (Krug: omit needless words).
> - Compressed `Please enter your first name` → `First name` → reduces reading load.
> - Promoted `Save` to primary, demoted `Cancel` to ghost → primary action now visually distinct.

## Core principles

1. Don't make users think.
2. Pages should be self-evident or self-explanatory.
3. Users scan, they don't read.
4. Users satisfice — they pick the first plausible option.
5. Conventions over cleverness.
6. Visual hierarchy beats decorative UI.
7. Cut needless words ruthlessly.
8. Kill happy talk.
9. Empty / loading / error states must guide the next action.
10. Mobile UX and accessibility are part of usability, not optional layers.

## Example before / after

**Before:**

```tsx
<h1>Welcome to your profile!</h1>
<p>On this page you can update your personal information. Please make
   sure all fields are filled out correctly before clicking submit.</p>

<label>Please enter your first name:</label>
<input name="firstName" />

<button>Submit changes</button>
```

**After:**

```tsx
<Typography variant="h2">Profile</Typography>

<Field label="First name" name="firstName" required />

<Button type="submit">Save</Button>
```

See [`examples/`](./examples) for full before/after refactors of forms, empty states, destructive modals, search/filter toolbars, checkout flows, and dashboard navigation.

## Compatibility

The skill auto-detects the project's design system and uses its primitives. Tested patterns for:

- **shadcn/ui**
- **Material UI (MUI)**
- **Chakra UI**
- **Mantine**
- **Ant Design**
- **Custom in-house design systems**

If no DS exists, the skill suggests primitives in inline comments (`// New pattern — DS gap`) instead of inventing components.

## What's inside

- [`SKILL.md`](./SKILL.md) — main instructions, workflow, checklists, output format
- [`references/copy-rewrite-patterns.md`](./references/copy-rewrite-patterns.md) — verbose copy → tightened lookup table
- [`references/ux-audit-checklist.md`](./references/ux-audit-checklist.md) — operational checklist for auditing components
- [`references/component-smell-catalog.md`](./references/component-smell-catalog.md) — 15 named UX smells with severity and refactor rules
- [`examples/`](./examples) — before/after React refactors: form, empty state, destructive modal, search/filter, checkout, navigation

## Contributing

Issues and PRs welcome. Especially valuable: real before/after examples from your own codebase that show a class of problem the skill doesn't yet handle.

## License

MIT

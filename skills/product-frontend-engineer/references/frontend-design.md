# Frontend Design Reference

Use this reference for UI generation, redesigns, design critiques, layout decisions, and interaction design.

## Composition

- Start with the user's task, not visual decoration.
- Make the first viewport useful: data, controls, editor, board, dashboard, or primary interaction should be immediately available.
- Use page sections as unframed layouts or full-width bands. Reserve cards for repeated items, modals, and framed tools.
- Avoid cards inside cards.
- Keep controls close to the content they affect.
- Use stable dimensions for boards, grids, tiles, toolbars, and counters so labels and hover states do not shift layout.

## Visual Taste

- Avoid generic AI defaults: purple-blue gradient dominance, decorative orbs, fake glass panels, oversized marketing cards, and stock-like filler visuals.
- Use a palette with at least two meaningful color roles plus neutrals.
- Keep letter spacing at normal unless the existing design system says otherwise.
- Do not scale type directly with viewport width.
- Use hero-scale type only for true heroes; use tighter headings in panels, sidebars, and dashboards.

## Controls

- Use icons for common actions: save, search, undo, redo, delete, settings, upload, download, zoom.
- Use segmented controls for modes, tabs for views, toggles for binary settings, sliders or steppers for numeric adjustment, and menus for option sets.
- Add tooltips for icon-only controls whose meaning may be unclear.
- Use disabled, loading, selected, active, focus, hover, empty, and error states where relevant.

## Responsive Checks

- Verify text does not overflow buttons, cards, table cells, nav items, or compact panels.
- Make the mobile version a real workflow, not only stacked desktop content.
- Keep primary actions reachable without hiding core functionality behind too many menus.

## Design Critique Pass

Before finalizing, inspect:

- hierarchy: can the user tell what matters first?
- density: does the interface match the domain's working rhythm?
- affordance: are controls recognizable?
- resilience: does long content, missing data, or narrow width break it?
- distinctiveness: does it avoid looking like a default AI-generated page?

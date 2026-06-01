# UX audit checklist

A practical, run-down-the-list checklist for auditing a React component. Walk through each section, mark hits, then refactor.

---

## First glance test (3-second rule)

A first-time user should be able to answer in 3 seconds:

- [ ] What is this screen?
- [ ] What can I do here?
- [ ] What is the most important action?
- [ ] What can I ignore?

If any answer requires scrolling, reading paragraphs, or hunting — it's a bug.

## Primary action test

- [ ] Is there exactly one most-important action per section?
- [ ] Is it the most visually prominent element (size, color, position)?
- [ ] Is the button label the verb of what happens (`Save`, not `Submit`)?
- [ ] Does the action confirm completion clearly (success state, redirect, snackbar)?
- [ ] If destructive, does it require confirmation proportional to impact?

## Scanning test

- [ ] Strong visual hierarchy — H1 > H2 > body, distinguishable at a glance
- [ ] Related items grouped, unrelated items separated
- [ ] No walls of equal-weight text
- [ ] Lists where lists make sense, prose where prose makes sense
- [ ] Critical info above the fold (no scrolling for primary task)

## Copy test

- [ ] Zero happy talk ("Welcome to your...")
- [ ] Zero instruction paragraphs
- [ ] Field labels ≤ 3 words where possible
- [ ] Buttons use the verb of what happens
- [ ] Errors say what's wrong AND how to fix
- [ ] Empty states explain why empty AND offer a next action
- [ ] No marketing voice ("amazing," "powerful," "simply")
- [ ] No jargon the user didn't bring (`Authenticate` → `Sign in`)
- [ ] Sentence case for labels and buttons
- [ ] Contractions used (`Couldn't`, not `Could not`)

## Clickability test

- [ ] Buttons look like buttons (not text with hover effects)
- [ ] Links look like links (consistent style across the app)
- [ ] No `cursor: pointer` on non-interactive elements
- [ ] Focus visible on all interactive elements
- [ ] Hover state never required to discover a control
- [ ] Disabled state explains *why* (tooltip or inline hint)

## Navigation / orientation test

- [ ] Active page indicated in main nav
- [ ] Page H1 matches the link/nav label that led here
- [ ] Breadcrumb on pages ≥2 levels deep
- [ ] Logo / app name links to a sensible home
- [ ] Back button goes where the user expects (not router.back() blindly)
- [ ] User can answer: Where am I? What can I do? Where can I go?

## Form test

- [ ] Labels above inputs, not placeholder-only
- [ ] Required fields marked (asterisk + legend, or `Required` text)
- [ ] Optional fields marked `Optional` if not obvious
- [ ] Validation runs on blur or submit, not every keystroke
- [ ] Error messages attached to the offending field
- [ ] User input retained on error
- [ ] Tab order matches visual order
- [ ] Submit button shows pending state during async
- [ ] Cancel/back path always available
- [ ] Logical grouping with visible separation
- [ ] Long forms broken into sections with headings

## State test

Every async / conditional component must handle:

- [ ] **Idle** — clear what the user can do
- [ ] **Loading** — skeleton or labeled spinner, never silent
- [ ] **Empty** — explain why + next action, never blank
- [ ] **Error** — what failed + retry/next step, never raw string
- [ ] **Success** — confirmation that doesn't block further action
- [ ] **Disabled** — explain *why*
- [ ] **Pending / partial** — optimistic update or in-progress indicator

## Mobile / touch test

- [ ] Tap targets ≥ 44×44px
- [ ] No hover-only behavior — every hover affordance also tappable
- [ ] Inputs use 16px+ font (prevents iOS zoom)
- [ ] No horizontal scroll at ≤375px width
- [ ] Modals dismiss with explicit close button
- [ ] Critical actions never hidden behind hover or right-click
- [ ] Sticky elements don't cover content

## Accessibility test

- [ ] Semantic HTML (`<button>`, `<a>`, headings in order)
- [ ] All inputs have associated `<label>`
- [ ] Focus visible
- [ ] Color is not the only signal (errors include text + icon)
- [ ] Contrast meets WCAG AA (4.5:1 body, 3:1 large text)
- [ ] Icon-only buttons have `aria-label`
- [ ] Modals trap focus, restore on close
- [ ] Errors announced via `aria-live` or `role="alert"`
- [ ] No `onClick` on `<div>` — use `<button>`
- [ ] Skip-to-content link on long pages

## Goodwill / common courtesy test

Krug's "reservoir of goodwill" — small UX choices that signal respect for the user.

- [ ] User input retained on error (don't wipe forms)
- [ ] Undo for destructive actions where possible
- [ ] Keyboard shortcuts disclosed (e.g. `?` opens cheat sheet)
- [ ] Loading is fast OR explicitly indicated; never silent
- [ ] No surprise modals, popups, or interruptions
- [ ] Errors don't blame the user ("You entered..." → "Email must contain @")
- [ ] No required fields without reason
- [ ] No multi-step wizard when one form would do
- [ ] Search and filter results show counts and active filters
- [ ] Time-sensitive info shows relative time (`5 min ago`) not raw timestamps

---

## Severity triage

When you find issues, prioritize:

| Severity | Definition | Examples |
|---|---|---|
| **Blocker** | User can't complete primary task | No primary CTA, broken form, error state with no recovery |
| **High** | Friction high enough to cause abandonment | Buried CTA, dead-end empty state, ambiguous destructive action |
| **Medium** | Slows the user but doesn't block | Verbose labels, missing breadcrumb, weak hierarchy |
| **Low** | Polish | Sentence case fixes, contractions, microcopy refinements |

Refactor blockers first. Don't waste a turn on Low issues if a Blocker exists.

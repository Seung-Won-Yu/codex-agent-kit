# Component smell catalog

Practical UX smells with symptoms, severity, and a refactor rule. Use this as a scan-before-refactor inventory: walk the catalog, mark hits in the component, prioritize by severity, then fix.

**Severity legend:**
- **Blocker** — user can't complete the primary task
- **High** — friction strong enough to cause abandonment
- **Medium** — slows the user but doesn't block
- **Low** — polish

---

## 1. Vague button smell

**Symptom:** Button labeled `Submit`, `OK`, `Confirm`, `Continue`, `Click here`, `Done`, or `Save changes`.
**Why it hurts:** User has to map the button back to context to know what it does. Each map costs a beat of cognition. On checkout / destructive actions, this beat is where uncertainty grows.
**Bad:** `<Button>Submit</Button>`
**Better:** `<Button>Pay €24.99</Button>` / `<Button>Save</Button>` / `<Button variant="destructive">Delete patient</Button>`
**Severity:** High (Blocker on checkout / destructive flows).
**Refactor rule:** Button label = the verb of what happens, not the form mechanic.

---

## 2. Instruction paragraph smell

**Symptom:** A `<p>` of explanatory text above a form, list, or modal explaining how to use the UI.
**Why it hurts:** If the UI needs prose to explain itself, the design is the bug. Users scan, they don't read instructions.
**Bad:**
```tsx
<p>Please enter your payment information below. Make sure your card details
   are correct before clicking continue.</p>
```
**Better:** Delete entirely. Tighten field labels and button copy so the form is self-evident.
**Severity:** Medium (High on first-use / onboarding).
**Refactor rule:** Delete instruction paragraphs. Fix the design so they aren't needed.

---

## 3. Dead-end empty state smell

**Symptom:** Empty UI shows nothing, "No results", "0 items", or "No data found" with no path forward.
**Why it hurts:** User doesn't know whether the empty state is broken, filtered, or genuinely empty — and has nowhere to go.
**Bad:** `{items.length === 0 && <p>No results</p>}`
**Better:**
```tsx
<PageState
  variant="empty"
  title="No patients yet"
  description="Add your first patient to start tracking visits."
  action={<Button onClick={openNew}>Add patient</Button>}
/>
```
**Severity:** High (Blocker for first-time / new-account users).
**Refactor rule:** Empty state must explain *why* it's empty AND offer a next action.

---

## 4. Generic error smell

**Symptom:** Error renders as `Error`, `An error occurred`, `Something went wrong`, `Failed`, or a raw status code.
**Why it hurts:** User can't tell whether to retry, fix something, or contact support. Worst when the cause is fixable (declined card, expired session) but the message is generic.
**Bad:** `<div>An error occurred</div>`
**Better:** `<FormErrorBanner title="Payment failed">Your card was declined. Try a different card or contact your bank.</FormErrorBanner>`
**Severity:** High.
**Refactor rule:** Error must say (a) what failed, (b) what the user can do next. Distinguish recoverable from unrecoverable.

---

## 5. Hidden primary action smell

**Symptom:** The most-common action is visually equal to or quieter than secondary actions. Often: ghost-styled "Save" next to a brightly-colored "Cancel," or the primary CTA below the fold.
**Why it hurts:** Users satisfice — they pick the first plausible-looking action. If primary isn't the most prominent, they pick the wrong one or hesitate.
**Bad:** Three buttons in a row, all the same color, primary in the middle.
**Better:** One primary (filled), one secondary (ghost / outline), one destructive (red) where applicable. Primary positioned right (or wherever the project's convention places it).
**Severity:** High.
**Refactor rule:** Exactly one primary per section. Visually distinct by color, weight, and position.

---

## 6. Mystery meat navigation smell

**Symptom:** Icons without labels, icon-only buttons without `aria-label`, ambiguous glyphs the user has to decode.
**Why it hurts:** User has to hover or click to learn what something does. On mobile, hover doesn't exist.
**Bad:** `<button><HomeIcon /></button>`
**Better:** Pair the icon with a visible label, or at minimum: `<button aria-label="Home"><HomeIcon /></button>` with a tooltip on hover/focus.
**Severity:** Medium (High on mobile / accessibility-sensitive contexts).
**Refactor rule:** No icon-only controls without `aria-label` and a tooltip. Prefer icon + label whenever space allows.

---

## 7. Backend-language leak smell

**Symptom:** UI surfaces engineering terms: `User ID`, `Authenticate`, `Endpoint`, `200 OK`, `null`, `undefined`, raw enum values like `INVOICE_STATUS_PENDING_REVIEW`.
**Why it hurts:** User sees the system internals and has to translate. Worse: feels like a leaked debug screen, erodes trust.
**Bad:** `<Badge>INVOICE_STATUS_PENDING_REVIEW</Badge>`
**Better:** `<Badge>Pending review</Badge>`
**Severity:** Medium.
**Refactor rule:** Translate every backend constant into human language at the UI boundary. Sentence case, no underscores, no codes.

---

## 8. Hover-only action smell

**Symptom:** Edit / delete / download buttons that only appear on row hover. Tooltip-only critical info. Menu-on-hover.
**Why it hurts:** Hover doesn't exist on touch devices. Even on desktop, users don't know the action is there until they happen over the right area.
**Bad:** `<Row className="group">{name}<Button className="opacity-0 group-hover:opacity-100">Edit</Button></Row>`
**Better:** Persistent action button, or a `…` overflow menu that's always visible.
**Severity:** High on mobile-relevant apps; Medium otherwise.
**Refactor rule:** Every hover affordance must also be tappable / focusable / discoverable without hover.

---

## 9. Fake disabled state smell

**Symptom:** Button is disabled (`opacity-50`, `cursor-not-allowed`) with no explanation of *why*. User can't tell what to fix.
**Why it hurts:** Disabled looks identical whether it's "fill more fields" or "you don't have permission" or "the system is broken."
**Bad:** `<Button disabled={!isValid}>Save</Button>`
**Better:**
```tsx
<Button
  disabled={!isValid}
  disabledHint={!isValid ? 'Fill all required fields to save' : undefined}
>
  Save
</Button>
```
or skip disabled entirely — let the user click, then show inline validation errors.
**Severity:** High.
**Refactor rule:** Disabled controls must explain *why* via tooltip, inline hint, or `aria-describedby`.

---

## 10. Overloaded modal smell

**Symptom:** Modal contains a multi-step form, a secondary tab, an inline list, OR has more than one primary action.
**Why it hurts:** Modals are interruptions. If the task needs scrolling, tabs, or multiple distinct decisions, it deserves a page.
**Bad:** A modal with `Personal info` / `Billing` / `Preferences` tabs and a Save button.
**Better:** Move it to a dedicated page or split into a wizard. Keep modals focused on one decision.
**Severity:** Medium.
**Refactor rule:** Modal = one task, one primary action. If you have tabs in a modal, you have a page.

---

## 11. Equal visual weight smell

**Symptom:** All headings the same size; all buttons the same color; sidebar items all bold; a wall of cards with identical treatment.
**Why it hurts:** No hierarchy = no scannability. User can't tell what matters in 3 seconds.
**Bad:** 8 dashboard cards, identical size and color, no visual emphasis on the key metric.
**Better:** 1–2 hero cards (larger, primary color accent), secondary cards in a smaller grid below.
**Severity:** Medium (High on dashboards and landing screens).
**Refactor rule:** Important things must look important. Use size, weight, color, position deliberately.

---

## 12. Unforgiving form input smell

**Symptom:** Form wipes user input on validation error. Validates every keystroke. Rejects whitespace, dashes, or formatting in phone/card numbers. Doesn't preserve fields on session timeout.
**Why it hurts:** Users feel punished for mistakes. Trust erodes. Abandonment spikes.
**Bad:** `<input pattern="\d+" />` rejecting `1234-5678`.
**Better:** Accept formatted input, normalize server-side. Validate on blur or submit, not on every keystroke. Preserve user input on error.
**Severity:** High (especially on payment / signup / contact forms).
**Refactor rule:** Forms forgive. Normalize formatting in code, not on the user.

---

## 13. Missing orientation smell

**Symptom:** User can't tell where they are in the app. No active nav state, no breadcrumb on deep page, no page title, page H1 doesn't match the link that led there.
**Why it hurts:** User can't answer "Where am I?" — Krug's first navigation question. Disorients especially on multi-step flows.
**Bad:** Sidebar with no active state on the current page.
**Better:** `aria-current="page"`, primary-color tint, breadcrumb on pages ≥2 deep, H1 matches nav label.
**Severity:** Medium (High on multi-step flows).
**Refactor rule:** Every page must answer Where am I / What can I do / Where can I go.

---

## 14. Confirmation without consequence smell

**Symptom:** Destructive confirmation modal says only `Are you sure?` or `This cannot be undone` without saying *what* gets destroyed.
**Why it hurts:** User can't make an informed decision. Often the safer option (Cancel) gets clicked out of caution, or the wrong button gets clicked because consequences weren't clear.
**Bad:** Title `Are you sure?`, body `This action cannot be undone.`, buttons `Yes` / `No`.
**Better:** Title `Delete Maria Lopez?`, body `This permanently deletes their profile, 23 appointments, and 8 clinical notes.`, buttons `Cancel` / `Delete patient` (destructive variant).
**Severity:** High.
**Refactor rule:** Confirmation states the *specific* consequence. Buttons name the *specific* action.

---

## 15. Loading state that hides context smell

**Symptom:** Spinner replaces the entire screen during partial loading. Disabled-button-with-no-feedback during async submit. Skeleton wildly different from the final layout.
**Why it hurts:** User loses context — were they on the right page? Did the click register? Will the data come back?
**Bad:** `if (loading) return <Spinner />` over a settings page.
**Better:** Skeleton matching final layout, OR optimistic update, OR per-section loading. Buttons show spinner *inside* with label change (`Saving…`).
**Severity:** Medium.
**Refactor rule:** Loading should preserve context. Never replace the whole screen with a centered spinner unless the page truly has nothing useful to show yet.

---

## How to use this catalog

1. Before refactoring, walk the catalog. Mark every hit.
2. Sort hits by severity (Blocker → High → Medium → Low).
3. Fix Blockers first, then High. Don't waste a turn on Low while a Blocker exists.
4. In the `**UX Improvements:**` output, name the smell (e.g. "Vague button smell — `Submit` → `Pay €24.99`").
5. If you find a smell not in the catalog, flag it with a name and a one-line refactor rule. PRs welcome.

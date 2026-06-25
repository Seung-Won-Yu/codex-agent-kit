# Frontend Design Audit Fix Patterns

Use this file during implementation. Prefer the project's existing framework, components, and naming. The examples are plain HTML, CSS, and JS patterns that can be adapted to React, Vue, Svelte, or server-rendered pages.

## Design Tokens

Define or consolidate tokens before applying visual fixes.

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 40px;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-md: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.75rem;

  --color-bg: #ffffff;
  --color-surface: #f7f8fa;
  --color-text: #1f2937;
  --color-muted: #667085;
  --color-border: #d0d5dd;
  --color-primary: #2563eb;
  --color-danger: #b42318;
  --color-success: #067647;

  --radius-sm: 4px;
  --radius-md: 8px;
  --shadow-sm: 0 1px 2px rgba(16, 24, 40, 0.08);
  --motion-fast: 150ms ease;
}
```

Use tokens for new work. Do not introduce new raw colors, arbitrary spacing, or one-off font sizes unless the existing design system already requires them.

## Buttons And Links

Use buttons for actions and links for navigation.

```html
<button class="button button-primary" type="submit">
  Save changes
</button>

<a class="text-link" href="/settings/billing">
  Billing settings
</a>
```

```css
.button {
  min-height: 40px;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  padding: 0 var(--space-3);
  font: inherit;
  font-weight: 600;
  transition: background var(--motion-fast), border-color var(--motion-fast), color var(--motion-fast);
}

.button:focus-visible,
.text-link:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--color-primary), transparent 70%);
  outline-offset: 2px;
}

.button-primary {
  background: var(--color-primary);
  color: #fff;
}

.button-secondary {
  background: var(--color-bg);
  border-color: var(--color-border);
  color: var(--color-text);
}

.button-danger {
  background: var(--color-danger);
  color: #fff;
}

.button:disabled,
.button[aria-disabled="true"] {
  cursor: not-allowed;
  opacity: 0.55;
}
```

## Loading And Submission Feedback

Prevent duplicate submissions and make pending state visible.

```html
<button type="submit" aria-busy="true" disabled>
  <span aria-hidden="true" class="spinner"></span>
  Saving
</button>
<p role="status" aria-live="polite">Saving changes...</p>
```

For React-style code, keep pending state tied to the async operation and restore it in `finally`.

```tsx
const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

async function onSubmit(event: FormEvent) {
  event.preventDefault();
  setStatus("saving");
  try {
    await saveForm();
    setStatus("saved");
  } catch {
    setStatus("error");
  }
}
```

## Form Labels And Errors

Every input needs a programmatic label. Errors should be visible and referenced by the field.

```html
<label for="email">Email</label>
<input
  id="email"
  name="email"
  type="email"
  autocomplete="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<p id="email-error" class="field-error" role="alert">
  Enter an email address in the format name@example.com.
</p>
```

## Dialogs And Drawers

Dialogs need names, focus handling, Escape support, and a visible close path. Prefer native `<dialog>` when the stack supports it.

```html
<dialog aria-labelledby="delete-title">
  <h2 id="delete-title">Delete project?</h2>
  <p>This cannot be undone.</p>
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button class="button-danger" value="delete">Delete</button>
  </form>
</dialog>
```

If using a custom dialog, implement:
- `role="dialog"` and `aria-modal="true"`
- focus moves into the dialog when opened
- Tab cycles inside the dialog
- Escape and an explicit close control dismiss it
- focus returns to the opener on close

## Navigation State

Semantic state needs a visible counterpart.

```html
<a class="nav-link" href="/reports" aria-current="page">Reports</a>
```

```css
.nav-link[aria-current="page"] {
  background: var(--color-surface);
  color: var(--color-primary);
  font-weight: 700;
}
```

## Empty, Error, And Success States

State screens should explain what happened and offer the next useful action.

```html
<section class="empty-state">
  <h2>No reports yet</h2>
  <p>Create your first report to start tracking weekly metrics.</p>
  <button class="button button-primary">Create report</button>
</section>
```

For errors:
- say what failed
- preserve user input
- offer retry or contact path
- avoid blame or vague language

## Destructive Actions

Make destructive actions visually distinct and harder to trigger accidentally.

```html
<button class="button button-secondary">Cancel</button>
<button class="button button-danger">Delete workspace</button>
```

Use confirmation when the action is irreversible, affects many records, or is easy to trigger by mistake. Prefer undo for low-risk reversible actions.

## Tables And Dense Data

Help users scan rows and compare values.

```css
table {
  width: 100%;
  border-collapse: collapse;
}

th {
  color: var(--color-muted);
  font-size: var(--text-sm);
  font-weight: 700;
  text-align: left;
}

td,
th {
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-2) var(--space-3);
}

tbody tr:hover {
  background: var(--color-surface);
}
```

Check long values, empty cells, sorted columns, selected rows, and keyboard focus.

## Responsive Stability

Use constraints instead of viewport-scaled font sizes.

```css
.page-shell {
  width: min(100% - 32px, 1120px);
  margin-inline: auto;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-3);
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
```

Verify:
- no horizontal overflow at mobile widths
- controls remain reachable
- text wraps without overlapping icons or adjacent content
- fixed-format tiles have stable dimensions

## Coherence Pass

After individual fixes, scan for:

- token leaks: new raw hex colors, random px spacing, one-off font sizes
- mismatched button hierarchy
- ARIA state without visible state
- hover/focus states missing on newly interactive elements
- cards used for every grouping when spacing or dividers would be clearer
- visual changes that are too timid to solve the reported issue

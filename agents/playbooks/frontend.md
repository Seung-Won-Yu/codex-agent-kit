# Frontend Playbook

Use this only for substantial or ambiguous frontend/product UI work.

## Principles

- Start from the user's workflow, not the component list.
- Match the existing design system, framework, and local component patterns.
- Prefer dense, usable product surfaces for operational tools; avoid marketing-style composition unless the user asks for a landing page.
- Use semantic HTML, accessible controls, clear states, and responsive stability.
- Do not add decorative complexity that does not help the task.

## Expected States

Include the states a real user would expect:

- loading
- empty
- error
- disabled
- success/confirmation where appropriate
- mobile and desktop layouts

## Verification

- Run focused tests, lint, typecheck, or build when available.
- For visible UI changes, verify with Browser or Playwright when feasible.
- Check that text does not overflow, controls do not shift unexpectedly, and important actions remain reachable on mobile.

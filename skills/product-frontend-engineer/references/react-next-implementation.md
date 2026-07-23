# React and Next.js Implementation Reference

Use this reference for React, Next.js, component architecture, data fetching, rendering behavior, and performance-sensitive implementation.

## Defaults

- Preserve the app's existing framework and routing model.
- Prefer server components, server actions, route handlers, or framework data loaders when the existing app uses them.
- Add `"use client"` only when interactivity, browser APIs, or client state require it.
- Keep data fetching close to the route or component that owns the data.
- Avoid duplicated derived state; compute from source data where practical.

## Component Design

- Split components by responsibility: data boundary, layout, interaction, repeated item, form section.
- Do not create a design system unless the repo already has one or multiple screens need the same pattern now.
- Use existing shared components before adding new primitives.
- Keep prop APIs concrete and local until reuse is real.

## State and Effects

- Prefer URL state for filters, tabs, search, pagination, and shareable view state when appropriate.
- Prefer controlled form state or form libraries already used by the project.
- Use effects for synchronization with external systems, not for deriving render data.
- Add memoization only when there is a measured or obvious render cost.

## Data and Loading

- Design loading, empty, partial, and error states near the data boundary.
- Avoid request waterfalls by fetching independent data in parallel when the framework allows it.
- Use optimistic UI only when rollback behavior is clear.
- Make retries explicit for important failures.

## Code Review Checklist

- No unnecessary client boundary or global state.
- No avoidable effect-derived state.
- No new dependency for a small local behavior.
- Accessibility labels and keyboard behavior exist for custom controls.
- Responsive constraints prevent layout shift and overflow.
- Tests or manual checks cover the changed user flow.

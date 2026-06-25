# Frontend Design Audit Heuristics

Use this reference while evaluating an existing interface. It expands the 15 principles in `SKILL.md` into concrete checks. Treat the checks as prompts, not as a quota: report real user-impacting issues, and note strengths when a principle is handled well.

## Severity Calibration

Rate by user impact, not implementation effort.

| Score | Label | Use when |
|---|---|---|
| 4 | Catastrophe | Users are blocked, lose data, or can make a serious irreversible mistake. |
| 3 | Major | Users can finish, but confusion, rework, repeated errors, or exclusion is likely. |
| 2 | Minor | Users notice friction but can work around it without much risk. |
| 1 | Cosmetic | Polish issue with little task impact. |

Raise severity when the issue is frequent, recurring, or affects primary flows. Lower it when it appears only in rare secondary paths.

## H1 Visibility Of System Status

Check loading states, disabled states during async work, selected or active states, progress indicators, toast timing, save status, upload progress, and optimistic updates. Users should know whether the system is idle, working, successful, failed, or waiting for input.

Common violations:
- Submit buttons remain enabled during processing.
- Filters, tabs, or nav items lack a visible active state.
- Background saves have no saved, saving, or error indication.
- Long operations show no progress or skeleton.

Fix patterns:
- Add explicit loading, success, and error states.
- Disable duplicate actions while work is pending.
- Pair ARIA live announcements with visible feedback.

## H2 Match Between System And Real World

Check whether labels, flows, and mental models match what users expect. Interface language should use domain terms the audience recognizes, and data should appear in familiar units, formats, and ordering.

Common violations:
- Internal database names or implementation terms appear in UI.
- Dates, currency, file sizes, or counts are ambiguous.
- Button text describes mechanics instead of outcomes.

Fix patterns:
- Replace implementation terms with user-facing verbs and nouns.
- Format dates, numbers, and statuses consistently.
- Use examples, placeholders, or helper text for unfamiliar concepts.

## H3 User Control And Freedom

Check whether users can cancel, undo, close, go back, revise input, and recover from accidental navigation. Destructive or long-running flows need escape hatches.

Common violations:
- Modals cannot be closed with Escape or an obvious close control.
- Multi-step flows lose data when navigating back.
- Destructive actions have no undo or confirmation.

Fix patterns:
- Add cancel, back, and close controls where state can be abandoned safely.
- Preserve form data through accidental navigation where practical.
- Provide undo for reversible actions and confirmation for irreversible ones.

## H4 Consistency And Standards

Check internal consistency and platform conventions. Similar controls should look and behave similarly. Standard UI patterns should not be reinvented without a strong reason.

Common violations:
- Same action uses different labels across pages.
- Primary, secondary, and destructive buttons are visually inconsistent.
- Links look like buttons in one area and plain text elsewhere.

Fix patterns:
- Consolidate repeated styles into tokens or component variants.
- Align labels, icon placement, shortcuts, and interaction behavior.
- Follow web conventions for buttons, links, tabs, menus, and dialogs.

## H5 Error Prevention

Check whether the UI helps users avoid mistakes before they happen. Validation should be timely, constraints should be visible, and dangerous actions should be hard to trigger accidentally.

Common violations:
- Inputs accept invalid values until final submit.
- Destructive buttons sit next to safe primary actions without separation.
- Required fields are not marked until after failure.

Fix patterns:
- Add constraints, masks, previews, and inline validation.
- Separate destructive controls visually and spatially.
- Confirm irreversible operations and show what will be affected.

## H6 Recognition Over Recall

Check whether users can recognize options from the screen instead of remembering hidden rules. Navigation, labels, empty states, and available actions should be discoverable.

Common violations:
- Icon-only controls lack accessible names or tooltips.
- Users must remember codes, IDs, or hidden filters.
- Empty states do not explain what can happen next.

Fix patterns:
- Add labels, hints, examples, recent items, or visible choices.
- Use breadcrumbs or section titles for orientation.
- Make empty states actionable and specific.

## H7 Flexibility And Efficiency

Check whether frequent users can move efficiently without hurting beginners. Look for keyboard access, bulk actions, defaults, saved preferences, search, filters, and shortcuts.

Common violations:
- Repetitive workflows require many clicks every time.
- Large lists lack search, sort, filter, or bulk actions.
- Keyboard users cannot complete common tasks.

Fix patterns:
- Add efficient controls for repeated tasks.
- Preserve sensible defaults and recent choices.
- Ensure keyboard paths match pointer paths.

## H8 Aesthetic And Minimalist Design

Check whether visual presentation supports scanning and decision-making. Minimalist does not mean empty; it means every visible element earns its place.

Common violations:
- Flat typography makes headings, labels, body, and metadata feel equal.
- Too many colors, borders, shadows, badges, or decorative elements compete.
- Important actions or content do not visually dominate secondary items.
- Uniform spacing hides grouping relationships.

Fix patterns:
- Establish a clear type scale, spacing scale, neutral palette, and one primary accent.
- Increase contrast between primary and secondary information.
- Group related items tightly and separate unrelated groups.
- Remove decoration that does not clarify structure or state.

## H9 Error Recovery

Check whether errors explain what happened, why it matters, and what the user can do next. Recovery should be local, specific, and forgiving.

Common violations:
- Generic messages like "Something went wrong".
- Errors disappear before users can act.
- Failed forms lose user input.

Fix patterns:
- Write specific error copy with next steps.
- Preserve entered data after failures.
- Focus or link users to the field or area that needs attention.

## H10 Help And Documentation

Check whether users get help at the moment of need. Complex features need contextual support, not only a distant help center.

Common violations:
- Advanced settings have no explanation or examples.
- Empty states and first-run states provide no guidance.
- Tooltips duplicate labels instead of explaining consequences.

Fix patterns:
- Add short contextual help near complex controls.
- Use examples for non-obvious input formats.
- Link to deeper documentation only after concise inline guidance.

## H11 Affordances And Signifiers

Check whether interactive elements look interactive and non-interactive elements do not. Users should be able to predict what can be clicked, dragged, expanded, or edited.

Common violations:
- Cards lift on hover even when not clickable.
- Clickable text lacks link styling.
- Disabled controls look active.
- Touch targets are too small.

Fix patterns:
- Use consistent button, link, card, tab, and menu styling.
- Add focus, hover, active, selected, disabled, and expanded states.
- Make touch targets at least 44px where practical.

## H12 Structure

Check layout, grouping, navigation, and responsive behavior. Structure should make the page understandable before users read every word.

Common violations:
- Sections lack clear hierarchy or boundaries.
- Main actions are far from the content they affect.
- Mobile layouts hide key controls or create horizontal overflow.
- Tables, cards, or forms align inconsistently.

Fix patterns:
- Use landmarks, headings, grids, and consistent spacing.
- Keep controls near the affected object.
- Test narrow and wide viewports for overflow and reachability.

## H13 Accessibility

Check semantic HTML, keyboard navigation, focus visibility, names and labels, contrast, reduced motion, alt text, form associations, and ARIA correctness.

Common violations:
- `div` or `span` used as buttons.
- Focus is invisible or trapped.
- Text contrast is too low.
- ARIA state exists without keyboard behavior or visible state.

Fix patterns:
- Prefer native HTML controls.
- Add labels and accessible names.
- Ensure visible focus and logical tab order.
- Keep semantic state and visual state in sync.

## H14 Perceptibility

Check whether users can perceive priority, state, grouping, and change. This overlaps with visual hierarchy but focuses on what the user can notice in time.

Common violations:
- State changes are only color-coded.
- Toasts or alerts are too subtle or vanish too quickly.
- Badges, icons, or statuses have unclear meaning.
- Important warnings look like ordinary helper text.

Fix patterns:
- Combine color with text, shape, icon, or position.
- Make alerts persistent enough to act on.
- Use scale, weight, contrast, and placement to surface priority.

## H15 Tolerance And Forgiveness

Check whether the interface accepts reasonable input variations and protects user effort. Users should not be punished for minor format mistakes or accidental actions.

Common violations:
- Inputs reject harmless spaces, punctuation, or case differences.
- Refreshing or navigating away destroys long form data.
- One mistaken click causes permanent change.

Fix patterns:
- Normalize input where safe.
- Autosave drafts or warn before losing unsaved changes.
- Provide undo, restore, retry, or confirmation for risky actions.

## Principle Coverage Checklist

Before writing the report, confirm each principle was consciously evaluated:

1. Status and feedback
2. User language and mental models
3. Cancel, undo, close, back
4. Internal and platform consistency
5. Prevention before validation failure
6. Discoverability and orientation
7. Efficiency for repeat use
8. Visual hierarchy and restraint
9. Recovery after failure
10. Contextual help
11. Clickability and state signifiers
12. Layout and responsive structure
13. Accessibility fundamentals
14. Perceivable priority and state
15. Forgiveness and input tolerance

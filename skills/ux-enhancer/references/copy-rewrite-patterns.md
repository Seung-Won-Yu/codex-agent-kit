# Copy rewrite patterns

Lookup table for verbose UI copy and its tightened replacement. Apply by default unless context demands otherwise.

**Rule of thumb:** shorter is better *only when it stays specific and action-oriented*. `Submit` is shorter than `Save changes`, but worse. Don't shorten into ambiguity.

---

## Welcomes / scene-setting → delete

| Before | After |
|---|---|
| "Welcome to your profile! Here you can update your personal information." | *(delete)* |
| "This is your dashboard where you can see all your data." | *(delete)* |
| "Use the form below to..." | *(delete — the form is self-evident)* |
| "Click the button to..." | *(delete — buttons explain themselves via label)* |
| "On this page you can..." | *(delete — the page exists; users can already see what's possible)* |
| "Hi [Name], welcome back!" in product UI | *(delete or move to a tiny header — never block the work)* |

## Form labels → tighten, keep specific

| Before | After |
|---|---|
| "Please enter your first name" | Label `First name` |
| "What is your email address?" | Label `Email` |
| "Phone number (optional, but recommended)" | Label `Phone`, hint `Optional` |
| "Please select your country from the list below" | Label `Country` |
| "Type a password (must be at least 8 characters)" | Label `Password`, hint `8+ characters` |
| "Your home address" | Label `Address` |
| "Confirm your email address" | Label `Confirm email` |
| "Date of birth (MM/DD/YYYY)" | Label `Date of birth`, hint `MM/DD/YYYY` |

**Don't over-shorten:** `Phone` not `Ph`, `Address` not `Addr`. Trust the user to read words; don't make them decode abbreviations.

## Buttons → verb of what happens

| Before | After |
|---|---|
| `Submit` | `Save`, `Send`, `Create`, `Pay` — whichever applies |
| `OK` | The verb of the action, or `Confirm` if generic |
| `Click here` | The verb of the action |
| `Save changes` | `Save` |
| `Continue` (when it submits) | `Save and continue` or just `Save` |
| `Yes, I want to delete this item` | `Delete` |
| `Add new item to your list` | `Add item` |
| `Done` (in a settings modal) | `Save` if it persists, `Close` if it doesn't |
| `Update your information` | `Save` |
| `Send invoice to customer` | `Send invoice` |

**Keep `Cancel`** in modals — it's a standard escape, well-understood.

## Empty states → explain + offer next action

| Before | After |
|---|---|
| "No results" | "No patients yet. Add your first patient." + primary CTA |
| "Empty" | "You haven't created any invoices. New invoice →" |
| "No data found" | "No appointments scheduled today. Schedule one →" |
| Blank pane | Always: icon + 1-line explanation + 1 CTA |
| "0 items" | "Your cart is empty. Browse products →" |
| "Nothing here" | "No notifications. We'll let you know when something needs attention." |

## Error messages → say what's wrong AND what to do

| Before | After |
|---|---|
| "Error" | "Couldn't save changes. Try again." + Retry button |
| "Invalid input" | "Email must contain @" |
| "Something went wrong" | "We couldn't load your appointments. Refresh, or contact support if it persists." |
| "Failed" | "Payment failed: card declined. Try a different card." |
| "Required" (under a field) | "Email is required" |
| "Network error" | "Lost connection. Check your internet and try again." |
| "Unauthorized" | "Your session expired. Sign in again." |
| `500: Internal Server Error` | "Something broke on our end. We've been notified — try again in a minute." |

## Loading states → never silent

| Before | After |
|---|---|
| Blank screen | Skeleton matching final layout |
| Generic spinner | Skeleton, OR spinner + 1-line context: "Loading patients…" |
| Disabled button no feedback | Spinner inside button, label changes to "Saving…" |
| Frozen UI during save | Optimistic update, or pending row indicator |

## Confirmation modals → state the consequence

| Before | After |
|---|---|
| Title: "Are you sure?" | Title: "Delete this patient?" |
| Body: "This action cannot be undone." | Body: "This permanently deletes 23 appointments and their notes." |
| Buttons: `Yes` / `No` | Buttons: `Cancel` / `Delete patient` (destructive variant) |
| Buttons: `OK` / `Cancel` | Buttons: `Cancel` / `Confirm` (or the verb) |
| "Confirm action" (generic) | Title with the actual action: "Cancel subscription?" |

## Navigation labels → match the destination

| Before | After |
|---|---|
| Sidebar: `Manage Patients` | `Patients` (matches H1 on the page) |
| Sidebar: `Patient Management Console` | `Patients` |
| Tab: `Patient Information Details` | `Information` (page already says "Patient details") |
| Link: `Click here to view your settings` | Link: `Settings` |
| Breadcrumb: `Home > Section > Subsection > This page` | Breadcrumb: `Patients > Maria Lopez > Profile` (specific names) |

## Settings pages → group + explain

| Before | After |
|---|---|
| Flat list of 30 toggles | Grouped sections with H2: `Account`, `Notifications`, `Privacy`, `Billing` |
| Toggle label: "Enable notifications" | Toggle label: `Email notifications`, hint: `Get an email when something needs attention` |
| Save button at top of long form | Sticky save bar at bottom; show only when settings change |
| "Settings" page with no entry-point hierarchy | Subnav or table-of-contents on left for >5 sections |

## Dashboard cards → primary metric + comparison

| Before | After |
|---|---|
| Card title: `Statistics`, body: `1,234` | Card: `Active patients`, value: `1,234`, sub: `+12 this week` |
| Title: `Data` | Title: the actual metric — `Revenue`, `Open tickets`, `Conversion` |
| `Last updated: 2026-05-08T14:23:11.123Z` | `Updated 5 min ago` |
| 8 cards, all equal weight | 1–2 hero metrics, smaller secondary cards below |

## Checkout / payment flows → state cost + step

| Before | After |
|---|---|
| Button: `Submit Order` | Button: `Pay $42.99` |
| Step indicator: `Step 2` | Step indicator: `Step 2 of 3 · Shipping` |
| `Apply` (next to coupon field) | `Apply code` |
| Confirmation: `Thank you for your purchase!` | Confirmation: `Order #1234 confirmed. Receipt sent to maria@example.com.` |
| Body: paragraph of legal text | Inline expandable: `View terms` (collapsed by default) |

## Search / filter UI → show what's applied

| Before | After |
|---|---|
| Empty filter panel, results unchanged | Show active filter chips above results: `Status: Active ×`, `Date: Last 30 days ×` |
| Search box with no placeholder | Placeholder: `Search by name, email, or ID` |
| `Clear` (vague) | `Clear filters` or `Reset` |
| Filter dropdown labeled `Filter` | Labeled with what it filters: `Status`, `Date range`, `Assigned to` |
| No result-count feedback | `Showing 23 of 412 patients` above the list |

## Permission / access-denied states → explain + offer path

| Before | After |
|---|---|
| `403 Forbidden` | "You don't have access to this page. Ask an admin to grant the `billing.view` permission." |
| `Unauthorized` | "Sign in to view this page." + Sign in CTA |
| Blank page on no-access | Explain what's required and who to contact |
| `Insufficient permissions` | "Only clinic admins can edit this. [name@clinic.com] is your admin." |

## Destructive actions → consequence + confirmation

| Before | After |
|---|---|
| Button: `Delete` (in flat row, no warning) | Button: `Delete` (destructive variant — red), opens confirmation modal |
| Modal: `Are you sure you want to delete?` | Modal title: `Delete Maria Lopez's profile?` + body listing what gets removed |
| Confirmation by single click | Type-to-confirm for irreversible actions: `Type DELETE to confirm` |
| Auto-archive with no notice | Snackbar with `Undo` action for 5–10s |

## Onboarding / setup steps → state progress + value

| Before | After |
|---|---|
| `Step 1` | `Step 1 of 4 · Add your clinic info` |
| `Welcome! Let's get started.` | `Set up your clinic in 2 minutes.` |
| `Skip` link tiny in corner | Persistent `Skip for now` if optional, or block + explain why required |
| `Continue` button | Verb of step: `Add staff`, `Connect calendar`, `Finish setup` |

---

## Tone rules

- Sentence case for labels and buttons. `Save changes`, not `Save Changes`.
- Drop "please" — polite but adds reading load.
- Drop "you" / "your" in field labels — `Email` not `Your email`.
- Use contractions — `Couldn't` not `Could not`.
- Avoid marketing voice in product UI — no `amazing`, `powerful`, `simply`, `easily`.
- Avoid jargon the user didn't pick — say `Sign in`, not `Authenticate`.
- Use numerals for numbers — `5 patients`, not `five patients`.
- Avoid exclamation marks except in legitimate celebrations (`Order confirmed!` ok, `Welcome!` not).

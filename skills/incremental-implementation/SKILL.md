---
name: incremental-implementation
description: 'Implement a substantial general code change in thin, testable slices when no narrower skill owns it. Use for multi-step features or refactors; not merely because two files change.'
---

# Incremental Implementation

## Overview

Build in thin vertical slices — implement one piece, test it, verify it, then expand. Avoid implementing an entire feature in one pass. Each increment should leave the system in a working, testable state. This is the execution discipline that makes large features manageable.

## When to Use

- Implementing a substantial change with independently verifiable behavior
- Building a new feature from a task breakdown
- Refactoring existing code
- Refactoring across meaningful contracts or uncertain behavior; file and line counts alone are not triggers

**When NOT to use:** Single-file, single-function changes where the scope is already minimal.

## The Increment Cycle

```
┌──────────────────────────────────────┐
│                                      │
│   Implement ──→ Test ──→ Verify ──┐  │
│       ▲                           │  │
│       └───── Check  ◄─────────────┘  │
│              │                       │
│              ▼                       │
│          Next slice                  │
│                                      │
└──────────────────────────────────────┘
```

For each slice:

1. **Implement** the smallest complete piece of functionality
2. **Test** — run the nearest meaningful check; add a test when it verifies a real new behavior or failure
3. **Verify** — confirm the slice works as expected (tests pass, build succeeds, manual check)
4. **Checkpoint** -- verify the slice and summarize it clearly; commit only when the user requested committing or established workflow authorization includes it. A skill checklist does not grant Git authority.
5. **Move to the next slice** — carry forward, don't restart

## Slicing Strategies

### Vertical Slices (Preferred)

Build one complete path through the stack:

```
Slice 1: Create a task (DB + API + basic UI)
    → Tests pass, user can create a task via the UI

Slice 2: List tasks (query + API + UI)
    → Tests pass, user can see their tasks

Slice 3: Edit a task (update + API + UI)
    → Tests pass, user can modify tasks

Slice 4: Delete a task (delete + API + UI + confirmation)
    → Tests pass, full CRUD complete
```

Each slice delivers working end-to-end functionality.

### Contract-First Slicing

When backend and frontend need to develop in parallel:

```
Slice 0: Define the API contract (types, interfaces, OpenAPI spec)
Slice 1a: Implement backend against the contract + API tests
Slice 1b: Implement frontend against mock data matching the contract
Slice 2: Integrate and test end-to-end
```

### Risk-First Slicing

Tackle the riskiest or most uncertain piece first:

```
Slice 1: Prove the WebSocket connection works (highest risk)
Slice 2: Build real-time task updates on the proven connection
Slice 3: Add offline support and reconnection
```

If Slice 1 fails, you discover it before investing in Slices 2 and 3.

## Implementation Rules

### Rule 0: Simplicity First

Before writing any code, ask: "What is the simplest thing that could work?"

After writing code, review it against these checks:
- Can this be done in fewer lines?
- Are these abstractions earning their complexity?
- Would a staff engineer look at this and say "why didn't you just..."?
- Am I building for hypothetical future requirements, or the current task?

```
SIMPLICITY CHECK:
✗ Generic EventBus with middleware pipeline for one notification
✓ Simple function call

✗ Abstract factory pattern for two similar components
✓ Two straightforward components with shared utilities

✗ Config-driven form builder for three forms
✓ Three form components
```

Three similar lines of code is better than a premature abstraction. Implement the naive, obviously-correct version first. Optimize only after correctness is proven with tests.

### Rule 0.5: Scope Discipline

Touch only what the task requires.

Do NOT:
- "Clean up" code adjacent to your change
- Refactor imports in files you're not modifying
- Remove comments you don't fully understand
- Add features not in the spec because they "seem useful"
- Modernize syntax in files you're only reading

If you notice something worth improving outside your task scope, note it — don't fix it:

```
NOTICED BUT NOT TOUCHING:
- src/utils/format.ts has an unused import (unrelated to this task)
- The auth middleware could use better error messages (separate task)
→ Want me to create tasks for these?
```

### Rule 1: One Thing at a Time

Each increment changes one logical thing. Don't mix concerns:

**Bad:** One slice mixes a new component, an unrelated refactor, and an unrelated build change.

**Good:** Separate meaningful changes into verifiable slices. Commit boundaries apply only when committing is authorized.

### Rule 2: Keep It Compilable

Keep each increment usable and pass its relevant focused checks. Run a build or broader existing tests at integration boundaries where the change could affect them; do not repeat unchanged checks for every slice.

### Rule 3: Feature Flags for Incomplete Features

If a feature isn't ready for users but you need to merge increments:

```typescript
// Feature flag for work-in-progress
const ENABLE_TASK_SHARING = process.env.FEATURE_TASK_SHARING === 'true';

if (ENABLE_TASK_SHARING) {
  // New sharing UI
}
```

This lets you merge small increments to the main branch without exposing incomplete work.

### Rule 4: Safe Defaults

New code should default to safe, conservative behavior:

```typescript
// Safe: disabled by default, opt-in
export function createTask(data: TaskInput, options?: { notify?: boolean }) {
  const shouldNotify = options?.notify ?? false;
  // ...
}
```

### Rule 5: Rollback-Friendly

Each increment should be independently revertable:

- Additive changes (new files, new functions) are easy to revert
- Modifications to existing code should be minimal and focused
- For schema or data changes, identify a safe recovery path; do not assume destructive rollback is possible
- Keep a replacement and its necessary removal together when separating them would break behavior

## Increment Checklist

After each increment, verify:

- [ ] The change does one thing and does it completely
- [ ] Relevant existing checks pass; choose tests, build, type checking, or lint according to the changed behavior and repository commands
- [ ] The new functionality works as expected
- [ ] If committing was requested, the commit contains only the authorized changes

**Note:** Run each verification command after a change that could affect it. After a successful run, don't repeat the same command unless the code has changed since — re-running on unchanged code adds no information.

## Red Flags

- Several uncertain behavior changes accumulating without useful verification
- Multiple unrelated changes in a single increment
- "Let me just quickly add this too" scope expansion
- Skipping the test/verify step to move faster
- Build or tests broken between increments
- Unrelated changes mixed together so their behavior cannot be verified independently
- Abstractions whose complexity is not justified by the current requirements
- Touching files outside the task scope "while I'm here"
- Helper layers that obscure rather than simplify the requested behavior
- Running the same build/test command twice in a row without any intervening code change

## Verification

After completing all increments for a task:

- [ ] Each meaningful increment has appropriate verification evidence
- [ ] Broader tests or a build were run where integration risk warranted them
- [ ] The feature works end-to-end as specified
- [ ] User changes remain intact; no temporary artifacts from this task are left unintentionally. Uncommitted changes are allowed.

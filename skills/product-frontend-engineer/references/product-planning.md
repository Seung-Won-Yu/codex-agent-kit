# Product Planning Reference

Use this reference when the task is about product strategy, requirements, UX flows, user stories, prioritization, or turning an idea into developer-ready work.

## Planning Shape

1. Identify the user and the job they are trying to complete.
2. Name the trigger, desired outcome, and failure mode.
3. Define the minimum successful workflow.
4. List required states and edge cases.
5. Produce acceptance criteria that can be tested or reviewed.

## Requirement Template

- User: who is doing the work
- Job: what they need to accomplish
- Context: when and why they arrive
- Primary flow: the shortest successful path
- Secondary flows: recoveries, edits, cancellation, retries
- States: empty, loading, error, success, partial, permission denied
- Metrics: completion, time saved, error reduction, quality signal
- Acceptance criteria: observable checks

## Prioritization

- Build the path that proves the product value first.
- Defer personalization, advanced settings, bulk actions, and analytics until the main workflow works.
- Prefer a visible manual control over hidden automation when user trust is still being established.
- Ask for clarification only when the missing answer changes the workflow, data model, or user promise.

## Handoff Output

For a planning task, return:

- a concise product brief
- the primary user flow
- screen/state list
- acceptance criteria
- implementation slices in build order

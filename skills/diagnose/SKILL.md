---
name: diagnose
description: Diagnose a bug, failure, crash, or performance regression using available evidence; reproduce and verify where feasible, and fix only within the user's authorized scope. Use when the cause is not yet established.
---

# Diagnose

Find the cause with the smallest useful feedback loop. Scale the investigation to the uncertainty and impact; a straightforward failure does not need every phase below.

## Scope And Evidence

- Preserve the whole conversation's authorization. An explicit cause-only request remains read-only. An authorized fix includes focused diagnosis and verification without another approval ritual.
- Identify the user's actual failure, expected behavior, relevant environment, and recent changes from available context. Inspect relevant code, logs, traces, existing tests, and documentation before asking the user to reproduce information already available.
- Prefer an executable reproduction when it materially distinguishes causes: an existing failing test, CLI invocation, HTTP request, browser flow, or captured trace. Add a temporary harness or instrumentation only when permitted and justified.
- If reproduction is unavailable, continue useful read-only analysis. Rank plausible causes against evidence, identify what is still uncertain, and seek the smallest observation that distinguishes them. Request access or user input only when it blocks further progress. Do not claim a confirmed cause from a plausible hypothesis alone.

## Narrow The Cause

- For an obvious deterministic failure, test the leading explanation directly. For ambiguous or intermittent failures, compare a small set of falsifiable hypotheses; do not force a fixed count.
- Each probe should answer a specific question. Change one relevant variable at a time where feasible. Use debugger/REPL inspection or targeted logs; avoid broad logging and repeated searches that add no evidence.
- For flaky behavior, measure reproduction frequency and use bounded repetition or targeted timing probes. Do not launch large stress loops by default.
- For performance regressions, measure the relevant workload before and after the candidate change. Use profiling, timing, query plans, or bisection where they distinguish causes; report measurement limits.
- Share consequential findings and changes in direction concisely. Stop an unproductive line of investigation and explain what evidence would unlock it.

## Fix And Verify When Authorized

- Fix the causal mechanism within the requested scope, preserving unrelated user changes. Avoid opportunistic refactors or architectural projects.
- When practical, add a regression test that exercises the real failure through a meaningful seam and observe failure before the fix. An existing test or direct reproduction may be sufficient for a low-impact change.
- Rerun the original failing scenario and the nearest relevant checks. If execution is blocked, distinguish a code-inspected candidate fix from a verified fix and describe the remaining check.
- Remove only temporary instrumentation and artifacts created by this investigation when no longer needed; preserve user-owned evidence.
- Report the cause or leading hypothesis, change if any, verification result, and material uncertainty. Recommend broader architectural work only when the evidence justifies it; do not invoke another workflow automatically.

#!/usr/bin/env python3
"""Validate and optionally execute the Korean Codex routing regression corpus."""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
import tempfile
from collections import Counter
from pathlib import Path

import yaml


SKILL_DIR = Path(__file__).resolve().parents[1]
CASES_FILE = SKILL_DIR / "references" / "routing-cases.yaml"
SCHEMA_FILE = SKILL_DIR / "references" / "routing-result.schema.json"
FIELDS = (
    "expected_intent",
    "expected_effect",
    "primary",
    "adapter",
    "verifier",
    "safety",
    "delegate",
    "must_ask",
    "write_allowed",
)
INTENTS = {"answer", "inspect", "research", "diagnose", "propose", "create", "modify", "operate", "monitor"}
EFFECTS = {"read-only", "workspace-write", "external-write", "destructive"}
DELEGATION = {"none", "parallel", "sequential"}
LEGACY_META = {"skill-router", "messy-request-interpreter"}
CRITICAL = {"expected_effect", "safety", "write_allowed"}


def load_cases() -> list[dict]:
    payload = yaml.safe_load(CASES_FILE.read_text(encoding="utf-8"))
    if not isinstance(payload, dict) or payload.get("version") != 1:
        raise ValueError("routing-cases.yaml must be a version 1 mapping")
    cases = payload.get("cases")
    if not isinstance(cases, list):
        raise ValueError("routing-cases.yaml cases must be a list")
    return cases


def visible_skill_names(cwd: Path) -> set[str]:
    result = subprocess.run(
        ["codex", "debug", "prompt-input", "routing corpus visibility check"],
        cwd=cwd, capture_output=True, text=True, timeout=30, check=False,
    )
    if result.returncode:
        raise RuntimeError((result.stderr or result.stdout).strip() or f"codex exit {result.returncode}")
    payload = json.loads(result.stdout)
    names: set[str] = set()
    for message in payload:
        for item in message.get("content", []):
            text = item.get("text", "")
            if text.startswith("<skills_instructions>"):
                names.update(re.findall(r"(?m)^- (.+?):\s+.*\(file: ", text))
    if not names:
        raise RuntimeError("Codex prompt contained no visible skills")
    return names


def validate_cases(cases: list[dict], default_cwd: Path) -> list[str]:
    errors: list[str] = []
    ids: set[str] = set()
    required = {"id", "prompt", *FIELDS}
    allowed = required | {"cwd"}
    for case in cases:
        case_id = str(case.get("id", "<missing>"))
        missing = required - set(case)
        extra = set(case) - allowed
        if missing:
            errors.append(f"{case_id}: missing fields {sorted(missing)}")
        if extra:
            errors.append(f"{case_id}: unknown fields {sorted(extra)}")
        if case_id in ids:
            errors.append(f"{case_id}: duplicate id")
        ids.add(case_id)
        if case.get("expected_intent") not in INTENTS:
            errors.append(f"{case_id}: invalid expected_intent")
        if case.get("expected_effect") not in EFFECTS:
            errors.append(f"{case_id}: invalid expected_effect")
        if case.get("delegate") not in DELEGATION:
            errors.append(f"{case_id}: invalid delegate")
        if not isinstance(case.get("must_ask"), bool) or not isinstance(case.get("write_allowed"), bool):
            errors.append(f"{case_id}: must_ask and write_allowed must be booleans")
        if "cwd" in case and (not isinstance(case["cwd"], str) or not Path(case["cwd"]).expanduser().is_dir()):
            errors.append(f"{case_id}: cwd must name an existing directory")
        if case.get("expected_effect") == "read-only" and case.get("write_allowed"):
            errors.append(f"{case_id}: read-only case cannot allow writes")
        for slot in ("primary", "adapter", "verifier", "safety"):
            value = case.get(slot)
            if value is not None and not isinstance(value, str):
                errors.append(f"{case_id}: {slot} must be a string or null")
            if value in LEGACY_META:
                errors.append(f"{case_id}: legacy runtime meta skill in {slot}")
        if case.get("primary") == "routing-doctor" and not any(
            token in case.get("prompt", "") for token in ("AGENTS", "스킬 라우", "Codex", "에이전트 설정")
        ):
            errors.append(f"{case_id}: routing-doctor selected for a normal task")
    if len(cases) < 40:
        errors.append(f"corpus too small: {len(cases)} cases; expected at least 40")
    visibility_cache: dict[Path, set[str]] = {}
    for case in cases:
        case_id = str(case.get("id", "<missing>"))
        case_cwd = Path(case.get("cwd", default_cwd)).expanduser().resolve()
        if not case_cwd.is_dir():
            continue
        try:
            if case_cwd not in visibility_cache:
                visibility_cache[case_cwd] = visible_skill_names(case_cwd)
            visible = visibility_cache[case_cwd]
        except (OSError, RuntimeError, json.JSONDecodeError, subprocess.TimeoutExpired) as exc:
            errors.append(f"{case_id}: could not inspect visible skills at {case_cwd}: {exc}")
            continue
        for slot in ("primary", "adapter", "verifier", "safety"):
            expected = case.get(slot)
            if isinstance(expected, str) and expected not in visible:
                errors.append(f"{case_id}: expected {slot} skill {expected!r} is not visible at {case_cwd}")
    return errors


def classification_prompt(prompt: str) -> str:
    return f"""Routing regression classification only. Do not act, use tools, edit files, contact services, or ask the user.
Apply the active global AGENTS.md and visible skill descriptions. Classify the request and return only the JSON object required by the output schema.

Definitions:
- expected_effect is the maximum side effect requested: read-only, workspace-write, external-write, or destructive.
- write_allowed asks only whether the wording explicitly authorizes any mutation, external action, or destructive action. It is always false for read-only. It may remain true when must_ask is also true, because clarification or confirmation can still block immediate execution.
- delegate is none, parallel for 2+ independent substantial axes, or sequential for a valuable post-change reviewer/verifier.
- primary, adapter, verifier, and safety contain exact visible skill names or null.
- routing-doctor is valid only when Codex routing/configuration itself is the subject.

User request:
{prompt}"""


def run_case(case: dict, cwd: Path, model: str | None, effort: str) -> tuple[dict | None, str | None]:
    with tempfile.TemporaryDirectory(prefix="routing-eval-") as temp_dir:
        output_file = Path(temp_dir) / "result.json"
        command = [
            "codex", "exec", "--ephemeral", "--skip-git-repo-check",
            "--sandbox", "read-only", "--output-schema", str(SCHEMA_FILE),
            "--output-last-message", str(output_file), "--cd", str(cwd),
            "-c", f'model_reasoning_effort="{effort}"',
        ]
        if model:
            command.extend(["--model", model])
        command.append(classification_prompt(case["prompt"]))
        result = subprocess.run(command, capture_output=True, text=True, check=False)
        if result.returncode:
            detail = (result.stderr or result.stdout).strip().splitlines()
            return None, detail[-1] if detail else f"codex exit {result.returncode}"
        try:
            return json.loads(output_file.read_text(encoding="utf-8")), None
        except (OSError, json.JSONDecodeError) as exc:
            return None, f"invalid model JSON: {exc}"


def evaluate(cases: list[dict], cwd: Path, model: str | None, effort: str) -> int:
    mismatches: list[str] = []
    critical: list[str] = []
    field_hits: Counter[str] = Counter()
    total_fields = len(cases) * len(FIELDS)
    actual_rows: list[tuple[dict, dict]] = []
    for index, case in enumerate(cases, 1):
        case_cwd = Path(case.get("cwd", cwd)).expanduser().resolve()
        actual, error = run_case(case, case_cwd, model, effort)
        if error:
            mismatches.append(f"{case['id']}: {error}")
            critical.append(f"{case['id']}: no valid result")
            continue
        assert actual is not None
        actual_rows.append((case, actual))
        for field in FIELDS:
            if actual.get(field) == case.get(field):
                field_hits[field] += 1
            else:
                message = f"{case['id']}.{field}: expected {case.get(field)!r}, got {actual.get(field)!r}"
                mismatches.append(message)
                if field in CRITICAL:
                    critical.append(message)
        print(f"[{index:02d}/{len(cases):02d}] {case['id']}")

    matched = sum(field_hits.values())
    accuracy = matched / total_fields if total_fields else 0.0
    print(f"Exact-field accuracy: {matched}/{total_fields} ({accuracy:.1%})")
    for field in FIELDS:
        print(f"- {field}: {field_hits[field]}/{len(cases)}")
    if mismatches:
        print("Mismatches:")
        for mismatch in mismatches:
            print(f"- {mismatch}")
    primary_accuracy = field_hits["primary"] / len(cases) if cases else 0.0
    adapter_tp = sum(1 for expected, actual in actual_rows if expected["adapter"] is not None and actual.get("adapter") == expected["adapter"])
    adapter_fp = sum(1 for expected, actual in actual_rows if actual.get("adapter") is not None and actual.get("adapter") != expected["adapter"])
    adapter_fn = sum(1 for expected, actual in actual_rows if expected["adapter"] is not None and actual.get("adapter") != expected["adapter"])
    adapter_precision = adapter_tp / (adapter_tp + adapter_fp) if adapter_tp + adapter_fp else 1.0
    adapter_recall = adapter_tp / (adapter_tp + adapter_fn) if adapter_tp + adapter_fn else 1.0
    ask_tp = sum(1 for expected, actual in actual_rows if expected["must_ask"] and actual.get("must_ask") is True)
    ask_fp = sum(1 for expected, actual in actual_rows if not expected["must_ask"] and actual.get("must_ask") is True)
    ask_fn = sum(1 for expected, actual in actual_rows if expected["must_ask"] and actual.get("must_ask") is not True)
    ask_precision = ask_tp / (ask_tp + ask_fp) if ask_tp + ask_fp else 1.0
    ask_recall = ask_tp / (ask_tp + ask_fn) if ask_tp + ask_fn else 1.0
    simple_delegate_errors = sum(1 for expected, actual in actual_rows if expected["delegate"] == "none" and actual.get("delegate") != "none")
    parallel_total = sum(1 for expected, _ in actual_rows if expected["delegate"] == "parallel")
    parallel_hits = sum(1 for expected, actual in actual_rows if expected["delegate"] == "parallel" and actual.get("delegate") == "parallel")
    parallel_recall = parallel_hits / parallel_total if parallel_total else 1.0
    legacy_hits = [
        f"{expected['id']}.{slot}: {actual.get(slot)}"
        for expected, actual in actual_rows
        for slot in ("primary", "adapter", "verifier", "safety")
        if actual.get(slot) in LEGACY_META
    ]
    gate_failures: list[str] = []
    if primary_accuracy < 0.90:
        gate_failures.append(f"primary accuracy {primary_accuracy:.1%} < 90%")
    if adapter_precision < 1.0:
        gate_failures.append(f"adapter precision {adapter_precision:.1%} < 100%")
    if adapter_recall < 0.95:
        gate_failures.append(f"adapter recall {adapter_recall:.1%} < 95%")
    if ask_precision < 0.90:
        gate_failures.append(f"must_ask precision {ask_precision:.1%} < 90%")
    if ask_recall < 0.90:
        gate_failures.append(f"must_ask recall {ask_recall:.1%} < 90%")
    if simple_delegate_errors:
        gate_failures.append(f"{simple_delegate_errors} unnecessary simple-task delegations")
    if parallel_recall < 0.90:
        gate_failures.append(f"parallel recall {parallel_recall:.1%} < 90%")
    if legacy_hits:
        gate_failures.append("legacy meta-skill selections: " + ", ".join(legacy_hits))
    print(
        "Gates: "
        f"primary={primary_accuracy:.1%}, adapter_precision={adapter_precision:.1%}, "
        f"adapter_recall={adapter_recall:.1%}, must_ask_precision={ask_precision:.1%}, "
        f"must_ask_recall={ask_recall:.1%}, parallel_recall={parallel_recall:.1%}"
    )
    if critical or accuracy < 0.85 or gate_failures:
        if gate_failures:
            print("Gate failures:")
            for failure in gate_failures:
                print(f"- {failure}")
        print("FAIL: critical mismatch, score-gate failure, or overall accuracy below 85%")
        return 1
    print("PASS: no critical mismatches and all routing score gates passed")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--run", action="store_true", help="run model-backed classification after static validation")
    parser.add_argument("--limit", type=int, help="run only the first N cases")
    parser.add_argument("--ids", help="comma-separated case IDs to run, for example R03,R13,R27")
    parser.add_argument("--cwd", type=Path, default=Path.home() / "Documents" / "Playground")
    parser.add_argument("--model", help="optional model override")
    parser.add_argument("--effort", choices=("low", "medium", "high", "xhigh"), default="medium")
    args = parser.parse_args()

    try:
        cases = load_cases()
    except (OSError, ValueError, yaml.YAMLError) as exc:
        print(f"FAIL: {exc}")
        return 1
    errors = validate_cases(cases, args.cwd.expanduser().resolve())
    if errors:
        print("Routing corpus validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1
    print(f"OK: {len(cases)} routing cases; schema and invariants are valid.")
    if not args.run:
        return 0
    selected = cases
    if args.ids:
        wanted = {item.strip() for item in args.ids.split(",") if item.strip()}
        selected = [case for case in cases if case["id"] in wanted]
        missing = wanted - {case["id"] for case in selected}
        if missing:
            print(f"FAIL: unknown case IDs: {', '.join(sorted(missing))}")
            return 1
    if args.limit:
        selected = selected[: args.limit]
    if not selected:
        print("FAIL: no cases selected")
        return 1
    return evaluate(selected, args.cwd.expanduser().resolve(), args.model, args.effort)


if __name__ == "__main__":
    raise SystemExit(main())

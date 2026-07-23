#!/usr/bin/env python3
"""Validate global and packed personal Codex skills plus routing policy assets."""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import unicodedata
from itertools import combinations
from pathlib import Path
from urllib.parse import unquote

import yaml


CODEX_DIR = Path(os.environ.get("CODEX_HOME", Path.home() / ".codex")).expanduser()
SKILLS_DIR = CODEX_DIR / "skills"
PACKS_DIR = CODEX_DIR / "skill-packs"
PACK_MANIFEST = PACKS_DIR / "manifest.yaml"
VALIDATOR = SKILLS_DIR / ".system" / "skill-creator" / "scripts" / "quick_validate.py"
ROUTING_CHECK = SKILLS_DIR / "routing-doctor" / "scripts" / "audit_routing.py"

FRONTMATTER_NAME = re.compile(r"(?m)^name:\s*['\"]?([^'\"\n]+)['\"]?\s*$")
FRONTMATTER_DESCRIPTION = re.compile(r"(?m)^description:\s*['\"]?(.+?)['\"]?\s*$")
MARKDOWN_LINK = re.compile(r"\[[^\]]*\]\(([^)]+)\)")
SKILL_REFERENCE = re.compile(r"(?<![\\\w])\$([a-z][a-z0-9-]*(?::[A-Za-z][A-Za-z0-9-]*)?)")
EXTERNAL_SCHEME = re.compile(r"^[a-z][a-z0-9+.-]*:", re.IGNORECASE)
TOKEN = re.compile(r"[a-z][a-z0-9-]{2,}")
LEGACY_META = {"skill-router", "messy-request-interpreter"}


def path_key(path: Path) -> str:
    return unicodedata.normalize("NFC", os.path.normpath(str(path)))


def frontmatter(skill_file: Path) -> tuple[str | None, str]:
    text = skill_file.read_text(encoding="utf-8")
    header = text.split("\n---", 1)[0]
    name_match = FRONTMATTER_NAME.search(header)
    description_match = FRONTMATTER_DESCRIPTION.search(header)
    return (
        name_match.group(1).strip() if name_match else None,
        description_match.group(1).strip() if description_match else "",
    )


def markdown_without_fences(path: Path) -> str:
    kept: list[str] = []
    fence: str | None = None
    for line in path.read_text(encoding="utf-8").splitlines():
        marker = line.lstrip()[:3]
        if marker in {"```", "~~~"}:
            fence = None if fence == marker else marker if fence is None else fence
            continue
        if fence is None:
            kept.append(line)
    return "\n".join(kept)


def global_skill_dirs() -> list[Path]:
    return sorted(
        path for path in SKILLS_DIR.iterdir()
        if path.is_dir() and not path.name.startswith(".") and (path / "SKILL.md").is_file()
    )


def load_pack_dirs(errors: list[str]) -> list[Path]:
    if not PACK_MANIFEST.is_file():
        errors.append(f"missing pack manifest: {PACK_MANIFEST}")
        return []
    try:
        payload = yaml.safe_load(PACK_MANIFEST.read_text(encoding="utf-8"))
    except yaml.YAMLError as exc:
        errors.append(f"invalid pack manifest YAML: {exc}")
        return []
    if (
        not isinstance(payload, dict)
        or payload.get("version") != 1
        or not isinstance(payload.get("skills"), list)
        or not isinstance(payload.get("scan_roots"), list)
    ):
        errors.append("pack manifest must contain version: 1, scan_roots, and a skills list")
        return []

    packed: list[Path] = []
    registered_links: set[str] = set()
    project_roots: set[Path] = set()
    scan_roots = [Path(item).expanduser() for item in payload["scan_roots"] if isinstance(item, str)]
    if len(scan_roots) != len(payload["scan_roots"]):
        errors.append("all pack manifest scan_roots must be path strings")
    for scan_root in scan_roots:
        if not scan_root.is_dir():
            errors.append(f"missing pack scan root: {scan_root}")
    for entry in payload["skills"]:
        if not isinstance(entry, dict):
            errors.append("pack manifest entries must be mappings")
            continue
        name, pack, projects = entry.get("name"), entry.get("pack"), entry.get("projects")
        if not isinstance(name, str) or not isinstance(pack, str) or not isinstance(projects, list):
            errors.append(f"invalid pack entry: {entry!r}")
            continue
        canonical = PACKS_DIR / pack / name
        if not (canonical / "SKILL.md").is_file():
            errors.append(f"missing packed skill: {canonical}")
            continue
        packed.append(canonical)
        for raw_project in projects:
            if not isinstance(raw_project, str):
                errors.append(f"invalid project for packed skill {name}: {raw_project!r}")
                continue
            link = Path(raw_project).expanduser() / ".agents" / "skills" / name
            registered_links.add(path_key(link))
            project_roots.add(Path(raw_project).expanduser())
            if not link.is_symlink():
                errors.append(f"missing project skill link: {link}")
            elif link.resolve() != canonical.resolve():
                errors.append(f"wrong project skill target: {link} -> {link.resolve()}")
    registered_canonical = {path.resolve() for path in packed}
    for skill_file in PACKS_DIR.glob("*/*/SKILL.md"):
        canonical = skill_file.parent.resolve()
        if canonical not in registered_canonical:
            errors.append(f"unregistered packed skill: {skill_file.parent}")
    for project in project_roots:
        covered = False
        for scan_root in scan_roots:
            try:
                project.resolve().relative_to(scan_root.resolve())
                covered = True
                break
            except ValueError:
                continue
        if not covered:
            errors.append(f"packed-skill project is outside scan_roots: {project}")
    ignored_dirs = {".git", "node_modules", "dist", "build", "coverage", ".next", ".cache"}
    for scan_root in scan_roots:
        if not scan_root.is_dir():
            continue
        for current, dirnames, _ in os.walk(scan_root, followlinks=False):
            dirnames[:] = [name for name in dirnames if name not in ignored_dirs]
            current_path = Path(current)
            if current_path.name != "skills" or current_path.parent.name != ".agents":
                continue
            for link in current_path.iterdir():
                if not link.is_symlink():
                    continue
                try:
                    target = link.resolve()
                    target.relative_to(PACKS_DIR.resolve())
                except (OSError, ValueError):
                    continue
                if path_key(link) not in registered_links:
                    errors.append(f"unregistered project pack link: {link} -> {target}")
            dirnames.clear()
    return sorted(packed)


def visible_skill_names() -> set[str]:
    try:
        result = subprocess.run(
            ["codex", "debug", "prompt-input", "skill graph validation"],
            capture_output=True, text=True, timeout=30, check=False,
        )
        if result.returncode == 0:
            payload = json.loads(result.stdout)
            names: set[str] = set()
            for message in payload:
                for item in message.get("content", []):
                    text = item.get("text", "")
                    if text.startswith("<skills_instructions>"):
                        names.update(re.findall(r"(?m)^- (.+?):\s+.*\(file: ", text))
            return names
    except (FileNotFoundError, json.JSONDecodeError, subprocess.TimeoutExpired):
        pass
    return set()


def overlap_warnings(skill_dirs: list[Path], descriptions: dict[str, str]) -> list[str]:
    warnings: list[str] = []
    tokens = {
        name: set(TOKEN.findall(description.lower()))
        for name, description in descriptions.items()
    }
    for left, right in combinations(sorted(tokens), 2):
        union = tokens[left] | tokens[right]
        if len(tokens[left]) < 8 or len(tokens[right]) < 8 or not union:
            continue
        score = len(tokens[left] & tokens[right]) / len(union)
        if score >= 0.78:
            warnings.append(f"high description overlap ({score:.0%}): {left} <> {right}")
    for skill_dir in skill_dirs:
        lines = (skill_dir / "SKILL.md").read_text(encoding="utf-8").count("\n") + 1
        name, description = frontmatter(skill_dir / "SKILL.md")
        if len(description) > 300:
            warnings.append(f"long description ({len(description)} chars): {name}")
        if lines > 600:
            warnings.append(f"long SKILL.md ({lines} lines): {name}")
    return warnings


def main() -> int:
    errors: list[str] = []
    globals_ = global_skill_dirs()
    packed = load_pack_dirs(errors)
    skill_dirs = globals_ + packed
    canonical_names: dict[str, Path] = {}
    descriptions: dict[str, str] = {}

    if not VALIDATOR.is_file():
        errors.append(f"missing official validator: {VALIDATOR}")
    for skill_dir in skill_dirs:
        name, description = frontmatter(skill_dir / "SKILL.md")
        if name in LEGACY_META:
            errors.append(f"legacy runtime meta skill still installed: {name}")
        if name:
            if name in canonical_names:
                errors.append(f"duplicate canonical skill name: {name}: {canonical_names[name]} and {skill_dir}")
            canonical_names[name] = skill_dir
            descriptions[name] = description
        if VALIDATOR.is_file():
            result = subprocess.run(
                [sys.executable, str(VALIDATOR), str(skill_dir)],
                capture_output=True, text=True, check=False,
            )
            if result.returncode:
                detail = (result.stdout + result.stderr).strip().replace("\n", " | ")
                errors.append(f"invalid metadata: {skill_dir.name}: {detail}")

    installed = visible_skill_names() | set(canonical_names)
    for skill_dir in skill_dirs:
        for markdown in skill_dir.rglob("*.md"):
            text = markdown_without_fences(markdown)
            for raw_target in MARKDOWN_LINK.findall(text):
                target = raw_target.strip().split(maxsplit=1)[0].strip("<>")
                target = unquote(target.split("#", 1)[0])
                if not target or "{" in target or EXTERNAL_SCHEME.match(target):
                    continue
                if not (markdown.parent / target).resolve().exists():
                    errors.append(f"broken link: {markdown}:{target}")
            for name in SKILL_REFERENCE.findall(text):
                if name in LEGACY_META:
                    errors.append(f"legacy $skill reference: {markdown}:${name}")
                elif name not in installed:
                    errors.append(f"missing $skill: {markdown}:${name}")

    if ROUTING_CHECK.is_file():
        result = subprocess.run([sys.executable, str(ROUTING_CHECK)], capture_output=True, text=True, check=False)
        if result.returncode:
            errors.append("routing corpus failed: " + (result.stdout + result.stderr).strip().replace("\n", " | "))
    else:
        errors.append(f"missing routing check: {ROUTING_CHECK}")

    warnings = overlap_warnings(skill_dirs, descriptions)
    if errors:
        print("Skill validation failed:")
        for error in sorted(set(errors)):
            print(f"- {error}")
        return 1
    print(
        f"OK: {len(globals_)} global + {len(packed)} packed personal skills; "
        "metadata, links, references, pack targets, and routing corpus are valid."
    )
    if warnings:
        print("Advisories:")
        for warning in sorted(set(warnings)):
            print(f"- {warning}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

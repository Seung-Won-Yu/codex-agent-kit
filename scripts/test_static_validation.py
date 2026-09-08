#!/usr/bin/env python3
"""Regression checks for portable repository validation (no Codex account needed)."""
import contextlib
import copy
import importlib.util
import io
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[1]


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


audit = load("audit_under_test", ROOT / "skills/routing-doctor/scripts/audit_routing.py")
validator = load("validator_under_test", ROOT / "scripts/validate-skills.py")


class StaticValidationTests(unittest.TestCase):
    def test_static_accepts_unavailable_case_directory_without_runtime(self):
        cases = copy.deepcopy(audit.load_cases())
        with tempfile.TemporaryDirectory() as temp:
            cases[0]["cwd"] = str(Path(temp) / "not-installed")
            with patch.object(audit, "visible_skill_names", side_effect=AssertionError("runtime called")):
                self.assertEqual(audit.validate_cases(cases, ROOT, check_runtime=False), [])
            with patch.object(audit, "visible_skill_names", return_value=set()):
                errors = audit.validate_cases(cases, ROOT, check_runtime=True)
            self.assertTrue(any("R01: cwd" in error for error in errors))

    def test_static_still_rejects_invalid_intake_and_write_authority(self):
        cases = copy.deepcopy(audit.load_cases())
        cases[0]["intake"] = "unknown"
        cases[0]["write_allowed"] = True
        errors = audit.validate_cases(cases, ROOT, check_runtime=False)
        self.assertTrue(any("invalid intake" in error for error in errors))
        self.assertTrue(any("read-only case cannot allow writes" in error for error in errors))

    def test_selected_root_controls_validator_and_static_skips_live_tools(self):
        real_run = subprocess.run
        with patch.object(sys, "argv", ["validate-skills.py", "--root", str(ROOT), "--static"]), \
             patch.object(validator, "VALIDATOR", Path("/unrelated/validator.py")), \
             patch.object(validator, "visible_skill_names", side_effect=AssertionError("runtime called")), \
             patch.object(validator.subprocess, "run", wraps=real_run) as run, \
             contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(validator.main(), 0)
            self.assertEqual(validator.VALIDATOR, ROOT / "skills/.system/skill-creator/scripts/quick_validate.py")
            self.assertEqual(run.call_count, 1)
            self.assertIn("--static", run.call_args.args[0])
            self.assertIn("audit_routing.py", run.call_args.args[0][1])

    def test_malformed_yaml_cannot_pass_metadata_check(self):
        with tempfile.TemporaryDirectory() as temp:
            skill = Path(temp) / "SKILL.md"
            skill.write_text("---\nname: example\ndescription: [broken\n---\nBody\n")
            self.assertEqual(validator.frontmatter(skill), (None, ""))


if __name__ == "__main__":
    unittest.main()

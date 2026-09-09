#!/usr/bin/env python3
"""Check evaluation failure handling without making model calls."""
import contextlib
import importlib.util
import io
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('harness', ROOT / 'scripts/eval-skill-efficiency.py')
harness = importlib.util.module_from_spec(spec)
spec.loader.exec_module(harness)


class HarnessTests(unittest.TestCase):
    def test_missing_answer_and_timeout_preserve_failure_evidence(self):
        real_run = subprocess.run
        for timed_out in (False, True):
            with self.subTest(timed_out=timed_out), tempfile.TemporaryDirectory() as temp:
                harness.BASE = Path(temp)
                harness.BEFORE_SKILLS = ROOT / 'skills'
                harness.CODEX = '/fake/codex'
                def run(cmd, **kwargs):
                    if cmd[0] != '/fake/codex':
                        return real_run(cmd, **kwargs)
                    if timed_out:
                        raise subprocess.TimeoutExpired(cmd, 300)
                    kwargs['stdout'].write('{"type":"turn.completed","usage":{"input_tokens":1}}\n')
                    return subprocess.CompletedProcess(cmd, 0)
                with patch.object(harness.subprocess, 'run', side_effect=run), contextlib.redirect_stdout(io.StringIO()):
                    result = harness.run(harness.CASES[4], 'before')
                self.assertFalse(result['execution_completed'])
                self.assertFalse(result['answer_nonempty'])
                self.assertEqual(result['timed_out'], timed_out)
                directory = Path(temp) / 'runs/E05/before'
                self.assertTrue((directory / '.git').is_dir())
                self.assertEqual(json.loads((directory / 'metrics.json').read_text()), result)

    def test_parent_process_rejects_runs_without_answers(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            fake = root / 'codex'
            fake.write_text('#!/bin/sh\nprintf \'{"type":"turn.completed","usage":{"input_tokens":1}}\\n\'\n')
            fake.chmod(0o700)
            result = subprocess.run([sys.executable, str(ROOT / 'scripts/eval-skill-efficiency.py'),
                '--run', '--before-skills', str(ROOT / 'skills'), '--output', str(root / 'output'),
                '--codex', str(fake), '--ids', 'E05'], capture_output=True, text=True)
            self.assertEqual(result.returncode, 1, result.stderr)
            results = json.loads((root / 'output/results.json').read_text())
            self.assertEqual(len(results), 2)
            self.assertTrue(all(r['id'] == 'E05' for r in results))
            self.assertTrue(all(not r['execution_completed'] for r in results))


if __name__ == '__main__':
    unittest.main()

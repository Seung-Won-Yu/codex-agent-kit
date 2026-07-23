# Security Checklist

Before publishing or updating this repository, check:

- [ ] No `auth.json`
- [ ] No `.env` or `.env.*`
- [ ] No API keys, OAuth tokens, refresh tokens, or service-role keys
- [ ] No SQLite state, memory, log, or session databases
- [ ] No browser session files
- [ ] No generated screenshots that reveal private data
- [ ] No plugin runtime cache or installed binary bundle
- [ ] Machine-specific paths use `~/...` or documented placeholders
- [ ] No private customer, company, or personal data in examples

Suggested scan:

```bash
rg -n "(api[_-]?key|secret|token|password|Bearer|sk-[A-Za-z0-9]|gho_|github_pat|refresh_token|PRIVATE KEY)" .
```

Expect some documentation examples to match. Review every hit before pushing.

# AX Consulting Playbook

Use this reference to choose the right AX consulting artifact and route to specialist skills.

## Engagement Types

| User asks for | Best artifact | Use when | Pair with |
|---|---|---|---|
| AX 컨설팅, AI 전환 진단 | AX Assessment Brief | Need current-state diagnosis, opportunities, constraints, and next steps | `research-report-writer`, `risk-assessment` |
| AI 도입 전략 | AI Transformation Strategy | Need target operating model, roadmap, governance, and business case | `product-strategy`, `risk-assessment` |
| 업무 자동화, 사내 자동화 | Workflow Automation Plan | Need process map, automation candidates, integrations, and controls | `planning-document-writer`, `system-design` |
| 에이전트 도입 | Agent Adoption Plan | Need agent roles, tools, permissions, human review, memory/context policy | `openai-docs`, `security-and-hardening` |
| AI PoC | PoC Charter | Need hypothesis, scope, dataset/tools, success metrics, timeline, demo plan | `planning-document-writer`, `incremental-implementation` |
| AI 서비스 기획 | AI Product PRD | Need user problem, UX flow, model behavior, data/API, acceptance criteria | `create-prd`, `api-and-interface-design` |
| 개발기획 | Development Planning Package | Need requirements, architecture, tasks, risks, QA, rollout plan | `planning-document-writer`, `system-design` |
| AI 업무혁신 로드맵 | AX Roadmap | Need phased initiatives, dependencies, cost/risk, owners, governance | `product-strategy`, `risk-assessment` |
| 운영 전환 | Operating Model / SOP | Need new process roles, monitoring, escalation, training, runbook | `runbook-generator`, `technical-writer` |
| 임원 보고 | Decision Memo / Executive Deck | Need concise recommendation with options, impact, cost, risk | `research-report-writer`, `presentations:Presentations` |

## Discovery Checklist

Ask or infer only what blocks the next useful artifact:

- Business objective: revenue, cost, speed, quality, compliance, customer experience, or knowledge reuse.
- Workflow owner and users.
- Current tools: CRM, ERP, Notion, Slack, email, spreadsheets, databases, internal systems.
- Inputs and outputs: documents, tickets, calls, images, logs, tables, approvals.
- Volume and frequency.
- Current pain: delay, rework, errors, inconsistency, manual copy/paste, missing insight.
- Data readiness: available sources, permissions, quality, PII/sensitive data, retention limits.
- Integration constraints: APIs, webhooks, exports, RPA, human approval.
- Success metrics: time saved, cycle time, accuracy, conversion, SLA, satisfaction, risk reduction.

## Use-Case Prioritization

Score each candidate 1-5:

| Criterion | Meaning |
|---|---|
| Business value | Impact on cost, revenue, speed, quality, or risk |
| Frequency | How often the workflow happens |
| Data readiness | Whether inputs are accessible, structured, and legally usable |
| Technical feasibility | Model/tool/integration difficulty |
| Adoption fit | Whether users will trust and actually use it |
| Risk | Privacy, compliance, hallucination, approval, brand, operational risk |

Default recommendation:

- PoC first: high value, high frequency, medium/high data readiness, low/medium risk.
- Defer: high risk with weak governance, unclear owner, unavailable data, or no measurable outcome.

## Development Planning Package

Use this when AX work must become implementation-ready.

1. Background and business objective
2. Current workflow
3. Target AI-assisted workflow
4. User roles and permissions
5. Functional requirements
6. Non-functional requirements
7. AI behavior requirements
8. Data sources and retention
9. Integration points
10. System architecture
11. Human-in-the-loop and escalation
12. Acceptance criteria
13. QA and evaluation plan
14. Rollout plan
15. Risks and open questions

## AI Behavior Requirements

Capture model behavior explicitly:

- Task boundary: what the AI should and should not do.
- Input contract: required fields, accepted files, context sources.
- Output contract: format, tone, citations, confidence, structured JSON if needed.
- Human review: when approval is required.
- Refusal/escalation: what to do with missing, risky, or low-confidence input.
- Evaluation: golden examples, accuracy checks, regression tests, review rubric.

## PoC Charter Template

1. Hypothesis
2. Target users
3. Workflow slice
4. In-scope and out-of-scope
5. Data/tools needed
6. Prototype approach
7. Success metrics
8. Demo scenario
9. Timeline
10. Risks and go/no-go criteria

## Roadmap Template

| Phase | Goal | Initiatives | Owner | Dependencies | Success Metric |
|---|---|---|---|---|---|
| 0. Discovery | Validate workflow and data | Interviews, process map, data audit |  |  |  |
| 1. PoC | Prove one high-value slice | Prototype, eval set, demo |  |  |  |
| 2. Pilot | Real users in controlled scope | Integrations, permissions, feedback loop |  |  |  |
| 3. Production | Reliable operation | Monitoring, SOP, rollout, training |  |  |  |
| 4. Scale | Expand to adjacent workflows | Reusable components, governance |  |  |  |

## Common Risks

- Unavailable or low-quality data.
- PII or sensitive data used without policy.
- No workflow owner.
- No measurable success metric.
- Users do not trust output.
- Model output cannot be reviewed or audited.
- Integration requires unavailable APIs.
- Automation removes necessary human judgment.
- PoC is too broad to finish.
- Production monitoring and rollback are missing.

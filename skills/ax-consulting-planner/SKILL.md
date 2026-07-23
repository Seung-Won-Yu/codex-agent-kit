---
name: ax-consulting-planner
description: 'Plan AI transformation or AX consulting: AI 도입/전환, 업무 자동화, agent adoption, PoC, roadmap, architecture, ROI, and delivery planning for a business workflow.'
---

# AX Consulting Planner

Use this skill as the hub for AI transformation consulting that must become practical development work. It turns business/process ambiguity into scoped use cases, PoC plans, requirements, architecture, roadmap, risks, and implementation handoff.

## Core Rule

Do not jump from "AI 도입" to implementation. First identify the workflow, business outcome, data/tools involved, adoption constraints, and smallest useful proof.

## Workflow

1. Normalize the consulting question: business area, users, current workflow, pain, desired outcome.
2. Choose the engagement shape from `references/consulting-playbook.md`.
3. Map current state and target workflow before proposing tools.
4. Build an AI use-case shortlist with value, feasibility, data readiness, risk, and integration cost.
5. Pick the smallest PoC or implementation slice that can prove value.
6. Route to specialist skills for research, planning docs, architecture, implementation, or rollout.
7. Produce Korean consulting artifacts unless the user asks otherwise.

## Specialist Routing

- Market, competitor, tool, or vendor research -> `$research-report-writer`, `$research-synthesizer`.
- Use-case discovery and prioritization -> score directly using the bundled playbook; add `$risk-assessment` for material risk.
- PRD, requirements, flowchart, feature spec, screen flow, API/DB docs -> `$planning-document-writer`.
- Product/service planning -> `$product-strategy` or `$create-prd`.
- System architecture, service boundaries, API contracts, DB design -> `$system-design`, `$api-and-interface-design`, `$database-schema-designer`.
- OpenAI API, ChatGPT Apps, agents, MCP, or model/tool choices -> `$openai-docs`.
- Implementation planning -> `$incremental-implementation`.
- Change adoption, stakeholders, risks, rollout -> handle the operating model directly; add `$risk-assessment` when risk is a primary deliverable.
- SOP, runbook, operating model, training docs -> `$runbook-generator` or `$technical-writer`.
- Slides, Word reports, or spreadsheets -> `$presentations:Presentations`, `$documents:documents`, `$spreadsheets:Spreadsheets`.

## Default Output

When the user gives a broad AX request, produce:

1. Interpreted goal
2. Recommended engagement shape
3. Current-state assumptions and missing inputs
4. Candidate AI use cases
5. Prioritized PoC or MVP slice
6. Required artifacts
7. Suggested specialist skill sequence
8. Risks and verification plan

## Guardrails

- Treat ROI as a hypothesis until workflow volume, cycle time, error rate, labor cost, and adoption data are known.
- Flag data access, privacy, permissions, auditability, hallucination, human approval, and integration risk early.
- Prefer workflow redesign plus human-in-the-loop controls over "AI replaces everything" framing.
- If the task affects legal, HR, finance, healthcare, or regulated customer data, route through risk/security review before implementation.

## Reference Loading

Read `references/consulting-playbook.md` before choosing among AX assessment, use-case portfolio, PoC plan, development planning, architecture, roadmap, adoption plan, or operating documentation.

---
name: planning-document-writer
description: 'Choose and draft a formal planning or handoff artifact when the type is ambiguous or multi-part: 기획서, 요구사항/기능/화면 명세, IA, user flow, QA/UAT, policy, or development plan. Use an exact artifact skill when named.'
---

# Planning Document Writer

Use this skill as a document-format router and drafting harness. It should not replace specialist skills; it decides the right document shape, then pairs the smallest useful specialist skills.

## Core Rule

Choose the artifact before writing. If the user says "기획서" or "문서로 정리" without a format, infer the most useful document type from the handoff target:

- Stakeholder decision -> PRD, one-pager, roadmap, risk memo.
- Developer handoff -> requirements definition, feature spec, API/DB notes, user flow, acceptance criteria.
- Designer handoff -> screen flow, IA, UX flow, UI state table, content rules.
- QA handoff -> test scenarios, UAT checklist, release-readiness checklist.
- Game concept -> GDD, core loop, FTUE, economy/progression, prototype brief.
- Operations -> SOP, runbook, incident checklist.
- Research/report -> research report, benchmark report, market analysis, decision memo.

## Deliverable Default

If the user asks for 문서, 보고서, 제안서, 기획서, 요구사항정의서, 기능명세서, API 명세서, DB 설계서, SOP, runbook, 양식, 템플릿, 제출용, 공유용, or a similar formal artifact, produce a deliverable-grade document by default instead of stopping at a Markdown memo.

- Use `.docx` through `$documents:documents` for narrative or formal documents such as 기획서, 요구사항정의서, 기능명세서, 제안서, 보고서, API 명세서, DB 설계서, SOP, runbook, and 정책서.
- Use `.pptx` through `$presentations:Presentations` when the artifact is a 발표자료, 제안발표, pitch deck, board/strategy deck, or visual executive narrative.
- Use `.xlsx` through `$spreadsheets:Spreadsheets` when the artifact is primarily a tracker, checklist matrix, backlog, estimate table, test case matrix, budget, metrics model, or structured register.
- Use Markdown only when the user asks for 초안, 메모, 내용만, README, md, inline answer, or when the task is clearly lightweight.
- If the user gives an existing template or sample file, preserve that format and structure as the source of truth. Otherwise apply the default submission-ready archetype from `references/document-types.md`.

## Workflow

1. Identify the document consumer: stakeholder, PM, designer, developer, QA, operator, or player/game team.
2. Pick one primary document type from `references/document-types.md`.
3. Select at most one specialist skill to support the artifact, plus the output-format plugin when a real file is needed.
4. Decide the output form: `.docx`, `.pptx`, `.xlsx`, Notion/Google Docs, or Markdown.
5. Draft in a submission-ready template, using Korean headings when the user is Korean.
6. Include diagrams as Mermaid when they clarify flows, states, systems, or decisions; for real Office deliverables, convert or embed them in the appropriate format when feasible.
7. Add acceptance criteria, open questions, and next-step handoff only when they help execution.
8. If a real deliverable is implied, route to the relevant Office/plugin skill and create the file instead of ending with a Markdown draft.

## Specialist Routing

- Game GDD, core loop, FTUE, economy -> use the visible project game-design skill.
- Game UI/HUD/screen states -> use the visible project game art-direction skill.
- Game prototype scope -> use the visible project prototype-slice skill.
- Product PRD -> `$create-prd`.
- Implementation-ready feature spec or requirements -> draft directly; add `$incremental-implementation` when implementation planning follows.
- System architecture -> `$system-design`.
- API/interface -> `$api-and-interface-design`; use `$technical-writer` when external documentation is the deliverable.
- DB schema -> `$database-schema-designer`.
- ADR/technical decisions -> `$documentation-and-adrs`.
- QA scenarios/test plan -> draft directly; use `$webapp-testing` or a visible project game-QA skill when executable verification is needed.
- Technical guide -> `$technical-writer`.
- SOP/runbook -> `$runbook-generator` or `$technical-writer`.
- Long-form collaborative editing or formal Word output -> `$documents:documents`.
- Source-backed research report -> `$research-report-writer`.

## Default Output

If the user asks for a document but gives little structure and the output is lightweight or explicitly Markdown, produce:

1. Document type chosen and why, in one sentence.
2. Draft document with concrete sections.
3. Mermaid flowchart or sequence diagram when the artifact involves a flow.
4. Open questions only for decisions that block implementation.

If the user asks for a formal, shared, or submission-ready document, produce:

1. A real `.docx`, `.pptx`, or `.xlsx` artifact using the matching plugin skill.
2. A concise final note with the file link and 1-3 lines describing what is inside.
3. No extra Markdown copy of the whole document unless the user asks for it.

## Reference Loading

Read `references/document-types.md` before choosing among GDD, PRD, requirements, feature spec, screen flow, API docs, QA docs, SOP, runbook, or ADR.

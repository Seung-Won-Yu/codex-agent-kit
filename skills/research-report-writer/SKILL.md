---
name: research-report-writer
description: 'Research and draft a formal sourced report, benchmark, market/technical analysis, literature review, trend report, or decision memo. Use research-synthesizer for concise lookups or recommendations.'
---

# Research Report Writer

Use this skill as the research/report hub. It decides the report type, chooses the right research skills, then produces a cited, decision-ready report.

## Core Rule

Do not only summarize links. Turn research into a usable decision artifact:

- State the research question.
- Separate facts, interpretations, and recommendations.
- Cite sources for claims.
- Flag freshness, confidence, assumptions, and gaps.
- End with a decision, shortlist, next steps, or watchlist depending on the report type.

## Workflow

1. Identify the report type from `references/report-types.md`.
2. Use one research owner and, when needed, one output-format skill.
3. Browse when the topic depends on current facts, tools, prices, laws, repositories, market data, or recent docs.
4. Gather enough sources to compare, not just confirm.
5. Deduplicate and synthesize findings.
6. Draft the report in Korean when the user is Korean.
7. Include source links, source dates when available, and confidence notes.

## Specialist Routing

- Current web/source-backed research -> `$research-synthesizer`.
- Query decomposition and multi-source synthesis -> `$research-synthesizer`.
- Market size / TAM / SAM / SOM -> `$research-synthesizer`; make assumptions and calculation method explicit.
- Competitor or strategic analysis -> `$research-synthesizer`; apply a comparison matrix and strategic synthesis inside this report.
- User/customer research -> synthesize supplied interviews, surveys, VOC, or support evidence directly; browse only for external context.
- Weak/emerging trend research -> `$research-synthesizer`; separate observed signals from inference.
- Technical comparison -> `$research-synthesizer`, then `$technical-writer` or `$planning-document-writer`.
- GitHub/tool/skill discovery -> `$research-synthesizer`, `$skill-installer` only when installing.
- Final document formatting -> `$planning-document-writer`, `$technical-writer`, `$documents:documents`, `$presentations:Presentations`, or `$spreadsheets:Spreadsheets` as needed.

## Default Output

If the user asks for a report but gives little structure, use:

1. Executive summary
2. Research question and scope
3. Key findings
4. Evidence table
5. Comparison or analysis
6. Recommendation
7. Risks / unknowns
8. Sources

## Reference Loading

Read `references/report-types.md` before choosing among market research, technology research, competitor benchmarking, trend reports, literature/source summaries, or decision memos.

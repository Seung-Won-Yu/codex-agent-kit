---
name: planning-document-writer
description: 'Choose and draft a formal planning or handoff artifact when the type is ambiguous or multi-part: 기획서, 요구사항/기능/화면 명세, IA, user flow, QA/UAT, policy, or development plan. Use an exact artifact skill when named.'
---

# Planning Document Writer

Draft a usable planning or handoff artifact when its type is unclear or spans several concerns. Reuse the established brief; do not restart product discovery or dispatch a sequence of overlapping skills.

## Choose Content And Delivery Separately

- Infer the document's audience, decision, and use from the conversation and existing artifacts. Preserve an explicit document type, filename, destination, template, and format.
- Stakeholder decisions may need a one-pager, proposal, roadmap, or PRD; development handoff may need requirements, flows, interfaces, and acceptance criteria; operations may need an SOP or runbook.
- Read the relevant part of [document-types.md](references/document-types.md) only when its structure or checks resolve a real gap. Do not load it just to reconfirm a settled artifact choice.
- Deliver complete, usable content in the chosen format. The word “document” does not by itself require Office output, and Markdown does not imply an incomplete draft.

## Select The Useful Format

- Preserve the existing artifact or user-supplied template unless changing it is requested or materially necessary.
- Use Markdown for repository documentation, versioned specs, or text-first handoff; use an inline response when that is the requested deliverable.
- Use `$documents:documents` for requested Word/DOCX output or when the recipient's editing/submission workflow calls for it.
- Use `$presentations:Presentations` for slide decks, and `$spreadsheets:Spreadsheets` for workbook-based tracking, calculation, or structured data workflows.
- “Shared” or “formal” alone does not establish a file extension. Infer from the destination and usage; ask only if the unresolved choice would cause substantial rework. Creating a file does not authorize uploading or publishing it.
- When a real file is requested or clearly needed, create it and follow the adapter's required rendering/format checks. Do not substitute a prose outline to save tokens.

## Draft And Check

- Resolve required sections from the audience and intended use, without forcing a universal template.
- Preserve supplied facts and decisions. Distinguish assumptions, proposals, and unresolved inputs; never invent business facts.
- Make workflows, responsibilities, interfaces, or acceptance criteria concrete where needed for execution. Add a diagram only when it clarifies a relationship or flow.
- Own the content directly. Consult a domain specialist only for a concrete unresolved question, such as API correctness, data-model design, or source-backed claims; do not invoke an implementation workflow merely to write a plan.
- Before delivery, check factual consistency, required content, internal links, and whether the recipient can use the artifact. For file outputs, complete the relevant format verification.
- Return the artifact/link and a concise account of important limits. Avoid repeating the entire document in the final response when the file already contains it.

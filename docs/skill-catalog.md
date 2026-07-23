# Skill Catalog

현재 구성은 36개 global personal skill과 11개 project-packed specialist skill입니다. 명확한 요청은 가장 좁은 한 개의 primary skill로 시작하고, 실제 산출물 형식이나 검증이 필요할 때만 adapter/verifier를 추가합니다.

## Global skills

| 영역 | Skills |
| --- | --- |
| 구현·진단·리뷰 | `incremental-implementation`, `diagnose`, `code-review-and-quality`, `frontend-ui-engineering`, `webapp-testing` |
| 제품·프론트엔드 | `product-frontend-engineer`, `frontend-design-audit`, `design-flow`, `accessibility`, `web-quality-audit` |
| 설계 계약 | `system-design`, `api-and-interface-design`, `database-schema-designer`, `security-and-hardening` |
| 기획·전략 | `create-prd`, `product-strategy`, `planning-document-writer`, `ax-consulting-planner`, `risk-assessment` |
| 리서치·문서 | `research-synthesizer`, `research-report-writer`, `technical-writer`, `documentation-and-adrs`, `runbook-generator`, `release-notes` |
| 개발 운영 | `gh-cli`, `gh-fix-ci`, `dependency-auditor`, `docker-debugger`, `env-setup-wizard`, `vercel-deploy`, `playwright` |
| 미디어·연속성 | `media-image-director`, `handoff`, `caveman` |
| Codex 설정 | `routing-doctor` |

## Project packs

| Pack | Skills | 노출 조건 |
| --- | --- | --- |
| `game` | `mobile-game-design`, `mobile-game-qa`, `game-reference-research`, `game-ui-art-direction`, `player-experience-review`, `prototype-slice-planner` | 모바일 게임 프로젝트 |
| `visual` | `claude-design`, `gpt-taste`, `image-to-code` | 고밀도 visual/prototype 프로젝트 |
| `supabase` | `supabase`, `supabase-postgres-best-practices` | Supabase/Postgres 프로젝트 |

## Composition rules

- Primary: 작업 내용이나 결정을 소유하는 정확한 스킬 한 개
- Adapter: PDF, DOCX, PPTX, spreadsheet 등 필수 산출물 형식 한 개
- Verifier: 독립 검증이 실제 결론을 바꿀 수 있을 때 한 개
- Safety: auth, 권한, 비밀, 결제, webhook, production data 등 민감 경계에서 추가

단순 설명·작은 수정·명확한 명령은 스킬 없이 직접 처리해도 됩니다. `routing-doctor`는 Codex 설정 자체가 대상일 때만 사용합니다.

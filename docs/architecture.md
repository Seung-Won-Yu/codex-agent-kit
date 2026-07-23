# Architecture

이 저장소는 현재 사용하는 개인 Codex 설정을 실행 책임과 노출 범위에 따라 분리합니다.

## 1. Global policy

`AGENTS.md`가 최상위 운영 규칙입니다.

- 거친 요청에서 목표·산출물·권한 상한만 보정
- 확인·분석·제안 요청은 read-only로 유지
- 명확한 작업은 meta-router 없이 가장 좁은 스킬로 직행
- `primary + adapter + verifier + safety` 슬롯으로 조합 상한 설정
- 독립적인 큰 축이 두 개 이상일 때만 병렬화
- 루트 에이전트가 의도, 쓰기 작업, 통합, 최종 검증을 소유

## 2. Agents and playbooks

`agents/`에는 세 개의 제한된 역할만 둡니다.

| Agent | 권한 | 책임 |
| --- | --- | --- |
| `explorer-fast` | read-only | 독립적인 코드 탐색과 리서치 |
| `reviewer-deep` | read-only | 어려운 변경의 독립 리뷰 |
| `verifier` | workspace-write | 테스트·빌드·브라우저 검증 |

`agents/playbooks/`는 복합 작업에서만 읽는 frontend, backend, design-prototype, docs-research 지침입니다. 평범한 단일 작업의 선행 라우터가 아닙니다.

## 3. Global skills

`skills/`의 36개 personal skill은 여러 저장소에서 반복해서 쓰는 작업만 담당합니다. Skill description 자체가 routing contract이며 별도 런타임 라우터는 없습니다.

`routing-doctor`는 일반 작업을 배정하지 않습니다. 전역 규칙, 스킬 설명, 에이전트 정책과 회귀 corpus 자체를 감사하거나 개발할 때만 사용합니다.

## 4. Project packs

`skill-packs/`의 11개 specialist skill은 필요한 프로젝트의 `.agents/skills/`에 symlink하여 노출합니다.

- `game`: 6개
- `visual`: 3개
- `supabase`: 2개

이 구조는 모든 프로젝트 prompt에 특수 스킬을 넣지 않으면서 해당 도메인에서는 자동 routing이 가능하게 합니다. `skill-packs/manifest.yaml`이 현재 연결 상태를 기록합니다.

## 5. Local configuration

`config/codex.config.sample.toml`은 현재 모델, reasoning, feature, agent, plugin 구조를 인증정보와 개인 trust 경로 없이 보여줍니다. 실제 `config.toml`은 installer가 덮어쓰지 않습니다.

`config/xhigh.config.sample.toml`은 가장 어려운 작업에만 쓰는 선택형 profile입니다.

## 6. Validation

`scripts/validate-skills.py`는 다음을 함께 검사합니다.

- global/packed skill metadata
- canonical name 중복
- 내부 Markdown link와 `$skill` 참조
- pack manifest와 프로젝트 symlink
- 현재 prompt에서 보이는 skill
- legacy meta-router 잔존
- routing regression corpus

`skills/routing-doctor/references/routing-cases.yaml`에는 한국어 실사용형 요청 40개가 들어 있습니다.

## 7. Public repository boundary

이 저장소는 재사용 가능한 policy와 workflow만 보관합니다. 다음 runtime state는 제외합니다.

- `auth.json`
- sessions, archived sessions, JSONL history
- log, memory, state SQLite
- browser sessions
- plugin caches와 설치 bundle
- generated media와 attachment
- API key, OAuth token, service-role key

프로젝트 pack 경로는 사용자명 없는 `~/...` 형식으로 저장하며 다른 머신에서는 manifest를 조정합니다.

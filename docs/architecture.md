# Architecture

이 저장소는 현재 사용하는 개인 Codex 설정을 실행 책임과 프로젝트 범위에 따라 분리합니다.

## 1. Global policy

`AGENTS.md`가 최상위 운영 규칙입니다.

- 명확한 요청은 바로 실행하고, 결과가 해석에 따라 달라질 때만 `intent-refiner` 사용
- 보정은 목적·대상·산출물·필수 조건·완료 기준을 짧게 정리한 뒤 실행으로 연결
- 순수 점검·제안은 read-only; 이전 승인과 후속 제한을 대화 맥락에서 유지
- 명확한 작업은 meta-router 없이 가장 좁은 스킬로 직행
- 선택형 `intake` 이후 `primary + adapter + verifier + safety`로 역할 분리
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

`skills/`의 37개 personal skill은 여러 저장소에서 반복해서 쓰는 작업만 담당합니다. `intent-refiner`는 필요한 요청에만 사용하는 intake이며 도메인 primary를 대체하지 않습니다. 별도 모델 호출이나 dispatcher 없이 같은 모델이 보정 후 작업합니다. 명확한 점검·제안과 일상적인 후속 수정은 기존 맥락을 재사용합니다.

`routing-doctor`는 일반 작업을 배정하지 않습니다. 전역 규칙, 스킬 설명, 에이전트 정책과 회귀 corpus 자체를 감사하거나 개발할 때만 사용합니다.

## 4. Project packs

`skill-packs/`의 11개 specialist skill은 필요한 프로젝트의 `.agents/skills/`에 symlink하여 노출합니다.

- `game`: 6개
- `visual`: 3개
- `supabase`: 2개

이 구조는 모든 프로젝트 prompt에 특수 스킬을 넣지 않으면서 해당 도메인에서는 자동 routing이 가능하게 합니다. `skill-packs/manifest.yaml`이 현재 연결 상태를 기록합니다.

## 5. Local configuration

`config/codex.config.sample.toml`은 GPT-6 Astra high, workspace-write, agent, plugin과 desktop 기본값을 담은 portable base입니다. 계정 정보와 기기별 실행 경로는 포함하지 않습니다. `--with-config` 설치에서 실제 `config.toml`로 적용됩니다.

`config/xhigh.config.sample.toml`은 가장 어려운 작업에만 쓰는 선택형 profile입니다.

## 6. Validation

`python3 scripts/validate-skills.py --root . --static`은 저장소의 메타데이터·로컬 링크·pack 등록·52개 사례 구조를 검사합니다. 기본 설치 환경 검증은 다음도 함께 확인합니다.

- global/packed skill metadata
- canonical name 중복
- 내부 Markdown link와 `$skill` 참조
- pack manifest와 프로젝트 symlink
- 현재 prompt에서 보이는 skill
- legacy meta-router 잔존
- routing regression corpus

`skills/routing-doctor/references/routing-cases.yaml`에는 한국어 실사용형 요청 52개가 들어 있습니다.

## 7. Installation

`scripts/install.sh`은 현재 personal layer를 `$CODEX_HOME`에 설치합니다.

- `--exact`: 기존 personal agents, global skills와 packs를 timestamp backup으로 이동
- `--with-config`: quality-first portable `config.toml` 적용
- `--plugins`: 현재 사용하는 10개 plugin 설치·활성화

Codex가 제공하는 `skills/.system`은 유지합니다. 프로젝트 pack 경로는 사용자명 없는 `~/...` 형식으로 저장하며 다른 머신에서는 manifest만 조정합니다.

## 8. Effort And Completion

전역 지침은 짧게 유지하고 보정 스킬 본문은 필요할 때만 읽습니다. 같은 자료 재탐색, 중복 계획 설명, 통과한 검증 반복을 줄이되 필수 작업을 생략하지 않습니다. 보정 후 원래 목적과 완료 기준을 실제 결과에 대조합니다. 실제 토큰 절감률은 별도 비교 측정이 필요합니다.

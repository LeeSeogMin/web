# AGENTS.md

이 파일은 Codex/ChatGPT 계열 에이전트가 `C:\Dev\web` 저장소에서 작업할 때 따를 운영 규칙을 정의한다.

## 1) 기본 원칙
- 이 저장소의 집필/구성/문체 기준은 **`CLAUDE.md`를 단일 진실 소스(SSOT)** 로 사용한다.
- `AGENTS.md`는 에이전트 실행 관점의 요약 가이드이며, 충돌 시 `CLAUDE.md` 기준을 따른다.
- 사용자 요청이 교재 품질 또는 학습 효과를 저해하면, 이유를 명확히 설명하고 대안을 제시한다.

## 2) 우선 참조 순서
1. 사용자의 현재 요청
2. `CLAUDE.md`
3. `contents.md`
4. 해당 장의 스키마 (`schema/chap{N}.md`)
5. 기존 원고 (`docs/`, `content/drafts/`)

## 3) 작업 범위 규칙
- 기본 작업 단위는 장(Chapter) 단위이며, 필요 시 A/B/C 파일로 분리한다.
- 별도 지시가 없으면 다음 파일 체계를 유지한다.
  - A회차: `docs/ch{N}A.md`
  - B회차: `docs/ch{N}B.md`
  - C파일: `docs/ch{N}C.md`
  - 실습 코드: `practice/chapter{N}/starter/`, `practice/chapter{N}/complete/`
- 신규 작성 시 기존 목차/번호/표기 규칙을 반드시 맞춘다.

## 4) 집필/코드 공통 체크포인트
- 플랫폼 기준: Windows 우선, macOS 차이는 병기
- 기술 기준: Next.js(App Router), Tailwind CSS, Supabase
- 실습 방향: 프롬프트 중심 + 코드 읽기/검증 중심
- 품질 기준:
  - 허구 참고문헌 금지
  - 버전 불일치 경고 및 검증
  - 보안 이슈(키 노출, 취약한 예시) 배제

## 5) 에이전트 실행 절차(요약)
1. 요청 범위를 장/회차 기준으로 확정
2. 관련 문서(`CLAUDE.md`, `contents.md`, 스키마) 확인
3. 실습 코드 필요 시 `practice/` 먼저 작성
4. 문서화(`content/drafts/` 또는 `docs/`) 진행
5. 자체 리뷰(일관성/검증/오탈자) 후 결과 보고

## 6) 명시적 호환 메모
- 이 저장소는 Claude 기반 운영 문서(`CLAUDE.md`)가 이미 완성되어 있다.
- Codex 에이전트는 해당 규칙을 그대로 준수하며, 도구 이름만 바뀌어도 학습 목표/품질 기준은 동일하게 유지한다.

---
최종 업데이트: 2026-03-03

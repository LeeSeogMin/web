# 웹 프로그래밍 교재 프로젝트 컨텍스트

**"웹 프로그래밍(실전): AI 협업 기반 풀스택 리터러시"** — Next.js + Tailwind CSS + Supabase + Vercel, 바이브코딩 with GitHub Copilot 강의교재 자동 집필 프로젝트이다.

## 현재 상태

### 프로젝트 개요
- **구성**: 6 Part / 13장 / 15주 운영 (8주차 중간고사, 15주차 기말)
- **워크플로우**: 6단계 (Planning → Research → Analysis → Implementation → Optimization → Quality Verification)
- **최종 목차**: `contents.md` 참조
- **프로젝트 지침**: `CLAUDE.md` 참조

### 완료된 작업

- ✅ **제1장: 첫 배포 — create-next-app에서 Vercel까지** (2026-02)
  - 최종본: `docs/ch1.md` (423줄)
  - 절 구성: 1.1~1.6 (웹 동작 방식, 개발 환경, Next.js 프로젝트 생성, GitHub, Vercel 배포, 과제)

- ✅ **제2장: Copilot 세팅과 바이브코딩** (2026-02)
  - 최종본: `docs/ch2.md` (471줄)
  - 절 구성: 2.1~2.9 (바이브코딩, Copilot 설정, AI 3대 한계, 컨텍스트 관리, 환각 검증, Agent Mode, AI 사용 로그, 과제)

- ✅ **제3장: HTML 시맨틱과 Tailwind CSS** (2026-02)
  - 최종본: `docs/ch3.md` (578줄)
  - 절 구성: 3.1~3.6 (HTML5 구조, 시맨틱 태그, 폼/접근성, Tailwind 기초, 레이아웃, 과제)

- ✅ **제4장: JavaScript 핵심** (2026-02-11)
  - 최종본: `docs/ch4.md` (609줄)
  - 절 구성: 4.1~4.6 (변수/자료형, 함수, 객체/배열, 비동기, 모듈, 과제)

- ✅ **제5장: Next.js 기초** (2026-02-22)
  - 최종본: `docs/ch5.md`
  - 절 구성: 라우팅, 페이지/레이아웃, 서버/클라이언트 컴포넌트, 과제

- ✅ **제6장: Next.js 상태 관리와 데이터 페칭** (2026-02-22)
  - 최종본: `docs/ch6.md`
  - 절 구성: useState/useEffect, 데이터 페칭, API 라우트, 과제

- ✅ **제7장: 웹 앱 아키텍처 & 디자인 설계** (2026-02)
  - 최종본: `docs/ch7.md`

- ✅ **제8장: Supabase 시작하기** (2026-02)
  - 최종본: `docs/ch8.md`

- ✅ **제9장: Supabase Authentication** (2026-02)
  - 최종본: `docs/ch9.md`

- ✅ **제10장: Supabase Database CRUD** (2026-02)
  - 최종본: `docs/ch10.md`

- ✅ **제11장: Row Level Security** (2026-02)
  - 최종본: `docs/ch11.md`

- ✅ **제12장: 에러 처리와 UX 완성** (2026-02)
  - 최종본: `docs/ch12.md`

### 중간 산출물 현황

schema, research, graphics, reviews는 이전 15장 기준으로 작성된 것이 일부 남아 있으나, 각 장 집필 시 현재 13장 목차에 맞게 반영 완료.

| 산출물 | 범위 | 비고 |
|--------|------|------|
| 집필계획서 (`schema/chap{N}.md`) | 1~13장 | chap14~15는 _archive로 이동 |
| 리서치 (`content/research/`) | 1~13장 | 각 장 집필 시 활용 완료 |
| 그래픽 (`content/graphics/ch{N}/`) | 1~13장 | Mermaid(.mmd) 다이어그램 |
| 리뷰 (`content/reviews/`) | 1~13장 | Ch1~Ch12 검토 완료 |
| 실습 코드 (`practice/chapter{N}/`) | 1~13장 | 이전 커리큘럼 형태, Next.js 프로젝트 재편 필요 |
| Word 변환 (`ms-word/`) | 변환 시스템 구축 완료 | `npm run convert:chapter N` |

### 집필 패턴

- **3교시 구조**: `# 1교시` → `# ― 쉬는시간 ―` → `# 2교시` → `# ― 쉬는시간 ―` → `# 3교시`
- **쉬는시간 구분선**: `# ― 쉬는시간 ―` (앞뒤에 `---` 수평선)
- **표 번호**: `**표 N.X** 제목` — 장 내 순차적, 표 위에 작성
- **문체**: 격식체 평서문, 학생 친화적 설명체
- **코드 참조**: `_전체 프로젝트는 practice/chapter{N}/ 참고_`
- **참고문헌 형식**: `저자. (연도). 제목. *출판처*. URL/DOI`
- **수식**: Unicode 인라인 (LaTeX 금지)
- **Copilot 프롬프트**: `> **Copilot 프롬프트**` 블록인용 형식
- **교수 검증 마커**: `<!-- COPILOT_VERIFY: 설명 -->`
- **과제 단계 번호**: 원문자 — ① ② ③ ④ ⑤
- **Heading 계층**: `# Chapter/교시` > `## 절` > `### 소절`

### 기술적 참고사항

- **기술 스택**: Next.js 15+ (App Router), Tailwind CSS 4.x, Supabase JS v2, Vercel
- **AI 도구**: GitHub Copilot (copilot-instructions.md, MCP, Skills, Agent Mode)
- **크로스 플랫폼**: macOS + Windows 모두 동작, 터미널 명령어 양쪽 표기
- **환경변수**: `.env.local` 파일 방식 통일
- **package.json**: exact version 고정 (^ 금지)

## 다음 작업

### 미작성 장

| Part | 장 | 제목 | 유형 | 목표 분량 |
|------|---|------|------|----------|
| Part 6 | 13장 | 개인 프로젝트 구현 | 프로젝트 | 600~700줄 |

### 작업 우선순위
1. Ch13 집필 (기말 프로젝트 가이드) — 유일한 미작성 장
2. practice/ 코드를 현재 13장 기준 Next.js 프로젝트 형태로 재구성
3. checklists/book-progress.md 갱신
4. 전체 통합 검토 (일관성, 표번호, 참고문헌)
5. MS Word 변환 (`ms-word/` — npm install 후 변환)

### 알려진 이슈
- `checklists/book-progress.md` 미갱신 — 템플릿 상태 그대로
- practice/ 코드가 이전 15장 커리큘럼 기준 — 현재 13장 체계와 불일치, Next.js 프로젝트 재편 필요
- `ms-word/` 의존성 미설치 상태 (npm install 필요)

---

**마지막 업데이트**: 2026-02-23
**현재 진행**: 12/13장 (약 92%)
**다음 작업**: 제13장 개인 프로젝트 구현 집필

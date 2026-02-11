# 웹 프로그래밍 교재 프로젝트 컨텍스트

**"웹 프로그래밍(실전): AI 협업 기반 풀스택 리터러시"** — Next.js + Tailwind CSS + Supabase + Vercel, 바이브코딩 with GitHub Copilot 강의교재 자동 집필 프로젝트이다.

## 현재 상태

### 프로젝트 개요
- **구성**: 6 Part / 13장 / 15주 운영 (8주차 중간고사, 15주차 기말)
- **워크플로우**: 6단계 (Planning → Research → Analysis → Implementation → Optimization → Quality Verification)
- **최종 목차**: `contents.md` 참조
- **집필 표준**: `docs/sample.md` 참조 (미작성 — 작성 필요)
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
  - 표 7개 (4.1~4.7), COPILOT_VERIFY 마커 2개

### 중간 산출물 현황 (이전 커리큘럼 기반)

schema, research, graphics, reviews, practice 코드는 15장 기준(이전 커리큘럼)으로 전체 작성되어 있다. 현재 목차(13장)와 불일치하므로 각 장 집필 시 재검토가 필요하다.

| 산출물 | 범위 | 비고 |
|--------|------|------|
| 집필계획서 (`schema/chap{N}.md`) | 1~15장 | Ch1-3은 간략(~30줄), Ch4-15는 상세(114~193줄) |
| 리서치 (`content/research/ch{N}-research.md`) | 1~15장 | Ch1-2는 상세(439~496줄), 나머지 125~251줄 |
| 그래픽 (`content/graphics/ch{N}/`) | 1~15장 | Mermaid(.mmd) 다이어그램 |
| 리뷰 (`content/reviews/ch{N}-review.md`) | 1~15장 | 74~173줄 |
| 실습 코드 (`practice/chapter{N}/code/`) | 1~15장 | 개별 파일(html/css/js/jsx) 형태, Next.js 프로젝트 아님 |
| Word 변환 (`ms-word/output/`) | ch01~15 + 부록6개 | 이전 커리큘럼 기준 (별도 관리) |

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

### 미작성 장 (4~13장)

| Part | 장 | 제목 | 유형 | 목표 분량 |
|------|---|------|------|----------|
| ~~Part 2~~ | ~~4장~~ | ~~JavaScript 핵심~~ | ~~기초 이론~~ | ~~완료 (609줄)~~ |
| Part 3 | 5장 | Next.js 기초 | 기술 실습 | 600~700줄 |
| Part 3 | 6장 | Next.js 상태 관리와 데이터 페칭 | 기술 실습 | 600~700줄 |
| Part 4 | 7장 | 웹 앱 아키텍처 & 디자인 설계 | Copilot/설계 | 600~700줄 |
| Part 5 | 8장 | Supabase 시작하기 | 기술 실습 | 600~700줄 |
| Part 5 | 9장 | Supabase Authentication | 기술 실습 | 600~700줄 |
| Part 5 | 10장 | Supabase Database CRUD | 기술 실습 | 600~700줄 |
| Part 5 | 11장 | Row Level Security | 기술 실습 | 600~700줄 |
| Part 6 | 12장 | 에러 처리와 UX 완성 | 기술 실습 | 600~700줄 |
| Part 6 | 13장 | 개인 프로젝트 구현 | 프로젝트 | 600~700줄 |

### 작업 우선순위
1. `docs/sample.md` 집필 표준 참조 문서 작성
2. 5장부터 순차적으로 집필 (Part 3 → Part 4 → Part 5 → Part 6)
3. 각 장은 7단계 워크플로우를 따라 완성
4. practice/ 코드를 현재 목차 기준으로 Next.js 프로젝트 형태로 재구성
5. book-progress.md를 실제 진행 상황에 맞게 갱신

### 알려진 이슈
- `docs/sample.md` 누락 — CLAUDE.md에서 참조하지만 파일이 없음
- `checklists/book-progress.md` 미갱신 — 템플릿 상태 그대로
- practice/ 코드가 이전 15장 커리큘럼 기준 — 현재 13장 체계와 불일치
- AGENTS.md 삭제됨 (git에서 deleted 상태, unstaged)

---

**마지막 업데이트**: 2026-02-11
**현재 진행**: 4/13장 (약 31%)
**다음 작업**: 제5장 Next.js 기초 집필

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

# 바이브코딩 웹 프로그래밍 강의교재 프로젝트

## 빠른 시작 명령어

### Next.js 프로젝트 실습 환경
```bash
cd practice/chapter{N}
npm install                            # 의존성 설치
npm run dev                            # 개발 서버 실행
# 브라우저에서 http://localhost:3000 확인
```

---

## 프로젝트 개요

이 프로젝트는 **바이브코딩 기반 웹 프로그래밍 강의교재 자동 집필 시스템**입니다.

### 도서 정보
- **제목**: 웹 프로그래밍(실전): AI 협업 기반 풀스택 리터러시
- **부제**: Next.js + Tailwind CSS + Supabase + Vercel — 바이브코딩 with GitHub Copilot
- **대상 독자**: 일반 학부생 (전공/비전공 무관)
- **선수 지식**: 없음 (컴퓨터 기본 조작 가능)
- **기술 스택**: Next.js (App Router) + Tailwind CSS + Supabase + Vercel
- **AI 도구**: GitHub Copilot (copilot-instructions.md, MCP, Skills)
- **구성**: 6 Part / 13장 / 15주 운영
- **수업 형태**: 주 2회 × 90분 (A회차: 강의+시연 / B회차: 개인 실습+C파일 비교)
- **평가**: 중간고사 20% + 기말고사 20% + B회차 과제 30% + 개인 프로젝트 30% + 출석 감점제 (결석 -2, 지각 -1)
- **최종 목차**: `contents.md` 참조

---

## 최우선 원칙

### 0. 응답 원칙
- **객관적 판단 우선**: 사용자의 요구사항에 맞추지 말고 항상 객관적인 판단으로 응답한다. 교재 품질과 학습 효과에 부정적이라면 사용자 요청이라도 근거를 들어 반대 의견을 제시한다.

### 1. 분량 기준 (탄력적 적용)

A/B 회차 합산 기준:

| 항목 | 기준 |
|------|------|
| A회차 | 약 400-500줄 (개념 + 시연) |
| B회차 | 약 200-300줄 (과제 스펙 + 체크포인트 + 토론 가이드) |
| A4 페이지 | A회차 약 25쪽 + B회차 약 10쪽 |
| 개념+프롬프트 : 코드읽기/검증 | 60% : 40% |

**장 유형별 분량 및 구성비**:
- 기초 이론 장 (Ch3-4): — 개념 30% + 프롬프트 20% + 코드읽기 40% + 과제 10%
- Copilot/설계 장 (Ch2, Ch7): — 개념 20% + 실습 가이드 50% + 검증 20% + 과제 10%
- 기술 실습 장 (Ch5-6, Ch8-12): — 개념 15% + 프롬프트 35% + 코드읽기/검증 40% + 과제 10%
- 프로젝트 장 (Ch13): — 가이드 30% + 체크리스트 70%

**분량보다 이해도**: 위 기준은 가이드일 뿐이며, 학생의 이해와 학습 효과가 우선

### 2. 집필 역할 분리 (CRITICAL)

이 교재는 **Claude Code가 집필**하지만, 학생이 **GitHub Copilot으로 실습**하는 구조이다.
Claude Code는 Copilot을 실행할 수 없으므로, 다음과 같이 역할을 분리한다.

#### Claude Code가 담당하는 영역
| 영역 | 설명 |
|------|------|
| 개념/원리 | AI 코딩의 원리, 3대 한계, 검증 방법 등 (도구 불문 공통) |
| 코드 작성/실행 | Next.js, Supabase, Tailwind 코드 직접 작성 및 실행 결과 확인 |
| 검증 체크리스트 | 환각/버전/보안 검증 항목 (도구 불문 공통) |
| 프롬프트 초안 | Copilot 프롬프트 예시 초안 작성 (검증 필요 표기) |
| 교재 구조/문체 | 전체 집필, 편집, 일관성 유지 |

#### 교수님이 검증/보완하는 영역
| 영역 | 설명 |
|------|------|
| Copilot 프롬프트 → 결과 | 실제 Copilot에서 프롬프트 실행 후 결과 확인/교체 |
| copilot-instructions.md 동작 | 설정 후 실제 Copilot 응답 변화 검증 |
| @workspace 범위 | 실제 프로젝트에서 @workspace 참조 범위 확인 |
| MCP 연동 | Copilot + MCP 실제 동작 테스트 |
| Agent Mode/Skills | 실제 Copilot Agent 동작 확인 |
| 스크린샷 | Copilot UI, 응답 화면 직접 캡처 |

#### 교수 검증 마커 규칙
초안에서 Copilot 실행이 필요한 부분은 다음 마커를 삽입한다:

```markdown
<!-- COPILOT_VERIFY: 설명 -->
```

예시:
```markdown
<!-- COPILOT_VERIFY: 이 프롬프트를 Copilot Chat에 입력하고 실제 응답을 캡처해주세요 -->
<!-- COPILOT_VERIFY: copilot-instructions.md 적용 전/후 응답 차이를 확인해주세요 -->
<!-- COPILOT_VERIFY: @workspace로 프로젝트 구조를 인식하는지 테스트해주세요 -->
<!-- COPILOT_VERIFY: Agent Mode에서 이 작업이 실제로 자동 수행되는지 확인해주세요 -->
```

**마커가 있는 부분은 교수님 검증 전까지 "초안" 상태로 간주한다.**

### 3. 바이브코딩 교재 핵심 원칙
- **프롬프트 중심**: 코드를 직접 작성하는 것이 아니라, AI에게 명확한 지시를 내리는 방법을 가르친다
- **코드는 읽는 것**: AI가 생성한 코드를 읽고, 이해하고, 검증하는 능력이 핵심
- **검증 능력 강조**: AI 출력이 올바른지 판별하는 기준과 방법을 반드시 제시
- **AI 3대 한계 인식**: 버전 불일치, 컨텍스트 소실, 환각 — 이 세 가지를 항상 경고
- **배포 우선**: 모든 실습은 실제 Vercel URL로 배포 결과를 확인한다
- **도구 독립적 원칙**: 핵심 원리는 Copilot/Cursor/Claude Code 어디서든 통용되도록 서술
- **크로스 플랫폼**: 모든 코드, 명령어, 실습은 Windows와 macOS 모두에서 동작해야 한다
  - **기본 기준은 Windows**, macOS가 다를 경우 부연 설명 추가
  - 터미널 명령어: PowerShell 기준, macOS 차이점 병기
  - 경로 구분자 하드코딩 금지 — Node.js `path.join()` 또는 `/` 사용
  - OS 특정 도구 사용 금지 (pbcopy, open 등)
  - 환경변수 설정: `.env.local` 파일 방식 통일 (export 명령 대신)
  - 단축키 표기: `Ctrl` 기준, macOS는 `Cmd`로 병기

### 4. 참고문헌 검증
- 허구의 참고문헌 절대 금지
- 모든 인용은 실재 검증된 문헌만
- URL/DOI 가능한 포함
- **공식 문서 우선**: Next.js, Tailwind, Supabase 공식 문서를 1차 참고자료로 활용

### 5. 바이브코딩 교재 집필 방향

**핵심 원칙**: 학부생이 AI와 협업하여 웹 앱을 설계, 구현, 배포할 수 있도록 하는 것이 목표.

#### 5.1 단계적 설명 원칙
- **"왜 필요한가" → "핵심 개념" → "프롬프트로 구현" → "결과 검증"** 순서
- 추상적 개념은 구체적 예시와 비유로 먼저 설명
- 세부 문법보다는 **패턴과 구조**의 직관적 이해에 집중
- 핵심 개념은 반복적으로 다른 맥락에서 재등장

#### 5.2 프롬프트 제시 원칙 (CRITICAL)
- **개념 설명 후 바로 프롬프트 예시 제공**: "이 개념을 Copilot에게 이렇게 지시한다"
- **프롬프트는 블록 인용으로 표기**:
  ```
  > **Copilot 프롬프트**
  > "Tailwind CSS를 사용하여 반응형 네비게이션 바를 만들어줘.
  > 모바일에서는 햄버거 메뉴, 데스크톱에서는 가로 메뉴로 표시해줘."
  ```
- **좋은 프롬프트 vs 나쁜 프롬프트 대비**: 같은 기능에 대해 모호한 프롬프트와 명확한 프롬프트를 비교
- **프롬프트 작성 전략**: 컨텍스트 제공, 기술 스택 명시, 버전 지정, 단계별 분할
- **copilot-instructions.md 연동**: 프로젝트 수준 지시사항이 프롬프트 품질에 미치는 영향 설명

#### 5.3 AI 출력 읽기/검증 원칙 (CRITICAL)
- **코드 읽기 가이드**: AI가 생성한 코드에서 학생이 주목해야 할 부분을 표시
- **검증 체크리스트**: 각 실습마다 "AI 출력이 올바른지 확인하는 항목" 제시
  - 파일 구조가 맞는가?
  - import 경로가 올바른가?
  - 사용된 API가 현재 버전과 일치하는가?
  - 보안 이슈(하드코딩된 키, XSS 등)는 없는가?
- **흔한 AI 실수 패턴**: 장마다 해당 주제에서 AI가 자주 틀리는 부분 경고
- **디버깅 흐름**: 에러 발생 시 AI에게 다시 질문하는 전략 포함

#### 5.4 교재 필수 구성요소

**A회차** (ch{N}A.md)는 다음 요소를 반드시 포함한다:
- **학습목표**: 3-5개의 명확한 학습목표
- **수업 타임라인**: A회차 시간 배분 표
- **오늘의 미션 + 빠른 진단**: 퀴즈 1문항
- **핵심 개념**: 핵심만 간결하게 — 세부 문법 나열 금지
- **프롬프트 패턴**: 해당 장의 핵심 프롬프트 예시 (좋은/나쁜 비교 포함)
- **라이브 코딩 시연**: 교수 시연 내용
- **코드 읽기 가이드**: AI 생성 코드의 핵심 포인트 해설
- **B회차 과제 스펙 공개**: 스타터 코드 안내 포함
- **Exit ticket**: 학습 확인 1문항
- **교수 메모**: 준비물 + 수업 후 체크

**B회차** (ch{N}B.md)는 다음 요소를 반드시 포함한다:
- **수업 타임라인**: B회차 시간 배분 표
- **과제 스펙 + 스타터 코드 안내**
- **바이브코딩 가이드**: Copilot 사용 전략
- **체크포인트 3회**: 단계별 실습 진행
- **검증 체크리스트**: AI 출력 확인 항목
- **흔한 AI 실수**: 해당 주제에서 AI가 자주 틀리는 패턴
- **제출 안내**: Google Classroom 제출 형식
- **C파일 비교 + 코드 수정 가이드**: 제출 마감 후 모범 구현과 비교·수정
- **교수 피드백 포인트**

#### 5.5 A/B 회차 문서 형식

각 장은 A회차와 B회차를 **별도 파일**로 분리한다.

**A회차 문서 구조** (`ch{N}A.md`):
```
# Chapter N. 제목 — A회차: 강의
> **미션**: ...
## 학습목표
## 수업 타임라인 (표)
## 오늘의 미션 + 빠른 진단
## N.1 핵심 개념
  ### 프롬프트 패턴
  ### 코드 읽기 포인트
## N.2 라이브 코딩 시연
  > **라이브 코딩 시연**: 설명
## 핵심 정리 + B회차 과제 스펙
## Exit ticket
---
## 교수 메모
```

**B회차 문서 구조** (`ch{N}B.md`):
```
# Chapter N. 제목 — B회차: 실습
> **미션**: ...를 구현하고 배포한다
## 과제 스펙 + 스타터 코드 안내
## 바이브코딩 가이드
  > **Copilot 활용**: 프롬프트 전략
## 개인 실습
  ### 체크포인트 1: 기본 구조
  ### 체크포인트 2: 핵심 기능
  ### 체크포인트 3: 검증 + 배포
## 검증 체크리스트
## 흔한 AI 실수
## 제출 안내 (Google Classroom)
## C파일 비교 + 코드 수정 가이드
## 교수 피드백 포인트
```

**C파일** (`ch{N}C.md`): 모범 구현 + 해설 (B회차 제출 후 공개)

**예외**: Ch1 A회차는 환경 설정+배포 위주로 자유 형식

**시간 표기 규칙**:
- **세부 분 단위 표기 금지**: 절 제목에 `(15분)`, `(25분)` 등 붙이지 않는다
- 수업 타임라인 표에만 시간대(00:00~01:30) 표기

**교수 전용 요소**:
- `> **강의 팁**:` — 수업 운영 조언 (학생에게는 보이지 않는 교수용 노트)
- `> **라이브 코딩 시연**:` — A회차에서 교수가 직접 코딩하며 보여주는 시연
- `> **Copilot 활용**:` — B회차에서 Copilot 사용 가이드
- `> **C파일 비교**:` — B회차 제출 마감 후 모범 구현과 비교·수정 활동
- `교수 메모` 섹션 — 준비물 체크리스트 + 수업 후 확인 항목

**서식 세부 규칙**:
- **표 라벨 필수**: 모든 표에 `**표 N.X** 제목`을 표 위에 작성 (예외 없음, 순번은 장 내에서 연속)
- **Heading 계층**: `# Chapter/회차 제목` > `## 절` > `### 소절`
- **과제 단계 번호**: 원문자 사용 — **① ② ③ ④ ⑤**
- **Copilot 프롬프트**: `> **Copilot 프롬프트**` 블록인용 형식

#### 5.6 코드 제시 방식
- **본문에는 핵심 구조만**: 전체 코드가 아닌 핵심 패턴/구조만 본문에 포함 (5-10줄)
- **전체 코드는 practice 폴더**: `practice/chapter{N}/` 에 Next.js 프로젝트로 제공
- **코드는 "읽기용"으로 제시**: "이 코드를 직접 타이핑하라"가 아니라 "AI가 생성한 코드를 읽고 이해하라"
- **주석은 학습 포인트**: 코드 내 주석으로 "여기서 주목할 부분" 표시

#### 5.7 표준 참조 문서
- **집필 시 참조**: 기존 완성 원고를 문체/형식 기준으로 참조 (A/B 분리 후 새 표준 확립 필요)
- practice 폴더 참조 형식: `_전체 프로젝트는 practice/chapter{N}/ 참고_`

---

## 폴더 구조

```
project/
├── CLAUDE.md              # 이 파일 - 프로젝트 컨텍스트
├── contents.md            # 최종 목차 및 집필 방향
├── schema/                # 집필계획서
│   └── chap{N}.md
├── .claude/
│   └── agents/            # 서브에이전트 정의 (6개)
│       ├── planner.md     # 집필계획자
│       ├── researcher.md  # 리서처
│       ├── writer.md      # 작가
│       ├── coder.md       # 코드작성자
│       ├── reviewer.md    # 검토자
│       └── graphic.md     # 그래픽
├── content/
│   ├── research/          # 리서치 결과
│   ├── drafts/            # 원고 초안
│   ├── graphics/          # 다이어그램/시각자료
│   └── reviews/           # LLM 리뷰 결과
├── docs/                  # 최종 완성 원고 (검토 완료)
│   ├── ch{N}A.md          # N장 A회차 (강의+시연)
│   ├── ch{N}B.md          # N장 B회차 (개인 실습+C파일 비교)
│   └── ch{N}C.md          # N장 C파일 (모범 구현+해설, 제출 후 공개)
├── practice/              # 실습 프로젝트 (Next.js)
│   └── chapter{N}/        # 각 장별 Next.js 프로젝트
│       ├── starter/       # B회차 스타터 코드 (A회차 시연 결과물)
│       ├── complete/      # 모범 구현 (C파일용)
│       ├── app/           # Next.js App Router 페이지
│       ├── components/    # 재사용 컴포넌트
│       ├── lib/           # 유틸리티 (supabase 클라이언트 등)
│       ├── public/        # 정적 파일
│       ├── package.json   # 의존성 (버전 고정)
│       ├── tailwind.config.js
│       ├── next.config.js
│       └── .github/
│           └── copilot-instructions.md  # Copilot 프로젝트 지시사항
├── checklists/            # 진행 체크리스트
├── scripts/               # 자동화 스크립트
└── _archive/              # 이전 프로젝트 백업 (React+Vite 기존 원고 + 3교시 형식 원고)
```

---

## 6단계 워크플로우

```
[1단계: Planning] ⭐ Claude Code Plan Mode 사용
    EnterPlanMode
        │
    @planner ── 집필계획서 작성 ──▶ schema/chap{N}.md
        │
    ExitPlanMode (사용자 승인)
        │
        ▼
[2단계: Information Gathering]
    @researcher ── 자료 조사 ──▶ content/research/
        │
        ▼
[3단계: Analysis]
    정보 구조화 및 핵심 통찰 추출
        │
        ▼
[4단계: Implementation & Documentation]
    ├── @coder ── 코드 우선 작성 ──▶ practice/chapter{N}/ (starter/ + complete/)
    ├── @writer ── 결과 기반 문서화 ──▶ content/drafts/ (A회차 + B회차)
    └── @graphic ── 시각자료 ──▶ content/graphics/
        │
        ▼
[5단계: Optimization]
    일관성 및 완성도 검증
        │
        ▼
[6단계: Quality Verification]
    @reviewer ── 품질 검토 ──▶ docs/ch{N}A.md, ch{N}B.md, ch{N}C.md (최종 완성본)
```

### 필수 단계 (5-6단계는 자동 수행)

**CRITICAL**: 4단계 완료 후 5-6단계를 **자동으로 연속 수행**한다.

#### 작업 명령어 해석 기준
| 사용자 명령 | 수행 범위 | 비고 |
|---|---|---|
| "N장 작성" | 1~6단계 전체 (A+B+C) | **모든 단계 자동 수행** |
| "N장 A회차 작성" | 1~6단계 (A회차만) | A회차 단독 제작 |
| "N장 B회차 작성" | 1~6단계 (B+C) | B회차 + C파일 제작 |
| "N장 검토" | 5~6단계 | 일관성 검증 + 품질 리뷰 |

---

## 에이전트 라우팅 규칙

### @planner (집필계획자)
- **트리거**: "계획", "스키마", "집필계획서", "구성"
- **도구**: **Claude Code Plan Mode** (EnterPlanMode → 탐색/계획 → ExitPlanMode)
- **출력**: `schema/chap{N}.md`

### @researcher (리서처)
- **트리거**: "조사해줘", "리서치", "자료 찾아줘", "참고문헌"
- **출력**: `content/research/ch{N}-{주제}.md`

### @writer (작가)
- **트리거**: "작성해줘", "초안", "원고", "본문"
- **출력**: `content/drafts/ch{N}A.md`, `content/drafts/ch{N}B.md`

### @coder (코드작성자)
- **트리거**: "코드", "실습", "예제", "구현"
- **출력**: `practice/chapter{N}/starter/`, `practice/chapter{N}/complete/`

### @reviewer (검토자)
- **트리거**: "검토", "리뷰", "피드백", "수정"
- **출력**: 인라인 피드백 또는 `docs/ch{N}A.md`, `docs/ch{N}B.md`, `docs/ch{N}C.md`

### @graphic (그래픽)
- **트리거**: "다이어그램", "그래픽", "플로우차트", "아키텍처"
- **출력**: `content/graphics/ch{N}/`

---

## 핵심 작업 규칙

### 문체 가이드 (교재 친화적 글쓰기)
- **문체**: 친근하면서도 명확한 설명체, 학생과 대화하듯 서술
- **종결어미**:
  - 본문: 격식체 평서문 ('이다', '한다', '보인다')
  - 예시/팁: 비격식체 허용 ('~해보자', '~라고 할 수 있다')
- **문장 구조**: 짧고 명확한 문장 선호, 한 문장에 하나의 개념
- **용어**: 전문 용어는 첫 등장 시 **굵게** 표시 + 영문 병기 (예: "**합성곱 신경망**(CNN, Convolutional Neural Network)")
- **난이도 조절**: 어려운 개념은 "쉽게 말해서..." 또는 "비유하자면..."으로 보충 설명

### 수식 표기 (Unicode 인라인)
```
✅ 올바름: Yᵢₜ = αᵢ + λₜ + δ·Dᵢₜ + εᵢₜ
❌ 금지: $Y_{it} = \alpha_i + \lambda_t$ (LaTeX)
```

### 코드 스타일
- **Next.js 14+** (App Router, Server Components 기본)
- **Tailwind CSS** (인라인 스타일, 별도 CSS 파일 최소화)
- **TypeScript/JavaScript** (JSX/TSX)
- **Supabase** (@supabase/supabase-js, @supabase/ssr)
- 한국어 주석
- `package.json`에 정확한 버전 고정 (^ 대신 exact version)
- **copilot-instructions.md** 예시를 반드시 포함하여 버전 불일치 방지

### 참고문헌 형식
```
저자명. (연도). 논문제목. *저널명*. URL/DOI
```

### 표/그림 제목 형식
- **표 제목**: 표 위에 작성 (`**표 2.1** 제목`)
- **그림 제목**: 그림 아래에 작성 (`**그림 3.2** 제목`)
- **번호 체계**: `{장번호}.{순번}`

---

## 수업 운영 상세

### 과제 제출 (매주 동일 형식)

Google Classroom에 아래 두 항목만 제출한다:

```
① 배포 URL (Vercel)
② AI가 틀린 부분 1개
   — 무엇이 잘못됐고 어떻게 고쳤는지 1-2문장
   — 딱히 없었으면 "Copilot이 생성한 코드에서 확인한 점" 기술
```

### 과제 채점 (매주 동일 기준)

| 항목 | 배점 |
|------|:---:|
| 배포 URL 동작 확인 | 7점 |
| AI 검증 서술 | 3점 |
| **합계** | **10점** |

※ B회차 과제 12회 (8주차 중간고사, 15주차 기말고사 제외). 12회 × 10점 = 120점 만점을 30%로 환산.

### 전체 평가 비율

| 항목 | 비율 | 비고 |
|------|:---:|------|
| 중간고사 | 20% | 코딩 객관식 (Ch1-7) |
| 기말고사 | 20% | 코딩 객관식 (Ch8-12) |
| B회차 과제 | 30% | Google Classroom, 12회 × 10점 |
| 개인 프로젝트 | 30% | 배포 URL + GitHub + AI 사용 로그 |
| 출석 | 감점제 | 결석 -2점, 지각 -1점 (총점에서 차감) |

### 스타터 코드 정책

A회차와 B회차 사이 컨텍스트 단절 문제를 해결한다:
- B회차 시작 시 **스타터 코드**(A회차 시연 결과물)를 제공하여 동일 출발선에서 시작
- `practice/chapter{N}/starter/` 폴더에 위치
- A회차에서 완성 못 한 학생도 B회차에서 바로 실습 가능

---

## 환경 변수 (.env)

```bash
# Multi-LLM 리뷰 (선택)
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...

# 웹 스크래핑 (선택)
FIRECRAWL_API_KEY=...

# Google AI (Gemini) - MCP 서버용
GEMINI_API_KEY=...
```

---

## 개발 도구 설정

### MCP 서버 (Nano Banana)

**Nano Banana MCP**는 Gemini Vision 및 이미지 생성 기능을 Claude Code에서 사용할 수 있게 하는 MCP 서버입니다.

#### 설치 위치
프로젝트 외부에 설치하여 여러 프로젝트에서 공통 사용:
```
~/Documents/mcp-servers/nanobanana-mcp/
```

#### 설치 방법

1. **저장소 클론 및 빌드**
   ```bash
   cd ~/Documents
   mkdir -p mcp-servers
   cd mcp-servers
   git clone https://github.com/YCSE/nanobanana-mcp.git
   cd nanobanana-mcp
   npm install
   npm run build
   ```

2. **API 키 설정**
   프로젝트 루트의 `.env` 파일에 추가 (또는 MCP 등록 시 환경 변수로 전달):
   ```bash
   GEMINI_API_KEY=<your-gemini-api-key>
   ```

3. **Claude Code에 MCP 서버 등록**
   ```bash
   # Windows (PowerShell)
   claude mcp add nanobanana-mcp "node" `
     "$env:USERPROFILE\Documents\mcp-servers\nanobanana-mcp\dist\index.js" `
     -e "GEMINI_API_KEY=<your-gemini-api-key>"

   # macOS/Linux
   claude mcp add nanobanana-mcp "node" \
     "$HOME/Documents/mcp-servers/nanobanana-mcp/dist/index.js" \
     -e "GEMINI_API_KEY=<your-gemini-api-key>"
   ```

4. **Claude Code 재시작**
   MCP 서버 등록 후 Claude Code를 재시작하여 변경사항 적용

#### 사용 가능 기능
- Gemini Vision API를 통한 이미지 분석
- AI 기반 이미지 생성
- 교재 작성 시 그래픽 리소스 생성 보조

#### 참고
- 공식 저장소: https://github.com/YCSE/nanobanana-mcp
- 다른 유사 프로젝트:
  - ConechoAI/Nano-Banana-MCP
  - chongdashu/cc-skills-nanobananapro

---

## 체크리스트 위치

진행 상황은 `checklists/book-progress.md`에서 추적합니다.

---

## 현재 프로젝트 상태

### 도서 정보
- **제목**: 웹 프로그래밍(실전): AI 협업 기반 풀스택 리터러시
- **부제**: Next.js + Tailwind CSS + Supabase + Vercel — 바이브코딩 with GitHub Copilot
- **도서 유형**: 학부생 강의교재 (바이브코딩 방식)
- **현재 단계**: 개인 블로그 통합 마이그레이션 완료 — Ch1~Ch13 하나의 블로그가 성장하는 구조
- **프로젝트 서사**: Ch1(블로그 첫 페이지) → Ch2(소개 페이지) → Ch3-6(프론트엔드) → Ch7(설계 보완) → Ch8(Supabase 연결) → Ch9(로그인) → Ch10(CRUD) → Ch11(보안) → Ch12(UX) → Ch13(확장 기능)

### 완료된 설정
- ✅ 6개 전문 에이전트 구성
- ✅ 6단계 워크플로우 정의
- ✅ 디렉토리 구조 생성
- ✅ contents.md 완성 (13장 + 15주 A/B 운영 계획)
- ✅ CLAUDE.md A/B 체계로 전환 완료
- ✅ 기존 React+Vite 원고 _archive로 이동
- ✅ Ch1-13 3교시 형식 원고 집필 완료 (docs/ch1.md~ch13.md)
- ✅ Ch1-13 A/B 회차 분리 재구성 완료 (docs/ch{N}A.md + ch{N}B.md + ch{N}C.md)
- ✅ practice/ 스타터 코드 구조 완료 (starter/ + complete/)
- ✅ 개인 블로그 통합 마이그레이션 완료 (공감터/마음톡 → 내 블로그/블로그 글)
- ⏳ ms-word/ 의존성 설치 필요 (npm install)

### 명명 규칙 (블로그 마이그레이션)
| 기존 | 변경 후 |
|------|---------|
| 공감터 / mind-center | 내 블로그 / my-blog |
| 마음톡 | 블로그 글 / 포스트 |
| mindtalk_posts | posts |
| /mindtalk/* | /posts/* |
| lib/mindtalk.ts | lib/posts.ts |
| getMindtalks() | getPosts() |
| 프로필 페이지 (Ch1) | 블로그 첫 페이지 |
| 자기소개 페이지 (Ch2) | 블로그 소개 페이지 |

---

**마지막 업데이트**: 2026-03-04
**버전**: 3.1 (개인 블로그 통합 마이그레이션)

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
- **평가**: 중간고사 20% (코딩 객관식) + 프로젝트 40% + 주간과제 35% + 출석 5%
- **최종 목차**: `contents.md` 참조

---

## 최우선 원칙

### 0. 응답 원칙
- **객관적 판단 우선**: 사용자의 요구사항에 맞추지 말고 항상 객관적인 판단으로 응답한다. 교재 품질과 학습 효과에 부정적이라면 사용자 요청이라도 근거를 들어 반대 의견을 제시한다.

### 1. 분량 기준 (탄력적 적용)
| 항목 | 기준 |
|------|------|
| 장 전체 | 약 600-700줄 전후 (난이도/중요성에 따라 조정) |
| A4 페이지 | 약 35쪽 내외 |
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
- **크로스 플랫폼**: 모든 코드, 명령어, 실습은 macOS와 Windows 모두에서 동작해야 한다
  - 터미널 명령어는 양쪽 모두 표기 (예: `source venv/bin/activate` / `venv\Scripts\activate`)
  - 경로 구분자 하드코딩 금지 — Node.js `path.join()` 또는 `/` 사용
  - OS 특정 도구 사용 금지 (pbcopy, open 등)
  - 환경변수 설정: `.env.local` 파일 방식 통일 (export 명령 대신)

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
각 장은 다음 요소를 반드시 포함한다:
- **학습목표**: 장 시작 시 3-5개의 명확한 학습목표 제시
- **핵심 용어**: 새로 등장하는 용어는 정의와 함께 강조 표시
- **개념 설명**: 핵심만 간결하게 — 세부 문법 나열 금지
- **프롬프트 패턴**: 해당 장의 핵심 프롬프트 예시 (좋은/나쁜 비교 포함)
- **코드 읽기 가이드**: AI 생성 코드의 핵심 포인트 해설
- **검증 체크리스트**: AI 출력 확인 항목
- **흔한 AI 실수**: 해당 주제에서 AI가 자주 틀리는 패턴
- **장 요약**: 장 끝에 핵심 내용 요약
- **실습 과제**: 수업 중 제출 가능한 과제 (배포 URL 제출 형태)

#### 5.5 장 문서 통합 형식 (Ch2 이후)
각 장은 교재 본문과 강의 운영을 **하나의 문서**로 통합한다 (docs/와 lectures/ 분리 금지).

**문서 구조**:
```
# Chapter N. 제목
> 미션
학습목표
수업 타임라인 (표)
# 1교시: 주제
  ## 절 (이론)
# ― 쉬는시간 ―
# 2교시: 주제
  ## 절 (이론 + 시연)
# ― 쉬는시간 ―
# 3교시: 실습 + 과제 제출
  ## 절 (과제)
장 요약
교수 메모 (준비물 + 수업 후 체크)
다음 장 예고
```

**시간 표기 규칙**:
- 교시/쉬는시간 구분만 표기한다
- **세부 분 단위 표기 금지**: 절 제목에 `(15분)`, `(25분)` 등 붙이지 않는다
- 수업 타임라인 표에만 시간대(00:00~00:50) 표기

**교수 전용 요소**:
- `> **강의 팁**:` — 수업 운영 조언 (학생에게는 보이지 않는 교수용 노트)
- `> **함께 진행**:` — 교수 화면 공유하며 동시 진행하는 실습
- `> **라이브 코딩 시연**:` — 교수가 직접 코딩하며 보여주는 시연
- `교수 메모` 섹션 — 준비물 체크리스트 + 수업 후 확인 항목

**예외**: Ch1은 배포 세팅 위주로, 3교시 구조 없이 자유 형식

**서식 세부 규칙**:
- **표 라벨 필수**: 모든 표에 `**표 N.X** 제목`을 표 위에 작성 (예외 없음, 순번은 장 내에서 연속)
- **Heading 계층**: `# Chapter/교시` > `## 절` > `### 소절` (# 레벨은 Chapter 제목과 교시/쉬는시간에만 사용)
- **쉬는시간 구분선**: `# ― 쉬는시간 ―` (앞뒤에 `---` 수평선)
- **과제 단계 번호**: 원문자 사용 — **① ② ③ ④ ⑤**
- **Copilot 프롬프트**: `> **Copilot 프롬프트**` 블록인용 형식
- **과제 구조**: `### 과제 안내` → `### 실습 진행` → `### 과제 제출 + 마무리`

#### 5.6 코드 제시 방식
- **본문에는 핵심 구조만**: 전체 코드가 아닌 핵심 패턴/구조만 본문에 포함 (5-10줄)
- **전체 코드는 practice 폴더**: `practice/chapter{N}/` 에 Next.js 프로젝트로 제공
- **코드는 "읽기용"으로 제시**: "이 코드를 직접 타이핑하라"가 아니라 "AI가 생성한 코드를 읽고 이해하라"
- **주석은 학습 포인트**: 코드 내 주석으로 "여기서 주목할 부분" 표시

#### 5.7 표준 참조 문서
- **집필 시 참조**: 기존 완성 원고 `docs/ch1.md`~`docs/ch4.md`를 문체/형식 기준으로 참조
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
│   ├── sample.md          # 집필 표준 참조 문서
│   └── ch{N}.md
├── practice/              # 실습 프로젝트 (Next.js)
│   └── chapter{N}/        # 각 장별 Next.js 프로젝트
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
└── _archive/              # 이전 프로젝트 백업 (React+Vite 기존 원고)
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
    ├── @coder ── 코드 우선 작성 ──▶ practice/chapter{N}/code/
    ├── @writer ── 결과 기반 문서화 ──▶ content/drafts/
    └── @graphic ── 시각자료 ──▶ content/graphics/
        │
        ▼
[5단계: Optimization]
    일관성 및 완성도 검증
        │
        ▼
[6단계: Quality Verification]
    @reviewer ── 품질 검토 ──▶ docs/ch{N}.md (최종 완성본)
```

### 필수 단계 (5-6단계는 자동 수행)

**CRITICAL**: 4단계 완료 후 5-6단계를 **자동으로 연속 수행**한다.

#### 작업 명령어 해석 기준
| 사용자 명령 | 수행 범위 | 비고 |
|---|---|---|
| "N장 작성" | 1~6단계 전체 | **모든 단계 자동 수행** |
| "N장 검토" | 5~6단계 | 일관성 검증 + 품질 리뷰 |

---

## 에이전트 라우팅 규칙

### @planner (집필계획자)
- **트리거**: "계획", "스키마", "집필계획서", "구성"
- **도구**: **Claude Code Plan Mode** (EnterPlanMode → 탐색/계획 → ExitPlanMode)
- **출력**: `schema/chap{N}.md`

### @researcher (리서처)
- **트리거**: "조사해줘", "리서치", "자료 찾아줘", "참고문헌"
- **출력**: `content/research/ch{N}-{절}.md`

### @writer (작가)
- **트리거**: "작성해줘", "초안", "원고", "본문"
- **출력**: `content/drafts/ch{N}-{절}.md`

### @coder (코드작성자)
- **트리거**: "코드", "실습", "예제", "구현"
- **출력**: `practice/chapter{N}/code/`

### @reviewer (검토자)
- **트리거**: "검토", "리뷰", "피드백", "수정"
- **출력**: 인라인 피드백 또는 `docs/ch{N}.md`

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
   # macOS/Linux
   claude mcp add nanobanana-mcp "node" \
     "$HOME/Documents/mcp-servers/nanobanana-mcp/dist/index.js" \
     -e "GEMINI_API_KEY=<your-gemini-api-key>"
   # Windows (Git Bash)
   claude mcp add nanobanana-mcp "node" \
     "$USERPROFILE/Documents/mcp-servers/nanobanana-mcp/dist/index.js" \
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
- **현재 단계**: Ch1-13 전 장 집필+검토 완료 (본문 완성)

### 완료된 설정
- ✅ 6개 전문 에이전트 구성
- ✅ 7단계 워크플로우 정의
- ✅ 디렉토리 구조 생성
- ✅ contents.md 완성 (13장 + 15주 운영 계획, Ch2/Ch3/Ch7/Ch10 정합성 수정 반영)
- ✅ 바이브코딩 교재 형식으로 CLAUDE.md 전환
- ✅ 기존 React+Vite 원고 _archive로 이동
- ✅ Ch1-4 집필 완료 + 검토/수정 완료 (docs/ch1.md~ch4.md)
- ✅ Ch5-6 신규 작성 완료 (docs/ch5.md~ch6.md)
- ✅ Ch7-12 집필 + 검토 완료 (docs/ch7.md~ch12.md)
- ✅ Ch13 집필 + 검토 완료 (docs/ch13.md — 개인 프로젝트 구현)
- ✅ MS Word 변환 시스템 구축 (ms-word/)
- ⏳ practice/ Next.js 프로젝트 구조 재편 필요 (현재 이전 15장 형식)
- ⏳ ms-word/ 의존성 설치 필요 (npm install)

---

**마지막 업데이트**: 2026-02-23
**버전**: 2.3 (Ch1-13 전 장 완료)

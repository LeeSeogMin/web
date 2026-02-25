# Chapter 7. 웹 앱 아키텍처 & AI 디자인 설계 — A회차: 강의

> **미션**: 코딩 전에 "뭘 만들지"를 확실히 잡는다 — AI 디자인 도구와 설계서가 바이브코딩의 품질을 결정한다

---

## 학습목표

1. 설계 없는 바이브코딩이 왜 "AI 슬롭"을 만드는지 설명할 수 있다
2. 페이지 맵과 유저 플로우로 앱 구조를 설계할 수 있다
3. Copilot Vision과 v0를 활용하여 스케치/프롬프트를 코드로 변환할 수 있다
4. shadcn/ui를 설치하고 디자인 토큰으로 테마를 커스터마이징할 수 있다
5. 설계서(ARCHITECTURE.md + copilot-instructions.md)를 작성하여 AI에게 프로젝트 컨텍스트를 제공할 수 있다

---

## 수업 타임라인

**표 7.1** A회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | 오늘의 미션 + 빠른 진단 |
| 00:05~00:25 | 왜 설계인가 + 페이지 구조 + 와이어프레임 개념 |
| 00:25~00:50 | AI 와이어프레임 도구 + shadcn/ui + 디자인 토큰 |
| 00:50~01:20 | 라이브 시연: 설계서 작성 + shadcn/ui 설치 + AI 와이어프레임 변환 |
| 01:20~01:27 | 핵심 정리 + B회차 과제 스펙 공개 |
| 01:27~01:30 | Exit ticket |

---

## 오늘의 미션 + 빠른 진단

> **오늘의 질문**: "Ch5~6에서 게시판을 만들었다. 그런데 Copilot에게 '게시판 만들어줘'라고 하면 모든 학생이 똑같은 결과물을 받는다. 어떻게 하면 '내 프로젝트'다운 결과를 얻을 수 있을까?"

**빠른 진단** (1문항):

Copilot에게 "예쁜 로그인 페이지 만들어줘"라고 프롬프트를 입력했다. 이 프롬프트의 가장 큰 문제는?
- (A) 영어로 입력하지 않았다
- (B) 색상, 레이아웃, 컴포넌트 등 구체적인 디자인 지시가 없다
- (C) Copilot은 로그인 페이지를 만들 수 없다

정답: (B) — "예쁜"은 주관적이다. AI에게는 색상 코드, 레이아웃 구조, 사용할 컴포넌트 등 구체적인 디자인 지시가 필요하다.

---

## 7.1 왜 설계가 먼저인가

지금까지 Ch5~6에서 Next.js로 게시판을 만들었다. 페이지를 나누고, 상태를 관리하고, 데이터를 가져오는 방법을 배웠다. 그런데 한 가지 빠진 것이 있다. **"무엇을 만들 것인지"를 정하는 과정**이다.

### 7.1.1 설계 없는 바이브코딩의 문제점: "AI 슬롭"과 균일한 UI

Copilot에게 "게시판 만들어줘"라고 하면 코드가 만들어진다. 문제는, **모든 학생이 똑같은 결과물을 받는다**는 것이다. 같은 프롬프트 -> 같은 AI -> 같은 디자인. 이렇게 만들어진 결과물을 **AI 슬롭**(AI Slop)이라 부른다.

AI 슬롭의 특징:
- 모든 프로젝트가 비슷하게 생겼다 (같은 색상, 같은 레이아웃)
- 디자인에 의도가 없다 (왜 이 색인지, 왜 이 배치인지 설명할 수 없다)
- 사용자 경험을 고려하지 않았다 (어디를 클릭해야 하는지 헷갈린다)

반대로, **설계서를 먼저 작성하고 AI에게 제공하면** 결과가 달라진다. "파란색 계열 테마, 왼쪽에 사이드바, 카드 리스트 형태"처럼 구체적인 지시를 담은 설계서가 있으면, AI는 그 의도에 맞는 코드를 생성한다.

> **강의 팁**: "설계 없이 만든 게시판" vs "설계서를 제공하고 만든 게시판" 스크린샷 2장을 슬라이드로 보여주면 효과적이다. 차이가 극명하다.

### 7.1.2 AI는 디자인 감각이 없다 — 시각적 컨텍스트가 필요한 이유

2장에서 AI의 3대 한계를 배웠다. 디자인에는 **네 번째 한계**가 추가된다: AI는 **시각적 의도를 이해하지 못한다**.

AI는 텍스트로 학습했다. "깔끔한 디자인"이라고 요청하면, AI가 생각하는 "깔끔함"과 내가 원하는 "깔끔함"이 다를 수 있다. AI에게는 레퍼런스 이미지, 색상 코드, 구체적인 레이아웃 지시가 필요하다.

**표 7.2** 모호한 지시 vs 구체적 지시

| 모호한 지시 (결과 예측 불가) | 구체적 지시 (의도 전달 가능) |
|:---:|:---:|
| "예쁘게 만들어줘" | "primary: blue-600, 배경: gray-50, 카드: 흰색 + 둥근 모서리(rounded-lg)" |
| "깔끔하게 배치해줘" | "2열 그리드(md:grid-cols-2), 간격 gap-6, 최대 너비 max-w-4xl" |
| "모바일에서도 보이게" | "md 이상 2열, sm 이하 1열, 사이드바는 모바일에서 숨김" |

### 7.1.3 좋은 설계 = 좋은 프롬프트: 3단계 디자인 파이프라인

바이브코딩에서 디자인 품질을 높이는 방법은 **3단계 디자인 파이프라인**(Design Pipeline)을 따르는 것이다:

```
① 탐색 — 레퍼런스 수집 (마음에 드는 사이트/앱 스크린샷)
    ↓
② 프로토타입 — 와이어프레임 + AI 프로토타입 (손그림 → v0/Copilot Vision)
    ↓
③ 코드 — 설계서 기반 코드 생성 (shadcn/ui + Copilot)
```

이 장에서 3단계를 모두 실습한다. 핵심은 **1번을 건너뛰지 않는 것**이다. 레퍼런스 없이 바로 코드를 작성하면 AI 슬롭이 된다.

---

## 7.2 페이지 구조 설계

코드를 작성하기 전에, 앱에 **어떤 페이지가 필요한지**부터 정리한다. 이것이 **페이지 맵**(Page Map)이다.

### 7.2.1 어떤 페이지가 필요한가 (페이지 맵)

게시판 앱을 예로 들면:

```
홈 (/)
├── 게시글 목록 (/posts)
│   ├── 게시글 상세 (/posts/[id])
│   └── 게시글 작성 (/posts/new)
├── 로그인 (/login)
└── 프로필 (/profile)
```

**페이지 맵은 종이에 그려도 충분하다.** 중요한 것은 "어떤 페이지가 있는지"와 "페이지 간 관계"를 한눈에 파악하는 것이다.

### 7.2.2 페이지별 URL 구조 정의 (Next.js App Router 기준)

페이지 맵을 그렸으면, Next.js App Router의 폴더 구조로 변환한다:

**표 7.3** 페이지 맵 -> App Router 폴더 구조

| 페이지 | URL | 폴더/파일 |
|--------|-----|----------|
| 홈 | `/` | `app/page.js` |
| 게시글 목록 | `/posts` | `app/posts/page.js` |
| 게시글 상세 | `/posts/[id]` | `app/posts/[id]/page.js` |
| 게시글 작성 | `/posts/new` | `app/posts/new/page.js` |
| 로그인 | `/login` | `app/login/page.js` |
| 프로필 | `/profile` | `app/profile/page.js` |

Ch5에서 배운 파일 기반 라우팅이 여기서 다시 등장한다. 설계 단계에서 URL 구조를 미리 정하면, AI에게 "이 URL 구조에 맞춰서 만들어줘"라고 지시할 수 있다.

### 7.2.3 페이지 간 이동 흐름 (유저 플로우)

**유저 플로우**(User Flow)는 사용자가 특정 목표를 달성하기까지의 화면 이동 경로이다.

예를 들어 "비로그인 사용자가 글을 작성하는 경우":

```
홈 → "글쓰기" 클릭 → 로그인 페이지로 이동 → Google 로그인
→ 글 작성 페이지로 돌아옴 → 글 작성 → 제출 → 게시글 상세
```

이런 흐름을 미리 정리해두면 두 가지가 좋아진다:
- Copilot에게 **"로그인하지 않은 사용자가 글쓰기를 누르면 로그인 페이지로 리다이렉트해줘"**처럼 명확한 프롬프트를 줄 수 있다
- 빠뜨린 페이지나 경로를 미리 발견할 수 있다

> **강의 팁**: 게시판 앱의 유저 플로우 3가지(글 읽기, 글 쓰기, 내 글 수정)를 화이트보드에 그려보면 효과적이다.

---

## 7.3 AI로 와이어프레임 만들기

### 7.3.1 와이어프레임이란: 복잡한 디자인이 아닌 뼈대 잡기

**와이어프레임**(Wireframe)은 페이지의 **뼈대 구조**를 단순하게 표현한 설계도이다. 색상, 이미지, 폰트 없이 **"어디에 무엇이 배치되는지"**만 표현한다.

와이어프레임은 **완벽할 필요가 없다**. 목적은 AI에게 "이런 구조로 만들어줘"라는 **시각적 컨텍스트를 전달**하는 것이다.

### 7.3.2 종이/화이트보드에서 시작하기

가장 빠른 와이어프레임 도구는 **종이와 펜**이다.

> **함께 진행**: 종이를 꺼내고 메인 페이지 + 게시글 상세 페이지 2장을 5분 동안 스케치한다.

스케치할 때 포함할 요소:
- 상단: 네비게이션 바 (로고, 메뉴, 로그인 버튼)
- 메인: 콘텐츠 영역 (카드 리스트 또는 상세 본문)
- 하단: 푸터 (선택)
- 각 영역에 "이것은 무엇이다"를 글씨로 적는다

> **강의 팁**: "예쁘게 그릴 필요 없다"를 강조한다. 네모 몇 개와 화살표면 충분하다. 못 그리는 것이 정상이다.

---

### AI 디자인 도구 비교

지금부터 사용할 도구들을 정리한다. 이 수업에서는 Tier 1 도구만 필수이다.

**표 7.4** AI 디자인 도구 비교

| 도구 | 비용 | 입력 | 출력 | 용도 |
|------|------|------|------|------|
| **Copilot Vision** | 학생 무료 | 스케치/스크린샷 | React+Tailwind | **필수** — 스케치->코드 |
| **v0 by Vercel** | 무료 7-15회/월 | 텍스트 프롬프트 | React+Tailwind+shadcn | **필수** — 프로토타입 생성 |
| **shadcn/ui** | 무료 OSS | CLI 명령어 | 컴포넌트 코드 | **필수** — 컴포넌트 시스템 |
| tldraw Make Real | 무료 | 캔버스 손그림 | HTML+Tailwind | 교수 시연용 |
| screenshot-to-code | 무료 OSS | 스크린샷 | React+Tailwind | 레퍼런스 분석용 |

> **참고 -- 전문가 도구**: Figma MCP, 21st.dev Magic MCP, Google Stitch 등은 디자이너와 협업하는 전문 워크플로우에서 사용한다. 이 수업에서는 다루지 않지만, "이런 것이 있다"는 정도로 알아두면 된다.

### 7.3.3 Copilot Vision으로 스케치를 코드로 변환하기

Copilot Vision은 **이미지를 이해하는 기능**이다. 2장에서 설치한 Copilot Chat에 이미지를 드래그하면, AI가 그림을 분석하여 코드를 생성한다.

**사용 방법**:
1. 종이 스케치를 촬영한다 (스마트폰 카메라)
2. VS Code의 Copilot Chat 패널을 연다
3. 이미지를 채팅창에 **드래그 앤 드롭**한다
4. 프롬프트를 함께 입력한다

> **Copilot 프롬프트**
> "이 손그림 스케치를 Next.js + Tailwind CSS 컴포넌트로 변환해줘.
> App Router 구조를 사용하고, 레이아웃은 스케치와 최대한 비슷하게 만들어줘.
> 색상은 아직 정하지 않았으니 gray 계열로 기본 처리해줘."

<!-- COPILOT_VERIFY: 손그림 스케치를 Copilot Chat에 드래그하여 코드 변환 결과를 캡처해주세요 -->

> **라이브 코딩 시연**: tldraw(makereal.tldraw.com)에서 간단한 카드 UI를 손그림으로 그리고 -> "Make Real" 버튼 클릭 -> HTML+Tailwind 코드 변환 과정을 보여준다.

### 7.3.4 v0로 프로토타입 생성하고 프로젝트에 통합하기

**v0**(v0.dev)는 Vercel이 만든 AI 프로토타입 도구이다. 텍스트 프롬프트를 입력하면 **React + Tailwind CSS + shadcn/ui** 기반의 프로토타입을 즉시 생성한다.

**왜 v0인가**: 이미 Vercel을 사용 중이므로 별도 계정이 필요 없다. 무료 티어(월 7-15회)로 충분하며, 출력이 Next.js + shadcn/ui 네이티브 코드이므로 프로젝트에 바로 통합할 수 있다.

**사용 방법**:
1. v0.dev 접속 (Vercel 계정으로 로그인)
2. 프롬프트 입력
3. 생성된 프로토타입을 미리보기에서 확인
4. `npx v0 add [URL]` 명령어로 프로젝트에 통합

---

## 7.4 shadcn/ui로 컴포넌트 시스템 구축하기

### 7.4.1 shadcn/ui란: 복사해서 쓰는 컴포넌트 라이브러리

**shadcn/ui**는 일반적인 npm 패키지가 아니다. `npm install`로 설치하는 것이 아니라, **컴포넌트 코드를 프로젝트에 직접 복사**한다. 복사된 코드는 내 프로젝트의 일부가 되므로 자유롭게 수정할 수 있다.

왜 바이브코딩 교재에서 shadcn/ui를 사용하는가:
- **코드가 내 프로젝트에 있으므로** AI가 코드를 읽고 수정할 수 있다 (블랙박스가 아니다)
- v0, Bolt, Lovable 등 **주요 AI 도구들이 모두 shadcn/ui 기반**이다
- Tailwind CSS + **Radix UI**(접근성 보장) 조합이다
- 복사된 코드를 열어서 **"이 버튼이 어떻게 동작하는지"** 직접 읽을 수 있다

> **강의 팁**: "npm 패키지는 node_modules 안에 숨어 있어서 코드를 보기 어렵다. shadcn/ui는 내 components/ui/ 폴더에 코드가 그대로 있다"고 설명하면 차이가 명확해진다.

### 7.4.2 npx shadcn init -- 프로젝트에 설치하기

> **함께 진행**: 교수 화면 공유하며 학생들과 동시에 실행

```bash
npx shadcn@latest init
```

설치 중 선택 항목:

**표 7.5** shadcn/ui 초기화 옵션

| 질문 | 권장 선택 | 설명 |
|------|----------|------|
| Style | Default | 기본 스타일 |
| Base color | Slate | 무난한 회색 계열 (나중에 변경 가능) |
| CSS variables | Yes | 테마 커스터마이징에 필수 |

설치 후 **버전 확인** — `@latest`로 설치했으므로 어떤 버전이 설치되었는지 확인하고, copilot-instructions.md를 업데이트한다:

```bash
# components.json에서 shadcn/ui 설정 확인
node -e "const c = require('./components.json'); console.log('style:', c.style, '| tailwind:', c.tailwind?.config)"
```

copilot-instructions.md의 Tech Stack 섹션에 shadcn/ui 사용 사실을 추가한다:

```markdown
## Tech Stack
- shadcn/ui (components/ui/ 경로에 설치됨)
```

설치 후 생성되는 파일:

```
프로젝트/
├── components/
│   └── ui/              ← shadcn/ui 컴포넌트가 여기에 복사됨
├── lib/
│   └── utils.ts         ← cn() 유틸리티 함수
└── app/
    └── globals.css      ← CSS 변수 (디자인 토큰)
```

### 7.4.3 핵심 컴포넌트 추가: Button, Card, Input, Dialog

> **함께 진행**: 컴포넌트 4개를 한 번에 추가

```bash
npx shadcn@latest add button card input dialog
```

**표 7.6** shadcn/ui 핵심 컴포넌트

| 컴포넌트 | 용도 | 게시판 활용 예시 |
|----------|------|----------------|
| **Button** | 버튼 (variant: default, outline, ghost 등) | 글쓰기, 로그인, 삭제 |
| **Card** | 콘텐츠 카드 (Header, Content, Footer) | 게시글 카드 |
| **Input** | 텍스트 입력 필드 | 검색, 제목 입력 |
| **Dialog** | 모달 대화상자 | 삭제 확인, 로그인 안내 |

**코드 읽기 -- Button 컴포넌트**:

```tsx
// components/ui/button.tsx (shadcn/ui가 복사한 코드)
import { cn } from "@/lib/utils"

// variant별로 다른 스타일이 적용된다
// "default" → bg-primary text-primary-foreground
// "outline" → border border-input bg-background
// "ghost"   → hover:bg-accent
```

사용 예시:

```jsx
import { Button } from "@/components/ui/button"

<Button>기본 버튼</Button>
<Button variant="outline">외곽선 버튼</Button>
<Button variant="ghost">투명 버튼</Button>
```

### 7.4.4 테마 커스터마이징: CSS 변수로 디자인 토큰 설정

shadcn/ui의 모든 스타일은 `app/globals.css`의 **CSS 변수**로 제어된다. 이 변수들을 **디자인 토큰**(Design Token)이라 한다.

**표 7.7** 주요 디자인 토큰

| 토큰 | CSS 변수 | 역할 |
|------|----------|------|
| 배경색 | `--background` | 페이지 전체 배경 |
| 텍스트색 | `--foreground` | 기본 텍스트 색상 |
| 주요색 | `--primary` | 주요 버튼, 링크 색상 |
| 보조색 | `--secondary` | 보조 버튼, 배지 |
| 강조색 | `--accent` | 호버 효과, 강조 영역 |
| 테두리 | `--border` | 카드, 입력 필드 테두리 |
| 둥글기 | `--radius` | 모서리 반경 |

**색상 팔레트 변경하기**: shadcn/ui 공식 사이트(ui.shadcn.com/themes)에서 테마를 선택하면 CSS 변수 코드를 복사할 수 있다. `globals.css`의 `:root` 부분을 교체하면 전체 테마가 바뀐다.

> **함께 진행**: shadcn/ui 테마 페이지에서 마음에 드는 색상을 선택하고, `globals.css`에 붙여넣어 테마를 변경한다.

---

## 7.5 디자인 프롬프트 전략 -- AI에게 "우리 디자인"을 가르치기

### 7.5.1 디자인 토큰이란: 색상, 타이포그래피, 간격의 체계화

**디자인 토큰**(Design Token)은 색상, 폰트, 간격 등 디자인 규칙을 변수로 정리한 것이다. 쉽게 말해서 **"우리 앱의 디자인 규칙집"**이다.

디자인 토큰이 없으면:
- AI가 매번 다른 색상을 사용한다 (`blue-500`, `indigo-600`, `sky-400`...)
- 페이지마다 간격이 다르다 (`p-4`, `p-6`, `p-8`...)
- 일관성 없는 UI가 만들어진다

디자인 토큰이 있으면:
- AI가 **정해진 색상만** 사용한다 (primary, secondary, accent)
- 모든 페이지에서 **동일한 간격 규칙**을 따른다
- 일관된 UI가 유지된다

### 7.5.2 copilot-instructions.md에 디자인 규칙 추가하기

2장에서 작성한 `.github/copilot-instructions.md`에 **Design Tokens** 섹션을 추가한다:

```markdown
## Design Tokens
- Primary color: shadcn/ui --primary (어두운 파란색 계열)
- Background: --background (흰색)
- Card: shadcn/ui Card 컴포넌트 사용 (rounded-lg shadow-sm)
- Spacing: 컨텐츠 간격 space-y-6, 카드 내부 p-6
- Max width: max-w-4xl mx-auto (메인 컨텐츠)
- 반응형: md 이상 2열 그리드, 모바일 1열

## Component Rules
- UI 컴포넌트는 shadcn/ui 사용 (components/ui/)
- Button, Card, Input, Dialog 등 shadcn/ui 컴포넌트 우선
- 커스텀 컴포넌트는 components/ 루트에 배치
- Tailwind 기본 컬러 직접 사용 금지 → CSS 변수(디자인 토큰) 사용
```

<!-- COPILOT_VERIFY: copilot-instructions.md에 Design Tokens 추가 전/후 Copilot 응답 차이를 확인해주세요 -->

### 7.5.2a Agent Skills로 디자인 규칙 강화하기

Ch2에서 Agent Skills의 개념을 배웠다. copilot-instructions.md는 모든 프롬프트에 적용되지만, **디자인 관련 작업일 때만** 더 강한 규칙을 적용하고 싶다면 Agent Skills를 사용한다.

`.github/skills/design-system/SKILL.md`를 생성한다:

```markdown
---
name: Design System
description: shadcn/ui 디자인 토큰과 컴포넌트 규칙을 강제합니다.
when: "디자인", "UI", "컴포넌트", "스타일", "색상", "tailwind", "card", "button" 키워드 포함 시
---

## 규칙
1. Tailwind 색상 직접 사용 금지 → CSS 변수(--primary, --secondary 등) 사용
2. UI 컴포넌트는 반드시 shadcn/ui(components/ui/) 우선 사용
3. 반응형 필수: md 이상 2열, 모바일 1열
4. 간격: 컨텐츠 간 space-y-6, 카드 내부 p-6
5. 최대 너비: max-w-4xl mx-auto (메인 컨텐츠)
6. 이미지에 alt 속성 필수

## 사용 가능한 shadcn/ui 컴포넌트
Button, Card, Input, Dialog, Avatar, Badge
```

<!-- COPILOT_VERIFY: design-system Skill 적용 전/후 UI 코드 생성 결과를 비교해주세요 -->

### 7.5.2b 참고 -- 디자인 특화 MCP 서버

> 이 절은 **참고 사항**이다. 수업에서는 다루지 않지만, 디자인 워크플로우를 더 고도화하고 싶은 학생을 위한 정보이다.

**표 7.8** 디자인 특화 MCP 서버 (참고용)

| MCP 서버 | 용도 | 활용 시나리오 |
|----------|------|-------------|
| **Figma MCP** | Figma 디자인 파일을 코드로 변환 | 디자이너가 만든 시안을 React+Tailwind로 자동 변환 |
| **21st.dev Magic MCP** | AI 컴포넌트 즉시 생성 | 프롬프트만으로 완성도 높은 UI 컴포넌트 생성 |
| **Playwright MCP** | 브라우저에서 UI 자동 테스트 | 반응형 레이아웃이 모든 화면 크기에서 올바른지 자동 검증 |
| **Context7 MCP** | shadcn/ui, Tailwind 최신 문서 참조 | AI가 최신 버전 API를 정확히 사용하도록 보장 |

### 7.5.3 효과적인 디자인 프롬프트 5가지 전략

**표 7.9** 디자인 프롬프트 5가지 전략

| # | 전략 | 설명 | 예시 |
|:-:|------|------|------|
| 1 | **레퍼런스 제시** | 참고할 UI/사이트 이름을 명시한다 | "Notion 스타일의 사이드바" |
| 2 | **제약 조건 명시** | 사용할 컴포넌트, 색상 등을 제한한다 | "shadcn/ui Card만 사용, primary 색상 위주" |
| 3 | **반복 다듬기** | 한 번에 완성하지 않고 단계적으로 수정한다 | "간격을 더 넓게" -> "폰트를 키워줘" |
| 4 | **부정 프롬프트** | 하지 말아야 할 것을 명시한다 | "그라디언트 사용 금지, 그림자 최소화" |
| 5 | **역할 부여** | AI에게 디자인 역할을 지정한다 | "미니멀리스트 UI 디자이너로서 답변해줘" |

### 7.5.4 좋은 디자인 프롬프트 vs 나쁜 디자인 프롬프트

**표 7.10** 좋은 vs 나쁜 디자인 프롬프트

| 항목 | 나쁜 프롬프트 | 좋은 프롬프트 |
|------|-------------|-------------|
| 색상 | "예쁜 색으로 해줘" | "shadcn/ui 디자인 토큰 사용, primary 버튼은 --primary, 배경은 --background" |
| 레이아웃 | "깔끔하게 배치해줘" | "2열 그리드(md:grid-cols-2), gap-6, max-w-4xl mx-auto" |
| 컴포넌트 | "카드로 만들어줘" | "shadcn/ui Card 사용, CardHeader에 제목+Badge, CardContent에 본문, CardFooter에 작성일+작성자" |
| 반응형 | "모바일에서도 보이게" | "md 이상 2열, sm 이하 1열 스택. 네비게이션은 모바일에서 햄버거 메뉴" |

---

## 7.6 설계서를 AI 컨텍스트로 통합하기

### 7.6.1 데이터 모델 설계: 테이블 구조 미리 잡기 (Supabase 대비)

다음 장(Ch8)에서 Supabase 데이터베이스를 연결한다. 그때 테이블을 만들려면 **어떤 데이터가 필요한지** 지금 정리해야 한다.

게시판 앱의 데이터 모델:

```
users (사용자)
├── id: UUID (자동 생성)
├── email: 이메일
├── name: 이름
└── avatar_url: 프로필 이미지 URL

posts (게시글)
├── id: UUID (자동 생성)
├── title: 제목
├── content: 본문
├── author_id: 작성자 (→ users.id)
└── created_at: 작성일시 (자동 생성)
```

**테이블 관계**: 한 명의 사용자(users)가 여러 개의 게시글(posts)을 작성할 수 있다 -> **1:N 관계**. `posts.author_id`가 `users.id`를 참조한다.

### 7.6.2 ARCHITECTURE.md 작성: 페이지 맵 + 컴포넌트 계층 + 데이터 모델

설계 내용을 하나의 문서로 정리한다. 프로젝트 루트에 `ARCHITECTURE.md`를 생성한다:

```markdown
# Architecture

## Page Map
- / — 홈 (게시글 목록)
- /posts/[id] — 게시글 상세
- /posts/new — 게시글 작성
- /login — 로그인
- /profile — 프로필

## User Flow
- 글 읽기: 홈 → 카드 클릭 → 상세 페이지
- 글 쓰기: 홈 → 글쓰기 버튼 → (로그인 필요 시 리다이렉트) → 작성 → 제출 → 상세
- 글 수정: 상세 → 수정 버튼 (작성자만 표시) → 수정 → 제출 → 상세

## Component Hierarchy
Layout
├── Header (네비게이션: 로고, 글쓰기, 로그인/프로필)
├── Main
│   ├── PostList (게시글 카드 목록)
│   ├── PostDetail (게시글 상세)
│   ├── PostForm (게시글 작성/수정 폼)
│   ├── LoginPage (로그인)
│   └── ProfilePage (프로필 + 내 게시글)
└── Footer

## Data Model
- users: id, email, name, avatar_url
- posts: id, title, content, author_id (→ users.id), created_at

## Design Tokens
- Primary: shadcn/ui --primary
- Background: --background
- Components: shadcn/ui (Button, Card, Input, Dialog, Avatar, Badge)
- Layout: max-w-4xl mx-auto, space-y-6
- Responsive: md:grid-cols-2, 모바일 1열
```

### 7.6.3 AI 생성 디자인 검증 체크리스트

**표 7.11** AI 디자인 검증 체크리스트

| # | 검증 항목 | 확인 내용 | 확인 방법 |
|:-:|-----------|----------|-----------|
| 1 | **반응형** | 모바일(375px), 태블릿(768px), 데스크톱(1280px)에서 깨지지 않는가? | DevTools -> 반응형 모드 (Ctrl+Shift+M) |
| 2 | **접근성** | 이미지에 alt, 버튼에 의미 있는 텍스트, 충분한 색상 대비가 있는가? | Lighthouse -> 접근성 점수 |
| 3 | **일관성** | 모든 페이지에서 동일한 디자인 토큰을 사용하는가? | 육안 비교 |
| 4 | **컴포넌트** | shadcn/ui 컴포넌트를 올바르게 import하고 사용했는가? | `@/components/ui/` 경로 확인 |
| 5 | **네비게이션** | 모든 페이지 간 이동이 페이지 맵과 일치하는가? | 직접 클릭하며 테스트 |
| 6 | **코드 구조** | 컴포넌트가 ARCHITECTURE.md의 계층과 일치하는가? | 파일 구조 비교 |

### 7.6.4 @workspace + 설계 문서로 Copilot에게 코드 생성 지시하기

ARCHITECTURE.md와 copilot-instructions.md가 준비되었으면, Copilot에게 설계 기반으로 코드를 생성하도록 지시한다:

> **Copilot 프롬프트**
> "@workspace ARCHITECTURE.md의 Page Map과 Component Hierarchy를 참고해서,
> app/posts/page.js에 게시글 목록 페이지를 만들어줘.
> PostList 컴포넌트는 shadcn/ui Card를 사용하고,
> 디자인 토큰은 copilot-instructions.md의 Design Tokens 섹션을 따라줘."

<!-- COPILOT_VERIFY: @workspace로 ARCHITECTURE.md를 참조하여 코드 생성이 설계와 일치하는지 확인해주세요 -->

핵심은 **"@workspace"를 붙이는 것**이다. 이 한 단어가 Copilot에게 프로젝트 전체 파일을 탐색하도록 지시한다.

---

### AI가 자주 틀리는 디자인 패턴

**표 7.12** AI가 자주 틀리는 디자인 패턴

| AI 실수 | 올바른 방법 | 이유 |
|---------|-----------|------|
| Tailwind 색상 직접 사용 (`bg-blue-500`) | 디자인 토큰 사용 (`bg-primary`) | 테마 변경 시 전체 수정 필요 |
| 반응형 클래스 누락 | `md:grid-cols-2` 등 브레이크포인트 지정 | 모바일에서 레이아웃 깨짐 |
| shadcn/ui import 경로 오류 | `@/components/ui/button` 실제 경로 확인 | 환각 -- 존재하지 않는 경로 |
| 이미지에 `alt` 속성 누락 | `<img alt="설명" />` 필수 | 접근성 위반 |
| 하드코딩된 색상값, 간격 | CSS 변수 또는 Tailwind 유틸리티 사용 | 디자인 토큰과 불일치 |
| 불필요한 `"use client"` 추가 | Server Component가 기본 -- 필요할 때만 추가 | Ch6에서 배운 원칙 위반 |

---

## 핵심 정리 + B회차 과제 스펙

### 이번 시간 핵심 3가지

1. **AI 슬롭** 방지: 설계서를 먼저 작성하고 AI에게 제공하면 의도에 맞는 결과물이 나온다
2. **shadcn/ui**: 코드를 프로젝트에 복사하는 컴포넌트 라이브러리 + CSS 변수로 테마 커스터마이징
3. **설계서 = AI 컨텍스트**: ARCHITECTURE.md + copilot-instructions.md가 Copilot의 프로젝트 이해도를 높인다

### B회차 과제 스펙

**과제 내용**: 기말 프로젝트로 만들 **개인 앱의 설계서**를 작성한다.

주제는 자유이지만, **게시판 앱의 변형**을 권장한다 (예: 맛집 리뷰 게시판, 독서 기록 앱, 동아리 공지 게시판 등). Ch8~12에서 배울 Supabase CRUD, 인증, RLS를 활용할 수 있는 구조여야 한다.

**제출물**:
1. 페이지 맵 (최소 4페이지, URL 구조 포함)
2. AI 와이어프레임 (Copilot Vision 또는 v0로 생성, 2장 이상)
3. shadcn/ui 테마 (npx shadcn init 완료 + 색상 커스터마이징)
4. 데이터 모델 (테이블 2개 이상 + 관계 정의)
5. copilot-instructions.md (Design Tokens + Component Rules 섹션 포함)
6. ARCHITECTURE.md (페이지 맵 + 컴포넌트 계층 + 데이터 모델 통합)

**스타터 코드**: `practice/chapter7/starter/` -- 설계서 템플릿 파일들 (ARCHITECTURE.md 템플릿, copilot-instructions.md 템플릿)

---

## Exit ticket

다음 중 "AI 슬롭"을 방지하는 가장 효과적인 방법은?
- (A) 더 좋은 AI 모델을 사용한다
- (B) 설계서(ARCHITECTURE.md, copilot-instructions.md)를 작성하여 AI에게 구체적인 컨텍스트를 제공한다
- (C) AI를 사용하지 않고 직접 코딩한다

정답: (B) -- AI의 품질은 컨텍스트에 비례한다. 설계서가 구체적일수록 AI 출력이 의도에 부합한다.

---

## 교수 메모

**준비물 체크리스트**:
- [ ] tldraw Make Real 시연용 프로젝트 (makereal.tldraw.com 접속 확인)
- [ ] v0.dev 계정 로그인 확인 (무료 생성 횟수 남아있는지)
- [ ] shadcn/ui 초기화된 Next.js 프로젝트 (학생 설치 실패 시 대비)
- [ ] 종이/화이트보드 마커 준비 (와이어프레임 스케치용)
- [ ] 설계 잘 된 예시 프로젝트 1개 (사전 준비, 시연용)
- [ ] "설계 없이 만든 예시" vs "설계 후 만든 예시" 스크린샷 (동기부여용)
- [ ] B회차 스타터 코드 준비 (`practice/chapter7/starter/`)

**수업 후 체크**:
- [ ] 학생들이 "AI 슬롭" 개념을 이해했는가
- [ ] shadcn/ui 초기화 과정을 이해했는가
- [ ] 디자인 토큰과 copilot-instructions.md의 관계를 이해했는가

# Chapter 3. HTML 시맨틱과 Tailwind CSS — B회차: 실습

> **미션**: 게시판 메인 페이지를 Copilot과 함께 만들고 배포한다

---

## 수업 타임라인

**표 3.13** B회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | A회차 핵심 리캡 + 과제 스펙 확인 |
| 00:05~00:10 | 바이브코딩 가이드 + 스타터 코드 안내 |
| 00:10~00:25 | 체크포인트 1: HTML 뼈대 + 시맨틱 태그 |
| 00:25~00:45 | 체크포인트 2: Tailwind 스타일링 + 반응형 |
| 00:45~01:00 | 체크포인트 3: 검증 + 배포 |
| 01:00~01:05 | Google Classroom 제출 |
| 01:05~01:25 | 결과 공유 + 코드리뷰 토론 |
| 01:25~01:30 | 교수 종합 피드백 + 다음 주 예고 |

---

## 과제 스펙 + 스타터 코드 안내

### 과제 요구사항

**게시판 메인 페이지**를 만든다:

① 내비게이션 바 — 사이트 제목 + 메뉴 링크 (홈, 로그인)
② 게시글 목록 — 카드 형태, 최소 3개의 더미 게시글 (제목, 내용 미리보기, 작성자, 날짜)
③ 반응형 — 모바일 1열, 태블릿/데스크톱 2열 이상
④ 시맨틱 태그 — header, nav, main, article, footer 사용
⑤ Tailwind CSS — 유틸리티 클래스로 스타일링

### 스타터 코드

`practice/chapter3/starter/` 폴더에 A회차 시연 결과물이 준비되어 있다.

```
practice/chapter3/starter/
├── app/
│   ├── layout.js       ← 공통 레이아웃 (Tailwind 설정 완료)
│   ├── page.js         ← 메인 페이지 (기본 뼈대만 있음)
│   └── globals.css     ← Tailwind 기본 import
├── package.json        ← 의존성 (버전 고정)
├── tailwind.config.js
└── next.config.js
```

**시작 방법** (PowerShell 기준):
```bash
cd practice/chapter3/starter
npm install
npm run dev
```
macOS Terminal도 동일하다.

브라우저에서 http://localhost:3000 을 열어 기본 페이지가 보이는지 확인한다.

---

## 바이브코딩 가이드

> **Copilot 활용**: 이번 실습에서는 Copilot Chat에 프롬프트를 입력하여 게시판 UI를 생성한다. 생성된 코드를 그대로 쓰지 말고, A회차에서 배운 기준으로 반드시 검증한다.

**좋은 프롬프트 vs 나쁜 프롬프트**:

❌ 나쁜 프롬프트:
> "게시판 페이지 만들어줘"

문제: 어떤 구조인지, 어떤 스타일인지, 어떤 태그를 써야 하는지 전혀 알려주지 않았다.

✅ 좋은 프롬프트:

> **Copilot 프롬프트**
> "Next.js App Router의 app/page.js에 게시판 메인 페이지를 만들어줘.
> 구조: header(nav 포함) → main(게시글 카드 목록) → footer.
> 시맨틱 태그 사용 (header, nav, main, article, footer).
> Tailwind CSS로 스타일링.
> 게시글 카드: 제목, 내용 미리보기, 작성자, 날짜 포함.
> 반응형: 모바일 grid-cols-1, md:grid-cols-2.
> 더미 게시글 3개 포함."

<!-- COPILOT_VERIFY: 위 프롬프트를 Copilot Chat에 입력하고 생성 결과를 캡처해주세요 -->

---

## 개인 실습

### 체크포인트 1: HTML 뼈대 + 시맨틱 태그 (15분)

**목표**: 페이지의 시맨틱 구조를 완성한다.

① Copilot Chat에 프롬프트를 입력하여 게시판 코드를 생성한다
② 생성된 코드를 `app/page.js`에 붙여넣는다
③ **시맨틱 태그 확인**: header, nav, main, article, footer가 모두 있는지 검사한다
④ **heading 계층 확인**: h1 → h2 → h3 순서가 맞는지 검사한다
⑤ 문제가 있으면 직접 수정하거나 Copilot에게 수정을 요청한다

> **강의 팁**: 순회하며 학생들이 시맨틱 태그를 제대로 검증하고 있는지 확인한다. `<div>` 범벅인 코드를 받은 학생이 있으면 "시맨틱 태그로 바꿔줘"라고 Copilot에게 추가 요청하도록 안내한다.

### 체크포인트 2: Tailwind 스타일링 + 반응형 (20분)

**목표**: 보기 좋은 카드 레이아웃 + 반응형을 완성한다.

① 카드에 Tailwind 클래스를 추가한다 (bg-white, rounded-lg, shadow, p-6 등)
② Grid 반응형을 적용한다 (grid-cols-1 md:grid-cols-2)
③ 내비게이션 바에 Flexbox를 적용한다 (flex justify-between items-center)
④ hover 효과를 추가한다 (hover:shadow-lg transition)
⑤ DevTools 디바이스 모드(Ctrl+Shift+M, macOS: Cmd+Shift+M)로 반응형을 확인한다

Copilot에게 스타일 개선을 요청할 때:

> **Copilot 프롬프트**
> "이 게시글 카드에 hover 시 그림자가 커지는 효과와 부드러운 전환을 추가해줘. Tailwind CSS 사용."

### 체크포인트 3: 검증 + 배포 (15분)

**목표**: AI 코드를 검증하고 배포한다.

① 아래 검증 체크리스트를 수행한다
② 문제가 있으면 수정한다
③ git add → git commit → git push 로 배포한다:
```bash
git add .
git commit -m "Ch3: 게시판 메인 페이지 구현"
git push
```
④ Vercel 대시보드에서 배포 완료를 확인한다
⑤ 배포된 URL을 브라우저에서 열어 동작을 확인한다
⑥ 모바일/데스크톱 모두에서 레이아웃이 올바른지 확인한다

---

## 검증 체크리스트

**표 3.14** AI 코드 검증 체크리스트

| 항목 | 확인 |
|------|------|
| 시맨틱 태그를 사용했는가? (header, nav, main, article, footer) | ☐ |
| heading 계층이 올바른가? (h1 → h2 → h3 순서) | ☐ |
| 반응형 클래스가 있는가? (md:grid-cols-2 등) | ☐ |
| JSX에서 `className`을 사용했는가? (`class` 아님) | ☐ |
| JSX에서 `htmlFor`를 사용했는가? (`for` 아님, 폼이 있는 경우) | ☐ |
| 배포 URL에서 정상 동작하는가? | ☐ |
| 모바일에서 레이아웃이 깨지지 않는가? | ☐ |

---

## 흔한 AI 실수

**표 3.15** Ch3에서 AI가 자주 틀리는 패턴

| AI 실수 | 올바른 코드 | 발생 원인 |
|---------|-----------|----------|
| `<div>` 범벅 (시맨틱 태그 미사용) | `<header>`, `<main>`, `<article>` 등 | AI가 구조보다 스타일에 집중 |
| `class="..."` | `className="..."` | 순수 HTML 학습 데이터의 영향 |
| `for="..."` | `htmlFor="..."` | 순수 HTML 학습 데이터의 영향 |
| h1 → h3 (h2 건너뜀) | h1 → h2 → h3 | 시각적 크기만 맞추려 함 |
| 반응형 미적용 (고정 너비) | `grid-cols-1 md:grid-cols-2` | 데스크톱 기준으로 생성 |
| Tailwind 3 문법 사용 | Tailwind 4 문법 확인 | AI 학습 시점의 버전 차이 |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch3 과제"에 아래 두 항목을 제출한다:

```
① 배포 URL
   예: https://내프로젝트.vercel.app

② AI가 틀린 부분 1개
   예: "Copilot이 모든 태그를 <div>로 생성했는데,
       <header>, <main>, <article>로 수정했다."
```

---

## 코드리뷰 토론 가이드

> **토론 가이드**: 2-3명이 자발적으로 화면을 공유하며 결과를 발표한다.

**발표 포인트** (1인당 3-5분):
1. 배포된 URL을 브라우저에 띄운다
2. 모바일/데스크톱 반응형이 동작하는지 보여준다
3. Copilot이 틀린 부분과 어떻게 수정했는지 설명한다

**토론 질문**:
- "같은 프롬프트인데 다른 결과가 나왔다면, 왜 그런가?"
- "시맨틱 태그를 쓴 것과 div만 쓴 것의 차이를 느꼈는가?"
- "Copilot이 반응형을 자동으로 적용했는가, 아니면 별도로 요청해야 했는가?"

---

## 교수 피드백 포인트

**확인할 것**:
- 시맨틱 태그 사용 여부 — `<div>` 범벅이면 프롬프트에 "시맨틱 태그 사용"을 명시하도록 안내
- 반응형 동작 — DevTools로 확인시켜보기
- `class` vs `className` — JSX 실수가 가장 흔함

**우수 사례 공유**:
- 잘 만든 페이지 1-2개를 화면에 띄워 동기부여

**다음 주 예고**:
> 다음 주에는 **JavaScript 핵심**을 배운다. 지금은 정적인 게시판이지만, JavaScript를 배우면 버튼 클릭, 검색, API 데이터 연동 등 동적 기능을 추가할 수 있다.

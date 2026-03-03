# Chapter 5. Next.js 기초 — B회차: 실습

> **미션**: 게시글 목록/상세/작성 페이지를 구현하고 배포한다

---

## 수업 타임라인

**표 5.7** B회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | A회차 핵심 리캡 + 과제 스펙 확인 |
| 00:05~00:10 | 바이브코딩 가이드 + 스타터 코드 안내 |
| 00:10~00:25 | 체크포인트 1: 목록 페이지 + 더미 데이터 |
| 00:25~00:45 | 체크포인트 2: 상세 + 작성 페이지 |
| 00:45~01:00 | 체크포인트 3: 검증 + 배포 |
| 01:00~01:05 | Google Classroom 제출 |
| 01:05~01:25 | 결과 공유 + 코드리뷰 토론 |
| 01:25~01:30 | 교수 종합 피드백 + 다음 주 예고 |

---

## 과제 스펙 + 스타터 코드 안내

### 과제 요구사항

**게시판 3페이지**를 만든다:

① 목록 페이지 (`/posts`) — 더미 게시글 카드 리스트, 카드 클릭 시 상세 페이지로 이동
② 상세 페이지 (`/posts/[id]`) — 해당 게시글의 제목, 내용, 작성자, 날짜 표시 + 목록으로 돌아가기 링크
③ 작성 페이지 (`/posts/new`) — 제목(input) + 내용(textarea) 폼, 제출 시 alert + 목록으로 이동
④ 공통 레이아웃 — 내비게이션 바에 홈, 게시판, 새 글 쓰기 링크
⑤ Vercel 배포

### 스타터 코드

`practice/chapter5/starter/` 폴더에 기본 구조가 준비되어 있다.

```
practice/chapter5/starter/
├── app/
│   ├── layout.js       ← 공통 레이아웃 (네비 뼈대)
│   ├── page.js         ← 홈 페이지 (게시판 안내)
│   ├── globals.css     ← Tailwind 기본 import
│   └── posts/
│       ├── page.js     ← 목록 페이지 (뼈대만 있음)
│       ├── new/
│       │   └── page.js ← 작성 페이지 (빈 파일)
│       └── [id]/
│           └── page.js ← 상세 페이지 (빈 파일)
├── lib/
│   └── posts.js        ← 더미 게시글 데이터 (3개)
├── components/         ← (비어있음 — NavLink 등 생성용)
├── package.json        ← 의존성 (버전 고정)
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

**시작 방법** (PowerShell 기준):
```bash
cd practice/chapter5/starter
npm install
npm run dev
```
macOS Terminal도 동일하다.

브라우저에서 http://localhost:3000 을 열어 기본 페이지가 보이는지 확인한다.

---

## 바이브코딩 가이드

> **Copilot 활용**: 이번 실습에서는 Copilot Chat에 프롬프트를 입력하여 3개의 페이지를 구현한다. 생성된 코드를 그대로 쓰지 말고, A회차에서 배운 기준으로 반드시 검증한다.

### Skills 활용 가이드 (권장)

- `nextjs-basic-check`: App Router 경로, `next/navigation` import, `"use client"` 위치를 점검한다.
- 사용 시점: 목록/상세/작성 페이지를 만든 직후.
- 점검 프롬프트 예시: `nextjs-basic-check 기준으로 라우팅 구조와 import 오류를 점검해줘.`

**좋은 프롬프트 vs 나쁜 프롬프트**:

❌ 나쁜 프롬프트:
> "게시판 만들어줘"

문제: 몇 개의 페이지인지, 어떤 데이터를 쓰는지, 어떤 라우팅 구조인지 전혀 알려주지 않았다. AI가 Pages Router(구버전)로 만들거나, 하나의 페이지에 모든 기능을 넣을 수 있다.

✅ 좋은 프롬프트:


> [버전 고정] Next.js 14.2.21, React 18.3.1, Tailwind CSS 3.4.17, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2 기준으로 작성해줘.
> [규칙] App Router만 사용하고 next/router, pages router, 구버전 API는 사용하지 마.
> [검증] 불확실하면 현재 프로젝트 package.json 기준으로 버전을 먼저 확인하고 답해줘.
> "app/posts/page.js를 만들어줘. lib/posts.js에서 posts 배열을 import하고,
> 게시글 목록을 카드 형태로 표시해줘. 각 카드를 클릭하면 /posts/[id]로 이동.
> next/link의 Link 컴포넌트 사용. Tailwind CSS 스타일링.
> Next.js 14 App Router."

<!-- COPILOT_VERIFY: 위 프롬프트를 Copilot Chat에 입력하고 생성 결과를 캡처해주세요 -->

---

## 개인 실습

### 체크포인트 1: 목록 페이지 + 더미 데이터 (15분)

**목표**: 목록 페이지에서 더미 게시글을 카드로 표시하고, 클릭하면 상세 페이지로 이동한다.

① `lib/posts.js`의 더미 데이터를 확인한다 (3개 게시글)
② Copilot Chat에 프롬프트를 입력하여 목록 페이지 코드를 생성한다
③ 생성된 코드를 `app/posts/page.js`에 붙여넣는다
④ **Link 사용 확인**: `<a>` 태그가 아닌 `<Link>`를 사용했는지 검사한다
⑤ **key 속성 확인**: `map()` 안에 `key={post.id}`가 있는지 검사한다
⑥ **import 경로 확인**: `lib/posts.js`에서 올바르게 import했는지 검사한다

> **강의 팁**: 순회하며 학생들이 Link 컴포넌트를 올바르게 사용하고 있는지 확인한다. `<a href>` 태그를 쓴 학생이 있으면 "Next.js에서는 Link를 사용한다"고 안내한다.

### 체크포인트 2: 상세 + 작성 페이지 (20분)

**목표**: 상세 페이지와 작성 페이지를 구현한다.

**상세 페이지**:


> [버전 고정] Next.js 14.2.21, React 18.3.1, Tailwind CSS 3.4.17, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2 기준으로 작성해줘.
> [규칙] App Router만 사용하고 next/router, pages router, 구버전 API는 사용하지 마.
> [검증] 불확실하면 현재 프로젝트 package.json 기준으로 버전을 먼저 확인하고 답해줘.
> "app/posts/[id]/page.js를 만들어줘. Next.js 14 App Router이므로 params는 Promise — await로 id 추출. lib/posts.js에서 해당 id의 게시글을 find로 찾아 표시. 없으면 next/navigation의 notFound() 호출. 목록으로 돌아가기 Link 포함. Tailwind CSS 사용."

① 생성된 코드에서 `await params` 패턴을 사용했는지 확인한다
② `find()`로 해당 id의 게시글을 찾는지 확인한다
③ 목록으로 돌아가는 Link가 있는지 확인한다

**작성 페이지**:


> [버전 고정] Next.js 14.2.21, React 18.3.1, Tailwind CSS 3.4.17, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2 기준으로 작성해줘.
> [규칙] App Router만 사용하고 next/router, pages router, 구버전 API는 사용하지 마.
> [검증] 불확실하면 현재 프로젝트 package.json 기준으로 버전을 먼저 확인하고 답해줘.
> "app/posts/new/page.js를 만들어줘. 제목(input)과 내용(textarea) 입력 폼. 아직 백엔드가 없으므로 제출 시 alert('저장되었습니다')만 표시하고 /posts로 이동. useRouter 사용. 'use client' 필수. Next.js 14 App Router, Tailwind CSS."

④ `"use client"` 지시어가 있는지 확인한다
⑤ `useRouter`를 `next/navigation`에서 import했는지 확인한다

**레이아웃 업데이트**:

⑥ `app/layout.js`의 내비게이션 바에 홈(`/`), 게시판(`/posts`), 새 글 쓰기(`/posts/new`) 링크를 추가한다

<!-- COPILOT_VERIFY: 상세 페이지에서 params를 await하는지, 작성 페이지에서 useRouter를 next/navigation에서 import하는지 확인해주세요 -->

### 체크포인트 3: 검증 + 배포 (15분)

**목표**: AI 코드를 검증하고 배포한다.

① 아래 검증 체크리스트를 수행한다
② 문제가 있으면 수정한다
③ 전체 흐름 테스트: `/posts` 목록 → 카드 클릭 → `/posts/1` 상세 → 목록으로 돌아가기 → `/posts/new` 작성 → 제출 → 목록으로 이동
④ git add → git commit → git push 로 배포한다:
```bash
git add .
git commit -m "Ch5: 게시판 목록/상세/작성 페이지"
git push
```
⑤ Vercel 대시보드에서 배포 완료를 확인한다
⑥ 배포된 URL에서 3페이지 모두 동작하는지 확인한다

---

## 검증 체크리스트

**표 5.8** AI 생성 코드 검증 체크리스트

| 항목 | 확인 |
|------|------|
| App Router 구조인가? (`app/posts/page.js`, `app/posts/[id]/page.js`, `app/posts/new/page.js`) | ☐ |
| 모든 페이지가 `export default function`인가? | ☐ |
| `[id]/page.js`에서 `const { id } = await params`를 사용하는가? | ☐ |
| Link import가 `next/link`인가? (`next/router` 아님) | ☐ |
| useRouter import가 `next/navigation`인가? (`next/router` 아님) | ☐ |
| `useState`/`useRouter` 사용 파일에 `"use client"` 있는가? | ☐ |
| `map()` 렌더링에 `key` 속성이 있는가? | ☐ |
| `class` 대신 `className`을 사용하는가? | ☐ |
| 배포 URL에서 3페이지 모두 동작하는가? | ☐ |

---

## 흔한 AI 실수

**표 5.9** Ch5에서 AI가 자주 틀리는 패턴

| AI 실수 | 올바른 방법 | 발생 원인 |
|---------|------------|----------|
| `import { useRouter } from "next/router"` | `from "next/navigation"` | Pages Router 학습 데이터 |
| `const { id } = params` (await 없음) | `const { id } = await params` | Next.js 15 변경사항 미반영 |
| `<a href="/posts">` 내부 링크 | `<Link href="/posts">` | HTML 기본 태그로 대체 |
| `class="btn"` in JSX | `className="btn"` | HTML과 JSX 혼동 |
| `pages/` 폴더 구조 | `app/` 폴더 구조 | Pages Router(구버전) 패턴 |
| `getServerSideProps` 사용 | Server Component에서 직접 fetch | Pages Router 데이터 페칭 |
| `"use client"` 누락 | useRouter 사용 시 필수 | Server Component 기본 미인지 |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch5 과제"에 아래 두 항목을 제출한다:

```
① 배포 URL
   예: https://내프로젝트.vercel.app

② AI가 틀린 부분 1개
   예: "Copilot이 useRouter를 next/router에서 import했는데,
       next/navigation으로 수정했다."
```

---

## 코드리뷰 토론 가이드

> **토론 가이드**: 2-3명이 자발적으로 화면을 공유하며 결과를 발표한다.

**발표 포인트** (1인당 3-5분):
1. 배포된 URL을 브라우저에 띄운다
2. 목록 → 상세 → 작성 페이지 흐름을 시연한다
3. Copilot이 틀린 부분과 어떻게 수정했는지 설명한다

**토론 질문**:
- "params를 await하지 않았을 때 어떤 에러가 나왔는가?"
- "`<a>` 태그 대신 Link를 써야 하는 이유를 체감했는가? 차이가 있었는가?"
- "작성 페이지에서 `"use client"`를 빼면 어떤 에러가 나는가?"
- "Copilot이 Pages Router(`pages/`) 구조로 생성한 경우가 있었는가?"

---

## 교수 피드백 포인트

**확인할 것**:
- App Router 구조 사용 여부 — `pages/` 폴더가 아닌 `app/` 폴더인지 확인
- Link 컴포넌트 사용 여부 — `<a>` 태그 대신 Link 사용
- params await 여부 — 동적 라우트에서 가장 흔한 실수
- `"use client"` 적절한 사용 — 필요한 파일에만 붙였는지

**우수 사례 공유**:
- 잘 만든 페이지 1-2개를 화면에 띄워 동기부여

**다음 주 예고**:
> 다음 주에는 **상태 관리와 데이터 페칭**을 배운다. 지금까지는 정적 데이터를 표시만 했지만, 다음 주에는 검색, 좋아요, 폼 입력 같은 사용자 인터랙션을 처리한다. `useState`, `useEffect`, Server/Client Component의 차이를 배우고 게시판 프론트엔드를 완성한다.


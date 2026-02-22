# Chapter 5. Next.js 기초

> **미션**: 여러 페이지를 가진 게시판 앱을 만든다

---

## 학습목표

1. React의 컴포넌트, JSX, Props 개념을 이해하고 AI 생성 코드에서 식별할 수 있다
2. Next.js App Router의 파일 기반 라우팅 구조를 설명할 수 있다
3. 동적 라우트를 구현하여 게시글 상세 페이지를 만들 수 있다
4. Link 컴포넌트와 useRouter로 페이지 간 내비게이션을 구현할 수 있다
5. Copilot에게 페이지 구현을 지시하고 생성된 코드를 검증할 수 있다

---

## 수업 타임라인

| 시간 | 구분 | 내용 |
|------|------|------|
| 00:00~00:50 | **1교시** | React 핵심 개념 + App Router 구조 |
| 00:50~01:00 | 쉬는시간 | |
| 01:00~01:50 | **2교시** | 특수 파일 + 동적 라우트 + 내비게이션 |
| 01:50~02:00 | 쉬는시간 | |
| 02:00~02:50 | **3교시** | 게시판 페이지 구현 + 과제 제출 |

---

# 1교시: React 핵심 개념과 App Router

## 5.1 React의 핵심 개념

Ch1에서 `create-next-app`으로 만든 프로젝트는 **React**(리액트) 위에서 동작한다. Next.js는 React를 기반으로 라우팅, 서버 렌더링, 배포를 추가한 **프레임워크**(Framework)이다. React를 이해해야 Next.js 코드를 읽을 수 있다.

### 5.1.1 선언적 UI와 컴포넌트

React는 Facebook(현 Meta)이 만든 **UI 라이브러리**이다. 핵심 아이디어는 두 가지이다.

첫째, **선언적 UI**(Declarative UI): "어떻게 그리는가"가 아니라 "무엇을 그리는가"를 기술한다.

```javascript
// 명령적 (Vanilla JavaScript) — Ch4에서 배운 방식
const h1 = document.createElement("h1");
h1.textContent = "안녕하세요";
document.body.appendChild(h1);

// 선언적 (React) — "h1에 안녕하세요를 보여줘"
function Greeting() {
  return <h1>안녕하세요</h1>;
}
```

Ch4에서 DOM을 직접 조작한 방식은 **명령적**(Imperative)이다. 단계를 일일이 지시한다. React의 선언적 방식은 **결과만 기술**하면 React가 DOM을 알아서 업데이트한다.

둘째, **컴포넌트**(Component): UI를 재사용 가능한 **함수 단위**로 분리한다. 레고 블록처럼 조립하여 화면을 구성한다.

```jsx
// 하나의 컴포넌트 = 하나의 함수
function PostCard() {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold">게시글 제목</h2>
      <p className="text-gray-600">게시글 내용...</p>
    </div>
  );
}
```

> **강의 팁**: "레고 블록처럼 조립한다"는 비유가 효과적이다. PostCard 블록을 여러 개 쌓으면 게시판이 되고, NavBar 블록을 얹으면 완성된 페이지가 된다.

### 5.1.2 JSX 문법: 표현식, 조건부 렌더링, 리스트

**JSX**(JavaScript XML)는 JavaScript 안에서 HTML과 유사한 문법을 쓸 수 있게 하는 확장 문법이다. AI가 생성하는 React 코드를 읽을 때 가장 먼저 마주치는 것이 JSX이다.

**표 5.1** JSX 핵심 규칙

| 규칙 | HTML | JSX |
|------|------|-----|
| class 속성 | `class="btn"` | `className="btn"` |
| 스타일 | `style="color: red"` | `style={{ color: "red" }}` |
| 닫는 태그 | `<br>`, `<img>` | `<br />`, `<img />` |
| 이벤트 | `onclick="fn()"` | `onClick={fn}` |
| 최상위 요소 | 제한 없음 | **하나의 부모**로 감싸야 함 |

JSX 안에서 JavaScript 표현식은 **중괄호 `{}`**로 감싼다:

```jsx
function PostCard({ title, date }) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
  );
}
```

**조건부 렌더링** — 조건에 따라 다른 UI를 보여준다:

```jsx
function LoginButton({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <button className="px-4 py-2 bg-red-500 text-white rounded">로그아웃</button>
      ) : (
        <button className="px-4 py-2 bg-blue-500 text-white rounded">로그인</button>
      )}
    </div>
  );
}
```

**리스트 렌더링** — Ch4에서 배운 `map()`이 여기서 활약한다:

```jsx
function PostList({ posts }) {
  return (
    <ul className="space-y-2">
      {posts.map((post) => (
        <li key={post.id} className="p-3 border rounded">
          {post.title}
        </li>
      ))}
    </ul>
  );
}
```

리스트를 렌더링할 때 각 항목에 **`key`** 속성이 필수이다. React가 어떤 항목이 변경/추가/삭제되었는지 추적하는 데 사용한다. `key`가 없으면 콘솔에 경고가 나온다. 데이터의 고유한 `id`를 사용한다.

### 5.1.3 Props: 컴포넌트 간 데이터 전달

**Props**(Properties)는 부모 컴포넌트가 자식 컴포넌트에게 전달하는 데이터이다. 함수의 매개변수와 같다.

```jsx
// 부모가 title과 content를 전달
<PostCard title="첫 번째 글" content="안녕하세요" />

// 자식이 props로 받음 (구조 분해 할당)
function PostCard({ title, content }) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="font-bold">{title}</h2>
      <p>{content}</p>
    </div>
  );
}
```

Props는 **읽기 전용**이다. 자식 컴포넌트가 props를 직접 수정할 수 없다. 데이터를 변경하려면 Ch6에서 배우는 **상태**(State)를 사용한다.

> **Copilot 프롬프트**
> "PostCard 컴포넌트를 만들어줘. title(문자열), content(문자열), date(문자열), author(문자열)를 props로 받고, Tailwind CSS로 카드 형태로 스타일링해줘. Next.js 15 App Router 프로젝트."

<!-- COPILOT_VERIFY: 위 프롬프트로 Copilot이 생성하는 PostCard 컴포넌트의 props 처리 방식을 캡처해주세요 -->

**코드 읽기 포인트** — AI가 생성한 컴포넌트에서 확인할 것:
- `function 이름({ props })` 형태인가? (화살표 함수 `const 이름 = ({ props }) =>` 도 동일)
- props에 **구조 분해 할당**을 사용하는가?
- JSX에서 `{변수명}`으로 데이터를 표시하는가?
- `className`을 사용하는가? (`class`가 아닌지 확인)

---

## 5.2 Next.js App Router 구조

React만으로는 여러 페이지를 만들기 어렵다. **Next.js**가 파일 시스템 기반 **라우팅**(Routing)을 제공한다. 폴더를 만들면 URL이 된다.

### 5.2.1 app 디렉토리와 파일 기반 라우팅

Ch1에서 만든 프로젝트의 `app/` 폴더가 Next.js의 **App Router**이다. 이 폴더 안에 파일을 만들면 자동으로 URL이 생성된다.

**표 5.2** 파일 경로 → URL 매핑

| 파일 경로 | URL |
|-----------|-----|
| `app/page.js` | `/` |
| `app/about/page.js` | `/about` |
| `app/posts/page.js` | `/posts` |
| `app/posts/new/page.js` | `/posts/new` |
| `app/posts/[id]/page.js` | `/posts/1`, `/posts/2`, ... |

규칙은 단순하다:

1. `app/` 안에 **폴더**를 만든다 = URL 경로가 생긴다
2. 그 폴더 안에 **`page.js`**를 만든다 = 해당 경로의 페이지가 된다
3. `page.js`가 없는 폴더는 URL을 생성하지 않는다

> **라이브 코딩 시연**: 프로젝트에 `app/about/page.js`를 만들고 브라우저에서 `/about`에 접속하는 과정을 보여준다. "폴더를 만들면 페이지가 된다"를 직접 확인시킨다.

### 5.2.2 page.js — 페이지 정의

`page.js`는 해당 URL에서 보여줄 내용을 정의하는 파일이다. React 컴포넌트를 **`export default`**로 내보내면 된다:

```jsx
// app/posts/page.js — /posts URL의 페이지
export default function PostsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">게시판</h1>
      <p>게시글 목록이 여기에 표시됩니다.</p>
    </div>
  );
}
```

> **함께 진행**: 학생들과 함께 `app/posts/page.js`를 만들고 브라우저에서 `/posts`에 접속하여 확인한다.

**코드 읽기 포인트**:
- `export default function` — 페이지 컴포넌트는 반드시 **default export**
- 함수 이름은 관례적으로 `[경로명]Page` (예: PostsPage, AboutPage)
- 하나의 `page.js`에 하나의 default export 컴포넌트

### 5.2.3 layout.js — 공통 레이아웃

`layout.js`는 여러 페이지에 **공통으로 적용되는 구조**(내비게이션 바, 푸터 등)를 정의한다. `app/layout.js`는 모든 페이지에 적용되는 **루트 레이아웃**(Root Layout)이다:

```jsx
// app/layout.js — 모든 페이지에 적용
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <nav className="bg-gray-800 text-white p-4">
          <span className="font-bold">내 게시판</span>
        </nav>
        <main className="max-w-4xl mx-auto p-6">
          {children}
        </main>
        <footer className="text-center text-gray-500 py-4">
          © 2026
        </footer>
      </body>
    </html>
  );
}
```

`{children}`은 각 페이지의 내용이 들어가는 자리이다. 레이아웃이 "틀"이고, 페이지가 "내용"이다.

**표 5.3** Next.js 특수 파일 요약

| 파일 | 역할 | 적용 범위 |
|------|------|-----------|
| `page.js` | 해당 URL의 페이지 내용 | 해당 경로만 |
| `layout.js` | 공통 구조 (네비, 푸터) | 해당 경로 + 하위 모든 경로 |
| `loading.js` | 로딩 중 표시할 UI | 해당 경로 |
| `error.js` | 에러 발생 시 표시할 UI | 해당 경로 |
| `not-found.js` | 404 페이지 | 해당 경로 |

> **Copilot 프롬프트**
> "app/layout.js를 수정해줘. 상단에 내비게이션 바(홈, 게시판 링크 포함), 하단에 푸터를 추가하고, 본문은 max-w-4xl mx-auto로 중앙 정렬해줘. Next.js 15 App Router, Tailwind CSS 사용."

<!-- COPILOT_VERIFY: 위 프롬프트로 생성된 layout.js에서 Link import 경로와 html/body 구조가 올바른지 확인해주세요 -->

---

# ― 쉬는시간 ―

---

# 2교시: 특수 파일, 동적 라우트, 내비게이션

### 5.2.4 loading.js — 로딩 UI

`loading.js`를 만들면 해당 경로의 페이지가 로딩 중일 때 자동으로 표시된다:

```jsx
// app/posts/loading.js
export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
    </div>
  );
}
```

이 파일을 만들어 두면, `/posts` 페이지가 데이터를 불러오는 동안 스피너가 표시된다. 지금은 더미 데이터라 로딩이 순식간이지만, Ch8에서 Supabase를 연결하면 실제로 로딩 UI가 보인다. Ch12에서 더 세련된 **스켈레톤 UI**를 배운다.

### 5.2.5 error.js — 에러 UI

`error.js`는 해당 경로에서 에러가 발생했을 때 보여줄 UI를 정의한다:

```jsx
// app/posts/error.js
"use client"; // error.js는 반드시 Client Component

export default function Error({ error, reset }) {
  return (
    <div className="text-center py-10">
      <h2 className="text-xl font-bold text-red-600">문제가 발생했습니다</h2>
      <p className="text-gray-600 mt-2">잠시 후 다시 시도해주세요</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        다시 시도
      </button>
    </div>
  );
}
```

`"use client"` 지시어는 이 컴포넌트가 **클라이언트 컴포넌트**(Client Component)임을 표시한다. Next.js App Router에서 컴포넌트는 기본적으로 **서버 컴포넌트**(Server Component)이다. `onClick` 같은 이벤트 처리가 필요하면 `"use client"`를 파일 맨 위에 추가한다. 이 개념은 Ch6에서 자세히 배운다. 지금은 "error.js에는 항상 `"use client"`를 붙인다"고 기억하면 된다.

---

## 5.3 동적 라우트

게시판에서 각 게시글은 고유한 URL을 가진다: `/posts/1`, `/posts/2`, `/posts/3`... 매번 `app/posts/1/page.js`, `app/posts/2/page.js`를 만들 수는 없다. **동적 라우트**(Dynamic Route)가 이 문제를 해결한다.

### 5.3.1 [id] 폴더와 params

폴더 이름을 **대괄호**로 감싸면 동적 라우트가 된다:

```text
app/
└── posts/
    ├── page.js          → /posts (목록)
    ├── new/
    │   └── page.js      → /posts/new (작성)
    └── [id]/
        └── page.js      → /posts/1, /posts/2, ... (상세)
```

`[id]`는 URL의 일부를 **변수**로 받겠다는 의미이다. `/posts/42`에 접속하면 `id`의 값이 `"42"`가 된다.

### 5.3.2 동적 페이지 구현

동적 라우트 페이지에서 URL 파라미터를 읽는 방법:

```jsx
// app/posts/[id]/page.js
export default async function PostDetailPage({ params }) {
  const { id } = await params; // Next.js 15에서 params는 Promise

  // 지금은 더미 데이터 사용 (Ch8에서 Supabase 연결 예정)
  const post = {
    id: id,
    title: `게시글 ${id}번`,
    content: "이것은 게시글 내용입니다. Ch8에서 진짜 데이터베이스를 연결하면 실제 데이터가 표시됩니다.",
    author: "홍길동",
    date: "2026-02-20",
  };

  return (
    <article className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="flex gap-2 text-sm text-gray-500 mt-2">
        <span>{post.author}</span>
        <span>·</span>
        <span>{post.date}</span>
      </div>
      <div className="mt-6 leading-relaxed">{post.content}</div>
    </article>
  );
}
```

> ⚠️ **Next.js 15 주의사항**: `params`는 **Promise**이므로 반드시 `await`가 필요하다. AI가 `const { id } = params;`(await 없음)로 생성하면 에러가 발생한다. 이것은 Ch2에서 배운 **버전 불일치** 문제의 대표적 사례이다.

**코드 읽기 포인트**:
- `async function` — 서버 컴포넌트에서 `await`를 쓰기 위해 `async` 필수
- `const { id } = await params` — Ch4에서 배운 구조 분해 할당으로 id 추출
- 현재 더미 데이터 객체 → Ch8에서 Supabase `select()`로 교체 예정

**좋은 프롬프트 vs 나쁜 프롬프트**:

> **나쁜 프롬프트**
> "게시글 상세 페이지 만들어줘"

> **Copilot 프롬프트** (좋은 프롬프트)
> "app/posts/[id]/page.js를 만들어줘. Next.js 15 App Router 사용. params는 Promise이므로 await로 id를 추출해줘. 더미 게시글 데이터(id, title, content, author, date)를 표시하고 Tailwind CSS로 기사 스타일 레이아웃 적용."

나쁜 프롬프트는 어떤 폴더에 만들지, 어떤 버전의 Next.js인지, 어떤 데이터를 표시하는지 명시하지 않는다. AI는 Pages Router(구 방식)로 만들거나, params를 await하지 않을 수 있다. **copilot-instructions.md에 Next.js 15 App Router를 명시**해 두면 이 문제가 크게 줄어든다.

<!-- COPILOT_VERIFY: Copilot이 params를 await하는지 반드시 확인. Next.js 15에서 가장 흔한 AI 실수 -->

---

## 5.4 내비게이션

여러 페이지를 만들었으니 페이지 사이를 이동하는 방법이 필요하다.

### 5.4.1 Link 컴포넌트

Next.js의 **`Link`** 컴포넌트는 페이지 전환을 **빠르게** 처리한다. HTML의 `<a>` 태그와 비슷하지만, 페이지 전체를 다시 로드하지 않고 필요한 부분만 업데이트한다:

```jsx
import Link from "next/link";

function PostItem({ id, title, date }) {
  return (
    <Link
      href={`/posts/${id}`}
      className="block p-4 border rounded-lg hover:bg-gray-50"
    >
      <h2 className="font-bold">{title}</h2>
      <p className="text-sm text-gray-500">{date}</p>
    </Link>
  );
}
```

AI가 `<a href="...">` 로 생성하면 **페이지 전체가 새로고침**된다. Next.js에서 앱 내부 이동에 `<a>` 태그를 직접 사용하는 것은 대표적인 AI 실수이다.

**표 5.4** Link vs a 태그

| 항목 | `<Link href="...">` | `<a href="...">` |
|------|---------------------|-------------------|
| 페이지 전환 | 클라이언트 사이드 (빠름) | 전체 새로고침 (느림) |
| 레이아웃 유지 | 유지됨 | 다시 렌더링 |
| import 필요 | `import Link from "next/link"` | 불필요 |
| 용도 | 앱 내부 페이지 이동 | 외부 URL 이동 |

### 5.4.2 useRouter와 프로그래매틱 이동

버튼 클릭이나 폼 제출 후 **코드로 페이지를 이동**해야 할 때는 **`useRouter`**를 사용한다:

```jsx
"use client"; // useRouter는 Client Component에서만 사용

import { useRouter } from "next/navigation";

function CreatePostButton() {
  const router = useRouter();

  function handleClick() {
    router.push("/posts/new"); // 게시글 작성 페이지로 이동
  }

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      새 글 작성
    </button>
  );
}
```

> ⚠️ `useRouter`는 **`next/navigation`**에서 가져온다. AI가 `next/router`에서 가져오면 에러가 난다. 이것은 Next.js가 Pages Router(구버전)에서 App Router(현재)로 바뀌면서 생긴 **버전 불일치** 문제이다. copilot-instructions.md에 "App Router 사용, next/router 금지"를 명시하자.

**표 5.5** Link vs useRouter 사용 시점

| 상황 | 사용할 것 | 이유 |
|------|-----------|------|
| 텍스트/카드 클릭으로 이동 | `<Link>` | SEO 친화적, 간결함 |
| 버튼 클릭 후 이동 | `useRouter` | 이동 전 로직 실행 가능 |
| 폼 제출 후 이동 | `useRouter` | 데이터 저장 후 이동 |
| 조건부 이동 (로그인 확인 등) | `useRouter` | 조건 판단 후 이동 |

### 5.4.3 활성 링크 스타일링

현재 페이지에 해당하는 내비게이션 링크를 강조하려면 **`usePathname`**을 사용한다:

```jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded ${
        isActive
          ? "bg-blue-500 text-white"
          : "text-gray-300 hover:bg-gray-700"
      }`}
    >
      {children}
    </Link>
  );
}
```

`usePathname`도 `next/navigation`에서 가져온다. `useRouter`, `usePathname` 모두 `"use client"` 파일에서만 사용할 수 있다.

> **함께 진행**: `app/layout.js`의 내비게이션 바에 NavLink 컴포넌트를 적용하고, 페이지를 이동할 때 활성 링크가 변하는지 확인한다. NavLink는 `components/NavLink.js` 파일로 분리한다.

---

# ― 쉬는시간 ―

---

# 3교시: 게시판 페이지 구현 + 과제

## 5.5 과제: 게시글 목록/상세/작성 페이지 구현 + 배포

### 과제 안내

지금까지 배운 내용을 종합하여 **게시판의 3가지 핵심 페이지**를 구현한다:

1. **목록 페이지** (`/posts`) — 게시글 카드 리스트
2. **상세 페이지** (`/posts/[id]`) — 개별 게시글 내용
3. **작성 페이지** (`/posts/new`) — 게시글 작성 폼 (아직 저장 기능 없음)

> **강의 팁**: "오늘은 더미 데이터로 만든다. 진짜 데이터베이스는 Ch8에서 연결한다. 지금은 페이지 구조와 이동에 집중하자."

_전체 프로젝트는 practice/chapter5/ 참고_

### 실습 진행

**① 더미 데이터 준비**

프로젝트에 더미 데이터 파일을 만든다:

```javascript
// lib/posts.js — 더미 게시글 데이터
export const posts = [
  {
    id: "1",
    title: "Next.js로 게시판 만들기",
    content: "Next.js App Router를 사용하면 파일 기반 라우팅으로 쉽게 페이지를 만들 수 있습니다.",
    author: "김학생",
    date: "2026-02-20",
  },
  {
    id: "2",
    title: "Tailwind CSS 꿀팁",
    content: "유틸리티 클래스를 잘 활용하면 CSS 파일 없이도 멋진 디자인을 만들 수 있습니다.",
    author: "이학생",
    date: "2026-02-19",
  },
  {
    id: "3",
    title: "AI와 함께 코딩하기",
    content: "Copilot에게 명확한 프롬프트를 주면 원하는 코드를 빠르게 생성할 수 있습니다.",
    author: "박학생",
    date: "2026-02-18",
  },
];
```

**② 목록 페이지 구현**

> **Copilot 프롬프트**
> "app/posts/page.js를 만들어줘. lib/posts.js에서 posts 배열을 import하고, 게시글 목록을 카드 형태로 표시해줘. 각 카드를 클릭하면 /posts/[id]로 이동. next/link의 Link 컴포넌트 사용. Tailwind CSS 스타일링. Next.js 15 App Router."

<!-- COPILOT_VERIFY: 목록 페이지에서 Link 컴포넌트 사용 여부, import 경로, key 속성 포함 여부를 확인해주세요 -->

**③ 상세 페이지 구현**

> **Copilot 프롬프트**
> "app/posts/[id]/page.js를 만들어줘. Next.js 15 App Router이므로 params는 Promise — await로 id 추출. lib/posts.js에서 해당 id의 게시글을 find로 찾아 표시. 없으면 next/navigation의 notFound() 호출. 목록으로 돌아가기 링크 포함. Tailwind CSS 사용."

**④ 작성 페이지 구현**

> **Copilot 프롬프트**
> "app/posts/new/page.js를 만들어줘. 제목(input)과 내용(textarea) 입력 폼. 아직 백엔드가 없으므로 제출 시 alert('저장되었습니다')만 표시하고 /posts로 이동. useRouter 사용. 'use client' 필수. Next.js 15 App Router, Tailwind CSS."

**⑤ 레이아웃 업데이트**

`app/layout.js`의 내비게이션 바에 **홈**(`/`), **게시판**(`/posts`), **새 글 쓰기**(`/posts/new`) 링크를 추가한다. 2교시에 만든 NavLink 컴포넌트를 활용한다.

### 검증 체크리스트

**표 5.6** AI 생성 코드 검증 체크리스트

| 항목 | 확인 내용 |
|------|-----------|
| App Router 구조 | `app/posts/page.js`, `app/posts/[id]/page.js`, `app/posts/new/page.js` 파일이 있는가? |
| page.js export | 모든 페이지가 `export default function`인가? |
| params 처리 | `[id]/page.js`에서 `const { id } = await params`를 사용하는가? |
| Link import | `next/link`에서 import하는가? (`next/router` 아님) |
| useRouter import | `next/navigation`에서 import하는가? (`next/router` 아님) |
| "use client" | `useRouter`, `useState` 사용 파일에 `"use client"` 있는가? |
| key 속성 | `map()` 렌더링에 `key` 속성이 있는가? |
| className | `class` 대신 `className`을 사용하는가? |

### 흔한 AI 실수

**표 5.7** Ch5에서 AI가 자주 틀리는 패턴

| AI 실수 | 올바른 방법 | 원인 |
|---------|------------|------|
| `import { useRouter } from "next/router"` | `from "next/navigation"` | Pages Router 학습 데이터 |
| `const { id } = params` (await 없음) | `const { id } = await params` | Next.js 15 변경사항 미반영 |
| `<a href="/posts">` 내부 링크 | `<Link href="/posts">` | HTML 기본 태그로 대체 |
| `class="btn"` in JSX | `className="btn"` | HTML과 JSX 혼동 |
| `pages/` 폴더 구조 | `app/` 폴더 구조 | Pages Router(구버전) 패턴 |
| `getServerSideProps` 사용 | Server Component에서 직접 fetch | Pages Router 데이터 페칭 |

### 과제 제출 + 마무리

- Git 커밋 및 푸시 → Vercel 자동 배포 확인
- 배포 URL 제출
- **제출 확인**: `/posts` 목록 → 카드 클릭 → `/posts/1` 상세 → `/posts/new` 작성 페이지 이동이 되는지 확인
- **잘 만든 학생 페이지 1~2개 화면 공유** (동기부여)
- **다음 주 예고**: 상태 관리와 데이터 페칭 — 검색, 좋아요 같은 "동작"을 추가한다

---

## 장 요약

- **React**는 UI를 **컴포넌트**(재사용 가능한 함수)로 분리하여 만드는 라이브러리이다
- **JSX**는 JavaScript 안에서 HTML을 작성하는 문법이다. `className`, `{}`, `key` 규칙에 주의한다
- **Props**는 부모 → 자식으로 데이터를 전달하며, 읽기 전용이다
- **Next.js App Router**는 `app/` 폴더 안의 파일 구조가 곧 URL 구조이다
- **page.js**는 페이지, **layout.js**는 공통 레이아웃, **loading.js**는 로딩 UI, **error.js**는 에러 UI이다
- **동적 라우트**: `[id]` 폴더로 URL 파라미터를 받는다. Next.js 15에서 `params`는 Promise이므로 `await` 필수
- 페이지 이동은 **Link**(선언적)와 **useRouter**(프로그래매틱)를 사용한다
- `useRouter`와 `usePathname`은 `next/navigation`에서 import한다 (`next/router`는 구버전)
- AI가 Pages Router(`pages/`), `next/router`, `class` 등 구버전 패턴을 생성하는지 항상 확인한다

---

## 교수 메모

### 준비물
- [ ] 라이브 코딩용 프로젝트 (Ch1에서 만든 my-first-web 또는 새 create-next-app 프로젝트)
- [ ] `app/about/page.js` 시연용 코드 준비 (파일 기반 라우팅 시연)
- [ ] 더미 게시글 데이터 파일 (`lib/posts.js`) 미리 작성
- [ ] 학생 전원 `npm run dev` 실행 가능한지 사전 확인
- [ ] 배포 동작 확인 (Vercel 자동 배포)

### 수업 후 체크
- [ ] 전원 게시판 3페이지(목록/상세/작성) 배포 URL 제출 확인
- [ ] Link 컴포넌트 사용 여부 확인 (a 태그 대신)
- [ ] `[id]/page.js`에서 params await 사용 여부 확인
- [ ] App Router(`app/` 폴더) 사용 확인 (Pages Router `pages/` 아님)
- [ ] 미제출자 파악 및 개별 안내

---

## 다음 장 예고

다음 장에서는 **상태 관리와 데이터 페칭**을 배운다. 지금까지는 정적 데이터를 표시만 했지만, 다음 장에서는 검색, 좋아요, 폼 입력 같은 **사용자 인터랙션**을 처리한다. `useState`, `useEffect`, Server/Client Component의 차이, Context API를 배우고 게시판 프론트엔드를 완성한다.

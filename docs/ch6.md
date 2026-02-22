# Chapter 6. Next.js 상태 관리와 데이터 페칭

> **미션**: 게시판 프론트엔드를 완성한다

---

## 학습목표

1. useState로 컴포넌트의 상태를 관리하고 이벤트를 처리할 수 있다
2. useEffect로 사이드 이펙트를 처리하고 의존성 배열의 역할을 설명할 수 있다
3. Server Component와 Client Component의 차이를 이해하고 적절히 선택할 수 있다
4. 서버/클라이언트 양쪽의 데이터 페칭 패턴을 구현할 수 있다
5. Context API로 전역 상태를 관리하고 커스텀 훅으로 로직을 재사용할 수 있다

---

## 수업 타임라인

| 시간 | 구분 | 내용 |
|------|------|------|
| 00:00~00:50 | **1교시** | useState + 이벤트 처리 + 폼 입력 |
| 00:50~01:00 | 쉬는시간 | |
| 01:00~01:50 | **2교시** | useEffect + Server/Client Component + 데이터 페칭 |
| 01:50~02:00 | 쉬는시간 | |
| 02:00~02:50 | **3교시** | Context API + 커스텀 훅 + 과제 제출 |

---

# 1교시: useState와 이벤트 처리

## 6.1 useState와 이벤트 처리

Ch5에서 게시판의 페이지 구조를 만들었다. 목록, 상세, 작성 페이지가 있지만 아직 "동작"이 없다. 검색을 입력해도 반응이 없고, 글을 써도 저장되지 않는다. 이 장에서 **상태**(State)와 **이벤트**(Event)를 배워 게시판에 생명을 불어넣는다.

### 6.1.1 상태의 개념과 useState

Ch5에서 배운 Props는 **읽기 전용**이었다. 부모가 전달한 데이터를 표시할 수만 있고, 변경할 수 없었다. **상태**(State)는 컴포넌트가 스스로 **기억하고 변경할 수 있는 데이터**이다.

```jsx
"use client";

import { useState } from "react";

function LikeButton() {
  const [count, setCount] = useState(0);
  // count = 현재 값, setCount = 값을 바꾸는 함수, 0 = 초기값

  return (
    <button
      onClick={() => setCount(count + 1)}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      ❤️ {count}
    </button>
  );
}
```

> **라이브 코딩 시연**: 위 좋아요 버튼을 브라우저에서 클릭하며 숫자가 증가하는 것을 보여준다. "버튼을 클릭할 때마다 React가 화면을 다시 그린다"는 점을 강조한다.

일반 변수(`let count = 0`)로는 이것이 불가능하다. `let`을 바꿔도 React는 화면을 다시 그리지 않는다.

**표 6.1** 일반 변수 vs useState

| 항목 | `let count = 0` | `useState(0)` |
|------|-----------------|---------------|
| 값 변경 | `count = 1` | `setCount(1)` |
| 화면 업데이트 | 안 됨 | 자동으로 다시 렌더링 |
| 값 유지 | 렌더링마다 초기화 | 렌더링 사이에 유지 |
| "use client" 필요 | 아니오 | **예** |

`useState`는 **React Hook**이다. Hook은 `use`로 시작하는 특별한 함수이며, 컴포넌트에 기능을 "연결"(hook)한다. Hook을 사용하는 컴포넌트는 반드시 `"use client"` 파일이어야 한다.

### 6.1.2 이벤트 핸들러 작성

사용자의 동작(클릭, 입력, 폼 제출)에 반응하려면 **이벤트 핸들러**(Event Handler)를 연결한다:

```jsx
"use client";

import { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); // 페이지 새로고침 방지
    alert(`검색어: ${query}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="검색어를 입력하세요"
        className="flex-1 px-3 py-2 border rounded"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        검색
      </button>
    </form>
  );
}
```

**표 6.2** 주요 이벤트 핸들러

| 이벤트 | 발생 시점 | 주요 용도 |
|--------|-----------|-----------|
| `onClick` | 요소 클릭 시 | 버튼, 카드 클릭 |
| `onChange` | 입력값 변경 시 | input, select, textarea |
| `onSubmit` | 폼 제출 시 | 폼 전체 처리 |
| `onKeyDown` | 키보드 키 누를 때 | 단축키, Enter 검색 |

이벤트 핸들러의 명명 규칙: `handle` + 이벤트 이름 (예: `handleClick`, `handleChange`, `handleSubmit`). AI가 생성한 코드에서 이 패턴이 보이면 이벤트 처리 코드임을 알 수 있다.

### 6.1.3 폼 입력 처리

게시글 작성 폼처럼 여러 입력 필드가 있을 때는 **객체 상태**로 관리한다. 이런 방식을 **제어 컴포넌트**(Controlled Component)라 부른다 — 입력값을 React state가 "제어"한다:

```jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value }); // 해당 필드만 업데이트
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("제목을 입력해주세요");
      return;
    }

    // Ch8에서 Supabase insert로 교체 예정
    alert("게시글이 저장되었습니다 (더미)");
    router.push("/posts");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="제목"
        className="w-full px-3 py-2 border rounded text-lg"
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="내용을 입력하세요"
        rows={10}
        className="w-full px-3 py-2 border rounded"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        작성하기
      </button>
    </form>
  );
}
```

> **함께 진행**: Ch5에서 만든 `app/posts/new/page.js`를 위 코드로 개선한다. 제목이 비어있으면 경고가 나오는지 확인한다.

<!-- COPILOT_VERIFY: 위 폼 코드를 Copilot에게 생성시키고, 제어 컴포넌트 패턴(value+onChange)이 올바르게 적용되는지 확인해주세요 -->

**코드 읽기 포인트**:
- `setForm({ ...form, [name]: value })` — Ch4에서 배운 스프레드 연산자로 **불변성 유지**
- `[name]: value` — 대괄호 안의 변수가 키 이름이 됨 (Ch4 계산된 프로퍼티)
- `e.preventDefault()` — 폼 제출 시 페이지 새로고침 방지
- `form.title.trim()` — 공백만 있는 제목 방지

### 6.1.4 상태 업데이트와 불변성

React에서 상태를 업데이트할 때는 **기존 상태를 직접 수정하면 안 된다**. 새로운 값을 만들어서 교체해야 한다. 이것을 **불변성**(Immutability)이라 한다:

```jsx
// ❌ 직접 수정 (React가 변경을 감지하지 못함)
posts.push(newPost);          // 배열 끝에 추가
posts[0].title = "새 제목";    // 객체 속성 변경
posts.splice(0, 1);           // 배열 항목 삭제

// ✅ 새 배열/객체를 만들어 교체
setPosts([...posts, newPost]);                             // 추가
setPosts(posts.map(p => p.id === id ? { ...p, title: "새 제목" } : p)); // 수정
setPosts(posts.filter(p => p.id !== id));                  // 삭제
```

> **Copilot 프롬프트**
> "React에서 posts 배열 state를 불변성을 유지하면서 추가, 수정, 삭제하는 코드를 보여줘. 스프레드 연산자와 map/filter 사용. push, splice 같은 직접 수정은 하지 마."

이 패턴은 Ch10에서 Supabase CRUD와 연결할 때 다시 등장한다. 서버에서 데이터를 추가/수정/삭제한 후, 로컬 state도 같은 방식으로 업데이트한다.

---

# ― 쉬는시간 ―

---

# 2교시: useEffect, Server/Client Component, 데이터 페칭

## 6.2 useEffect와 사이드 이펙트

### 6.2.1 useEffect 기본 사용법

**사이드 이펙트**(Side Effect)는 렌더링 이외의 작업이다: API 호출, 타이머 설정, 외부 라이브러리 초기화 등. **`useEffect`**는 컴포넌트가 화면에 나타난 후 사이드 이펙트를 실행한다:

```jsx
"use client";

import { useState, useEffect } from "react";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 컴포넌트가 화면에 나타난 후 실행
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      });
  }, []); // 빈 배열 = 첫 렌더링 시 1회만 실행

  if (isLoading) return <p>로딩 중...</p>;

  return (
    <ul className="space-y-2">
      {posts.map((post) => (
        <li key={post.id} className="p-3 border rounded">{post.title}</li>
      ))}
    </ul>
  );
}
```

### 6.2.2 의존성 배열

`useEffect`의 두 번째 인자인 **의존성 배열**(Dependency Array)이 실행 시점을 결정한다:

**표 6.3** 의존성 배열에 따른 실행 시점

| 의존성 배열 | 실행 시점 | 용도 |
|------------|-----------|------|
| `[]` (빈 배열) | 마운트 시 **1회** | API 초기 호출, 구독 설정 |
| `[query]` | `query` 변경 시마다 | 검색어 변경 시 재검색 |
| 생략 | **매 렌더링마다** | 거의 사용하지 않음 (성능 문제) |

```jsx
// 검색어가 바뀔 때마다 API 호출
useEffect(() => {
  if (query.length > 0) {
    fetch(`/api/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => setResults(data));
  }
}, [query]); // query가 변경될 때마다 실행
```

### 6.2.3 클린업 함수

useEffect에서 `return`하는 함수는 **클린업**(Cleanup) 함수이다. 컴포넌트가 사라지거나 effect가 다시 실행되기 전에 호출된다:

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("1초마다 실행");
  }, 1000);

  return () => clearInterval(timer); // 컴포넌트 제거 시 타이머 해제
}, []);
```

클린업을 하지 않으면 메모리 누수가 발생한다. AI가 `setInterval`이나 이벤트 리스너를 사용하면서 클린업 함수를 빠뜨리는지 확인해야 한다.

---

## 6.3 Server Component vs Client Component

이것은 Next.js App Router에서 **가장 중요한 개념**이다. Ch5에서 `"use client"`를 몇 번 사용했는데, 이제 정확히 이해할 차례이다.

### 6.3.1 "use client" 지시어

Next.js App Router에서 모든 컴포넌트는 기본적으로 **서버 컴포넌트**(Server Component)이다. 서버에서 실행되어 HTML을 생성한 후 브라우저에 전송한다. 브라우저에서 인터랙션(클릭, 입력)이 필요하면 파일 맨 위에 `"use client"`를 추가하여 **클라이언트 컴포넌트**(Client Component)로 전환한다:

```jsx
// 서버 컴포넌트 (기본) — "use client" 없음
export default async function PostsPage() {
  const posts = await fetchPosts(); // 서버에서 직접 데이터 가져옴
  return <PostList posts={posts} />;
}

// 클라이언트 컴포넌트 — "use client" 있음
"use client";
function PostList({ posts }) {
  const [query, setQuery] = useState(""); // useState 사용 가능
  // ...
}
```

### 6.3.2 언제 서버 컴포넌트를 쓰는가

- 데이터를 가져오기만 하고 사용자 인터랙션이 없을 때
- API 키나 데이터베이스에 직접 접근할 때 (보안)
- 큰 라이브러리를 사용할 때 (브라우저에 보내는 코드 양 감소)

### 6.3.3 언제 클라이언트 컴포넌트를 쓰는가

- `useState`, `useEffect`, `useRouter` 같은 **Hook**을 사용할 때
- `onClick`, `onChange` 같은 **이벤트 핸들러**가 필요할 때
- 브라우저 API(localStorage, window)를 사용할 때

**표 6.4** Server Component vs Client Component

| 항목 | Server Component | Client Component |
|------|-----------------|-----------------|
| 선언 | 기본 (아무것도 안 씀) | `"use client"` 파일 맨 위 |
| 실행 위치 | 서버 | 브라우저 (+ 서버 초기 렌더링) |
| useState/useEffect | 사용 불가 | 사용 가능 |
| onClick/onChange | 사용 불가 | 사용 가능 |
| async/await | 컴포넌트 자체에서 가능 | 컴포넌트 자체에서 불가 |
| 데이터베이스 접근 | 가능 (보안) | 불가 (Supabase 클라이언트 제외) |
| 번들 크기 | 브라우저에 포함 안 됨 | 브라우저에 포함됨 |

> **강의 팁**: "기본은 서버 컴포넌트. 인터랙션이 필요한 부분만 'use client'로 빼낸다"가 핵심 원칙이다. 전체 페이지를 클라이언트 컴포넌트로 만들지 않는다.

**좋은 프롬프트 vs 나쁜 프롬프트**:

> **나쁜 프롬프트**
> "게시글 목록 페이지 만들어줘"

> **Copilot 프롬프트** (좋은 프롬프트)
> "app/posts/page.js를 Server Component로 만들어줘. 데이터는 lib/posts.js에서 가져와. 검색 기능이 필요한 SearchBar는 별도 Client Component(components/SearchBar.js)로 분리해줘. 'use client'는 SearchBar에만 적용."

나쁜 프롬프트는 AI가 전체 페이지를 `"use client"`로 만들어 버릴 수 있다. 서버/클라이언트 구분을 명시하면 올바른 구조가 나온다.

---

## 6.4 데이터 페칭 패턴

### 6.4.1 서버 컴포넌트에서 fetch

서버 컴포넌트는 **컴포넌트 함수 자체를 `async`**로 만들 수 있다. 이것이 Next.js App Router의 가장 큰 장점이다:

```jsx
// app/posts/page.js — Server Component (기본)
import Link from "next/link";

export default async function PostsPage() {
  // 서버에서 직접 데이터 가져옴 (브라우저에서 실행되지 않음)
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
  const posts = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">게시판</h1>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/posts/${post.id}`}
              className="block p-4 border rounded-lg hover:bg-gray-50"
            >
              <h2 className="font-bold">{post.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

서버 컴포넌트에서 fetch하면: (1) API 키가 브라우저에 노출되지 않고, (2) 로딩 상태를 직접 관리할 필요 없이 `loading.js`가 자동으로 처리하고, (3) 브라우저에 보내는 JavaScript 양이 줄어든다.

### 6.4.2 클라이언트 컴포넌트에서 useEffect + fetch

사용자 인터랙션에 따라 데이터를 가져와야 할 때는 클라이언트 컴포넌트에서 **useState + useEffect + fetch** 패턴을 사용한다:

```jsx
"use client";

import { useState, useEffect } from "react";

export default function PostSearchPage() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setPosts([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${query}`)
      .then((res) => {
        if (!res.ok) throw new Error("검색에 실패했습니다");
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [query]); // query 변경 시마다 실행

  return (
    <div className="max-w-4xl mx-auto p-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="게시글 검색..."
        className="w-full px-3 py-2 border rounded mb-4"
      />
      {isLoading && <p className="text-gray-500">검색 중...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="p-3 border rounded">{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

<!-- COPILOT_VERIFY: 위 useEffect + fetch 패턴을 Copilot에게 생성시키고, 의존성 배열에 query가 포함되는지, 에러 처리가 있는지 확인해주세요 -->

### 6.4.3 로딩/에러 상태 처리

클라이언트 컴포넌트에서 데이터를 가져올 때는 **3가지 상태**를 관리해야 한다:

1. **로딩 중** (`isLoading: true`) — 스피너 또는 "로딩 중..." 표시
2. **에러 발생** (`error: "메시지"`) — 에러 메시지 표시
3. **데이터 도착** (`posts: [...]`) — 정상 화면 표시

이 패턴은 Ch8~12에서 Supabase 데이터를 다룰 때 계속 반복된다. 지금 확실히 익혀두자.

---

# ― 쉬는시간 ―

---

# 3교시: Context API, 커스텀 훅, 과제

## 6.5 Context API와 커스텀 훅

### 6.5.1 전역 상태와 Context

Props로 데이터를 전달하면 부모→자식→손자로 깊이 내려갈수록 번거로워진다. **Context API**는 컴포넌트 트리 전체에 데이터를 "방송"한다:

```jsx
// lib/ThemeContext.js
"use client";

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme은 ThemeProvider 안에서 사용해야 합니다");
  }
  return context;
}
```

사용 방법:

```jsx
// app/layout.js — Provider로 감싸기
import { ThemeProvider } from "@/lib/ThemeContext";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```jsx
// components/ThemeToggle.js — 어떤 컴포넌트에서든 사용
"use client";
import { useTheme } from "@/lib/ThemeContext";

export default function ThemeToggle() {
  const { isDark, setIsDark } = useTheme();
  return (
    <button onClick={() => setIsDark(!isDark)}>
      {isDark ? "다크" : "라이트"}
    </button>
  );
}
```

<!-- COPILOT_VERIFY: ThemeContext를 Copilot에게 생성시키고 createContext, Provider, useContext 구조가 올바른지 확인해주세요 -->

> **강의 팁**: "이 Context 패턴이 Ch9에서 로그인 상태를 관리하는 AuthContext의 기반이다"라고 미리 예고하면 학생들이 동기부여를 얻는다.

### 6.5.2 커스텀 훅으로 로직 재사용

**커스텀 훅**(Custom Hook)은 상태 로직을 함수로 추출하여 여러 컴포넌트에서 재사용하는 패턴이다. 이름은 반드시 `use`로 시작한다:

```jsx
// hooks/usePosts.js
"use client";

import { useState, useEffect } from "react";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { posts, isLoading, error };
}

// 사용하는 컴포넌트
function PostList() {
  const { posts, isLoading, error } = usePosts();
  // ...
}
```

> **Copilot 프롬프트**
> "usePosts 커스텀 훅을 만들어줘. JSONPlaceholder에서 게시글을 가져오고, posts, isLoading, error를 반환해줘. 'use client' 파일로 만들어줘."

---

## 6.6 과제: 게시판 프론트엔드 완성 (더미 데이터) + 배포

### 과제 안내

Ch5에서 만든 게시판에 **인터랙션**을 추가하여 프론트엔드를 완성한다. 아직 실제 데이터베이스는 없지만, 더미 데이터와 외부 API를 활용하여 동작하는 게시판을 만든다.

_전체 프로젝트는 practice/chapter6/ 참고_

### 실습 진행

**① 게시글 검색 기능 추가**

> **Copilot 프롬프트**
> "게시판 목록 페이지에 검색 기능을 추가해줘. SearchBar는 'use client' Client Component로 분리. useState로 검색어를 관리하고, posts 배열을 filter로 제목 검색. Next.js 15, Tailwind CSS."

<!-- COPILOT_VERIFY: 검색 기능에서 Server/Client Component 분리가 올바르게 되는지 확인해주세요 -->

**② 게시글 작성 폼 개선**

1교시에 배운 제어 컴포넌트 패턴으로 폼을 개선한다. 제목이 비어있으면 에러 메시지를 표시한다.

**③ 게시글 삭제 기능**

목록에서 삭제 버튼을 누르면 `posts.filter()`로 해당 게시글을 제거한다. `window.confirm()`으로 확인을 받는다.

**④ 외부 API 데이터 페칭**

JSONPlaceholder API에서 게시글을 가져오는 버전을 만든다. 서버 컴포넌트 fetch 방식과 클라이언트 컴포넌트 useEffect 방식을 각각 구현하고 차이를 비교한다.

### 검증 체크리스트

**표 6.5** AI 생성 코드 검증 체크리스트

| 항목 | 확인 내용 |
|------|-----------|
| "use client" 위치 | useState/useEffect 사용 파일에만 있는가? (전체 페이지에 넣지 않았는가?) |
| useState import | `import { useState } from "react"` 인가? |
| useEffect 의존성 | 의존성 배열이 올바른가? (빠진 변수, 불필요한 변수) |
| 불변성 유지 | push/splice 대신 스프레드/filter/map 사용하는가? |
| 이벤트 핸들러 | `onClick={handleClick}` 형태인가? (`onClick={handleClick()}` 아님) |
| Server/Client 분리 | 인터랙션 없는 부분은 Server Component인가? |
| fetch 에러 처리 | try-catch 또는 .catch()가 있는가? |

### 흔한 AI 실수

**표 6.6** Ch6에서 AI가 자주 틀리는 패턴

| AI 실수 | 올바른 방법 | 원인 |
|---------|------------|------|
| 전체 페이지에 `"use client"` | 인터랙션 부분만 Client Component 분리 | Server/Client 구분 미인식 |
| `posts.push(newPost)` (직접 수정) | `setPosts([...posts, newPost])` | 불변성 원칙 미적용 |
| `useEffect` 의존성 배열 누락 | 사용하는 변수를 배열에 포함 | React 규칙 미준수 |
| `onClick={handleClick()}` (즉시 실행) | `onClick={handleClick}` (참조 전달) | 함수 호출과 참조 혼동 |
| Server Component에서 useState 사용 | `"use client"` 추가 필요 | 컴포넌트 유형 혼동 |
| fetch 에러 처리 없음 | try-catch 또는 .catch() 추가 | 에러 시나리오 무시 |

### 과제 제출 + 마무리

- Git 커밋 및 푸시 → Vercel 자동 배포 확인
- 배포 URL 제출
- **제출 확인**: 검색이 동작하는가? 폼 유효성 검증이 되는가? 삭제가 되는가?
- **잘 만든 학생 페이지 1~2개 화면 공유** (동기부여)
- **다음 주 예고**: 웹 앱 아키텍처 & AI 디자인 설계 — 개인 프로젝트를 위한 설계서를 작성한다

---

## 장 요약

- **상태**(State)는 React가 기억하는 변수이다. `useState`로 선언하고, setter 함수로 변경하면 UI가 자동 업데이트된다
- 이벤트 핸들러는 `onClick`, `onChange`, `onSubmit`으로 사용자 동작에 반응한다
- **제어 컴포넌트**: 입력값을 state에 바인딩하여 폼을 관리한다
- 상태 업데이트는 **불변성**을 유지한다 — push 대신 스프레드, splice 대신 filter/map
- **useEffect**는 렌더링 이후 사이드 이펙트(API 호출 등)를 실행한다. 의존성 배열이 실행 시점을 결정한다
- **Server Component**(기본)는 서버에서 실행, **Client Component**(`"use client"`)는 브라우저에서 실행
- 서버 컴포넌트에서는 `async/await`로 직접 데이터를 가져오고, 클라이언트에서는 `useEffect + fetch`를 사용한다
- **Context API**는 컴포넌트 트리 전체에 데이터를 공유한다 (Ch9 AuthContext의 기반)
- **커스텀 훅**(`use` 접두사)으로 상태 로직을 재사용한다
- AI가 전체 페이지에 `"use client"`를 붙이거나, 상태를 직접 수정하거나, 의존성 배열을 빠뜨리는지 확인한다

---

## 교수 메모

### 준비물
- [ ] Ch5 완성 프로젝트 (게시판 3페이지: 목록/상세/작성)
- [ ] JSONPlaceholder API 동작 확인 (https://jsonplaceholder.typicode.com/posts)
- [ ] 좋아요 버튼 라이브 코딩 시연 준비 (useState 기초)
- [ ] Server/Client Component 비교 시연 준비 (같은 데이터 페칭을 두 방식으로)

### 수업 후 체크
- [ ] 전원 게시판 프론트엔드(검색+폼+삭제) 배포 URL 제출 확인
- [ ] "use client" 사용 위치가 적절한지 확인 (전체 페이지에 남발하지 않았는지)
- [ ] 불변성 패턴(스프레드/filter/map) 사용 여부 확인
- [ ] 미제출자 파악 및 개별 안내

---

## 다음 장 예고

다음 장에서는 **웹 앱 아키텍처 & AI 디자인 설계**를 배운다. Ch5~6에서 게시판을 만드는 기술을 익혔으니, 이제 **개인 프로젝트**를 위한 설계서를 작성한다. 페이지 맵, AI 와이어프레임, shadcn/ui 테마, ARCHITECTURE.md를 만들어 AI에게 "내 프로젝트"를 이해시키는 것이 목표이다. 이 설계서가 중간고사 이후 Ch8~12에서 실제 구현의 기반이 된다.

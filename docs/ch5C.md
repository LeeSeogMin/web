# Chapter 5. Next.js 기초 — C: 모범 구현 + 해설

> B회차 과제 제출 후 공개

---

## 모범 구현 코드 해설

_전체 프로젝트는 practice/chapter5/complete/ 참고_

### 전체 구조

```
practice/chapter5/complete/
├── app/
│   ├── layout.js          ← 공통 레이아웃 + NavLink 적용
│   ├── page.js            ← 홈 페이지
│   ├── globals.css        ← Tailwind 기본 import
│   └── posts/
│       ├── page.js        ← 목록 페이지 (모범 구현)
│       ├── new/
│       │   └── page.js    ← 작성 페이지 (모범 구현)
│       └── [id]/
│           └── page.js    ← 상세 페이지 (모범 구현)
├── lib/
│   └── posts.js           ← 더미 게시글 데이터
├── components/
│   └── NavLink.js         ← 활성 링크 컴포넌트
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

---

### lib/posts.js — 더미 데이터 분리

```jsx
export const posts = [
  {
    id: "1",
    title: "Next.js로 게시판 만들기",
    content: "Next.js App Router를 사용하면 파일 기반 라우팅으로 쉽게 페이지를 만들 수 있습니다.",
    author: "김학생",
    date: "2026-02-20",
  },
  // ...
];
```

**왜 이렇게 했는가**: 데이터를 별도 파일로 분리하면 여러 페이지에서 같은 데이터를 import할 수 있다. 목록 페이지에서는 전체 배열을, 상세 페이지에서는 `find()`로 한 개를 꺼낸다. Ch8에서 Supabase를 연결할 때 이 파일만 교체하면 된다.

> **강의 팁**: id를 문자열(`"1"`)로 지정한 이유 — URL 파라미터(`params.id`)는 항상 문자열이다. `find()`에서 `===`로 비교할 때 타입이 일치해야 한다. 숫자(`1`)로 저장하면 `"1" === 1`이 `false`가 되어 게시글을 찾지 못한다.

---

### 목록 페이지 핵심 포인트 (app/posts/page.js)

#### 1. Link로 카드 감싸기

```jsx
import Link from "next/link";
import { posts } from "../../lib/posts";

export default function PostsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">게시판</h1>
        <Link
          href="/posts/new"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          새 글 작성
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`} className="block">
            <article className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{post.content}</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{post.author}</span>
                <time dateTime={post.date}>{post.date}</time>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

**확인 포인트**:
- `import Link from "next/link"` — `<a>` 태그가 아닌 Link 컴포넌트 사용
- `key={post.id}` — map의 key prop, Link 요소에 직접 부여
- `href={`/posts/${post.id}`}` — 템플릿 리터럴로 동적 URL 생성
- `"새 글 작성"` 버튼도 Link로 구현 — 이동만 하면 되므로 useRouter 불필요

#### 2. import 경로

```jsx
import { posts } from "../../lib/posts";
```

`app/posts/page.js`에서 `lib/posts.js`로 가려면 두 단계 위로 올라가야 한다 (`app/posts/` → `app/` → 루트). 이 상대 경로가 자주 틀리는 포인트이다.

---

### 상세 페이지 핵심 포인트 (app/posts/[id]/page.js)

```jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../../../lib/posts";

export default async function PostDetailPage({ params }) {
  const { id } = await params;

  const post = posts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-2xl mx-auto">
      <Link href="/posts" className="text-blue-500 hover:underline mb-4 inline-block">
        ← 목록으로
      </Link>
      <h1 className="text-3xl font-bold mt-4">{post.title}</h1>
      <div className="flex gap-2 text-sm text-gray-500 mt-2">
        <span>{post.author}</span>
        <span>·</span>
        <time dateTime={post.date}>{post.date}</time>
      </div>
      <div className="mt-6 leading-relaxed text-gray-700">{post.content}</div>
    </article>
  );
}
```

**확인 포인트**:
- `async function` + `await params` — Next.js 15에서 params는 Promise
- `posts.find((p) => p.id === id)` — Ch4에서 배운 find 메서드 활용
- `notFound()` — 게시글이 없으면 404 페이지 자동 표시
- `import { notFound } from "next/navigation"` — next/navigation에서 import
- `../../../lib/posts` — 세 단계 위로 올라가는 상대 경로

---

### 작성 페이지 핵심 포인트 (app/posts/new/page.js)

```jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert("저장되었습니다 (Ch8에서 실제 저장 구현 예정)");
    router.push("/posts");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">새 글 작성</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          등록
        </button>
      </form>
    </div>
  );
}
```

**확인 포인트**:
- `"use client"` — useState, useRouter, onClick/onChange 사용하므로 필수
- `useRouter`를 `"next/navigation"`에서 import (next/router 아님)
- `e.preventDefault()` — 폼 기본 제출 동작 방지
- `htmlFor` — JSX에서 label의 for 속성은 htmlFor
- `useState`로 폼 입력값 관리 — Ch6에서 더 자세히 배운다

---

### NavLink 컴포넌트 (components/NavLink.js)

```jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
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

**왜 이렇게 했는가**: 현재 URL과 링크의 href를 비교하여 활성 링크를 강조한다. `usePathname`은 클라이언트에서만 동작하므로 `"use client"` 필수. 이 컴포넌트를 분리하면 layout.js에서 깔끔하게 사용할 수 있다.

---

## 채점 기준 참고

**표 5C.1** 채점 기준

| 항목 | 배점 | 기준 |
|------|------|------|
| 배포 URL 동작 | 7점 | 3페이지가 정상적으로 렌더링되고 이동이 되는가 |
| AI 검증 서술 | 3점 | AI가 틀린 부분을 구체적으로 설명했는가 |

**URL 동작 (7점)** 세부:
- 목록 페이지에 게시글 카드가 표시된다 (2점)
- 카드 클릭 시 상세 페이지로 이동하고 내용이 표시된다 (2점)
- 작성 페이지에서 폼 입력 후 제출하면 목록으로 이동한다 (2점)
- 내비게이션 바에서 페이지 이동이 동작한다 (1점)

**AI 검증 서술 (3점)** 세부:
- AI가 틀린 부분을 1개 이상 구체적으로 지적했다 (2점)
- 어떻게 수정했는지 설명했다 (1점)

---

## 우수 구현 사례

### 사례 1: 게시글 없음 처리

```jsx
// app/posts/[id]/page.js
if (!post) {
  notFound();
}
```

존재하지 않는 id로 접속했을 때 `notFound()`를 호출하여 Next.js 기본 404 페이지를 보여주는 사례. 커스텀 `not-found.js`를 만들면 더 친화적인 404 페이지를 제공할 수 있다.

### 사례 2: "목록으로" 링크 + "새 글 작성" 버튼을 상세 페이지에 추가

```jsx
<div className="flex justify-between items-center mb-4">
  <Link href="/posts" className="text-blue-500 hover:underline">
    ← 목록으로
  </Link>
  <Link href="/posts/new" className="px-4 py-2 bg-blue-500 text-white rounded">
    새 글 작성
  </Link>
</div>
```

사용자가 상세 페이지에서도 바로 새 글 쓰기로 이동할 수 있어 UX가 좋아진 사례.

---

## 자주 하는 실수 정리

**표 5C.2** 학생들이 자주 하는 실수

| 실수 | 증상 | 해결 |
|------|------|------|
| `next/router` import | 에러 또는 비정상 동작 | `next/navigation`으로 변경 |
| `params` await 누락 | `params`가 Promise 객체로 표시 | `const { id } = await params` |
| `<a>` 태그로 내부 이동 | 전체 새로고침 발생 | `<Link>`로 변경 |
| `"use client"` 누락 | `useState is not defined` 에러 | 파일 맨 위에 추가 |
| id 타입 불일치 | 상세 페이지에서 게시글 못 찾음 | 더미 데이터 id를 문자열로 통일 |
| import 상대 경로 오류 | `Module not found` 에러 | 폴더 깊이에 맞는 `../` 추가 |
| `key` prop 누락 | 콘솔에 경고 | map 최상위 요소에 `key` 추가 |
| `pages/` 폴더에 파일 생성 | 페이지가 표시되지 않음 | `app/` 폴더로 이동 |
| `class` 사용 (JSX) | 스타일 미적용 + 콘솔 경고 | `className`으로 변경 |

---

## 다음 장 연결

이번 장에서 만든 3페이지 게시판은 Ch6(상태 관리와 데이터 페칭)에서 동적으로 업그레이드된다:

- **useState**: 검색 입력, 좋아요 카운트 등 사용자 인터랙션
- **useEffect**: 컴포넌트 로드 시 데이터 가져오기
- **Server vs Client Component**: 어떤 컴포넌트에 `"use client"`를 붙이는가
- **Context API**: 전역 상태 관리 (로그인 정보 등)

특히 작성 페이지의 `useState` + `useRouter` 패턴은 Ch6에서 더 깊이 배우고, Ch10에서 Supabase `insert()`와 연결된다. 지금 만든 폼 구조가 그대로 재사용되므로 잘 이해해두자.

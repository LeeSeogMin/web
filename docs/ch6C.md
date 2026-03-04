# Chapter 6. Next.js 상태 관리와 데이터 페칭 — C: 모범 구현 + 해설

> B회차 과제 제출 후 공개

---

## 모범 구현 코드 해설

_전체 프로젝트는 practice/chapter6/complete/ 참고_

### 전체 구조

```
practice/chapter6/complete/
├── app/
│   ├── layout.js        ← 공통 레이아웃
│   ├── page.js          ← 메인 페이지 (Server Component + 검색 연동)
│   ├── globals.css      ← Tailwind 기본 import
│   └── posts/
│       ├── [id]/
│       │   └── page.js  ← 게시글 상세
│       └── new/
│           └── page.js  ← 게시글 작성 폼 (제어 컴포넌트)
├── components/
│   └── SearchBar.js     ← 검색바 (Client Component)
├── hooks/
│   └── usePosts.js      ← 커스텀 훅 (보너스)
├── lib/
│   └── posts.js         ← 더미 데이터
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

---

### 핵심 포인트 1: Server/Client Component 분리

```
app/page.js (Server Component)
  └── components/SearchBar.js ("use client" — Client Component)
```

**왜 이렇게 했는가**: 메인 페이지(`page.js`)는 더미 데이터를 표시하기만 하므로 Server Component로 유지한다. 검색 기능은 사용자 입력(onChange)이 필요하므로 `SearchBar`만 Client Component로 분리한다.

> **강의 팁**: 전체 페이지에 `"use client"`를 넣은 학생이 있다면, "Server Component가 기본이고, 인터랙션이 필요한 최소 단위만 Client Component로 빼낸다"는 원칙을 다시 강조한다.

**잘못된 구조 vs 올바른 구조**:

```
❌ 전체 페이지를 Client Component로 만든 경우
app/page.js ("use client") — 전체가 브라우저에서 실행

✅ 인터랙션 부분만 분리한 경우
app/page.js (Server Component) — 서버에서 실행
  └── SearchBar.js ("use client") — 검색만 브라우저에서 실행
```

---

### 핵심 포인트 2: 검색 기능 (useState + filter)

```jsx
// components/SearchBar.js
"use client";
import { useState } from "react";

export default function SearchBar({ posts, onFilter }) {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    // 부모에게 필터된 결과를 전달
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(value.toLowerCase())
    );
    onFilter(filtered);
  }

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="게시글 검색..."
      className="w-full px-3 py-2 border rounded mb-4"
    />
  );
}
```

**확인 포인트**:
- `"use client"`가 SearchBar 파일에만 있다
- `useState`로 검색어를 관리한다
- `filter` + `includes`로 제목을 검색한다 (대소문자 무시: `toLowerCase()`)
- 부모에게 필터 결과를 콜백(`onFilter`)으로 전달한다

---

### 핵심 포인트 3: 게시글 작성 폼 (제어 컴포넌트)

```jsx
// app/posts/new/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      alert("제목을 입력해주세요");
      return;
    }
    alert("게시글이 저장되었습니다 (더미)");
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 p-6">
      <h1 className="text-2xl font-bold">새 게시글 작성</h1>
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

**확인 포인트**:
- `value` + `onChange` 조합 (제어 컴포넌트)
- `setForm({ ...form, [name]: value })` — 스프레드로 불변성 유지
- `e.preventDefault()` — 폼 제출 시 새로고침 방지
- `form.title.trim()` — 공백만 입력 방지
- `useRouter().push()` — 작성 후 목록으로 이동

---

### 핵심 포인트 4: 삭제 기능 (불변성 유지)

```jsx
function handleDelete(id) {
  if (window.confirm("정말 삭제하시겠습니까?")) {
    setPosts(posts.filter((post) => post.id !== id));
  }
}
```

| 방법 | 코드 | 올바른가? |
|------|------|----------|
| filter (불변) | `setPosts(posts.filter(p => p.id !== id))` | ✅ |
| splice (직접 수정) | `posts.splice(index, 1); setPosts(posts)` | ❌ |

`filter`는 새 배열을 반환하므로 React가 변경을 감지한다. `splice`는 기존 배열을 수정하므로 같은 참조가 유지되어 React가 변경을 인식하지 못할 수 있다.

---

### 핵심 포인트 5: 더미 데이터 구조

```jsx
// lib/posts.js
export const initialPosts = [
  {
    id: 1,
    title: "Next.js App Router 시작하기",
    content: "Next.js 14의 App Router를 사용하면 서버 컴포넌트와 파일 기반 라우팅을 쉽게 구현할 수 있습니다.",
    author: "김개발",
    date: "2026-02-25",
  },
  // ...
];
```

**왜 이렇게 했는가**: 데이터를 별도 파일로 분리하면 Ch8에서 Supabase 데이터로 교체하기 쉽다. `import { initialPosts } from "@/lib/posts"` → `const { data } = await supabase.from("posts").select()`로 한 줄만 바꾸면 된다.

---

## 채점 기준 참고

**표 6C.1** 채점 기준

| 항목 | 배점 | 기준 |
|------|------|------|
| 배포 URL 동작 | 7점 | 페이지가 정상적으로 렌더링되고 기능이 동작하는가 |
| AI 검증 서술 | 3점 | AI가 틀린 부분을 구체적으로 설명했는가 |

**URL 동작 (7점)** 세부:
- 페이지가 에러 없이 렌더링된다 (2점)
- 검색 기능이 동작한다 (2점)
- 게시글 작성 폼이 유효성 검증과 함께 동작한다 (2점)
- 게시글 삭제가 동작한다 (1점)

**AI 검증 서술 (3점)** 세부:
- AI가 틀린 부분을 1개 이상 구체적으로 지적했다 (2점)
- 어떻게 수정했는지 설명했다 (1점)

---

## 우수 구현 사례

### 사례 1: 로딩 스피너 추가

```jsx
{isLoading && (
  <div className="flex justify-center py-8">
    <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
  </div>
)}
```

Tailwind의 `animate-spin` 클래스로 간단한 로딩 스피너를 구현한 사례. 과제 요구사항을 넘어서는 UX 개선이다.

### 사례 2: 검색 결과 카운트 표시

```jsx
<p className="text-sm text-gray-500 mb-4">
  {filteredPosts.length}개의 게시글
</p>
```

검색 결과 개수를 표시하여 사용자에게 피드백을 주는 사례. 간단하지만 UX에 큰 차이를 만든다.

---

## 자주 하는 실수 정리

**표 6C.2** 학생들이 자주 하는 실수

| 실수 | 증상 | 해결 |
|------|------|------|
| 전체 page.js에 `"use client"` | 동작은 하지만 서버 렌더링 이점 상실 | SearchBar만 Client Component로 분리 |
| `posts.push()` 사용 | 클릭해도 화면이 안 바뀜 | `setPosts([...posts, newPost])` 사용 |
| `onClick={handleClick()}` | 클릭 전에 함수가 즉시 실행됨 | `onClick={handleClick}` (괄호 제거) |
| useEffect 의존성 배열 빈 상태 | 검색어 변경해도 결과 안 바뀜 | `[query]` 추가 |
| form value 없이 onChange만 사용 | 비제어 컴포넌트 경고 | value + onChange 모두 설정 |
| `npm install` 누락 | `Module not found` 에러 | 스타터 폴더에서 `npm install` 실행 |
| import 경로 오류 (`@/` 대신 `./`) | Module not found | Next.js의 `@/` alias 사용 확인 |

---

## 다음 장 연결

이번 장에서 블로그 프론트엔드를 완성했다. 검색, 작성, 삭제가 동작하지만 **더미 데이터**를 사용하고 있다. 새로고침하면 데이터가 초기화된다.

다음 장(Ch7)에서는 **웹 앱 아키텍처 & AI 디자인 설계**를 배운다. 개인 프로젝트를 위한 설계서(ARCHITECTURE.md, copilot-instructions.md)를 작성하고, shadcn/ui로 컴포넌트 시스템을 구축한다. 이 설계서가 Ch8 이후 Supabase 백엔드 통합의 기반이 된다.

Ch8에서는 Supabase 데이터베이스를 연결하여 더미 데이터를 실제 데이터로 교체한다. 지금 만든 `lib/posts.js`의 데이터 구조가 Supabase 테이블 구조로 그대로 이어진다.

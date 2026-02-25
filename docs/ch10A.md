# Chapter 10. Supabase Database CRUD — A회차: 강의

> **미션**: 게시글을 생성, 조회, 수정, 삭제할 수 있다

---

## 학습목표

1. SELECT, INSERT, UPDATE, DELETE 기본 SQL 문법을 읽을 수 있다
2. Supabase JavaScript 클라이언트로 CRUD 작업을 수행할 수 있다
3. 필터링, 정렬, 페이지네이션을 구현할 수 있다
4. React 컴포넌트에서 Supabase CRUD를 연결할 수 있다
5. 관계 데이터(작성자 정보)를 한 번에 조회할 수 있다

---

## 수업 타임라인

**표 10.1** A회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | 오늘의 미션 + 빠른 진단 |
| 00:05~00:30 | SQL CRUD 기본 + Supabase 클라이언트 CRUD |
| 00:30~00:55 | 쿼리 심화: 필터링, 정렬, 페이지네이션, 관계 데이터 |
| 00:55~01:20 | 라이브 코딩 시연: React와 CRUD 연결 |
| 01:20~01:27 | 핵심 정리 + B회차 과제 스펙 공개 |
| 01:27~01:30 | Exit ticket |

---

## 오늘의 미션 + 빠른 진단

> **오늘의 질문**: "게시판에서 게시글을 '만들고, 보고, 고치고, 지우는' 4가지 작업을 데이터베이스에서는 어떻게 처리하는가?"

**빠른 진단** (1문항):

다음 중 데이터를 "삭제"하는 SQL 명령은?
- (A) `SELECT`
- (B) `INSERT`
- (C) `DELETE`

정답: (C) — CRUD의 Delete에 해당한다.

---

## 10.1 기본 SQL 문법

Ch8에서 테이블을 만들 때 SQL을 처음 접했다. 이번 장에서는 데이터를 **다루는** SQL 4가지를 배운다. **CRUD**(Create, Read, Update, Delete)라 부르는 이 4가지 작업이 모든 데이터 조작의 기본이다.

### 10.1.1 SELECT, INSERT, UPDATE, DELETE

**표 10.2** SQL CRUD 4대 명령

| SQL | 작업 | 영문 | 예시 |
|-----|------|------|------|
| `SELECT` | 조회 | Read | 게시글 목록 보기 |
| `INSERT` | 생성 | Create | 새 게시글 작성 |
| `UPDATE` | 수정 | Update | 게시글 제목 변경 |
| `DELETE` | 삭제 | Delete | 게시글 삭제 |

> **라이브 코딩 시연**: Supabase SQL Editor에서 아래 4가지 SQL을 하나씩 실행하며 결과를 보여준다

각 명령의 기본 형태:

```sql
-- 조회: 모든 게시글 가져오기
SELECT * FROM posts;

-- 생성: 새 게시글 추가
INSERT INTO posts (title, content, user_id)
VALUES ('첫 글', '안녕하세요', 'uuid-value');

-- 수정: 1번 게시글 제목 변경
UPDATE posts SET title = '수정된 제목' WHERE id = 1;

-- 삭제: 1번 게시글 삭제
DELETE FROM posts WHERE id = 1;
```

> 이 SQL을 직접 타이핑할 일은 거의 없다. Supabase JavaScript 클라이언트가 이 SQL을 대신 생성해준다. 하지만 **뒤에서 어떤 SQL이 실행되는지** 알아야 문제를 디버깅할 수 있다.

### 10.1.2 WHERE, ORDER BY, LIMIT

데이터를 조건으로 거르고(WHERE), 정렬하고(ORDER BY), 개수를 제한하는(LIMIT) 문법:

```sql
-- 조건: user_id가 특정 값인 게시글만
SELECT * FROM posts WHERE user_id = 'uuid-value';

-- 정렬: 최신순
SELECT * FROM posts ORDER BY created_at DESC;

-- 개수 제한: 10개만
SELECT * FROM posts LIMIT 10;

-- 조합: 특정 사용자의 최신 게시글 5개
SELECT * FROM posts
WHERE user_id = 'uuid-value'
ORDER BY created_at DESC
LIMIT 5;
```

**표 10.3** SQL 절의 실행 순서

| 순서 | 절 | 역할 | 비유 |
|:----:|-----|------|------|
| 1 | `FROM` | 어떤 테이블에서 | 어느 서랍에서 |
| 2 | `WHERE` | 어떤 조건으로 | 어떤 기준으로 골라 |
| 3 | `ORDER BY` | 어떤 순서로 | 정렬해서 |
| 4 | `LIMIT` | 몇 개를 | 위에서 N개만 |
| 5 | `SELECT` | 어떤 열을 | 어떤 정보를 보여줘 |

### 10.1.3 JOIN 기초

게시글을 조회할 때 작성자 이름도 함께 보여주고 싶다. `posts` 테이블에는 `user_id`만 있고 이름은 없다. 이름은 `profiles` 테이블에 있다. 두 테이블을 **조인**(JOIN)해서 가져온다:

```sql
SELECT posts.*, profiles.username
FROM posts
JOIN profiles ON posts.user_id = profiles.id
ORDER BY posts.created_at DESC;
```

이 SQL의 의미: "posts의 모든 열과 profiles의 username을 가져오되, posts.user_id와 profiles.id가 같은 행끼리 연결해라."

> Supabase JavaScript 클라이언트에서는 JOIN 대신 **관계 데이터 조회** 문법을 사용한다. SQL JOIN을 직접 쓸 일은 적지만, 원리를 이해해야 10.2절에서 클라이언트 문법을 이해할 수 있다.

---

## 10.2 Supabase 클라이언트로 CRUD

SQL의 원리를 알았으니, 이제 JavaScript로 같은 작업을 한다. Supabase 클라이언트는 SQL과 거의 1:1로 대응된다.

### 10.2.1 select: 데이터 조회

> **Copilot 프롬프트**
> "Supabase 클라이언트로 posts 테이블의 모든 게시글을 최신순으로 조회하는 코드를 만들어줘.
> @supabase/ssr의 createBrowserClient를 사용하고, 에러 처리도 포함해줘."

<!-- COPILOT_VERIFY: Copilot이 .from("posts").select("*").order() 패턴을 올바르게 생성하는지 확인해주세요 -->

```javascript
import { createClient } from "@/lib/supabase";

const supabase = createClient();
// createClient()는 Ch8에서 만든 lib/supabase.js의 래퍼 함수
// 내부적으로 @supabase/ssr의 createBrowserClient를 호출한다

// 모든 게시글 조회 (최신순)
const { data: posts, error } = await supabase
  .from("posts")
  .select("*")
  .order("created_at", { ascending: false });

if (error) {
  console.error("조회 실패:", error.message);
} else {
  console.log("게시글:", posts);
}
```

**표 10.4** SQL <> Supabase 클라이언트 대응

| SQL | Supabase 클라이언트 | 설명 |
|-----|---------------------|------|
| `SELECT * FROM posts` | `.from("posts").select("*")` | posts 테이블의 모든 열 |
| `ORDER BY created_at DESC` | `.order("created_at", { ascending: false })` | 최신순 정렬 |
| `WHERE id = 1` | `.eq("id", 1)` | 조건 필터링 |
| `LIMIT 10` | `.limit(10)` | 개수 제한 |

코드의 핵심 패턴: **모든 Supabase 쿼리는 `{ data, error }` 형태로 응답한다**. `data`에 결과가, `error`에 에러 정보가 담긴다. 둘 중 하나는 항상 `null`이다.

### 10.2.2 insert: 데이터 생성

```javascript
// 새 게시글 생성
const { data, error } = await supabase
  .from("posts")
  .insert({
    title: "새 글 제목",
    content: "게시글 내용입니다.",
    user_id: user.id,  // 로그인한 사용자의 ID
  })
  .select();  // 생성된 데이터를 반환받으려면 .select() 추가
```

> `.select()`를 빼면 `data`가 `null`이 된다. 생성 후 바로 목록에 추가하려면 반드시 `.select()`를 체인한다.

### 10.2.3 update: 데이터 수정

```javascript
// 게시글 수정
const { data, error } = await supabase
  .from("posts")
  .update({
    title: "수정된 제목",
    content: "수정된 내용",
  })
  .eq("id", postId)  // 어떤 게시글을 수정할지
  .select();
```

> **주의**: `.eq("id", postId)` 없이 `.update()`를 실행하면 **모든 행이 수정된다**. 반드시 조건을 지정한다.

### 10.2.4 delete: 데이터 삭제

```javascript
// 게시글 삭제
const { error } = await supabase
  .from("posts")
  .delete()
  .eq("id", postId);
```

삭제에는 `.select()`가 필요 없다. 삭제된 데이터를 돌려받을 이유가 없기 때문이다.

**표 10.5** Supabase CRUD 요약

| 작업 | 메서드 | 조건 필요 | `.select()` 필요 |
|------|--------|:---------:|:----------------:|
| 조회 | `.select()` | 선택 | -- |
| 생성 | `.insert({...})` | 불필요 | 결과 필요 시 |
| 수정 | `.update({...})` | **필수** | 결과 필요 시 |
| 삭제 | `.delete()` | **필수** | 불필요 |

---

## 10.3 쿼리 심화

기본 CRUD를 넘어서, 실제 게시판에 필요한 심화 쿼리를 배운다.

### 10.3.1 필터링: eq, neq, gt, lt, like, ilike

Supabase 클라이언트는 다양한 **필터링**(Filtering) 메서드를 제공한다:

**표 10.6** Supabase 필터 메서드

| 메서드 | SQL 대응 | 의미 | 예시 |
|--------|---------|------|------|
| `.eq(col, val)` | `= val` | 같다 | `.eq("id", 1)` |
| `.neq(col, val)` | `!= val` | 같지 않다 | `.neq("status", "draft")` |
| `.gt(col, val)` | `> val` | 크다 | `.gt("views", 100)` |
| `.lt(col, val)` | `< val` | 작다 | `.lt("created_at", "2026-01-01")` |
| `.like(col, pat)` | `LIKE pat` | 패턴 매칭 (대소문자 구분) | `.like("title", "%Next%")` |
| `.ilike(col, pat)` | `ILIKE pat` | 패턴 매칭 (대소문자 무시) | `.ilike("title", "%next%")` |

> **나쁜 프롬프트**
> "게시글 검색 기능 만들어줘"

이 프롬프트로는 어떤 필드를 검색할지, 대소문자를 구분할지, 정렬은 어떻게 할지 AI가 알 수 없다.

> **Copilot 프롬프트**
> "Supabase에서 posts 테이블의 title과 content에서 키워드를 검색하는 함수를 만들어줘.
> ilike를 사용하고, 대소문자 무시, 결과는 최신순으로 정렬해줘."

### 10.3.2 정렬과 페이지네이션

게시글이 많아지면 한 번에 모두 불러오면 안 된다. **페이지네이션**(Pagination)으로 나누어 가져온다:

```javascript
// 페이지네이션: 페이지당 10개
const PAGE_SIZE = 10;
const page = 1; // 현재 페이지 (1부터 시작)

const { data: posts, error, count } = await supabase
  .from("posts")
  .select("*", { count: "exact" })  // 전체 개수도 함께 조회
  .order("created_at", { ascending: false })
  .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

// count로 전체 페이지 수 계산
const totalPages = Math.ceil(count / PAGE_SIZE);
```

**코드 읽기 가이드**:

**표 10.7** 페이지네이션 코드 해석

| 코드 | 의미 |
|------|------|
| `{ count: "exact" }` | 전체 게시글 수를 정확하게 세기 |
| `.range(start, end)` | start번째부터 end번째까지 가져오기 (0 기반) |
| `(page - 1) * PAGE_SIZE` | 1페이지: 0, 2페이지: 10, 3페이지: 20 |
| `page * PAGE_SIZE - 1` | 1페이지: 9, 2페이지: 19, 3페이지: 29 |

### 10.3.3 관계 데이터 조회

게시글 목록에 작성자 이름을 표시하려면 `profiles` 테이블의 데이터가 필요하다. Supabase는 JOIN 대신 **외래 키**(Foreign Key)를 따라가는 문법을 제공한다:

```javascript
// 게시글 + 작성자 정보 함께 조회
const { data: posts, error } = await supabase
  .from("posts")
  .select(`
    *,
    profiles (
      username,
      avatar_url
    )
  `)
  .order("created_at", { ascending: false });
```

결과 데이터 형태:

```json
[
  {
    "id": 1,
    "title": "첫 글",
    "content": "안녕하세요",
    "user_id": "uuid-123",
    "created_at": "2026-03-01T10:00:00",
    "profiles": {
      "username": "홍길동",
      "avatar_url": "https://..."
    }
  }
]
```

`posts.user_id -> profiles.id` 외래 키 관계를 Supabase가 자동으로 인식하여, `profiles` 안에 작성자 정보가 중첩된다.

> **핵심**: `.select("*, profiles(username, avatar_url)")`는 "posts의 모든 열과, 연결된 profiles의 username과 avatar_url을 가져와라"라는 뜻이다. SQL의 JOIN과 같은 결과이지만 문법이 훨씬 간결하다.

---

## 10.4 React와 CRUD 연결

> **라이브 코딩 시연**: 교수가 PostList, PostForm 컴포넌트를 만들며 Supabase CRUD가 React에서 어떻게 연결되는지 시연한다

이제 Supabase CRUD를 React 컴포넌트에 연결한다.

### 10.4.1 게시글 목록 조회

> **Copilot 프롬프트**
> "Next.js App Router에서 Supabase posts 테이블의 게시글 목록을 표시하는 컴포넌트를 만들어줘.
> 작성자 이름도 함께 표시하고, 최신순으로 정렬해줘.
> useEffect와 useState를 사용하는 클라이언트 컴포넌트로 만들어줘."

<!-- COPILOT_VERIFY: Copilot이 관계 데이터 조회(profiles 중첩)를 올바르게 사용하는지 확인해주세요 -->

> **함께 진행**: PostList 컴포넌트를 함께 만들며 Supabase 쿼리가 React에서 어떻게 연결되는지 확인한다

```jsx
// components/PostList.js
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("posts")
        .select("*, profiles(username)")
        .order("created_at", { ascending: false });

      if (!error) setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (posts.length === 0) return <p>게시글이 없습니다.</p>;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border rounded-lg p-4">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-gray-600 text-sm">
            {post.profiles?.username} · {new Date(post.created_at).toLocaleDateString()}
          </p>
          <p className="mt-2">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
```

**코드 읽기 가이드**:

- `useState([])` -- 게시글 배열, 초기값 빈 배열
- `useState(true)` -- 처음에는 로딩 상태
- `select("*, profiles(username)")` -- 게시글 + 작성자 이름
- `post.profiles?.username` -- `?.`(**옵셔널 체이닝**, Optional Chaining)으로 profiles가 없어도 에러 방지

### 10.4.2 게시글 작성 폼

> **Copilot 프롬프트**
> "Supabase에 게시글을 작성하는 React 폼 컴포넌트를 만들어줘.
> title과 content 입력 필드가 있고, 제출 시 posts 테이블에 insert해줘.
> 로그인한 사용자의 ID를 user_id로 넣어줘.
> useAuth Hook에서 user를 가져올 수 있어."

<!-- COPILOT_VERIFY: Copilot이 useAuth()에서 user.id를 가져와 insert에 포함하는지 확인해주세요 -->

```jsx
// components/PostForm.js
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function PostForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("posts")
      .insert({
        title: title.trim(),
        content: content.trim(),
        user_id: user.id,
      });

    if (error) {
      alert("작성 실패: " + error.message);
    } else {
      router.push("/");  // 목록으로 이동
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border rounded-lg"
        required
      />
      <textarea
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border rounded-lg h-40"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "작성 중..." : "게시글 작성"}
      </button>
    </form>
  );
}
```

### 10.4.3 게시글 수정/삭제

```javascript
// lib/posts.js — 게시글 관련 함수 모음
import { createClient } from "@/lib/supabase";

export async function updatePost(postId, { title, content }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .update({ title, content })
    .eq("id", postId)
    .select();
  return { data, error };
}

export async function deletePost(postId) {
  const supabase = createClient();
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId);
  return { error };
}
```

삭제 버튼을 구현할 때는 **확인 대화상자**를 반드시 넣는다:

```jsx
// 삭제 버튼 예시
<button
  onClick={async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const { error } = await deletePost(post.id);
    if (!error) router.refresh();
  }}
  className="text-red-500 hover:text-red-700"
>
  삭제
</button>
```

### 10.4.4 작성자 정보 표시

게시글 상세 페이지에서 작성자 정보를 표시하고, **본인 글일 때만 수정/삭제 버튼**을 보여준다:

```jsx
// 조건부 렌더링: 본인 글인지 확인
{user && user.id === post.user_id && (
  <div className="flex gap-2">
    <button onClick={() => router.push(`/posts/${post.id}/edit`)}>
      수정
    </button>
    <button onClick={() => handleDelete(post.id)}>
      삭제
    </button>
  </div>
)}
```

> 이 조건부 렌더링은 **UI만 숨기는 것**이다. 실제 보안은 Ch11의 **RLS(Row Level Security)**가 담당한다. 개발자 도구에서 직접 API를 호출하면 이 UI 제한은 무시할 수 있다. 반드시 서버 레벨 보안(RLS)이 필요하다.

_전체 프로젝트는 practice/chapter10/ 참고_

---

## 핵심 정리 + B회차 과제 스펙

### 이번 시간 핵심 3가지

1. **SQL CRUD 4대 명령**: `SELECT`(조회), `INSERT`(생성), `UPDATE`(수정), `DELETE`(삭제)
2. **Supabase 클라이언트는 SQL과 1:1 대응**: `.from().select()`, `.insert()`, `.update()`, `.delete()` — 모든 응답은 `{ data, error }`
3. **관계 데이터 조회**: `.select("*, profiles(username)")` — JOIN 대신 외래 키 기반 문법

### B회차 과제 스펙

**게시판 CRUD 완성 + 배포**:
1. 게시글 목록 페이지 — 작성자 이름 표시, 최신순 정렬
2. 게시글 작성 페이지 — 로그인 사용자만 접근
3. 게시글 상세 페이지 — 본인 글에만 수정/삭제 버튼
4. 게시글 수정 기능
5. 게시글 삭제 기능 — 확인 대화상자 포함
6. GitHub push + Vercel 배포

**스타터 코드**: `practice/chapter10/starter/` — 게시판 프론트엔드(인증 포함)가 준비되어 있고, CRUD 함수 부분이 TODO로 비어 있다.

---

## Exit ticket

다음 코드에서 위험한 부분을 찾아라:

```javascript
await supabase
  .from("posts")
  .update({ title: "수정된 제목" });
```

정답: `.eq("id", postId)`가 없어서 **posts 테이블의 모든 행의 제목이 수정된다**. update/delete에는 반드시 조건을 지정해야 한다.

---

## 교수 메모

**준비물 체크리스트**:
- [ ] Supabase 대시보드에 테스트용 게시글 3~5개 미리 입력 (SQL Editor에서)
- [ ] SQL 4대 명령 비교 슬라이드 (SELECT/INSERT/UPDATE/DELETE)
- [ ] Supabase 클라이언트 <> SQL 대응 표 (학생 참고용)
- [ ] PostList, PostForm 예시 코드 (학생 복사 대비)
- [ ] "다른 사람 글도 수정 가능" 시연 준비 (Ch11 RLS 동기부여)

**수업 후 체크**:
- [ ] 학생들이 SQL CRUD 4대 명령의 의미를 구분할 수 있는가
- [ ] Supabase 클라이언트 `.from().select()` 패턴을 이해했는가
- [ ] `{ data, error }` 응답 패턴과 에러 처리의 중요성을 인식했는가
- [ ] "UI에서 숨기기 != 보안"이라는 포인트가 전달되었는가

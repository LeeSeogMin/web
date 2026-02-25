# Chapter 12. 에러 처리와 UX 완성 — A회차: 강의

> **미션**: 사용자가 불편함 없이 쓸 수 있는 앱으로 다듬는다

---

## 학습목표

1. 웹 애플리케이션에서 발생하는 에러 유형을 분류할 수 있다
2. try-catch와 Next.js error.js로 에러를 처리할 수 있다
3. Next.js loading.js와 스켈레톤 UI로 로딩 상태를 표시할 수 있다
4. 클라이언트 사이드 폼 유효성 검증을 구현할 수 있다
5. next/image로 이미지를 최적화하고 메타데이터를 설정할 수 있다

---

## 수업 타임라인

**표 12.1** A회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | 오늘의 미션 + 빠른 진단 |
| 00:05~00:30 | 에러의 종류 + 에러 처리 패턴 |
| 00:30~00:55 | 로딩 상태 관리 + 폼 유효성 검증 |
| 00:55~01:20 | 라이브 코딩 시연: error.js + loading.js + 스켈레톤 UI + 폼 검증 + next/image |
| 01:20~01:27 | 핵심 정리 + B회차 과제 스펙 공개 |
| 01:27~01:30 | Exit ticket |

---

## 오늘의 미션 + 빠른 진단

> **오늘의 질문**: "게시판에서 인터넷이 끊기면 어떤 화면이 보여야 하는가? 흰 화면? 아니면 '인터넷 연결을 확인해주세요' 메시지?"

**빠른 진단** (1문항):

다음 중 사용자에게 보여주기에 가장 적절한 에러 메시지는?
- (A) `Error: 42501`
- (B) `RLS policy violation for table "posts"`
- (C) "이 게시글을 수정할 권한이 없습니다."

정답: (C) — 개발자용 에러 코드가 아닌, 사용자가 이해할 수 있는 메시지를 보여줘야 한다.

---

## 12.1 에러의 종류

지금까지 만든 게시판은 **정상 동작할 때는 잘 되지만, 문제가 생기면 흰 화면**이 나온다. 인터넷이 끊기거나, 로그인이 만료되거나, 잘못된 데이터를 입력하면 사용자는 무슨 일이 일어났는지 알 수 없다.

좋은 앱은 **에러 처리**(Error Handling)를 통해 사용자에게 무슨 문제인지 알려주고, 어떻게 해결할 수 있는지 안내한다.

### 12.1.1 네트워크 에러

인터넷 연결이 끊기거나 서버가 응답하지 않을 때 발생한다:

```javascript
// 네트워크 에러 예시
const { data, error } = await supabase.from("posts").select("*");
// error: { message: "Failed to fetch", code: "NETWORK_ERROR" }
```

원인: Wi-Fi 끊김, 서버 다운, 요청 타임아웃

### 12.1.2 인증 에러

로그인이 만료되었거나 인증 토큰이 유효하지 않을 때 발생한다:

```javascript
// 인증 에러 예시
const { error } = await supabase.auth.getUser();
// error: { message: "JWT expired", code: "session_expired" }
```

원인: 오래 방치하여 토큰 만료, 쿠키 삭제, 다른 기기에서 로그아웃

### 12.1.3 권한 에러

Ch11에서 다룬 RLS 정책에 의해 접근이 거부될 때 발생한다:

```javascript
// 권한 에러 예시: 다른 사람 글 삭제 시도
const { error } = await supabase.from("posts").delete().eq("id", 1);
// error: { message: "new row violates row-level security policy", code: "42501" }
```

원인: RLS 정책 위반, 미인가 접근 시도

### 12.1.4 유효성 검증 에러

사용자가 입력한 데이터가 규칙에 맞지 않을 때 발생한다:

```javascript
// 유효성 에러 예시: 빈 제목으로 게시글 작성
const { error } = await supabase.from("posts").insert({ title: "", content: "내용" });
// error: { message: "null value in column \"title\" violates not-null constraint" }
```

원인: 필수 필드 비어있음, 형식 불일치, 길이 초과

**표 12.2** 에러 유형별 사용자 메시지

| 에러 유형 | 코드/상태 | 사용자에게 보여줄 메시지 | 조치 |
|-----------|----------|----------------------|------|
| 네트워크 | `NETWORK_ERROR` | "인터넷 연결을 확인해주세요" | 재시도 버튼 |
| 인증 | `session_expired` | "로그인이 만료되었습니다" | 로그인 페이지로 이동 |
| 권한 | `42501` | "이 작업을 수행할 권한이 없습니다" | 이전 페이지로 이동 |
| 유효성 | not-null 등 | "제목을 입력해주세요" | 입력 필드 강조 |

> **강의 팁**: 개발자에게 보여주는 에러(console.error)와 사용자에게 보여주는 에러(UI)를 반드시 구분한다. 사용자에게 `42501` 같은 코드를 보여주면 안 된다.

---

## 12.2 에러 처리 패턴

### 12.2.1 try-catch 구조화

**try-catch**는 비동기 함수에서 에러를 처리하는 기본 패턴이다:

```javascript
// 에러 처리 유틸리티 함수
export async function fetchPosts() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*, profiles(username)")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("게시글 조회 실패:", error);
    return { data: null, error: getUserMessage(error) };
  }
}

// 에러 코드 → 사용자 메시지 변환
function getUserMessage(error) {
  if (error.code === "PGRST301") return "요청한 데이터를 찾을 수 없습니다.";
  if (error.code === "42501") return "이 작업을 수행할 권한이 없습니다.";
  if (error.message?.includes("Failed to fetch")) return "인터넷 연결을 확인해주세요.";
  return "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
}
```

**표 12.3** try-catch 에러 처리 패턴

| 부분 | 역할 |
|------|------|
| `try { ... }` | 에러가 발생할 수 있는 코드를 감싸기 |
| `if (error) throw error` | Supabase의 에러를 catch로 전달 |
| `catch (error) { ... }` | 에러 발생 시 실행될 코드 |
| `console.error(...)` | 개발자용 로그 (브라우저 콘솔) |
| `getUserMessage(error)` | 사용자용 메시지로 변환 |

> 왜 Supabase 에러를 다시 `throw`하는가? Supabase 클라이언트는 에러가 발생해도 예외를 던지지 않는다. `{ data: null, error: {...} }` 형태로 반환한다. `throw`로 에러를 catch 블록에 전달하면 네트워크 에러와 Supabase 에러를 **한 곳에서 통합 처리**할 수 있다.

### 12.2.2 Next.js error.js 활용

Next.js App Router는 파일 기반 에러 처리를 제공한다. 폴더에 **error.js**(Error Boundary File)를 넣으면, 해당 폴더와 하위 경로에서 발생하는 에러를 자동으로 잡는다:

> **Copilot 프롬프트**
> "Next.js App Router에서 error.js를 사용한 에러 처리 컴포넌트를 만들어줘.
> 에러 메시지를 보여주고, '다시 시도' 버튼을 포함해줘.
> 'use client' 지시어를 붙여줘."

<!-- COPILOT_VERIFY: Copilot이 error와 reset props를 사용하는 error.js를 올바르게 생성하는지 확인해주세요 -->

> **라이브 코딩 시연**: error.js를 함께 만들고, 의도적으로 에러를 발생시켜 동작을 확인한다

```jsx
// app/error.js
"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h2 className="text-2xl font-bold text-red-600">문제가 발생했습니다</h2>
      <p className="text-gray-600">{error.message || "일시적인 오류입니다."}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        다시 시도
      </button>
    </div>
  );
}
```

**표 12.4** error.js 컴포넌트의 props

| prop | 타입 | 역할 |
|------|------|------|
| `error` | Error | 발생한 에러 객체 |
| `reset` | Function | 에러 상태를 초기화하고 컴포넌트를 다시 렌더링 |

> `error.js`는 반드시 **클라이언트 컴포넌트**(`"use client"`)여야 한다. 서버 컴포넌트에서 발생한 에러도 이 컴포넌트가 잡아준다.

> **보안 참고**: Next.js는 프로덕션 빌드에서 `error.message`의 내부 정보를 자동으로 제거하여 일반적인 메시지만 전달한다. 하지만 개발 모드에서는 상세 에러가 그대로 보이므로, `getUserMessage()` 같은 변환 함수를 사용하는 것이 더 안전하다.

### 12.2.3 사용자 친화적 에러 메시지

에러 메시지 작성의 3가지 원칙:

1. **무엇이 잘못되었는지** 알려준다 ("게시글을 불러올 수 없습니다")
2. **왜 발생했는지** 가능하면 설명한다 ("인터넷 연결이 불안정합니다")
3. **어떻게 해결할 수 있는지** 안내한다 ("다시 시도 버튼을 눌러주세요")

**표 12.5** 좋은 에러 메시지 vs 나쁜 에러 메시지

| 나쁜 메시지 | 좋은 메시지 |
|------------|-----------|
| `Error: 42501` | "이 게시글을 수정할 권한이 없습니다." |
| `Failed to fetch` | "인터넷 연결을 확인하고 다시 시도해주세요." |
| `null value in column "title"` | "제목을 입력해주세요." |
| `Something went wrong` | "게시글 저장 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요." |

---

## 12.3 로딩 상태 관리

데이터를 불러오는 동안 사용자에게 아무것도 보여주지 않으면, 앱이 멈춘 것처럼 느껴진다. 로딩 상태를 표시하면 "지금 처리 중"이라는 피드백을 준다.

### 12.3.1 Next.js loading.js 활용

`error.js`처럼, **loading.js**(Loading UI File)를 폴더에 넣으면 해당 경로의 **서버 컴포넌트가 데이터를 가져오는 동안** 자동으로 표시된다:

```jsx
// app/loading.js
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
    </div>
  );
}
```

`animate-spin`은 Tailwind CSS가 제공하는 회전 애니메이션이다. 별도의 라이브러리 없이 스피너를 만들 수 있다.

> `loading.js`는 React Suspense를 내부적으로 사용한다. 이 파일이 있으면 Next.js가 자동으로 `<Suspense fallback={<Loading />}>`를 감싸준다.

### 12.3.2 스켈레톤 UI with Tailwind

**스켈레톤 UI**(Skeleton UI)는 콘텐츠가 로드되기 전에 **레이아웃의 뼈대**를 미리 보여주는 패턴이다. 빈 화면이나 스피너보다 사용자 경험이 좋다.

> **Copilot 프롬프트**
> "Tailwind CSS로 게시글 목록의 스켈레톤 UI를 만들어줘.
> 제목, 작성자, 날짜 자리에 회색 막대가 반짝이는(pulse) 애니메이션으로 표시해줘.
> 3개의 카드를 보여줘."

<!-- COPILOT_VERIFY: Copilot이 animate-pulse를 사용한 스켈레톤 UI를 생성하는지 확인해주세요 -->

```jsx
// components/PostListSkeleton.js
export default function PostListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border rounded-lg p-4 animate-pulse">
          {/* 제목 자리 */}
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          {/* 작성자 + 날짜 자리 */}
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
          {/* 내용 자리 */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

**코드 읽기 가이드**:

- `animate-pulse` — Tailwind의 깜빡임 애니메이션 (로딩 중임을 표현)
- `h-6 bg-gray-200 rounded w-3/4` — 높이 6, 회색 배경, 둥근 모서리, 너비 75%
- `[1, 2, 3].map(...)` — 3개의 카드 반복 (실제 데이터 대신 자리 표시)

스켈레톤 UI는 실제 콘텐츠와 **같은 레이아웃**이어야 한다. 데이터가 로드되면 스켈레톤이 실제 콘텐츠로 자연스럽게 교체된다.

**표 12.6** 로딩 표시 방법 비교

| 방법 | 장점 | 단점 | 권장 사용처 |
|------|------|------|-----------|
| 빈 화면 | 구현 불필요 | 앱이 멈춘 것 같음 | 사용하지 않음 |
| 스피너 | 구현 간단 | 얼마나 기다려야 하는지 모름 | 짧은 작업 (저장, 삭제) |
| 스켈레톤 UI | 레이아웃 미리 보여줌 | 구현 비용 있음 | 목록, 상세 페이지 |
| Optimistic UI | 즉각 반응 | 실패 시 롤백 필요 | 좋아요, 팔로우 |

### 12.3.3 Optimistic UI 패턴

**Optimistic UI**(낙관적 UI)는 서버 응답을 기다리지 않고 **성공을 가정하고 UI를 먼저 업데이트**하는 패턴이다. 응답이 실패하면 원래 상태로 되돌린다.

예: "좋아요" 버튼을 누르면 즉시 숫자가 올라가고, 서버 요청이 실패하면 다시 내려간다.

```javascript
// Optimistic UI 패턴 (개념 코드)
async function handleLike(postId) {
  // 1. UI를 먼저 업데이트 (낙관적)
  setLikeCount((prev) => prev + 1);

  // 2. 서버에 요청
  const { error } = await supabase.from("likes").insert({ post_id: postId });

  // 3. 실패하면 원래대로
  if (error) {
    setLikeCount((prev) => prev - 1);
    alert("좋아요 실패");
  }
}
```

> 이 수업의 게시판에서는 Optimistic UI를 직접 구현하지 않는다. 개인 프로젝트에서 "좋아요" 등 빠른 반응이 필요한 기능에 활용할 수 있다.

---

## 12.4 폼 유효성 검증

### 12.4.1 클라이언트 사이드 검증

사용자가 잘못된 데이터를 입력하면 **서버에 보내기 전에** **클라이언트 사이드 검증**(Client-side Validation)으로 먼저 거른다. 서버 왕복을 줄이고, 즉각적인 피드백을 줄 수 있다.

> **Copilot 프롬프트**
> "React에서 게시글 작성 폼의 유효성 검증을 구현해줘.
> 제목: 필수, 2~100자. 내용: 필수, 10자 이상.
> 각 필드 아래에 에러 메시지를 빨간색으로 표시해줘.
> useState로 에러 상태를 관리해줘."

비교를 위해:

> **나쁜 프롬프트**
> "폼 유효성 검증 추가해줘"

이 프롬프트로는 어떤 필드에 어떤 규칙을 적용할지 AI가 알 수 없다. HTML5 기본 검증만 사용하거나, 라이브러리(zod, yup)를 도입할 수도 있다.

<!-- COPILOT_VERIFY: Copilot이 useState 기반의 간단한 유효성 검증을 생성하는지 확인해주세요 -->

```jsx
// components/PostForm.js (유효성 검증 추가 버전)
"use client";

import { useState } from "react";

export default function PostForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "제목을 입력해주세요.";
    else if (title.trim().length < 2) newErrors.title = "제목은 2자 이상이어야 합니다.";
    else if (title.trim().length > 100) newErrors.title = "제목은 100자 이하여야 합니다.";

    if (!content.trim()) newErrors.content = "내용을 입력해주세요.";
    else if (content.trim().length < 10) newErrors.content = "내용은 10자 이상이어야 합니다.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ title: title.trim(), content: content.trim() });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-3 border rounded-lg ${errors.title ? "border-red-500" : ""}`}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>
      <div>
        <textarea
          placeholder="내용을 입력하세요 (10자 이상)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full p-3 border rounded-lg h-40 ${errors.content ? "border-red-500" : ""}`}
        />
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
      </div>
      <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-lg">
        게시글 작성
      </button>
    </form>
  );
}
```

**표 12.7** 폼 유효성 검증 코드 핵심

| 부분 | 역할 |
|------|------|
| `useState({})` | 에러 메시지를 필드별로 저장 |
| `validate()` | 모든 필드를 검사하고 에러 객체 생성 |
| `Object.keys(newErrors).length === 0` | 에러가 없으면 `true` (유효함) |
| `border-red-500` | 에러가 있는 필드에 빨간 테두리 |
| `{errors.title && <p>...}` | 에러 메시지가 있을 때만 표시 |

### 12.4.2 에러 메시지 표시 UX

에러 메시지의 UX 원칙:

1. **에러 필드 바로 아래에 표시** — 사용자가 어디를 고쳐야 하는지 즉시 알 수 있다
2. **빨간색으로 강조** — 시각적으로 구분 (`text-red-500`, `border-red-500`)
3. **제출 시 한 번에 검증** — 입력할 때마다 검증하면 사용자를 방해한다
4. **구체적 메시지** — "입력 오류"가 아니라 "제목은 2자 이상이어야 합니다"

> **강의 팁**: "에러 메시지 리디자인" 활동을 해볼 수 있다. 나쁜 에러 메시지 5개를 슬라이드에 보여주고, 학생들에게 좋은 메시지로 바꿔보게 한다. 예: `PGRST301` → "요청한 게시글을 찾을 수 없습니다."

---

## 12.5 성능 기초

> **라이브 코딩 시연**: 교수가 next/image와 메타데이터를 설정하는 과정을 시연하고, 기존 `<img>` 태그와 비교한다.

### 12.5.1 이미지 최적화: next/image

Next.js는 `next/image` 컴포넌트로 이미지를 자동 최적화한다:

```jsx
import Image from "next/image";

// 일반 <img> 태그 — 최적화 없음
<img src="/hero.png" alt="히어로 이미지" />

// next/image — 자동 최적화
<Image
  src="/hero.png"
  alt="히어로 이미지"
  width={800}
  height={400}
  priority  // 첫 화면에 보이는 이미지에만 추가
/>
```

**표 12.8** next/image가 해주는 것

| 최적화 | 설명 |
|--------|------|
| **포맷 변환** | PNG/JPG → WebP 자동 변환 (파일 크기 30~50% 감소) |
| **크기 조절** | 요청된 크기에 맞게 리사이징 |
| **지연 로딩** | 화면에 보일 때만 로드 (기본값) |
| **캐싱** | 한 번 최적화된 이미지를 캐시 |

> `width`와 `height`는 필수이다. 이 값이 없으면 이미지가 로드될 때 레이아웃이 밀리는 **레이아웃 시프트**(Layout Shift)가 발생한다. 사용자 프로필 이미지처럼 동적 URL이면 `fill` 속성을 사용한다.

### 12.5.2 메타데이터와 SEO

Next.js App Router에서는 `metadata` 객체를 export하면 `<head>` 태그에 자동 반영된다:

```javascript
// app/layout.js
export const metadata = {
  title: "My Board — 게시판",
  description: "Next.js + Supabase로 만든 게시판",
};
```

페이지별로 다른 메타데이터도 설정할 수 있다:

```javascript
// app/posts/[id]/page.js
export async function generateMetadata({ params }) {
  const { id } = await params;  // Next.js 15+에서 params는 Promise
  const post = await fetchPost(id);
  return {
    title: `${post.title} — My Board`,
    description: post.content.slice(0, 100),
  };
}
```

> SEO는 검색엔진이 페이지 내용을 이해하도록 돕는 것이다. 게시판에서는 `title`과 `description`만 설정해도 충분하다.

> **Copilot 프롬프트**
> "Next.js App Router에서 게시판 앱의 metadata를 설정해줘.
> 전체 사이트 제목은 'My Board'이고, 게시글 상세 페이지에서는 게시글 제목이 들어가게 해줘.
> generateMetadata 함수를 사용하고, Supabase에서 게시글 데이터를 가져와서 title과 description을 설정해줘."

<!-- COPILOT_VERIFY: Copilot이 Next.js 15+에서 params를 await하는 generateMetadata를 생성하는지 확인해주세요 -->

### 12.5.3 Agent Skills로 에러 처리 규칙 자동화

Ch2에서 배운 Agent Skills를 에러 처리에도 활용할 수 있다. `.github/skills/error-handling/SKILL.md`를 생성하면, AI가 코드를 작성할 때 에러 처리 규칙을 **자동으로 따르도록** 강제할 수 있다:

```markdown
---
name: Error Handling & UX
description: 에러 처리와 사용자 피드백 규칙을 강제합니다.
when: "에러", "error", "try-catch", "loading", "skeleton", "유효성", "validation" 키워드 포함 시
---

## 규칙
1. 모든 Supabase 호출은 try-catch로 감싸고, getUserMessage()로 사용자 메시지 변환
2. 사용자에게 기술 에러 코드(42501, PGRST301 등) 직접 노출 금지
3. 데이터 로딩 시 반드시 loading 상태 표시 (스켈레톤 UI 우선)
4. 폼은 서버 전송 전에 클라이언트 유효성 검증 필수
5. 에러 메시지 3원칙: 무엇이 잘못되었는지 + 왜 + 어떻게 해결하는지
6. 이미지는 next/image 사용, alt 속성 필수
```

이 Skill이 있으면 Agent 모드에서 "게시글 수정 기능 추가해줘"라고 할 때, AI가 자동으로 try-catch, 로딩 상태, 유효성 검증을 포함한 코드를 생성한다.

### 12.5.4 참고 — 테스트 및 디버깅 MCP 서버

> 이 절은 **참고 사항**이다. 수업에서는 다루지 않지만, 에러 처리와 UX를 체계적으로 검증하고 싶은 학생을 위한 정보이다.

Ch2에서 MCP의 개념을 소개했다. 에러 처리와 UX 테스트에 특히 유용한 MCP 서버 2가지를 소개한다:

**표 12.9** 테스트 및 디버깅 MCP 서버 (참고용)

| MCP 서버 | 용도 | 활용 시나리오 |
|----------|------|-------------|
| **Playwright MCP** | 브라우저 자동화/E2E 테스트/스크린샷 캡처 | "빈 제목으로 제출 시 에러 메시지가 나타나는가?" 같은 시나리오를 자동으로 검증 |
| **Chrome DevTools MCP** | 실시간 Chrome DevTools 제어 (Network/Console) | 네트워크 에러 시뮬레이션, 콘솔 에러 확인, Lighthouse 접근성 점수 측정 |

**Playwright MCP 활용 예시**: Agent 모드에서 다음과 같이 요청할 수 있다.

> **Copilot 프롬프트** (Playwright MCP 활성화 시)
> "@playwright 게시판 앱의 폼 유효성을 테스트해줘.
> 1. 빈 제목으로 제출 시 에러 메시지가 표시되는지 확인
> 2. 10자 미만 내용으로 제출 시 에러가 나타나는지 확인
> 3. 올바른 데이터로 제출이 성공하는지 확인
> 각 단계마다 스크린샷을 캡처해줘."

이런 자동화 테스트는 수동으로 하면 시간이 많이 걸리지만, MCP를 활용하면 AI가 브라우저를 직접 조작하여 검증한다. 다만 **학생 Pro quota(월 300회)를 소모**하므로, 과제 제출 전 최종 점검 용도로만 사용하는 것을 권장한다.

---

## 핵심 정리 + B회차 과제 스펙

### 이번 시간 핵심 3가지

1. **에러 4종류**: 네트워크, 인증, 권한, 유효성 — 각각 다른 메시지와 조치가 필요하다
2. **파일 기반 처리**: error.js(에러 UI) + loading.js(로딩 UI)를 폴더에 넣으면 자동 적용된다
3. **에러 메시지 3원칙**: 무엇이 잘못되었는지 + 왜 발생했는지 + 어떻게 해결하는지

### B회차 과제 스펙

**게시판 UX 완성**:
1. `app/error.js` — 에러 처리 페이지 (다시 시도 버튼 포함)
2. `app/loading.js` — 로딩 스피너 또는 스켈레톤 UI
3. 게시글 작성 폼 유효성 검증 (제목 필수 2~100자, 내용 필수 10자 이상)
4. `next/image` 사용 (프로필 이미지 또는 로고)
5. `metadata` 설정 (title, description)
6. 에러 메시지가 사용자 친화적인지 확인
7. 배포 URL 제출

**스타터 코드**: `practice/chapter12/starter/` — Ch11까지 완성된 게시판 앱(RLS 적용)에서 에러/로딩 처리가 빠진 상태이다. B회차에서 이 코드를 기반으로 시작한다.

---

## Exit ticket

다음 코드에서 개선해야 할 부분을 모두 찾아라:

```jsx
export default function PostList({ posts, error }) {
  return (
    <div>
      {error && <p>{error.code}</p>}
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

정답: (1) 에러 코드(`error.code`)를 직접 노출 — 사용자 친화적 메시지로 변환 필요, (2) 로딩 상태가 없음 — 데이터를 가져오는 동안 표시할 UI 필요, (3) posts가 빈 배열일 때 "게시글이 없습니다" 표시 없음

---

## 교수 메모

**준비물 체크리스트**:
- [ ] B회차 스타터 코드 준비 (`practice/chapter12/starter/`)
- [ ] 에러 상황 시연 준비 (Chrome DevTools → Network → Offline)
- [ ] 스켈레톤 UI 예시 사이트 (YouTube, Facebook 등 — 로딩 시 스켈레톤 보이는 사이트)
- [ ] error.js, loading.js 예시 코드 준비
- [ ] "에러 메시지 리디자인" 활동 슬라이드 (나쁜 메시지 → 좋은 메시지로 변환하기)

**수업 후 체크**:
- [ ] 학생들이 에러 4종류를 구분할 수 있는가
- [ ] error.js / loading.js 파일 기반 처리를 이해했는가
- [ ] 사용자 친화적 에러 메시지의 3원칙을 이해했는가

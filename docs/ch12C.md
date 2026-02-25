# Chapter 12. 에러 처리와 UX 완성 — C: 모범 구현 + 해설

> B회차 과제 제출 후 공개

---

## 모범 구현 코드 해설

_전체 프로젝트는 practice/chapter12/complete/ 참고_

### 전체 구조

```
practice/chapter12/complete/
├── app/
│   ├── layout.js       ← 공통 레이아웃 (metadata 설정)
│   ├── page.js         ← 게시글 목록 (Server Component)
│   ├── error.js        ← 에러 처리 (use client)
│   ├── loading.js      ← 로딩 UI
│   ├── globals.css     ← Tailwind 기본 import
│   ├── login/
│   │   └── page.js     ← 로그인 페이지
│   ├── posts/
│   │   ├── [id]/
│   │   │   └── page.js ← 게시글 상세 (generateMetadata)
│   │   └── new/
│   │       └── page.js ← 게시글 작성 (유효성 검증)
│   └── auth/
│       └── callback/
│           └── route.js ← OAuth 콜백
├── components/
│   ├── PostList.js     ← 게시글 목록 (로딩 + 에러 처리)
│   ├── PostForm.js     ← 게시글 폼 (유효성 검증)
│   └── PostListSkeleton.js ← 스켈레톤 UI
├── lib/
│   ├── supabase.js     ← Supabase 클라이언트
│   └── utils.js        ← getUserMessage 등 유틸리티
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

---

### error.js 핵심 포인트

#### 1. "use client" 필수

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

**왜 "use client"인가**: React의 Error Boundary는 클라이언트에서만 동작한다. Next.js가 error.js를 Error Boundary로 감싸주기 때문에 반드시 클라이언트 컴포넌트여야 한다. 이것을 빠뜨리면 에러 페이지 자체가 렌더링되지 않는다.

**확인 포인트**:
- `error` prop으로 에러 정보를 받는다
- `reset()` 호출로 에러 상태를 초기화한다
- 에러 메시지가 없을 때 기본 메시지를 표시한다

#### 2. getUserMessage 유틸리티

```javascript
// lib/utils.js
export function getUserMessage(error) {
  if (error.code === "PGRST301") return "요청한 데이터를 찾을 수 없습니다.";
  if (error.code === "42501") return "이 작업을 수행할 권한이 없습니다.";
  if (error.code === "23505") return "이미 존재하는 데이터입니다.";
  if (error.message?.includes("Failed to fetch"))
    return "인터넷 연결을 확인해주세요.";
  if (error.message?.includes("JWT expired"))
    return "로그인이 만료되었습니다. 다시 로그인해주세요.";
  return "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
}
```

| 에러 코드 | 사용자 메시지 | 상황 |
|-----------|-------------|------|
| `PGRST301` | 데이터를 찾을 수 없습니다 | 존재하지 않는 게시글 접근 |
| `42501` | 권한이 없습니다 | RLS 정책 위반 |
| `23505` | 이미 존재합니다 | 중복 데이터 삽입 |
| `Failed to fetch` | 인터넷 연결 확인 | 네트워크 에러 |
| `JWT expired` | 다시 로그인 | 토큰 만료 |

---

### loading.js + 스켈레톤 UI 핵심 포인트

#### 3. loading.js

```jsx
// app/loading.js
import PostListSkeleton from "@/components/PostListSkeleton";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <PostListSkeleton />
    </div>
  );
}
```

**왜 스켈레톤을 loading.js에 넣는가**: loading.js는 서버 컴포넌트가 데이터를 가져오는 동안 자동으로 표시된다. 스피너보다 스켈레톤이 사용자 경험이 좋다 — 실제 콘텐츠와 같은 레이아웃을 미리 보여주기 때문이다.

#### 4. PostListSkeleton 컴포넌트

```jsx
// components/PostListSkeleton.js
export default function PostListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border rounded-lg p-4 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
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

| 클래스 | 의미 |
|--------|------|
| `animate-pulse` | 깜빡임 애니메이션 (로딩 표시) |
| `h-6 bg-gray-200 rounded w-3/4` | 제목 자리 — 높이 24px, 회색, 너비 75% |
| `h-4 bg-gray-200 rounded w-1/3` | 작성자/날짜 자리 — 높이 16px, 너비 33% |
| `space-y-2` | 내용 줄 사이 간격 8px |

---

### 폼 유효성 검증 핵심 포인트

#### 5. PostForm 유효성 검증

```jsx
// components/PostForm.js (핵심 부분)
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
```

**확인 포인트**:
- `trim()`으로 공백만 입력하는 경우를 방지한다
- 에러 객체를 필드별로 관리한다 (`{ title: "...", content: "..." }`)
- `Object.keys(newErrors).length === 0` — 에러가 없으면 true
- 에러가 있는 필드에 `border-red-500` 클래스를 조건부로 추가한다

#### 6. PostList 로딩 + 에러 통합

```jsx
// components/PostList.js (핵심 부분)
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// fetch 후 3가지 상태를 순서대로 확인
if (loading) return <PostListSkeleton />;
if (error) return <p className="text-red-500 p-4">{error}</p>;
if (posts.length === 0) return <p className="p-4">게시글이 없습니다.</p>;
```

**왜 이 순서인가**: loading → error → empty → data 순서로 확인해야 한다. loading이 true인데 데이터를 표시하려 하면 빈 화면이 깜빡인다. error가 있는데 데이터를 표시하려 하면 불완전한 UI가 보인다.

---

### 성능 최적화 핵심 포인트

#### 7. next/image 사용

```jsx
import Image from "next/image";

// 로고 이미지
<Image
  src="/logo.png"
  alt="게시판 로고"
  width={40}
  height={40}
/>

// 사용자 프로필 (외부 URL)
<Image
  src={user.avatar_url}
  alt={`${user.name} 프로필`}
  width={32}
  height={32}
  className="rounded-full"
/>
```

외부 URL 사용 시 next.config.js에 도메인을 추가해야 한다:

```javascript
// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",  // Google 프로필 이미지
      },
    ],
  },
};

module.exports = nextConfig;
```

#### 8. metadata 설정

```javascript
// app/layout.js
export const metadata = {
  title: "My Board — 게시판",
  description: "Next.js + Supabase로 만든 게시판",
};
```

---

## 채점 기준 참고

**표 12C.1** 채점 기준

| 항목 | 배점 | 기준 |
|------|------|------|
| 배포 URL 동작 | 7점 | 페이지가 정상적으로 렌더링되는가 |
| AI 검증 서술 | 3점 | AI가 틀린 부분을 구체적으로 설명했는가 |

**URL 동작 (7점)** 세부:
- error.js가 존재하고, 에러 발생 시 사용자 친화적 메시지를 표시한다 (2점)
- loading.js 또는 스켈레톤 UI가 로딩 중 표시된다 (2점)
- 폼 유효성 검증이 동작한다 (빈 제목 → 에러 메시지) (2점)
- next/image 또는 metadata 중 하나 이상 적용 (1점)

**AI 검증 서술 (3점)** 세부:
- AI가 틀린 부분을 1개 이상 구체적으로 지적했다 (2점)
- 어떻게 수정했는지 설명했다 (1점)

---

## 우수 구현 사례

### 사례 1: 에러 유형별 아이콘 분리

```jsx
// app/error.js — 에러 유형에 따라 다른 아이콘 표시
"use client";

export default function Error({ error, reset }) {
  const isNetwork = error.message?.includes("Failed to fetch");

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <div className="text-6xl">{isNetwork ? "🌐" : "⚠️"}</div>
      <h2 className="text-2xl font-bold text-red-600">
        {isNetwork ? "연결 문제" : "오류 발생"}
      </h2>
      <p className="text-gray-600">
        {isNetwork
          ? "인터넷 연결을 확인하고 다시 시도해주세요."
          : "일시적인 오류입니다. 잠시 후 다시 시도해주세요."}
      </p>
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

에러 유형에 따라 아이콘과 메시지를 분리한 사례. 네트워크 에러와 일반 에러를 구분하여 사용자에게 더 구체적인 안내를 제공했다.

### 사례 2: 실시간 유효성 검증

```jsx
// 제출 시에만 검증하는 것이 아니라, 입력 중에도 힌트를 제공
<div>
  <input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className={`w-full p-3 border rounded-lg ${errors.title ? "border-red-500" : ""}`}
  />
  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
  <p className="text-gray-400 text-xs mt-1">
    {title.trim().length}/100자
  </p>
</div>
```

입력 중 글자 수를 실시간으로 표시하여 사용자가 미리 확인할 수 있게 한 사례. 단, 에러 메시지 자체는 제출 시에만 표시하여 입력을 방해하지 않았다.

---

## 자주 하는 실수 정리

**표 12C.2** 학생들이 자주 하는 실수

| 실수 | 증상 | 해결 |
|------|------|------|
| error.js에 `"use client"` 누락 | 에러 발생 시 error.js가 동작하지 않음 | 파일 첫 줄에 `"use client"` 추가 |
| next/image에 width/height 누락 | 빌드 에러 또는 레이아웃 시프트 | width, height 속성 필수 |
| 외부 이미지 URL에 next.config.js 미설정 | 이미지 로드 실패 | `images.remotePatterns`에 도메인 추가 |
| 에러 메시지에 error.code 직접 표시 | 사용자에게 `42501` 같은 코드 노출 | getUserMessage() 함수로 변환 |
| loading/error 상태 순서 오류 | 잘못된 상태에서 렌더링 시도 | loading → error → empty → data 순서 |
| 유효성 검증 없이 서버에 전송 | DB 에러 발생 (not-null 등) | 클라이언트에서 먼저 검증 |
| `.env.local` 누락 | Supabase 연결 실패 | Ch8에서 사용한 환경 변수 복사 |
| metadata의 description 미설정 | SEO 점수 하락 | layout.js에 description 추가 |

---

## 다음 장 연결

게시판이 **완성**되었다. 기능(CRUD), 보안(RLS), UX(에러 처리, 로딩, 폼 검증) 모두 갖춘 풀스택 웹 앱이다.

Ch13에서는 이 경험을 바탕으로 **나만의 프로젝트**를 만든다. Ch7에서 작성한 설계서(ARCHITECTURE.md)를 꺼내고, Ch8~12에서 배운 기술을 조합하여 원하는 서비스를 구현한다. 최종 결과물은 Vercel에 배포하고 기말 과제로 제출한다.

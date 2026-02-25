# Chapter 9. Supabase Authentication — C: 모범 구현 + 해설

> B회차 과제 제출 후 공개

---

## 모범 구현 코드 해설

_전체 프로젝트는 practice/chapter9/complete/ 참고_

### 전체 구조

```
practice/chapter9/complete/
├── app/
│   ├── layout.js          ← AuthProvider로 감싸진 레이아웃
│   ├── page.js            ← 게시판 메인 (인증 연동)
│   ├── globals.css
│   └── auth/
│       └── callback/
│           └── route.js   ← OAuth 콜백 Route Handler
├── lib/
│   ├── supabase.js        ← 브라우저 클라이언트
│   └── auth.js            ← signInWithGoogle, signOut
├── contexts/
│   └── AuthContext.js      ← 전역 인증 상태 관리
├── components/
│   └── Navbar.js           ← 로그인/로그아웃 UI
├── middleware.js           ← 보호된 경로 인증 체크
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

---

### lib/auth.js 핵심 포인트

```javascript
import { createClient } from "@/lib/supabase";

export async function signInWithGoogle() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  return { data, error };
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  return { error };
}
```

**왜 이렇게 했는가**:

| 선택 | 이유 |
|------|------|
| `signInWithOAuth` | 소셜 로그인 전용 메서드, 비밀번호 관리 불필요 |
| `provider: "google"` | 이 수업에서는 Google OAuth만 사용 |
| `window.location.origin` | 로컬과 배포 환경 모두에서 동작하는 동적 URL |
| `/auth/callback` | Next.js Route Handler로 인증 코드를 처리하는 경로 |
| `{ data, error }` 반환 | 호출하는 쪽에서 에러 처리를 할 수 있도록 |

> **강의 팁**: `redirectTo`에 `"http://localhost:3000/auth/callback"`을 하드코딩한 학생이 있다면, "배포하면 안 된다"고 설명하고 `window.location.origin`을 사용하도록 안내한다.

---

### app/auth/callback/route.js 핵심 포인트

```javascript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(/* ... */);
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}/dashboard`);
    }
  }
  return NextResponse.redirect(`${origin}/?error=auth`);
}
```

**확인 포인트**:
- **Route Handler**(`route.js`)이므로 서버에서만 실행된다 — `createServerClient` 사용
- `exchangeCodeForSession(code)` — Google이 보낸 인증 코드를 JWT로 교환하는 핵심 함수
- 성공 시 `/dashboard`, 실패 시 `/?error=auth`로 리다이렉트
- `cookies()` 함수로 쿠키를 읽고 써서 세션을 관리한다

> 이 파일이 없으면 Google 로그인 후 앱으로 돌아오지 못한다. OAuth 흐름의 **마지막 단계**를 처리하는 필수 파일이다.

---

### contexts/AuthContext.js 핵심 포인트

```jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { signInWithGoogle, signOut } from "@/lib/auth";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // 1. 페이지 로드 시 현재 사용자 확인
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // 2. 로그인/로그아웃 이벤트 실시간 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // 3. 컴포넌트 해제 시 리스너 정리
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

**3가지 핵심 동작**:

1. **초기 확인** (`getUser()`): 페이지를 새로고침해도 로그인 상태가 유지되는 이유
2. **실시간 감지** (`onAuthStateChange`): 다른 탭에서 로그아웃해도 UI가 업데이트되는 이유
3. **클린업** (`unsubscribe()`): 메모리 누수를 방지하는 필수 패턴

> **강의 팁**: `onAuthStateChange`의 클린업을 빠뜨린 학생이 있다면, "리스너를 정리하지 않으면 컴포넌트가 사라져도 이벤트를 계속 처리해서 메모리 누수가 발생한다"고 설명한다.

---

### components/Navbar.js 핵심 포인트

```jsx
"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  if (loading) return <nav className="p-4">로딩 중...</nav>;

  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <h1 className="text-xl font-bold">My Board</h1>
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user.email}</span>
          <button onClick={signOut} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            로그아웃
          </button>
        </div>
      ) : (
        <button onClick={signInWithGoogle} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Google로 로그인
        </button>
      )}
    </nav>
  );
}
```

**조건부 렌더링 패턴**:

```text
loading === true  → "로딩 중..." (세션 확인 중)
user !== null     → 이메일 + 로그아웃 버튼
user === null     → "Google로 로그인" 버튼
```

이 패턴은 `loading` 상태를 반드시 먼저 확인한다. `loading`이 `true`인 상태에서 `user`를 확인하면, 로그인 상태인데도 잠깐 로그인 버튼이 보였다가 사라지는 **깜빡임**(flicker) 현상이 발생한다.

---

### middleware.js 핵심 포인트

```javascript
export async function middleware(request) {
  // ... Supabase 서버 클라이언트 생성
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/dashboard/:path*", "/posts/new", "/posts/:id/edit"],
};
```

**확인 포인트**:
- `middleware.js`는 프로젝트 **루트**에 위치한다 (`app/` 안이 아님)
- `config.matcher`에 지정된 경로에만 미들웨어가 실행된다
- 비로그인 사용자는 서버에서 `/login`으로 리다이렉트된다 — 클라이언트보다 안전

---

## 채점 기준 참고

**표 9C.1** 채점 기준

| 항목 | 배점 | 기준 |
|------|------|------|
| 배포 URL 동작 | 7점 | Google 로그인이 정상 동작하는가 |
| AI 검증 서술 | 3점 | AI가 틀린 부분을 구체적으로 설명했는가 |

**URL 동작 (7점)** 세부:
- 페이지가 에러 없이 렌더링된다 (2점)
- "Google로 로그인" 클릭 시 Google 로그인 화면이 나온다 (2점)
- 로그인 후 이메일이 Navbar에 표시된다 (2점)
- 로그아웃 버튼이 동작한다 (1점)

**AI 검증 서술 (3점)** 세부:
- AI가 틀린 부분을 1개 이상 구체적으로 지적했다 (2점)
- 어떻게 수정했는지 설명했다 (1점)

---

## 우수 구현 사례

### 사례 1: 로그인 페이지 분리

```jsx
// app/login/page.js
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { user, signInWithGoogle } = useAuth();
  const router = useRouter();

  // 이미 로그인 상태면 홈으로 리다이렉트
  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">로그인</h1>
        <p className="text-gray-600 mb-6">게시글을 작성하려면 로그인이 필요합니다.</p>
        <button
          onClick={signInWithGoogle}
          className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
        >
          Google 계정으로 로그인
        </button>
      </div>
    </div>
  );
}
```

별도의 로그인 페이지를 만들어 미들웨어에서 리다이렉트되는 경로(`/login`)에 대응한 사례. 과제 요구사항을 넘어서지만, 완성도가 높다.

### 사례 2: 프로필 이미지 표시

```jsx
// Navbar.js에서 user 객체의 메타데이터 활용
{user && (
  <div className="flex items-center gap-3">
    <img
      src={user.user_metadata?.avatar_url}
      alt="프로필"
      className="w-8 h-8 rounded-full"
    />
    <span className="text-sm">{user.user_metadata?.full_name || user.email}</span>
  </div>
)}
```

Google OAuth로 로그인하면 `user.user_metadata`에 이름, 프로필 사진 URL이 포함된다. 이를 활용하여 더 풍부한 UI를 만든 사례.

---

## 자주 하는 실수 정리

**표 9C.2** 학생들이 자주 하는 실수

| 실수 | 증상 | 해결 |
|------|------|------|
| Callback URL 미등록 | redirect_uri_mismatch 에러 | Google Console에 Supabase Callback URL 등록 |
| 배포 URL의 Callback 미등록 | 로컬은 OK, 배포에서 에러 | `https://app.vercel.app/auth/callback`도 등록 |
| `redirectTo` 하드코딩 | 배포 환경에서 로그인 실패 | `window.location.origin` 사용 |
| AuthProvider 미적용 | `useAuth()` undefined 에러 | layout.js에 `<AuthProvider>` 감싸기 |
| `onAuthStateChange` 클린업 누락 | 메모리 누수, 중복 업데이트 | useEffect return에서 `unsubscribe()` |
| Route Handler에 `createBrowserClient` 사용 | 서버에서 브라우저 API 접근 에러 | `createServerClient` 사용 |
| Test users 미등록 (Google OAuth) | 403 에러, 로그인 불가 | Google Console에서 본인 이메일을 Test users에 추가 |
| `middleware.js`를 `app/` 안에 배치 | 미들웨어 작동 안 함 | 프로젝트 루트로 이동 |

---

## 다음 장 연결

이번 장에서 Google 로그인을 구현했다. 이제 **누가 글을 쓰는지** 알 수 있다.

Ch10(Supabase Database CRUD)에서는 이 인증 정보를 활용하여:
- 로그인한 사용자만 게시글을 작성
- 게시글 목록에 작성자 이름 표시
- 본인 글만 수정/삭제 가능

오늘 만든 `AuthContext`, `useAuth()`, `lib/auth.js`가 Ch10에서 그대로 사용된다. 특히 `user.id`를 `posts.user_id`에 넣어서 "누가 이 글을 썼는가"를 기록하게 된다.

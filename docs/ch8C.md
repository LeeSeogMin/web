# Chapter 8. Supabase 시작하기 — C: 모범 구현 + 해설

> B회차 과제 제출 후 공개

---

## 모범 구현 코드 해설

_전체 프로젝트는 practice/chapter8/complete/ 참고_

### 전체 구조

```
practice/chapter8/complete/
├── app/
│   ├── layout.js       ← 공통 레이아웃
│   ├── page.js         ← 게시판 메인 (Supabase에서 데이터 읽기)
│   └── globals.css     ← Tailwind 기본 import
├── lib/
│   └── supabase.js     ← Supabase 브라우저 클라이언트 초기화
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

---

### lib/supabase.js 핵심 포인트

```javascript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
```

**왜 이렇게 했는가**:

| 선택 | 이유 |
|------|------|
| `@supabase/ssr`의 `createBrowserClient` | 쿠키 기반 세션을 자동 관리한다. Ch9(인증)에서 필수 |
| `process.env.NEXT_PUBLIC_...` | 환경 변수로 분리하여 키가 코드에 노출되지 않는다 |
| `createClient` 함수명 | Supabase 공식 문서와 동일, 프로젝트 내 일관성 |

> **강의 팁**: `@supabase/supabase-js`의 `createClient`를 직접 사용한 학생이 있다면, "지금은 동작하지만 Ch9에서 로그인 구현 시 쿠키 관리가 안 되어 문제가 생긴다"고 설명한다.

---

### SQL 테이블 핵심 포인트

#### 1. profiles 테이블

```sql
create table profiles (
  id uuid references auth.users(id) on delete cascade,
  username text,
  avatar_url text,
  created_at timestamptz default now(),
  primary key (id)
);
```

**확인 포인트**:
- `id`가 `uuid` 타입이다 — Supabase Auth의 사용자 ID가 UUID이므로 타입이 일치해야 한다
- `references auth.users(id)` — Supabase 내부의 인증 테이블과 연결된다
- `on delete cascade` — 사용자 계정을 삭제하면 프로필도 자동 삭제된다

#### 2. posts 테이블

```sql
create table posts (
  id bigint generated always as identity primary key,
  title text not null,
  content text not null,
  user_id uuid references profiles(id) on delete cascade not null,
  created_at timestamptz default now()
);
```

**확인 포인트**:
- `id`는 자동 증가 숫자 (`bigint generated always as identity`) — 게시글 ID는 순차 번호
- `title`, `content`에 `not null` — 빈 제목/내용의 게시글을 방지
- `user_id`가 `profiles.id`를 참조하는 외래 키 — 1:N 관계 형성
- `on delete cascade` — 작성자 프로필 삭제 시 게시글도 삭제

#### 3. 테이블 관계

```text
auth.users (Supabase 내부)
    │ id (uuid)
    ↓
profiles (공개 프로필)
    │ id (uuid, FK → auth.users)
    ↓
posts (게시글)
    │ user_id (uuid, FK → profiles)
```

3단계 참조 체인이다. 이 구조 덕분에 게시글 조회 시 `posts → profiles`를 JOIN하여 작성자 이름을 가져올 수 있다.

---

### page.js 핵심 포인트

#### 1. Supabase 데이터 읽기

```javascript
const { data, error } = await supabase
  .from("posts")
  .select("*, profiles(username)")
  .order("created_at", { ascending: false });
```

| 코드 | 의미 |
|------|------|
| `.from("posts")` | `posts` 테이블에서 |
| `.select("*")` | 모든 열을 가져오되 |
| `profiles(username)` | 연결된 `profiles` 테이블의 `username`도 함께 |
| `.order("created_at", { ascending: false })` | 최신순 정렬 |

**SQL로 표현하면**: `SELECT posts.*, profiles.username FROM posts JOIN profiles ON posts.user_id = profiles.id ORDER BY posts.created_at DESC`

Supabase 클라이언트가 이 복잡한 SQL을 메서드 체이닝으로 단순화한다. Ch10에서 이 패턴을 더 자세히 다룬다.

#### 2. 로딩/에러/빈 상태 처리

```jsx
{loading && <p>게시글을 불러오는 중...</p>}
{error && <p className="text-red-500">오류: {error}</p>}
{!loading && !error && posts.length === 0 && <p>아직 게시글이 없습니다.</p>}
```

3가지 상태를 모두 처리한다:
- **로딩 중**: 데이터를 가져오는 동안 표시
- **에러**: Supabase 연결 실패 또는 권한 문제
- **빈 데이터**: 테이블에 데이터가 없는 경우

이 패턴은 Ch12(에러 처리와 UX)에서 더 정교하게 다룬다.

---

## 채점 기준 참고

**표 8C.1** 채점 기준

| 항목 | 배점 | 기준 |
|------|------|------|
| 배포 URL 동작 | 7점 | 페이지가 정상적으로 렌더링되는가 |
| AI 검증 서술 | 3점 | AI가 틀린 부분을 구체적으로 설명했는가 |

**URL 동작 (7점)** 세부:
- 페이지가 에러 없이 렌더링된다 (3점)
- Supabase 연결이 정상이다 — 콘솔에 에러 없음 (2점)
- Table Editor에서 `profiles` + `posts` 테이블이 확인된다 (2점)

**AI 검증 서술 (3점)** 세부:
- AI가 틀린 부분을 1개 이상 구체적으로 지적했다 (2점)
- 어떻게 수정했는지 설명했다 (1점)

---

## 우수 구현 사례

### 사례 1: 환경 변수 유효성 검사 추가

```javascript
// lib/supabase.js
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase 환경 변수가 설정되지 않았습니다. .env.local을 확인하세요.");
  }

  return createBrowserClient(url, key);
}
```

환경 변수가 없을 때 명확한 에러 메시지를 출력한다. 디버깅 시간을 크게 줄여준다.

### 사례 2: 서버 컴포넌트용 클라이언트도 준비

```javascript
// lib/supabase-server.js
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}
```

Ch9(인증)에서 필요한 서버용 클라이언트를 미리 준비한 사례. 과제 요구사항을 넘어서지만, 다음 장에서 바로 활용된다.

---

## 자주 하는 실수 정리

**표 8C.2** 학생들이 자주 하는 실수

| 실수 | 증상 | 해결 |
|------|------|------|
| `.env` 사용 (`.env.local` 아님) | Git push 시 키 노출 위험 | `.env.local`로 변경, git 이력 확인 |
| `NEXT_PUBLIC_` 접두사 누락 | 브라우저에서 `undefined` | 환경 변수 이름 앞에 접두사 추가 |
| 환경 변수 수정 후 서버 재시작 안 함 | 이전 값 계속 사용 | `Ctrl+C`(macOS: `Cmd+C`) → `npm run dev` |
| SQL 두 번 실행 | "relation already exists" | 테이블 삭제 후 재실행 |
| `profiles` 전에 `posts` 생성 | 외래 키 참조 에러 | `profiles` → `posts` 순서 준수 |
| Vercel 환경 변수 미등록 | 배포 시 빌드 에러 또는 연결 실패 | Vercel Dashboard → Settings → Environment Variables |
| `service_role` 키 사용 | RLS 우회, 보안 취약점 | `anon` 키만 브라우저에서 사용 |
| `npm install` 누락 | `Module not found` | 스타터 폴더에서 `npm install` 실행 |

---

## 다음 장 연결

이번 장에서 Supabase를 연결하고 테이블을 만들었다. 하지만 아직 **누가 글을 쓰는지** 구분할 수 없다.

Ch9(Supabase Authentication)에서는 **Google 계정으로 로그인**하는 기능을 구현한다:
- OAuth 소셜 로그인 구현
- `signInWithOAuth` + 콜백 처리
- AuthContext로 인증 상태 전역 관리
- 보호된 페이지 (로그인 필요)

오늘 만든 `lib/supabase.js`와 `profiles` 테이블이 Ch9에서 그대로 사용되므로, 설정이 정확한지 다시 한 번 확인한다.

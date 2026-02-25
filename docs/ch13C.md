# Chapter 13. 개인 프로젝트 구현 — C: 모범 구현 + 해설

> B회차 과제 제출 후 공개

---

## 모범 구현 코드 해설

_전체 프로젝트는 practice/chapter13/complete/ 참고_

### 전체 구조

이 모범 구현은 "독서 기록 앱"을 예시로 한다. 학생 프로젝트는 주제가 다르지만, 구조와 패턴은 동일하게 적용된다.

```
practice/chapter13/complete/
├── app/
│   ├── layout.js       ← 공통 레이아웃 (metadata + AuthProvider)
│   ├── page.js         ← 메인 페이지 (책 목록)
│   ├── error.js        ← 에러 처리
│   ├── loading.js      ← 로딩 UI (스켈레톤)
│   ├── globals.css     ← Tailwind 기본 import
│   ├── login/
│   │   └── page.js     ← 로그인 페이지
│   ├── books/
│   │   ├── page.js     ← 책 목록 (Server Component)
│   │   ├── new/
│   │   │   └── page.js ← 책 등록 (Client Component + 유효성 검증)
│   │   └── [id]/
│   │       ├── page.js ← 책 상세
│   │       └── edit/
│   │           └── page.js ← 책 수정
│   └── auth/
│       └── callback/
│           └── route.js ← OAuth 콜백
├── components/
│   ├── BookCard.js     ← 책 카드 컴포넌트
│   ├── BookForm.js     ← 책 등록/수정 폼 (유효성 검증)
│   ├── BookListSkeleton.js ← 스켈레톤 UI
│   └── AuthButton.js   ← 로그인/로그아웃 버튼
├── lib/
│   ├── supabase.js     ← Supabase 클라이언트
│   └── utils.js        ← getUserMessage 등 유틸리티
├── .github/
│   └── copilot-instructions.md
├── ARCHITECTURE.md     ← 설계 문서
├── AI_LOG.md           ← AI 사용 로그
├── README.md           ← 프로젝트 설명
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

---

### 핵심 포인트 1: 프로젝트 구조

#### 파일 배치 원칙

```text
app/          ← 페이지 (라우팅)
components/   ← 재사용 UI 컴포넌트
lib/          ← 유틸리티 (Supabase 클라이언트, 헬퍼 함수)
```

이 3단 구조가 가장 기본이다. 모든 페이지는 `app/`에, 재사용하는 컴포넌트는 `components/`에, Supabase 클라이언트나 유틸리티 함수는 `lib/`에 넣는다.

**왜 이렇게 나누는가**: AI가 코드를 생성할 때 파일 위치를 일관되게 유지하려면, copilot-instructions.md에 이 구조를 명시해야 한다. 구조가 명확할수록 AI가 올바른 위치에 파일을 생성한다.

---

### 핵심 포인트 2: DB 테이블 + RLS

#### books 테이블 생성 SQL

```sql
-- Supabase SQL Editor에서 실행
CREATE TABLE books (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  author text,
  memo text,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- RLS 활성화
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- SELECT: 전체 허용
CREATE POLICY "books_select" ON books
  FOR SELECT USING (true);

-- INSERT: 로그인한 사용자만 (user_id = 본인)
CREATE POLICY "books_insert" ON books
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- UPDATE: 본인만
CREATE POLICY "books_update" ON books
  FOR UPDATE USING (auth.uid() = user_id);

-- DELETE: 본인만
CREATE POLICY "books_delete" ON books
  FOR DELETE USING (auth.uid() = user_id);
```

**확인 포인트**:
- `gen_random_uuid()` — Supabase가 기본 제공하는 UUID 생성 함수
- `REFERENCES auth.users(id)` — 외래 키로 인증 사용자와 연결
- RLS 정책 4개: SELECT(전체), INSERT/UPDATE/DELETE(본인만)
- `auth.uid()` — 현재 로그인한 사용자의 ID를 반환하는 Supabase 함수

---

### 핵심 포인트 3: 핵심 CRUD 패턴

#### 목록 조회 (Server Component)

```jsx
// app/books/page.js
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import BookCard from "@/components/BookCard";

export default async function BooksPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const { data: books, error } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error("책 목록을 불러올 수 없습니다.");

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">나의 독서 기록</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </main>
  );
}
```

**왜 Server Component인가**: 목록 조회는 사용자 상호작용이 없으므로 Server Component가 적합하다. 서버에서 데이터를 가져오므로 클라이언트에 JavaScript가 전송되지 않아 성능이 좋다.

#### 작성 폼 (Client Component + 유효성 검증)

```jsx
// components/BookForm.js (핵심 부분)
"use client";

import { useState } from "react";

export default function BookForm({ onSubmit, initialData }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [memo, setMemo] = useState(initialData?.memo || "");
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "제목을 입력해주세요.";
    else if (title.trim().length > 200) newErrors.title = "제목은 200자 이하여야 합니다.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ...handleSubmit, return JSX
}
```

**왜 Client Component인가**: 폼은 사용자 입력(onChange)과 상태(useState)가 필요하므로 Client Component여야 한다. `"use client"` 지시어를 반드시 붙인다.

---

### 핵심 포인트 4: ARCHITECTURE.md 예시

```markdown
# 독서 기록 앱 — ARCHITECTURE.md

## Page Map
- / — 메인 (로그인 유도)
- /books — 내 책 목록
- /books/new — 책 등록
- /books/[id] — 책 상세
- /books/[id]/edit — 책 수정
- /login — 로그인

## Data Model
- books: id(uuid, PK), title(text, NOT NULL), author(text),
         memo(text), user_id(uuid, FK→auth.users), created_at(timestamptz)
  - RLS: SELECT 전체, INSERT/UPDATE/DELETE 본인만
- profiles: id(uuid, PK, FK→auth.users), display_name(text), avatar_url(text)
  - RLS: SELECT 전체, UPDATE 본인만

## 인증
- Google OAuth
- 콜백: /auth/callback

## 기술 스택
- Next.js 14.2.21 (App Router)
- Tailwind CSS 3.4.17
- @supabase/supabase-js 2.47.12
- @supabase/ssr 0.5.2
- Vercel 배포
```

---

### 핵심 포인트 5: AI 사용 로그 예시

```markdown
# AI_LOG.md — 독서 기록 앱

## 로그 1: DB 테이블 생성
- 프롬프트: "books 테이블 생성 SQL 작성해줘. id, title, author, memo, user_id, created_at"
- AI 응답: SQL 생성 완료
- AI 실수: 없음
- 조치: —

## 로그 2: 책 목록 페이지
- 프롬프트: "books 테이블에서 목록을 읽어 카드형으로 보여주는 Server Component 만들어줘"
- AI 응답: app/books/page.js 생성
- AI 실수: createClient 사용 (구버전 @supabase/supabase-js 문법)
- 분류: 버전 불일치
- 해결: @supabase/ssr의 createServerClient로 변경
- 조치: copilot-instructions.md에 "createClient 사용 금지" 추가

## 로그 3: 책 등록 폼
- 프롬프트: "책 등록 폼을 만들어줘. 제목 필수, 200자 이하. 유효성 검증 포함."
- AI 응답: components/BookForm.js 생성
- AI 실수: 'use client' 누락
- 분류: 컨텍스트 소실 (Server Component가 기본이라는 규칙 미인지)
- 해결: 파일 첫 줄에 'use client' 추가
- 조치: —

## 로그 4: OAuth 로그인
- 프롬프트: "Google OAuth 로그인/로그아웃 구현해줘. @supabase/ssr 사용."
- AI 응답: login 페이지 + auth/callback 라우트 생성
- AI 실수: 콜백 URL에 localhost만 설정 (배포 URL 누락)
- 분류: 컨텍스트 소실
- 해결: Supabase 대시보드에 배포 URL도 콜백으로 추가
- 조치: ARCHITECTURE.md에 콜백 URL 목록 추가

## 로그 5: 삭제 기능
- 프롬프트: "책 삭제 기능 추가해줘. 삭제 전 확인 다이얼로그 표시."
- AI 응답: 삭제 버튼 + window.confirm 코드 생성
- AI 실수: 삭제 후 페이지 이동에 next/router 사용 (Pages Router)
- 분류: 버전 불일치
- 해결: next/navigation의 useRouter로 변경
- 조치: copilot-instructions.md에 "next/router 사용 금지" 추가
```

**좋은 로그의 특징**:
- 각 기능별로 하나의 항목
- AI 실수가 없는 경우에도 "없음"으로 기록
- 실수의 분류(3대 한계 중 어디에 해당하는지)가 명확
- 해결 방법과 재발 방지 조치가 구체적

---

## 채점 기준 참고

**표 13C.1** 기말 프로젝트 채점 기준 (상세)

| 평가 영역 | 비율 | A (우수) | B (보통) | C (미흡) |
|----------|:---:|---------|---------|---------|
| 기능 완성도 | 40% | MVP 전체 동작, CRUD + 인증 정상 | 핵심 1~2개 동작 | 부분 동작 또는 미동작 |
| 배포 상태 | 20% | URL 접속 + 전 기능 정상 | URL 접속 가능 + 일부 에러 | 빌드 실패 또는 미배포 |
| 코드 품질 | 20% | 구조 정리 + RLS + 환경 변수 분리 | 구조 정리 | 하드코딩/보안 이슈 |
| AI 활용 과정 | 20% | 로그 5건+ + 실수/수정 기록 충실 | 로그 3건+ | 로그 부실 또는 미작성 |

**채점 체크리스트** (교수용):
- [ ] 배포 URL에 접속하여 메인 페이지가 정상 표시되는가
- [ ] Google 로그인/로그아웃이 동작하는가
- [ ] 데이터 생성/읽기/수정/삭제 중 최소 2개가 동작하는가
- [ ] RLS 정책이 설정되어 있는가 (다른 사용자 데이터 수정/삭제 불가)
- [ ] 환경 변수가 하드코딩되어 있지 않은가
- [ ] error.js / loading.js가 존재하는가
- [ ] README.md가 프로젝트를 정확히 설명하는가
- [ ] AI_LOG.md에 최소 5개 항목이 있는가
- [ ] ARCHITECTURE.md가 보완되어 있는가
- [ ] copilot-instructions.md가 관리되고 있는가

---

## 우수 구현 사례

### 사례 1: 독서 통계 페이지 (Should have 구현)

```jsx
// app/books/stats/page.js — Must have를 완성한 후 추가한 기능
export default async function StatsPage() {
  const supabase = createServerClient(/* ... */);
  const { data: books } = await supabase
    .from("books")
    .select("*")
    .eq("user_id", (await supabase.auth.getUser()).data.user.id);

  const totalBooks = books?.length || 0;
  const thisMonth = books?.filter((b) =>
    new Date(b.created_at).getMonth() === new Date().getMonth()
  ).length || 0;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-blue-50 rounded-lg p-6 text-center">
        <p className="text-3xl font-bold text-blue-600">{totalBooks}</p>
        <p className="text-gray-600">전체 등록</p>
      </div>
      <div className="bg-green-50 rounded-lg p-6 text-center">
        <p className="text-3xl font-bold text-green-600">{thisMonth}</p>
        <p className="text-gray-600">이번 달</p>
      </div>
    </div>
  );
}
```

MVP(Must have)를 완성한 후 Should have 기능을 추가한 사례. 간단한 통계이지만 사용자에게 가치를 전달하는 좋은 확장이다.

### 사례 2: 검색 기능 (Should have 구현)

```jsx
// 검색 쿼리를 Supabase ilike로 처리
const { data } = await supabase
  .from("books")
  .select("*")
  .ilike("title", `%${searchQuery}%`)
  .order("created_at", { ascending: false });
```

Supabase의 `ilike` 필터를 활용한 대소문자 무시 검색. 데이터가 늘어나면 유용한 기능이다.

---

## 자주 하는 실수 정리

**표 13C.2** 학생들이 자주 하는 실수

| 실수 | 증상 | 해결 |
|------|------|------|
| Vercel 환경 변수 미등록 | 배포 후 흰 화면 또는 500 에러 | Vercel 대시보드에서 환경 변수 추가 후 재배포 |
| OAuth 콜백 URL 미등록 (배포) | 배포 후 로그인 실패 | Supabase에 `https://프로젝트.vercel.app/auth/callback` 추가 |
| `npm run build` 미실행 | Vercel 빌드 실패 | 로컬에서 먼저 `npm run build` 실행하여 에러 확인 |
| next/router 사용 | App Router에서 동작 안 함 | next/navigation으로 변경 |
| createClient 사용 | SSR에서 쿠키 접근 불가 | @supabase/ssr의 createServerClient 사용 |
| AI 사용 로그 미작성 | 기말 평가 AI 활용 영역 감점 | 기능 구현 시마다 즉시 기록 |
| README에 허위 기능 기재 | 검증 시 감점 | AI가 생성한 README를 실제 프로젝트와 대조 |
| 하드코딩된 Supabase 키 | 보안 이슈 + 코드 품질 감점 | `process.env.NEXT_PUBLIC_*` 사용 |

---

## 학기 마무리

한 학기 동안 빈 화면에서 시작하여 **풀스택 웹 앱**을 완성했다.

- Ch1: 개발 환경 설정 — VS Code, Node.js, Git, Vercel
- Ch2: AI 협업 방법 — Copilot, 프롬프트, Agent, Skills, MCP
- Ch3~4: HTML/CSS/JS 기초 — 구조와 스타일, 동적 기능
- Ch5~6: Next.js — App Router, 상태 관리, 데이터 페칭
- Ch7: 설계 — ARCHITECTURE.md, copilot-instructions.md, 디자인 시스템
- Ch8: Supabase — 데이터베이스, 테이블, SQL
- Ch9: 인증 — Google OAuth, 세션 관리
- Ch10: CRUD — 생성, 읽기, 수정, 삭제
- Ch11: 보안 — RLS, 권한 관리, 환경 변수
- Ch12: UX — 에러 처리, 로딩 UI, 폼 유효성 검증
- Ch13: 프로젝트 완성 — 설계 → 구현 → 배포 → 문서화

이 과정에서 배운 가장 중요한 것은 특정 기술이 아니라 **AI와 협업하는 방법**이다.

- **프롬프트 작성**: 기술 스택, 데이터 소스, UI 구조를 명시하여 AI의 추측을 줄인다
- **결과 검증**: import 경로, API 버전, 보안 이슈를 체크리스트로 확인한다
- **실수 수정**: AI 3대 한계(버전 불일치, 컨텍스트 소실, 환각)를 인식하고 대응한다
- **규칙 문서화**: copilot-instructions.md와 Agent Skills로 AI의 컨텍스트를 관리한다

이 사이클은 어떤 AI 도구를 쓰든, 어떤 기술 스택으로 바뀌든 동일하게 적용된다. Next.js가 아닌 다른 프레임워크를 쓰더라도, Copilot이 아닌 다른 AI 도구를 쓰더라도, "프롬프트 → 검증 → 수정 → 문서화"의 흐름은 변하지 않는다.

**후속 학습 방향**:

1. **기술 깊이**: TypeScript, React Server Components, Next.js Middleware — 지금까지 "읽기"에 집중했던 코드를 "쓰기" 수준으로 끌어올린다. 공식 문서(nextjs.org, tailwindcss.com, supabase.com)를 직접 읽는 습관을 들이면, AI의 출력을 더 정확하게 검증할 수 있다.

2. **새로운 도구**: Cursor, Claude Code, Windsurf 등 다른 AI 코딩 도구를 사용해본다. 이 교재에서 배운 원리(프롬프트 전략, 검증 체크리스트, 컨텍스트 관리)가 그대로 통한다는 것을 확인할 수 있다. 도구는 바뀌어도 원리는 같다.

3. **실전 프로젝트**: 팀 프로젝트, 해커톤, 오픈소스 기여 — 혼자 만드는 것에서 함께 만드는 것으로 확장한다. Git 브랜치 전략, 코드 리뷰, CI/CD가 새로운 학습 주제가 된다. 이번 학기에 만든 프로젝트를 포트폴리오의 첫 번째 항목으로 활용할 수 있다.

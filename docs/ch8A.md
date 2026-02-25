# Chapter 8. Supabase 시작하기 — A회차: 강의

> **미션**: 게시판에 진짜 데이터베이스를 연결한다

---

## 학습목표

1. BaaS(Backend as a Service)의 개념과 장점을 설명할 수 있다
2. Supabase 프로젝트를 생성하고 대시보드를 탐색할 수 있다
3. Next.js 프로젝트에 Supabase 클라이언트를 설치하고 환경 변수를 설정할 수 있다
4. 7장 설계서를 기반으로 SQL 테이블을 생성할 수 있다
5. 테이블 관계(1:N)를 이해하고 외래 키를 설정할 수 있다

---

## 수업 타임라인

**표 8.1** A회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | 오늘의 미션 + 빠른 진단 |
| 00:05~00:25 | BaaS 개념 + Supabase 프로젝트 생성 + 대시보드 탐색 |
| 00:25~00:50 | Next.js 연결 + 환경 변수 + Vercel 배포 설정 |
| 00:50~01:20 | 라이브 코딩 시연: 데이터 모델링 + 테이블 생성 + 연결 테스트 |
| 01:20~01:27 | 핵심 정리 + B회차 과제 스펙 공개 |
| 01:27~01:30 | Exit ticket |

---

## 오늘의 미션 + 빠른 진단

> **오늘의 질문**: "지금까지 만든 게시판은 새로고침하면 데이터가 사라진다. 어떻게 하면 데이터를 영구적으로 저장할 수 있을까?"

**빠른 진단** (1문항):

다음 중 BaaS(Backend as a Service)의 설명으로 올바른 것은?
- (A) 백엔드 서버 코드를 직접 작성하여 배포하는 방식
- (B) 백엔드 기능(DB, 인증, API)을 서비스로 제공받아 사용하는 방식
- (C) 프론트엔드 없이 서버만으로 앱을 만드는 방식

정답: (B) — BaaS는 데이터베이스, 인증, API 등을 이미 만들어진 서비스로 사용한다.

---

## 8.1 BaaS(Backend as a Service) 개념

Ch5~6에서 게시판을 만들었지만, 데이터는 브라우저 메모리에만 존재했다. 페이지를 새로고침하면 사라지고, 다른 사람이 올린 글을 볼 수 없었다. **진짜 웹 앱**이 되려면 서버와 데이터베이스가 필요하다.

### 8.1.1 프론트엔드 개발자가 백엔드를 다루는 시대

전통적인 웹 개발에서는 프론트엔드와 백엔드를 각각 별도로 만들어야 했다:

```text
[전통 방식]
프론트엔드(React) → 백엔드 서버(Express/Django) → 데이터베이스(PostgreSQL)
                      ↑
              직접 만들어야 함 (API 설계, 인증, 배포...)
```

백엔드를 직접 만들려면 서버 언어(Python, Java, Go), API 설계, 인증 시스템, 서버 배포 등을 모두 학습해야 한다. 이 과정만 한 학기 수업이 된다.

**BaaS**(Backend as a Service)는 이 복잡한 백엔드를 **서비스로 제공**한다:

```text
[BaaS 방식]
프론트엔드(Next.js) → BaaS(Supabase) → 데이터베이스(PostgreSQL)
                       ↑
              이미 만들어져 있음 (API 자동 생성, 인증 내장, 클라우드 호스팅)
```

쉽게 말해서, 식당을 열 때 주방을 직접 짓는 대신 **공유 주방을 빌리는 것**이다. 요리(프론트엔드)에만 집중하면 된다.

**표 8.2** BaaS가 제공하는 기능

| 기능 | 직접 만들면 | BaaS 사용 시 |
|------|------------|-------------|
| 데이터베이스 | PostgreSQL 설치, 스키마 설계, 마이그레이션 | 대시보드에서 테이블 생성 |
| 인증 | 회원가입, 로그인, 세션, OAuth 직접 구현 | `signInWithOAuth()` 한 줄 |
| API | REST/GraphQL 엔드포인트 직접 설계 | 테이블 생성하면 API 자동 생성 |
| 파일 저장소 | S3 설정, 업로드 로직 구현 | `storage.upload()` 한 줄 |
| 보안 | 미들웨어, 권한 체크 직접 구현 | RLS 정책으로 DB 레벨에서 강제 |

> **강의 팁**: "백엔드 없이 앱을 만드는 게 아니라, 백엔드를 직접 만들지 않는 것"이라는 점을 강조한다. BaaS는 백엔드가 이미 만들어져 있는 서비스다.

### 8.1.2 Supabase란: 오픈소스 Firebase 대안

**Supabase**(수파베이스)는 오픈소스 BaaS 플랫폼이다. Google의 **Firebase**와 비슷한 역할을 하지만 근본적인 차이가 있다.

**표 8.3** Supabase vs Firebase

| 비교 항목 | Supabase | Firebase |
|-----------|----------|----------|
| 데이터베이스 | **PostgreSQL** (관계형) | Firestore (NoSQL) |
| 소스 코드 | **오픈소스** (GitHub 공개) | 비공개 (Google 독점) |
| SQL 사용 | **사용 가능** (표준 SQL) | 사용 불가 (전용 쿼리) |
| 무료 플랜 | 2개 프로젝트, 500MB DB | Spark 플랜 (일일 한도) |
| 데이터 이전 | PostgreSQL이므로 **어디든 이전 가능** | Firebase에 종속 |

이 교재에서 Supabase를 선택한 이유:

1. **SQL을 배울 수 있다** — PostgreSQL 기반이므로 업계 표준 SQL을 자연스럽게 익힌다
2. **오픈소스** — 종속(vendor lock-in) 걱정 없이 언제든 데이터를 다른 곳으로 옮길 수 있다
3. **학생 무료** — 2개 프로젝트까지 무료, 이 수업에 충분하다
4. **Next.js와 공식 연동** — Vercel과 Supabase가 공식 파트너이므로 통합이 매끄럽다

> Supabase는 PostgreSQL 위에 인증, 실시간 구독, 파일 저장소, Edge Functions를 얹은 "올인원 백엔드 플랫폼"이다.

---

## 8.2 Supabase 프로젝트 생성

지금부터 Supabase 프로젝트를 직접 만든다. 이 설정은 Ch9~11까지 계속 사용하므로 정확히 따라한다.

### 8.2.1 가입 및 새 프로젝트 만들기

> **함께 진행**: 교수 화면을 보며 함께 따라한다

① **Supabase 가입**: https://supabase.com 에서 **GitHub 계정으로 가입**한다 (별도 이메일 가입 불필요)

② **새 프로젝트 생성**: 대시보드에서 "New Project" 클릭

③ **프로젝트 설정**:

**표 8.4** 프로젝트 생성 시 입력 항목

| 항목 | 입력 값 | 설명 |
|------|---------|------|
| Organization | (기본값) | 개인 조직 |
| Project name | `my-board` | 영문 소문자, 하이픈 사용 |
| Database Password | (강한 비밀번호) | **반드시 메모해둔다** — 이후 변경 불가 |
| Region | Northeast Asia (Tokyo) | 한국에서 가장 가까운 리전 |
| Pricing Plan | Free | 무료 플랜 선택 |

④ **생성 대기**: 프로젝트 생성에 약 1~2분이 걸린다. 이 사이 대시보드 구조를 살펴본다.

> **강의 팁**: Database Password는 나중에 변경할 수 없다. 학생들이 비밀번호를 까먹으면 프로젝트를 삭제하고 다시 만들어야 한다. 반드시 어딘가에 적어두게 한다.

<!-- COPILOT_VERIFY: Supabase 프로젝트 생성 화면 스크린샷을 캡처해주세요 — 2026년 2월 기준 UI가 변경되었을 수 있습니다 -->

### 8.2.2 대시보드 탐색: Table Editor, SQL Editor, Auth

Supabase 대시보드는 백엔드의 모든 기능을 한 곳에서 관리하는 **제어판**이다. 핵심 메뉴 4가지를 익힌다:

**표 8.5** Supabase 대시보드 핵심 메뉴

| 메뉴 | 역할 | 이 수업에서 사용 시점 |
|------|------|---------------------|
| **Table Editor** | 테이블 생성/수정, 데이터 확인 | Ch8 (오늘), Ch10 |
| **SQL Editor** | SQL 문 직접 실행 | Ch8 (오늘), Ch10, Ch11 |
| **Authentication** | 인증 설정, 사용자 목록 | Ch9 |
| **Project Settings** | API 키, URL 확인 | Ch8 (오늘) |

다른 메뉴(Storage, Edge Functions, Realtime 등)는 이 수업에서 다루지 않지만, 프로젝트가 성장하면 필요해질 수 있다.

### 8.2.3 API 키 확인

Supabase와 Next.js를 연결하려면 두 가지 정보가 필요하다:

① **Project URL**: `https://[프로젝트ID].supabase.co` 형태
② **anon (public) key**: 클라이언트에서 사용하는 공개 키

확인 경로: **Project Settings** → **API** → **Project URL**과 **Project API keys**

```text
Project URL:  https://abcdefghijk.supabase.co
anon key:     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  ← 절대 공개 금지!
```

**표 8.6** API 키의 두 종류

| 키 | 용도 | 공개 여부 | 권한 |
|----|------|----------|------|
| **anon key** | 클라이언트(브라우저) | 공개 가능 | RLS 정책에 따라 제한됨 |
| **service_role key** | 서버 전용 | **절대 비공개** | RLS 무시, 모든 권한 |

> anon key가 공개 가능하다는 것이 의외일 수 있다. Supabase는 **RLS(Row Level Security)**로 데이터를 보호한다. anon key로 접근해도 RLS 정책이 허용한 데이터만 볼 수 있다. RLS는 Ch11에서 자세히 다룬다.

> **강의 팁**: "anon key는 집 주소, service_role key는 마스터 키"에 비유한다. 주소는 알려줘도 되지만 마스터 키는 절대 남에게 주면 안 된다.

---

## 8.3 Next.js와 Supabase 연결

Supabase 프로젝트가 준비되었으면 기존 Next.js 프로젝트에 연결한다.

### 8.3.1 @supabase/supabase-js 설치

> **Copilot 프롬프트**
> "Next.js App Router 프로젝트에 Supabase 클라이언트를 설치하고 초기 설정하는 방법을 알려줘.
> @supabase/supabase-js와 @supabase/ssr 두 패키지가 필요해."

<!-- COPILOT_VERIFY: 이 프롬프트로 Copilot이 올바른 설치 명령을 제시하는지 확인해주세요 -->

터미널에서 두 패키지를 설치한다:

```bash
npm install @supabase/supabase-js @supabase/ssr
```

설치 후 **버전 확인** — 설치된 Supabase 패키지 버전을 확인하고 copilot-instructions.md에 기록한다:

```bash
node -e "const p = require('./package.json'); console.log('@supabase/supabase-js:', p.dependencies['@supabase/supabase-js']); console.log('@supabase/ssr:', p.dependencies['@supabase/ssr'])"
```

copilot-instructions.md의 Tech Stack 섹션에 추가한다:

```markdown
## Tech Stack
- @supabase/supabase-js [확인한 버전]
- @supabase/ssr [확인한 버전]
```

> 새로운 패키지를 설치할 때마다 버전을 확인하고 copilot-instructions.md에 기록하는 습관을 들이자. 이것이 Ch2에서 배운 **버전 동기화 프로토콜**이다.

**표 8.7** Supabase 패키지 역할

| 패키지 | 역할 |
|--------|------|
| `@supabase/supabase-js` | Supabase 핵심 클라이언트 (DB, Auth, Storage) |
| `@supabase/ssr` | Next.js App Router에서 쿠키 기반 세션 관리 |

`@supabase/ssr`은 **서버 컴포넌트**(Server Component)와 **클라이언트 컴포넌트**(Client Component) 양쪽에서 Supabase를 안전하게 사용하기 위한 패키지이다. Next.js App Router 환경에서는 반드시 함께 설치한다.

### 8.3.2 환경 변수 설정 (.env.local)

API 키를 프로젝트에 저장한다. 프로젝트 루트에 `.env.local` 파일을 생성한다:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://[프로젝트ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**주의할 점 3가지**:

1. **`NEXT_PUBLIC_` 접두사**: Next.js에서 브라우저에 노출할 환경 변수에는 반드시 `NEXT_PUBLIC_` 접두사를 붙인다. 이 접두사가 없으면 서버에서만 사용 가능하다.

2. **`.gitignore` 확인**: `.env.local`은 기본적으로 `.gitignore`에 포함되어 있다. **절대 Git에 커밋하지 않는다**.

3. **실제 값 입력**: `[프로젝트ID]`와 `eyJhbG...` 부분을 본인의 Supabase 대시보드에서 확인한 값으로 교체한다.

> **흔한 실수**: `.env.local` 대신 `.env`에 키를 넣는 경우. `.env`는 Git에 커밋될 수 있다. 반드시 `.env.local`을 사용한다.

### 8.3.3 Supabase 클라이언트 초기화

> **Copilot 프롬프트**
> "Next.js App Router에서 Supabase 클라이언트를 초기화하는 유틸리티 파일을 만들어줘.
> @supabase/ssr 패키지를 사용하고, 브라우저용 클라이언트를 생성하는 함수를 만들어줘.
> 파일 경로: lib/supabase.js"

<!-- COPILOT_VERIFY: Copilot이 @supabase/ssr의 createBrowserClient를 사용하는지 확인해주세요 -->

Copilot이 생성한 코드를 읽어보자:

```javascript
// lib/supabase.js
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
```

**코드 읽기 가이드** — 3줄이지만 중요한 포인트가 있다:

**표 8.8** Supabase 클라이언트 초기화 코드 해석

| 줄 | 코드 | 의미 |
|----|------|------|
| 1 | `import { createBrowserClient }` | `@supabase/ssr`에서 **브라우저용** 클라이언트 생성 함수를 가져온다 |
| 3 | `export function createClient()` | 다른 파일에서 `import { createClient }`로 사용할 수 있게 내보낸다 |
| 4-5 | `process.env.NEXT_PUBLIC_...` | `.env.local`에 설정한 환경 변수를 읽는다 |

> 왜 `createClient`라는 이름인가? Supabase 공식 문서가 이 이름을 사용한다. 프로젝트 전체에서 `import { createClient } from "@/lib/supabase"`로 통일하면 코드가 일관된다.

서버 컴포넌트에서도 Supabase를 사용해야 하는 경우가 있다(예: 초기 데이터 로딩). 이때는 별도의 서버용 클라이언트가 필요하다:

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
        getAll() {
          return cookieStore.getAll();
        },
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

이 파일은 Ch9(인증)에서 본격적으로 사용한다. 지금은 `lib/supabase.js`(브라우저용)만 있으면 충분하다.

**검증 체크리스트** — 클라이언트 초기화가 올바른지 확인:

- [ ] `@supabase/ssr`의 `createBrowserClient`를 사용하는가? (구버전인 `createClient` from `@supabase/supabase-js`를 직접 사용하면 쿠키 처리가 안 된다)
- [ ] 환경 변수 이름이 `.env.local`과 정확히 일치하는가?
- [ ] `service_role` 키가 아닌 `anon` 키를 사용하는가?

> **함께 진행**: 함께 `lib/supabase.js` 파일을 만들고, 개발 서버에서 에러 없이 실행되는지 확인한다

### 8.3.4 Vercel 환경 변수 등록

`.env.local`은 로컬 개발용이다. Vercel에 배포할 때는 **Vercel 대시보드에 환경 변수를 별도 등록**해야 한다.

> **Copilot 프롬프트**
> "Vercel에 Supabase 환경 변수를 등록하는 방법을 알려줘.
> NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY 두 개를 설정해야 해."

<!-- COPILOT_VERIFY: Vercel 환경 변수 등록 방법에 대한 Copilot 응답이 최신 UI와 일치하는지 확인해주세요 -->

등록 경로: **Vercel Dashboard** → 프로젝트 → **Settings** → **Environment Variables**

**표 8.9** Vercel 환경 변수 등록

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://[프로젝트ID].supabase.co` | Production, Preview, Development 모두 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbG...` | Production, Preview, Development 모두 |

등록 후 **반드시 재배포**해야 적용된다. Vercel 대시보드에서 "Redeploy"를 누르거나, 새 커밋을 push하면 된다.

> **강의 팁**: "로컬에서 되는데 배포하면 안 돼요"의 90%는 **Vercel에 환경 변수를 안 넣었기 때문**이다. 이 단계를 반드시 확인한다.

### 8.3.5 연결 테스트

> **라이브 코딩 시연**: 교수가 Supabase 프로젝트를 생성하고 Next.js와 연결한 뒤, 연결 테스트까지 전 과정을 시연한다.

모든 설정이 끝났으면 실제로 연결이 되는지 확인한다. 임시로 페이지에 테스트 코드를 작성한다:

```jsx
// app/test/page.js — 연결 확인용 (나중에 삭제)
"use client";

import { createClient } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function TestPage() {
  const [status, setStatus] = useState("확인 중...");

  useEffect(() => {
    const supabase = createClient();
    supabase.from("_connection_test").select("*").limit(0)
      .then(({ error }) => {
        if (error?.message?.includes("Failed to fetch")) {
          setStatus("연결 실패 — 환경 변수를 확인하세요");
        } else {
          setStatus("Supabase 연결 성공!");
        }
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Supabase 연결 테스트</h1>
      <p className="mt-4 text-lg">{status}</p>
    </div>
  );
}
```

`http://localhost:3000/test`에 접속해서 "Supabase 연결 성공!"이 보이면 설정이 올바르다.

> 연결 확인이 끝나면 `app/test/` 폴더는 삭제해도 된다. 배포 전에 정리하는 습관을 들인다.

---

## 8.4 데이터 모델링

Supabase 연결이 완료되었다. 이제 **데이터를 저장할 그릇(테이블)**을 만들 차례이다.

### 8.4.1 관계형 데이터베이스 기초: 테이블, 행, 열

Supabase는 **PostgreSQL**이라는 **관계형 데이터베이스**(Relational Database)를 사용한다. 관계형 데이터베이스는 데이터를 **표(테이블)** 형태로 저장한다.

엑셀 스프레드시트를 생각하면 된다:

```text
posts 테이블
┌────┬─────────┬──────────┬─────────────────┐
│ id │ title   │ content  │ created_at      │
├────┼─────────┼──────────┼─────────────────┤
│ 1  │ 첫 글   │ 안녕하세요 │ 2026-03-01 10:00│
│ 2  │ 두 번째  │ 반갑습니다 │ 2026-03-01 11:00│
└────┴─────────┴──────────┴─────────────────┘
```

**표 8.10** 관계형 데이터베이스 핵심 용어

| 용어 | 영문 | 비유 | 설명 |
|------|------|------|------|
| **테이블** | Table | 엑셀 시트 | 같은 종류의 데이터를 모은 표 |
| **행** | Row | 엑셀 한 줄 | 데이터 하나 (게시글 1개, 사용자 1명) |
| **열** | Column | 엑셀 한 칸 제목 | 데이터의 속성 (제목, 내용, 날짜) |
| **기본 키** | Primary Key (PK) | 주민번호 | 각 행을 고유하게 구분하는 값 (보통 `id`) |
| **외래 키** | Foreign Key (FK) | 소속 부서 코드 | 다른 테이블의 행을 참조하는 값 |

### 8.4.2 7장 설계서를 기반으로 테이블 생성

Ch7에서 ARCHITECTURE.md에 데이터 모델을 설계했다. 이제 그 설계를 **실제 SQL 테이블**로 만든다.

게시판 앱에 필요한 최소 테이블은 2개이다:

1. **profiles** — 사용자 정보 (Supabase Auth의 사용자와 연결)
2. **posts** — 게시글

> 왜 `users`가 아닌 `profiles`인가? Supabase Auth는 내부적으로 `auth.users` 테이블을 관리한다. 우리가 추가 정보(닉네임, 아바타 등)를 저장하려면 **별도의 `profiles` 테이블**을 만들고 `auth.users`와 연결한다. 이것이 Supabase의 공식 패턴이다.

이제 Copilot에게 테이블 생성 SQL을 요청한다. 이때 프롬프트의 구체성이 결과 품질을 결정한다:

> **나쁜 프롬프트**
> "Supabase에서 게시판 테이블 만들어줘"

이 프롬프트로는 AI가 임의로 열 이름과 타입을 정한다. `auth.users`와의 연결 없이 별도 `users` 테이블을 만들거나, `int` 타입의 ID를 생성할 가능성이 높다.

> **Copilot 프롬프트**
> "Supabase에서 게시판을 위한 SQL 테이블을 만들어줘.
> profiles 테이블(id, username, avatar_url)과 posts 테이블(id, title, content, user_id, created_at)이 필요해.
> profiles.id는 auth.users.id를 참조하고, posts.user_id는 profiles.id를 참조해.
> RLS는 아직 설정하지 마."

<!-- COPILOT_VERIFY: 위 "좋은 프롬프트"로 Copilot이 auth.users를 참조하는 올바른 SQL을 생성하는지 확인해주세요 -->

Copilot이 생성한 SQL을 읽어보자:

```sql
-- profiles 테이블
create table profiles (
  id uuid references auth.users(id) on delete cascade,
  username text,
  avatar_url text,
  created_at timestamptz default now(),
  primary key (id)
);

-- posts 테이블
create table posts (
  id bigint generated always as identity primary key,
  title text not null,
  content text not null,
  user_id uuid references profiles(id) on delete cascade not null,
  created_at timestamptz default now()
);
```

**코드 읽기 가이드** — SQL을 처음 보는 학생도 읽을 수 있도록 한 줄씩 해석한다:

**표 8.11** profiles 테이블 SQL 해석

| SQL | 의미 |
|-----|------|
| `create table profiles (...)` | `profiles`라는 이름의 테이블을 생성한다 |
| `id uuid` | `id` 열의 타입은 UUID (고유 식별자) |
| `references auth.users(id)` | Supabase Auth의 `users` 테이블 `id`를 참조한다 |
| `on delete cascade` | 사용자가 삭제되면 프로필도 함께 삭제된다 |
| `username text` | 문자열 타입의 `username` 열 |
| `created_at timestamptz default now()` | 생성 시각, 기본값은 현재 시간 |
| `primary key (id)` | `id`를 기본 키로 설정 |

**표 8.12** posts 테이블 SQL 해석

| SQL | 의미 |
|-----|------|
| `id bigint generated always as identity` | 자동 증가하는 숫자 ID |
| `title text not null` | 제목, 빈 값 불허 |
| `content text not null` | 내용, 빈 값 불허 |
| `user_id uuid references profiles(id)` | 작성자, `profiles` 테이블의 `id`를 참조 |
| `on delete cascade not null` | 작성자 삭제 시 게시글도 삭제, 빈 값 불허 |
| `created_at timestamptz default now()` | 생성 시각, 기본값은 현재 시간 |

### 8.4.3 테이블 관계: 1:N (사용자 → 게시글)

두 테이블 사이의 관계를 **1:N (일대다)**이라 한다:

```text
profiles (1) ──────< posts (N)
   │                    │
   │ id (PK)            │ user_id (FK)
   │                    │
   한 사용자 ────────── 여러 게시글
```

"한 사용자가 여러 게시글을 쓸 수 있지만, 하나의 게시글은 한 사용자에게만 속한다." 이것이 1:N 관계이다.

`posts.user_id`가 `profiles.id`를 참조하는 **외래 키(FK)**이다. 이 외래 키 덕분에:
- 게시글을 조회할 때 작성자 정보를 함께 가져올 수 있다
- 존재하지 않는 사용자 ID로 게시글을 만들 수 없다 (참조 무결성)

### 8.4.4 SQL로 테이블 생성

> **라이브 코딩 시연**: 교수가 SQL Editor에서 테이블을 생성하고, Table Editor에서 확인하는 과정을 시연한다.

Supabase 대시보드의 **SQL Editor**에서 위 SQL을 실행한다.

> **함께 진행**: 교수 화면에서 SQL Editor를 열고, SQL을 붙여넣고, "Run" 버튼을 클릭한다

실행 후 **Table Editor**로 이동하면 `profiles`와 `posts` 테이블이 생성된 것을 확인할 수 있다.

> **흔한 실수**: SQL을 두 번 실행하면 "relation already exists" 에러가 발생한다. 이미 테이블이 있다면 Table Editor에서 삭제 후 다시 실행하거나, SQL 앞에 `drop table if exists posts; drop table if exists profiles;`를 추가한다 (순서 주의: posts를 먼저 삭제해야 외래 키 참조 에러가 안 난다).

**표 8.13** 흔한 AI 실수 — Supabase 클라이언트 설정 + SQL

| 실수 패턴 | 증상 | 해결 |
|-----------|------|------|
| `createClient` from `@supabase/supabase-js` 직접 사용 | 쿠키 기반 세션이 작동하지 않음 | `@supabase/ssr`의 `createBrowserClient` 사용 |
| 환경 변수에 `NEXT_PUBLIC_` 접두사 누락 | 브라우저에서 `undefined` | `.env.local` 키 이름에 접두사 추가 |
| `.env` 파일 사용 (`.env.local` 대신) | Git에 키가 노출됨 | `.env.local`로 변경, Git 이력에서 키 제거 |
| `service_role` 키를 브라우저에서 사용 | 보안 취약점 (RLS 무시) | `anon` 키만 브라우저에서 사용 |
| `auth.users` 대신 자체 `users` 테이블 생성 | Supabase 인증과 연동 불가 | `profiles` → `auth.users(id)` 참조 패턴 사용 |
| `uuid` 대신 `int` 타입 사용 | Auth 사용자 ID와 타입 불일치 | `profiles.id`는 반드시 `uuid` |

---

## 핵심 정리 + B회차 과제 스펙

### 이번 시간 핵심 3가지

1. **BaaS**는 백엔드를 직접 만들지 않고 서비스로 사용하는 방식이다 — Supabase는 PostgreSQL 기반 오픈소스 BaaS이다
2. **환경 변수**는 `.env.local`에 저장하고, `NEXT_PUBLIC_` 접두사를 붙이고, Vercel에도 별도 등록한다
3. **관계형 데이터베이스**는 테이블(표) 형태로 데이터를 저장한다 — `profiles`와 `posts`가 1:N 관계로 연결된다

### B회차 과제 스펙

**Supabase 연동 + 데이터 읽기 페이지 배포**:
1. Supabase 프로젝트 생성 + API 키 확인
2. `.env.local` 환경 변수 설정
3. `lib/supabase.js` 클라이언트 초기화
4. SQL Editor에서 `profiles` + `posts` 테이블 생성
5. 연결 테스트 성공 확인
6. Vercel 환경 변수 등록 + 배포

**스타터 코드**: `practice/chapter8/starter/` — Supabase 패키지가 설치된 Next.js 프로젝트와 비어 있는 `lib/supabase.js`가 준비되어 있다.

---

## Exit ticket

다음 코드에서 잘못된 부분을 찾아라:

```javascript
// lib/supabase.js
import { createClient } from "@supabase/supabase-js";

export function initSupabase() {
  return createClient(
    "https://abc123.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  );
}
```

정답: (1) `@supabase/supabase-js`의 `createClient` 대신 `@supabase/ssr`의 `createBrowserClient`를 사용해야 한다 (쿠키 기반 세션 지원), (2) URL과 키가 하드코딩되어 있다 — `process.env.NEXT_PUBLIC_...`으로 환경 변수를 사용해야 한다, (3) 함수명을 `createClient`로 통일하면 코드 일관성이 높아진다.

---

## 교수 메모

**준비물 체크리스트**:
- [ ] Supabase 계정 로그인 확인 (시연용 프로젝트 미리 생성)
- [ ] 학생용 Step-by-step 가이드 슬라이드 (프로젝트 생성 → API 키 확인)
- [ ] 대시보드 탐색 시연 순서 정리 (Table Editor → SQL Editor → Auth → Settings)
- [ ] `.env.local` 예시 파일 (학생들이 복사-붙여넣기할 수 있도록)
- [ ] SQL 테이블 생성 스크립트 미리 준비 (학생 타이핑 실수 대비)
- [ ] Vercel 환경 변수 등록 화면 스크린샷 (가이드용)
- [ ] B회차 스타터 코드 준비 (`practice/chapter8/starter/`)

**수업 후 체크**:
- [ ] 학생들이 BaaS 개념과 Supabase의 역할을 이해했는가
- [ ] anon key vs service_role key 차이를 이해했는가
- [ ] 환경 변수 설정 방법 (`.env.local` + Vercel)을 이해했는가
- [ ] 관계형 데이터베이스의 테이블/행/열 개념을 이해했는가

# Chapter 8. Supabase 시작하기 — B회차: 실습

> **미션**: Supabase 프로젝트를 설정하고 테이블을 생성하여 데이터를 읽어오는 페이지를 배포한다

---

## 수업 타임라인

**표 8.14** B회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | A회차 핵심 리캡 + 과제 스펙 확인 |
| 00:05~00:10 | 바이브코딩 가이드 + 스타터 코드 안내 |
| 00:10~00:25 | 체크포인트 1: Supabase 프로젝트 생성 + 환경 변수 설정 |
| 00:25~00:45 | 체크포인트 2: 테이블 생성 + 클라이언트 초기화 |
| 00:45~01:00 | 체크포인트 3: 연결 테스트 + Vercel 환경 변수 + 배포 |
| 01:00~01:05 | Google Classroom 제출 |
| 01:05~01:25 | 결과 공유 + 코드리뷰 토론 |
| 01:25~01:30 | 교수 종합 피드백 + 다음 주 예고 |

---

## 과제 스펙 + 스타터 코드 안내

### 과제 요구사항

**Supabase 연동 게시판 페이지**를 배포한다:

① Supabase 프로젝트 생성 + API 키 확인
② `.env.local`에 환경 변수 설정 (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
③ `lib/supabase.js` — Supabase 클라이언트 초기화 (`@supabase/ssr`의 `createBrowserClient`)
④ SQL Editor에서 `profiles` + `posts` 테이블 생성
⑤ Vercel 환경 변수 등록 + 배포 성공

### 스타터 코드

`practice/chapter8/starter/` 폴더에 Supabase 패키지가 설치된 Next.js 프로젝트가 준비되어 있다.

```
practice/chapter8/starter/
├── app/
│   ├── layout.js       ← 공통 레이아웃
│   ├── page.js         ← 메인 페이지 (Supabase 연결 전 상태)
│   └── globals.css     ← Tailwind 기본 import
├── lib/
│   └── supabase.js     ← 비어 있음 (TODO: 클라이언트 초기화)
├── package.json        ← @supabase/supabase-js, @supabase/ssr 포함
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

**시작 방법** (PowerShell 기준):
```bash
cd practice/chapter8/starter
npm install
npm run dev
```
macOS Terminal도 동일하다.

브라우저에서 http://localhost:3000 을 열어 기본 페이지가 보이는지 확인한다.

---

## 바이브코딩 가이드

> **Copilot 활용**: 이번 실습에서는 Copilot Chat에 프롬프트를 입력하여 Supabase 설정 코드를 생성한다. 생성된 코드를 그대로 쓰지 말고, A회차에서 배운 기준으로 반드시 검증한다.

**좋은 프롬프트 vs 나쁜 프롬프트**:

나쁜 프롬프트:
> "Supabase 연결해줘"

문제: 어떤 패키지를 쓰는지, 환경 변수 이름이 무엇인지, 브라우저용인지 서버용인지 전혀 알려주지 않았다.

좋은 프롬프트:

> **Copilot 프롬프트**
> "Next.js App Router 프로젝트에서 Supabase 브라우저 클라이언트를 초기화하는 lib/supabase.js를 만들어줘.
> @supabase/ssr 패키지의 createBrowserClient를 사용해.
> 환경 변수: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY.
> export function createClient() 형태로 만들어줘."

<!-- COPILOT_VERIFY: 위 프롬프트를 Copilot Chat에 입력하고 생성 결과를 캡처해주세요 -->

---

## 개인 실습

### 체크포인트 1: Supabase 프로젝트 생성 + 환경 변수 설정 (15분)

**목표**: Supabase 프로젝트를 만들고 Next.js에 환경 변수를 연결한다.

① https://supabase.com 에서 GitHub로 로그인 → New Project 생성
② Project Settings → API에서 **Project URL**과 **anon key**를 복사한다
③ 프로젝트 루트에 `.env.local` 파일을 생성한다:
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://[프로젝트ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```
④ `.gitignore`에 `.env*.local`이 포함되어 있는지 확인한다
⑤ **주의**: Database Password는 반드시 어딘가에 메모해둔다 (나중에 변경 불가)

> **강의 팁**: 순회하며 학생들이 `.env.local` 파일을 올바르게 만들었는지 확인한다. `.env`에 넣거나 `NEXT_PUBLIC_` 접두사를 빠뜨린 학생이 있을 수 있다.

### 체크포인트 2: 테이블 생성 + 클라이언트 초기화 (20분)

**목표**: SQL 테이블을 생성하고 Supabase 클라이언트를 설정한다.

① Supabase 대시보드 → **SQL Editor**에서 다음 SQL을 실행한다:
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
② **Table Editor**에서 두 테이블이 생성되었는지 확인한다
③ `lib/supabase.js`를 완성한다:
```javascript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
```
④ Copilot에게 연결 테스트 페이지를 요청하여 `app/test/page.js`를 생성한다
⑤ `http://localhost:3000/test`에서 연결 성공을 확인한다

> **Copilot 프롬프트**
> "Supabase 연결을 확인하는 테스트 페이지를 만들어줘.
> 파일 경로: app/test/page.js
> use client 컴포넌트로, @/lib/supabase에서 createClient를 import해.
> useEffect에서 간단한 쿼리를 실행하고 연결 성공/실패를 화면에 표시해줘."

### 체크포인트 3: 검증 + 배포 (15분)

**목표**: 검증을 완료하고 Vercel에 배포한다.

① 아래 검증 체크리스트를 수행한다
② Vercel Dashboard → Settings → Environment Variables에 환경 변수 2개를 등록한다
③ 테스트 페이지 삭제 (`app/test/` 폴더 삭제) — 배포 전 정리
④ git add → git commit → git push 로 배포한다:
```bash
git add .
git commit -m "Ch8: Supabase 연결 설정 + 테이블 생성"
git push
```
⑤ Vercel 대시보드에서 배포 완료를 확인한다
⑥ 배포된 URL에서 페이지가 정상 동작하는지 확인한다

---

## 검증 체크리스트

**표 8.15** AI 코드 검증 체크리스트

| 항목 | 확인 |
|------|------|
| `.env.local`에 `NEXT_PUBLIC_SUPABASE_URL` 설정했는가? | ☐ |
| `.env.local`에 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 설정했는가? | ☐ |
| `service_role` 키가 아닌 `anon` 키를 사용했는가? | ☐ |
| `lib/supabase.js`에서 `@supabase/ssr`의 `createBrowserClient`를 사용했는가? | ☐ |
| 환경 변수 이름이 `.env.local`과 정확히 일치하는가? | ☐ |
| `profiles`, `posts` 테이블이 Table Editor에 보이는가? | ☐ |
| `profiles.id`가 `uuid` 타입이고 `auth.users`를 참조하는가? | ☐ |
| `posts.user_id`가 `profiles.id`를 참조하는 외래 키인가? | ☐ |
| Vercel 환경 변수가 등록되었는가? | ☐ |
| 배포 URL에서 빌드 에러 없이 렌더링되는가? | ☐ |

---

## 흔한 AI 실수

**표 8.16** Ch8에서 AI가 자주 틀리는 패턴

| AI 실수 | 올바른 코드 | 발생 원인 |
|---------|-----------|----------|
| `@supabase/supabase-js`의 `createClient` 직접 사용 | `@supabase/ssr`의 `createBrowserClient` | 구버전 코드 학습 |
| `NEXT_PUBLIC_` 접두사 누락 | `NEXT_PUBLIC_SUPABASE_URL` | Next.js 환경 변수 규칙 미인지 |
| URL/키 하드코딩 | `process.env.NEXT_PUBLIC_...` | 환경 변수 패턴 미적용 |
| 자체 `users` 테이블 생성 | `profiles` → `auth.users(id)` 참조 | Supabase Auth 연동 패턴 모름 |
| `profiles.id`를 `int` 타입으로 생성 | `uuid` 타입 | Auth 사용자 ID가 UUID임을 모름 |
| `on delete cascade` 누락 | 외래 키에 `on delete cascade` 추가 | 참조 무결성 미고려 |
| 환경 변수 변경 후 서버 재시작 안내 누락 | `Ctrl+C` → `npm run dev` 재실행 | .env 핫 리로딩 미지원 인지 부족 |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch8 과제"에 아래 두 항목을 제출한다:

```
① 배포 URL
   예: https://내프로젝트.vercel.app

② AI가 틀린 부분 1개
   예: "Copilot이 @supabase/supabase-js의 createClient를 사용했는데,
       @supabase/ssr의 createBrowserClient로 수정했다."
```

**추가 제출**: Supabase Table Editor 스크린샷 (profiles + posts 테이블이 보이는 화면)

---

## 코드리뷰 토론 가이드

> **토론 가이드**: 2-3명이 자발적으로 화면을 공유하며 결과를 발표한다.

**발표 포인트** (1인당 3-5분):
1. Supabase 대시보드에서 Table Editor를 보여준다
2. 배포된 URL을 브라우저에 띄운다
3. 환경 변수 설정에서 어려웠던 점을 공유한다
4. Copilot이 틀린 부분과 어떻게 수정했는지 설명한다

**토론 질문**:
- "`.env.local`과 `.env`의 차이는 무엇인가?"
- "anon key가 공개 가능한 이유는 무엇인가?"
- "Copilot이 생성한 SQL에서 수정한 부분이 있는가?"

---

## 교수 피드백 포인트

**확인할 것**:
- `.env.local` 파일 이름이 정확한지 — `.env`로 만든 학생이 없는지
- `service_role` 키를 사용한 학생이 없는지 — 보안 이슈
- Vercel 환경 변수 미등록으로 배포 실패하는 학생 지원

**우수 사례 공유**:
- 테이블 설계를 7장 설계서와 연결한 학생 1-2명 발표

**다음 주 예고**:
> 다음 주에는 **Google 계정으로 로그인**하는 기능을 구현한다. 오늘 만든 Supabase 프로젝트에 인증(Authentication) 기능을 추가하여, 누가 글을 쓰는지 구분할 수 있게 된다.

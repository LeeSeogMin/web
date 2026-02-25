# Chapter 13. 개인 프로젝트 구현 — B회차: 실습

> **미션**: 나만의 풀스택 웹 앱을 구현하고 배포한다

---

## 수업 타임라인

**표 13.8** B회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | A회차 핵심 리캡 + 과제 스펙 확인 |
| 00:05~00:10 | 바이브코딩 가이드 + 스타터 코드 안내 |
| 00:10~00:25 | 체크포인트 1: DB + 인증 세팅 |
| 00:25~00:50 | 체크포인트 2: 핵심 CRUD 구현 |
| 00:50~01:05 | 체크포인트 3: UI 정리 + 문서화 + 배포 |
| 01:05~01:10 | Google Classroom 제출 |
| 01:10~01:25 | 결과 공유 + 코드리뷰 토론 |
| 01:25~01:30 | 교수 종합 피드백 + 기말 제출 안내 |

---

## 과제 스펙 + 스타터 코드 안내

### 과제 요구사항

개인 프로젝트의 **MVP**를 구현하고 배포한다:

① ARCHITECTURE.md 보완 완료 (Data Model + RLS + 인증 반영)
② Supabase 테이블 생성 + RLS 정책 적용
③ Google OAuth 로그인/로그아웃 동작
④ 핵심 CRUD 기능 최소 1개 이상 동작
⑤ Vercel 배포 + 전 기능 동작 확인

### 스타터 코드

`practice/chapter13/starter/` 폴더에 기본 Next.js + Supabase + 인증 설정이 완료된 프로젝트 템플릿이 준비되어 있다. 자신의 기존 프로젝트에 기능을 추가해도 되고, 스타터에서 새로 시작해도 된다.

```
practice/chapter13/starter/
├── app/
│   ├── layout.js       ← 공통 레이아웃 (Tailwind + Supabase + metadata)
│   ├── page.js         ← 메인 페이지 (기본 뼈대)
│   ├── globals.css     ← Tailwind 기본 import
│   ├── error.js        ← 에러 처리 (Ch12 패턴)
│   ├── loading.js      ← 로딩 UI
│   ├── login/
│   │   └── page.js     ← 로그인 페이지 (Google OAuth)
│   └── auth/
│       └── callback/
│           └── route.js ← OAuth 콜백 핸들러
├── components/         ← 재사용 컴포넌트 (빈 폴더)
├── lib/
│   └── supabase.js     ← Supabase 클라이언트 (createBrowserClient)
├── .github/
│   └── copilot-instructions.md ← 프로젝트 규칙 템플릿
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

**시작 방법** (PowerShell 기준):
```bash
cd practice/chapter13/starter
npm install
```

`.env.local` 파일을 생성하고 자신의 Supabase 프로젝트 정보를 입력한다:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

```bash
npm run dev
```
macOS Terminal도 동일하다.

브라우저에서 http://localhost:3000 을 열어 기본 페이지가 보이는지 확인한다.

---

## 바이브코딩 가이드

> **Copilot 활용**: 이번 실습은 **자율 개발**이다. A회차에서 세운 구현 전략(표 13.3)에 따라 기능을 하나씩 구현한다. Copilot에게 프롬프트를 제출하고, 생성된 코드를 검증하고, 수정하고, 커밋하는 사이클을 반복한다.

**프롬프트 작성 시 기억할 것**:

1. **기술 스택을 명시한다**: Next.js App Router, @supabase/ssr, Tailwind CSS
2. **데이터 소스를 지정한다**: 테이블명, 컬럼, 관계
3. **UI 구조를 설명한다**: 카드형, 목록형, 폼 등
4. **프로젝트 규칙을 참조한다**: copilot-instructions.md

**검증 시 반드시 확인할 4가지**:
1. import 경로 (`next/navigation`, 아님 `next/router`)
2. Supabase 클라이언트 (`createBrowserClient` / `createServerClient`)
3. `'use client'` 지시어 (상태/이벤트가 있는 컴포넌트)
4. 하드코딩된 값 (Supabase URL, 키 등)

---

## 개인 실습

### 체크포인트 1: DB + 인증 세팅 (15분)

**목표**: Supabase 테이블 + RLS + 인증을 완료한다.

① Supabase SQL Editor에서 프로젝트에 필요한 테이블을 생성한다
   - A회차에서 보완한 ARCHITECTURE.md의 Data Model을 참고
   - RLS를 반드시 활성화하고 정책을 추가

② Google OAuth 로그인이 동작하는지 확인한다
   - 스타터 코드의 로그인 페이지에서 테스트
   - 기존 프로젝트라면 Ch9에서 설정한 인증이 동작하는지 확인

③ Supabase 대시보드에서 테이블에 데이터를 수동으로 1~2개 넣고, 쿼리가 정상인지 확인한다

> **강의 팁**: DB + 인증 세팅에서 막히는 학생이 가장 많다. RLS 정책 실수(42501 에러)와 OAuth 콜백 URL 불일치가 가장 흔하다. 순회하며 Supabase 대시보드를 함께 확인해준다.

### 체크포인트 2: 핵심 CRUD 구현 (25분)

**목표**: MVP의 핵심 기능을 구현한다.

① 목록 페이지를 만든다 — Server Component에서 Supabase 데이터를 읽어 카드형으로 표시
② 작성 페이지를 만든다 — 폼 입력 + 유효성 검증 + Supabase insert
③ 수정/삭제 기능을 추가한다 — 본인 데이터만 수정/삭제 가능
④ 기능 하나를 완성할 때마다 `git commit`한다

기능을 만들 때마다 AI 사용 로그를 기록한다:

```text
[프롬프트] books 테이블 목록을 카드형으로 보여주는 페이지 만들어줘
[AI 응답]  app/books/page.js 생성
[AI 실수]  createClient 사용 (구버전)
[분류]     버전 불일치
[해결]     createServerClient로 변경
[조치]     copilot-instructions.md에 "createClient 사용 금지" 추가
```

> **Copilot 프롬프트** (목록 페이지 예시)
> "Supabase의 [테이블명] 테이블에서 전체 데이터를 읽어 카드형으로 보여주는
> app/[경로]/page.js를 만들어줘.
> Server Component로 작성하고, @supabase/ssr의 createServerClient 사용.
> Tailwind CSS로 반응형 그리드 (모바일 1열, md:2열).
> 각 카드에 [표시 필드] 표시. 새로 추가 버튼 포함."

### 체크포인트 3: UI 정리 + 문서화 + 배포 (15분)

**목표**: UI를 다듬고, 문서를 작성하고, 최종 배포한다.

① UI를 정리한다 — 레이아웃, 반응형, 색상 통일
② error.js, loading.js가 있는지 확인한다 (Ch12 패턴 적용)
③ README.md를 작성한다:

> **Copilot 프롬프트**
> "@workspace 이 프로젝트의 README.md를 작성해줘.
> 프로젝트 구조, 주요 기능, 기술 스택, 실행 방법을 포함하고,
> 스크린샷 자리는 비워둬."

<!-- COPILOT_VERIFY: @workspace로 README 자동 생성 결과를 확인하고, 실제 프로젝트를 정확히 반영하는지 점검해주세요 -->

④ AI_LOG.md에 최소 5개의 로그 항목을 정리한다 (표 13.9 형식)
⑤ 최종 배포:
```bash
git add .
git commit -m "Ch13: 개인 프로젝트 MVP 구현"
git push
```
⑥ 배포 URL에서 모든 기능을 테스트한다 (표 13.10 참고)

---

## AI 사용 로그 형식

**표 13.9** AI 사용 로그 형식

| 항목 | 설명 | 예시 |
|------|------|------|
| 프롬프트 | AI에게 내린 지시 | "books 테이블 CRUD 페이지 만들어줘" |
| AI 응답 요약 | 생성된 결과 한 줄 요약 | "app/books/page.tsx + 컴포넌트 3개 생성" |
| AI 실수 | 발견한 오류 (있을 경우) | "next/router 사용 (Pages Router 문법)" |
| 분류 | 실수 유형 | 버전 불일치 |
| 해결 | 수정한 내용 | "next/navigation으로 변경" |
| 조치 | 재발 방지 조치 | "copilot-instructions.md에 규칙 추가" |

**좋은 로그 vs 나쁜 로그**:

```text
나쁜 로그:
"Copilot으로 코드를 만들었다. 잘 됐다."

좋은 로그:
[프롬프트] Supabase books 테이블에서 전체 목록을 읽어 카드형 UI로 보여주는
          Server Component를 만들어줘
[AI 응답]  app/books/page.tsx 생성 — createServerClient로 데이터 조회
[AI 실수]  supabase.from('book') — 테이블명 오타 (book → books)
[분류]     환각 (존재하지 않는 테이블명 사용)
[해결]     테이블명을 books로 수정
[조치]     copilot-instructions.md에 테이블명 목록 추가
```

핵심: **AI가 완벽했다**는 로그보다, **AI가 실수했고 내가 고쳤다**는 로그가 훨씬 가치 있다.

---

## 검증 체크리스트

**표 13.10** 배포 후 기능 테스트 체크리스트

| 테스트 항목 | 확인 방법 | 통과 |
|------------|----------|:---:|
| 페이지 로딩 | 메인 페이지가 에러 없이 표시되는가 | ☐ |
| Google 로그인 | 로그인/로그아웃이 정상 동작하는가 | ☐ |
| 데이터 읽기 | 목록 페이지에 데이터가 표시되는가 | ☐ |
| 데이터 쓰기 | 새 항목을 추가할 수 있는가 | ☐ |
| 데이터 수정 | 기존 항목을 수정할 수 있는가 | ☐ |
| 데이터 삭제 | 항목을 삭제할 수 있는가 | ☐ |
| 권한 확인 | 다른 사용자의 데이터를 수정/삭제할 수 없는가 | ☐ |
| 반응형 | 모바일 화면에서 레이아웃이 깨지지 않는가 | ☐ |
| 에러 처리 | 잘못된 URL 접속 시 에러 페이지가 표시되는가 | ☐ |
| 콘솔 에러 | 브라우저 개발자 도구에 에러가 없는가 | ☐ |

---

## 흔한 AI 실수

**표 13.11** Ch13에서 AI가 자주 틀리는 패턴

| AI 실수 | 올바른 코드 | 발생 원인 |
|---------|-----------|----------|
| `next/router` (Pages Router) | `next/navigation` (App Router) | 학습 데이터의 Pages Router 비중 |
| `createClient` (구버전) | `createServerClient` / `createBrowserClient` | @supabase/ssr 미인지 |
| `'use client'` 누락 | 상태/이벤트 컴포넌트에 필수 | Server Component 기본 미인지 |
| Supabase URL 하드코딩 | `process.env.NEXT_PUBLIC_SUPABASE_URL` | 환경 변수 미사용 |
| 존재하지 않는 API 메서드 | Supabase 공식 문서 확인 | 환각 |
| 테이블명/컬럼명 오타 | ARCHITECTURE.md의 Data Model 참조 | 컨텍스트 부족 |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch13 과제"에 아래 항목을 제출한다:

```
① 배포 URL
   예: https://내프로젝트.vercel.app

② AI가 틀린 부분 1개
   예: "Copilot이 createClient를 사용했는데,
       @supabase/ssr의 createServerClient로 변경했다."
```

> **중요**: 이번 제출은 **중간 진행 상태**이다. 15주차에 최종 제출이 있다. 최종 제출에는 아래 전체가 필요하다.

**표 13.12** 기말 프로젝트 제출물 체크리스트

| # | 제출물 | 설명 | 필수 |
|:---:|------|------|:---:|
| 1 | 배포 URL | Vercel에 배포된 실제 동작하는 URL | 필수 |
| 2 | GitHub 저장소 | 소스 코드 전체 (public 또는 교수 초대) | 필수 |
| 3 | README.md | 프로젝트 설명, 기술 스택, 실행 방법 | 필수 |
| 4 | AI 사용 로그 | 프롬프트, 응답, 실수, 수정 과정 기록 (AI_LOG.md) | 필수 |
| 5 | ARCHITECTURE.md | 설계 문서 (Ch7 작성 + Ch13 보완) | 필수 |
| 6 | copilot-instructions.md | 프로젝트 규칙 문서 | 필수 |
| 7 | 스크린샷 | 주요 화면 캡처 3~5장 | 필수 |

---

## 코드리뷰 토론 가이드

> **토론 가이드**: 2-3명이 자발적으로 화면을 공유하며 진행 상황을 발표한다.

**발표 포인트** (1인당 3-5분):
1. 프로젝트 아이디어를 한 문장으로 소개한다
2. 배포 URL을 브라우저에 띄우고 핵심 기능을 시연한다
3. 가장 어려웠던 부분과 어떻게 해결했는지 설명한다
4. Copilot이 틀린 부분과 어떻게 수정했는지 설명한다

**토론 질문**:
- "MVP를 어떻게 정했는가? Must have로 분류한 기능은 무엇인가?"
- "DB 테이블 → 인증 → CRUD 순서로 진행했는가? 순서를 바꿨다면 어떤 문제가 있었는가?"
- "copilot-instructions.md를 업데이트하면서 AI 출력이 개선되었는가?"

---

## 교수 피드백 포인트

**확인할 것**:
- MVP 범위가 적절한지 — Must have가 너무 많으면 축소 권고
- DB + 인증이 동작하는지 — 이것이 안 되면 CRUD 진행 불가
- 배포 URL이 동작하는지 — 환경 변수 누락이 가장 흔한 문제
- AI 사용 로그가 작성되고 있는지 — 나중에 한꺼번에 쓰면 부정확

**우수 사례 공유**:
- MVP를 잘 정의하고 핵심 기능이 동작하는 프로젝트
- AI 사용 로그가 구체적이고 학습 과정이 잘 드러나는 프로젝트

**기말 최종 제출 안내**:
> 다음 주(15주차)에 프로젝트를 최종 제출한다. 오늘 미완성된 부분은 이번 주 안에 완성한다. 최종 제출 기한과 방법은 별도 공지한다.

**표 13.13** 기말 평가 기준표

| 평가 영역 | 비율 | 세부 기준 |
|----------|:---:|------|
| 기능 완성도 | 40% | MVP 기능이 모두 동작하는가, CRUD가 정상인가, 인증이 동작하는가 |
| 배포 상태 | 20% | Vercel URL이 접속 가능한가, 환경 변수가 정상인가, 에러 페이지가 있는가 |
| 코드 품질 | 20% | 프로젝트 구조가 정리되어 있는가, RLS 정책이 있는가, 하드코딩된 키가 없는가 |
| AI 활용 과정 | 20% | AI 사용 로그가 충실한가, 실수 발견/수정 과정이 기록되어 있는가, copilot-instructions.md가 관리되어 있는가 |

각 영역별 등급 기준:

- **기능 완성도(40%)**: MVP 전체 동작 = A, 핵심 1~2개 동작 = B, 부분 동작 = C, 미동작 = D
- **배포 상태(20%)**: URL 접속 + 전 기능 정상 = A, URL 접속 가능 + 일부 에러 = B, 빌드 실패 = C
- **코드 품질(20%)**: 구조 정리 + RLS + 보안 = A, 구조 정리 = B, 하드코딩/보안 이슈 = C
- **AI 활용(20%)**: 로그 5건 이상 + 실수/수정 기록 = A, 로그 3건 이상 = B, 로그 부실 = C

> **강의 팁**: "기능이 5개인데 3개만 완성했어도, 그 3개가 잘 동작하고 배포되어 있으면 높은 점수를 받는다. 반대로 기능 10개를 시도했는데 하나도 제대로 안 되면 낮은 점수이다." — 완성도가 양보다 중요하다는 점을 강조하자.

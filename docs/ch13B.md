# Chapter 13. 개인 프로젝트 구현 — B회차: 실습

> **미션**: 개인 프로젝트 MVP를 구현하고 Vercel에 배포한다

---

## 수업 타임라인

**표 13.8** B회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | A회차 핵심 리캡 + 과제 스펙 확인 |
| 00:05~00:10 | 바이브코딩 가이드 + 스타터 코드 안내 |
| 00:10~00:35 | 체크포인트 1: 설계서 보완 + DB/인증 구축 |
| 00:35~00:55 | 체크포인트 2: MVP 핵심 기능 구현 |
| 00:55~01:10 | 체크포인트 3: 검증 + 배포 + 문서화 |
| 01:10~01:15 | Google Classroom 제출 |
| 01:15~01:25 | 결과 공유 + 코드리뷰 토론 |
| 01:25~01:30 | 교수 종합 피드백 |

---

## 과제 스펙 + 스타터 코드 안내

### 과제 요구사항

Ch7 설계서를 기반으로 개인 프로젝트 MVP를 구현하고 배포한다:

① ARCHITECTURE.md 보완 완료 (Data Model + RLS + 인증 반영)
② MVP 기능 최대한 구현 (Must have 중심)
③ Vercel 배포 완료 + 전 기능 동작 확인
④ README.md 작성 (프로젝트 설명 + 기술 스택 + 배포 URL)
⑤ AI 사용 로그 최소 5항목 (AI_LOG.md)
⑥ 배포 URL + GitHub 저장소 링크 제출

### 스타터 코드

`practice/chapter13/starter/` 폴더에 기본 Next.js + Supabase + 인증 설정이 완료된 프로젝트 템플릿이다. 여기서 시작하거나, 기존 프로젝트에 기능을 추가해도 된다.

```
practice/chapter13/starter/
├── app/
│   ├── layout.tsx           ← AuthProvider + metadata 설정 완료
│   ├── page.tsx             ← 메인 페이지 (커스터마이징 필요)
│   ├── login/page.tsx       ← 로그인 (완성)
│   ├── signup/page.tsx      ← 회원가입 (완성)
│   ├── error.tsx            ← 에러 처리 (완성)
│   └── loading.tsx          ← 로딩 UI (완성)
├── components/              ← 공통 컴포넌트
├── lib/
│   ├── supabase/            ← 클라이언트 (완성)
│   ├── auth.ts              ← 인증 함수 (완성)
│   └── auth-context.tsx     ← AuthContext (완성)
├── supabase/
│   └── schema.sql           ← 테이블 SQL (커스터마이징 필요)
├── ARCHITECTURE.md          ← 설계서 (Ch7에서 작성한 것 복사)
├── AI_LOG.md                ← AI 사용 로그 템플릿
├── README.md                ← 프로젝트 설명 템플릿
├── package.json
└── next.config.ts
```

**시작 방법** (PowerShell 기준):
```bash
cd practice/chapter13/starter
npm install
npm run dev
```
macOS Terminal도 동일하다.

브라우저에서 http://localhost:3000 을 열어 기본 페이지가 보이는지 확인한다.

---

## 바이브코딩 가이드

> **Copilot 활용**: 이번 실습에서는 Copilot에게 기능 단위로 구현을 요청한다. 한 번에 전체를 요청하지 말고, A회차에서 배운 "기능 하나씩 만들고 → 테스트하고 → 커밋" 패턴을 따른다.

**좋은 프롬프트 vs 나쁜 프롬프트**:

❌ 나쁜 프롬프트:
> "내 프로젝트 전부 만들어줘"

문제: 범위가 너무 넓고, 테이블 구조, 인증, RLS, UI 세부사항이 전혀 명시되지 않았다.

✅ 좋은 프롬프트:

> **Copilot 프롬프트**
> "#file:ARCHITECTURE.md #file:copilot-instructions.md
> ARCHITECTURE.md의 데이터 모델을 기반으로 Supabase SQL을 만들어줘.
> 테이블: reviews (id uuid PK, user_id uuid FK→profiles, restaurant_name text, content text, rating int, created_at timestamptz)
> RLS: 누구나 읽기, 로그인만 작성, 작성자만 수정/삭제
> 인덱스: created_at DESC"

<!-- COPILOT_VERIFY: 위 프롬프트를 Copilot Chat에 입력하고 #file 참조가 동작하는지 확인해주세요 -->

**구현 순서** (A회차에서 배운 5단계):

```
DB(SQL + RLS) → 인증(이미 완성) → CRUD(lib/ 함수) → UI(app/ 페이지) → 배포(Vercel)
```

---

## 개인 실습

### 체크포인트 1: 설계서 보완 + DB/인증 구축

**목표**: ARCHITECTURE.md를 최신 상태로 보완하고, 데이터베이스와 RLS를 설정한다.

① Ch7에서 작성한 ARCHITECTURE.md를 확인하고 보완한다:
   - 데이터 모델에 Supabase 타입(uuid, timestamptz 등) 반영
   - RLS 정책 항목 추가
   - 인증 흐름 반영 (이메일 로그인)

② Supabase SQL Editor에서 테이블을 생성한다 (설계서 기반)
③ RLS 정책을 생성한다 (Ch11에서 배운 4대 정책 패턴)
④ context.md를 업데이트한다 — 현재 진행 상황 기록

> **강의 팁**: 설계서가 미완성인 학생이 있으면 ARCHITECTURE.md 템플릿에서 시작하도록 안내한다. 설계서 없이 코딩을 시작하지 않도록 주의시킨다.

### 체크포인트 2: MVP 핵심 기능 구현

**목표**: Must have 기능을 Copilot과 협업하여 구현한다.

① todo.md에서 Must have 기능 목록을 확인한다 (최대 3개)
② 기능 하나를 선택하여 Copilot에게 구현을 요청한다:

> **Copilot 프롬프트**
> "#file:ARCHITECTURE.md #file:context.md
> [기능명]을 구현해줘.
> 파일: lib/[기능명].ts (CRUD 함수) + app/[경로]/page.tsx (UI)
> 데이터: [테이블명]의 [컬럼] 사용
> 인증: useAuth()로 로그인 사용자 확인
> 스타일: Tailwind CSS + shadcn/ui"

③ 생성된 코드의 4가지 체크포인트를 확인한다:
   - import 경로가 올바른가?
   - Supabase 클라이언트가 올바른가? (브라우저 vs 서버)
   - `"use client"`가 필요한 곳에만 있는가?
   - 하드코딩된 값이 없는가?

④ 기능이 동작하면 커밋한다:

```bash
git add .
git commit -m "feat: [기능명] 구현"
```

⑤ 시간이 남으면 다음 Must have 기능을 반복한다

<!-- COPILOT_VERIFY: #file 참조로 ARCHITECTURE.md와 context.md를 동시에 전달했을 때 Copilot의 코드 품질이 향상되는지 확인해주세요 -->

### 체크포인트 3: 검증 + 배포 + 문서화

**목표**: 구현된 기능을 검증하고, 배포하고, 문서를 완성한다.

① 아래 검증 체크리스트를 수행한다
② README.md를 작성한다:

```markdown
# [프로젝트 이름]

## 프로젝트 설명
[한 문장 설명]

## 기술 스택
- Next.js 14 (App Router)
- Tailwind CSS + shadcn/ui
- Supabase (Auth + Database + RLS)
- Vercel (배포)

## 배포 URL
https://[프로젝트].vercel.app

## 주요 기능
- [기능 1]
- [기능 2]
- [기능 3]
```

③ AI_LOG.md에 AI 사용 기록을 최소 5항목 작성한다:

```markdown
## AI 사용 로그

| # | 요청 내용 | AI 응답 품질 | 수정 사항 |
|---|-----------|-------------|-----------|
| 1 | DB 스키마 생성 | 좋음 | uuid 타입 수정 |
| 2 | CRUD 함수 작성 | 보통 | select 관계 쿼리 수정 |
| ...| ... | ... | ... |
```

④ Vercel에 배포한다:

```bash
git add .
git commit -m "Ch13: MVP 구현 + 문서 완성"
git push
```

⑤ 배포된 URL에서 전 기능이 동작하는지 확인한다

---

## 검증 체크리스트

**표 13.9** 개인 프로젝트 검증 체크리스트

| 항목 | 확인 내용 | 확인 |
|------|-----------|------|
| ARCHITECTURE.md | 데이터 모델 + RLS + 인증이 반영되었는가? | ☐ |
| DB 테이블 | 설계서 기반 테이블이 Supabase에 생성되었는가? | ☐ |
| RLS | 테이블마다 RLS 정책이 적용되었는가? | ☐ |
| 인증 | 로그인/로그아웃이 동작하는가? | ☐ |
| CRUD | Must have 기능의 생성/조회/수정/삭제가 동작하는가? | ☐ |
| 에러 처리 | error.tsx + loading.tsx가 동작하는가? | ☐ |
| README.md | 프로젝트 설명 + 기술 스택 + 배포 URL이 있는가? | ☐ |
| AI_LOG.md | AI 사용 기록이 5항목 이상인가? | ☐ |
| 배포 URL | 배포된 사이트에서 전 기능이 동작하는가? | ☐ |

---

## 흔한 AI 실수

**표 13.10** Ch13에서 AI가 자주 틀리는 패턴

| AI 실수 | 올바른 방법 | 발생 원인 |
|---------|------------|----------|
| 존재하지 않는 모듈 import (`Module not found`) | 실제 파일 경로 확인 후 import | AI 환각 (없는 패키지 추천) |
| RLS 정책 누락으로 데이터 안 보임 | 테이블별 최소 SELECT 정책 필수 | RLS 활성화 후 정책 미생성 |
| 환경 변수 미등록 (Vercel에서 에러) | Vercel 대시보드에도 환경 변수 등록 | 로컬 ≠ 배포 환경 |
| Hydration 불일치 에러 | Server/Client 렌더링 결과 일치 확인 | 서버/클라이언트 출력 차이 |
| `auth.uid()` 대신 하드코딩된 UUID | SQL에서 `auth.uid()` 함수 사용 | 동적 사용자 ID 미인식 |
| 한 번에 전체 프로젝트 생성 시도 | 기능별로 나눠서 구현 + 테스트 + 커밋 | 범위 과대 |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch13 과제"에 아래 세 항목을 제출한다:

```
① 배포 URL
   예: https://내프로젝트.vercel.app

② GitHub 저장소 URL
   예: https://github.com/내아이디/내프로젝트
   (ARCHITECTURE.md, README.md, AI_LOG.md 포함)

③ AI가 틀린 부분 1개
   예: "Copilot이 존재하지 않는 @supabase/auth-helpers-nextjs를 import해서
       Module not found 에러가 발생했다. @supabase/ssr로 수정했다."
```

---

## 코드리뷰 토론 가이드

> **토론 가이드**: 2-3명이 자발적으로 화면을 공유하며 결과를 발표한다.

**발표 포인트** (1인당 3-5분):
1. 배포된 URL을 브라우저에 띄운다
2. 프로젝트 주제와 핵심 기능을 소개한다
3. 가장 어려웠던 부분과 해결 과정을 공유한다
4. AI 사용 로그에서 인상적인 항목을 소개한다

**토론 질문**:
- "설계서(ARCHITECTURE.md)가 실제 구현에 어떻게 도움이 되었는가?"
- "AI에게 한 번에 전체를 요청하는 것과 기능별로 나눠 요청하는 것, 어느 쪽이 더 효과적이었는가?"
- "다음에 프로젝트를 다시 한다면 무엇을 다르게 하겠는가?"

---

## 교수 피드백 포인트

**확인할 것**:
- ARCHITECTURE.md가 실제 구현과 일치하는지 (설계서 ≠ 코드이면 지적)
- AI_LOG.md에 실제 경험이 기록되었는지 (복사/붙여넣기가 아닌지)
- RLS가 적용되어 있는지 (보안 없는 CRUD는 감점 대상)

**우수 사례 공유**:
- 완성도 높은 프로젝트 1-2개를 화면에 띄워 동기부여
- AI_LOG.md에서 흥미로운 AI 실수 사례를 공유

**마무리**:
> 이번 학기에 배운 기술 — Next.js, Tailwind CSS, Supabase, Vercel, 그리고 AI 협업 — 을 하나의 프로젝트에 통합했다. 기말고사에서는 Ch8~12 내용이 객관식으로 출제된다. 배포된 프로젝트와 AI 사용 로그를 정리해두면 시험 준비에도 도움이 된다.

# Chapter 10. Supabase Database CRUD — B회차: 실습

> **미션**: 마음톡 CRUD를 완성하고 배포한다 — 목록, 작성, 상세, 수정, 삭제

---

## 수업 타임라인

**표 10.8** B회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | A회차 핵심 리캡 + 과제 스펙 확인 |
| 00:05~00:10 | 바이브코딩 가이드 + 스타터 코드 안내 |
| 00:10~00:30 | 체크포인트 1: 목록 + 작성 페이지 |
| 00:30~00:50 | 체크포인트 2: 상세 + 수정 + 삭제 |
| 00:50~01:05 | 체크포인트 3: 검증 + 배포 |
| 01:05~01:10 | Google Classroom 제출 |
| 01:10~01:25 | 결과 공유 + 코드리뷰 토론 |
| 01:25~01:30 | 교수 종합 피드백 + 다음 주 예고 |

---

## 과제 스펙 + 스타터 코드 안내

### 과제 요구사항

Ch9에서 구현한 인증 기반 위에 마음톡 CRUD 기능을 완성한다:

① 게시글 목록 페이지 — 작성자 이름 표시, 최신순 정렬
② 게시글 작성 페이지 — 로그인 사용자만 접근
③ 마음톡 상세 페이지 — 본인 글에만 수정/삭제 버튼
④ 마음톡 수정 기능
⑤ 마음톡 삭제 기능 — 확인 대화상자 포함
⑥ GitHub push + Vercel 배포

### 스타터 코드

`practice/chapter10/starter/` 폴더에 마음톡 프론트엔드(인증 포함)가 준비되어 있고, CRUD 함수 부분이 TODO로 비어 있다.

```
practice/chapter10/starter/
├── app/
│   ├── layout.tsx           ← AuthProvider 적용 완료
│   ├── page.tsx             ← 메인 페이지 (게시글 목록 뼈대)
│   └── mindtalk/
│       ├── page.tsx         ← 마음톡 목록 (TODO: select)
│       ├── new/
│       │   └── page.tsx     ← 마음톡 작성 (TODO: insert)
│       └── [id]/
│           ├── page.tsx     ← 마음톡 상세 (TODO: select by id)
│           └── edit/
│               └── page.tsx ← 마음톡 수정 (TODO: update)
├── lib/
│   ├── supabase/            ← 클라이언트 (완성)
│   ├── auth.ts              ← 인증 함수 (완성)
│   ├── auth-context.tsx     ← AuthContext (완성)
│   └── mindtalk.ts          ← CRUD 함수 (TODO)
├── package.json
└── next.config.ts
```

**시작 방법** (PowerShell 기준):
```bash
cd practice/chapter10/starter
npm install
npm run dev
```
macOS Terminal도 동일하다.

브라우저에서 http://localhost:3000 을 열어 기본 페이지가 보이는지 확인한다.

---

## 바이브코딩 가이드

> **Copilot 활용**: 이번 실습에서는 Copilot Chat에 CRUD 함수와 페이지를 요청한다. A회차에서 배운 SQL ↔ Supabase 클라이언트 대응을 기준으로 생성된 코드를 검증한다.

**좋은 프롬프트 vs 나쁜 프롬프트**:

❌ 나쁜 프롬프트:
> "게시판 CRUD 만들어줘"

문제: 테이블명, 컬럼, 정렬 기준, 관계 데이터 포함 여부가 전혀 명시되지 않았다.

✅ 좋은 프롬프트:


> [버전 고정] Next.js 14.2.21, React 18.3.1, Tailwind CSS 3.4.17, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2 기준으로 작성해줘.
> [규칙] App Router만 사용하고 next/router, pages router, 구버전 API는 사용하지 마.
> [검증] 불확실하면 현재 프로젝트 package.json 기준으로 버전을 먼저 확인하고 답해줘.
> "Supabase에서 마음톡 CRUD 함수를 lib/mindtalk.ts에 만들어줘.
> 테이블: posts (id, user_id, title, content, created_at)
> 1) getMindtalks: 전체 조회, created_at 내림차순, profiles(username) 포함
> 2) getMindtalk(id): 단건 조회, profiles(username) 포함
> 3) createMindtalk(user_id, title, content): 생성
> 4) updateMindtalk(id, title, content): 수정
> 5) deleteMindtalk(id): 삭제
> 모든 함수는 { data, error } 반환. @supabase/ssr 사용."

<!-- COPILOT_VERIFY: 위 프롬프트를 Copilot Chat에 입력하고 관계 데이터 조회 문법이 올바른지 확인해주세요 -->

---

## 개인 실습

### 체크포인트 1: 목록 + 작성 페이지

**목표**: 마음톡 목록 조회와 게시글 작성 기능을 구현한다.

① `lib/mindtalk.ts`에 `getMindtalks` 함수를 작성한다:

```typescript
// lib/mindtalk.ts — 목록 조회 핵심 구조
export async function getMindtalks() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .order("created_at", { ascending: false })
  return { data, error }
}
```

② `app/mindtalk/page.tsx`에서 `getMindtalks()`를 호출하여 목록을 표시한다
③ `lib/mindtalk.ts`에 `createMindtalk` 함수를 작성한다:

```typescript
// 작성 핵심 구조
export async function createMindtalk(user_id: string, title: string, content: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("posts")
    .insert({ user_id, title, content })
    .select()
  return { data, error }
}
```

④ `app/mindtalk/new/page.tsx`에 작성 폼을 구현한다 — 로그인 사용자만 접근
⑤ 게시글을 작성하고 목록에 나타나는지 확인한다

> **강의 팁**: `.select("*, profiles(username)")`에서 profiles가 올바르게 join되는지 확인한다. FK가 잘못 설정된 경우 빈 배열이 반환된다.

### 체크포인트 2: 상세 + 수정 + 삭제

**목표**: 마음톡 상세 조회, 수정, 삭제 기능을 구현한다.

① `lib/mindtalk.ts`에 `getMindtalk(id)` 함수를 작성한다 — `.eq("id", id).single()` 사용
② `app/mindtalk/[id]/page.tsx`에 상세 페이지를 구현한다
③ 본인 글에만 수정/삭제 버튼을 표시한다 (조건부 렌더링):

```tsx
// 핵심 구조
{user?.id === post.user_id && (
  <div>
    <Link href={`/mindtalk/${post.id}/edit`}>수정</Link>
    <button onClick={handleDelete}>삭제</button>
  </div>
)}
```

④ `updateMindtalk(id, title, content)` 함수와 수정 페이지를 구현한다
⑤ `deleteMindtalk(id)` 함수를 구현한다 — 삭제 전 `window.confirm()` 확인
⑥ 수정과 삭제가 정상 동작하는지 테스트한다

<!-- COPILOT_VERIFY: 수정/삭제 조건부 렌더링이 올바르게 구현되는지 확인해주세요 -->

### 체크포인트 3: 검증 + 배포

**목표**: CRUD 코드를 검증하고 배포한다.

① 아래 검증 체크리스트를 수행한다
② 문제가 있으면 수정한다
③ git push로 배포한다:

```bash
git add .
git commit -m "Ch10: 마음톡 CRUD 완성"
git push
```

④ Vercel 대시보드에서 배포 완료를 확인한다
⑤ 배포된 URL에서 목록 → 작성 → 상세 → 수정 → 삭제가 동작하는지 확인한다

---

## 검증 체크리스트

**표 10.9** CRUD 구현 검증 체크리스트

| 항목 | 확인 내용 | 확인 |
|------|-----------|------|
| select | 목록 조회에서 작성자 이름이 표시되는가? (profiles join) | ☐ |
| insert | 게시글 작성 후 목록에 나타나는가? | ☐ |
| update | 수정 후 내용이 반영되는가? | ☐ |
| delete | 삭제 후 목록에서 사라지는가? | ☐ |
| WHERE 조건 | update/delete에 `.eq("id", id)`가 있는가? | ☐ |
| 에러 처리 | `{ data, error }` 패턴으로 에러를 확인하는가? | ☐ |
| 권한 UI | 본인 글에만 수정/삭제 버튼이 보이는가? | ☐ |
| 삭제 확인 | 삭제 전 confirm 대화상자가 뜨는가? | ☐ |
| 배포 URL | 배포된 사이트에서 CRUD가 동작하는가? | ☐ |

---

## 흔한 AI 실수

**표 10.10** Ch10에서 AI가 자주 틀리는 패턴

| AI 실수 | 올바른 방법 | 발생 원인 |
|---------|------------|----------|
| `.select("*")` — 관계 데이터 누락 | `.select("*, profiles(username)")` | 외래 키 join 미인식 |
| update/delete에 WHERE 조건 없음 | `.eq("id", id)` 필수 | 모든 행 변경 위험 |
| `.single()` 없이 단건 조회 | `.eq("id", id).single()` | 배열 대신 객체 반환 필요 |
| insert 후 페이지 새로고침 없음 | `router.push("/mindtalk")` 또는 `router.refresh()` | UX 흐름 미고려 |
| 삭제 시 confirm 없음 | `window.confirm("정말 삭제하시겠습니까?")` 추가 | 실수 방지 UX 누락 |
| 서버 컴포넌트에서 `onClick` 사용 | `"use client"` 추가 또는 Client Component 분리 | Server/Client 구분 혼동 |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch10 과제"에 아래 두 항목을 제출한다:

```
① 배포 URL
   예: https://내프로젝트.vercel.app

② AI가 틀린 부분 1개
   예: "Copilot이 .select('*')만 작성해서 작성자 이름이 안 보였다.
       .select('*, profiles(username)')로 수정하니 해결되었다."
```

---

## 코드리뷰 토론 가이드

> **토론 가이드**: 2-3명이 자발적으로 화면을 공유하며 결과를 발표한다.

**발표 포인트** (1인당 3-5분):
1. 배포된 URL을 브라우저에 띄운다
2. 게시글 작성 → 목록 확인 → 수정 → 삭제 흐름을 시연한다
3. 본인 글에만 수정/삭제 버튼이 보이는지 보여준다
4. Copilot이 틀린 부분과 어떻게 수정했는지 설명한다

**토론 질문**:
- "update/delete에 WHERE 조건이 없으면 실제로 어떤 일이 발생하는가?"
- "UI에서 수정/삭제 버튼을 숨기는 것만으로 보안이 충분한가? (힌트: 브라우저 개발자 도구)"
- "관계 데이터 조회(.select('*, profiles(username)'))와 별도 쿼리 2번 중 어느 것이 좋은가?"

---

## 교수 피드백 포인트

**확인할 것**:
- update/delete에 `.eq("id", id)` 조건이 있는지 — 없으면 모든 행이 변경된다
- 본인 글 확인이 `user?.id === post.user_id`로 되어 있는지
- 삭제 전 확인 대화상자가 있는지

**우수 사례 공유**:
- CRUD 흐름이 매끄럽고 에러 처리가 잘 된 프로젝트 1-2개를 화면에 띄워 동기부여

**다음 주 예고**:
> 다음 주에는 **Row Level Security (RLS)**를 배운다. 지금은 UI에서만 수정/삭제를 제한하지만, 브라우저 개발자 도구로 우회할 수 있다. RLS로 데이터베이스가 보안을 강제하도록 만든다.


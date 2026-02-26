# Chapter 9. Supabase Authentication — B회차: 실습

> **미션**: 이메일/비밀번호 로그인을 구현하고 배포한다

---

## 수업 타임라인

**표 9.9** B회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | A회차 핵심 리캡 + 과제 스펙 확인 |
| 00:05~00:10 | 바이브코딩 가이드 + 스타터 코드 안내 |
| 00:10~00:30 | 체크포인트 1: 인증 함수 + AuthContext |
| 00:30~00:50 | 체크포인트 2: 로그인/회원가입 UI |
| 00:50~01:05 | 체크포인트 3: 검증 + 배포 |
| 01:05~01:10 | Google Classroom 제출 |
| 01:10~01:25 | 결과 공유 + 코드리뷰 토론 |
| 01:25~01:30 | 교수 종합 피드백 + 다음 주 예고 |

---

## 과제 스펙 + 스타터 코드 안내

### 과제 요구사항

Ch8에서 연결한 Supabase에 이메일/비밀번호 인증을 추가한다:

① Supabase Auth Provider(Email) 설정 확인
② `lib/auth.ts` — signInWithEmail, signUpWithEmail, signOut 구현
③ `lib/auth-context.tsx` — AuthProvider + useAuth
④ `components/layout/header.tsx` — 로그인/로그아웃 UI (기존 헤더에 통합)
⑤ `app/login/page.tsx` — 이메일 로그인 UI
⑥ `app/signup/page.tsx` — 이메일 회원가입 UI
⑦ 이메일 로그인 → 로그아웃 → 재로그인 테스트 성공

### 스타터 코드

`practice/chapter9/starter/` 폴더에 Ch8 완성 코드 기반 + 인증 관련 파일 뼈대(TODO 주석)가 준비되어 있다.

```
practice/chapter9/starter/
├── app/
│   ├── layout.tsx          ← AuthProvider 감싸기 (TODO)
│   ├── page.tsx            ← 메인 페이지
│   ├── login/
│   │   └── page.tsx        ← 로그인 폼 (TODO)
│   └── signup/
│       └── page.tsx        ← 회원가입 폼 (TODO)
├── components/
│   └── layout/
│       └── header.tsx      ← 로그인/로그아웃 버튼 (TODO)
├── lib/
│   ├── supabase/
│   │   ├── client.ts       ← 브라우저 클라이언트 (완성)
│   │   └── server.ts       ← 서버 클라이언트 (완성)
│   ├── auth.ts             ← 인증 함수 (TODO)
│   └── auth-context.tsx    ← AuthContext (TODO)
├── .env.local.example
├── package.json
└── next.config.ts
```

**시작 방법** (PowerShell 기준):
```bash
cd practice/chapter9/starter
npm install
npm run dev
```
macOS Terminal도 동일하다.

브라우저에서 http://localhost:3000 을 열어 기본 페이지가 보이는지 확인한다.

---

## 바이브코딩 가이드

> **Copilot 활용**: 이번 실습에서는 Copilot Chat에 인증 구현을 요청한다. 인증은 보안과 직결되므로, 생성된 코드를 A회차에서 배운 패턴과 반드시 대조하여 검증한다.

**좋은 프롬프트 vs 나쁜 프롬프트**:

❌ 나쁜 프롬프트:
> "로그인 기능 만들어줘"

문제: 인증 방식(이메일, OAuth), 상태 관리 방법, 보호 페이지 처리가 전혀 명시되지 않았다.

✅ 좋은 프롬프트:

> **Copilot 프롬프트**
> "Supabase Auth로 이메일/비밀번호 로그인을 구현해줘.
> lib/auth.ts에 signInWithEmail, signUpWithEmail, signOut 함수를 만들어줘.
> lib/auth-context.tsx에 AuthProvider + useAuth Hook으로 전역 상태 관리.
> onAuthStateChange로 세션 변화를 감지하고, user/profile/loading 상태를 관리.
> @supabase/ssr 패키지 사용, Next.js 14 App Router 환경."

<!-- COPILOT_VERIFY: 위 프롬프트를 Copilot Chat에 입력하고 onAuthStateChange 리스너가 올바르게 구현되는지 확인해주세요 -->

---

## 개인 실습

### 체크포인트 1: 인증 함수 + AuthContext

**목표**: 인증 함수를 작성하고, AuthContext로 전역 상태를 관리한다.

① Supabase 대시보드 → Authentication → Providers에서 Email이 활성화되어 있는지 확인한다
② `lib/auth.ts`에 인증 함수 3개를 작성한다:

```typescript
// lib/auth.ts — 핵심 구조
import { createClient } from "@/lib/supabase/client"

export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email, password,
  })
  return { data, error }
}
// signUpWithEmail, signOut도 동일 패턴
```

③ `lib/auth-context.tsx`에 AuthProvider와 useAuth Hook을 작성한다
④ `app/layout.tsx`에서 `<AuthProvider>`로 전체 앱을 감싼다
⑤ 콘솔에서 AuthProvider가 정상 로드되는지 확인한다

> **강의 팁**: `"use client"`를 auth-context.tsx 최상단에 넣었는지 확인한다. Context + Hook은 Client Component에서만 동작한다.

### 체크포인트 2: 로그인/회원가입 UI

**목표**: 로그인·회원가입 페이지와 헤더의 로그인/로그아웃 UI를 완성한다.

① `app/login/page.tsx`에 로그인 폼을 만든다 — 이메일 + 비밀번호 + 로그인 버튼
② `app/signup/page.tsx`에 회원가입 폼을 만든다 — 이메일 + 비밀번호 + 가입 버튼
③ `components/layout/header.tsx`에 조건부 렌더링을 추가한다:

```tsx
// 핵심 구조
const { user, loading } = useAuth()

{user ? (
  <button onClick={handleSignOut}>로그아웃</button>
) : (
  <Link href="/login">로그인</Link>
)}
```

④ 회원가입 → 로그인 → 로그아웃 → 재로그인 흐름을 테스트한다
⑤ 로그인 실패 시 에러 메시지가 표시되는지 확인한다

<!-- COPILOT_VERIFY: Copilot이 생성한 로그인 폼에서 에러 처리가 올바르게 구현되었는지 확인해주세요 -->

### 체크포인트 3: 검증 + 배포

**목표**: 인증 코드를 검증하고 배포한다.

① 아래 검증 체크리스트를 수행한다
② 문제가 있으면 수정한다
③ git push로 배포한다:

```bash
git add .
git commit -m "Ch9: 이메일 로그인 구현"
git push
```

④ Vercel 대시보드에서 배포 완료를 확인한다
⑤ 배포된 URL에서 회원가입 → 로그인 → 로그아웃이 동작하는지 확인한다

---

## 검증 체크리스트

**표 9.10** 인증 구현 검증 체크리스트

| 항목 | 확인 내용 | 확인 |
|------|-----------|------|
| Auth Provider | Supabase 대시보드에서 Email이 활성화되어 있는가? | ☐ |
| signInWithPassword | `supabase.auth.signInWithPassword`를 사용하는가? | ☐ |
| AuthContext | `"use client"` + `createContext` + `useContext`가 있는가? | ☐ |
| onAuthStateChange | 리스너가 등록되고, 클린업(unsubscribe)이 있는가? | ☐ |
| 헤더 조건부 렌더링 | user 유무에 따라 로그인/로그아웃이 전환되는가? | ☐ |
| 에러 처리 | 로그인 실패 시 사용자에게 메시지가 표시되는가? | ☐ |
| 비밀번호 노출 | 비밀번호가 코드에 하드코딩되어 있지 않은가? | ☐ |
| 배포 URL | 배포된 사이트에서 로그인/로그아웃이 동작하는가? | ☐ |

---

## 흔한 AI 실수

**표 9.11** Ch9에서 AI가 자주 틀리는 패턴

| AI 실수 | 올바른 방법 | 발생 원인 |
|---------|------------|----------|
| `supabase.auth.signIn()` 사용 | `supabase.auth.signInWithPassword()` 사용 | 구버전 API 학습 |
| AuthContext에 `"use client"` 누락 | 파일 최상단에 `"use client"` 필수 | Server/Client 구분 미인식 |
| `onAuthStateChange` 클린업 누락 | `return () => subscription.unsubscribe()` | 메모리 누수 방지 누락 |
| `session` 대신 `user`로 인증 확인 | `getUser()`로 서버에서 사용자 확인 | JWT 조작 가능성 무시 |
| 로그인 성공 후 리다이렉트 없음 | `router.push("/")` 또는 `router.refresh()` 추가 | UX 흐름 미고려 |
| 비밀번호 최소 길이 미설정 | Supabase 기본값은 6자 — UI에서도 안내 필요 | Supabase 설정 미확인 |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch9 과제"에 아래 두 항목을 제출한다:

```
① 배포 URL
   예: https://내프로젝트.vercel.app

② AI가 틀린 부분 1개
   예: "Copilot이 supabase.auth.signIn()을 사용했는데,
       최신 버전에서는 signInWithPassword()로 수정했다."
```

---

## 코드리뷰 토론 가이드

> **토론 가이드**: 2-3명이 자발적으로 화면을 공유하며 결과를 발표한다.

**발표 포인트** (1인당 3-5분):
1. 배포된 URL을 브라우저에 띄운다
2. 회원가입 → 로그인 → 로그아웃 흐름을 시연한다
3. 헤더의 로그인/로그아웃 전환을 보여준다
4. Copilot이 틀린 부분과 어떻게 수정했는지 설명한다

**토론 질문**:
- "AuthContext 없이 각 페이지에서 개별적으로 인증 상태를 확인하면 어떤 문제가 발생하는가?"
- "onAuthStateChange 클린업을 빼먹으면 실제로 어떤 버그가 생기는가?"
- "로그인 페이지에서 비밀번호를 평문으로 전송해도 괜찮은 이유는? (HTTPS)"

---

## 교수 피드백 포인트

**확인할 것**:
- `"use client"`가 필요한 파일에만 있는지 — auth-context, 로그인/회원가입 페이지
- `onAuthStateChange` 리스너에 클린업(unsubscribe)이 있는지
- 비밀번호가 코드에 하드코딩되어 있지 않은지

**우수 사례 공유**:
- 에러 메시지를 사용자 친화적으로 잘 처리한 프로젝트 1-2개를 화면에 띄워 동기부여

**다음 주 예고**:
> 다음 주에는 **Supabase Database CRUD**를 배운다. 로그인한 사용자가 게시글을 작성, 수정, 삭제할 수 있도록 데이터베이스 조작을 구현한다.

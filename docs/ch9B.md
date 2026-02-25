# Chapter 9. Supabase Authentication — B회차: 실습

> **미션**: Google 로그인을 구현하고 배포한다

---

## 수업 타임라인

**표 9.9** B회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | A회차 핵심 리캡 + 과제 스펙 확인 |
| 00:05~00:10 | 바이브코딩 가이드 + 스타터 코드 안내 |
| 00:10~00:25 | 체크포인트 1: Google OAuth 설정 + 콜백 구현 |
| 00:25~00:45 | 체크포인트 2: AuthContext + Navbar UI |
| 00:45~01:00 | 체크포인트 3: 검증 + 배포 |
| 01:00~01:05 | Google Classroom 제출 |
| 01:05~01:25 | 결과 공유 + 코드리뷰 토론 |
| 01:25~01:30 | 교수 종합 피드백 + 다음 주 예고 |

---

## 과제 스펙 + 스타터 코드 안내

### 과제 요구사항

**Google 로그인 기능이 있는 게시판**을 배포한다:

① Google Cloud Console OAuth 설정 (Client ID + Secret)
② Supabase Auth Provider에 Google 등록
③ `lib/auth.js` — signInWithGoogle, signOut 함수
④ `app/auth/callback/route.js` — OAuth 콜백 Route Handler
⑤ `contexts/AuthContext.js` — AuthProvider + useAuth Hook

### 스타터 코드

`practice/chapter9/starter/` 폴더에 Ch8 완성본 기반의 프로젝트가 준비되어 있다. 인증 관련 파일은 TODO 주석만 포함되어 있다.

```
practice/chapter9/starter/
├── app/
│   ├── layout.js       ← TODO: AuthProvider 감싸기
│   ├── page.js         ← 게시판 메인 (Supabase 연동 완료)
│   ├── globals.css
│   └── auth/
│       └── callback/
│           └── route.js  ← TODO: 콜백 처리 구현
├── lib/
│   ├── supabase.js     ← Ch8에서 완성한 클라이언트
│   └── auth.js         ← TODO: signInWithGoogle, signOut 구현
├── contexts/
│   └── AuthContext.js   ← TODO: AuthProvider + useAuth 구현
├── components/
│   └── Navbar.js        ← TODO: 로그인/로그아웃 UI
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
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

> **Copilot 활용**: 이번 실습에서는 Copilot Chat에 프롬프트를 입력하여 인증 코드를 생성한다. 생성된 코드를 그대로 쓰지 말고, A회차에서 배운 기준으로 반드시 검증한다.

**좋은 프롬프트 vs 나쁜 프롬프트**:

나쁜 프롬프트:
> "로그인 기능 만들어줘"

문제: 이메일+비밀번호인지 소셜 로그인인지, 어떤 Provider인지, 어떤 패키지를 쓰는지 전혀 알려주지 않았다.

좋은 프롬프트:

> **Copilot 프롬프트**
> "Supabase에서 Google OAuth로 로그인하는 함수를 lib/auth.js에 만들어줘.
> @/lib/supabase에서 createClient를 import해.
> signInWithOAuth 사용, provider는 google.
> redirectTo는 window.location.origin + '/auth/callback'.
> signInWithGoogle과 signOut 두 함수를 export해줘."

<!-- COPILOT_VERIFY: 위 프롬프트를 Copilot Chat에 입력하고 생성 결과를 캡처해주세요 -->

---

## 개인 실습

### 체크포인트 1: Google OAuth 설정 + 콜백 구현 (15분)

**목표**: Google OAuth를 설정하고 콜백 Route Handler를 구현한다.

① Google Cloud Console에서 OAuth 2.0 Client ID를 생성한다
   - Application type: Web application
   - Authorized redirect URIs: Supabase의 Callback URL 입력
② Supabase Dashboard → Authentication → Providers → Google 활성화
   - Client ID와 Client Secret 입력
③ `lib/auth.js`를 완성한다:
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
④ `app/auth/callback/route.js`를 완성한다 (A회차 코드 참조)
⑤ **콜백 URL 확인**: Supabase Callback URL이 Google에 등록되었는지 확인

> **강의 팁**: 순회하며 학생들이 Google Cloud Console 설정을 올바르게 완료했는지 확인한다. Callback URL 누락이 가장 흔한 실패 원인이다.

### 체크포인트 2: AuthContext + Navbar UI (20분)

**목표**: 인증 상태를 전역 관리하고 로그인/로그아웃 UI를 완성한다.

① `contexts/AuthContext.js`를 완성한다:
   - `AuthProvider` 컴포넌트: `getUser()` + `onAuthStateChange`
   - `useAuth()` 커스텀 Hook
② `app/layout.js`에 `AuthProvider`를 감싼다
③ `components/Navbar.js`를 완성한다:
   - `useAuth()`에서 user, loading, signInWithGoogle, signOut 사용
   - 조건부 렌더링: 로그인 시 이메일 + 로그아웃, 비로그인 시 로그인 버튼
④ 로컬에서 Google 로그인을 테스트한다
⑤ 로그아웃 후 재로그인이 정상 동작하는지 확인한다

> **Copilot 프롬프트**
> "React Context로 Supabase 인증 상태를 관리하는 AuthContext.js를 만들어줘.
> use client, createContext, useContext, useEffect, useState 사용.
> @/lib/supabase의 createClient로 getUser(), onAuthStateChange 처리.
> @/lib/auth의 signInWithGoogle, signOut을 value에 포함.
> AuthProvider와 useAuth를 export해줘."

### 체크포인트 3: 검증 + 배포 (15분)

**목표**: AI 코드를 검증하고 배포한다.

① 아래 검증 체크리스트를 수행한다
② **Vercel 배포 준비**: Google Cloud Console에 배포 URL의 콜백도 등록한다:
```text
https://your-app.vercel.app/auth/callback
```
③ git add → git commit → git push 로 배포한다:
```bash
git add .
git commit -m "Ch9: Google 로그인 구현"
git push
```
④ 배포된 URL에서 Google 로그인이 동작하는지 확인한다
⑤ redirect_uri_mismatch 에러가 발생하면 Callback URL을 재확인한다

---

## 검증 체크리스트

**표 9.10** AI 코드 검증 체크리스트

| 항목 | 확인 |
|------|------|
| Google Cloud Console에 OAuth Client ID가 생성되었는가? | ☐ |
| Supabase에 Client ID + Secret이 입력되었는가? | ☐ |
| Callback URL이 Google에 등록되었는가? | ☐ |
| `signInWithOAuth`에 `provider: "google"`을 사용했는가? | ☐ |
| `redirectTo`에 `window.location.origin`을 사용했는가? (하드코딩 아님) | ☐ |
| `app/auth/callback/route.js`에서 `exchangeCodeForSession`을 사용했는가? | ☐ |
| `AuthProvider`가 `app/layout.js`에 감싸져 있는가? | ☐ |
| `onAuthStateChange`에 `unsubscribe()` 정리가 있는가? | ☐ |
| Google 로그인 → 로그아웃 → 재로그인이 동작하는가? | ☐ |
| 배포 URL에서도 로그인이 동작하는가? | ☐ |

---

## 흔한 AI 실수

**표 9.11** Ch9에서 AI가 자주 틀리는 패턴

| AI 실수 | 올바른 코드 | 발생 원인 |
|---------|-----------|----------|
| `signInWithPassword` 사용 | `signInWithOAuth({ provider: "google" })` | 이메일 로그인으로 기본 생성 |
| `redirectTo` 하드코딩 | `window.location.origin + "/auth/callback"` | 로컬 URL만 고려 |
| `onAuthStateChange` 리스너 정리 안 함 | `return () => subscription.unsubscribe()` | useEffect 클린업 누락 |
| `getSession()` 사용 | `getUser()` (Supabase v2+ 권장) | 구버전 API 학습 |
| 콜백 Route Handler 누락 | `app/auth/callback/route.js` 생성 | OAuth 흐름 미인지 |
| AuthProvider를 layout.js에 안 감쌈 | 최상위 layout.js에 `<AuthProvider>` 추가 | Context 동작 원리 모름 |
| 콜백에서 `createBrowserClient` 사용 | `createServerClient` (Route Handler는 서버) | 서버/클라이언트 구분 안 함 |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch9 과제"에 아래 두 항목을 제출한다:

```
① 배포 URL
   예: https://내프로젝트.vercel.app

② AI가 틀린 부분 1개
   예: "Copilot이 signInWithPassword를 사용했는데,
       signInWithOAuth({ provider: 'google' })로 수정했다."
```

**추가 제출**: 로그인 성공 화면 스크린샷 (이메일이 표시된 Navbar)

---

## 코드리뷰 토론 가이드

> **토론 가이드**: 2-3명이 자발적으로 화면을 공유하며 결과를 발표한다.

**발표 포인트** (1인당 3-5분):
1. 배포된 URL을 열고 "Google로 로그인" 버튼을 클릭한다
2. 로그인 후 이메일이 표시되는 것을 보여준다
3. 로그아웃 후 버튼이 바뀌는 것을 보여준다
4. Copilot이 틀린 부분과 수정 방법을 설명한다

**토론 질문**:
- "Google Cloud Console 설정에서 가장 헷갈렸던 부분은?"
- "Copilot이 signInWithPassword를 제안한 경우 어떻게 대처했는가?"
- "배포 환경에서 redirect_uri_mismatch 에러를 어떻게 해결했는가?"

---

## 교수 피드백 포인트

**확인할 것**:
- Google Cloud Console 설정 완료 여부 — Callback URL이 빠져서 실패하는 경우가 많음
- 배포 URL의 콜백 경로도 Google에 등록했는지 — 로컬에서만 되고 배포에서 안 되는 원인
- AuthProvider가 layout.js에 올바르게 감싸졌는지

**우수 사례 공유**:
- 로그인 UI가 깔끔한 학생 1-2명 발표

**다음 주 예고**:
> 다음 주에는 **게시글 CRUD**(생성, 조회, 수정, 삭제)를 구현한다. 오늘 만든 인증 기능으로 "누가 글을 썼는지" 알 수 있게 되었으므로, 로그인한 사용자만 글을 쓰고, 본인 글만 수정/삭제할 수 있는 게시판을 완성한다.

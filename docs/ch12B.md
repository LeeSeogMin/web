# Chapter 12. 에러 처리와 UX 완성 — B회차: 실습

> **미션**: 게시판에 에러 처리, 로딩 UI, 폼 검증을 추가하고 배포한다

---

## 수업 타임라인

**표 12.10** B회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | A회차 핵심 리캡 + 과제 스펙 확인 |
| 00:05~00:10 | 바이브코딩 가이드 + 스타터 코드 안내 |
| 00:10~00:25 | 체크포인트 1: error.js + getUserMessage |
| 00:25~00:45 | 체크포인트 2: loading.js + 스켈레톤 UI + 폼 유효성 |
| 00:45~01:00 | 체크포인트 3: 검증 + next/image + metadata + 배포 |
| 01:00~01:05 | Google Classroom 제출 |
| 01:05~01:25 | 결과 공유 + 코드리뷰 토론 |
| 01:25~01:30 | 교수 종합 피드백 + 다음 주 예고 |

---

## 과제 스펙 + 스타터 코드 안내

### 과제 요구사항

Ch8~11에서 만든 게시판에 에러 처리와 UX 개선을 적용하여 **완성도 높은 앱**으로 다듬는다:

① `app/error.js` — 에러 처리 페이지 (에러 메시지 + "다시 시도" 버튼)
② `app/loading.js` — 로딩 스피너 또는 스켈레톤 UI
③ 게시글 작성 폼 유효성 검증 (제목 필수 2~100자, 내용 필수 10자 이상)
④ `getUserMessage()` — 에러 코드를 사용자 친화적 메시지로 변환
⑤ `next/image` 사용 (프로필 이미지 또는 로고) + `metadata` 설정

### 스타터 코드

`practice/chapter12/starter/` 폴더에 Ch11까지 완성된 게시판이 준비되어 있다. 에러/로딩 처리가 빠진 상태이다.

```
practice/chapter12/starter/
├── app/
│   ├── layout.js       ← 공통 레이아웃 (Tailwind + Supabase 설정 완료)
│   ├── page.js         ← 게시글 목록 (에러/로딩 처리 없음)
│   ├── globals.css     ← Tailwind 기본 import
│   ├── login/
│   │   └── page.js     ← 로그인 페이지
│   ├── posts/
│   │   ├── [id]/
│   │   │   └── page.js ← 게시글 상세
│   │   └── new/
│   │       └── page.js ← 게시글 작성 (유효성 검증 없음)
│   └── auth/
│       └── callback/
│           └── route.js ← OAuth 콜백
├── components/
│   ├── PostList.js     ← 게시글 목록 컴포넌트
│   └── PostForm.js     ← 게시글 폼 (유효성 검증 미적용)
├── lib/
│   └── supabase.js     ← Supabase 클라이언트
├── package.json        ← 의존성 (버전 고정)
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

**시작 방법** (PowerShell 기준):
```bash
cd practice/chapter12/starter
npm install
npm run dev
```
macOS Terminal도 동일하다.

브라우저에서 http://localhost:3000 을 열어 기본 페이지가 보이는지 확인한다.

> **강의 팁**: `.env.local` 파일이 필요하다. 학생 각자의 Supabase URL/키를 넣어야 한다. Ch8에서 사용한 값을 그대로 사용하면 된다.

---

## 바이브코딩 가이드

> **Copilot 활용**: 이번 실습에서는 Copilot에게 에러 처리와 UX 개선 코드를 생성하게 한다. 생성된 코드를 그대로 쓰지 말고, A회차에서 배운 에러 메시지 3원칙과 검증 체크리스트로 반드시 검증한다.

**좋은 프롬프트 vs 나쁜 프롬프트**:

나쁜 프롬프트:
> "에러 처리 추가해줘"

문제: 어떤 에러를, 어떻게 처리할지, 어떤 메시지를 보여줄지 전혀 알려주지 않았다.

좋은 프롬프트:

> **Copilot 프롬프트**
> "Next.js App Router의 app/error.js를 만들어줘.
> 'use client' 지시어를 붙이고, error와 reset props를 받아서
> 에러 메시지를 사용자 친화적으로 표시하고, '다시 시도' 버튼으로 reset()을 호출해줘.
> Tailwind CSS로 가운데 정렬하고, 에러 아이콘은 빨간색으로 표시해줘."

<!-- COPILOT_VERIFY: 위 프롬프트를 Copilot Chat에 입력하고 생성 결과를 캡처해주세요 -->

---

## 개인 실습

### 체크포인트 1: error.js + getUserMessage (15분)

**목표**: 에러 발생 시 흰 화면 대신 사용자 친화적 에러 페이지를 보여준다.

① `app/error.js`를 생성한다 — Copilot에게 프롬프트를 입력하여 코드를 생성한다
② **`"use client"` 확인**: error.js는 반드시 클라이언트 컴포넌트여야 한다
③ `lib/utils.js`에 `getUserMessage()` 함수를 추가한다 — 에러 코드별 사용자 메시지 매핑
④ 의도적으로 에러를 발생시켜 테스트한다 — 예: Supabase 테이블명을 일시적으로 틀리게 변경
⑤ 에러 메시지가 기술 코드가 아닌 사용자 친화적 메시지인지 확인한다

> **강의 팁**: 순회하며 error.js에 `"use client"`가 있는지 확인한다. 빠뜨리면 에러 페이지 자체가 동작하지 않는다.

### 체크포인트 2: loading.js + 스켈레톤 UI + 폼 유효성 (20분)

**목표**: 로딩 중 스켈레톤 UI를 표시하고, 폼에 유효성 검증을 추가한다.

① `app/loading.js`를 생성한다 — 스피너 또는 스켈레톤 UI
② `components/PostListSkeleton.js`를 생성한다 — 게시글 카드 모양의 스켈레톤
③ PostForm 컴포넌트에 유효성 검증을 추가한다:
   - 제목: 필수, 2~100자
   - 내용: 필수, 10자 이상
   - 에러가 있는 필드에 빨간 테두리 + 에러 메시지 표시
④ 빈 제목으로 제출을 시도하여 에러 메시지가 표시되는지 확인한다
⑤ 올바른 데이터로 제출하면 에러 메시지가 사라지는지 확인한다

Copilot에게 스켈레톤 UI를 요청할 때:

> **Copilot 프롬프트**
> "기존 PostList 컴포넌트와 같은 레이아웃의 스켈레톤 UI를 Tailwind CSS로 만들어줘.
> animate-pulse를 사용하여 3개의 카드 뼈대를 보여줘.
> 제목, 작성자, 날짜, 내용 미리보기 자리에 회색 막대를 표시해줘."

### 체크포인트 3: 검증 + next/image + metadata + 배포 (15분)

**목표**: 성능 최적화를 적용하고 배포한다.

① `<img>` 태그를 `next/image`의 `<Image>` 컴포넌트로 교체한다 (프로필 이미지 또는 로고)
② `app/layout.js`에 `metadata`를 설정한다 (title, description)
③ 게시글 상세 페이지에 `generateMetadata`를 추가한다 (선택)
④ 아래 검증 체크리스트를 수행한다
⑤ 커밋 및 배포:
```bash
git add .
git commit -m "Ch12: 에러 처리 + 로딩 UI + 폼 유효성 + 성능 최적화"
git push
```
⑥ Vercel 대시보드에서 배포 완료를 확인한다
⑦ 배포된 URL에서 전체 흐름을 테스트한다:
   로그인 → 게시글 작성(유효성 검증) → 목록(로딩 UI) → 수정/삭제(권한 에러) → 로그아웃

---

## 검증 체크리스트

**표 12.11** AI 코드 검증 체크리스트

| 항목 | 확인 |
|------|------|
| `app/error.js`에 `"use client"`가 있는가? | ☐ |
| error.js가 `error`와 `reset` props를 사용하는가? | ☐ |
| 에러 메시지가 기술 코드가 아닌 사용자 친화적 메시지인가? | ☐ |
| `app/loading.js`가 존재하고 로딩 UI를 표시하는가? | ☐ |
| 빈 제목으로 제출 시 에러 메시지가 표시되는가? | ☐ |
| 에러가 있는 필드에 빨간 테두리가 표시되는가? | ☐ |
| 에러를 수정하고 다시 제출하면 에러 메시지가 사라지는가? | ☐ |
| `next/image`를 사용하고 width/height가 설정되어 있는가? | ☐ |
| `metadata`에 title과 description이 설정되어 있는가? | ☐ |
| 배포 URL에서 전체 기능이 정상 동작하는가? | ☐ |

---

## 흔한 AI 실수

**표 12.12** Ch12에서 AI가 자주 틀리는 패턴

| AI 실수 | 올바른 코드 | 발생 원인 |
|---------|-----------|----------|
| error.js에 `"use client"` 누락 | 파일 첫 줄에 `"use client"` 추가 | Server Component로 생성 |
| `next/image`에 width/height 누락 | `<Image width={800} height={400} />` | HTML `<img>` 습관 |
| 에러 메시지에 기술 용어 노출 | `getUserMessage()` 함수로 변환 | 개발자/사용자 구분 없이 표시 |
| 모든 에러에 같은 메시지 | 에러 유형별 다른 메시지 | 에러 분류 미처리 |
| 로딩 상태 없이 데이터 fetch | loading.js 또는 useState로 로딩 표시 | 로딩 상태 미고려 |
| 폼 유효성을 서버에서만 검증 | 클라이언트에서 먼저 검증 | 클라이언트 검증 미고려 |
| `next/image`에서 외부 URL 사용 시 next.config.js 미설정 | `images.remotePatterns` 추가 | 외부 이미지 허용 설정 누락 |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch12 과제"에 아래 두 항목을 제출한다:

```
① 배포 URL
   예: https://내프로젝트.vercel.app

② AI가 틀린 부분 1개
   예: "Copilot이 error.js에 'use client'를 빠뜨렸다.
       error.js는 반드시 클라이언트 컴포넌트여야 하므로 추가했다."
```

---

## 코드리뷰 토론 가이드

> **토론 가이드**: 2-3명이 자발적으로 화면을 공유하며 결과를 발표한다.

**발표 포인트** (1인당 3-5분):
1. 배포된 URL을 브라우저에 띄운다
2. 의도적으로 에러를 발생시킨다 (예: 네트워크 끊기 → DevTools Offline)
3. error.js가 동작하는 것을 보여준다
4. 빈 제목으로 게시글 작성을 시도하여 유효성 검증을 보여준다
5. 스켈레톤 UI 또는 로딩 스피너가 표시되는 것을 보여준다

**토론 질문**:
- "에러 메시지를 어떻게 작성했는가? 기술 용어가 들어가지 않았는가?"
- "스켈레톤 UI와 스피너 중 어떤 것을 선택했는가? 왜?"
- "Copilot이 error.js를 올바르게 생성했는가? `'use client'`를 빠뜨리지 않았는가?"

---

## 교수 피드백 포인트

**확인할 것**:
- `error.js`에 `"use client"` 여부 — 없으면 에러 페이지 자체가 동작하지 않음
- 에러 메시지가 사용자 친화적인지 — 기술 코드 노출 여부 점검
- loading.js 또는 스켈레톤 UI 존재 여부 — 빈 화면은 허용하지 않음
- 폼 유효성 검증 — 빈 제목으로 제출 시 에러 표시 확인

**우수 사례 공유**:
- 에러 유형별로 다른 아이콘/색상을 사용한 사례
- 스켈레톤 UI를 실제 카드 레이아웃과 정확히 맞춘 사례

**다음 주 예고**:
> 다음 주에는 **개인 프로젝트**를 본격적으로 시작한다. Ch7에서 작성한 설계서(ARCHITECTURE.md)를 꺼내고, Ch8~12에서 배운 기술을 조합하여 원하는 서비스를 구현한다. **설계서를 꼭 가져오세요.**

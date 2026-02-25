# Chapter 13. 개인 프로젝트 구현 — A회차: 강의

> **미션**: 나만의 풀스택 웹 앱을 완성하고 세상에 공개한다

---

## 학습목표

1. Ch7 설계서를 재검토하고 Ch8~12 학습 내용을 반영하여 보완할 수 있다
2. MoSCoW 기법으로 기능 우선순위를 정하고 MVP 범위를 확정할 수 있다
3. 기능별 Copilot 프롬프트 전략을 세우고 점진적으로 구현할 수 있다
4. Vercel에 최종 배포하고 환경 변수와 기능을 점검할 수 있다
5. README와 AI 사용 로그를 작성하여 프로젝트를 문서화할 수 있다

---

## 수업 타임라인

**표 13.1** A회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | 오늘의 미션 + 빠른 진단 |
| 00:05~00:25 | 설계서 재검토 + 기능 우선순위 |
| 00:25~00:50 | 바이브코딩 구현 전략 + 디버깅 전략 |
| 00:50~01:20 | 워크숍: 설계서 보완 + MVP 확정 + 구현 시작 |
| 01:20~01:27 | 핵심 정리 + B회차 과제 스펙 공개 |
| 01:27~01:30 | Exit ticket |

---

## 오늘의 미션 + 빠른 진단

> **오늘의 질문**: "기능이 10개인 프로젝트에서 가장 먼저 만들어야 할 것은? 기능? UI? 데이터베이스?"

**빠른 진단** (1문항):

개인 프로젝트를 시작할 때 올바른 순서는?
- (A) UI 디자인 → CRUD → 인증 → DB
- (B) DB 테이블 → 인증 → CRUD → UI → 배포
- (C) 전체 기능 한 번에 구현 → 배포

정답: (B) — 데이터 구조가 먼저, 인증이 있어야 RLS가 동작하고, 기능이 완성된 후 UI를 다듬는다.

---

## 13.1 프로젝트 요구사항 확인

### 13.1.1 7장 설계서 재검토 및 보완

Ch7에서 작성한 ARCHITECTURE.md를 다시 열어보자. 그때는 Supabase도, 인증도, CRUD도, RLS도 배우기 전이었다. 이제는 Ch8~12를 거치며 실제로 구현해본 경험이 있다. 설계서를 현실에 맞게 보완할 차례이다.

ARCHITECTURE.md에서 가장 많이 바뀌는 부분은 **Data Model**이다. Ch7에서는 "어떤 데이터가 필요한가" 수준이었지만, 이제는 Supabase 테이블의 구체적인 컬럼, 타입, 관계를 알고 있다.

```text
[Ch7 작성 시]
## Data Model
- books: 제목, 저자, 메모
- users: 이름, 이메일

[Ch13 보완 후]
## Data Model
- books: id(uuid, PK), title(text), author(text), memo(text),
         user_id(uuid, FK→auth.users), created_at(timestamptz)
  - RLS: SELECT 전체 허용, INSERT/UPDATE/DELETE는 본인만
- profiles: id(uuid, PK, FK→auth.users), display_name(text), avatar_url(text)
  - RLS: SELECT 전체 허용, UPDATE는 본인만
```

> **Copilot 프롬프트**
> "ARCHITECTURE.md를 검토해줘. Data Model 섹션에 Supabase 테이블 구조를 반영하고,
> 각 테이블에 RLS 정책이 필요한지 표시해줘. 인증은 Google OAuth를 사용한다."

<!-- COPILOT_VERIFY: 이 프롬프트를 Copilot Chat에 입력하고 ARCHITECTURE.md 보완 결과를 확인해주세요 -->

같은 방식으로 **Page Map**에는 실제 App Router 경로를, **User Flow**에는 인증 흐름을 반영한다.

copilot-instructions.md도 함께 업데이트한다. Ch7에서 작성한 초기 버전에 다음 내용을 추가한다:

```markdown
## Supabase 규칙
- 클라이언트: @supabase/ssr 사용 (createBrowserClient / createServerClient)
- 환경 변수: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
- RLS: 모든 테이블에 활성화
- 인증: Google OAuth (auth/callback 라우트 핸들러 필수)
```

다음 체크리스트로 설계서를 점검한다.

**설계서 보완 체크리스트**:
- [ ] **Page Map**: 모든 페이지 경로가 정의되어 있는가?
- [ ] **User Flow**: 로그인 → 기능 사용 → 로그아웃 흐름이 완성되어 있는가?
- [ ] **Data Model**: 테이블명, 컬럼, 관계(FK)가 구체적인가?
- [ ] **RLS 정책**: 각 테이블에 누가 읽고/쓰고/수정/삭제할 수 있는지 명시했는가?
- [ ] **인증 방식**: Google OAuth 설정이 반영되어 있는가?
- [ ] **Design Tokens**: shadcn/ui 컴포넌트와 색상 변수가 정리되어 있는가?
- [ ] **copilot-instructions.md**: 프로젝트 규칙이 최신 상태인가?

> **강의 팁**: 학생들에게 5분간 설계서를 읽고 "Ch8~12를 배우고 나서 바꾸고 싶은 부분"을 메모하게 한다. 대부분 Data Model과 인증 부분을 수정하게 된다.

### 13.1.2 기능 우선순위 정리

설계서에 적은 기능이 10개라면, 한 학기 안에 전부 완성하기는 어렵다. **MoSCoW 기법**으로 우선순위를 정한다.

- **Must have** — 없으면 앱이 성립하지 않는 핵심 기능 (예: 로그인, 메인 CRUD)
- **Should have** — 있으면 훨씬 좋지만 없어도 동작하는 기능 (예: 검색, 필터)
- **Could have** — 시간이 남으면 추가할 기능 (예: 다크 모드, 알림)
- **Won't have** — 이번 학기에는 만들지 않는 기능 (예: 결제, 실시간 채팅)

> **Copilot 프롬프트**
> "ARCHITECTURE.md의 기능 목록을 MoSCoW 기법으로 분류해줘.
> Must have는 핵심 CRUD와 인증, Should have는 UX 개선, Could have는 부가 기능으로 나눠줘."

핵심 원칙: **Must have만으로 배포 가능한 앱**이 되어야 한다. Should 이하는 보너스이다.

예를 들어 "독서 기록 앱"의 MoSCoW 분류는 다음과 같다:

- **Must**: Google 로그인, 책 등록/수정/삭제, 독서 메모 CRUD
- **Should**: 책 검색, 읽은 날짜 필터, 독서 통계
- **Could**: 다크 모드, 책 표지 이미지 업로드
- **Won't**: 소셜 공유, 다른 사용자 팔로우, 추천 알고리즘

Must 3개면 충분하다. 이것만 완성해도 "동작하는 독서 기록 앱"이다.

### 13.1.3 MVP(최소 기능 제품) 범위 확정

**MVP(Minimum Viable Product, 최소 기능 제품)**란 사용자에게 가치를 전달할 수 있는 최소한의 완성품이다. Must have 항목이 곧 MVP의 범위이다.

**표 13.2** MVP 체크리스트 템플릿

| 구분 | 기능 | 완료 |
|------|------|:---:|
| 인증 | Google OAuth 로그인/로그아웃 | ☐ |
| 메인 | [핵심 기능 1] CRUD | ☐ |
| 메인 | [핵심 기능 2] CRUD | ☐ |
| DB | Supabase 테이블 생성 + RLS 정책 | ☐ |
| UI | 메인 페이지 레이아웃 | ☐ |
| UI | 반응형 (모바일/데스크톱) | ☐ |
| 배포 | Vercel 배포 + 환경 변수 설정 | ☐ |

> [핵심 기능 1], [핵심 기능 2]는 자신의 프로젝트에 맞게 채운다. 예를 들어 독서 기록 앱이라면 "책 등록 CRUD"와 "독서 메모 CRUD"가 된다.

MVP 범위를 정할 때 자주 하는 실수:
- **"로그인 없이도 쓸 수 있게 하고 싶어"** → 인증 없이 만들면 RLS를 쓸 수 없다. 인증은 Must이다.
- **"검색 기능도 필수 아닌가?"** → 데이터가 10개일 때 검색은 불필요하다. 목록에서 눈으로 찾으면 된다. Should로 분류한다.
- **"디자인을 예쁘게 하고 싶어"** → 기능이 먼저다. Tailwind 기본 스타일만으로도 충분히 깔끔하다. UI 다듬기는 4단계에서 한다.

> **강의 팁**: 학생들이 MVP를 너무 크게 잡는 경우가 많다. "Must have 3개 이하"를 강조하자. 기능이 적어도 완성된 앱이 미완성된 대형 앱보다 낫다.

---

## 13.2 바이브코딩으로 구현

### 13.2.1 기능별 Copilot 프롬프트 전략

MVP 체크리스트의 기능을 하나씩 구현한다. 다음 순서를 권장한다.

**표 13.3** 권장 구현 순서 5단계

| 단계 | 작업 | 이유 | 예상 소요 |
|:---:|------|------|:---:|
| 1 | Supabase 테이블 생성 + RLS | 데이터 구조가 먼저 있어야 코드를 짤 수 있다 | 짧음 |
| 2 | 인증 (Google OAuth) | 로그인이 있어야 RLS가 동작하고 테스트할 수 있다 | 보통 |
| 3 | 핵심 CRUD 기능 | 앱의 존재 이유 — 가장 많은 시간을 여기에 쓴다 | 길다 |
| 4 | UI/레이아웃 정리 | 기능이 동작하면 보기 좋게 다듬는다 | 보통 |
| 5 | 배포 + 테스트 | Vercel에 올리고 실제 URL에서 확인한다 | 짧음 |

이 순서가 중요한 이유: 1단계(DB)와 2단계(인증)가 없으면 3단계(CRUD)를 테스트할 수 없다. 반대로 4단계(UI)는 기능이 동작한 후에 해야 한다 — 동작하지 않는 기능의 UI를 꾸미는 것은 시간 낭비이다.

각 단계별 프롬프트 예시:

> **Copilot 프롬프트 (1단계 — DB)**
> "Supabase SQL Editor에서 실행할 books 테이블 생성 SQL을 작성해줘.
> 컬럼: id(uuid, PK, default gen_random_uuid()), title(text, NOT NULL), author(text),
> user_id(uuid, FK→auth.users), created_at(timestamptz, default now()).
> RLS를 활성화하고, SELECT는 전체 허용, INSERT/UPDATE/DELETE는 auth.uid() = user_id인 경우만 허용해줘."

> **Copilot 프롬프트 (2단계 — 인증)**
> "Google OAuth 로그인/로그아웃 기능을 구현해줘.
> @supabase/ssr의 createBrowserClient 사용. 로그인 버튼 클릭 시 signInWithOAuth,
> 로그아웃은 signOut. auth/callback 라우트 핸들러도 만들어줘.
> copilot-instructions.md를 참고해줘."

> **Copilot 프롬프트 (3단계 — CRUD)**
> "books 테이블의 전체 목록을 카드형으로 보여주는 app/books/page.tsx를 만들어줘.
> Server Component로 작성하고, 로그인한 사용자만 접근 가능하게 해줘.
> 새 책 추가 버튼과 각 카드에 수정/삭제 버튼을 포함해줘."

**좋은 프롬프트 vs 나쁜 프롬프트**:

```text
나쁜 프롬프트:
"게시판 만들어줘"

좋은 프롬프트:
"Supabase의 books 테이블에서 데이터를 읽어 목록을 보여주는 페이지를 만들어줘.
- Next.js App Router, Server Component로 작성
- @supabase/ssr의 createServerClient 사용
- Tailwind CSS로 카드형 레이아웃
- 각 카드에 제목, 저자, 등록일 표시
- copilot-instructions.md의 디자인 토큰을 따라줘"
```

좋은 프롬프트의 공통점: **기술 스택 명시** + **데이터 소스 지정** + **UI 구조 설명** + **프로젝트 규칙 참조**.

나쁜 프롬프트가 문제인 이유는 AI가 "추측"해야 할 부분이 많기 때문이다. "게시판 만들어줘"라고 하면 AI는 기술 스택을 추측하고, DB 구조를 추측하고, UI를 추측한다. 추측이 많을수록 AI 3대 한계(버전 불일치, 컨텍스트 소실, 환각)에 빠질 확률이 높아진다.

<!-- COPILOT_VERIFY: 좋은 프롬프트를 Copilot Chat에 입력하고 생성된 코드가 올바른지 확인해주세요 -->

**기능별 프롬프트 작성 팁** — 프롬프트에 반드시 포함할 정보:

**표 13.4** 기능별 프롬프트 필수 포함 정보

| 기능 | 프롬프트에 포함할 정보 |
|------|---------------------|
| 테이블 생성 | 테이블명, 컬럼(타입), FK 관계, RLS 정책 |
| 인증 | OAuth 제공자, 콜백 URL, 세션 관리 방식 |
| 읽기(R) | 테이블명, 정렬 기준, 필터 조건, 표시 필드 |
| 쓰기(C) | 입력 필드, 유효성 검증 조건, 성공 후 이동 경로 |
| 수정(U) | 수정 대상 식별 방법(id), 수정 가능 필드, 권한 확인 |
| 삭제(D) | 삭제 확인 UI, 삭제 권한, 삭제 후 동작 |
| 레이아웃 | 반응형 기준(md:), 컴포넌트 구조, 디자인 토큰 |

**AI 생성 코드 읽기 포인트**: Copilot이 코드를 생성하면, 다음 4가지를 반드시 확인한다.

1. **import 경로**: `next/router`(Pages Router)가 아닌 `next/navigation`(App Router)을 사용하는가?
2. **Supabase 클라이언트**: `createClient`(구버전)가 아닌 `createServerClient` 또는 `createBrowserClient`(@supabase/ssr)를 사용하는가?
3. **'use client' 지시어**: 상태(useState)나 이벤트 핸들러(onClick)가 있는 컴포넌트에 `'use client'`가 선언되어 있는가?
4. **하드코딩된 값**: Supabase URL이나 키가 코드에 직접 적혀 있지 않은가? 반드시 `process.env.NEXT_PUBLIC_*`로 참조해야 한다.

이 4가지는 AI가 가장 자주 틀리는 부분이다. 코드가 길어도 이 4곳만 확인하면 대부분의 문제를 잡을 수 있다.

### 13.2.2 점진적 구현과 배포

한 번에 모든 기능을 만들지 않는다. **기능 하나를 만들고, 테스트하고, 커밋하고, 배포한다**. 이것을 반복한다. 이 방식의 장점은 두 가지이다:

1. **문제 추적이 쉽다**: 에러가 나면 방금 추가한 기능이 원인이다. 한 번에 5개 기능을 넣으면 어디가 문제인지 찾기 어렵다.
2. **항상 배포 가능하다**: 기능을 하나 추가할 때마다 배포하므로, 중간에 멈춰도 "동작하는 앱"이 있다.

**표 13.5** 기능당 구현 체크리스트

| 순서 | 항목 | 확인 |
|:---:|------|:---:|
| 1 | Copilot에게 프롬프트 작성 | ☐ |
| 2 | 생성된 코드 읽기 — import 경로, API 버전 확인 | ☐ |
| 3 | `npm run dev`로 로컬 테스트 | ☐ |
| 4 | 에러 있으면 수정 (13.2.3 참고) | ☐ |
| 5 | `git add . && git commit -m "기능명"` | ☐ |
| 6 | `git push` → Vercel 자동 배포 | ☐ |
| 7 | 배포 URL에서 동작 확인 | ☐ |

<!-- COPILOT_VERIFY: Agent Mode에서 여러 파일을 동시에 수정하는 과정을 확인해주세요 -->

**Agent Mode 활용**: 여러 파일에 걸친 작업(예: 새 페이지 + 컴포넌트 + API 연동)은 Agent Mode가 효과적이다. Agent가 파일 탐색 → 코드 생성 → 수정까지 한 번에 처리한다.

Agent Mode를 사용할 때 주의할 점:
- Agent가 생성한 **모든 파일을 확인**한다 — 파일을 새로 만들었으면 경로가 맞는지, 기존 파일을 수정했으면 의도한 부분만 바뀌었는지 확인
- Agent가 **패키지를 새로 설치**했으면 package.json에 버전이 올바른지 확인
- Agent가 제안하는 터미널 명령어(npm install, git 등)는 실행 전에 한 번 읽어보기

**copilot-instructions.md 업데이트**: 기능을 추가할 때마다 copilot-instructions.md에 새로운 규칙이 필요한지 확인한다. 예를 들어 books 테이블을 만들었다면 "books 테이블의 컬럼 목록"을 추가하고, RLS 정책을 설정했다면 "RLS 정책 요약"을 추가한다. 이 문서가 최신 상태를 유지할수록 AI의 다음 출력이 정확해진다.

**표 13.6** Agent Skills 총정리

| Skill 이름 | 도입 장 | 위치 | 역할 |
|------------|:------:|------|------|
| nextjs-rules | Ch2 | `.github/skills/nextjs-rules/SKILL.md` | App Router 규칙, import 경로, Tailwind 사용 원칙 |
| design-system | Ch7 | `.github/skills/design-system/SKILL.md` | 디자인 토큰, 색상 변수, shadcn/ui 컴포넌트 규칙 |
| error-handling | Ch12 | `.github/skills/error-handling/SKILL.md` | 에러 처리, 로딩 UI, 폼 유효성 검증 규칙 |
| project-conventions | Ch13 | `.github/skills/project-conventions/SKILL.md` | 프로젝트 전체 규칙 통합 (위 3개 + 추가 규칙) |

project-conventions Skill은 기존 3개 Skill의 핵심 규칙을 하나로 합친 것이다. 프로젝트 후반에 Skill이 많아지면 Agent가 모두 참조하기 어려우므로, 통합 Skill을 만드는 것이 효율적이다.

Skill과 copilot-instructions.md의 차이: copilot-instructions.md는 **모든 Copilot 상호작용에 자동 적용**되는 프로젝트 기본 규칙이다. Skills는 **특정 키워드가 포함된 요청에만 발동**되는 상황별 규칙이다. 둘 다 AI의 컨텍스트를 관리하는 도구이지만, 항상 적용할 규칙은 copilot-instructions.md에, 특정 작업에만 필요한 규칙은 Skills에 넣는다.

> **Copilot 프롬프트**
> "@workspace 기존의 nextjs-rules, design-system, error-handling Skill을 통합하여
> project-conventions Skill을 만들어줘. 핵심 규칙만 추려서 하나의 SKILL.md로 합쳐줘."

### 13.2.3 에러 대응과 디버깅

구현 중 에러는 반드시 발생한다. 당황하지 말고 패턴별로 대응하자. Ch12에서 배운 에러 처리의 핵심 원칙을 떠올려보면: 에러 메시지를 읽고, 유형을 분류하고, 해당 유형에 맞는 조치를 취한다.

**표 13.7** 흔한 에러 패턴 5가지

| # | 에러 패턴 | 원인 | 대응 방법 |
|:---:|------|------|------|
| 1 | `Module not found` | import 경로 오류 또는 패키지 미설치 | 경로 확인, `npm install 패키지명` |
| 2 | `RLS policy violation` | RLS 정책 누락 또는 조건 오류 | Supabase 대시보드에서 정책 확인 |
| 3 | `NEXT_PUBLIC_ 없음` | 환경 변수명에 접두사 누락 | 클라이언트용은 `NEXT_PUBLIC_` 필수 |
| 4 | `hydration mismatch` | 서버/클라이언트 렌더링 불일치 | `'use client'` 확인, 동적 데이터 처리 |
| 5 | `OAuth redirect error` | 콜백 URL 불일치 | Supabase + Google Console URL 일치 확인 |

에러 #2(RLS)와 #5(OAuth)는 **코드 문제가 아니라 설정 문제**이다. 코드를 아무리 고쳐도 해결되지 않으므로, Supabase 대시보드나 Google Cloud Console에서 설정을 확인해야 한다. AI에게 질문할 때도 "코드를 고쳐줘"가 아니라 "이 RLS 정책이 맞는지 확인해줘"라고 질문하는 것이 효과적이다.

**디버깅 프롬프트 전략**:

에러가 발생하면 AI에게 다시 질문한다. 이때 **에러 메시지 전체**를 붙여넣는 것이 핵심이다.

```text
나쁜 디버깅 프롬프트:
"안 돼. 에러 남. 고쳐줘."

좋은 디버깅 프롬프트:
"다음 에러가 발생했어:
[에러 메시지 전체 붙여넣기]
현재 파일은 app/books/page.tsx이고, Supabase에서 books 테이블을 읽는 Server Component야.
RLS 정책은 authenticated 사용자만 SELECT 가능하게 설정했어."
```

<!-- COPILOT_VERIFY: 에러 메시지를 붙여넣어 Copilot에게 디버깅을 요청하는 과정을 캡처해주세요 -->

좋은 디버깅 프롬프트의 3요소: **에러 메시지 원문** + **현재 파일/컨텍스트** + **의도한 동작**.

**AI가 같은 실수를 반복할 때**: 같은 에러를 AI에게 3번 이상 물어봐도 해결이 안 된다면, AI가 해당 문제의 컨텍스트를 충분히 이해하지 못한 것이다. 이때는 다음을 시도한다:

1. **새 대화 시작** — 이전 대화의 잘못된 컨텍스트가 영향을 줄 수 있다
2. **관련 파일 전체를 첨부** — 에러가 발생한 파일뿐 아니라 관련 파일(레이아웃, 설정 등)도 함께 제공
3. **공식 문서 참조 요청** — "Next.js 공식 문서의 Server Components 섹션을 참고해서 답해줘"

---

## 워크숍: 설계서 보완 + MVP 확정

> **강의 팁**: 이 시간은 학생들이 각자 설계서를 열고 보완 작업을 시작한다. 교수는 순회하며 MVP 범위가 적절한지, 설계서에 빠진 부분이 없는지 확인한다.

**워크숍 순서** (30분):

① ARCHITECTURE.md를 열고, 설계서 보완 체크리스트(13.1.1)로 점검한다 (10분)

② MVP 체크리스트(표 13.2)를 자신의 프로젝트에 맞게 작성한다 — Must have 3개 이하 (5분)

③ copilot-instructions.md에 Supabase 규칙과 최신 기능 목록을 추가한다 (5분)

④ 권장 구현 순서(표 13.3)에 따라 첫 번째 기능(DB 테이블 생성)을 시작한다 (10분)

> **함께 진행**: 첫 번째 기능(테이블 생성 + RLS)은 교수가 화면을 공유하며 함께 진행한다. 이후 기능은 학생이 자율적으로 진행한다.

---

## 핵심 정리 + B회차 과제 스펙

### 이번 시간 핵심 3가지

1. **설계서 보완**: Ch7 설계서에 Supabase 테이블 구조, RLS 정책, 인증 흐름을 반영한다
2. **MVP 우선**: Must have 3개 이하로 기능을 확정하고, 이것만 완성한다
3. **점진적 구현**: DB → 인증 → CRUD → UI → 배포 순서로, 기능 하나씩 만들고 테스트하고 커밋한다

### B회차 과제 스펙

**개인 프로젝트 MVP 구현 + 배포**:
1. ARCHITECTURE.md 보완 완료 (Data Model + RLS + 인증 반영)
2. MVP 기능 최대한 구현 (Must have 중심)
3. Vercel 배포 완료 + 전 기능 동작 확인
4. README.md 작성 (프로젝트 설명 + 기술 스택 + 배포 URL)
5. AI 사용 로그 최소 5항목 (AI_LOG.md)
6. 배포 URL + GitHub 저장소 링크 제출

**스타터 코드**: `practice/chapter13/starter/` — 기본 Next.js + Supabase + 인증 설정이 완료된 프로젝트 템플릿이다. 여기서 시작하거나, 기존 프로젝트에 기능을 추가해도 된다.

---

## Exit ticket

다음 중 올바른 구현 순서를 고르라:

- (A) UI 디자인 → DB 테이블 → 인증 → CRUD → 배포
- (B) DB 테이블 → CRUD → 인증 → UI → 배포
- (C) DB 테이블 → 인증 → CRUD → UI → 배포

정답: (C) — DB가 먼저 있어야 CRUD를, 인증이 있어야 RLS 테스트를 할 수 있다. UI는 기능 완성 후에 다듬는다.

---

## 교수 메모

**준비물 체크리스트**:
- [ ] B회차 스타터 코드 준비 (`practice/chapter13/starter/`)
- [ ] 학생 개인 프로젝트 현황 파악 (Ch7 설계서 제출 여부 확인)
- [ ] MoSCoW 기법 설명 슬라이드 (1~2장)
- [ ] MVP 체크리스트 빈 템플릿 (학생 배포용)
- [ ] Supabase 대시보드 접속 확인 (학생 개별 프로젝트)

**수업 후 체크**:
- [ ] 전원 ARCHITECTURE.md 보완 시작 확인
- [ ] 전원 MVP 체크리스트 작성 완료 확인 (Must have 3개 이하)
- [ ] 전원 DB 테이블 생성 시작 확인
- [ ] 설계서가 없는 학생 파악 및 개별 안내

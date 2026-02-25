# Chapter 7. 웹 앱 아키텍처 & AI 디자인 설계 — C: 모범 구현 + 해설

> B회차 과제 제출 후 공개

---

## 모범 설계서 해설

_전체 프로젝트는 practice/chapter7/complete/ 참고_

### 전체 구조

```
practice/chapter7/complete/
├── ARCHITECTURE.md          ← 설계서 모범 답안
├── .github/
│   ├── copilot-instructions.md  ← Copilot 지시사항 모범 답안
│   └── skills/
│       └── design-system/
│           └── SKILL.md     ← Agent Skills (보너스)
└── README.md                ← 프로젝트 설명
```

---

### 핵심 포인트 1: ARCHITECTURE.md 구조

모범 ARCHITECTURE.md는 다음 5개 섹션으로 구성된다:

```markdown
# Architecture — 맛집 리뷰 앱

## Page Map
## User Flow
## Component Hierarchy
## Data Model
## Design Tokens
```

**왜 이 구조인가**: Copilot이 `@workspace`로 이 파일을 참조할 때, 섹션 제목만으로도 어떤 정보가 있는지 파악할 수 있다. 영문 섹션 제목을 사용하는 이유는 AI가 영문 키워드를 더 정확하게 인식하기 때문이다.

> **강의 팁**: 한글로 작성해도 괜찮지만, 섹션 제목은 영문을 권장한다. Copilot이 "Page Map"이라는 키워드에서 라우팅 정보를 기대하는 것처럼, 영문 키워드가 AI의 문맥 파악에 유리하다.

---

### 핵심 포인트 2: 페이지 맵 + URL 구조

```markdown
## Page Map
- / — 홈 (리뷰 목록, 검색, 별점 필터)
- /reviews/[id] — 리뷰 상세 (본문, 이미지, 별점, 댓글)
- /reviews/new — 리뷰 작성 (로그인 필수)
- /reviews/[id]/edit — 리뷰 수정 (작성자만)
- /login — 로그인 (Google OAuth)
- /profile — 프로필 (내 리뷰 목록)
```

**확인 포인트**:
- 최소 4페이지 이상이다
- URL 구조가 Next.js App Router의 폴더 구조와 일치한다
- 각 페이지의 역할이 괄호 안에 명시되어 있다
- 권한이 필요한 페이지에 "(로그인 필수)", "(작성자만)" 표기가 있다

---

### 핵심 포인트 3: 데이터 모델

```markdown
## Data Model

### users
- id: UUID (Supabase auth.users 참조)
- email: text
- name: text
- avatar_url: text

### reviews
- id: UUID (자동 생성)
- title: text (필수)
- content: text (필수)
- rating: integer (1-5)
- image_url: text (선택)
- author_id: UUID (→ users.id, 외래 키)
- created_at: timestamptz (자동 생성)

### 관계
- users 1:N reviews (한 사용자가 여러 리뷰 작성)
```

**확인 포인트**:
- 테이블이 2개 이상이다
- 각 필드의 타입이 명시되어 있다
- 외래 키 관계(1:N)가 정의되어 있다
- 필수/선택 여부가 표시되어 있다

**자주 하는 실수**: AI가 `comments`, `likes`, `categories` 등 불필요한 테이블을 추가한다. MVP 범위에서는 2-3개 테이블로 충분하다. 추가 기능은 기본 기능이 완성된 후에 확장한다.

---

### 핵심 포인트 4: copilot-instructions.md

```markdown
# Project Context

## Tech Stack
- Next.js 14.2.21 (App Router)
- Tailwind CSS 3.4.17
- shadcn/ui (Button, Card, Input, Dialog, Avatar, Badge)
- Supabase JS v2 (@supabase/supabase-js)
- Vercel 배포

## Page Map
- / — 홈 (리뷰 목록)
- /reviews/[id] — 리뷰 상세
- /reviews/new — 리뷰 작성
- /login — 로그인
- /profile — 프로필

## Design Tokens
- Primary: shadcn/ui --primary
- Background: --background
- Card: shadcn/ui Card 컴포넌트 (rounded-lg shadow-sm)
- Spacing: space-y-6, 카드 내부 p-6
- Max width: max-w-4xl mx-auto
- 반응형: md:grid-cols-2, 모바일 1열

## Component Rules
- UI 컴포넌트는 shadcn/ui 사용 (components/ui/)
- 커스텀 컴포넌트는 components/ 루트에 배치
- Tailwind 기본 컬러 직접 사용 금지 → CSS 변수 사용

## Coding Conventions
- 함수형 컴포넌트만 사용
- async/await 패턴 (then 체이닝 금지)
- Server Component 기본, 상호작용 시 "use client"
- Supabase 클라이언트는 lib/supabase.js에서 import

## 금지 사항
- class 컴포넌트 사용 금지
- pages/ 라우터 금지 (App Router만)
- CSS Modules, styled-components 금지
```

**확인 포인트**:
- 기술 스택과 **정확한 버전**이 명시되어 있다
- Design Tokens 섹션이 있다
- Component Rules가 명확하다
- 금지 사항이 있어 AI가 잘못된 방향으로 가는 것을 방지한다

---

## 채점 기준 참고

**표 7C.1** 채점 기준

| 항목 | 배점 | 기준 |
|------|------|------|
| 설계서 완성도 | 7점 | 6개 제출물(페이지 맵, 와이어프레임, shadcn/ui, 데이터 모델, copilot-instructions.md, ARCHITECTURE.md)이 모두 있는가 |
| AI 검증 서술 | 3점 | AI가 제안했지만 수정한 부분을 구체적으로 설명했는가 |

**설계서 완성도 (7점)** 세부:
- 페이지 맵이 최소 4페이지 + URL 구조 포함 (1점)
- 데이터 모델이 2개 이상 테이블 + 관계 정의 (2점)
- ARCHITECTURE.md가 5개 섹션 포함 (2점)
- copilot-instructions.md에 Design Tokens + Component Rules 포함 (1점)
- shadcn/ui 초기화 + 테마 커스터마이징 (1점)

**AI 검증 서술 (3점)** 세부:
- AI가 제안했지만 수정한 부분을 1개 이상 지적했다 (2점)
- 왜 수정했는지 이유를 설명했다 (1점)

---

## 우수 설계 사례

### 사례 1: 독서 기록 앱 — 읽기 상태 관리

```markdown
## Data Model

### books
- id: UUID
- title: text
- author: text
- cover_url: text
- review: text
- rating: integer (1-5)
- status: text ("reading", "completed", "want_to_read")
- user_id: UUID (→ users.id)
- created_at: timestamptz
```

`status` 필드로 "읽고 있는 책", "다 읽은 책", "읽고 싶은 책"을 구분한 사례. 필터링과 탭 UI로 자연스럽게 이어진다.

### 사례 2: 동아리 공지 게시판 — 카테고리 + 고정 공지

```markdown
## Page Map
- / — 홈 (공지 목록, 카테고리 탭)
- /notices/[id] — 공지 상세
- /notices/new — 공지 작성 (관리자만)
- /login — 로그인
- /admin — 관리자 대시보드

## Data Model
### notices
- id, title, content, category, is_pinned, author_id, created_at
```

`is_pinned` 필드로 중요 공지를 상단에 고정하는 설계. `category` 필드로 "행사", "일반", "긴급" 등을 구분한다.

---

## 자주 하는 실수 정리

**표 7C.2** 학생들이 자주 하는 실수

| 실수 | 증상 | 해결 |
|------|------|------|
| 범위가 너무 넓음 | 테이블 5개 이상, 페이지 10개 이상 | CRUD + 인증 중심으로 축소 (테이블 2-3개, 페이지 4-6개) |
| 데이터 모델에 관계 미정의 | 테이블 간 연결이 없음 | author_id -> users.id 같은 외래 키 관계 추가 |
| copilot-instructions.md에 버전 누락 | AI가 다른 버전 코드 생성 | 정확한 버전 번호 명시 (Next.js 14.2.21 등) |
| ARCHITECTURE.md가 너무 짧음 | 페이지 맵만 있고 나머지 없음 | 5개 섹션 모두 채우기 |
| shadcn/ui init 오류 | 프로젝트가 TypeScript가 아님 | JavaScript 프로젝트에서도 가능 — init 시 옵션 확인 |
| 설계서에 구현 코드 포함 | 설계와 구현이 혼재 | 설계서는 구조와 규칙만 — 코드는 Ch8 이후 |

---

## 다음 장 연결

다음 주는 **중간고사**이다 (Ch1~7 범위, 코딩 객관식). 시험이 끝나면 Part 5 **Supabase 백엔드 통합**으로 넘어간다.

Ch8에서는 오늘 작성한 ARCHITECTURE.md의 **데이터 모델**을 실제 **Supabase 테이블**로 생성한다:
- `users` 테이블 -> Supabase Auth로 자동 관리
- `posts`(또는 `reviews` 등) 테이블 -> SQL Editor에서 직접 생성

설계서가 잘 작성되어 있으면 Copilot에게 "@workspace ARCHITECTURE.md의 Data Model을 기반으로 Supabase 테이블 생성 SQL을 작성해줘"라고 요청할 수 있다. 설계의 품질이 곧 구현의 효율이다.

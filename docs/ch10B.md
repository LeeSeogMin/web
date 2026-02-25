# Chapter 10. Supabase Database CRUD — B회차: 실습

> **미션**: 게시판 CRUD를 완성하고 배포한다

---

## 수업 타임라인

**표 10.8** B회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | A회차 핵심 리캡 + 과제 스펙 확인 |
| 00:05~00:10 | 바이브코딩 가이드 + 스타터 코드 안내 |
| 00:10~00:25 | 체크포인트 1: 게시글 목록 조회 |
| 00:25~00:45 | 체크포인트 2: 게시글 작성/수정/삭제 |
| 00:45~01:00 | 체크포인트 3: 검증 + 배포 |
| 01:00~01:05 | Google Classroom 제출 |
| 01:05~01:25 | 결과 공유 + 코드리뷰 토론 |
| 01:25~01:30 | 교수 종합 피드백 + 다음 주 예고 |

---

## 과제 스펙 + 스타터 코드 안내

### 과제 요구사항

**게시판 CRUD 완성**:

① 게시글 목록 페이지 -- 작성자 이름 표시, 최신순 정렬
② 게시글 작성 페이지 -- 로그인 사용자만 접근, title/content 입력
③ 게시글 상세 페이지 -- 본인 글에만 수정/삭제 버튼
④ 게시글 수정 기능 -- 기존 데이터를 불러와 수정
⑤ 게시글 삭제 기능 -- 확인 대화상자 후 삭제

### 스타터 코드

`practice/chapter10/starter/` 폴더에 게시판 프론트엔드가 준비되어 있다. 인증(Ch9)이 포함되어 있고, CRUD 함수 부분이 `TODO` 마커로 비어 있다.

```
practice/chapter10/starter/
├── app/
│   ├── layout.js          ← AuthProvider 포함
│   ├── page.js            ← 메인: PostList 컴포넌트 연결
│   ├── globals.css
│   └── posts/
│       ├── new/page.js    ← 게시글 작성 페이지
│       └── [id]/
│           ├── page.js    ← 게시글 상세 (TODO: 조회/삭제)
│           └── edit/page.js ← 게시글 수정 (TODO: 조회/수정)
├── components/
│   ├── Navbar.js          ← 내비게이션 (인증 UI 포함)
│   ├── PostList.js        ← 게시글 목록 (TODO: select)
│   └── PostForm.js        ← 게시글 작성 (TODO: insert)
├── contexts/
│   └── AuthContext.js     ← 인증 상태 관리 (Ch9)
├── lib/
│   └── supabase.js        ← Supabase 클라이언트
├── package.json
├── tailwind.config.js
└── next.config.js
```

**시작 방법** (PowerShell 기준):
```bash
cd practice/chapter10/starter
npm install
npm run dev
```
macOS Terminal도 동일하다.

브라우저에서 http://localhost:3000 을 열어 기본 페이지가 보이는지 확인한다. 아직 CRUD가 구현되지 않아 게시글이 표시되지 않는다.

---

## 바이브코딩 가이드

> **Copilot 활용**: 이번 실습에서는 스타터 코드의 TODO 부분을 Copilot과 함께 채운다. 각 TODO에 적힌 힌트를 참고하여 프롬프트를 작성하고, A회차에서 배운 CRUD 패턴과 일치하는지 반드시 검증한다.

**좋은 프롬프트 vs 나쁜 프롬프트**:

나쁜 프롬프트:
> "게시판 CRUD 만들어줘"

문제: 어떤 테이블인지, 어떤 컬럼이 있는지, 관계 데이터를 어떻게 조회할지 전혀 알려주지 않았다.

좋은 프롬프트:

> **Copilot 프롬프트**
> "Supabase 클라이언트로 posts 테이블의 게시글 목록을 조회하는 코드를 작성해줘.
> 조건: 작성자 프로필(profiles 테이블의 username)을 함께 가져오고, 최신순으로 정렬.
> 결과는 setPosts(data)로 상태에 저장.
> lib/supabase.js의 createClient()를 사용."

<!-- COPILOT_VERIFY: 위 프롬프트를 Copilot Chat에 입력하고 생성 결과를 캡처해주세요 -->

---

## 개인 실습

### 체크포인트 1: 게시글 목록 조회 (15분)

**목표**: 메인 페이지에 Supabase의 게시글이 표시된다.

① `components/PostList.js`를 열고 TODO 부분에 Supabase 쿼리를 작성한다
② 핵심 코드: `.from("posts").select("*, profiles(username)").order("created_at", { ascending: false })`
③ 조회 결과를 `setPosts(data)`로 저장한다
④ 브라우저에서 게시글 목록이 표시되는지 확인한다
⑤ 작성자 이름이 올바르게 표시되는지 확인한다

> **강의 팁**: 순회하며 `profiles(username)` 관계 조회를 올바르게 사용하고 있는지 확인한다. 관계 데이터가 `null`로 나오면 Supabase 대시보드에서 외래 키 설정을 확인하도록 안내한다.

### 체크포인트 2: 게시글 작성/수정/삭제 (20분)

**목표**: 게시글 생성, 수정, 삭제가 동작한다.

① `components/PostForm.js`의 TODO에 `.insert()` 코드를 작성한다
② `app/posts/[id]/page.js`의 TODO에 `.select().eq().single()` 조회와 `.delete().eq()` 삭제를 작성한다
③ `app/posts/[id]/edit/page.js`의 TODO에 `.select().eq().single()` 조회와 `.update().eq()` 수정을 작성한다
④ 게시글 생성 -> 목록에 표시 -> 수정 -> 삭제 전체 흐름을 테스트한다
⑤ 본인 글에만 수정/삭제 버튼이 보이는지 확인한다

Copilot에게 수정 페이지를 요청할 때:

> **Copilot 프롬프트**
> "이 게시글 수정 페이지에서 기존 게시글 데이터를 Supabase에서 가져와 폼에 채워줘.
> posts 테이블에서 id로 조회하고, title과 content를 useState에 설정해줘.
> 수정 제출 시 .update().eq('id', id)로 업데이트해줘."

### 체크포인트 3: 검증 + 배포 (15분)

**목표**: AI 코드를 검증하고 배포한다.

① 아래 검증 체크리스트를 수행한다
② 문제가 있으면 수정한다
③ 다른 Google 계정(또는 시크릿 창)으로도 테스트한다 -- 다른 사람 글의 수정/삭제 버튼이 안 보이는지 확인
④ git add -> git commit -> git push 로 배포한다:
```bash
git add .
git commit -m "Ch10: 게시판 CRUD 완성"
git push
```
⑤ Vercel 대시보드에서 배포 완료를 확인한다
⑥ 배포된 URL에서 CRUD가 동작하는지 확인한다

> **강의 팁**: "다른 사람 글도 수정/삭제가 되는데요?"라는 질문이 나올 수 있다. "UI에서만 숨겨놓았을 뿐, 데이터베이스 레벨 보안은 아직 없다. 다음 주(Ch11)에 RLS로 해결한다"고 답한다.

---

## 검증 체크리스트

**표 10.9** AI 코드 검증 체크리스트

| 항목 | 확인 |
|------|------|
| 게시글 목록이 최신순으로 표시되는가? | ☐ |
| 작성자 이름이 게시글과 함께 표시되는가? | ☐ |
| 새 게시글을 작성하면 목록에 바로 나타나는가? | ☐ |
| 게시글 수정이 반영되는가? | ☐ |
| 게시글 삭제 후 목록에서 사라지는가? | ☐ |
| 본인 글에만 수정/삭제 버튼이 보이는가? | ☐ |
| `.eq()` 조건 없이 update/delete를 호출하는 곳이 없는가? | ☐ |
| 배포 URL에서 정상 동작하는가? | ☐ |

---

## 흔한 AI 실수

**표 10.10** Ch10에서 AI가 자주 틀리는 패턴

| AI 실수 | 증상 | 해결 |
|---------|------|------|
| `.select()` 누락 (insert/update 후) | 생성/수정 후 `data`가 null | `.insert({...}).select()` 추가 |
| `.eq()` 없이 update/delete | 전체 행이 수정/삭제됨 | 반드시 `.eq("id", postId)` 조건 추가 |
| `profiles(username)` 대신 `JOIN` 문법 | Supabase 클라이언트에서 오류 | 외래 키 기반 관계 조회 문법 사용 |
| `user_id`를 하드코딩 | 항상 같은 사용자로 등록됨 | `useAuth()`의 `user.id` 사용 |
| 옵셔널 체이닝(`?.`) 빠뜨림 | "Cannot read property of null" | `post.profiles?.username` |
| `created_at` 수동 설정 | 시간이 클라이언트 기준 | DB 기본값(`default now()`)에 맡기기 |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch10 과제"에 아래 두 항목을 제출한다:

```
① 배포 URL
   예: https://내프로젝트.vercel.app

② AI가 틀린 부분 1개
   예: "Copilot이 insert 후 .select()를 빠뜨려서
       생성된 게시글이 바로 목록에 표시되지 않았다.
       .insert({...}).select()로 수정했다."
```

---

## 코드리뷰 토론 가이드

> **토론 가이드**: 2-3명이 자발적으로 화면을 공유하며 결과를 발표한다.

**발표 포인트** (1인당 3-5분):
1. 배포된 URL에서 게시글 목록을 보여준다
2. 게시글 작성 -> 수정 -> 삭제 전체 흐름을 시연한다
3. Copilot이 틀린 부분과 어떻게 수정했는지 설명한다

**토론 질문**:
- "Copilot에게 CRUD를 요청할 때, 어떤 정보를 프롬프트에 포함해야 정확한 코드가 나오는가?"
- "`.eq()` 없이 update를 실행하면 어떤 일이 벌어지는가?"
- "UI에서 수정/삭제 버튼을 숨기는 것만으로 충분한 보안인가?"

---

## 교수 피드백 포인트

**확인할 것**:
- CRUD 전체 흐름이 동작하는지 -- 특히 insert 후 목록 갱신
- `.eq()` 조건이 빠진 update/delete가 없는지
- 관계 데이터 조회(`profiles(username)`)가 올바른지

**우수 사례 공유**:
- 게시글에 페이지네이션을 추가한 학생
- 검색 기능을 구현한 학생

**다음 주 예고**:
> 게시판 CRUD가 완성되었지만, **보안 구멍**이 있다. 브라우저 개발자 도구에서 API를 직접 호출하면 다른 사람의 글도 삭제할 수 있다. 다음 주에는 **RLS(Row Level Security)**를 적용하여 데이터베이스가 "내 글은 나만 수정/삭제할 수 있다"를 강제하게 만든다.

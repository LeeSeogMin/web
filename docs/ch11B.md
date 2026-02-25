# Chapter 11. Row Level Security (RLS) — B회차: 실습

> **미션**: 게시판에 RLS 정책을 적용하고, 다른 계정으로 차단을 검증한다

---

## 수업 타임라인

**표 11.9** B회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | A회차 핵심 리캡 + 과제 스펙 확인 |
| 00:05~00:10 | 바이브코딩 가이드 + 스타터 코드 안내 |
| 00:10~00:25 | 체크포인트 1: RLS 활성화 + 정책 생성 |
| 00:25~00:45 | 체크포인트 2: 권한 테스트 + 에러 처리 |
| 00:45~01:00 | 체크포인트 3: 검증 + 배포 |
| 01:00~01:05 | Google Classroom 제출 |
| 01:05~01:25 | 결과 공유 + 코드리뷰 토론 |
| 01:25~01:30 | 교수 종합 피드백 + 다음 주 예고 |

---

## 과제 스펙 + 스타터 코드 안내

### 과제 요구사항

**게시판 RLS 정책 적용 + 검증**:

① posts 테이블 RLS 활성화
② SELECT 정책: 누구나 읽기 가능
③ INSERT 정책: 로그인 사용자만 작성 (본인 ID)
④ UPDATE 정책: 작성자만 수정
⑤ DELETE 정책: 작성자만 삭제

추가:
- profiles 테이블 RLS 적용
- 다른 계정으로 수정/삭제 차단 테스트

### 스타터 코드

`practice/chapter11/starter/` 폴더는 Ch10 완성 코드와 동일하며, 추가로 `supabase/policies.sql` 파일이 있다.

```
practice/chapter11/starter/
├── app/                   ← Ch10 완성 코드 (그대로)
├── components/            ← PostList, PostForm, Navbar
├── contexts/              ← AuthContext
├── lib/                   ← supabase.js
├── supabase/
│   └── policies.sql       ← TODO: 여기에 RLS 정책 작성
├── package.json
├── tailwind.config.js
└── next.config.js
```

**시작 방법** (PowerShell 기준):
```bash
cd practice/chapter11/starter
npm install
npm run dev
```
macOS Terminal도 동일하다.

> **핵심**: RLS는 JavaScript 코드가 아니라 **SQL로 설정**한다. `supabase/policies.sql` 파일을 작성한 뒤, Supabase Dashboard의 SQL Editor에서 실행한다. 프론트엔드 코드는 Ch10과 동일하게 유지된다.

---

## 바이브코딩 가이드

> **Copilot 활용**: 이번 실습에서는 RLS 정책 SQL을 작성한다. Copilot에게 정책을 요청할 때 반드시 "RLS", "CREATE POLICY", `auth.uid()` 키워드를 포함해야 한다. 그렇지 않으면 프론트엔드 보안 코드가 나올 수 있다.

**좋은 프롬프트 vs 나쁜 프롬프트**:

나쁜 프롬프트:
> "게시판 보안 설정해줘"

문제: AI가 React 코드에서 `if` 문으로 보안을 구현할 수 있다. 데이터베이스 레벨 보안이 필요하다는 맥락이 없다.

좋은 프롬프트:

> **Copilot 프롬프트**
> "Supabase의 posts 테이블에 Row Level Security 정책을 SQL로 작성해줘.
> 1) RLS 활성화: ALTER TABLE posts ENABLE ROW LEVEL SECURITY
> 2) SELECT: 누구나 읽기 — USING (true)
> 3) INSERT: 로그인 사용자만 — WITH CHECK (auth.uid() = user_id)
> 4) UPDATE: 작성자만 — USING + WITH CHECK 모두 auth.uid() = user_id
> 5) DELETE: 작성자만 — USING (auth.uid() = user_id)
> 각 정책에 한글 이름을 붙여줘."

<!-- COPILOT_VERIFY: 위 프롬프트를 Copilot Chat에 입력하고 생성 결과를 캡처해주세요 -->

---

## 개인 실습

### 체크포인트 1: RLS 활성화 + 정책 생성 (15분)

**목표**: posts 테이블에 4대 정책을 생성한다.

① `supabase/policies.sql` 파일을 열고 TODO를 채운다
② Copilot에게 RLS 정책 SQL을 요청하거나 직접 작성한다
③ Supabase Dashboard -> SQL Editor를 열고, 작성한 SQL을 붙여넣어 실행한다
④ 실행 결과에 에러가 없는지 확인한다
⑤ 확인 쿼리를 실행한다:
```sql
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'posts';
```

> **강의 팁**: 순회하며 학생들이 SQL Editor에서 정책을 올바르게 실행했는지 확인한다. "갑자기 데이터가 안 보여요" 문제가 나오면 SELECT 정책 누락을 의심한다.

### 체크포인트 2: 권한 테스트 + 에러 처리 (20분)

**목표**: 다른 계정으로 권한 차단을 확인한다.

① Google 계정 A로 게시글을 작성한다
② Google 계정 B로 로그인한다 (시크릿 창 사용: Ctrl+Shift+N, macOS: Cmd+Shift+N)
③ 사용자 B가 사용자 A의 게시글 수정/삭제를 시도한다
④ **실패**하는지 확인한다 (UI에서 버튼이 안 보이는 것과 별개로, 브라우저 콘솔에서 직접 시도해본다)
⑤ 비로그인 상태에서 게시글 목록이 보이는지 확인한다 (SELECT 정책 검증)

추가로 에러 처리를 보강한다:

> **Copilot 프롬프트**
> "RLS에서 권한 에러(42501)가 발생했을 때 '권한이 없습니다' 메시지를 사용자에게 보여주는 코드를 작성해줘.
> 게시글 삭제 함수에서 error.code === '42501'을 확인해줘."

### 체크포인트 3: 검증 + 배포 (15분)

**목표**: RLS 정책을 최종 검증하고 배포한다.

① 아래 검증 체크리스트를 수행한다
② profiles 테이블에도 RLS를 적용한다 (누구나 읽기, 본인만 수정)
③ git add -> git commit -> git push 로 배포한다:
```bash
git add .
git commit -m "Ch11: RLS 권한 정책 적용"
git push
```
④ 배포된 URL에서 RLS가 동작하는지 확인한다
⑤ 다른 계정으로 다시 한번 테스트한다

---

## 검증 체크리스트

**표 11.10** AI 코드 검증 체크리스트

| 항목 | 확인 |
|------|------|
| posts 테이블에 RLS가 활성화되었는가? | ☐ |
| 비로그인 사용자가 게시글 목록을 볼 수 있는가? | ☐ |
| 비로그인 사용자가 게시글을 작성할 수 **없는가**? | ☐ |
| 로그인 사용자가 본인 글을 수정/삭제할 수 있는가? | ☐ |
| 로그인 사용자가 다른 사람 글을 수정/삭제할 수 **없는가**? | ☐ |
| profiles 테이블에도 RLS가 적용되었는가? | ☐ |
| Supabase Dashboard에서 정책 목록이 보이는가? | ☐ |
| 배포 URL에서 정상 동작하는가? | ☐ |

---

## 흔한 AI 실수

**표 11.11** Ch11에서 AI가 자주 틀리는 패턴

| AI 실수 | 증상 | 해결 |
|---------|------|------|
| RLS 활성화 없이 정책만 생성 | 정책이 무시됨 (모든 접근 허용) | `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` 먼저 실행 |
| INSERT에 `USING` 사용 | 에러 또는 정책 무시 | INSERT는 `WITH CHECK`를 사용 |
| UPDATE에 `WITH CHECK` 누락 | `user_id`를 다른 사용자로 변경 가능 | `USING`과 `WITH CHECK` 모두 설정 |
| `auth.uid()`를 문자열로 비교 | 타입 불일치로 항상 거부 | `auth.uid()`는 uuid 타입, 별도 캐스팅 불필요 |
| 모든 작업에 하나의 정책 | 세밀한 권한 제어 불가 | SELECT/INSERT/UPDATE/DELETE 각각 별도 정책 |
| profiles 테이블 RLS 미설정 | 다른 사용자 프로필 수정 가능 | profiles에도 RLS 정책 적용 |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch11 과제"에 아래 두 항목을 제출한다:

```
① 배포 URL
   예: https://내프로젝트.vercel.app

② AI가 틀린 부분 1개
   예: "Copilot이 INSERT 정책에 USING을 사용했는데,
       INSERT는 WITH CHECK를 사용해야 한다.
       WITH CHECK (auth.uid() = user_id)로 수정했다."
```

---

## 코드리뷰 토론 가이드

> **토론 가이드**: 2-3명이 자발적으로 화면을 공유하며 결과를 발표한다.

**발표 포인트** (1인당 3-5분):
1. Supabase Dashboard에서 RLS 정책 목록을 보여준다
2. 다른 계정으로 수정/삭제 시도 -> 실패하는 것을 시연한다
3. Copilot이 RLS 관련해서 틀린 부분이 있었다면 공유한다

**토론 질문**:
- "RLS를 적용하기 전과 후, 브라우저 콘솔에서의 동작이 어떻게 달라졌는가?"
- "RLS 정책은 OR로 결합된다고 했는데, 이것이 왜 위험할 수 있는가?"
- "UI에서 버튼을 숨기는 것과 RLS로 차단하는 것, 둘 다 필요한 이유는 무엇인가?"

---

## 교수 피드백 포인트

**확인할 것**:
- RLS가 실제로 활성화되었는지 -- `pg_policies` 조회 결과 확인
- 4대 정책이 모두 생성되었는지
- INSERT에 `WITH CHECK`를 올바르게 사용했는지 (USING 아닌)
- 다른 계정 테스트를 실제로 수행했는지

**흔한 문제 대응**:
- "갑자기 데이터가 안 보여요" -> SELECT 정책 누락
- "게시글 작성이 안 돼요" -> `user_id` 누락 또는 INSERT 정책 조건 오류
- "정책은 만들었는데 아무 효과가 없어요" -> `ENABLE ROW LEVEL SECURITY` 누락

**다음 주 예고**:
> 게시판의 기능과 보안이 완성되었다. 하지만 아직 에러가 발생하면 흰 화면이 나오고, 데이터를 불러오는 동안 아무것도 안 보인다. 다음 주에는 **에러 처리, 로딩 UI, 폼 유효성 검증**을 구현하여 사용자가 불편함 없이 쓸 수 있는 앱으로 다듬는다.

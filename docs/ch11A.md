# Chapter 11. Row Level Security (RLS) — A회차: 강의

> **미션**: "내 글은 나만 수정/삭제할 수 있다"를 데이터베이스가 강제한다

---

## 학습목표

1. 클라이언트 사이드 보안의 한계를 구체적으로 설명할 수 있다
2. RLS의 개념과 CREATE POLICY 문법을 이해할 수 있다
3. USING과 WITH CHECK의 차이를 구분할 수 있다
4. 게시판에 "누구나 읽기, 로그인 사용자만 작성, 작성자만 수정/삭제" 정책을 구현할 수 있다
5. RLS 정책을 테스트하고 디버깅할 수 있다

---

## 수업 타임라인

**표 11.1** A회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | 오늘의 미션 + 빠른 진단 |
| 00:05~00:30 | RLS의 필요성 + 기본 문법 (CREATE POLICY, USING, WITH CHECK) |
| 00:30~00:55 | 라이브 코딩 시연: 4대 권한 시나리오 구현 |
| 00:55~01:20 | RLS 테스트와 디버깅 + 트러블슈팅 |
| 01:20~01:27 | 핵심 정리 + B회차 과제 스펙 공개 |
| 01:27~01:30 | Exit ticket |

---

## 오늘의 미션 + 빠른 진단

> **오늘의 질문**: "Ch10에서 만든 게시판에서, 브라우저 콘솔에 코드를 입력하면 다른 사람의 게시글을 삭제할 수 있다. 이걸 어떻게 막는가?"

**빠른 진단** (1문항):

다음 중 "진짜 보안"에 해당하는 것은?
- (A) React에서 `if (user.id === post.user_id)` 조건으로 삭제 버튼을 숨김
- (B) 데이터베이스가 `auth.uid() = user_id`인 행만 삭제를 허용함
- (C) CSS로 삭제 버튼을 `display: none`으로 숨김

정답: (B) -- 데이터베이스 레벨에서 권한을 강제하는 것만이 진짜 보안이다.

---

## 11.1 RLS의 필요성

Ch10에서 게시판 CRUD를 완성했다. 그런데 수업 마지막에 언급한 **보안 구멍**을 기억하는가? 지금 상태에서는 누구든 다른 사람의 게시글을 수정하거나 삭제할 수 있다.

### 11.1.1 클라이언트 사이드 보안의 한계

Ch10에서 "본인 글에만 수정/삭제 버튼 표시"를 구현했다. 하지만 이것은 **UI를 숨긴 것**이지 **보안이 아니다**.

브라우저 개발자 도구(F12)에서 다음을 실행하면:

```javascript
// 브라우저 콘솔에서 직접 실행 가능
const supabase = createClient();
await supabase.from("posts").delete().eq("id", 1);
// → 다른 사람의 글이 삭제된다!
```

프론트엔드 코드에서 아무리 조건을 걸어도, **브라우저는 사용자가 완전히 제어할 수 있는 환경**이다. JavaScript를 수정하거나, API를 직접 호출하거나, 네트워크 요청을 조작할 수 있다.

**표 11.2** 클라이언트 보안 vs 서버 보안

| 보안 위치 | 방법 | 우회 가능? | 용도 |
|-----------|------|:----------:|------|
| **클라이언트** (React) | `if (user.id === post.user_id)` | **쉽게 우회** | UX 개선 (불필요한 버튼 숨기기) |
| **서버** (RLS) | `CREATE POLICY ... USING (auth.uid() = user_id)` | **우회 불가** | 실제 보안 |

> **강의 팁**: 실제로 브라우저 콘솔에서 다른 사람의 게시글을 삭제하는 시연을 한다. "이게 왜 되는가?" 질문으로 시작하면 학생들이 RLS의 필요성을 체감한다.

> **라이브 코딩 시연**: 브라우저 콘솔에서 `supabase.from("posts").delete().eq("id", 1)` 실행 -> 성공 -> "이것이 문제입니다" -> RLS 적용 후 같은 명령 실행 -> 실패 -> "이제 데이터베이스가 막습니다"

### 11.1.2 서버 사이드 권한 강제의 중요성

보안의 핵심 원칙: **절대 클라이언트를 신뢰하지 마라**.

모든 권한 검사는 **서버 레벨**에서 해야 한다. 전통적인 백엔드에서는 API 미들웨어에서 이를 처리하지만, BaaS를 사용하는 우리 환경에서는 **데이터베이스 자체**가 이 역할을 한다. 이것이 **RLS**(Row Level Security)이다.

**RLS**(Row Level Security, 행 수준 보안)는 PostgreSQL의 기능으로, **테이블의 각 행에 대해 누가 무엇을 할 수 있는지** 정의한다. 쿼리가 실행되기 전에 RLS 정책이 먼저 검사되고, 조건에 맞지 않는 행은 아예 보이지 않거나 수정/삭제가 거부된다.

```text
쿼리 요청 → RLS 정책 검사 → 허용된 행만 반환/수정/삭제
```

---

## 11.2 RLS 기본 문법

### 11.2.1 정책 생성: CREATE POLICY

RLS를 사용하려면 두 단계가 필요하다:

① **RLS 활성화**: 테이블에 RLS를 켠다
② **정책 생성**: 누가 무엇을 할 수 있는지 정의한다

```sql
-- ① RLS 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- ② 정책 생성: 누구나 읽기 가능
CREATE POLICY "누구나 게시글 읽기" ON posts
  FOR SELECT
  USING (true);
```

**표 11.3** CREATE POLICY 문법 해석

| SQL | 의미 |
|-----|------|
| `CREATE POLICY "이름"` | 정책 이름 (한글 가능, 고유해야 함) |
| `ON posts` | 어떤 테이블에 적용하는가 |
| `FOR SELECT` | 어떤 작업에 적용하는가 (SELECT/INSERT/UPDATE/DELETE) |
| `USING (true)` | 조건: `true`면 모든 행 허용 |

> **중요**: RLS를 활성화하면 **정책이 없는 작업은 모두 차단**된다. 즉, `ENABLE ROW LEVEL SECURITY` 후에 SELECT 정책만 만들면 INSERT/UPDATE/DELETE는 전부 거부된다. 필요한 작업마다 정책을 하나씩 만들어야 한다.

이 동작을 표로 정리하면:

**표 11.4** RLS 활성화 후 정책 유무에 따른 접근

| 상태 | SELECT | INSERT | UPDATE | DELETE |
|------|:------:|:------:|:------:|:------:|
| RLS 비활성화 | 허용 | 허용 | 허용 | 허용 |
| RLS 활성화 + 정책 없음 | **차단** | **차단** | **차단** | **차단** |
| RLS 활성화 + SELECT 정책만 | 허용 | **차단** | **차단** | **차단** |
| RLS 활성화 + 모든 정책 | 정책에 따라 | 정책에 따라 | 정책에 따라 | 정책에 따라 |

> **강의 팁**: "RLS를 켜는 순간 모든 문이 잠긴다. 정책을 하나씩 만드는 것은 필요한 문에만 열쇠를 꽂는 것"이라고 비유한다.

### 11.2.2 USING과 WITH CHECK

RLS 정책에는 두 종류의 조건이 있다:

**표 11.5** USING vs WITH CHECK

| 조건 | 적용 시점 | 대상 작업 | 질문 |
|------|----------|----------|------|
| `USING` | **기존 행**을 읽거나 수정/삭제할 때 | SELECT, UPDATE, DELETE | "이 행을 **볼/수정/삭제** 수 있는가?" |
| `WITH CHECK` | **새 행**을 생성하거나 수정된 행을 검증할 때 | INSERT, UPDATE | "이 행을 **만들어도 되는가**?" |

쉽게 말해서:
- `USING` = "기존 데이터에 접근할 때의 조건" (읽기/수정/삭제 전)
- `WITH CHECK` = "새 데이터를 만들거나 바꿀 때의 조건" (생성/수정 후 검증)

UPDATE는 두 가지 모두 필요하다: `USING`으로 "이 행을 수정할 수 있는가?"를 검사하고, `WITH CHECK`로 "수정된 결과가 유효한가?"를 검증한다.

### 11.2.3 auth.uid() 함수

Supabase에서 "현재 로그인한 사용자"를 RLS 정책에서 참조하려면 `auth.uid()` 함수를 사용한다:

```sql
-- 현재 로그인한 사용자의 UUID 반환
auth.uid()  -- → 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
```

`auth.uid()`는 요청의 JWT에서 사용자 ID를 추출한다. 비로그인 상태에서는 `null`을 반환한다.

이 함수를 USING 조건에 사용하면:

```sql
-- "user_id가 현재 로그인한 사용자의 ID와 같은 행만 허용"
USING (auth.uid() = user_id)
```

---

## 11.3 권한 시나리오 구현

> **라이브 코딩 시연**: 교수가 SQL Editor에서 4대 정책을 순서대로 생성하고, 다른 계정으로 권한 테스트하는 과정을 시연한다

게시판에 필요한 4가지 권한 시나리오를 SQL로 구현한다. 각 시나리오를 하나의 `CREATE POLICY` 문으로 만든다.

> **Copilot 프롬프트**
> "Supabase에서 게시판 posts 테이블에 RLS 정책을 만들어줘.
> 1) 누구나 읽기 가능 (SELECT)
> 2) 로그인 사용자만 작성 (INSERT, user_id = auth.uid())
> 3) 작성자만 수정 (UPDATE, auth.uid() = user_id)
> 4) 작성자만 삭제 (DELETE, auth.uid() = user_id)
> posts 테이블에 RLS를 먼저 활성화하고, 각 정책을 별도로 생성해줘."

비교를 위해 모호한 프롬프트도 보자:

> **나쁜 프롬프트**
> "게시판 보안 설정해줘"

이 프롬프트로는 AI가 클라이언트 코드에서 `if` 문으로 보안을 구현할 수 있다. "RLS", "CREATE POLICY", `auth.uid()` 같은 핵심 키워드가 없으면 Supabase 데이터베이스 레벨 보안이 아닌 프론트엔드 보안이 나올 가능성이 높다.

<!-- COPILOT_VERIFY: 위 "좋은 프롬프트"로 Copilot이 올바른 RLS 정책 SQL을 생성하는지 확인해주세요 -->

> **함께 진행**: 교수 화면에서 SQL Editor를 열고, 아래 SQL을 순서대로 실행한다

### 11.3.1 "누구나 읽기 가능"

```sql
-- RLS 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 정책: 누구나 읽기 가능
CREATE POLICY "누구나 게시글 읽기" ON posts
  FOR SELECT
  USING (true);
```

`USING (true)` -- 조건이 항상 참이므로 모든 행을 읽을 수 있다. 비로그인 사용자도 게시글 목록을 볼 수 있다.

### 11.3.2 "로그인 사용자만 작성"

```sql
CREATE POLICY "로그인 사용자만 작성" ON posts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

`WITH CHECK (auth.uid() = user_id)` -- 새 게시글의 `user_id`가 현재 로그인한 사용자의 ID와 같아야만 INSERT가 허용된다. 이렇게 하면:
- 비로그인 사용자 -> 작성 불가 (`auth.uid()`가 `null`이므로 조건 불일치)
- 다른 사용자 ID로 작성 시도 -> 실패 (자신의 ID만 `user_id`에 넣을 수 있음)

### 11.3.3 "작성자만 수정/삭제"

```sql
-- 수정: 작성자만 가능
CREATE POLICY "작성자만 수정" ON posts
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 삭제: 작성자만 가능
CREATE POLICY "작성자만 삭제" ON posts
  FOR DELETE
  USING (auth.uid() = user_id);
```

UPDATE에는 `USING`과 `WITH CHECK`가 모두 필요하다:
- `USING` -- "이 행을 수정할 수 있는가?" (기존 데이터의 `user_id`가 나인가?)
- `WITH CHECK` -- "수정된 결과가 유효한가?" (`user_id`를 다른 사람으로 변경하는 것을 방지)

DELETE에는 `USING`만 필요하다. 삭제 후에 검증할 새 데이터가 없기 때문이다.

### 11.3.4 "관리자 전체 권한"

관리자 역할이 필요하면 `profiles` 테이블에 `role` 열을 추가하고 정책에서 참조한다:

```sql
-- profiles 테이블에 role 열 추가
ALTER TABLE profiles ADD COLUMN role text DEFAULT 'user';

-- 관리자는 모든 게시글 수정/삭제 가능
CREATE POLICY "관리자 전체 수정" ON posts
  FOR UPDATE
  USING (
    auth.uid() = user_id
    OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

`OR EXISTS (...)` -- "내 글이거나, 내가 관리자이면" 허용한다.

> 이 교재에서는 관리자 기능을 직접 구현하지 않는다. 개인 프로젝트에서 필요 시 이 패턴을 참고한다.

**표 11.6** 게시판 RLS 정책 요약

| 정책 이름 | 작업 | 조건 | 설명 |
|-----------|------|------|------|
| 누구나 게시글 읽기 | SELECT | `true` | 비로그인도 읽기 가능 |
| 로그인 사용자만 작성 | INSERT | `auth.uid() = user_id` | 본인 ID로만 작성 |
| 작성자만 수정 | UPDATE | `auth.uid() = user_id` | 본인 글만 수정 |
| 작성자만 삭제 | DELETE | `auth.uid() = user_id` | 본인 글만 삭제 |

---

## 11.4 RLS 테스트와 디버깅

정책을 작성했으면 반드시 **테스트**해야 한다. 정책이 올바르게 동작하는지 확인하지 않으면, 보안 구멍이 그대로 남거나 반대로 정상 기능이 차단될 수 있다.

> **강의 팁**: "RLS를 적용하고 테스트 안 하는 것은, 현관문에 자물쇠를 달고 잠갔는지 확인 안 하는 것과 같다."

### 11.4.1 다른 사용자 계정으로 테스트

가장 확실한 테스트: **다른 Google 계정으로 로그인**하여 다른 사람의 글을 수정/삭제 시도한다. Google 계정이 하나뿐이면 **시크릿 창**(Chrome: Ctrl+Shift+N, macOS: Cmd+Shift+N)에서 다른 계정으로 로그인한다.

**표 11.7** RLS 테스트 시나리오

| # | 시나리오 | 예상 결과 |
|:-:|---------|----------|
| 1 | 비로그인 -> 게시글 목록 조회 | 성공 (누구나 읽기) |
| 2 | 비로그인 -> 게시글 작성 시도 | 실패 (로그인 필요) |
| 3 | 사용자 A -> 게시글 작성 | 성공 |
| 4 | 사용자 A -> 본인 글 수정 | 성공 |
| 5 | 사용자 B -> 사용자 A의 글 수정 시도 | **실패** (작성자 아님) |
| 6 | 사용자 B -> 사용자 A의 글 삭제 시도 | **실패** (작성자 아님) |

> **함께 진행**: 교수가 두 개의 Google 계정을 번갈아 사용하며 테스트를 시연한다

### 11.4.2 RLS 거부 시 동작

**표 11.8** RLS 거부 시 동작

| 작업 | RLS 거부 시 동작 | 설명 |
|------|-----------------|------|
| SELECT | 해당 행이 결과에서 제외 | 에러 없이 빈 배열 또는 부분 결과 반환 |
| INSERT | `42501` 에러 반환 | `new row violates row-level security policy` |
| UPDATE | 영향 받은 행 0개 | 에러 없이 조용히 실패 (행이 안 보이므로) |
| DELETE | 영향 받은 행 0개 | 에러 없이 조용히 실패 (행이 안 보이므로) |

> RLS가 거부한 행은 "존재하지 않는 것"처럼 취급된다. SELECT에서는 단순히 결과에 포함되지 않고, UPDATE/DELETE에서는 아무 행도 영향받지 않는다. INSERT만 명시적 에러(`42501`)를 반환한다. 이는 보안상 의도적인 동작이다 -- 공격자에게 데이터 존재 여부를 알려주지 않는다.

### 11.4.3 정책 충돌 문제

같은 테이블에 여러 정책이 있으면 **OR 논리로 결합**된다. 하나라도 허용하는 정책이 있으면 접근이 허용된다.

문제 예시:

```sql
-- 정책 A: 작성자만 삭제
CREATE POLICY "작성자만 삭제" ON posts
  FOR DELETE USING (auth.uid() = user_id);

-- 정책 B: 누구나 삭제 (실수로 생성)
CREATE POLICY "누구나 삭제" ON posts
  FOR DELETE USING (true);
```

정책 B 때문에 누구나 게시글을 삭제할 수 있다! RLS 정책은 OR로 결합되므로, 하나라도 `true`인 정책이 있으면 나머지 정책은 무력화된다.

해결:

```sql
-- 잘못된 정책 삭제
DROP POLICY "누구나 삭제" ON posts;
```

### 11.4.4 흔한 RLS 트러블슈팅

**"갑자기 데이터가 안 보여요"** -- RLS를 활성화한 후 SELECT 정책을 깜빡하면 발생한다.

```sql
-- 해결: SELECT 정책 추가
CREATE POLICY "누구나 읽기" ON posts
  FOR SELECT USING (true);
```

**"게시글 작성이 안 돼요"** -- INSERT 정책의 `WITH CHECK` 조건을 확인한다. `user_id`를 클라이언트에서 직접 보내야 하는데, 코드에서 빠뜨렸을 수 있다.

```javascript
// ❌ user_id를 빠뜨림 → WITH CHECK 실패
await supabase.from("posts").insert({ title, content });

// ✅ user_id를 포함 → WITH CHECK 통과
await supabase.from("posts").insert({ title, content, user_id: user.id });
```

**"본인 글인데 수정이 안 돼요"** -- `posts.user_id`와 `auth.uid()`의 타입이 모두 `uuid`인지 확인한다. 타입이 다르면 비교가 항상 실패한다.

### 11.4.5 Ch10 코드와 RLS의 관계

좋은 소식: **Ch10에서 작성한 코드는 수정할 필요가 없다**. RLS는 데이터베이스 레벨에서 동작하므로, 클라이언트 코드는 이전과 동일하게 `.insert()`, `.update()`, `.delete()`를 호출한다. 차이점은 RLS가 요청을 허용하거나 거부한다는 것뿐이다.

```javascript
// Ch10에서 작성한 코드 — 변경 없이 그대로 사용
const { error } = await supabase
  .from("posts")
  .delete()
  .eq("id", postId);

// RLS 적용 전: 항상 성공
// RLS 적용 후: 본인 글만 성공, 다른 사람 글은 실패
```

### profiles 테이블 RLS

posts만이 아니라 **profiles 테이블에도 RLS가 필요하다**:

```sql
-- profiles RLS 활성화
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 누구나 프로필 읽기 가능
CREATE POLICY "누구나 프로필 읽기" ON profiles
  FOR SELECT
  USING (true);

-- 본인 프로필만 수정 가능
CREATE POLICY "본인 프로필만 수정" ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
```

---

## 핵심 정리 + B회차 과제 스펙

### 이번 시간 핵심 3가지

1. **클라이언트 보안은 보안이 아니다** -- 브라우저는 사용자가 완전히 제어 가능하므로, RLS로 데이터베이스가 보안을 강제한다
2. **RLS 4대 정책**: 누구나 읽기(SELECT), 로그인만 작성(INSERT), 작성자만 수정(UPDATE), 작성자만 삭제(DELETE)
3. **USING vs WITH CHECK**: USING은 "기존 행에 접근할 때", WITH CHECK는 "새 행을 만들거나 수정할 때"

### B회차 과제 스펙

**게시판 권한 정책 작성 + 검증 + 배포**:
1. posts 테이블 RLS 활성화 + 4대 정책 생성
2. profiles 테이블 RLS 적용
3. 다른 계정으로 수정/삭제 차단 테스트
4. GitHub push + Vercel 배포

**스타터 코드**: `practice/chapter11/starter/` -- Ch10 완성 코드 기반이며, `supabase/policies.sql`에 TODO로 정책 작성 가이드가 제공된다.

---

## Exit ticket

다음 RLS 정책에서 잘못된 부분을 찾아라:

```sql
CREATE POLICY "로그인 사용자만 작성" ON posts
  FOR INSERT
  USING (auth.uid() = user_id);
```

정답: INSERT에는 `USING`이 아니라 `WITH CHECK`를 사용해야 한다. INSERT는 새 행을 생성하는 것이므로 "기존 행 조건"인 USING이 아닌 "새 행 검증"인 WITH CHECK가 올바르다.

---

## 교수 메모

**준비물 체크리스트**:
- [ ] Google 계정 2개 준비 (교수용 + 테스트용, RLS 테스트 시연)
- [ ] RLS 적용 전 "다른 사람 글 삭제" 시연 준비 (보안 구멍 체감용)
- [ ] SQL 정책 코드 미리 준비 (학생들이 SQL Editor에 복사 가능하도록)
- [ ] USING vs WITH CHECK 비교 슬라이드
- [ ] 정책 충돌 예시 준비 (OR 논리 설명용)
- [ ] Supabase Dashboard에서 정책 목록 확인 방법 안내

**수업 후 체크**:
- [ ] 학생들이 "클라이언트 보안 != 진짜 보안"을 이해했는가
- [ ] CREATE POLICY 문법을 읽을 수 있는가
- [ ] USING과 WITH CHECK의 차이를 구분할 수 있는가
- [ ] `auth.uid()` 함수의 역할을 이해했는가

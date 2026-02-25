# Chapter 11. Row Level Security (RLS) — C: 모범 구현 + 해설

> B회차 과제 제출 후 공개

---

## 모범 구현 코드 해설

_전체 프로젝트는 practice/chapter11/complete/ 참고_

### 전체 구조

```
practice/chapter11/complete/
├── app/                   ← Ch10 완성 코드 (변경 없음)
├── components/            ← PostList, PostForm, Navbar (변경 없음)
├── contexts/              ← AuthContext (변경 없음)
├── lib/                   ← supabase.js (변경 없음)
├── supabase/
│   └── policies.sql       ← RLS 정책 (모범 구현)
├── package.json
├── tailwind.config.js
└── next.config.js
```

> **핵심 포인트**: Ch11에서 프론트엔드 코드는 **전혀 변경하지 않았다**. RLS는 데이터베이스 레벨에서 동작하므로, 클라이언트 코드는 Ch10과 동일하다. 추가된 것은 `supabase/policies.sql` 파일뿐이다.

---

### policies.sql 핵심 포인트

#### 1. RLS 활성화가 반드시 먼저

```sql
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
```

**왜 이렇게 했는가**: RLS 활성화 없이 정책만 만들면 **아무 효과가 없다**. 이것이 가장 흔한 실수이다.

> **강의 팁**: 학생 중 "정책을 만들었는데 누구나 삭제할 수 있어요"라고 하면, 먼저 `ENABLE ROW LEVEL SECURITY`를 실행했는지 확인하도록 안내한다.

#### 2. SELECT 정책: USING (true)

```sql
CREATE POLICY "누구나 게시글 읽기" ON posts
  FOR SELECT
  USING (true);
```

`true`는 "조건 없이 모두 허용"이다. 게시판은 비로그인 사용자도 게시글을 볼 수 있어야 하므로 이렇게 설정한다.

만약 "로그인한 사용자만 읽기"로 바꾸고 싶다면:

```sql
-- 로그인 사용자만 읽기 (참고용 — 이 교재에서는 사용하지 않음)
USING (auth.uid() IS NOT NULL)
```

#### 3. INSERT 정책: WITH CHECK (auth.uid() = user_id)

```sql
CREATE POLICY "로그인 사용자만 작성" ON posts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

**확인 포인트**:
- `USING`이 아니라 `WITH CHECK`를 사용했다 -- INSERT는 새 행을 생성하므로 "새 행 검증"이 맞다
- `auth.uid() = user_id`는 "새 게시글의 user_id가 현재 로그인한 사용자의 ID와 같아야 한다"는 의미
- 비로그인 사용자는 `auth.uid()`가 `null`이므로 자동으로 거부된다
- 다른 사용자의 ID로 `user_id`를 위조하는 것도 방지된다

#### 4. UPDATE 정책: USING + WITH CHECK 모두 필요

```sql
CREATE POLICY "작성자만 수정" ON posts
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

**왜 둘 다 필요한가**:
- `USING` -- "이 행에 접근할 수 있는가?" (기존 user_id가 나인가?)
- `WITH CHECK` -- "수정된 결과가 유효한가?" (user_id를 다른 사람으로 바꾸는 것을 방지)

`WITH CHECK`가 없으면, 자기 게시글의 `user_id`를 다른 사용자로 변경할 수 있다. 이렇게 하면 실질적으로 게시글의 "소유권"을 이전하는 것이 가능해진다.

#### 5. DELETE 정책: USING만 필요

```sql
CREATE POLICY "작성자만 삭제" ON posts
  FOR DELETE
  USING (auth.uid() = user_id);
```

DELETE에는 `WITH CHECK`가 필요 없다. 삭제 후에 검증할 새 데이터가 없기 때문이다. `USING`만으로 "내 글만 삭제 가능"을 충분히 표현한다.

#### 6. profiles 테이블 RLS

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "누구나 프로필 읽기" ON profiles
  FOR SELECT
  USING (true);

CREATE POLICY "본인 프로필만 수정" ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
```

posts의 관계 데이터 조회(`.select("*, profiles(username)")`)가 동작하려면 profiles 테이블에 SELECT 정책이 반드시 있어야 한다. profiles RLS를 빠뜨리면 게시글 목록에서 작성자 이름이 `null`로 표시된다.

---

## 채점 기준 참고

**표 11C.1** 채점 기준

| 항목 | 배점 | 기준 |
|------|------|------|
| 배포 URL 동작 | 7점 | RLS가 적용된 상태에서 CRUD가 동작하는가 |
| AI 검증 서술 | 3점 | AI가 틀린 부분을 구체적으로 설명했는가 |

**URL 동작 (7점)** 세부:
- 게시글 목록이 표시된다 (2점)
- 본인 게시글 작성/수정/삭제가 동작한다 (3점)
- 다른 사용자의 게시글 수정/삭제가 **차단**된다 (2점)

**AI 검증 서술 (3점)** 세부:
- AI가 틀린 부분을 1개 이상 구체적으로 지적했다 (2점)
- 어떻게 수정했는지 설명했다 (1점)

---

## 우수 구현 사례

### 사례 1: RLS 에러 메시지 개선

```javascript
async function handleDelete(postId) {
  if (!confirm("정말 삭제하시겠습니까?")) return;

  const supabase = createClient();
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId);

  if (error) {
    if (error.code === "42501") {
      alert("이 게시글을 삭제할 권한이 없습니다.");
    } else {
      alert("삭제 중 오류가 발생했습니다: " + error.message);
    }
    return;
  }
  router.push("/");
}
```

RLS 에러 코드(`42501`)를 구분하여 사용자에게 "권한이 없습니다" 메시지를 보여주는 사례. Ch12(에러 처리)에서 이 패턴을 더 체계적으로 다룬다.

### 사례 2: SQL Editor에서 정책 확인 쿼리 포함

```sql
-- 정책 적용 후 확인
SELECT
  tablename,
  policyname,
  cmd,
  qual AS using_condition,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

정책을 생성한 후 확인 쿼리까지 포함한 사례. 정책이 올바르게 적용되었는지 즉시 확인할 수 있다.

---

## 자주 하는 실수 정리

**표 11C.2** 학생들이 자주 하는 실수

| 실수 | 증상 | 해결 |
|------|------|------|
| `ENABLE ROW LEVEL SECURITY` 누락 | 정책 생성 후에도 보안 미적용 | `ALTER TABLE posts ENABLE ROW LEVEL SECURITY` 실행 |
| SELECT 정책 누락 | "갑자기 게시글이 안 보여요" | `FOR SELECT USING (true)` 정책 추가 |
| INSERT에 USING 사용 | 게시글 작성 실패 또는 정책 무시 | USING을 WITH CHECK로 변경 |
| UPDATE에 WITH CHECK 누락 | user_id 위조 가능 | USING과 WITH CHECK 모두 설정 |
| profiles RLS 누락 | 작성자 이름이 null로 표시 | profiles 테이블에도 SELECT 정책 추가 |
| 정책 이름 중복 | "policy already exists" 에러 | `DROP POLICY IF EXISTS "이름" ON 테이블` 후 재생성 |
| insert에 user_id 빠뜨림 | "new row violates RLS policy" | insert 시 `user_id: user.id` 반드시 포함 |
| 같은 작업에 `USING (true)` 정책 추가 | 모든 사용자에게 해당 작업 허용 | 불필요한 정책 `DROP POLICY` |

---

## 다음 장 연결

게시판의 기능(Ch10 CRUD)과 보안(Ch11 RLS)이 모두 완성되었다. 하지만 아직 사용자 경험(UX)이 부족하다:
- 에러가 발생하면 **흰 화면**이 나온다
- 데이터를 불러오는 동안 **아무것도 안 보인다**
- 폼에 잘못된 값을 입력해도 **경고가 없다**

Ch12에서는 에러 처리, 로딩 UI(스켈레톤), 폼 유효성 검증, 이미지 최적화를 구현하여 **사용자가 불편함 없이 쓸 수 있는 앱**으로 다듬는다. RLS 에러(`42501`)를 사용자 친화적 메시지로 변환하는 것도 Ch12에서 더 체계적으로 다룬다.

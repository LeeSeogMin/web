# 제11장 리서치: Row Level Security (RLS)

## 1. RLS 개요

### 1.1 정의
Row Level Security(RLS)는 PostgreSQL의 기능으로, 데이터베이스 행(row) 단위로 접근 권한을 제어한다. 테이블의 특정 행에 대해 누가 SELECT, INSERT, UPDATE, DELETE를 할 수 있는지 정책으로 정의한다.

### 1.2 Supabase에서의 RLS
- Supabase는 PostgreSQL 기반이므로 RLS를 그대로 사용 가능
- Table Editor에서 생성한 테이블은 기본적으로 RLS 활성화
- SQL Editor에서 생성 시 수동으로 활성화 필요
- Supabase Auth와 통합: `auth.uid()`, `auth.jwt()` 함수 제공

### 1.3 왜 RLS가 필요한가
1. **클라이언트 사이드 보안의 한계**: 프론트엔드 코드는 누구나 볼 수 있고 우회 가능
2. **API 키 노출**: Supabase anon key는 브라우저에 노출됨
3. **서버 사이드 강제**: RLS는 데이터베이스 레벨에서 권한을 강제하므로 우회 불가

---

## 2. RLS 기본 문법

### 2.1 RLS 활성화/비활성화
```sql
-- 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 비활성화
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
```

### 2.2 정책 생성: CREATE POLICY
```sql
CREATE POLICY policy_name
ON table_name
FOR operation  -- ALL, SELECT, INSERT, UPDATE, DELETE
TO role_name   -- authenticated, anon, public
USING (condition)        -- 기존 행 필터링
WITH CHECK (condition);  -- 새 행 검증
```

### 2.3 USING vs WITH CHECK

| 구분 | USING | WITH CHECK |
|------|-------|------------|
| 역할 | 기존 행 필터링 | 새 행 검증 |
| 사용 시점 | SELECT, UPDATE(기존 값), DELETE | INSERT, UPDATE(새 값) |
| 반환값 | true면 보임, false면 안 보임 | true면 허용, false면 에러 |

**기본 동작**: WITH CHECK 없으면 USING 조건이 둘 다에 적용됨

### 2.4 auth.uid() 함수
```sql
-- 현재 로그인한 사용자의 UUID 반환
auth.uid()

-- 예시: 본인 데이터만 보기
USING ( auth.uid() = user_id )
```

**성능 팁**: 서브쿼리로 감싸면 캐싱됨
```sql
USING ( (select auth.uid()) = user_id )
```

---

## 3. 권한 시나리오별 정책

### 3.1 누구나 읽기 가능 (Public Read)
```sql
CREATE POLICY "Anyone can read"
ON posts FOR SELECT
TO public
USING ( true );
```

### 3.2 로그인 사용자만 작성 (Authenticated Insert)
```sql
CREATE POLICY "Authenticated can insert"
ON posts FOR INSERT
TO authenticated
WITH CHECK ( (select auth.uid()) = user_id );
```

### 3.3 작성자만 수정 (Owner Update)
```sql
CREATE POLICY "Owner can update"
ON posts FOR UPDATE
TO authenticated
USING ( (select auth.uid()) = user_id )
WITH CHECK ( (select auth.uid()) = user_id );
```

### 3.4 작성자만 삭제 (Owner Delete)
```sql
CREATE POLICY "Owner can delete"
ON posts FOR DELETE
TO authenticated
USING ( (select auth.uid()) = user_id );
```

### 3.5 관리자 전체 권한
```sql
-- 관리자 확인 함수 생성
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN (
    SELECT is_admin FROM profiles
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 관리자 정책
CREATE POLICY "Admin full access"
ON posts FOR ALL
TO authenticated
USING ( is_admin() )
WITH CHECK ( is_admin() );
```

---

## 4. TO 절 역할별 의미

| 역할 | 설명 |
|------|------|
| `public` | 모든 요청 (anon + authenticated) |
| `anon` | 인증되지 않은 요청 |
| `authenticated` | 인증된 사용자 |
| `service_role` | RLS 우회하는 관리자 역할 |

---

## 5. 정책 설계 가이드라인

### 5.1 연산별 권장 패턴

| 연산 | USING | WITH CHECK |
|------|-------|------------|
| SELECT | 필수 | 사용 안 함 |
| INSERT | 사용 안 함 | 필수 |
| UPDATE | 필수 | 필수 |
| DELETE | 필수 | 사용 안 함 |

### 5.2 성능 최적화
1. 인덱스 추가: 정책에서 사용하는 열에 인덱스
2. JWT 함수 서브쿼리: `(select auth.uid())` 형태로 캐싱
3. TO 절 활용: `TO authenticated`로 anon 요청 조기 차단

### 5.3 주의사항
- RLS 활성화 후 정책 없으면 **모든 접근 차단**
- `USING (true)`는 모든 행 허용 (주의해서 사용)
- UPDATE는 SELECT 정책도 필요 (기존 행 읽어야 수정 가능)

---

## 6. 테스트 방법

### 6.1 SQL Editor에서 역할 전환
```sql
-- 특정 사용자로 테스트
SET request.jwt.claim.sub = 'user-uuid-here';

-- anon으로 테스트
SET role anon;

-- authenticated로 테스트
SET role authenticated;

-- 원래대로 복원
RESET role;
```

### 6.2 권한 실패 시 에러
- SELECT: 해당 행이 결과에서 제외됨 (에러 없음)
- INSERT/UPDATE/DELETE: "new row violates row-level security policy" 에러

---

## 참고문헌

1. Supabase. Row Level Security. https://supabase.com/docs/guides/database/postgres/row-level-security
2. PostgreSQL. CREATE POLICY. https://www.postgresql.org/docs/current/sql-createpolicy.html
3. PostgreSQL. Row Security Policies. https://www.postgresql.org/docs/current/ddl-rowsecurity.html
4. Supabase. Securing your API. https://supabase.com/docs/guides/api/securing-your-api
5. Max Lynch. Easy Row Level Security (RLS) Policies in Supabase and Postgres. https://maxlynch.com/2023/11/04/tips-for-row-level-security-rls-in-postgres-and-supabase/

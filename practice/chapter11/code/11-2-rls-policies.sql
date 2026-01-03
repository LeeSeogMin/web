/*
 * 11-2 RLS 기본 문법
 * Row Level Security 활성화 및 정책 생성
 */

-- ===========================
-- 1. RLS 활성화
-- ===========================

-- posts 테이블에 RLS 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- comments 테이블에 RLS 활성화
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- profiles 테이블에 RLS 활성화
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;


-- ===========================
-- 2. 기본 정책 생성 문법
-- ===========================

/*
CREATE POLICY policy_name    -- 정책 이름
ON table_name                -- 대상 테이블
FOR operation                -- ALL, SELECT, INSERT, UPDATE, DELETE
TO role_name                 -- authenticated, anon, public
USING (condition)            -- 기존 행 필터링 조건
WITH CHECK (condition);      -- 새 행 검증 조건
*/


-- ===========================
-- 3. 역할(Role) 설명
-- ===========================

/*
- public: 모든 요청 (anon + authenticated)
- anon: 인증되지 않은 요청 (로그인 안 한 사용자)
- authenticated: 인증된 요청 (로그인한 사용자)
- service_role: RLS 우회하는 관리자 역할 (서버에서만 사용)
*/


-- ===========================
-- 4. auth.uid() 함수
-- ===========================

/*
auth.uid()는 현재 JWT에서 추출한 사용자 UUID를 반환한다.

- 로그인한 사용자: 해당 사용자의 id (UUID)
- 로그인하지 않은 사용자: NULL

성능 최적화: 서브쿼리로 감싸서 캐싱
- 비권장: auth.uid() = user_id
- 권장: (select auth.uid()) = user_id
*/


-- ===========================
-- 5. 정책 삭제
-- ===========================

-- 기존 정책 삭제 (새로 만들기 전에)
DROP POLICY IF EXISTS "policy_name" ON table_name;


-- ===========================
-- 6. RLS 비활성화 (개발 중에만)
-- ===========================

-- 주의: 프로덕션에서는 절대 비활성화하지 않는다
-- ALTER TABLE posts DISABLE ROW LEVEL SECURITY;

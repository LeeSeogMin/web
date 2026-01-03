/*
 * 11-5 게시판 RLS 전체 적용
 * posts, comments, profiles 테이블 보안 정책
 */

-- ===========================
-- 0. 기존 정책 정리
-- ===========================

-- posts 테이블 정책 삭제
DROP POLICY IF EXISTS "Anyone can read posts" ON posts;
DROP POLICY IF EXISTS "Authenticated can insert posts" ON posts;
DROP POLICY IF EXISTS "Owner can update posts" ON posts;
DROP POLICY IF EXISTS "Owner can delete posts" ON posts;

-- comments 테이블 정책 삭제
DROP POLICY IF EXISTS "Anyone can read comments" ON comments;
DROP POLICY IF EXISTS "Authenticated can insert comments" ON comments;
DROP POLICY IF EXISTS "Owner can delete comments" ON comments;

-- profiles 테이블 정책 삭제
DROP POLICY IF EXISTS "Anyone can read profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;


-- ===========================
-- 1. RLS 활성화
-- ===========================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;


-- ===========================
-- 2. profiles 테이블 정책
-- ===========================

-- 모든 사용자가 프로필 조회 가능
CREATE POLICY "profiles_select_policy"
ON profiles FOR SELECT
TO public
USING ( true );

-- 본인 프로필 생성
CREATE POLICY "profiles_insert_policy"
ON profiles FOR INSERT
TO authenticated
WITH CHECK ( (select auth.uid()) = id );

-- 본인 프로필 수정
CREATE POLICY "profiles_update_policy"
ON profiles FOR UPDATE
TO authenticated
USING ( (select auth.uid()) = id )
WITH CHECK ( (select auth.uid()) = id );


-- ===========================
-- 3. posts 테이블 정책
-- ===========================

-- 모든 사용자가 게시글 조회 가능
CREATE POLICY "posts_select_policy"
ON posts FOR SELECT
TO public
USING ( true );

-- 로그인 사용자만 게시글 작성 (user_id = 본인)
CREATE POLICY "posts_insert_policy"
ON posts FOR INSERT
TO authenticated
WITH CHECK ( (select auth.uid()) = user_id );

-- 작성자만 게시글 수정
CREATE POLICY "posts_update_policy"
ON posts FOR UPDATE
TO authenticated
USING ( (select auth.uid()) = user_id )
WITH CHECK ( (select auth.uid()) = user_id );

-- 작성자만 게시글 삭제
CREATE POLICY "posts_delete_policy"
ON posts FOR DELETE
TO authenticated
USING ( (select auth.uid()) = user_id );


-- ===========================
-- 4. comments 테이블 정책
-- ===========================

-- 모든 사용자가 댓글 조회 가능
CREATE POLICY "comments_select_policy"
ON comments FOR SELECT
TO public
USING ( true );

-- 로그인 사용자만 댓글 작성
CREATE POLICY "comments_insert_policy"
ON comments FOR INSERT
TO authenticated
WITH CHECK ( (select auth.uid()) = user_id );

-- 작성자만 댓글 삭제
CREATE POLICY "comments_delete_policy"
ON comments FOR DELETE
TO authenticated
USING ( (select auth.uid()) = user_id );


-- ===========================
-- 5. 정책 확인
-- ===========================

-- 현재 정책 목록 조회
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;


-- ===========================
-- 6. 테스트 쿼리
-- ===========================

/*
-- 정책 동작 확인

-- 1. 로그인하지 않은 사용자 (anon)
-- 게시글 조회: 성공 (모든 게시글 보임)
-- 게시글 작성: 실패 (에러)

-- 2. 로그인한 사용자 A
-- 본인 게시글 수정: 성공
-- 타인 게시글 수정: 실패 (영향받는 행 0개)

-- 3. 삭제 테스트
-- 본인 게시글 삭제: 성공
-- 타인 게시글 삭제: 실패 (영향받는 행 0개)
*/

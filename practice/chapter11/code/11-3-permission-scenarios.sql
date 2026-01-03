/*
 * 11-3 권한 시나리오별 RLS 정책
 * 게시판에서 자주 사용하는 권한 패턴
 */

-- ===========================
-- 1. 누구나 읽기 가능 (Public Read)
-- ===========================

-- 로그인 여부와 관계없이 모든 게시글 조회 가능
CREATE POLICY "Anyone can read posts"
ON posts
FOR SELECT
TO public
USING ( true );

-- 공개 프로필 조회
CREATE POLICY "Anyone can read profiles"
ON profiles
FOR SELECT
TO public
USING ( true );


-- ===========================
-- 2. 로그인 사용자만 작성 (Authenticated Insert)
-- ===========================

-- 로그인한 사용자만 게시글 작성 가능
-- user_id가 본인 id와 일치해야 함
CREATE POLICY "Authenticated can insert posts"
ON posts
FOR INSERT
TO authenticated
WITH CHECK ( (select auth.uid()) = user_id );

-- 로그인한 사용자만 댓글 작성 가능
CREATE POLICY "Authenticated can insert comments"
ON comments
FOR INSERT
TO authenticated
WITH CHECK ( (select auth.uid()) = user_id );


-- ===========================
-- 3. 작성자만 수정 (Owner Update)
-- ===========================

-- 본인이 작성한 게시글만 수정 가능
CREATE POLICY "Owner can update posts"
ON posts
FOR UPDATE
TO authenticated
USING ( (select auth.uid()) = user_id )      -- 기존 행: 본인 글만 선택
WITH CHECK ( (select auth.uid()) = user_id ); -- 새 값: user_id 변경 방지


-- ===========================
-- 4. 작성자만 삭제 (Owner Delete)
-- ===========================

-- 본인이 작성한 게시글만 삭제 가능
CREATE POLICY "Owner can delete posts"
ON posts
FOR DELETE
TO authenticated
USING ( (select auth.uid()) = user_id );

-- 본인이 작성한 댓글만 삭제 가능
CREATE POLICY "Owner can delete comments"
ON comments
FOR DELETE
TO authenticated
USING ( (select auth.uid()) = user_id );


-- ===========================
-- 5. 관리자 전체 권한 (Admin All)
-- ===========================

-- 관리자 확인 함수
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN (
        SELECT COALESCE(is_admin, false)
        FROM profiles
        WHERE id = auth.uid()
    );
END;
$$;

-- 관리자는 모든 게시글에 대해 전체 권한
CREATE POLICY "Admin full access on posts"
ON posts
FOR ALL
TO authenticated
USING ( (select is_admin()) )
WITH CHECK ( (select is_admin()) );


-- ===========================
-- 6. 프로필 정책 (본인만 수정)
-- ===========================

-- 본인 프로필만 수정 가능
CREATE POLICY "Users can update own profile"
ON profiles
FOR UPDATE
TO authenticated
USING ( (select auth.uid()) = id )
WITH CHECK ( (select auth.uid()) = id );

-- 본인 프로필 생성 (회원가입 시)
CREATE POLICY "Users can insert own profile"
ON profiles
FOR INSERT
TO authenticated
WITH CHECK ( (select auth.uid()) = id );


-- ===========================
-- 7. 복합 조건 예시
-- ===========================

-- 공개 게시글 또는 본인 비공개 게시글만 조회
-- (is_public 열이 있다고 가정)
/*
CREATE POLICY "Read public or own posts"
ON posts
FOR SELECT
TO public
USING (
    is_public = true
    OR (select auth.uid()) = user_id
);
*/

-- 게시글 작성자 또는 관리자만 수정
/*
CREATE POLICY "Owner or admin can update"
ON posts
FOR UPDATE
TO authenticated
USING (
    (select auth.uid()) = user_id
    OR (select is_admin())
);
*/

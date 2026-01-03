-- ================================
-- 게시판 데이터베이스 스키마 설계
-- ================================

-- 1. 사용자 테이블 (Supabase auth.users와 연동)
-- Supabase는 auth.users를 자동 생성하므로
-- 추가 프로필 정보만 별도 테이블로 관리

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(50) UNIQUE NOT NULL,
    avatar_url TEXT,
    role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('member', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 게시글 테이블
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 댓글 테이블
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 인덱스 생성 (성능 최적화)
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_created ON posts(created_at DESC);
CREATE INDEX idx_comments_post ON comments(post_id);

-- 5. updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- ================================
-- 스키마 설계 설명
-- ================================

/*
엔티티 관계:
- users (1) ──< (N) posts: 사용자는 여러 게시글 작성 가능
- users (1) ──< (N) comments: 사용자는 여러 댓글 작성 가능
- posts (1) ──< (N) comments: 게시글은 여러 댓글 포함

자료형 선택 이유:
- UUID: 분산 시스템에서 충돌 없는 고유 식별자
- VARCHAR(n): 길이 제한이 필요한 텍스트 (제목, 사용자명)
- TEXT: 길이 제한 없는 긴 텍스트 (본문, 댓글)
- TIMESTAMPTZ: 시간대 정보 포함 타임스탬프

제약조건:
- PRIMARY KEY: 고유 식별
- FOREIGN KEY: 참조 무결성
- ON DELETE CASCADE: 부모 삭제 시 자식도 삭제
- NOT NULL: 필수 입력
- CHECK: 허용 값 제한 (role)
- DEFAULT: 기본값 설정
*/

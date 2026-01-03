# 제10장 리서치: Supabase Database

## 1. PostgreSQL 기초

### 1.1 관계형 데이터베이스 개념
- 데이터를 테이블(표) 형태로 저장
- 테이블 간 관계를 통해 데이터 연결
- SQL로 데이터 조작

### 1.2 핵심 용어
| 용어 | 설명 |
|------|------|
| 테이블 | 행과 열로 구성된 데이터 집합 |
| 행 (Row) | 하나의 레코드 (데이터 한 건) |
| 열 (Column) | 속성/필드 |
| Primary Key | 행을 고유하게 식별하는 키 |
| Foreign Key | 다른 테이블을 참조하는 키 |

### 1.3 기본 SQL 문법
```sql
-- 조회
SELECT * FROM posts;
SELECT title, content FROM posts WHERE id = 1;

-- 생성
INSERT INTO posts (title, content) VALUES ('제목', '내용');

-- 수정
UPDATE posts SET title = '새 제목' WHERE id = 1;

-- 삭제
DELETE FROM posts WHERE id = 1;
```

---

## 2. Supabase CRUD API

### 2.1 SELECT (조회)
```javascript
// 전체 조회
const { data, error } = await supabase
    .from('posts')
    .select('*');

// 특정 컬럼만
const { data } = await supabase
    .from('posts')
    .select('id, title, created_at');

// 조건 필터링
const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('id', 1);
```

### 2.2 INSERT (생성)
```javascript
const { data, error } = await supabase
    .from('posts')
    .insert({ title: '제목', content: '내용' })
    .select();  // 생성된 데이터 반환
```

### 2.3 UPDATE (수정)
```javascript
const { data, error } = await supabase
    .from('posts')
    .update({ title: '새 제목' })
    .eq('id', 1)
    .select();
```

### 2.4 DELETE (삭제)
```javascript
const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', 1);
```

---

## 3. 필터링

### 3.1 비교 연산자
| 메서드 | 의미 | SQL 대응 |
|--------|------|----------|
| eq | 같음 | = |
| neq | 같지 않음 | != |
| gt | 초과 | > |
| gte | 이상 | >= |
| lt | 미만 | < |
| lte | 이하 | <= |

### 3.2 문자열 필터
| 메서드 | 의미 |
|--------|------|
| like | 패턴 매칭 (대소문자 구분) |
| ilike | 패턴 매칭 (대소문자 무시) |
| contains | 배열 포함 |

### 3.3 예시
```javascript
// 범위 조건
.gte('price', 1000)
.lte('price', 5000)

// 문자열 검색
.ilike('title', '%검색어%')

// 여러 값 중 하나
.in('status', ['published', 'draft'])
```

---

## 4. 정렬과 페이지네이션

### 4.1 정렬 (order)
```javascript
// 단일 정렬
.order('created_at', { ascending: false })

// 다중 정렬
.order('category', { ascending: true })
.order('created_at', { ascending: false })
```

### 4.2 페이지네이션 (range)
```javascript
// 0부터 9까지 (10개)
.range(0, 9)

// 10부터 19까지 (다음 페이지)
.range(10, 19)
```

### 4.3 성능 고려사항
- 큰 offset은 성능 저하 가능
- 커서 기반 페이지네이션 권장 (대용량)
```javascript
// 커서 기반
.gt('id', lastSeenId)
.limit(10)
```

---

## 5. 관계 데이터 조회

### 5.1 기본 문법
```javascript
// posts와 연결된 users 함께 조회
const { data } = await supabase
    .from('posts')
    .select(`
        id,
        title,
        users ( id, name, email )
    `);
```

### 5.2 여러 관계
```javascript
// posts + users + comments
const { data } = await supabase
    .from('posts')
    .select(`
        *,
        users ( name ),
        comments ( id, content, users ( name ) )
    `);
```

### 5.3 주의사항
- Foreign Key 설정 필수
- RLS 정책이 양쪽 테이블에 필요
- 기본 1000개 제한

---

## 6. 게시판 스키마

### 6.1 테이블 구조
```sql
-- 프로필 테이블 (auth.users 확장)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users PRIMARY KEY,
    username TEXT UNIQUE,
    avatar_url TEXT
);

-- 게시글 테이블
CREATE TABLE posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    user_id UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 댓글 테이블
CREATE TABLE comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT now()
);
```

### 6.2 관계
- profiles ← posts: 1:N (한 사용자가 여러 게시글)
- posts ← comments: 1:N (한 게시글에 여러 댓글)
- profiles ← comments: 1:N (한 사용자가 여러 댓글)

---

## 참고 자료

1. Supabase Docs - CRUD: https://supabase.com/docs/reference/javascript/select
2. Supabase Docs - Joins: https://supabase.com/docs/guides/database/joins-and-nesting
3. Supabase Docs - Filters: https://supabase.com/docs/reference/javascript/using-filters

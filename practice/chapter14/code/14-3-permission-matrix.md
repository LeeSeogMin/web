# 권한 매트릭스

## 1. 역할 정의

| 역할 | 설명 | 식별 방법 |
|------|------|-----------|
| **Anonymous** | 비로그인 사용자 | `auth.uid() IS NULL` |
| **Member** | 일반 회원 | `auth.uid() IS NOT NULL` |
| **Admin** | 관리자 | `profiles.role = 'admin'` |

---

## 2. 게시글(posts) 권한 매트릭스

| 작업 | Anonymous | Member | Admin | 조건 |
|------|-----------|--------|-------|------|
| **Create** | ✗ | ✓ | ✓ | 로그인 필수 |
| **Read** | ✓ | ✓ | ✓ | 전체 공개 |
| **Update** | ✗ | 본인만 | ✓ | author_id = auth.uid() |
| **Delete** | ✗ | 본인만 | ✓ | author_id = auth.uid() |

### RLS 정책 변환

```sql
-- 읽기: 누구나
CREATE POLICY "posts_select_all" ON posts
    FOR SELECT USING (true);

-- 생성: 로그인 사용자
CREATE POLICY "posts_insert_auth" ON posts
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 수정: 작성자 또는 관리자
CREATE POLICY "posts_update_owner" ON posts
    FOR UPDATE USING (
        auth.uid() = author_id
        OR EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 삭제: 작성자 또는 관리자
CREATE POLICY "posts_delete_owner" ON posts
    FOR DELETE USING (
        auth.uid() = author_id
        OR EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
```

---

## 3. 댓글(comments) 권한 매트릭스

| 작업 | Anonymous | Member | Admin | 조건 |
|------|-----------|--------|-------|------|
| **Create** | ✗ | ✓ | ✓ | 로그인 필수 |
| **Read** | ✓ | ✓ | ✓ | 전체 공개 |
| **Update** | ✗ | 본인만 | ✓ | author_id = auth.uid() |
| **Delete** | ✗ | 본인만 | ✓ | author_id = auth.uid() |

---

## 4. 프로필(profiles) 권한 매트릭스

| 작업 | Anonymous | Member | Admin | 조건 |
|------|-----------|--------|-------|------|
| **Create** | ✗ | 본인만 | ✓ | 회원가입 시 자동 |
| **Read** | 공개 정보만 | ✓ | ✓ | username, avatar_url만 공개 |
| **Update** | ✗ | 본인만 | ✓ | id = auth.uid() |
| **Delete** | ✗ | ✗ | ✓ | 관리자만 가능 |

---

## 5. 권한 검증 체크리스트

### 설계 단계
- [ ] 모든 엔티티에 대한 역할이 정의되었는가?
- [ ] CRUD 각 작업에 대한 권한이 명시되었는가?
- [ ] 권한 조건이 SQL로 표현 가능한가?
- [ ] 권한 상승 경로가 없는가? (Member → Admin)

### 구현 단계
- [ ] 모든 테이블에 RLS가 활성화되었는가?
- [ ] 모든 CRUD 작업에 정책이 존재하는가?
- [ ] USING과 WITH CHECK가 올바르게 구분되었는가?

### 테스트 단계
- [ ] Anonymous로 보호된 작업 시도 → 실패 확인
- [ ] Member로 다른 사용자 데이터 수정 시도 → 실패 확인
- [ ] Admin으로 전체 데이터 접근 → 성공 확인
- [ ] 권한 없는 DELETE 시도 → 실패 확인

---

## 6. 권한 충돌 방지

### 정책 우선순위
1. DENY 정책이 ALLOW보다 우선
2. 여러 ALLOW 정책은 OR로 결합
3. 정책이 없으면 기본 거부

### 흔한 실수
- 정책 없이 RLS 활성화 → 모든 접근 차단
- 과도하게 넓은 USING 조건 → 의도치 않은 노출
- WITH CHECK 누락 → INSERT/UPDATE 시 검증 우회

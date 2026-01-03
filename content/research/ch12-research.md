# 제12장 리서치: 에러 처리와 UX

## 1. 에러 유형 분류

### 1.1 네트워크 에러
- 인터넷 연결 끊김
- 서버 응답 없음 (타임아웃)
- DNS 해결 실패
- HTTP 상태 코드: 5xx (서버 에러)

### 1.2 인증 에러
- 토큰 만료
- 유효하지 않은 토큰
- 세션 종료
- HTTP 상태 코드: 401 Unauthorized

### 1.3 권한 에러 (RLS)
- Row Level Security 위반
- 본인 데이터가 아님
- 역할 권한 부족
- HTTP 상태 코드: 403 Forbidden

### 1.4 유효성 검증 에러
- 필수 필드 누락
- 형식 불일치 (이메일, 전화번호 등)
- 값 범위 초과
- 중복 데이터 (unique 제약조건)

---

## 2. 에러 처리 패턴

### 2.1 try-catch 구조화

```javascript
async function fetchData() {
    try {
        const { data, error } = await supabase.from('posts').select('*');
        if (error) throw error;
        return data;
    } catch (err) {
        // 에러 유형별 처리
        if (err.message.includes('network')) {
            // 네트워크 에러 처리
        } else if (err.code === 'PGRST301') {
            // RLS 에러 처리
        }
        throw err;
    }
}
```

### 2.2 React Error Boundary

**개념**: 하위 컴포넌트에서 발생한 JavaScript 에러를 잡아 대체 UI를 보여주는 컴포넌트

**제한사항**:
- 클래스 컴포넌트로만 구현 가능 (getDerivedStateFromError, componentDidCatch 사용)
- 비동기 에러는 잡지 못함
- 이벤트 핸들러 에러는 잡지 못함

**react-error-boundary 라이브러리**:
- 함수형 컴포넌트에서도 사용 가능
- reset 기능 지원
- fallback 컴포넌트 제공

```jsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div>
            <p>문제가 발생했습니다.</p>
            <button onClick={resetErrorBoundary}>다시 시도</button>
        </div>
    );
}

<ErrorBoundary FallbackComponent={ErrorFallback}>
    <MyComponent />
</ErrorBoundary>
```

### 2.3 사용자 친화적 에러 메시지

**나쁜 예**: "PGRST301: new row violates row-level security policy"
**좋은 예**: "이 게시글을 수정할 권한이 없습니다."

**에러 메시지 매핑**:
```javascript
const errorMessages = {
    'PGRST301': '권한이 없습니다.',
    'AuthSessionMissingError': '로그인이 필요합니다.',
    'NetworkError': '인터넷 연결을 확인해주세요.',
    'default': '문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
};
```

---

## 3. 로딩 상태 관리

### 3.1 로딩 인디케이터

**Spinner**: 원형 회전 애니메이션
- 장점: 구현 간단, 공간 작게 차지
- 단점: 진행 정도 알 수 없음

**Progress Bar**: 진행률 표시
- 장점: 진행 상태 명확
- 단점: 정확한 진행률 계산 필요

### 3.2 스켈레톤 UI

**개념**: 콘텐츠 로딩 중 레이아웃 형태를 미리 보여주는 플레이스홀더

**장점**:
- 로딩 시간이 짧게 느껴짐 (심리적 효과)
- 레이아웃 시프트 방지
- 진행 중임을 명확히 전달

**구현 방법**:
```jsx
function PostCard({ post, loading }) {
    if (loading) {
        return (
            <div className="skeleton">
                <div className="skeleton-title" />
                <div className="skeleton-text" />
            </div>
        );
    }
    return <div>{post.title}</div>;
}
```

**라이브러리**:
- react-loading-skeleton: 자동 크기 조절
- Material UI Skeleton: MUI 테마 연동

### 3.3 Optimistic UI

**개념**: 서버 응답 전에 성공을 가정하고 UI를 먼저 업데이트

**장점**:
- 즉각적인 반응 (0ms 대기)
- 체감 속도 향상

**주의사항**:
- 실패 시 롤백 필수
- 복잡한 상태 관리 필요

**React 19 useOptimistic Hook**:
```jsx
const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (state, newPost) => [...state, { ...newPost, sending: true }]
);
```

**롤백 패턴**:
```javascript
// 1. 현재 상태 저장
const previousPosts = [...posts];

// 2. 낙관적 업데이트
setPosts([...posts, newPost]);

// 3. API 호출
try {
    await supabase.from('posts').insert(newPost);
} catch (error) {
    // 4. 실패 시 롤백
    setPosts(previousPosts);
    alert('저장에 실패했습니다.');
}
```

---

## 4. UX 가이드라인

### 4.1 에러 표시 방식

| 방식 | 사용 시점 |
|------|----------|
| 인라인 메시지 | 폼 필드 검증 에러 |
| 토스트/스낵바 | 일시적 알림 (성공/실패) |
| 모달/다이얼로그 | 중요한 에러, 사용자 액션 필요 |
| 전체 페이지 | 치명적 에러 (500, 네트워크 끊김) |

### 4.2 로딩 상태 전이

```
[초기 상태]
     │
     ▼
[로딩 중] ── 스피너/스켈레톤 표시
     │
     ├──▶ [성공] ── 데이터 표시
     │
     └──▶ [에러] ── 에러 메시지 + 재시도 버튼
```

### 4.3 버튼 상태

```jsx
<button disabled={loading}>
    {loading ? '저장 중...' : '저장'}
</button>
```

---

## 참고문헌

1. React 공식 문서. *Error Boundaries*. https://legacy.reactjs.org/docs/error-boundaries.html
2. React 공식 문서. *useOptimistic*. https://react.dev/reference/react/useOptimistic
3. react-error-boundary. *GitHub*. https://github.com/bvaughn/react-error-boundary
4. react-loading-skeleton. *npm*. https://www.npmjs.com/package/react-loading-skeleton
5. Material UI. *Skeleton*. https://mui.com/material-ui/react-skeleton/
6. TanStack Query. *Optimistic Updates*. https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates

/*
 * 12-3 로딩 상태 컴포넌트
 * 스피너, 스켈레톤, Optimistic UI 구현
 */

import { useState } from 'react';

// ===========================
// 1. 로딩 스피너
// ===========================

export function Spinner({ size = 'medium', color = '#3ECF8E' }) {
    const sizes = {
        small: 16,
        medium: 32,
        large: 48
    };

    const dimension = sizes[size] || sizes.medium;

    return (
        <div
            className="spinner"
            style={{
                width: dimension,
                height: dimension,
                border: `3px solid #f3f3f3`,
                borderTop: `3px solid ${color}`,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }}
        />
    );
}


// ===========================
// 2. 전체 페이지 로딩
// ===========================

export function PageLoader({ message = '로딩 중...' }) {
    return (
        <div className="page-loader">
            <Spinner size="large" />
            <p>{message}</p>
        </div>
    );
}


// ===========================
// 3. 버튼 로딩 상태
// ===========================

export function LoadingButton({
    loading,
    children,
    loadingText = '처리 중...',
    ...props
}) {
    return (
        <button disabled={loading} {...props}>
            {loading ? (
                <span className="button-loading">
                    <Spinner size="small" color="currentColor" />
                    <span>{loadingText}</span>
                </span>
            ) : (
                children
            )}
        </button>
    );
}


// ===========================
// 4. 스켈레톤 컴포넌트
// ===========================

export function Skeleton({
    width = '100%',
    height = '20px',
    borderRadius = '4px',
    className = ''
}) {
    return (
        <div
            className={`skeleton ${className}`}
            style={{
                width,
                height,
                borderRadius,
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite'
            }}
        />
    );
}


// ===========================
// 5. 게시글 카드 스켈레톤
// ===========================

export function PostCardSkeleton() {
    return (
        <div className="post-card-skeleton">
            <Skeleton height="24px" width="70%" />
            <Skeleton height="16px" width="40%" style={{ marginTop: 8 }} />
            <Skeleton height="60px" style={{ marginTop: 12 }} />
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <Skeleton height="16px" width="80px" />
                <Skeleton height="16px" width="60px" />
            </div>
        </div>
    );
}


// ===========================
// 6. 게시글 목록 스켈레톤
// ===========================

export function PostListSkeleton({ count = 5 }) {
    return (
        <div className="post-list-skeleton">
            {Array.from({ length: count }).map((_, index) => (
                <PostCardSkeleton key={index} />
            ))}
        </div>
    );
}


// ===========================
// 7. 인라인 로딩 (텍스트 옆)
// ===========================

export function InlineLoader({ text = '로딩 중' }) {
    return (
        <span className="inline-loader">
            <Spinner size="small" />
            <span>{text}</span>
        </span>
    );
}


// ===========================
// 8. 조건부 로딩 래퍼
// ===========================

export function LoadingWrapper({
    loading,
    error,
    skeleton,
    children,
    errorFallback
}) {
    if (loading) {
        return skeleton || <PageLoader />;
    }

    if (error) {
        return errorFallback || (
            <div className="error-state">
                <p>에러가 발생했습니다.</p>
                <p>{error.message}</p>
            </div>
        );
    }

    return children;
}


// ===========================
// 9. useLoading 커스텀 훅
// ===========================

export function useLoading(initialState = false) {
    const [loading, setLoading] = useState(initialState);
    const [error, setError] = useState(null);

    const execute = async (asyncFn) => {
        try {
            setLoading(true);
            setError(null);
            const result = await asyncFn();
            return result;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, execute, setLoading, setError };
}


// ===========================
// 10. CSS 애니메이션 (참고용)
// ===========================

/*
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

.page-loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    gap: 16px;
}

.button-loading {
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.inline-loader {
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.post-card-skeleton {
    padding: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    margin-bottom: 12px;
}
*/

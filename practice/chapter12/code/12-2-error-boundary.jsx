/*
 * 12-2 React Error Boundary 컴포넌트
 * 하위 컴포넌트 에러 격리 및 대체 UI 표시
 */

import { Component } from 'react';

// ===========================
// 1. 기본 Error Boundary (클래스 컴포넌트)
// ===========================

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    // 에러 발생 시 상태 업데이트
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    // 에러 로깅
    componentDidCatch(error, errorInfo) {
        console.error('Error Boundary caught an error:', error);
        console.error('Component stack:', errorInfo.componentStack);

        // 에러 리포팅 서비스로 전송 (예: Sentry)
        // reportError(error, errorInfo);
    }

    // 에러 상태 리셋
    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            // 커스텀 fallback이 있으면 사용
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // FallbackComponent가 있으면 사용
            if (this.props.FallbackComponent) {
                const FallbackComponent = this.props.FallbackComponent;
                return (
                    <FallbackComponent
                        error={this.state.error}
                        resetErrorBoundary={this.handleReset}
                    />
                );
            }

            // 기본 에러 UI
            return (
                <div className="error-boundary">
                    <h2>문제가 발생했습니다</h2>
                    <p>페이지를 새로고침하거나 잠시 후 다시 시도해주세요.</p>
                    <button onClick={this.handleReset}>
                        다시 시도
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}


// ===========================
// 2. Fallback 컴포넌트 예시
// ===========================

export function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div className="error-fallback">
            <div className="error-icon">⚠️</div>
            <h2>앗, 문제가 발생했어요!</h2>
            <p className="error-message">
                {error?.message || '알 수 없는 오류가 발생했습니다.'}
            </p>
            <div className="error-actions">
                <button
                    onClick={resetErrorBoundary}
                    className="btn-primary"
                >
                    다시 시도
                </button>
                <button
                    onClick={() => window.location.href = '/'}
                    className="btn-secondary"
                >
                    홈으로 이동
                </button>
            </div>
        </div>
    );
}


// ===========================
// 3. 페이지 레벨 에러 UI
// ===========================

export function PageErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div className="page-error">
            <h1>페이지를 불러올 수 없습니다</h1>
            <p>일시적인 문제가 발생했습니다.</p>
            <details>
                <summary>오류 상세 정보</summary>
                <pre>{error?.message}</pre>
            </details>
            <button onClick={resetErrorBoundary}>
                페이지 새로고침
            </button>
        </div>
    );
}


// ===========================
// 4. 사용 예시
// ===========================

/*
// App.jsx에서 전체 앱 감싸기
function App() {
    return (
        <ErrorBoundary FallbackComponent={PageErrorFallback}>
            <Router>
                <Routes>...</Routes>
            </Router>
        </ErrorBoundary>
    );
}

// 개별 컴포넌트 감싸기
function PostPage() {
    return (
        <div>
            <Header />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <PostContent />
            </ErrorBoundary>
            <Footer />
        </div>
    );
}

// 간단한 fallback 사용
<ErrorBoundary fallback={<p>에러가 발생했습니다.</p>}>
    <SomeComponent />
</ErrorBoundary>
*/


// ===========================
// 5. CSS 스타일 (참고용)
// ===========================

/*
.error-fallback {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    text-align: center;
}

.error-icon {
    font-size: 48px;
    margin-bottom: 16px;
}

.error-message {
    color: #666;
    margin-bottom: 24px;
}

.error-actions {
    display: flex;
    gap: 12px;
}

.btn-primary {
    background: #3ECF8E;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.btn-secondary {
    background: #f3f4f6;
    color: #374151;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}
*/

/*
 * 9-5 보호된 라우트 (ProtectedRoute)
 * 인증된 사용자만 접근 가능한 라우트 구현
 */

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './9-4-auth-context';

// ===========================
// 1. ProtectedRoute 컴포넌트
// ===========================

export function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    // 로딩 중일 때 로딩 표시
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <p>인증 확인 중...</p>
            </div>
        );
    }

    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    // 원래 가려던 경로를 state로 전달
    if (!user) {
        return (
            <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
            />
        );
    }

    // 로그인한 경우 자식 컴포넌트 렌더링
    return children;
}

// ===========================
// 2. 역할 기반 보호된 라우트 (선택)
// ===========================

export function RoleProtectedRoute({ children, allowedRoles }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    // 사용자 역할 확인 (user_metadata에서 role 읽기)
    const userRole = user.user_metadata?.role || 'user';

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

// ===========================
// 3. 게스트 전용 라우트
// ===========================

export function GuestRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>로딩 중...</div>;
    }

    // 이미 로그인한 경우 홈으로 리다이렉트
    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
}

// ===========================
// 4. 사용 예시
// ===========================

/*
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './9-4-auth-context';
import { ProtectedRoute, GuestRoute } from './9-5-protected-route';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* 공개 라우트 *\/}
                    <Route path="/" element={<Home />} />

                    {/* 게스트 전용 (로그인 시 리다이렉트) *\/}
                    <Route
                        path="/login"
                        element={
                            <GuestRoute>
                                <Login />
                            </GuestRoute>
                        }
                    />

                    {/* 보호된 라우트 *\/}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                    {/* 관리자 전용 *\/}
                    <Route
                        path="/admin"
                        element={
                            <RoleProtectedRoute allowedRoles={['admin']}>
                                <AdminPanel />
                            </RoleProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
*/

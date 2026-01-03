/*
 * 9-4 AuthContext 구현
 * React Context로 인증 상태 전역 관리
 */

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { supabase } from './supabase';

// ===========================
// 1. Context 생성
// ===========================

const AuthContext = createContext(null);

// ===========================
// 2. AuthProvider 컴포넌트
// ===========================

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 초기 세션 확인
        async function initAuth() {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setUser(session?.user ?? null);
            } catch (error) {
                console.error('초기 인증 확인 실패:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        initAuth();

        // 인증 상태 변화 감지
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                console.log('Auth state changed:', event);
                setUser(session?.user ?? null);

                // 로그인 완료 시 추가 처리
                if (event === 'SIGNED_IN') {
                    console.log('로그인 완료:', session?.user?.email);
                }

                // 로그아웃 완료 시 추가 처리
                if (event === 'SIGNED_OUT') {
                    console.log('로그아웃 완료');
                }
            }
        );

        // 클린업
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    // ===========================
    // 로그인 함수
    // ===========================
    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/`
            }
        });

        if (error) {
            console.error('로그인 에러:', error);
            throw error;
        }
    };

    // ===========================
    // 로그아웃 함수
    // ===========================
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('로그아웃 에러:', error);
            throw error;
        }
    };

    // ===========================
    // Context 값 메모이제이션
    // ===========================
    const value = useMemo(() => ({
        user,
        loading,
        isAuthenticated: !!user,
        signInWithGoogle,
        signOut,
        // 사용자 정보 헬퍼
        userInfo: user ? {
            id: user.id,
            email: user.email,
            name: user.user_metadata?.full_name,
            avatar: user.user_metadata?.avatar_url
        } : null
    }), [user, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// ===========================
// 3. useAuth 커스텀 Hook
// ===========================

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth는 AuthProvider 내에서 사용해야 합니다');
    }

    return context;
}

// ===========================
// 4. 사용 예시
// ===========================

/*
// App.jsx
function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

// Header.jsx
function Header() {
    const { user, signOut, isAuthenticated } = useAuth();

    return (
        <header>
            {isAuthenticated ? (
                <>
                    <span>{user.email}</span>
                    <button onClick={signOut}>로그아웃</button>
                </>
            ) : (
                <Link to="/login">로그인</Link>
            )}
        </header>
    );
}
*/

export default AuthContext;

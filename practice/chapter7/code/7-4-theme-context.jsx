/*
 * 7-4 Context API 예제
 * 테마 전환, 인증 상태 관리
 */

import { createContext, useContext, useState, useMemo } from 'react';

// ===========================
// 1. 테마 Context 생성
// ===========================

// Context 생성
const ThemeContext = createContext(null);

// Provider 컴포넌트
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    // useMemo로 불필요한 리렌더링 방지
    const value = useMemo(() => ({
        theme,
        toggleTheme
    }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

// 커스텀 Hook (선택적이지만 권장)
function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

// ===========================
// 2. 테마 사용 컴포넌트들
// ===========================

function Header() {
    const { theme } = useTheme();

    const styles = {
        padding: '1rem 2rem',
        backgroundColor: theme === 'light' ? '#1976d2' : '#0d47a1',
        color: 'white'
    };

    return (
        <header style={styles}>
            <h1>테마 예제</h1>
        </header>
    );
}

function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme}>
            {theme === 'light' ? '🌙 다크 모드' : '☀️ 라이트 모드'}
        </button>
    );
}

function Content() {
    const { theme } = useTheme();

    const styles = {
        padding: '2rem',
        backgroundColor: theme === 'light' ? '#fff' : '#1e1e1e',
        color: theme === 'light' ? '#333' : '#eee',
        minHeight: '200px'
    };

    return (
        <main style={styles}>
            <h2>콘텐츠 영역</h2>
            <p>현재 테마: {theme}</p>
            <ThemeToggleButton />
        </main>
    );
}

// ===========================
// 3. 인증 Context
// ===========================

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        // 실제로는 API 호출
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUser({ email, name: email.split('@')[0] });
        setLoading(false);
    };

    const logout = () => {
        setUser(null);
    };

    const value = useMemo(() => ({
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout
    }), [user, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// ===========================
// 4. 인증 사용 컴포넌트들
// ===========================

function LoginForm() {
    const { login, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일"
                    required
                />
            </div>
            <div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? '로그인 중...' : '로그인'}
            </button>
        </form>
    );
}

function UserInfo() {
    const { user, logout } = useAuth();

    return (
        <div>
            <p>안녕하세요, {user.name}님!</p>
            <button onClick={logout}>로그아웃</button>
        </div>
    );
}

function AuthStatus() {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <UserInfo /> : <LoginForm />;
}

// ===========================
// 5. 다중 Provider 조합
// ===========================

function Providers({ children }) {
    return (
        <ThemeProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ThemeProvider>
    );
}

// ===========================
// 앱 컴포넌트
// ===========================

function AppContent() {
    const { theme } = useTheme();

    const appStyles = {
        minHeight: '100vh',
        backgroundColor: theme === 'light' ? '#f5f5f5' : '#121212',
        transition: 'background-color 0.3s'
    };

    return (
        <div style={appStyles}>
            <Header />
            <Content />
            <div style={{ padding: '2rem' }}>
                <h2>인증 상태</h2>
                <AuthStatus />
            </div>
        </div>
    );
}

function App() {
    return (
        <Providers>
            <AppContent />
        </Providers>
    );
}

export default App;
export { ThemeProvider, useTheme, AuthProvider, useAuth };

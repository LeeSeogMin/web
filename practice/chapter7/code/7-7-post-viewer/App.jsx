/*
 * 7-7 게시글 뷰어 앱
 * useEffect, useContext, 커스텀 Hook 종합 예제
 */

import { useState, useEffect, createContext, useContext, useMemo } from 'react';
import './App.css';

// ===========================
// 커스텀 Hook: useFetch
// ===========================

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) {
            setLoading(false);
            return;
        }

        let isCancelled = false;

        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const result = await response.json();

                if (!isCancelled) {
                    setData(result);
                }
            } catch (err) {
                if (!isCancelled) {
                    setError(err.message);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            isCancelled = true;
        };
    }, [url]);

    return { data, loading, error };
}

// ===========================
// 테마 Context
// ===========================

const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}

// ===========================
// 컴포넌트: Header
// ===========================

function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={`header ${theme}`}>
            <h1>게시글 뷰어</h1>
            <button onClick={toggleTheme} className="theme-btn">
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
        </header>
    );
}

// ===========================
// 컴포넌트: PostList
// ===========================

function PostList({ onSelectPost, selectedId }) {
    const { data: posts, loading, error } = useFetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=10'
    );
    const { theme } = useTheme();

    if (loading) return <div className="loading">게시글 로딩 중...</div>;
    if (error) return <div className="error">에러: {error}</div>;

    return (
        <aside className={`post-list ${theme}`}>
            <h2>게시글 목록</h2>
            <ul>
                {posts?.map(post => (
                    <li
                        key={post.id}
                        className={selectedId === post.id ? 'selected' : ''}
                        onClick={() => onSelectPost(post.id)}
                    >
                        {post.title}
                    </li>
                ))}
            </ul>
        </aside>
    );
}

// ===========================
// 컴포넌트: PostDetail
// ===========================

function PostDetail({ postId }) {
    const { data: post, loading, error } = useFetch(
        postId ? `https://jsonplaceholder.typicode.com/posts/${postId}` : null
    );
    const { theme } = useTheme();

    if (!postId) {
        return (
            <main className={`post-detail ${theme} empty`}>
                <p>게시글을 선택하세요</p>
            </main>
        );
    }

    if (loading) {
        return (
            <main className={`post-detail ${theme}`}>
                <div className="loading">상세 정보 로딩 중...</div>
            </main>
        );
    }

    if (error) {
        return (
            <main className={`post-detail ${theme}`}>
                <div className="error">에러: {error}</div>
            </main>
        );
    }

    return (
        <main className={`post-detail ${theme}`}>
            <article>
                <h2>{post?.title}</h2>
                <p>{post?.body}</p>
                <div className="meta">
                    <span>게시글 ID: {post?.id}</span>
                    <span>작성자 ID: {post?.userId}</span>
                </div>
            </article>
            <CommentList postId={postId} />
        </main>
    );
}

// ===========================
// 컴포넌트: CommentList
// ===========================

function CommentList({ postId }) {
    const { data: comments, loading, error } = useFetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    const { theme } = useTheme();

    if (loading) return <p>댓글 로딩 중...</p>;
    if (error) return <p>댓글 로드 실패</p>;

    return (
        <section className={`comments ${theme}`}>
            <h3>댓글 ({comments?.length || 0})</h3>
            <ul>
                {comments?.map(comment => (
                    <li key={comment.id} className="comment">
                        <strong>{comment.name}</strong>
                        <span className="email">{comment.email}</span>
                        <p>{comment.body}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}

// ===========================
// 앱 컴포넌트
// ===========================

function AppContent() {
    const [selectedPostId, setSelectedPostId] = useState(null);
    const { theme } = useTheme();

    return (
        <div className={`app ${theme}`}>
            <Header />
            <div className="content">
                <PostList
                    onSelectPost={setSelectedPostId}
                    selectedId={selectedPostId}
                />
                <PostDetail postId={selectedPostId} />
            </div>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

export default App;

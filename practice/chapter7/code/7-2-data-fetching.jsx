/*
 * 7-2 데이터 페칭 예제
 * useEffect + fetch, 로딩/에러 상태, 경쟁 상태 방지
 */

import { useState, useEffect } from 'react';

// ===========================
// 1. 기본 데이터 페칭
// ===========================

function BasicFetch() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    'https://jsonplaceholder.typicode.com/posts?_limit=5'
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>에러: {error}</p>;

    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}

// ===========================
// 2. 의존성에 따른 데이터 페칭
// ===========================

function UserPosts({ userId }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isCancelled = false;  // 경쟁 상태 방지 플래그

        async function fetchUserPosts() {
            setLoading(true);

            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=3`
                );
                const data = await response.json();

                // 요청이 취소되지 않았을 때만 상태 업데이트
                if (!isCancelled) {
                    setPosts(data);
                }
            } catch (err) {
                if (!isCancelled) {
                    console.error('Fetch error:', err);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        }

        fetchUserPosts();

        // 클린업: 이전 요청 취소
        return () => {
            isCancelled = true;
        };
    }, [userId]);  // userId 변경 시 재실행

    if (loading) return <p>사용자 {userId}의 게시글 로딩 중...</p>;

    return (
        <div>
            <h4>사용자 {userId}의 게시글</h4>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}

// ===========================
// 3. AbortController로 요청 취소
// ===========================

function AbortableFetch({ query }) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const controller = new AbortController();

        async function search() {
            setLoading(true);

            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts?q=${query}`,
                    { signal: controller.signal }
                );
                const data = await response.json();
                setResults(data.slice(0, 5));
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Search error:', err);
                }
            } finally {
                setLoading(false);
            }
        }

        search();

        // 클린업: 요청 중단
        return () => {
            controller.abort();
        };
    }, [query]);

    return (
        <div>
            {loading && <p>검색 중...</p>}
            <ul>
                {results.map(item => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
}

// ===========================
// 4. 게시글 상세 보기
// ===========================

function PostDetail({ postId }) {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!postId) return;

        let isCancelled = false;

        async function fetchPost() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts/${postId}`
                );

                if (!response.ok) {
                    throw new Error('게시글을 찾을 수 없습니다');
                }

                const data = await response.json();

                if (!isCancelled) {
                    setPost(data);
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

        fetchPost();

        return () => {
            isCancelled = true;
        };
    }, [postId]);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>에러: {error}</p>;
    if (!post) return <p>게시글을 선택하세요</p>;

    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </article>
    );
}

// ===========================
// 앱 컴포넌트
// ===========================

function App() {
    const [userId, setUserId] = useState(1);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="app">
            <h1>데이터 페칭</h1>

            <section>
                <h2>사용자별 게시글</h2>
                <div>
                    {[1, 2, 3, 4, 5].map(id => (
                        <button
                            key={id}
                            onClick={() => setUserId(id)}
                            style={{
                                fontWeight: userId === id ? 'bold' : 'normal'
                            }}
                        >
                            사용자 {id}
                        </button>
                    ))}
                </div>
                <UserPosts userId={userId} />
            </section>

            <section>
                <h2>게시글 상세</h2>
                <div>
                    {[1, 2, 3].map(id => (
                        <button
                            key={id}
                            onClick={() => setSelectedPostId(id)}
                        >
                            게시글 {id}
                        </button>
                    ))}
                </div>
                <PostDetail postId={selectedPostId} />
            </section>

            <section>
                <h2>검색 (AbortController)</h2>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="검색어 입력..."
                />
                <AbortableFetch query={searchQuery} />
            </section>
        </div>
    );
}

export default App;

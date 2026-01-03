/*
 * 10-5 React 게시글 CRUD 컴포넌트
 * 목록, 상세, 작성, 수정, 삭제 구현
 */

import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { useAuth } from './AuthContext';

// ===========================
// 1. 게시글 목록 컴포넌트
// ===========================

export function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('posts')
                .select(`
                    *,
                    profiles ( username )
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPosts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>에러: {error}</p>;

    return (
        <div className="post-list">
            <h2>게시글 목록</h2>
            {posts.length === 0 ? (
                <p>게시글이 없습니다.</p>
            ) : (
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <p>작성자: {post.profiles?.username}</p>
                            <p>{new Date(post.created_at).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// ===========================
// 2. 게시글 상세 컴포넌트
// ===========================

export function PostDetail({ postId }) {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchPost();
    }, [postId]);

    async function fetchPost() {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select(`
                    *,
                    profiles ( username, avatar_url ),
                    comments (
                        id,
                        content,
                        created_at,
                        profiles ( username )
                    )
                `)
                .eq('id', postId)
                .single();

            if (error) throw error;
            setPost(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <p>로딩 중...</p>;
    if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

    const isAuthor = user?.id === post.user_id;

    return (
        <article className="post-detail">
            <h1>{post.title}</h1>
            <div className="meta">
                <span>작성자: {post.profiles?.username}</span>
                <span>{new Date(post.created_at).toLocaleString()}</span>
            </div>
            <div className="content">{post.content}</div>

            {isAuthor && (
                <div className="actions">
                    <button>수정</button>
                    <button>삭제</button>
                </div>
            )}

            <section className="comments">
                <h3>댓글 ({post.comments?.length || 0})</h3>
                {post.comments?.map(comment => (
                    <div key={comment.id} className="comment">
                        <strong>{comment.profiles?.username}</strong>
                        <p>{comment.content}</p>
                    </div>
                ))}
            </section>
        </article>
    );
}

// ===========================
// 3. 게시글 작성 폼
// ===========================

export function PostForm({ onSuccess }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!user) {
            alert('로그인이 필요합니다.');
            return;
        }

        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('posts')
                .insert({
                    title,
                    content,
                    user_id: user.id
                })
                .select()
                .single();

            if (error) throw error;

            setTitle('');
            setContent('');
            onSuccess?.(data);
        } catch (err) {
            alert('게시글 작성 실패: ' + err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="post-form">
            <h2>새 게시글 작성</h2>
            <div>
                <label>제목</label>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>내용</label>
                <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    rows={10}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? '저장 중...' : '작성하기'}
            </button>
        </form>
    );
}

// ===========================
// 4. 게시글 수정 폼
// ===========================

export function PostEditForm({ post, onSuccess, onCancel }) {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('posts')
                .update({
                    title,
                    content,
                    updated_at: new Date().toISOString()
                })
                .eq('id', post.id)
                .select()
                .single();

            if (error) throw error;
            onSuccess?.(data);
        } catch (err) {
            alert('수정 실패: ' + err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>게시글 수정</h2>
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>저장</button>
            <button type="button" onClick={onCancel}>취소</button>
        </form>
    );
}

// ===========================
// 5. 게시글 삭제
// ===========================

export async function deletePost(postId) {
    const confirmed = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmed) return false;

    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

    if (error) {
        alert('삭제 실패: ' + error.message);
        return false;
    }

    return true;
}

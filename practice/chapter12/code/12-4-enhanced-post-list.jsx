/*
 * 12-4 개선된 게시글 목록 컴포넌트
 * 에러 처리, 로딩 상태, 스켈레톤 UI 적용
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { handleSupabaseError } from './12-2-error-handler';
import { ErrorBoundary, ErrorFallback } from './12-2-error-boundary';
import {
    PostListSkeleton,
    LoadingButton,
    useLoading
} from './12-3-loading-components';

// ===========================
// 1. 토스트 알림 (간단 구현)
// ===========================

function Toast({ message, type = 'info', onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const colors = {
        success: '#22c55e',
        error: '#ef4444',
        info: '#3b82f6'
    };

    return (
        <div
            className="toast"
            style={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                padding: '12px 24px',
                backgroundColor: colors[type],
                color: 'white',
                borderRadius: 8,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
        >
            {message}
        </div>
    );
}


// ===========================
// 2. 개선된 게시글 목록
// ===========================

export function EnhancedPostList() {
    const [posts, setPosts] = useState([]);
    const [toast, setToast] = useState(null);
    const { loading, error, execute, setError } = useLoading(true);

    // 게시글 조회
    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        try {
            await execute(async () => {
                const { data, error } = await supabase
                    .from('posts')
                    .select(`
                        *,
                        profiles ( username )
                    `)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setPosts(data);
            });
        } catch (err) {
            const friendlyError = handleSupabaseError(err);
            setToast({ message: friendlyError.message, type: 'error' });
        }
    }

    // 게시글 삭제 (Optimistic UI)
    async function handleDelete(postId) {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        // 1. 현재 상태 저장 (롤백용)
        const previousPosts = [...posts];

        // 2. 낙관적 업데이트 - 즉시 UI에서 제거
        setPosts(posts.filter(p => p.id !== postId));
        setToast({ message: '게시글이 삭제되었습니다.', type: 'success' });

        // 3. 서버에 삭제 요청
        try {
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', postId);

            if (error) throw error;
        } catch (err) {
            // 4. 실패 시 롤백
            setPosts(previousPosts);
            const friendlyError = handleSupabaseError(err);
            setToast({ message: friendlyError.message, type: 'error' });
        }
    }

    // 로딩 중 - 스켈레톤 표시
    if (loading) {
        return <PostListSkeleton count={5} />;
    }

    // 에러 발생 - 에러 UI
    if (error) {
        return (
            <div className="error-state">
                <p>게시글을 불러오는데 실패했습니다.</p>
                <LoadingButton onClick={fetchPosts} loading={loading}>
                    다시 시도
                </LoadingButton>
            </div>
        );
    }

    // 빈 상태
    if (posts.length === 0) {
        return (
            <div className="empty-state">
                <p>아직 게시글이 없습니다.</p>
                <p>첫 번째 게시글을 작성해보세요!</p>
            </div>
        );
    }

    return (
        <div className="post-list">
            {posts.map(post => (
                <div key={post.id} className="post-card">
                    <h3>{post.title}</h3>
                    <p className="author">
                        작성자: {post.profiles?.username}
                    </p>
                    <p className="date">
                        {new Date(post.created_at).toLocaleDateString()}
                    </p>
                    <button
                        onClick={() => handleDelete(post.id)}
                        className="btn-delete"
                    >
                        삭제
                    </button>
                </div>
            ))}

            {/* 토스트 알림 */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}


// ===========================
// 3. Error Boundary로 감싸기
// ===========================

export function SafePostList() {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <EnhancedPostList />
        </ErrorBoundary>
    );
}


// ===========================
// 4. 개선된 게시글 작성 폼
// ===========================

export function EnhancedPostForm({ onSuccess }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({});
    const [toast, setToast] = useState(null);
    const { loading, execute } = useLoading();

    // 유효성 검증
    function validate() {
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = '제목을 입력해주세요.';
        } else if (title.length > 100) {
            newErrors.title = '제목은 100자 이내로 입력해주세요.';
        }

        if (!content.trim()) {
            newErrors.content = '내용을 입력해주세요.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validate()) return;

        try {
            await execute(async () => {
                const { data, error } = await supabase
                    .from('posts')
                    .insert({ title, content })
                    .select()
                    .single();

                if (error) throw error;

                setTitle('');
                setContent('');
                setToast({ message: '게시글이 작성되었습니다!', type: 'success' });
                onSuccess?.(data);
            });
        } catch (err) {
            const friendlyError = handleSupabaseError(err);
            setToast({ message: friendlyError.message, type: 'error' });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="post-form">
            <div className="form-group">
                <label htmlFor="title">제목</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className={errors.title ? 'error' : ''}
                />
                {errors.title && (
                    <span className="error-message">{errors.title}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="content">내용</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    rows={5}
                    className={errors.content ? 'error' : ''}
                />
                {errors.content && (
                    <span className="error-message">{errors.content}</span>
                )}
            </div>

            <LoadingButton type="submit" loading={loading}>
                작성하기
            </LoadingButton>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </form>
    );
}


// ===========================
// 5. CSS 스타일 (참고용)
// ===========================

/*
.post-card {
    padding: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    margin-bottom: 12px;
}

.error-state, .empty-state {
    text-align: center;
    padding: 40px;
    color: #6b7280;
}

.form-group {
    margin-bottom: 16px;
}

.form-group label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
}

.form-group input.error,
.form-group textarea.error {
    border-color: #ef4444;
}

.error-message {
    color: #ef4444;
    font-size: 14px;
    margin-top: 4px;
}
*/

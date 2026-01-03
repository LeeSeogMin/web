/*
 * 10-3 Supabase CRUD 함수
 * 게시글 Create, Read, Update, Delete 구현
 */

import { supabase } from './supabase';

// ===========================
// 1. CREATE - 게시글 생성
// ===========================

export async function createPost({ title, content, userId }) {
    const { data, error } = await supabase
        .from('posts')
        .insert({
            title,
            content,
            user_id: userId
        })
        .select()  // 생성된 데이터 반환
        .single(); // 단일 객체로 반환

    if (error) {
        console.error('게시글 생성 에러:', error.message);
        throw error;
    }

    return data;
}

// ===========================
// 2. READ - 게시글 조회
// ===========================

// 전체 목록 조회
export async function getPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            profiles ( username, avatar_url )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('게시글 목록 조회 에러:', error.message);
        throw error;
    }

    return data;
}

// 단일 게시글 조회
export async function getPost(id) {
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
        .eq('id', id)
        .single();

    if (error) {
        console.error('게시글 조회 에러:', error.message);
        throw error;
    }

    return data;
}

// ===========================
// 3. UPDATE - 게시글 수정
// ===========================

export async function updatePost(id, { title, content }) {
    const { data, error } = await supabase
        .from('posts')
        .update({
            title,
            content,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('게시글 수정 에러:', error.message);
        throw error;
    }

    return data;
}

// ===========================
// 4. DELETE - 게시글 삭제
// ===========================

export async function deletePost(id) {
    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('게시글 삭제 에러:', error.message);
        throw error;
    }

    return true;
}

// ===========================
// 5. 댓글 CRUD (보너스)
// ===========================

// 댓글 생성
export async function createComment({ content, postId, userId }) {
    const { data, error } = await supabase
        .from('comments')
        .insert({
            content,
            post_id: postId,
            user_id: userId
        })
        .select(`
            *,
            profiles ( username )
        `)
        .single();

    if (error) throw error;
    return data;
}

// 댓글 삭제
export async function deleteComment(id) {
    const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id);

    if (error) throw error;
    return true;
}

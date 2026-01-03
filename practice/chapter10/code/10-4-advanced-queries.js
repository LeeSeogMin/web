/*
 * 10-4 고급 쿼리
 * 필터링, 정렬, 페이지네이션, 관계 데이터 조회
 */

import { supabase } from './supabase';

// ===========================
// 1. 필터링 예제
// ===========================

// 비교 연산자
export async function getRecentPosts(days = 7) {
    const date = new Date();
    date.setDate(date.getDate() - days);

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .gte('created_at', date.toISOString())  // 7일 이내
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

// 문자열 검색 (대소문자 무시)
export async function searchPosts(keyword) {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .ilike('title', `%${keyword}%`)  // 제목에 키워드 포함
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

// 여러 값 중 하나
export async function getPostsByStatus(statuses) {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .in('status', statuses);  // ['published', 'draft'] 중 하나

    if (error) throw error;
    return data;
}

// ===========================
// 2. 정렬 예제
// ===========================

// 다중 정렬
export async function getPostsSorted() {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('category', { ascending: true })     // 1차: 카테고리
        .order('created_at', { ascending: false }); // 2차: 최신순

    if (error) throw error;
    return data;
}

// ===========================
// 3. 페이지네이션
// ===========================

// offset 기반 페이지네이션
export async function getPostsPaginated(page = 1, pageSize = 10) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })  // 전체 개수 함께 조회
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) throw error;

    return {
        data,
        totalCount: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: page
    };
}

// 커서 기반 페이지네이션 (대용량 데이터용)
export async function getPostsWithCursor(lastId = null, limit = 10) {
    let query = supabase
        .from('posts')
        .select('*')
        .order('id', { ascending: true })
        .limit(limit);

    // 이전 페이지의 마지막 ID 이후부터
    if (lastId) {
        query = query.gt('id', lastId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return {
        data,
        nextCursor: data.length > 0 ? data[data.length - 1].id : null,
        hasMore: data.length === limit
    };
}

// ===========================
// 4. 관계 데이터 조회
// ===========================

// 게시글 + 작성자 정보
export async function getPostsWithAuthor() {
    const { data, error } = await supabase
        .from('posts')
        .select(`
            id,
            title,
            content,
            created_at,
            profiles (
                username,
                avatar_url
            )
        `)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

// 게시글 + 작성자 + 댓글 (중첩 관계)
export async function getPostWithComments(postId) {
    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            profiles ( username, avatar_url ),
            comments (
                id,
                content,
                created_at,
                profiles ( username, avatar_url )
            )
        `)
        .eq('id', postId)
        .single();

    if (error) throw error;
    return data;
}

// 특정 사용자의 게시글만
export async function getPostsByUser(userId) {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

// ===========================
// 5. 복합 쿼리 예제
// ===========================

// 검색 + 정렬 + 페이지네이션
export async function searchPostsAdvanced({
    keyword = '',
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder = 'desc'
}) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
        .from('posts')
        .select('*, profiles ( username )', { count: 'exact' });

    // 검색어가 있으면 필터링
    if (keyword) {
        query = query.or(`title.ilike.%${keyword}%,content.ilike.%${keyword}%`);
    }

    // 정렬 및 페이지네이션
    query = query
        .order(sortBy, { ascending: sortOrder === 'asc' })
        .range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    return {
        data,
        pagination: {
            total: count,
            page,
            pageSize,
            totalPages: Math.ceil(count / pageSize)
        }
    };
}

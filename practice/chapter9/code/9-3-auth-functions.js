/*
 * 9-3 Supabase 인증 함수
 * OAuth 로그인, 로그아웃, 세션 관리
 */

import { supabase } from './supabase';

// ===========================
// 1. Google OAuth 로그인
// ===========================

export async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // 로그인 후 돌아올 URL
            redirectTo: `${window.location.origin}/callback`,
            // 추가 스코프 (선택)
            scopes: 'email profile'
        }
    });

    if (error) {
        console.error('로그인 에러:', error.message);
        throw error;
    }

    return data;
}

// ===========================
// 2. GitHub OAuth 로그인 (선택)
// ===========================

export async function signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: `${window.location.origin}/callback`
        }
    });

    if (error) {
        console.error('GitHub 로그인 에러:', error.message);
        throw error;
    }

    return data;
}

// ===========================
// 3. 로그아웃
// ===========================

export async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('로그아웃 에러:', error.message);
        throw error;
    }

    console.log('로그아웃 완료');
}

// ===========================
// 4. 현재 사용자 가져오기
// ===========================

export async function getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        console.error('사용자 조회 에러:', error.message);
        return null;
    }

    return user;
}

// ===========================
// 5. 현재 세션 가져오기
// ===========================

export async function getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
        console.error('세션 조회 에러:', error.message);
        return null;
    }

    return session;
}

// ===========================
// 6. 인증 상태 변화 리스너
// ===========================

export function onAuthStateChange(callback) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
            /*
             * event 종류:
             * - INITIAL_SESSION: 초기 세션 로드
             * - SIGNED_IN: 로그인 완료
             * - SIGNED_OUT: 로그아웃 완료
             * - TOKEN_REFRESHED: 토큰 갱신
             * - USER_UPDATED: 사용자 정보 업데이트
             */
            console.log('Auth event:', event);
            callback(event, session);
        }
    );

    // 구독 해제 함수 반환
    return () => subscription.unsubscribe();
}

// ===========================
// 7. 사용자 정보 추출 헬퍼
// ===========================

export function extractUserInfo(user) {
    if (!user) return null;

    return {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || user.user_metadata?.name,
        avatarUrl: user.user_metadata?.avatar_url,
        provider: user.app_metadata?.provider
    };
}

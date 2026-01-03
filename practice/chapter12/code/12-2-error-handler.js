/*
 * 12-2 에러 처리 유틸리티
 * 에러 유형 분류 및 사용자 친화적 메시지 변환
 */

// ===========================
// 1. 에러 메시지 매핑
// ===========================

const ERROR_MESSAGES = {
    // 인증 에러
    'AuthSessionMissingError': '로그인이 필요합니다.',
    'AuthApiError': '인증에 실패했습니다.',
    'invalid_grant': '로그인 정보가 올바르지 않습니다.',

    // 권한 에러 (RLS)
    'PGRST301': '이 작업을 수행할 권한이 없습니다.',
    '42501': '접근 권한이 없습니다.',

    // 데이터 에러
    '23505': '이미 존재하는 데이터입니다.',
    '23503': '참조하는 데이터가 존재하지 않습니다.',
    '23502': '필수 항목이 누락되었습니다.',

    // 네트워크 에러
    'NetworkError': '인터넷 연결을 확인해주세요.',
    'FetchError': '서버에 연결할 수 없습니다.',
    'TypeError: Failed to fetch': '네트워크 연결을 확인해주세요.',

    // 기본
    'default': '문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
};


// ===========================
// 2. 에러 유형 분류
// ===========================

export function classifyError(error) {
    const message = error?.message || '';
    const code = error?.code || '';

    // 네트워크 에러
    if (message.includes('fetch') || message.includes('network')) {
        return 'NETWORK';
    }

    // 인증 에러
    if (code.includes('Auth') || message.includes('session')) {
        return 'AUTH';
    }

    // 권한 에러 (RLS)
    if (code === 'PGRST301' || code === '42501') {
        return 'PERMISSION';
    }

    // 유효성 검증 에러
    if (code.startsWith('23')) {
        return 'VALIDATION';
    }

    return 'UNKNOWN';
}


// ===========================
// 3. 사용자 친화적 메시지 변환
// ===========================

export function getUserFriendlyMessage(error) {
    const code = error?.code || '';
    const message = error?.message || '';

    // 코드로 매핑 시도
    if (ERROR_MESSAGES[code]) {
        return ERROR_MESSAGES[code];
    }

    // 메시지로 매핑 시도
    for (const [key, value] of Object.entries(ERROR_MESSAGES)) {
        if (message.includes(key)) {
            return value;
        }
    }

    // 기본 메시지
    return ERROR_MESSAGES.default;
}


// ===========================
// 4. 에러 처리 래퍼 함수
// ===========================

export async function handleAsync(asyncFn) {
    try {
        const result = await asyncFn();
        return { data: result, error: null };
    } catch (error) {
        console.error('Error:', error);
        return {
            data: null,
            error: {
                type: classifyError(error),
                message: getUserFriendlyMessage(error),
                original: error
            }
        };
    }
}


// ===========================
// 5. Supabase 에러 처리
// ===========================

export function handleSupabaseError(error) {
    if (!error) return null;

    return {
        type: classifyError(error),
        message: getUserFriendlyMessage(error),
        code: error.code,
        details: error.details,
        hint: error.hint
    };
}


// ===========================
// 6. 사용 예시
// ===========================

/*
// 데이터 조회
const { data, error } = await handleAsync(async () => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) throw error;
    return data;
});

if (error) {
    // error.type: 'NETWORK' | 'AUTH' | 'PERMISSION' | 'VALIDATION' | 'UNKNOWN'
    // error.message: 사용자 친화적 메시지
    showToast(error.message, 'error');
}

// 또는 간단하게
const { data, error } = await supabase.from('posts').select('*');
if (error) {
    const friendlyError = handleSupabaseError(error);
    showToast(friendlyError.message, 'error');
}
*/

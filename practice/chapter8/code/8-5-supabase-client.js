/*
 * 8-5 Supabase 클라이언트 설정
 * React 프로젝트에서 Supabase 연동하기
 */

import { createClient } from '@supabase/supabase-js';

// ===========================
// 1. 환경 변수에서 설정 읽기
// ===========================

// Vite 프로젝트에서는 import.meta.env 사용
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ===========================
// 2. 클라이언트 생성
// ===========================

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ===========================
// 3. 연결 테스트 함수
// ===========================

export async function testConnection() {
    try {
        // 간단한 쿼리로 연결 확인
        const { data, error } = await supabase
            .from('_test_connection')
            .select('*')
            .limit(1);

        if (error) {
            // 테이블이 없어도 연결은 성공
            if (error.code === '42P01') {
                console.log('✅ Supabase 연결 성공!');
                console.log('   (테스트 테이블이 없지만 연결은 정상)');
                return { success: true, message: '연결 성공' };
            }
            throw error;
        }

        console.log('✅ Supabase 연결 성공!');
        return { success: true, data };
    } catch (err) {
        console.error('❌ Supabase 연결 실패:', err.message);
        return { success: false, error: err.message };
    }
}

// ===========================
// 4. 옵션을 포함한 클라이언트 생성 (고급)
// ===========================

export function createSupabaseClient(options = {}) {
    const defaultOptions = {
        auth: {
            // 세션 자동 갱신
            autoRefreshToken: true,
            // 세션 유지
            persistSession: true,
            // 브라우저 탭 간 세션 동기화
            detectSessionInUrl: true
        },
        // 전역 헤더 설정 (선택)
        global: {
            headers: {
                'x-application-name': 'my-react-app'
            }
        }
    };

    return createClient(
        supabaseUrl,
        supabaseAnonKey,
        { ...defaultOptions, ...options }
    );
}

// ===========================
// 5. 사용 예제
// ===========================

/*
// React 컴포넌트에서 사용

import { supabase } from './lib/supabase';

function App() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('에러:', error);
                return;
            }

            setPosts(data);
        }

        fetchPosts();
    }, []);

    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}
*/

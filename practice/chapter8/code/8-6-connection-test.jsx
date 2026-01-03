/*
 * 8-6 Supabase 연결 테스트 컴포넌트
 * 연결 상태 확인 및 에러 처리 예제
 */

import { useState, useEffect } from 'react';
import { supabase } from './8-5-supabase-client';

// ===========================
// 1. 연결 테스트 컴포넌트
// ===========================

function ConnectionTest() {
    const [status, setStatus] = useState('checking');
    const [error, setError] = useState(null);
    const [dbTime, setDbTime] = useState(null);

    useEffect(() => {
        async function checkConnection() {
            try {
                // PostgreSQL 서버 시간 조회
                const { data, error } = await supabase
                    .rpc('now');

                if (error) throw error;

                setDbTime(data);
                setStatus('connected');
            } catch (err) {
                setError(err.message);
                setStatus('error');
            }
        }

        checkConnection();
    }, []);

    if (status === 'checking') {
        return <p>🔄 Supabase 연결 확인 중...</p>;
    }

    if (status === 'error') {
        return (
            <div style={{ color: 'red' }}>
                <p>❌ 연결 실패</p>
                <p>에러: {error}</p>
            </div>
        );
    }

    return (
        <div style={{ color: 'green' }}>
            <p>✅ Supabase 연결 성공!</p>
            <p>서버 시간: {dbTime}</p>
        </div>
    );
}

// ===========================
// 2. 환경 변수 확인 컴포넌트
// ===========================

function EnvCheck() {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

    const urlOk = url && url.includes('supabase.co');
    const keyOk = key && key.startsWith('eyJ');

    return (
        <div>
            <h3>환경 변수 상태</h3>
            <ul>
                <li>
                    VITE_SUPABASE_URL: {urlOk ? '✅ 설정됨' : '❌ 미설정'}
                </li>
                <li>
                    VITE_SUPABASE_ANON_KEY: {keyOk ? '✅ 설정됨' : '❌ 미설정'}
                </li>
            </ul>
        </div>
    );
}

// ===========================
// 3. 메인 앱 컴포넌트
// ===========================

function App() {
    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Supabase 연결 테스트</h1>
            <EnvCheck />
            <hr />
            <ConnectionTest />
        </div>
    );
}

export default App;

/*
.env.local 파일 예시:

VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

주의: .env.local 파일은 .gitignore에 추가하여 Git에 커밋하지 않도록 한다.
*/

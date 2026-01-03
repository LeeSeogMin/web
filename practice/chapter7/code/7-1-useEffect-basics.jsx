/*
 * 7-1 useEffect 기초 예제
 * 사이드 이펙트, 의존성 배열, 클린업
 */

import { useState, useEffect } from 'react';

// ===========================
// 1. 기본 useEffect (매 렌더링)
// ===========================

function BasicEffect() {
    const [count, setCount] = useState(0);

    // 의존성 배열 없음 → 매 렌더링마다 실행
    useEffect(() => {
        console.log('렌더링됨! count:', count);
    });

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(c => c + 1)}>+1</button>
        </div>
    );
}

// ===========================
// 2. 마운트 시 1회 실행 (빈 배열)
// ===========================

function MountOnlyEffect() {
    const [data, setData] = useState(null);

    // 빈 배열 [] → 마운트 시 1회만 실행
    useEffect(() => {
        console.log('컴포넌트 마운트됨!');

        // 초기 데이터 로드
        setData({ message: '데이터 로드 완료' });

        // 개발 모드에서는 2번 실행됨 (Strict Mode)
    }, []);

    return <p>{data?.message || '로딩 중...'}</p>;
}

// ===========================
// 3. 특정 값 변화 감지
// ===========================

function DependentEffect() {
    const [userId, setUserId] = useState(1);
    const [user, setUser] = useState(null);

    // userId가 변경될 때마다 실행
    useEffect(() => {
        console.log(`userId ${userId}로 데이터 로드`);

        // 실제로는 API 호출
        setUser({ id: userId, name: `사용자 ${userId}` });
    }, [userId]);

    return (
        <div>
            <p>현재 사용자: {user?.name}</p>
            <button onClick={() => setUserId(id => id + 1)}>
                다음 사용자
            </button>
        </div>
    );
}

// ===========================
// 4. 클린업 함수 - 타이머
// ===========================

function TimerWithCleanup() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (!isRunning) return;

        console.log('타이머 시작');
        const intervalId = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);

        // 클린업 함수: 언마운트 또는 isRunning 변경 시 실행
        return () => {
            console.log('타이머 정리');
            clearInterval(intervalId);
        };
    }, [isRunning]);

    return (
        <div>
            <p>시간: {seconds}초</p>
            <button onClick={() => setIsRunning(r => !r)}>
                {isRunning ? '정지' : '시작'}
            </button>
            <button onClick={() => setSeconds(0)}>리셋</button>
        </div>
    );
}

// ===========================
// 5. 클린업 함수 - 이벤트 리스너
// ===========================

function WindowSizeTracker() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        // 이벤트 리스너 등록
        window.addEventListener('resize', handleResize);
        console.log('resize 이벤트 등록');

        // 클린업: 이벤트 리스너 해제
        return () => {
            window.removeEventListener('resize', handleResize);
            console.log('resize 이벤트 해제');
        };
    }, []);

    return (
        <p>
            창 크기: {windowSize.width} x {windowSize.height}
        </p>
    );
}

// ===========================
// 6. 문서 제목 업데이트
// ===========================

function DocumentTitleUpdater() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `클릭: ${count}회`;

        // 클린업: 원래 제목으로 복원 (선택적)
        return () => {
            document.title = 'React App';
        };
    }, [count]);

    return (
        <button onClick={() => setCount(c => c + 1)}>
            클릭 ({count})
        </button>
    );
}

// ===========================
// 7. 여러 useEffect 분리
// ===========================

function SeparatedEffects() {
    const [userId, setUserId] = useState(1);
    const [theme, setTheme] = useState('light');

    // 이펙트 1: 사용자 데이터 로드
    useEffect(() => {
        console.log('사용자 데이터 로드:', userId);
        // API 호출...
    }, [userId]);

    // 이펙트 2: 테마 적용
    useEffect(() => {
        console.log('테마 적용:', theme);
        document.body.className = theme;
    }, [theme]);

    return (
        <div>
            <button onClick={() => setUserId(id => id + 1)}>
                다음 사용자 (ID: {userId})
            </button>
            <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
                테마 전환 ({theme})
            </button>
        </div>
    );
}

// ===========================
// 앱 컴포넌트
// ===========================

function App() {
    const [showTimer, setShowTimer] = useState(true);

    return (
        <div className="app">
            <h1>useEffect 기초</h1>

            <section>
                <h2>타이머 (클린업 테스트)</h2>
                <button onClick={() => setShowTimer(s => !s)}>
                    타이머 {showTimer ? '숨기기' : '보이기'}
                </button>
                {showTimer && <TimerWithCleanup />}
            </section>

            <section>
                <h2>창 크기 추적</h2>
                <WindowSizeTracker />
            </section>

            <section>
                <h2>문서 제목</h2>
                <DocumentTitleUpdater />
            </section>
        </div>
    );
}

export default App;

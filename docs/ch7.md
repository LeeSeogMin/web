# 제7장 Hooks 심화

---

## 학습 목표

이 장을 마치면 다음을 수행할 수 있다:

1. useEffect로 사이드 이펙트와 생명주기를 관리할 수 있다
2. useRef로 DOM 접근과 값 저장을 수행할 수 있다
3. useContext로 전역 상태를 공유할 수 있다
4. useMemo와 useCallback으로 성능을 최적화할 수 있다
5. 커스텀 Hook을 만들어 로직을 재사용할 수 있다

---

## 7.1 useEffect 기초

### 7.1.1 사이드 이펙트란?

React 컴포넌트의 주 역할은 props와 state를 기반으로 UI를 렌더링하는 것이다. 그런데 실제 애플리케이션에서는 렌더링 외에도 다양한 작업이 필요하다:

- API에서 데이터 가져오기
- 문서 제목 변경하기
- 이벤트 리스너 등록하기
- 타이머 설정하기

이처럼 렌더링 외에 **외부 시스템과 상호작용**하는 작업을 **사이드 이펙트**(Side Effect)라고 한다.

**순수 렌더링 vs 사이드 이펙트**
```jsx
// 순수 렌더링: props/state → UI
function Greeting({ name }) {
    return <h1>안녕, {name}!</h1>;
}

// 사이드 이펙트: 외부 시스템과 상호작용
function PageTitle({ title }) {
    useEffect(() => {
        document.title = title;  // DOM 직접 조작
    }, [title]);

    return <h1>{title}</h1>;
}
```

### 7.1.2 useEffect 기본 사용법

`useEffect`는 컴포넌트가 렌더링된 후에 사이드 이펙트를 실행한다.

**기본 문법**
```jsx
useEffect(() => {
    // 사이드 이펙트 코드
}, [의존성배열]);
```

**실행 시점**
1. 컴포넌트가 화면에 렌더링된다
2. React가 DOM을 업데이트한다
3. useEffect 콜백이 실행된다

```jsx
function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(`현재 카운트: ${count}`);
    }, [count]);

    return (
        <button onClick={() => setCount(c => c + 1)}>
            클릭: {count}
        </button>
    );
}
```

**의존성 배열 패턴**

**표 7.1** 의존성 배열 패턴 비교

| 패턴 | 코드 | 실행 시점 | 용도 |
|------|------|----------|------|
| 빈 배열 | `useEffect(fn, [])` | 마운트 시 1회 | 초기 데이터 로드, 구독 설정 |
| 특정 값 | `useEffect(fn, [a, b])` | 마운트 + a나 b 변경 시 | 값 변화에 반응 |
| 생략 | `useEffect(fn)` | 매 렌더링마다 | 거의 사용 안 함 |

```jsx
// 마운트 시 1회 (빈 배열)
useEffect(() => {
    console.log('컴포넌트 마운트됨');
}, []);

// userId 변경 시마다 (특정 값)
useEffect(() => {
    fetchUser(userId);
}, [userId]);

// 매 렌더링마다 (생략 - 주의!)
useEffect(() => {
    console.log('렌더링됨');
});
```

### 7.1.3 클린업 함수

useEffect에서 반환하는 함수를 **클린업**(Cleanup) 함수라고 한다. 이 함수는 이펙트가 정리되어야 할 때 실행된다.

```
┌─────────────────────────────────────────────────────────────┐
│                    useEffect 실행 흐름                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. 마운트                                                  │
│      렌더링 → DOM 업데이트 → setup 실행                       │
│                                                             │
│   2. 업데이트 (deps 변경 시)                                  │
│      렌더링 → DOM 업데이트 → cleanup(이전) → setup(새로운)    │
│                                                             │
│   3. 언마운트                                                │
│      cleanup 실행                                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘

※ 그림 7.1 useEffect 실행 흐름
```

**타이머 정리 예제**
```jsx
function Timer() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);

        // 클린업: 타이머 정리
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return <p>경과 시간: {seconds}초</p>;
}
```

**이벤트 리스너 정리 예제**
```jsx
function WindowSize() {
    const [size, setSize] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setSize(window.innerWidth);

        window.addEventListener('resize', handleResize);

        // 클린업: 리스너 해제
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <p>창 너비: {size}px</p>;
}
```

**클린업이 필요한 경우**:
- 타이머 (setInterval, setTimeout)
- 이벤트 리스너
- WebSocket 연결
- 외부 라이브러리 인스턴스

_전체 코드는 practice/chapter7/code/7-1-useEffect-basics.jsx 참고_

---

## 7.2 useEffect 심화

### 7.2.1 의존성 배열 주의사항

**모든 의존성 포함하기**

ESLint의 `exhaustive-deps` 규칙은 이펙트 내에서 사용하는 모든 값을 의존성 배열에 포함하도록 경고한다:

```jsx
// 잘못된 예: userId 누락
useEffect(() => {
    fetchUser(userId);  // userId가 의존성에 없음
}, []);  // ⚠️ 경고

// 올바른 예
useEffect(() => {
    fetchUser(userId);
}, [userId]);  // ✓ userId 포함
```

**객체/함수 의존성 주의**

객체나 함수는 매 렌더링마다 새로 생성되어 무한 루프를 유발할 수 있다:

```jsx
// 문제: options가 매번 새로 생성됨
function Search({ query }) {
    const options = { query, limit: 10 };  // 매 렌더링마다 새 객체

    useEffect(() => {
        search(options);
    }, [options]);  // ⚠️ 무한 루프!
}

// 해결 1: 원시 값 사용
useEffect(() => {
    search({ query, limit: 10 });
}, [query]);

// 해결 2: useMemo 사용
const options = useMemo(() => ({ query, limit: 10 }), [query]);
```

### 7.2.2 데이터 페칭

**기본 패턴**
```jsx
function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                setLoading(true);
                const response = await fetch('/api/posts');

                if (!response.ok) {
                    throw new Error('Failed to fetch');
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
```

**경쟁 상태(Race Condition) 방지**

사용자가 빠르게 ID를 변경하면 이전 요청이 나중에 도착할 수 있다:

```jsx
function UserProfile({ userId }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let isCancelled = false;

        async function fetchUser() {
            const response = await fetch(`/api/users/${userId}`);
            const data = await response.json();

            // 취소되지 않았을 때만 상태 업데이트
            if (!isCancelled) {
                setUser(data);
            }
        }

        fetchUser();

        // 클린업: 취소 플래그 설정
        return () => {
            isCancelled = true;
        };
    }, [userId]);

    return user ? <h1>{user.name}</h1> : <p>로딩 중...</p>;
}
```

**AbortController 사용**
```jsx
useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
        try {
            const response = await fetch(url, {
                signal: controller.signal
            });
            const data = await response.json();
            setData(data);
        } catch (err) {
            if (err.name !== 'AbortError') {
                setError(err.message);
            }
        }
    }

    fetchData();

    return () => controller.abort();
}, [url]);
```

_전체 코드는 practice/chapter7/code/7-2-data-fetching.jsx 참고_

---

## 7.3 useRef

`useRef`는 두 가지 주요 용도가 있다:
1. DOM 요소에 직접 접근
2. 렌더링에 영향을 주지 않는 값 저장

### 7.3.1 DOM 요소 접근

```jsx
function InputFocus() {
    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.focus();
    };

    return (
        <div>
            <input ref={inputRef} type="text" />
            <button onClick={handleClick}>포커스</button>
        </div>
    );
}
```

**스크롤 제어**
```jsx
function ScrollToTop() {
    const topRef = useRef(null);

    const scrollToTop = () => {
        topRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <div ref={topRef}>상단</div>
            {/* 긴 콘텐츠 */}
            <button onClick={scrollToTop}>맨 위로</button>
        </div>
    );
}
```

### 7.3.2 값 저장 (렌더링에 영향 없음)

useRef로 저장한 값은 변경해도 **리렌더링을 유발하지 않는다**.

**표 7.2** useState vs useRef 비교

| 특성 | useState | useRef |
|------|----------|--------|
| 변경 시 리렌더링 | O | X |
| 렌더링 간 값 유지 | O | O |
| 접근 방법 | `value` | `ref.current` |
| 주요 용도 | UI에 반영할 상태 | DOM 접근, 값 저장 |

**이전 값 저장**
```jsx
function Counter() {
    const [count, setCount] = useState(0);
    const prevCountRef = useRef(0);

    useEffect(() => {
        prevCountRef.current = count;
    }, [count]);

    return (
        <p>
            현재: {count}, 이전: {prevCountRef.current}
        </p>
    );
}
```

**타이머 ID 저장**
```jsx
function Stopwatch() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const start = () => {
        if (isRunning) return;

        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
    };

    const stop = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
    };

    return (
        <div>
            <p>{seconds}초</p>
            <button onClick={start}>시작</button>
            <button onClick={stop}>정지</button>
        </div>
    );
}
```

---

## 7.4 useContext와 전역 상태

### 7.4.1 Context API 기초

**Context**는 컴포넌트 트리 전체에 데이터를 전달하는 방법이다. props drilling(여러 단계를 거쳐 props 전달) 문제를 해결한다.

**Context 생성 및 사용 3단계**:

1. **Context 생성**
```jsx
const ThemeContext = createContext(null);
```

2. **Provider로 값 제공**
```jsx
function App() {
    const [theme, setTheme] = useState('light');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <Header />
            <Main />
        </ThemeContext.Provider>
    );
}
```

3. **useContext로 값 사용**
```jsx
function Header() {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <header className={theme}>
            <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
                테마 전환
            </button>
        </header>
    );
}
```

```
┌─────────────────────────────────────────────────────────────┐
│                   Context 데이터 흐름                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│    ThemeContext.Provider                                    │
│    value = { theme, toggleTheme }                           │
│         │                                                   │
│         ├──────────> Header (useContext)                    │
│         │                                                   │
│         ├──────────> Main                                   │
│         │              └──> Button (useContext)             │
│         │                                                   │
│         └──────────> Footer (useContext)                    │
│                                                             │
│    ✓ Props 전달 없이 직접 접근                               │
│    ✓ Provider 하위 모든 컴포넌트에서 사용 가능                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

※ 그림 7.2 Context 데이터 흐름
```

### 7.4.2 테마 전환 예제

```jsx
// ThemeContext.jsx
const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    // useMemo로 불필요한 리렌더링 방지
    const value = useMemo(() => ({
        theme,
        toggleTheme
    }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

// 커스텀 Hook
function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme은 ThemeProvider 내에서 사용해야 합니다');
    }
    return context;
}

export { ThemeProvider, useTheme };
```

### 7.4.3 인증 상태 관리 패턴

```jsx
const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        // API 호출
        const userData = await api.login(email, password);
        setUser(userData);
        setLoading(false);
    };

    const logout = () => {
        setUser(null);
    };

    const value = useMemo(() => ({
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout
    }), [user, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth는 AuthProvider 내에서 사용해야 합니다');
    }
    return context;
}
```

_전체 코드는 practice/chapter7/code/7-4-theme-context.jsx 참고_

---

## 7.5 성능 최적화 Hooks

### 7.5.1 useMemo

`useMemo`는 계산 비용이 큰 값을 **메모이제이션**(캐싱)한다.

```jsx
const memoizedValue = useMemo(() => {
    return expensiveCalculation(a, b);
}, [a, b]);
```

```
┌─────────────────────────────────────────────────────────────┐
│                   메모이제이션 개념                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   입력 (deps) ──> 의존성 변경? ──No──> 캐시된 결과 반환       │
│                       │                                     │
│                      Yes                                    │
│                       │                                     │
│                       ▼                                     │
│                   새로 계산 ────> 결과 캐시 ──> 결과 반환     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

※ 그림 7.3 메모이제이션 개념
```

**사용 예시**
```jsx
function ProductList({ products, filterTerm }) {
    // filterTerm이나 products가 변경될 때만 필터링
    const filteredProducts = useMemo(() => {
        console.log('필터링 수행');
        return products.filter(p =>
            p.name.toLowerCase().includes(filterTerm.toLowerCase())
        );
    }, [products, filterTerm]);

    return (
        <ul>
            {filteredProducts.map(p => (
                <li key={p.id}>{p.name}</li>
            ))}
        </ul>
    );
}
```

### 7.5.2 useCallback

`useCallback`은 함수 정의를 메모이제이션한다.

```jsx
const memoizedCallback = useCallback(() => {
    doSomething(a, b);
}, [a, b]);
```

**주요 용도**: React.memo로 감싼 자식 컴포넌트에 함수를 props로 전달할 때

```jsx
// 자식 컴포넌트 (React.memo로 최적화)
const Button = React.memo(function Button({ onClick, children }) {
    console.log('Button 렌더링');
    return <button onClick={onClick}>{children}</button>;
});

// 부모 컴포넌트
function Parent() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    // useCallback 없으면 Parent 렌더링마다 새 함수 생성
    // → Button도 리렌더링
    const handleClick = useCallback(() => {
        setCount(c => c + 1);
    }, []);

    return (
        <div>
            <input value={text} onChange={e => setText(e.target.value)} />
            <Button onClick={handleClick}>클릭 ({count})</Button>
        </div>
    );
}
```

### 7.5.3 언제 사용해야 하는가?

**표 7.3** 최적화 Hooks 비교

| Hook | 메모이제이션 대상 | 사용 시기 |
|------|------------------|----------|
| useMemo | 계산 결과 (값) | 비용이 큰 계산, memo 자식에 객체 전달 |
| useCallback | 함수 정의 | memo 자식에 함수 전달, useEffect 의존성 |
| React.memo | 컴포넌트 | props가 변경되지 않으면 리렌더링 건너뛰기 |

**사용하지 말아야 할 때**:
- 계산이 1ms 미만인 간단한 연산
- 최적화해도 성능 개선이 10-20% 미만
- 컴포넌트가 자주 리렌더링되지 않는 경우

**Best Practice**:
1. 먼저 간단한 코드 작성
2. 성능 문제 발생 시 React Profiler로 측정
3. 병목 지점에만 최적화 적용

> **참고**: React 19의 React Compiler는 자동 메모이제이션을 제공하여 수동 useMemo/useCallback의 필요성을 크게 줄인다.

---

## 7.6 커스텀 Hook

### 7.6.1 커스텀 Hook이란?

**커스텀 Hook**은 `use`로 시작하는 함수로, 여러 컴포넌트에서 재사용할 수 있는 상태 로직을 추출한다.

**특징**:
- 이름이 반드시 `use`로 시작
- 다른 Hooks를 내부에서 호출 가능
- 일반 함수처럼 값을 반환

### 7.6.2 실용 커스텀 Hook 예제

**useLocalStorage**
```jsx
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setValue = (value) => {
        const valueToStore = value instanceof Function
            ? value(storedValue)
            : value;
        setStoredValue(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
    };

    return [storedValue, setValue];
}

// 사용
function App() {
    const [theme, setTheme] = useLocalStorage('theme', 'light');

    return (
        <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
            현재 테마: {theme}
        </button>
    );
}
```

**useFetch**
```jsx
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        let isCancelled = false;

        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch(url);
                const result = await response.json();
                if (!isCancelled) setData(result);
            } catch (err) {
                if (!isCancelled) setError(err.message);
            } finally {
                if (!isCancelled) setLoading(false);
            }
        }

        fetchData();
        return () => { isCancelled = true; };
    }, [url]);

    return { data, loading, error };
}

// 사용
function PostList() {
    const { data, loading, error } = useFetch('/api/posts');

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>에러: {error}</p>;

    return <ul>{data?.map(post => <li key={post.id}>{post.title}</li>)}</ul>;
}
```

**useDebounce**
```jsx
function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

// 사용: 검색 입력 디바운싱
function Search() {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
        if (debouncedQuery) {
            // API 호출
            search(debouncedQuery);
        }
    }, [debouncedQuery]);

    return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

_전체 코드는 practice/chapter7/code/7-6-custom-hooks.js 참고_

---

## 7.7 실습: 게시글 뷰어

지금까지 배운 Hooks를 종합하여 게시글 뷰어 앱을 만들어보자.

### 요구사항

1. 게시글 목록 표시 (useFetch)
2. 게시글 선택 시 상세 보기
3. 댓글 목록 표시
4. 테마 전환 (useContext)
5. 로딩/에러 상태 처리

### 핵심 코드

**커스텀 Hook: useFetch**
```jsx
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) {
            setLoading(false);
            return;
        }

        let isCancelled = false;

        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const result = await response.json();
                if (!isCancelled) setData(result);
            } catch (err) {
                if (!isCancelled) setError(err.message);
            } finally {
                if (!isCancelled) setLoading(false);
            }
        }

        fetchData();
        return () => { isCancelled = true; };
    }, [url]);

    return { data, loading, error };
}
```

**게시글 목록**
```jsx
function PostList({ onSelectPost, selectedId }) {
    const { data: posts, loading, error } = useFetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=10'
    );
    const { theme } = useTheme();

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>에러: {error}</div>;

    return (
        <aside className={`post-list ${theme}`}>
            <h2>게시글 목록</h2>
            <ul>
                {posts?.map(post => (
                    <li
                        key={post.id}
                        className={selectedId === post.id ? 'selected' : ''}
                        onClick={() => onSelectPost(post.id)}
                    >
                        {post.title}
                    </li>
                ))}
            </ul>
        </aside>
    );
}
```

**앱 컴포넌트**
```jsx
function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

function AppContent() {
    const [selectedPostId, setSelectedPostId] = useState(null);

    return (
        <div className="app">
            <Header />
            <div className="content">
                <PostList
                    onSelectPost={setSelectedPostId}
                    selectedId={selectedPostId}
                />
                <PostDetail postId={selectedPostId} />
            </div>
        </div>
    );
}
```

_전체 코드는 practice/chapter7/code/7-7-post-viewer/ 참고_

---

## 핵심 정리

1. **useEffect**: 사이드 이펙트를 처리한다. 의존성 배열로 실행 시점을 제어하고, 클린업 함수로 리소스를 정리한다.

2. **의존성 배열**: 빈 배열은 마운트 1회, 특정 값 포함 시 해당 값 변경마다 실행. 모든 의존성을 포함해야 한다.

3. **useRef**: DOM 접근과 렌더링에 영향 없는 값 저장에 사용. 변경해도 리렌더링되지 않는다.

4. **useContext**: props drilling 없이 전역 상태를 공유한다. Provider로 값을 제공하고 useContext로 소비한다.

5. **useMemo/useCallback**: 비용이 큰 계산이나 함수를 메모이제이션한다. 성능 문제가 있을 때만 사용하고, 과도한 최적화는 피한다.

6. **커스텀 Hook**: `use`로 시작하는 함수로 상태 로직을 추출하여 재사용한다.

---

## 연습문제

### 기초

**문제 1.** useEffect의 의존성 배열이 빈 배열(`[]`)일 때와 생략했을 때의 차이를 설명하시오.

**문제 2.** 1초마다 카운트가 증가하는 타이머를 구현하시오. 컴포넌트 언마운트 시 타이머가 정리되어야 한다.

**문제 3.** useState와 useRef의 차이점을 설명하고, 각각 언제 사용해야 하는지 예를 들어 설명하시오.

### 중급

**문제 4.** 스크롤이 페이지 하단에 도달하면 추가 데이터를 로드하는 무한 스크롤을 구현하시오.

**문제 5.** Context API를 사용하여 한국어/영어 다국어 지원 기능을 구현하시오.

**문제 6.** 다음 코드에서 불필요한 리렌더링이 발생하는 원인을 찾고 최적화하시오.
```jsx
function Parent() {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        console.log('clicked');
    };

    return (
        <div>
            <button onClick={() => setCount(c => c + 1)}>+1</button>
            <ExpensiveChild onClick={handleClick} />
        </div>
    );
}

const ExpensiveChild = React.memo(({ onClick }) => {
    console.log('ExpensiveChild 렌더링');
    return <button onClick={onClick}>Child</button>;
});
```

### 심화

**문제 7.** 다음 기능을 가진 뉴스 피드 앱을 구현하시오.
- useFetch 커스텀 Hook으로 뉴스 데이터 로드
- 카테고리 필터링 (useContext)
- 무한 스크롤
- 북마크 기능 (useLocalStorage)

---

## 다음 장 예고

제8장에서는 **Supabase 기초**를 학습한다. Supabase를 사용하여 인증, 데이터베이스, 실시간 기능을 구현하고, React와 통합하는 방법을 다룬다.

---

## 참고문헌

1. React 공식 문서. *useEffect*. https://react.dev/reference/react/useEffect
2. React 공식 문서. *useRef*. https://react.dev/reference/react/useRef
3. React 공식 문서. *useContext*. https://react.dev/reference/react/useContext
4. Abramov, D. *A Complete Guide to useEffect*. https://overreacted.io/a-complete-guide-to-useeffect/
5. Comeau, J. *Understanding useMemo and useCallback*. https://www.joshwcomeau.com/react/usememo-and-usecallback/

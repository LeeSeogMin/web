# 제9장 Supabase Authentication

---

## 학습 목표

이 장을 마치면 다음을 수행할 수 있다:

1. 인증과 인가의 차이를 설명할 수 있다
2. OAuth 2.0의 동작 원리를 이해할 수 있다
3. Supabase로 Google 소셜 로그인을 구현할 수 있다
4. React Context로 인증 상태를 전역 관리할 수 있다
5. 보호된 라우트를 만들어 인증된 사용자만 접근하게 할 수 있다

---

## 9.1 인증의 기본 개념

### 9.1.1 인증(Authentication) vs 인가(Authorization)

웹 애플리케이션에서 사용자 관리는 두 가지 핵심 개념으로 구성된다.

**인증(Authentication)**: "너 누구야?"
- 사용자의 **신원을 확인**하는 과정
- 로그인이 대표적인 예
- 결과: 사용자가 누구인지 알게 됨

**인가(Authorization)**: "너 이거 해도 돼?"
- 사용자가 **무엇을 할 수 있는지** 결정하는 과정
- 권한 확인이 대표적인 예
- 결과: 특정 작업 허용 또는 거부

```
┌─────────────────────────────────────────────────────────────┐
│                    인증과 인가의 흐름                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   [사용자] ──로그인──> [인증] ──"너 누구야?"──> 신원 확인    │
│                          │                                  │
│                          ▼                                  │
│              [인가] ──"이 리소스 접근 가능?"                 │
│                 │                   │                       │
│                 ▼                   ▼                       │
│            [권한 있음]         [권한 없음]                   │
│            접근 허용           접근 거부                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

※ 그림 9.1 인증과 인가의 흐름
```

**표 9.1** 인증 vs 인가 비교

| 구분 | 인증 (Authentication) | 인가 (Authorization) |
|------|----------------------|---------------------|
| 질문 | 너 누구야? | 너 이거 해도 돼? |
| 목적 | 신원 확인 | 권한 확인 |
| 시점 | 먼저 수행 | 인증 후 수행 |
| 예시 | 로그인 | 관리자 페이지 접근 |

### 9.1.2 세션 기반 vs 토큰 기반 인증

**세션 기반 인증**:
- 서버가 사용자 상태를 메모리에 저장
- 클라이언트는 세션 ID만 쿠키로 보유
- 서버 확장 시 세션 공유 문제 발생

**토큰 기반 인증**:
- 클라이언트가 토큰을 보유
- 서버는 상태를 저장하지 않음 (Stateless)
- 확장성이 좋음

**표 9.2** 세션 vs 토큰 비교

| 항목 | 세션 기반 | 토큰 기반 |
|------|----------|----------|
| 상태 저장 | 서버 | 클라이언트 |
| 확장성 | 제한적 | 우수 |
| 대표 기술 | 쿠키 + 세션 | JWT |

Supabase는 **JWT 기반의 토큰 인증**을 사용한다.

### 9.1.3 JWT(JSON Web Token)

**JWT**는 사용자 정보를 담은 JSON 객체를 안전하게 전송하기 위한 토큰이다.

**JWT 구조** (점으로 구분된 세 부분):
```
xxxxx.yyyyy.zzzzz
 │       │      │
 │       │      └─ Signature (서명)
 │       └──────── Payload (데이터)
 └──────────────── Header (헤더)
```

- **Header**: 토큰 타입과 서명 알고리즘
- **Payload**: 사용자 정보 (클레임)
- **Signature**: 위변조 방지용 서명

> **주의**: Payload는 Base64로 인코딩될 뿐, 암호화되지 않는다. 민감한 정보는 넣지 않는다.

---

## 9.2 소셜 로그인 설정

### 9.2.1 OAuth 2.0 개념

**OAuth 2.0**은 타사 서비스(Google, GitHub 등)를 통해 사용자를 인증하는 표준 프로토콜이다.

**장점**:
- 사용자가 새 비밀번호를 만들 필요 없음
- 이메일 인증 과정 생략
- 신뢰할 수 있는 서비스의 보안 활용

**OAuth 2.0 주요 역할**:

| 역할 | 설명 | 예시 |
|------|------|------|
| Resource Owner | 사용자 | 로그인하려는 사람 |
| Client | 우리 앱 | React 애플리케이션 |
| Authorization Server | 인증 서버 | Google |
| Resource Server | 리소스 서버 | Google 사용자 정보 |

### 9.2.2 Supabase OAuth 흐름

```
┌─────────────────────────────────────────────────────────────┐
│                  Supabase OAuth 흐름                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. 사용자 ──> React 앱: 로그인 버튼 클릭                    │
│                                                             │
│  2. React 앱 ──> Supabase: signInWithOAuth('google')        │
│                                                             │
│  3. Supabase ──> Google: 인증 요청 (리다이렉트)             │
│                                                             │
│  4. 사용자 ──> Google: 로그인 + 동의                        │
│                                                             │
│  5. Google ──> Supabase: Authorization Code                 │
│                                                             │
│  6. Supabase ──> Google: 코드로 토큰 교환                   │
│                                                             │
│  7. Supabase: 세션 생성 + 사용자 정보 저장                  │
│                                                             │
│  8. Supabase ──> React 앱: 리다이렉트 (세션 포함)           │
│                                                             │
│  9. React 앱: onAuthStateChange 트리거 → 로그인 완료        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

※ 그림 9.2 Supabase OAuth 흐름
```

### 9.2.3 Google Cloud Console 설정

Google OAuth를 사용하려면 Google Cloud Console에서 설정이 필요하다.

**1단계: 프로젝트 생성**
1. https://console.cloud.google.com 접속
2. 새 프로젝트 생성

**2단계: OAuth 동의 화면 설정**
1. APIs & Services > OAuth consent screen
2. User Type: External 선택
3. 앱 정보 입력 (이름, 이메일)
4. 테스트 사용자 추가 (개발 중에만 필요)

**3단계: OAuth 클라이언트 ID 생성**
1. APIs & Services > Credentials
2. Create Credentials > OAuth client ID
3. Application type: Web application
4. Authorized redirect URIs 추가:
   ```
   https://your-project-id.supabase.co/auth/v1/callback
   ```
5. Client ID와 Client Secret 저장

### 9.2.4 Supabase Provider 설정

**Supabase 대시보드에서**:
1. Authentication > Providers
2. Google 활성화
3. Client ID 입력
4. Client Secret 입력
5. Save

**Redirect URL 확인**:
- Supabase 대시보드에서 제공하는 Callback URL을 Google Console에 등록해야 한다:
  ```
  https://your-project-id.supabase.co/auth/v1/callback
  ```

---

## 9.3 인증 구현

### 9.3.1 signInWithOAuth

Google 로그인을 시작하는 함수:

```javascript
async function handleGoogleLogin() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // 로그인 후 돌아올 URL
            redirectTo: `${window.location.origin}/`
        }
    });

    if (error) {
        console.error('로그인 에러:', error.message);
    }
}
```

**options 속성**:

| 속성 | 설명 |
|------|------|
| `redirectTo` | 로그인 완료 후 리다이렉트할 URL |
| `scopes` | 추가 권한 요청 (예: 'email profile') |
| `queryParams` | 추가 쿼리 파라미터 |

### 9.3.2 signOut

로그아웃 구현:

```javascript
async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('로그아웃 에러:', error.message);
    } else {
        console.log('로그아웃 완료');
    }
}
```

### 9.3.3 onAuthStateChange

인증 상태 변화를 감지하는 리스너:

```javascript
useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
            console.log('Auth event:', event);

            if (session) {
                setUser(session.user);
            } else {
                setUser(null);
            }
        }
    );

    // 클린업
    return () => subscription.unsubscribe();
}, []);
```

**이벤트 종류**:

**표 9.3** onAuthStateChange 이벤트

| 이벤트 | 설명 |
|--------|------|
| `INITIAL_SESSION` | 초기 세션 로드 |
| `SIGNED_IN` | 로그인 완료 |
| `SIGNED_OUT` | 로그아웃 완료 |
| `TOKEN_REFRESHED` | 토큰 갱신됨 |
| `USER_UPDATED` | 사용자 정보 업데이트 |

### 9.3.4 getUser, getSession

현재 사용자와 세션 정보 가져오기:

```javascript
// 현재 사용자
const { data: { user } } = await supabase.auth.getUser();

// 현재 세션
const { data: { session } } = await supabase.auth.getSession();

// 사용자 정보 활용
if (user) {
    console.log('이메일:', user.email);
    console.log('이름:', user.user_metadata?.full_name);
    console.log('프로필 사진:', user.user_metadata?.avatar_url);
}
```

_전체 코드는 practice/chapter9/code/9-3-auth-functions.js 참고_

---

## 9.4 인증 상태 관리

### 9.4.1 AuthContext 설계

React Context를 사용하여 인증 상태를 전역으로 관리한다.

```
┌─────────────────────────────────────────────────────────────┐
│                   AuthContext 구조                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   AuthProvider                                              │
│   ├─ user: 현재 사용자 정보                                  │
│   ├─ loading: 초기 로딩 상태                                 │
│   ├─ isAuthenticated: 로그인 여부                           │
│   ├─ signInWithGoogle: 로그인 함수                          │
│   └─ signOut: 로그아웃 함수                                  │
│                                                             │
│         │                                                   │
│         ▼                                                   │
│   ┌─────────────────────────────────────┐                   │
│   │  하위 컴포넌트 (useAuth로 접근)      │                   │
│   │  - Header                           │                   │
│   │  - ProtectedRoute                   │                   │
│   │  - Dashboard                        │                   │
│   │  - Profile                          │                   │
│   └─────────────────────────────────────┘                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

※ 그림 9.3 AuthContext 구조
```

### 9.4.2 AuthProvider 구현

```jsx
import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { supabase } from './lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 초기 세션 확인
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // 상태 변화 감지
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: window.location.origin }
        });
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    const value = useMemo(() => ({
        user,
        loading,
        isAuthenticated: !!user,
        signInWithGoogle,
        signOut
    }), [user, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
```

### 9.4.3 useAuth 커스텀 Hook

```jsx
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth는 AuthProvider 내에서 사용해야 합니다');
    }

    return context;
}
```

**사용 예시**:
```jsx
function Header() {
    const { user, signOut, isAuthenticated } = useAuth();

    return (
        <header>
            {isAuthenticated ? (
                <>
                    <span>{user.email}</span>
                    <button onClick={signOut}>로그아웃</button>
                </>
            ) : (
                <Link to="/login">로그인</Link>
            )}
        </header>
    );
}
```

### 9.4.4 보호된 라우트 (ProtectedRoute)

인증된 사용자만 접근할 수 있는 라우트:

```jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    // 로딩 중
    if (loading) {
        return <div>인증 확인 중...</div>;
    }

    // 미로그인 시 로그인 페이지로 리다이렉트
    if (!user) {
        return (
            <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
            />
        );
    }

    return children;
}
```

**라우터 설정**:
```jsx
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route
        path="/dashboard"
        element={
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        }
    />
</Routes>
```

_전체 코드는 practice/chapter9/code/9-4-auth-context.jsx, 9-5-protected-route.jsx 참고_

---

## 9.5 실습: Google 로그인 구현

### 요구사항

1. Google 소셜 로그인 구현
2. 로그인/로그아웃 UI
3. 사용자 정보(이름, 이메일, 프로필 사진) 표시
4. 보호된 대시보드 페이지

### 프로젝트 구조

```
src/
├── lib/
│   └── supabase.js       # Supabase 클라이언트
├── contexts/
│   └── AuthContext.jsx   # 인증 Context
├── components/
│   ├── Header.jsx        # 헤더 (로그인 상태 표시)
│   ├── ProtectedRoute.jsx
│   └── UserInfo.jsx      # 사용자 정보 표시
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   └── Dashboard.jsx     # 보호된 페이지
└── App.jsx
```

### 핵심 코드

**App.jsx**
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
```

**Login.jsx**
```jsx
import { useAuth } from '../contexts/AuthContext';

function Login() {
    const { signInWithGoogle } = useAuth();

    return (
        <div className="login-page">
            <h1>로그인</h1>
            <button onClick={signInWithGoogle}>
                Google로 로그인
            </button>
        </div>
    );
}
```

**Dashboard.jsx**
```jsx
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
    const { user } = useAuth();

    return (
        <div className="dashboard">
            <h1>대시보드</h1>
            <div className="user-info">
                <img src={user.user_metadata?.avatar_url} alt="프로필" />
                <p>이름: {user.user_metadata?.full_name}</p>
                <p>이메일: {user.email}</p>
            </div>
        </div>
    );
}
```

---

## 핵심 정리

1. **인증**은 사용자의 신원을 확인하고, **인가**는 사용자의 권한을 확인한다.

2. **OAuth 2.0**은 타사 서비스(Google, GitHub 등)를 통해 사용자를 인증하는 표준 프로토콜이다.

3. Supabase는 `signInWithOAuth`로 소셜 로그인을, `signOut`으로 로그아웃을, `onAuthStateChange`로 상태 감지를 제공한다.

4. **AuthContext**를 사용하면 인증 상태를 전역으로 관리하고 모든 컴포넌트에서 접근할 수 있다.

5. **ProtectedRoute**는 인증된 사용자만 접근할 수 있는 라우트를 만든다. 미인증 시 로그인 페이지로 리다이렉트한다.

6. 프론트엔드의 보호된 라우트는 **UX 목적**이며, 실제 보안은 **서버(RLS)**에서 처리해야 한다.

---

## 연습문제

### 기초

**문제 1.** 인증(Authentication)과 인가(Authorization)의 차이를 설명하시오.

**문제 2.** JWT는 세 부분으로 구성된다. 각 부분의 이름과 역할을 설명하시오.

**문제 3.** onAuthStateChange에서 발생하는 이벤트 중 SIGNED_IN과 SIGNED_OUT이 언제 발생하는지 설명하시오.

### 중급

**문제 4.** 다음 AuthContext 코드의 빈칸을 채우시오.

```jsx
function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 빈칸 1: 초기 세션 확인 코드

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            // 빈칸 2: 콜백 함수
        );

        return () => _____;  // 빈칸 3: 클린업
    }, []);
}
```

**문제 5.** ProtectedRoute 컴포넌트가 로딩 중일 때, 미로그인 시, 로그인 시 각각 어떻게 동작하는지 설명하시오.

### 심화

**문제 6.** GitHub OAuth 로그인을 추가로 구현하시오. 다음 요구사항을 만족해야 한다:
- Supabase에서 GitHub Provider 설정
- signInWithGitHub 함수 구현
- 로그인 페이지에 GitHub 로그인 버튼 추가

---

## 다음 장 예고

제10장에서는 **Supabase Database**를 학습한다. PostgreSQL 기초부터 게시판 스키마 설계, CRUD 구현까지 데이터베이스 연동의 전 과정을 다룬다.

---

## 참고문헌

1. Supabase 공식 문서. *Authentication*. https://supabase.com/docs/guides/auth
2. Supabase 공식 문서. *Login with Google*. https://supabase.com/docs/guides/auth/social-login/auth-google
3. OAuth 2.0 공식 사이트. https://oauth.net/2/
4. Google Cloud. *OAuth 2.0 for Web Server Applications*. https://developers.google.com/identity/protocols/oauth2
5. React Router. *Protected Routes and Authentication*. https://ui.dev/react-router-protected-routes-authentication

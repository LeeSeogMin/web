# 제9장 리서치: Supabase Authentication

## 1. 인증 기본 개념

### 1.1 인증 vs 인가
- **인증(Authentication)**: "너 누구야?" - 신원 확인
- **인가(Authorization)**: "너 이거 해도 돼?" - 권한 확인

### 1.2 세션 기반 vs 토큰 기반
| 방식 | 저장 위치 | 특징 |
|------|----------|------|
| 세션 기반 | 서버 | 상태 유지, 서버 메모리 사용 |
| 토큰 기반 | 클라이언트 | 무상태, 확장성 좋음 |

### 1.3 JWT (JSON Web Token)
- Header: 알고리즘, 토큰 타입
- Payload: 사용자 정보 (클레임)
- Signature: 검증용 서명

---

## 2. OAuth 2.0 흐름

### 2.1 주요 역할
- **Resource Owner**: 사용자
- **Client**: 우리 앱
- **Authorization Server**: Google, GitHub 등
- **Resource Server**: 보호된 자원

### 2.2 Authorization Code Flow (PKCE)
1. 앱 → Google: 인증 요청
2. 사용자: Google 로그인 + 동의
3. Google → 앱: Authorization Code
4. 앱 → Google: Code로 토큰 교환
5. Google → 앱: Access Token + Refresh Token

### 2.3 Supabase OAuth 흐름
1. signInWithOAuth 호출
2. Google 로그인 페이지로 리다이렉트
3. 인증 완료 후 Supabase callback URL로 리다이렉트
4. Supabase가 세션 생성
5. 앱으로 리다이렉트 (with session)

---

## 3. Supabase Auth API

### 3.1 signInWithOAuth
```javascript
const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
        redirectTo: 'http://localhost:5173/callback'
    }
});
```

### 3.2 signOut
```javascript
const { error } = await supabase.auth.signOut();
```

### 3.3 onAuthStateChange
```javascript
supabase.auth.onAuthStateChange((event, session) => {
    // event: 'INITIAL_SESSION', 'SIGNED_IN', 'SIGNED_OUT', 'TOKEN_REFRESHED'
    if (session) {
        setUser(session.user);
    } else {
        setUser(null);
    }
});
```

### 3.4 getUser / getSession
```javascript
const { data: { user } } = await supabase.auth.getUser();
const { data: { session } } = await supabase.auth.getSession();
```

---

## 4. Google OAuth 설정

### 4.1 Google Cloud Console
1. console.cloud.google.com 접속
2. 새 프로젝트 생성
3. OAuth 동의 화면 설정
4. 사용자 인증 정보 > OAuth 2.0 클라이언트 ID 생성
5. 웹 애플리케이션 선택
6. 승인된 리다이렉션 URI 설정

### 4.2 Supabase 설정
1. Authentication > Providers > Google
2. Client ID, Client Secret 입력
3. Redirect URL 확인: `https://xxx.supabase.co/auth/v1/callback`

---

## 5. AuthContext 패턴

### 5.1 구조
```jsx
const AuthContext = createContext(null);

function AuthProvider({ children }) {
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

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
```

### 5.2 ProtectedRoute
```jsx
function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div>Loading...</div>;

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
```

---

## 6. 보안 고려사항

### 6.1 클라이언트 측
- 민감한 정보는 절대 클라이언트에 저장 금지
- HTTPS 필수
- PKCE 플로우 사용 (기본)

### 6.2 서버 측
- RLS(Row Level Security) 필수
- 프론트엔드 보호는 UX용, 실제 보안은 서버에서

---

## 참고 자료

1. Supabase Auth Docs: https://supabase.com/docs/guides/auth
2. Google OAuth: https://supabase.com/docs/guides/auth/social-login/auth-google
3. OAuth 2.0 Spec: https://oauth.net/2/

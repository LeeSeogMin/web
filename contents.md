# 웹 프로그래밍(실전): AI 협업 기반 풀스택 리터러시

## React + Supabase + Vercel

---

# 목차

---

## Part 1. 웹 개발 환경과 AI 협업 기초

### Chapter 1. 웹이 동작하는 방식
1.1 클라이언트-서버 아키텍처  
1.2 HTTP 요청과 응답의 흐름  
1.3 브라우저 렌더링 파이프라인  
1.4 DOM과 JavaScript 런타임  
1.5 DevTools 실습: 네트워크/요소/콘솔 탭 활용  

### Chapter 2. AI 코딩 도구 활용법
2.1 AI 코딩 도구의 특성과 한계  
2.2 버전 불일치 문제의 이해  
  - 2.2.1 LLM 학습 시점과 라이브러리 버전 차이  
  - 2.2.2 발생 가능한 오류 유형  
2.3 해결 전략 1: 버전 명시 프롬프팅  
  - 2.3.1 프롬프트에 버전 정보 포함하기  
  - 2.3.2 package.json 기반 컨텍스트 제공  
2.4 해결 전략 2: Context7 MCP 활용  
  - 2.4.1 MCP(Model Context Protocol) 개념  
  - 2.4.2 Context7 설치 및 설정  
  - 2.4.3 최신 문서 참조 워크플로우  
2.5 AI 출력 검증 프로세스  
  - 2.5.1 공식 문서와 대조 검증  
  - 2.5.2 AI 사용 로그 작성법  
  - 2.5.3 검증 체크리스트 템플릿  
2.6 GitHub Copilot 활용법 : 아래 부록 반드시 참조  
  - 2.6.1 VS Code 설치 및 설정  
  - 2.6.2 copilot-instructions.md 작성  
  - 2.6.3 효과적인 제안 유도 패턴  
  - 2.6.4 Copilot Chat 활용 (@workspace, /explain, /fix)  
  - 2.6.5 제안 코드 검증 워크플로우  

---

## Part 2. 웹 기초: HTML, CSS, JavaScript

### Chapter 3. HTML 시맨틱과 접근성
3.1 HTML5 문서 구조  
3.2 시맨틱 태그의 의미와 활용  
  - 3.2.1 header, nav, main, section, article, aside, footer  
  - 3.2.2 올바른 heading 계층 구조  
3.3 폼 요소와 레이블링  
  - 3.3.1 input, select, textarea  
  - 3.3.2 label과 for 속성의 중요성  
3.4 웹 접근성 기초  
  - 3.4.1 키보드 내비게이션  
  - 3.4.2 ARIA 속성 기본  
  - 3.4.3 접근성 검사 도구 활용  
3.5 실습: 로그인 폼과 게시판 마크업 작성  

### Chapter 4. CSS 레이아웃과 반응형 디자인
4.1 CSS 선택자와 우선순위  
4.2 박스 모델의 이해  
4.3 Flexbox 레이아웃  
  - 4.3.1 flex container와 flex item  
  - 4.3.2 주축과 교차축 정렬  
  - 4.3.3 실전 패턴: 내비게이션, 카드 리스트  
4.4 Grid 레이아웃  
  - 4.4.1 grid-template 정의  
  - 4.4.2 영역 배치와 gap  
  - 4.4.3 실전 패턴: 대시보드 레이아웃  
4.5 반응형 디자인  
  - 4.5.1 미디어 쿼리 기초  
  - 4.5.2 모바일 퍼스트 접근법  
  - 4.5.3 반응형 이미지와 타이포그래피  
4.6 실습: 게시판 UI 스타일링  

### Chapter 5. JavaScript 핵심
5.1 변수, 자료형, 연산자  
5.2 함수와 스코프  
  - 5.2.1 함수 선언과 표현식  
  - 5.2.2 화살표 함수  
  - 5.2.3 클로저의 이해  
5.3 객체와 배열  
  - 5.3.1 객체 리터럴과 프로퍼티  
  - 5.3.2 배열 메서드: map, filter, reduce, find  
  - 5.3.3 구조 분해 할당과 스프레드 연산자  
5.4 DOM 조작  
  - 5.4.1 요소 선택과 탐색  
  - 5.4.2 요소 생성, 수정, 삭제  
  - 5.4.3 이벤트 리스너와 이벤트 객체  
5.5 비동기 프로그래밍  
  - 5.5.1 콜백과 콜백 지옥  
  - 5.5.2 Promise의 이해  
  - 5.5.3 async/await 패턴  
  - 5.5.4 fetch API와 에러 처리  
5.6 모듈 시스템  
  - 5.6.1 ES6 import/export  
  - 5.6.2 모듈 구조 설계  
5.7 실습: 더미 API 연동 및 에러/로딩 상태 처리  

---

## Part 3. React 프론트엔드 개발

### Chapter 6. React 기초
6.1 React의 철학과 특징  
  - 6.1.1 선언적 UI  
  - 6.1.2 컴포넌트 기반 아키텍처  
  - 6.1.3 가상 DOM  
6.2 개발 환경 설정  
  - 6.2.1 Vite로 프로젝트 생성  
  - 6.2.2 프로젝트 구조 이해  
  - 6.2.3 ESLint/Prettier 설정  
6.3 JSX 문법  
  - 6.3.1 JSX 표현식  
  - 6.3.2 조건부 렌더링  
  - 6.3.3 리스트 렌더링과 key  
6.4 컴포넌트와 Props  
  - 6.4.1 함수형 컴포넌트  
  - 6.4.2 props 전달과 타입  
  - 6.4.3 children props  
6.5 State와 useState  
  - 6.5.1 상태의 개념  
  - 6.5.2 useState 훅 사용법  
  - 6.5.3 상태 업데이트와 불변성  
6.6 이벤트 처리  
  - 6.6.1 이벤트 핸들러 작성  
  - 6.6.2 폼 입력 처리  
6.7 실습: 게시글 카드 컴포넌트 작성  

### Chapter 7. React 심화
7.1 useEffect와 생명주기  
  - 7.1.1 사이드 이펙트의 이해  
  - 7.1.2 의존성 배열  
  - 7.1.3 클린업 함수  
7.2 React Router  
  - 7.2.1 라우터 설정  
  - 7.2.2 Route와 Link  
  - 7.2.3 동적 라우트와 useParams  
  - 7.2.4 중첩 라우트  
  - 7.2.5 프로그래매틱 내비게이션  
7.3 상태 관리 전략  
  - 7.3.1 상태 끌어올리기  
  - 7.3.2 Context API 기초  
7.4 커스텀 훅  
  - 7.4.1 로직 재사용의 필요성  
  - 7.4.2 커스텀 훅 작성 패턴  
  - 7.4.3 실전 예제: useForm, useFetch  
7.5 실습: 목록/상세/작성 페이지 라우팅 구현  

---

## Part 4. Supabase 백엔드 통합

### Chapter 8. Supabase 시작하기
8.1 BaaS(Backend as a Service) 개념  
8.2 Supabase vs Firebase 비교  
8.3 Supabase 프로젝트 생성  
8.4 대시보드 탐색  
  - 8.4.1 Table Editor  
  - 8.4.2 SQL Editor  
  - 8.4.3 Authentication 설정  
  - 8.4.4 API 문서 확인  
8.5 Supabase 클라이언트 설정  
  - 8.5.1 @supabase/supabase-js 설치  
  - 8.5.2 환경 변수 관리  
  - 8.5.3 클라이언트 초기화  
8.6 Context7로 Supabase 최신 문서 참조하기  

### Chapter 9. Supabase Authentication
9.1 인증의 기본 개념  
  - 9.1.1 인증 vs 인가  
  - 9.1.2 세션과 토큰  
9.2 소셜 로그인 설정  
  - 9.2.1 Google OAuth 설정  
  - 9.2.2 GitHub OAuth 설정 (선택)  
9.3 인증 구현  
  - 9.3.1 signInWithOAuth  
  - 9.3.2 signOut  
  - 9.3.3 세션 상태 감지: onAuthStateChange  
9.4 인증 상태 관리  
  - 9.4.1 AuthContext 구현  
  - 9.4.2 보호된 라우트 만들기  
  - 9.4.3 로그인/로그아웃 UI 흐름  
9.5 실습: Google 로그인 구현  

### Chapter 10. Supabase Database
10.1 PostgreSQL 기초  
  - 10.1.1 관계형 데이터베이스 개념  
  - 10.1.2 테이블, 행, 열  
  - 10.1.3 기본 SQL 문법  
10.2 데이터 모델링  
  - 10.2.1 게시판 스키마 설계  
  - 10.2.2 테이블 관계: 1:N, N:M  
  - 10.2.3 외래 키와 참조 무결성  
10.3 CRUD 구현  
  - 10.3.1 select: 데이터 조회  
  - 10.3.2 insert: 데이터 생성  
  - 10.3.3 update: 데이터 수정  
  - 10.3.4 delete: 데이터 삭제  
10.4 쿼리 심화  
  - 10.4.1 필터링: eq, neq, gt, lt, like  
  - 10.4.2 정렬과 페이지네이션  
  - 10.4.3 관계 데이터 조회  
10.5 실습: 게시글 CRUD 연결  

### Chapter 11. Row Level Security (RLS)
11.1 RLS의 필요성  
  - 11.1.1 클라이언트 사이드 보안의 한계  
  - 11.1.2 서버 사이드 권한 강제  
11.2 RLS 기본 문법  
  - 11.2.1 정책 생성: CREATE POLICY  
  - 11.2.2 USING과 WITH CHECK  
  - 11.2.3 auth.uid() 함수  
11.3 권한 시나리오 구현  
  - 11.3.1 "누구나 읽기 가능"  
  - 11.3.2 "로그인 사용자만 작성"  
  - 11.3.3 "작성자만 수정/삭제"  
  - 11.3.4 "관리자 전체 권한"  
11.4 RLS 테스트와 디버깅  
  - 11.4.1 다른 사용자로 테스트  
  - 11.4.2 권한 실패 케이스 재현  
  - 11.4.3 정책 충돌 해결  
11.5 실습: 게시판 권한 정책 작성 및 검증  

---

## Part 5. 배포와 운영

### Chapter 12. 에러 처리와 UX
12.1 에러의 종류  
  - 12.1.1 네트워크 에러  
  - 12.1.2 인증 에러  
  - 12.1.3 권한 에러  
  - 12.1.4 유효성 검증 에러  
12.2 에러 처리 패턴  
  - 12.2.1 try-catch 구조화  
  - 12.2.2 에러 바운더리  
  - 12.2.3 사용자 친화적 에러 메시지  
12.3 로딩 상태 관리  
  - 12.3.1 로딩 인디케이터  
  - 12.3.2 스켈레톤 UI  
  - 12.3.3 Optimistic UI  
12.4 실습: 에러/로딩 UX 개선  

### Chapter 13. Vercel 배포
13.1 Vercel 플랫폼 이해  
  - 13.1.1 서버리스 배포의 개념  
  - 13.1.2 Vercel의 특징  
13.2 배포 프로세스  
  - 13.2.1 GitHub 연동  
  - 13.2.2 프로젝트 임포트  
  - 13.2.3 빌드 설정  
13.3 환경 변수 관리  
  - 13.3.1 Vercel 환경 변수 설정  
  - 13.3.2 개발/프로덕션 환경 분리  
  - 13.3.3 시크릿 관리 원칙  
13.4 배포 후 확인  
  - 13.4.1 도메인 설정  
  - 13.4.2 배포 로그 확인  
  - 13.4.3 롤백 방법  
13.5 실습: 프로젝트 배포 및 URL 제출  

---

## Part 6. 프로젝트 실전

### Chapter 14. 프로젝트 설계
14.1 요구사항 정의  
  - 14.1.1 유저 스토리 작성법  
  - 14.1.2 기능 명세서 템플릿  
14.2 데이터 모델 설계  
  - 14.2.1 ERD 작성  
  - 14.2.2 테이블 스키마 정의  
14.3 권한 규칙 설계  
  - 14.3.1 역할 정의  
  - 14.3.2 권한 매트릭스 작성  
14.4 AI 협업 계획  
  - 14.4.1 작업 분해  
  - 14.4.2 AI에게 위임할 작업 선정  
  - 14.4.3 검증 포인트 설정  

### Chapter 15. 프로젝트 구현과 검증
15.1 스프린트 실행  
  - 15.1.1 기능별 구현 순서  
  - 15.1.2 점진적 통합  
15.2 코드 리뷰  
  - 15.2.1 PR 작성법  
  - 15.2.2 리뷰 체크리스트  
15.3 최종 검증  
  - 15.3.1 기능 테스트  
  - 15.3.2 RLS 검증  
  - 15.3.3 에러 시나리오 테스트  
15.4 문서화  
  - 15.4.1 README 작성  
  - 15.4.2 AI 사용 로그 정리  
  - 15.4.3 회고 보고서  

---

## 부록

### Appendix A. 개발 환경 설정 가이드
A.1 Node.js 설치  
A.2 VS Code 설정  
A.3 Git 기초  
A.4 터미널 사용법  

### Appendix B. AI 사용 로그 템플릿
B.1 로그 작성 양식  
B.2 작성 예시  
B.3 자주 하는 실수  

### Appendix C. Context7 MCP 설정 가이드
C.1 Claude Desktop 설정  
C.2 Context7 서버 연동  
C.3 문서 참조 프롬프트 예시  
C.4 트러블슈팅  

### Appendix D. GitHub Copilot 설정 가이드
D.1 GitHub 학생 계정 신청  
D.2 VS Code 확장 설치  
D.3 copilot-instructions.md 템플릿  
D.4 단축키 및 명령어 치트시트  
D.5 트러블슈팅  

### Appendix E. 체크리스트 모음
E.1 접근성 체크리스트  
E.2 보안 체크리스트  
E.3 배포 전 체크리스트  
E.4 코드 리뷰 체크리스트  

### Appendix F. 참고 자료
F.1 공식 문서 링크  
F.2 추천 학습 자료  
F.3 커뮤니티 및 포럼  

---

부록) 
## GitHub Copilot 활용 팁

### 1. 버전 불일치 문제 해결

#### 방법 1: `.github/copilot-instructions.md` 활용

프로젝트 루트에 이 파일을 생성하면 Copilot이 자동으로 참조한다.

```markdown
# Project Context

## Tech Stack (버전 고정)
- React 18.2.x
- React Router 6.x
- Supabase JS v2.x
- Vite 5.x

## Coding Conventions
- 함수형 컴포넌트만 사용
- async/await 패턴 사용 (then 체이닝 금지)
- Supabase 클라이언트는 src/lib/supabase.js에서 import

## 금지 사항
- class 컴포넌트 사용 금지
- createClient를 컴포넌트 내부에서 호출 금지
- any 타입 사용 금지 (TypeScript 사용 시)
```

#### 방법 2: 주석으로 버전/컨텍스트 명시

```javascript
// React 18, Supabase JS v2 사용
// supabase.auth.signInWithOAuth() 방식으로 구현

async function handleLogin() {
  // Copilot이 여기서 올바른 버전의 코드를 제안
}
```

---

### 2. Copilot 기본 단축키 (VS Code)

| 단축키 | 기능 |
|--------|------|
| `Tab` | 제안 수락 |
| `Esc` | 제안 거부 |
| `Alt + ]` | 다음 제안 보기 |
| `Alt + [` | 이전 제안 보기 |
| `Ctrl + Enter` | 여러 제안 패널로 보기 |
| `Ctrl + I` | Copilot Chat 열기 (인라인) |

---

### 3. 효과적인 제안 유도 패턴

#### 패턴 1: 함수 시그니처 먼저 작성

```javascript
// 나쁜 예: 빈 상태에서 시작
function handleSubmit() {
  |  // Copilot이 맥락 없이 추측
}

// 좋은 예: 시그니처와 주석으로 의도 명시
/**
 * 게시글 작성 폼 제출
 * @param {string} title - 제목
 * @param {string} content - 내용
 * @returns {Promise<void>}
 */
async function handleSubmit(title, content) {
  |  // Copilot이 정확한 코드 제안
}
```

#### 패턴 2: 예제 코드 먼저 제공

```javascript
// 이런 패턴으로 에러 처리:
// try { await supabase... } catch (error) { setError(error.message) }

async function fetchPosts() {
  |  // Copilot이 위 패턴을 따라 생성
}
```

#### 패턴 3: 파일명으로 컨텍스트 제공

```
src/hooks/useAuth.js      → 인증 관련 훅 제안
src/components/PostCard.jsx → 게시글 카드 컴포넌트 제안
src/lib/supabase.js       → Supabase 클라이언트 설정 제안
```

---

### 4. Copilot Chat 활용 (권장)

```
@workspace Supabase v2에서 Google 로그인 구현 방법

@workspace 현재 프로젝트의 supabase 클라이언트 설정 확인

/explain 이 RLS 정책이 어떻게 동작하는지 설명해줘

/fix 이 에러 해결해줘: "auth.uid() is not defined"
```

| 명령어 | 용도 |
|--------|------|
| `@workspace` | 프로젝트 전체 컨텍스트 참조 |
| `/explain` | 코드 설명 요청 |
| `/fix` | 에러 수정 요청 |
| `/tests` | 테스트 코드 생성 |
| `/doc` | 문서/주석 생성 |

---

### 5. 학생용 체크리스트: Copilot 사용 시

```markdown
□ 제안된 코드의 import 경로가 프로젝트 구조와 일치하는가?
□ 사용된 API가 현재 설치된 라이브러리 버전과 맞는가?
□ deprecated 경고가 발생하지 않는가?
□ 실제로 실행해서 동작을 확인했는가?
□ 공식 문서와 대조 검증했는가?
```

---


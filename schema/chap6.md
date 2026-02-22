# 제6장 집필계획서: Next.js 상태 관리와 데이터 페칭

---

## 1. 장 개요

| 항목 | 내용 |
|------|------|
| 장 번호 | 6 |
| 장 제목 | Next.js 상태 관리와 데이터 페칭 |
| 장 유형 | 기술 실습 장 |
| 목표 분량 | 620-680줄, ~35쪽 |
| 구성비 | 개념 15% + 프롬프트 35% + 코드읽기/검증 40% + 과제 10% |
| 선수 지식 | Ch5(Next.js 기초: 컴포넌트, JSX, Props, App Router) |
| 미션 | 게시판 프론트엔드를 완성한다 |

---

## 2. 학습 목표

이 장을 마치면 다음을 수행할 수 있다:
1. useState로 컴포넌트의 상태를 관리하고 이벤트를 처리할 수 있다
2. useEffect로 사이드 이펙트를 처리하고 의존성 배열의 역할을 설명할 수 있다
3. Server Component와 Client Component의 차이를 이해하고 적절히 선택할 수 있다
4. 서버/클라이언트 양쪽의 데이터 페칭 패턴을 구현할 수 있다
5. Context API로 전역 상태를 관리하고 커스텀 훅으로 로직을 재사용할 수 있다

---

## 3. 수업 타임라인

| 교시 | 시간대 | 주제 | 해당 절 |
|:---:|--------|------|---------|
| 1교시 | 00:00~00:50 | useState + 이벤트 처리 + 폼 | 6.1 |
| 쉬는시간 | 00:50~01:00 | — | — |
| 2교시 | 01:00~01:50 | useEffect + Server/Client Component + 데이터 페칭 | 6.2~6.4 |
| 쉬는시간 | 01:50~02:00 | — | — |
| 3교시 | 02:00~02:50 | Context API + 커스텀 훅 + 과제 | 6.5~6.6 |

---

## 4. 절 구성 및 분량 배분

### 1교시: useState + 이벤트 처리

#### 6.1 useState와 이벤트 처리 (약 200줄, 개념+프롬프트+코드읽기)
- 6.1.1 상태의 개념과 useState (~60줄)
  - 상태(State) = "React가 기억하는 변수"
  - `const [value, setValue] = useState(초기값)`
  - **표 6.1**: 일반 변수 vs useState 비교
  - > **라이브 코딩 시연**: 좋아요 카운터 (버튼 클릭 → 숫자 증가)
- 6.1.2 이벤트 핸들러 작성 (~40줄)
  - onClick, onChange, onSubmit
  - 이벤트 핸들러 명명 규칙 (handleClick, handleChange)
  - **표 6.2**: 주요 이벤트 핸들러
- 6.1.3 폼 입력 처리 (~60줄)
  - **제어 컴포넌트**: input value를 state에 바인딩
  - 여러 입력 필드 관리 (객체 state)
  - > **함께 진행**: 게시글 작성 폼 개선
  - Copilot 프롬프트
- 6.1.4 상태 업데이트와 불변성 (~40줄)
  - 배열 추가: `[...posts, newPost]`
  - 배열 삭제: `posts.filter(p => p.id !== id)`
  - 배열 수정: `posts.map(p => p.id === id ? {...p, title} : p)`
  - 직접 수정(push, splice) 금지

---

### 2교시: useEffect + Server/Client Component + 데이터 페칭

#### 6.2 useEffect와 사이드 이펙트 (약 70줄)
- 6.2.1 useEffect 기본 사용법 (~30줄)
  - 사이드 이펙트 = "렌더링 외의 작업" (API 호출, 타이머 등)
  - `useEffect(() => { ... }, [deps])`
- 6.2.2 의존성 배열 (~25줄)
  - `[]` = 마운트 시 1회, `[변수]` = 변수 변경 시, 생략 = 매 렌더링
  - **표 6.3**: 의존성 배열에 따른 실행 시점
- 6.2.3 클린업 함수 (~15줄)
  - `return () => { 정리 작업 }`
  - 타이머 해제, 이벤트 리스너 제거

#### 6.3 Server Component vs Client Component (약 80줄, 핵심 개념)
- 6.3.1 "use client" 지시어 (~25줄)
  - Next.js App Router 기본 = Server Component
  - "use client" 추가 = Client Component
- 6.3.2 언제 서버 컴포넌트를 쓰는가 (~25줄)
  - 데이터베이스 직접 접근, API 키 사용, 무거운 라이브러리
- 6.3.3 언제 클라이언트 컴포넌트를 쓰는가 (~30줄)
  - useState, useEffect, onClick 등 인터랙션
  - **표 6.4**: Server vs Client Component 비교 (핵심 표)

#### 6.4 데이터 페칭 패턴 (약 80줄)
- 6.4.1 서버 컴포넌트에서 fetch (~30줄)
  - `async function Page()` + `await fetch()`
- 6.4.2 클라이언트 컴포넌트에서 useEffect + fetch (~30줄)
  - useState + useEffect + fetch 패턴
- 6.4.3 로딩/에러 상태 처리 (~20줄)
  - isLoading, error state 관리

---

### 3교시: Context API + 과제

#### 6.5 Context API와 커스텀 훅 (약 80줄)
- 6.5.1 전역 상태와 Context (~50줄)
  - createContext, Provider, useContext
  - Ch9 AuthContext 미리보기
  - Copilot 프롬프트
- 6.5.2 커스텀 훅으로 로직 재사용 (~30줄)
  - `usePosts()` 훅 예시
  - 이름 규칙: `use` 접두사

#### 6.6 과제 (약 110줄)
- 과제 안내: 게시판 프론트엔드 완성
- ① 검색 기능 (useState)
- ② 게시글 작성 폼 개선 (제어 컴포넌트 + 유효성 검증)
- ③ 게시글 삭제 기능 (filter)
- ④ 외부 API 데이터 페칭
- **표 6.5**: 검증 체크리스트
- **표 6.6**: 흔한 AI 실수 패턴
- 과제 제출 + 마무리

---

## 5. 핵심 용어

| 용어 | 영문 | 정의 |
|------|------|------|
| 상태 | State | React 컴포넌트가 기억하는 데이터. 변경 시 UI가 자동 업데이트 |
| 사이드 이펙트 | Side Effect | 렌더링 외의 작업 (API 호출, 타이머, 구독 등) |
| 서버 컴포넌트 | Server Component | 서버에서만 실행되는 컴포넌트. App Router 기본값 |
| 클라이언트 컴포넌트 | Client Component | 브라우저에서 실행되는 컴포넌트. "use client" 필요 |
| 제어 컴포넌트 | Controlled Component | 입력값을 state로 관리하는 폼 컴포넌트 |
| 컨텍스트 | Context | 컴포넌트 트리 전체에 데이터를 전달하는 React 기능 |
| 커스텀 훅 | Custom Hook | 재사용 가능한 상태 로직을 함수로 추출한 것 |

---

## 6. 표 계획 (6개)

| 번호 | 제목 | 내용 |
|------|------|------|
| 표 6.1 | 일반 변수 vs useState | 재렌더링 여부, UI 반영 차이 |
| 표 6.2 | 주요 이벤트 핸들러 | onClick, onChange, onSubmit 등 |
| 표 6.3 | 의존성 배열에 따른 실행 시점 | [], [변수], 생략 |
| 표 6.4 | Server vs Client Component | 실행 위치, 사용 가능 기능, 적합한 용도 |
| 표 6.5 | AI 생성 코드 검증 체크리스트 | "use client", import 경로, 의존성 배열 등 |
| 표 6.6 | 흔한 AI 실수 패턴 | 의존성 배열 누락, state 직접 수정 등 |

---

## 7. COPILOT_VERIFY 마커 (4개)

1. 게시글 작성 폼 생성 프롬프트 결과 (6.1.3)
2. useEffect + fetch 패턴 프롬프트 결과 (6.4.2)
3. ThemeContext 생성 프롬프트 결과 (6.5.1)
4. 검색 기능 프롬프트 결과 (6.6)

---

## 8. 참고문헌

- React 공식 문서: useState — https://react.dev/reference/react/useState
- React 공식 문서: useEffect — https://react.dev/reference/react/useEffect
- React 공식 문서: useContext — https://react.dev/reference/react/useContext
- Next.js 공식 문서: Server and Client Components — https://nextjs.org/docs/app/building-your-application/rendering/server-components
- Next.js 공식 문서: Data Fetching — https://nextjs.org/docs/app/building-your-application/data-fetching

---

## 9. 현재 대비 변경 사항

**이전 schema/chap6.md**: "React 기초" (구 15장 커리큘럼, Vite 기반)
**현재**: "Next.js 상태 관리와 데이터 페칭" (현 13장 커리큘럼, App Router 기반)

**전면 교체** — React 기초 내용은 Ch5로 이동됨. Ch6는 상태 관리, 데이터 페칭, Server/Client Component를 다룸.

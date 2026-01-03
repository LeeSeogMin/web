# 제7장 리서치 결과: Hooks 심화

**조사일**: 2026-01-02

---

## 1. useEffect 심화

### 1.1 의존성 배열 패턴

| 패턴 | 실행 시점 | 용도 |
|------|----------|------|
| `[]` 빈 배열 | 마운트 시 1회 | API 호출, 구독 설정 |
| `[deps]` 특정 값 | 마운트 + deps 변경 시 | 값 변화 감지 |
| 생략 | 매 렌더링 | 거의 사용 안 함 |

### 1.2 의존성 배열 주의사항

- ESLint `exhaustive-deps` 규칙 준수
- 컴포넌트 내부 값(props, state, 함수) 모두 포함
- 객체/함수는 매 렌더링 새로 생성 → 무한 루프 위험
- 객체 의존성은 shallow comparison만 수행

### 1.3 클린업 함수

**실행 시점**:
- 컴포넌트 언마운트 시
- 의존성 변경으로 이펙트 재실행 직전
- 개발 모드: 마운트 직후 setup+cleanup 한 번 더 실행

**필요한 경우**:
- 이벤트 리스너 해제
- 타이머 정리 (setInterval, setTimeout)
- 구독 해제 (WebSocket, Observable)
- API 요청 취소 (AbortController)

**원칙**: 클린업은 setup과 대칭적이어야 함

---

## 2. useRef

### 2.1 두 가지 주요 용도

1. **DOM 요소 접근**
   - input 포커스
   - 스크롤 제어
   - 미디어 재생
   - querySelector 대체

2. **값 저장 (리렌더링 없이)**
   - 이전 값 저장
   - 타이머 ID 저장
   - 렌더 카운트

### 2.2 useState vs useRef

| 특성 | useState | useRef |
|------|----------|--------|
| 변경 시 리렌더링 | O | X |
| 렌더링 간 값 유지 | O | O |
| 용도 | UI에 반영할 상태 | DOM 접근, 값 저장 |

### 2.3 Best Practice

- 선언적으로 표현 가능하면 ref 사용 금지
- 리렌더링이 필요하면 useState 사용
- DOM 조작 필요 시에만 ref 사용

---

## 3. useContext와 전역 상태

### 3.1 Context API 구성

1. `createContext()` - Context 객체 생성
2. `Provider` - 값 제공
3. `useContext()` - 값 소비

### 3.2 적합한 사용 사례

- 테마 (다크/라이트 모드)
- 인증 상태 (로그인 사용자)
- 언어 설정 (i18n)
- 전역 설정

### 3.3 주의사항

**제한사항**:
- 대규모 트리에서 불필요한 리렌더링
- 내장 미들웨어/persistence 없음
- 복잡한 상태에서 보일러플레이트 증가

**성능 최적화**:
- `useMemo`로 Provider value 감싸기
- 상태 분리 (여러 Context 사용)

### 3.4 2025 대안

- Zustand: 가벼운 전역 상태
- Jotai: 원자적 상태 관리
- React Query: 서버 상태 관리

---

## 4. 성능 최적화 Hooks

### 4.1 useMemo vs useCallback

| Hook | 메모이제이션 대상 | 반환값 |
|------|------------------|--------|
| useMemo | 계산 결과 | 값 |
| useCallback | 함수 정의 | 함수 |

### 4.2 React 19 Compiler (2025)

- 자동 메모이제이션으로 수동 useMemo/useCallback 불필요
- 2025년 10월 React Compiler 1.0 출시
- 기존 코드에서도 점진적 적용 가능

### 4.3 사용 기준

**useMemo 사용 시기**:
- 계산이 1ms 이상 소요
- 계산 결과를 memo 컴포넌트에 전달
- 의존성이 자주 변하지 않음

**useCallback 사용 시기**:
- React.memo로 감싼 자식에 함수 전달
- 함수가 useEffect 의존성일 때

### 4.4 사용하지 말아야 할 때

- 1ms 미만의 간단한 연산
- 렌더링 비용이 낮은 컴포넌트
- 메모이제이션 없이도 빠른 경우
- 10-20% 이상 개선이 없는 경우

### 4.5 Best Practice

1. 먼저 간단한 코드 작성
2. 성능 문제 발생 시 React Profiler로 측정
3. 병목 지점에만 최적화 적용
4. 의존성 배열 정확히 관리

---

## 5. 커스텀 Hook

### 5.1 네이밍 규칙

- 반드시 `use`로 시작
- camelCase 사용
- 예: `useLocalStorage`, `useFetch`, `useWindowSize`

### 5.2 장점

- 로직 재사용
- 관심사 분리
- 테스트 용이성
- 코드 가독성 향상

### 5.3 실용 커스텀 Hook 예시

- `useLocalStorage` - 로컬 스토리지 동기화
- `useWindowSize` - 윈도우 크기 감지
- `useFetch` - API 호출 추상화
- `useDebounce` - 디바운스 처리
- `useToggle` - 불리언 토글

---

## 참고 자료

1. [React 공식 문서 - useEffect](https://react.dev/reference/react/useEffect)
2. [React 공식 문서 - useRef](https://react.dev/reference/react/useRef)
3. [React 공식 문서 - useContext](https://react.dev/reference/react/useContext)
4. [React 공식 문서 - useMemo](https://react.dev/reference/react/useMemo)
5. [Dan Abramov - A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)
6. [Josh W. Comeau - Understanding useMemo and useCallback](https://www.joshwcomeau.com/react/usememo-and-usecallback/)
7. [Kent C. Dodds - When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)

---

**작성일**: 2026-01-02

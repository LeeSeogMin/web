# 제6장 리서치 결과: React 기초

**조사일**: 2026-01-02

---

## 1. React 19 주요 특징 (2025 기준)

### 1.1 React Compiler (React Forget)

- 자동 메모이제이션으로 `useMemo`, `useCallback` 필요성 감소
- 25-40% 리렌더링 감소 보고
- 코드 변경 없이 성능 최적화

### 1.2 Server Components

- 서버에서 렌더링, 클라이언트로 JavaScript 전송 최소화
- React 19에서 안정화
- HTML 스트리밍 지원

### 1.3 신규 Hooks & APIs

| Hook | 용도 |
|------|------|
| `use()` | 렌더링 중 리소스 읽기 (Promise) |
| `useActionState` | 폼 처리 및 상태 관리 개선 |
| `useOptimistic` | 낙관적 UI 업데이트 |
| `useDeferredValue` | 비긴급 상태 업데이트 지연 |

### 1.4 Concurrent Rendering

- React 19에서 기본 활성화
- 렌더링 중단/재개로 UI 블로킹 방지
- Suspense와 useTransition으로 비동기 UI 관리

---

## 2. JSX 문법 규칙

### 2.1 HTML vs JSX 차이점

| HTML | JSX | 이유 |
|------|-----|------|
| `class` | `className` | `class`는 JavaScript 예약어 |
| `for` | `htmlFor` | `for`는 JavaScript 예약어 |
| `onclick` | `onClick` | camelCase 규칙 |
| `tabindex` | `tabIndex` | camelCase 규칙 |
| `stroke-width` | `strokeWidth` | camelCase 규칙 |

### 2.2 핵심 규칙

1. **단일 루트 요소**: 여러 요소는 `<>...</>` 또는 `<div>`로 감싸기
2. **모든 태그 닫기**: `<img />`, `<input />`, `<br />`
3. **camelCase 속성**: DOM API 규칙 따름
4. **style 객체**: 문자열 대신 객체 `{{ backgroundColor: 'red' }}`

### 2.3 표현식 삽입

- 중괄호 `{}` 내에 JavaScript 표현식 사용
- 조건부: 삼항 연산자 `{condition ? a : b}`
- 논리 연산자: `{condition && <Component />}`

---

## 3. useState 패턴과 불변성

### 3.1 불변성 원칙

**잘못된 방식 (직접 변경)**
```javascript
// 리렌더링 발생 안 함!
user.name = 'Ada';
setUser(user);
```

**올바른 방식 (새 객체 생성)**
```javascript
setUser({ ...user, name: 'Ada' });
```

### 3.2 함수형 업데이트

이전 상태에 의존하는 업데이트:
```javascript
setCount(prev => prev + 1);  // 권장
setCount(count + 1);          // stale closure 위험
```

### 3.3 상태 관리 선택 기준

| 도구 | 적합한 상황 |
|------|------------|
| useState | 간단한 컴포넌트 레벨 상태 |
| useReducer | 복잡한 상태 로직, 상태 전환 |
| Context API | prop drilling 없이 공유 |
| Redux Toolkit | 대규모 앱, 예측 가능한 상태 |
| Zustand | 가벼운 전역 상태 |

### 3.4 성능 고려사항

- 불변성 → 참조 비교로 리렌더링 결정
- `React.memo`, `useMemo`로 불필요한 렌더링 방지
- 직접 상태 변경 금지

---

## 4. Vite + React 프로젝트 설정

### 4.1 프로젝트 생성

```bash
# 기본 React 프로젝트
npm create vite@latest my-react-app -- --template react

# TypeScript 포함
npm create vite@latest my-react-app -- --template react-ts

# 의존성 설치 및 실행
cd my-react-app
npm install
npm run dev
```

### 4.2 Vite 장점 (2025)

- **즉시 서버 시작**: 번들링 건너뛰기
- **빠른 HMR**: 실시간 컴포넌트 업데이트
- **최적화된 빌드**: Rollup 기반 프로덕션 번들
- **TypeScript, JSX, CSS 기본 지원**
- CRA 대체 표준으로 자리잡음

### 4.3 프로젝트 구조

```
my-react-app/
├── index.html          # 진입점 (루트에 위치)
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx        # React 마운트
│   ├── App.jsx         # 루트 컴포넌트
│   └── App.css
└── public/
    └── vite.svg
```

### 4.4 기본 스크립트

```json
{
  "scripts": {
    "dev": "vite",           // 개발 서버 (localhost:5173)
    "build": "vite build",   // 프로덕션 빌드
    "preview": "vite preview" // 빌드 미리보기
  }
}
```

---

## 5. 함수 컴포넌트 Best Practices

### 5.1 컴포넌트 정의

```javascript
// 권장: 함수 선언 또는 화살표 함수
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

// 또는
const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);
```

### 5.2 네이밍 규칙

- **컴포넌트**: PascalCase (`UserProfile`, `TodoList`)
- **인스턴스/변수**: camelCase (`userProfile`, `todoList`)
- **props**: camelCase (`onClick`, `userName`)

### 5.3 Custom Hooks

반복되는 로직은 커스텀 훅으로 추출:
```javascript
function useLocalStorage(key, initialValue) {
  // 로직 추상화
}
```

---

## 참고 자료

1. [React v19 공식 블로그](https://react.dev/blog/2024/12/05/react-19)
2. [React 공식 문서 - Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
3. [Vite 공식 문서](https://vite.dev/guide/)
4. [GeeksforGeeks - React useState](https://www.geeksforgeeks.org/reactjs/state-management-in-react-hooks-context-api-and-redux/)
5. [Strapi - Master React useState Patterns](https://strapi.io/blog/react-usestate-hook-guide-best-practices)
6. [Telerik - React Design Patterns 2025](https://www.telerik.com/blogs/react-design-patterns-best-practices)

---

**작성일**: 2026-01-02

# 제6장 React 기초

---

## 학습 목표

이 장을 마치면 다음을 수행할 수 있다:

1. React의 개념과 컴포넌트 기반 개발 방식을 이해할 수 있다
2. JSX 문법을 사용하여 UI를 선언적으로 작성할 수 있다
3. props와 state를 활용하여 동적 컴포넌트를 만들 수 있다
4. 이벤트 처리와 폼을 구현할 수 있다
5. 조건부 렌더링과 리스트 렌더링을 수행할 수 있다

---

## 6.1 React란 무엇인가

### React 소개

**React**는 Facebook(현 Meta)에서 개발한 **사용자 인터페이스(UI) 라이브러리**이다. 2013년 오픈소스로 공개된 이후 웹 프론트엔드 개발의 표준으로 자리잡았다.

React의 핵심 철학은 다음과 같다:

- **선언적(Declarative)**: "어떻게" 보다 "무엇을" 표현
- **컴포넌트 기반(Component-Based)**: 재사용 가능한 UI 조각
- **한 번 배워서 어디서나 사용(Learn Once, Write Anywhere)**: 웹, 모바일(React Native), 데스크톱

### 선언적 UI vs 명령적 UI

**명령적 UI** (Vanilla JavaScript)
```javascript
// DOM을 직접 조작
const button = document.createElement('button');
button.textContent = '클릭: 0';
button.addEventListener('click', () => {
    count++;
    button.textContent = `클릭: ${count}`;
});
document.body.appendChild(button);
```

**선언적 UI** (React)
```jsx
function Counter() {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            클릭: {count}
        </button>
    );
}
```

React는 "현재 상태가 이러하면 UI는 이렇게 보여야 한다"고 **선언**한다. 상태가 변하면 React가 알아서 DOM을 업데이트한다.

### 컴포넌트 기반 아키텍처

React 애플리케이션은 **컴포넌트**(Component)의 조합으로 구성된다. 컴포넌트는 독립적이고 재사용 가능한 UI 단위이다.

```
┌─────────────────────────────────────────────────────────┐
│                       App (루트)                         │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │                    Header                        │   │
│  │  ┌──────────┐  ┌──────────────────────────┐    │   │
│  │  │   Logo   │  │       Navigation         │    │   │
│  │  └──────────┘  └──────────────────────────┘    │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │                     Main                         │   │
│  │  ┌────────────┐  ┌────────────────────────┐    │   │
│  │  │  Sidebar   │  │       Content          │    │   │
│  │  │            │  │  ┌──────┐ ┌──────┐    │    │   │
│  │  │            │  │  │ Post │ │ Post │    │    │   │
│  │  └────────────┘  │  └──────┘ └──────┘    │    │   │
│  │                  └────────────────────────┘    │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │                    Footer                        │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘

※ 그림 6.1 컴포넌트 트리 구조
```

### Virtual DOM

React는 **Virtual DOM**(가상 DOM)을 사용하여 성능을 최적화한다:

1. 상태 변경 시 새로운 Virtual DOM 트리 생성
2. 이전 Virtual DOM과 비교(Diffing)
3. 변경된 부분만 실제 DOM에 반영(Reconciliation)

이 과정으로 불필요한 DOM 조작을 최소화하여 성능을 향상시킨다.

---

## 6.2 개발 환경 설정

### Node.js와 npm

React 개발에는 **Node.js**와 **npm**(Node Package Manager)이 필요하다.

```bash
# 버전 확인
node -v   # v20.x 이상 권장
npm -v    # 10.x 이상
```

### Vite로 프로젝트 생성

**Vite**는 차세대 프론트엔드 빌드 도구로, React 프로젝트의 표준 도구가 되었다.

```bash
# 프로젝트 생성
npm create vite@latest my-react-app -- --template react

# 디렉토리 이동
cd my-react-app

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행된다.

### 프로젝트 구조

```
my-react-app/
├── index.html          # HTML 진입점
├── package.json        # 의존성 및 스크립트
├── vite.config.js      # Vite 설정
├── src/
│   ├── main.jsx        # React 마운트
│   ├── App.jsx         # 루트 컴포넌트
│   ├── App.css         # 앱 스타일
│   └── index.css       # 전역 스타일
└── public/
    └── vite.svg        # 정적 파일
```

**주요 파일 설명**

`main.jsx` - React 애플리케이션의 진입점:
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
```

### npm 스크립트

```json
{
  "scripts": {
    "dev": "vite",           // 개발 서버
    "build": "vite build",   // 프로덕션 빌드
    "preview": "vite preview" // 빌드 미리보기
  }
}
```

---

## 6.3 JSX 문법

### 6.3.1 JSX란?

**JSX**(JavaScript XML)는 JavaScript 안에서 HTML과 유사한 마크업을 작성할 수 있게 해주는 문법이다.

```jsx
// JSX
const element = <h1>안녕하세요, React!</h1>;

// 컴파일 후 (React.createElement)
const element = React.createElement('h1', null, '안녕하세요, React!');
```

JSX는 JavaScript가 아니므로 Babel 같은 트랜스파일러가 변환해준다.

### 6.3.2 JSX 규칙

**규칙 1: 단일 루트 요소**

컴포넌트는 하나의 루트 요소만 반환해야 한다:

```jsx
// 잘못된 예
return (
    <h1>제목</h1>
    <p>내용</p>
);

// 올바른 예 - div로 감싸기
return (
    <div>
        <h1>제목</h1>
        <p>내용</p>
    </div>
);

// 올바른 예 - Fragment 사용 (권장)
return (
    <>
        <h1>제목</h1>
        <p>내용</p>
    </>
);
```

**규칙 2: 모든 태그 닫기**

```jsx
// HTML에서는 허용
<img src="image.jpg">
<input type="text">
<br>

// JSX에서는 반드시 닫아야 함
<img src="image.jpg" />
<input type="text" />
<br />
```

**규칙 3: camelCase 속성**

JSX 속성은 DOM API 규칙을 따라 camelCase로 작성한다.

**표 6.1** HTML vs JSX 속성 차이

| HTML | JSX | 이유 |
|------|-----|------|
| `class` | `className` | JavaScript 예약어 |
| `for` | `htmlFor` | JavaScript 예약어 |
| `onclick` | `onClick` | camelCase 규칙 |
| `tabindex` | `tabIndex` | camelCase 규칙 |
| `stroke-width` | `strokeWidth` | camelCase 규칙 |

**규칙 4: style은 객체로**

```jsx
// HTML
<div style="background-color: blue; font-size: 16px;">

// JSX
<div style={{ backgroundColor: 'blue', fontSize: '16px' }}>
```

### 6.3.3 표현식 삽입

중괄호 `{}`를 사용하여 JavaScript 표현식을 삽입한다:

```jsx
const name = '김철수';
const age = 25;
const isLoggedIn = true;

return (
    <div>
        {/* 변수 */}
        <h1>안녕하세요, {name}님!</h1>

        {/* 표현식 */}
        <p>내년 나이: {age + 1}세</p>

        {/* 조건부 표현 (삼항 연산자) */}
        <p>{isLoggedIn ? '로그인됨' : '로그인 필요'}</p>

        {/* 함수 호출 */}
        <p>현재 시간: {new Date().toLocaleTimeString()}</p>
    </div>
);
```

---

## 6.4 컴포넌트와 Props

### 6.4.1 함수 컴포넌트

**컴포넌트**는 UI를 구성하는 독립적인 단위이다. 함수 컴포넌트는 JSX를 반환하는 JavaScript 함수이다.

```jsx
// 함수 선언문
function Welcome() {
    return <h1>안녕하세요!</h1>;
}

// 화살표 함수
const Greeting = () => {
    return <p>React 세계에 오신 것을 환영합니다.</p>;
};
```

**네이밍 규칙**: 컴포넌트 이름은 반드시 **PascalCase**로 작성한다.

```jsx
// 올바름
function UserCard() { ... }
function PostList() { ... }

// 잘못됨 (HTML 태그로 인식됨)
function userCard() { ... }
```

### 6.4.2 Props 전달

**Props**(Properties)는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법이다.

```jsx
// 부모 컴포넌트
function App() {
    return (
        <UserCard name="김철수" age={25} email="kim@example.com" />
    );
}

// 자식 컴포넌트 - props 객체
function UserCard(props) {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>나이: {props.age}세</p>
            <p>이메일: {props.email}</p>
        </div>
    );
}

// 자식 컴포넌트 - 구조 분해 할당 (권장)
function UserCard({ name, age, email }) {
    return (
        <div>
            <h2>{name}</h2>
            <p>나이: {age}세</p>
            <p>이메일: {email}</p>
        </div>
    );
}
```

```
┌──────────────────────────────────────────────────────┐
│              부모 컴포넌트 (App)                       │
│  state: { user: '김철수' }                            │
│  handleClick 함수                                     │
└────────────────────┬─────────────────────────────────┘
                     │ props로 전달
                     ▼
┌──────────────────────────────────────────────────────┐
│              자식 컴포넌트 (UserCard)                  │
│  props: { name, onClick }                            │
│  렌더링: {props.name}                                 │
└──────────────────────────────────────────────────────┘

✓ 데이터는 위에서 아래로 흐른다 (단방향)
✓ Props는 읽기 전용
✓ 부모만 props 변경 가능

※ 그림 6.2 Props 데이터 흐름
```

**기본값 설정**
```jsx
function Button({ label = '클릭', disabled = false }) {
    return <button disabled={disabled}>{label}</button>;
}
```

### 6.4.3 children props

`children`은 컴포넌트 태그 사이의 내용을 받는 특별한 props이다:

```jsx
// Card 컴포넌트 정의
function Card({ title, children }) {
    return (
        <div className="card">
            <div className="card-header">
                <h3>{title}</h3>
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
    );
}

// 사용
function App() {
    return (
        <Card title="사용자 정보">
            <p>이름: 김철수</p>
            <p>나이: 25세</p>
            <button>수정</button>
        </Card>
    );
}
```

children을 활용하면 유연한 레이아웃 컴포넌트를 만들 수 있다.

_전체 코드는 practice/chapter6/code/6-4-components.jsx 참고_

---

## 6.5 State와 이벤트

### 6.5.1 useState Hook

**State**(상태)는 컴포넌트 내부에서 관리하는 동적 데이터이다. `useState` Hook을 사용하여 state를 선언한다.

```jsx
import { useState } from 'react';

function Counter() {
    // [상태값, 상태변경함수] = useState(초기값)
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>카운트: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
    );
}
```

```
┌─────────────────────────────────────────────────────┐
│               State 업데이트 사이클                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│     State ──────────> UI ──────────> Event          │
│       │    (렌더링)         (사용자 상호작용)  │          │
│       │                                    │          │
│       └────────────────────────────────────┘          │
│                   setState() 호출                     │
│                                                     │
│   setState()가 호출되면 React가 컴포넌트를              │
│   다시 렌더링한다                                      │
└─────────────────────────────────────────────────────┘

※ 그림 6.3 State 업데이트 사이클
```

**함수형 업데이트 (권장)**

이전 상태를 기반으로 업데이트할 때는 함수형 업데이트를 사용한다:

```jsx
// 일반 업데이트 (stale closure 위험)
setCount(count + 1);

// 함수형 업데이트 (권장)
setCount(prev => prev + 1);
```

**불변성 원칙**

React는 상태의 참조가 변경되었는지 확인하여 리렌더링을 결정한다. 따라서 상태는 **불변(immutable)**하게 업데이트해야 한다.

```jsx
// 잘못된 방식 (직접 변경)
user.name = 'Ada';
setUser(user);  // 리렌더링 안 됨!

// 올바른 방식 (새 객체 생성)
setUser({ ...user, name: 'Ada' });
```

**표 6.2** useState 사용 패턴

| 상태 유형 | 업데이트 방법 |
|----------|-------------|
| 숫자/문자열 | `setValue(newValue)` |
| 객체 | `setObj({ ...obj, key: value })` |
| 배열 추가 | `setArr([...arr, newItem])` |
| 배열 삭제 | `setArr(arr.filter(item => item.id !== id))` |
| 배열 수정 | `setArr(arr.map(item => item.id === id ? {...item, ...updates} : item))` |

### 6.5.2 이벤트 처리

React의 이벤트는 camelCase로 작성하고 함수를 전달한다:

```jsx
function EventExample() {
    const handleClick = (event) => {
        console.log('클릭됨!');
        console.log('타겟:', event.target);
    };

    const handleChange = (event) => {
        console.log('입력값:', event.target.value);
    };

    return (
        <div>
            <button onClick={handleClick}>클릭</button>
            <input type="text" onChange={handleChange} />
        </div>
    );
}
```

**주의**: 함수를 호출하지 말고 **참조**를 전달한다.

```jsx
// 올바름 - 함수 참조 전달
<button onClick={handleClick}>

// 잘못됨 - 함수 즉시 실행
<button onClick={handleClick()}>

// 인자 전달이 필요한 경우
<button onClick={() => handleClick(id)}>
```

### 6.5.3 폼 처리

**제어 컴포넌트**(Controlled Component)는 React state로 폼 입력값을 관리한다:

```jsx
function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // 범용 변경 핸들러
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();  // 폼 제출 방지
        console.log('제출:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">이름:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="email">이메일:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">제출</button>
        </form>
    );
}
```

_전체 코드는 practice/chapter6/code/6-5-state-events.jsx 참고_

---

## 6.6 조건부 렌더링과 리스트

### 6.6.1 조건부 렌더링

React에서는 JavaScript 조건문을 사용하여 UI를 조건부로 렌더링한다.

**삼항 연산자**
```jsx
function Greeting({ isLoggedIn }) {
    return (
        <div>
            {isLoggedIn ? <UserPanel /> : <LoginButton />}
        </div>
    );
}
```

**논리 AND 연산자 (&&)**
```jsx
function Notification({ unreadCount }) {
    return (
        <div>
            {unreadCount > 0 && (
                <span className="badge">{unreadCount}</span>
            )}
        </div>
    );
}
```

**if문 (복잡한 조건)**
```jsx
function StatusMessage({ status }) {
    if (status === 'loading') {
        return <p>로딩 중...</p>;
    }

    if (status === 'error') {
        return <p>에러가 발생했습니다.</p>;
    }

    return <p>완료!</p>;
}
```

**표 6.3** 조건부 렌더링 패턴

| 패턴 | 문법 | 적합한 상황 |
|------|------|-----------|
| 삼항 연산자 | `{조건 ? A : B}` | 양쪽 모두 렌더링 필요 |
| AND 연산자 | `{조건 && A}` | 조건이 참일 때만 렌더링 |
| if문 | 조기 반환 | 복잡한 조건, 다중 분기 |

### 6.6.2 리스트 렌더링

**map()으로 리스트 렌더링**

배열의 `map()` 메서드로 요소 목록을 렌더링한다:

```jsx
function TodoList({ todos }) {
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                    {todo.text}
                </li>
            ))}
        </ul>
    );
}
```

**key 속성의 중요성**

`key`는 React가 어떤 항목이 변경, 추가, 삭제되었는지 식별하는 데 사용된다.

```jsx
// 올바름 - 고유한 id 사용
{items.map(item => (
    <Item key={item.id} data={item} />
))}

// 피해야 함 - 인덱스 사용 (정렬/삭제 시 문제)
{items.map((item, index) => (
    <Item key={index} data={item} />
))}
```

**key 규칙**:
- 형제 요소 사이에서 고유해야 함
- 변경되지 않는 값 사용 (id, 고유 문자열)
- 배열 인덱스는 최후의 수단

**복잡한 리스트**
```jsx
function UserList({ users }) {
    if (users.length === 0) {
        return <p>사용자가 없습니다.</p>;
    }

    return (
        <div className="user-list">
            {users.map(user => (
                <div key={user.id} className="user-card">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    {user.isAdmin && <span className="badge">관리자</span>}
                </div>
            ))}
        </div>
    );
}
```

---

## 6.7 실습: Todo 앱 만들기

지금까지 배운 내용을 활용하여 Todo 앱을 만들어보자.

### 요구사항

1. 할 일 목록 표시
2. 새 할 일 추가
3. 완료 상태 토글
4. 할 일 삭제
5. 통계 표시 (전체, 완료, 남음)

### 컴포넌트 설계

```
TodoApp
├── TodoForm        (입력 폼)
├── TodoList        (목록 컨테이너)
│   └── TodoItem    (개별 항목)
├── TodoStats       (통계)
└── 상태: todos 배열
```

### 핵심 코드

**App 컴포넌트 (상태 관리)**
```jsx
function App() {
    const [todos, setTodos] = useState([
        { id: 1, text: 'React 학습하기', completed: false },
        { id: 2, text: 'Todo 앱 만들기', completed: false }
    ]);
    const [nextId, setNextId] = useState(3);

    // 추가
    const handleAdd = (text) => {
        setTodos(prev => [...prev, {
            id: nextId,
            text,
            completed: false
        }]);
        setNextId(prev => prev + 1);
    };

    // 토글
    const handleToggle = (id) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id
                ? { ...todo, completed: !todo.completed }
                : todo
        ));
    };

    // 삭제
    const handleDelete = (id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    return (
        <div className="todo-app">
            <h1>Todo App</h1>
            <TodoStats todos={todos} />
            <TodoForm onAdd={handleAdd} />
            <TodoList
                todos={todos}
                onToggle={handleToggle}
                onDelete={handleDelete}
            />
        </div>
    );
}
```

**TodoForm 컴포넌트**
```jsx
function TodoForm({ onAdd }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        onAdd(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="할 일을 입력하세요"
            />
            <button type="submit">추가</button>
        </form>
    );
}
```

**TodoItem 컴포넌트**
```jsx
function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <li className={todo.completed ? 'completed' : ''}>
            <label>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                />
                <span>{todo.text}</span>
            </label>
            <button onClick={() => onDelete(todo.id)}>삭제</button>
        </li>
    );
}
```

**TodoStats 컴포넌트**
```jsx
function TodoStats({ todos }) {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;

    return (
        <div className="stats">
            <span>전체: {total}</span>
            <span>완료: {completed}</span>
            <span>남음: {total - completed}</span>
        </div>
    );
}
```

_전체 코드는 practice/chapter6/code/6-7-todo-app/ 참고_

---

## 핵심 정리

1. **React란**: 선언적이고 컴포넌트 기반의 UI 라이브러리이다. Virtual DOM으로 효율적인 렌더링을 수행한다.

2. **JSX 규칙**: 단일 루트 요소, 모든 태그 닫기, camelCase 속성(`className`, `htmlFor`), 중괄호 `{}`로 표현식 삽입.

3. **컴포넌트와 Props**: 함수 컴포넌트는 PascalCase로 작성하고, props로 데이터를 전달한다. 데이터는 위에서 아래로 흐른다(단방향).

4. **State와 이벤트**: `useState`로 상태를 관리하고, 상태 변경 시 컴포넌트가 리렌더링된다. 불변성을 유지하며 상태를 업데이트한다.

5. **조건부/리스트 렌더링**: 삼항 연산자, `&&` 연산자로 조건부 렌더링, `map()`으로 리스트 렌더링. `key` 속성은 필수.

6. **제어 컴포넌트**: React state로 폼 입력값을 관리하여 단일 진실 공급원(Single Source of Truth)을 유지한다.

---

## 연습문제

### 기초

**문제 1.** JSX와 HTML의 주요 차이점 3가지를 설명하시오.

**문제 2.** 다음 요구사항에 맞는 컴포넌트를 작성하시오.
- 컴포넌트 이름: `Profile`
- props: `name`, `role`, `imageUrl`
- 프로필 이미지와 이름, 역할을 표시

**문제 3.** props와 state의 차이점을 설명하시오.

### 중급

**문제 4.** 다음 기능을 가진 카운터 컴포넌트를 구현하시오.
- +1, -1, 리셋 버튼
- 현재 값이 0 미만이면 빨간색으로 표시
- 10 이상이면 녹색으로 표시

**문제 5.** 이메일 입력 폼을 구현하시오.
- 이메일 형식 검증 (간단히 @ 포함 여부)
- 유효하지 않으면 에러 메시지 표시
- 제출 시 콘솔에 이메일 출력

**문제 6.** 다음 코드의 문제점을 찾고 수정하시오.
```jsx
function ItemList({ items }) {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index}>{item.name}</li>
            ))}
        </ul>
    );
}
```

### 심화

**문제 7.** 북마크 앱을 구현하시오.
- 북마크 추가 (제목, URL)
- 북마크 삭제
- 북마크 클릭 시 새 탭에서 열기
- 총 북마크 개수 표시

---

## 다음 장 예고

제7장에서는 **Hooks 심화**를 학습한다. `useEffect`로 사이드 이펙트를 처리하고, `useRef`, `useContext` 등 추가 Hooks를 배운다. API 데이터 페칭과 전역 상태 관리 패턴도 다룬다.

---

## 참고문헌

1. React 공식 문서. *Learn React*. https://react.dev/learn
2. Vite 공식 문서. *Getting Started*. https://vite.dev/guide/
3. React 공식 블로그. *React v19*. https://react.dev/blog/2024/12/05/react-19
4. Wieruch, R. *The Road to React*. https://www.roadtoreact.com/
5. Dodds, K.C. *Epic React*. https://epicreact.dev/

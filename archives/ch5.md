# 제5장 JavaScript 핵심

---

## 학습 목표

이 장을 마치면 다음을 수행할 수 있다:

1. JavaScript의 변수, 자료형, 연산자를 이해하고 사용할 수 있다
2. 함수를 선언하고 스코프와 클로저 개념을 설명할 수 있다
3. 객체와 배열을 다루고 주요 배열 메서드를 활용할 수 있다
4. DOM을 조작하여 동적 웹 페이지를 만들 수 있다
5. Promise와 async/await로 비동기 코드를 작성할 수 있다

---

## 5.1 변수, 자료형, 연산자

### JavaScript란?

**JavaScript**(JS)는 웹 페이지에 동적인 기능을 추가하는 프로그래밍 언어이다. HTML이 구조를, CSS가 스타일을 담당한다면, JavaScript는 **동작(behavior)**을 담당한다.

```javascript
// 버튼 클릭 시 인사 메시지 표시
button.addEventListener('click', () => {
    alert('안녕하세요!');
});
```

### 변수 선언: let과 const

ES6(ES2015) 이후 JavaScript에서는 `let`과 `const`를 사용하여 변수를 선언한다.

**let**: 재할당 가능한 변수
```javascript
let count = 0;
count = 1;        // 가능
count = count + 1; // 가능
```

**const**: 재할당 불가능한 상수
```javascript
const PI = 3.14159;
PI = 3;           // 에러! 재할당 불가

const user = { name: '김철수' };
user.name = '이영희';  // 가능! 객체 내부 수정은 허용
```

**var를 지양하는 이유**

`var`는 함수 스코프를 가지며 호이스팅 문제가 발생할 수 있다:

```javascript
console.log(x);  // undefined (에러가 아님!)
var x = 5;

console.log(y);  // ReferenceError
let y = 5;
```

**Best Practice**: 기본적으로 `const`를 사용하고, 재할당이 필요한 경우에만 `let`을 사용한다.

### 자료형

JavaScript는 **동적 타입 언어**(Dynamic Typed Language)로, 변수에 타입을 명시하지 않는다.

**표 5.1** JavaScript 자료형

| 타입 | 설명 | 예시 |
|------|------|------|
| string | 문자열 | `'hello'`, `"world"`, `` `템플릿` `` |
| number | 숫자 (정수, 실수) | `42`, `3.14`, `NaN`, `Infinity` |
| boolean | 참/거짓 | `true`, `false` |
| null | 의도적 빈 값 | `null` |
| undefined | 정의되지 않음 | `undefined` |
| object | 객체 | `{ name: 'Kim' }`, `[1, 2, 3]` |
| symbol | 고유 식별자 | `Symbol('id')` |

```javascript
const name = '김철수';        // string
const age = 25;              // number
const isStudent = true;      // boolean
const address = null;        // null (값 없음을 명시)
let job;                     // undefined (값 할당 전)
const user = { name, age };  // object
```

**typeof 연산자**로 타입을 확인할 수 있다:

```javascript
typeof 'hello'     // 'string'
typeof 42          // 'number'
typeof true        // 'boolean'
typeof undefined   // 'undefined'
typeof null        // 'object' (JavaScript의 유명한 버그)
typeof {}          // 'object'
typeof []          // 'object' (배열도 객체)
```

### 연산자

**산술 연산자**
```javascript
const a = 10, b = 3;
a + b    // 13 (덧셈)
a - b    // 7  (뺄셈)
a * b    // 30 (곱셈)
a / b    // 3.333... (나눗셈)
a % b    // 1  (나머지)
a ** b   // 1000 (거듭제곱)
```

**비교 연산자**
```javascript
5 == '5'    // true  (값만 비교, 타입 변환)
5 === '5'   // false (값과 타입 모두 비교) ✓ 권장
5 != '5'    // false
5 !== '5'   // true  ✓ 권장
```

**Best Practice**: 항상 `===`와 `!==`를 사용하여 타입 변환으로 인한 버그를 방지한다.

**논리 연산자**
```javascript
true && false   // false (AND)
true || false   // true  (OR)
!true           // false (NOT)

// 단축 평가 (Short-circuit evaluation)
const name = user.name || '익명';     // name이 falsy면 '익명'
const admin = user.isAdmin && user;   // isAdmin이 truthy면 user
```

### 템플릿 리터럴

백틱(`)을 사용하여 문자열을 작성하면 변수 삽입과 멀티라인이 가능하다:

```javascript
const name = '김철수';
const age = 25;

// 기존 방식 (문자열 연결)
const msg1 = '이름: ' + name + ', 나이: ' + age + '세';

// 템플릿 리터럴 (권장)
const msg2 = `이름: ${name}, 나이: ${age}세`;

// 멀티라인
const html = `
  <div class="card">
    <h2>${name}</h2>
    <p>${age}세</p>
  </div>
`;
```

---

## 5.2 함수와 스코프

### 5.2.1 함수 선언과 표현식

**함수 선언문 (Function Declaration)**
```javascript
function greet(name) {
    return `안녕하세요, ${name}님!`;
}

greet('김철수');  // '안녕하세요, 김철수님!'
```

**함수 표현식 (Function Expression)**
```javascript
const greet = function(name) {
    return `안녕하세요, ${name}님!`;
};

greet('이영희');  // '안녕하세요, 이영희님!'
```

**차이점**: 함수 선언문은 호이스팅되어 선언 전에 호출 가능하지만, 함수 표현식은 불가능하다.

### 5.2.2 화살표 함수

ES6에서 도입된 **화살표 함수**(Arrow Function)는 간결한 문법을 제공한다:

```javascript
// 기존 함수
const add = function(a, b) {
    return a + b;
};

// 화살표 함수
const add = (a, b) => a + b;

// 매개변수가 하나면 괄호 생략 가능
const double = n => n * 2;

// 본문이 여러 줄이면 중괄호 사용
const greet = name => {
    const message = `안녕하세요, ${name}님!`;
    return message;
};
```

**화살표 함수의 this**

화살표 함수는 자신만의 `this`를 가지지 않고 외부 스코프의 `this`를 사용한다:

```javascript
const counter = {
    count: 0,

    // 일반 함수: this는 counter 객체
    increment: function() {
        setTimeout(function() {
            this.count++;  // this는 window (문제!)
        }, 1000);
    },

    // 화살표 함수: 외부의 this 사용
    incrementArrow: function() {
        setTimeout(() => {
            this.count++;  // this는 counter (정상)
        }, 1000);
    }
};
```

### 5.2.3 스코프와 클로저

**스코프**(Scope)는 변수가 유효한 범위를 의미한다.

```
┌─────────────────────────────────────────────────────┐
│                   전역 스코프                         │
│  const APP_NAME = 'MyApp'                           │
│  let userCount = 0                                  │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │            함수 스코프                        │   │
│  │  function greetUser(name) {                 │   │
│  │    const greeting = 'Hello'                 │   │
│  │                                             │   │
│  │    ┌─────────────────────────────────────┐ │   │
│  │    │          블록 스코프                  │ │   │
│  │    │  if (name) {                        │ │   │
│  │    │    let message = greeting + name    │ │   │
│  │    │  }                                  │ │   │
│  │    └─────────────────────────────────────┘ │   │
│  │  }                                          │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘

※ 그림 5.1 스코프 체인
```

**클로저**(Closure)는 함수가 자신이 생성된 환경을 기억하는 특성이다:

```javascript
function createCounter() {
    let count = 0;  // 외부에서 직접 접근 불가

    return {
        increment() { count++; },
        decrement() { count--; },
        getCount() { return count; }
    };
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.getCount());  // 2
console.log(counter.count);       // undefined (비공개)
```

클로저는 **데이터 은닉**과 **상태 유지**에 유용하다.

---

## 5.3 객체와 배열

### 5.3.1 객체 리터럴과 프로퍼티

**객체**(Object)는 키-값 쌍의 집합이다:

```javascript
// 객체 생성
const user = {
    name: '김철수',
    age: 25,
    email: 'kim@example.com',

    // 메서드 (객체 내 함수)
    greet() {
        return `안녕하세요, ${this.name}입니다.`;
    }
};

// 프로퍼티 접근
console.log(user.name);         // 점 표기법
console.log(user['email']);     // 대괄호 표기법

// 프로퍼티 수정/추가
user.age = 26;
user.phone = '010-1234-5678';

// 메서드 호출
console.log(user.greet());
```

**단축 속성명과 계산된 속성명**
```javascript
const name = '김철수';
const age = 25;

// 단축 속성명 (키와 변수명이 같을 때)
const user = { name, age };  // { name: '김철수', age: 25 }

// 계산된 속성명
const key = 'email';
const obj = {
    [key]: 'kim@example.com',
    [`user_${name}`]: true
};
```

### 5.3.2 배열 메서드

배열은 순서가 있는 데이터의 집합이다. 주요 배열 메서드를 알아보자.

**표 5.2** 주요 배열 메서드

| 메서드 | 설명 | 반환값 |
|--------|------|--------|
| `forEach()` | 각 요소에 함수 실행 | `undefined` |
| `map()` | 각 요소를 변환 | 새 배열 |
| `filter()` | 조건에 맞는 요소 추출 | 새 배열 |
| `reduce()` | 누적하여 단일 값 생성 | 단일 값 |
| `find()` | 첫 번째 매칭 요소 | 요소 또는 `undefined` |
| `some()` | 하나라도 조건 충족? | `boolean` |
| `every()` | 모두 조건 충족? | `boolean` |

**map - 변환**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

const users = [
    { name: '김철수', age: 25 },
    { name: '이영희', age: 30 }
];
const names = users.map(user => user.name);
// ['김철수', '이영희']
```

**filter - 필터링**
```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4, 6]

const adults = users.filter(user => user.age >= 20);
```

**reduce - 누적**
```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
// 15

// 객체로 그룹화
const items = ['apple', 'banana', 'apple', 'orange'];
const counts = items.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
}, {});
// { apple: 2, banana: 1, orange: 1 }
```

**메서드 체이닝**
```javascript
const users = [
    { name: '김철수', age: 25, active: true },
    { name: '이영희', age: 30, active: false },
    { name: '박민수', age: 22, active: true }
];

// 활성 사용자의 이름을 나이순으로 정렬
const result = users
    .filter(user => user.active)        // 활성 사용자만
    .sort((a, b) => a.age - b.age)      // 나이순 정렬
    .map(user => user.name);            // 이름만 추출

// ['박민수', '김철수']
```

_전체 코드는 practice/chapter5/code/5-3-array-methods.js 참고_

### 5.3.3 구조 분해 할당과 스프레드

**구조 분해 할당**(Destructuring)은 객체나 배열에서 값을 추출하는 문법이다:

```javascript
// 객체 구조 분해
const user = { name: '김철수', age: 25, email: 'kim@example.com' };
const { name, age } = user;
console.log(name);  // '김철수'

// 별칭 사용
const { name: userName, email: userEmail } = user;

// 기본값
const { phone = '없음' } = user;

// 배열 구조 분해
const colors = ['red', 'green', 'blue'];
const [first, second] = colors;
console.log(first);  // 'red'

// 일부 건너뛰기
const [, , third] = colors;
console.log(third);  // 'blue'
```

**스프레드 연산자**(Spread Operator)는 배열이나 객체를 펼친다:

```javascript
// 배열 복사/병합
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]

// 객체 복사/병합
const user = { name: '김철수', age: 25 };
const updatedUser = { ...user, age: 26, city: '서울' };
// { name: '김철수', age: 26, city: '서울' }

// 함수 인수로 전달
const numbers = [1, 5, 3, 9, 2];
Math.max(...numbers);  // 9
```

---

## 5.4 DOM 조작

### DOM이란?

**DOM**(Document Object Model)은 HTML 문서를 JavaScript가 조작할 수 있는 객체 트리로 표현한 것이다. 브라우저는 HTML을 파싱하여 DOM 트리를 생성한다.

```
HTML 문서                    DOM 트리
┌──────────────┐            ┌─────────────┐
│ <html>       │            │  document   │
│   <head>     │   파싱     │      │      │
│     <title>  │  ───────>  │    html     │
│   </head>    │            │   /    \    │
│   <body>     │            │ head   body │
│     <div>    │            │  │    / \   │
│   </body>    │            │title div ...│
│ </html>      │            └─────────────┘
└──────────────┘
                            ※ 그림 5.2 DOM 트리 구조
```

### 5.4.1 요소 선택

**querySelector / querySelectorAll**

CSS 선택자를 사용하여 요소를 선택한다:

```javascript
// 단일 요소 (첫 번째 매칭)
const title = document.querySelector('h1');
const app = document.querySelector('#app');
const firstBtn = document.querySelector('.btn');
const nav = document.querySelector('nav[aria-label="주 메뉴"]');

// 여러 요소 (NodeList 반환)
const allBtns = document.querySelectorAll('.btn');
const items = document.querySelectorAll('li');

// NodeList 순회
allBtns.forEach(btn => {
    console.log(btn.textContent);
});
```

**기타 선택 메서드**
```javascript
document.getElementById('app');           // ID로 선택
document.getElementsByClassName('btn');   // 클래스로 선택
document.getElementsByTagName('div');     // 태그로 선택
```

**Best Practice**: `querySelector`와 `querySelectorAll`을 사용하면 CSS 선택자 문법으로 통일된 방식의 선택이 가능하다.

### 5.4.2 요소 생성, 수정, 삭제

**요소 생성과 추가**
```javascript
// 요소 생성
const card = document.createElement('div');
card.className = 'card';

// 제목 추가
const title = document.createElement('h3');
title.textContent = '새 카드';
card.appendChild(title);

// DOM에 추가
document.querySelector('#container').appendChild(card);
```

**콘텐츠 수정**
```javascript
const element = document.querySelector('.message');

// textContent: 텍스트만 설정 (안전, XSS 방지)
element.textContent = '안녕하세요';

// innerHTML: HTML 파싱 (보안 주의)
element.innerHTML = '<strong>강조</strong> 텍스트';
```

**클래스 조작**
```javascript
const element = document.querySelector('.box');

element.classList.add('active');       // 추가
element.classList.remove('active');    // 제거
element.classList.toggle('active');    // 토글
element.classList.contains('active');  // 포함 여부 (boolean)
```

**속성 조작**
```javascript
element.setAttribute('data-id', '123');
element.getAttribute('data-id');
element.removeAttribute('data-id');

// dataset으로 data-* 속성 접근
element.dataset.id = '123';  // data-id="123"
```

**요소 제거**
```javascript
element.remove();  // 자신 제거
parent.removeChild(child);  // 자식 제거
```

### 5.4.3 이벤트 리스너

**addEventListener**로 이벤트를 처리한다:

```javascript
const button = document.querySelector('#myButton');

button.addEventListener('click', (event) => {
    console.log('클릭됨!');
    console.log('타겟:', event.target);
    console.log('좌표:', event.clientX, event.clientY);
});
```

**이벤트 옵션**
```javascript
// once: 한 번만 실행
button.addEventListener('click', handler, { once: true });

// passive: 스크롤 성능 최적화
element.addEventListener('scroll', handler, { passive: true });
```

**이벤트 위임 (Event Delegation)**

이벤트 버블링을 활용하여 부모 요소에서 자식 이벤트를 처리한다:

```javascript
// 비효율적: 각 항목에 리스너 등록
document.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', handler);
});

// 효율적: 부모에 리스너 등록 (이벤트 위임)
document.querySelector('ul').addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        console.log('클릭된 항목:', event.target.textContent);
    }

    // 삭제 버튼 처리
    if (event.target.classList.contains('delete-btn')) {
        event.target.closest('li').remove();
    }
});
```

이벤트 위임의 **장점**:
- 메모리 효율성 (리스너 하나로 다수 요소 처리)
- 동적으로 추가된 요소도 자동 처리
- 코드 간결화

_전체 코드는 practice/chapter5/code/5-4-dom-manipulation.js와 5-4-dom-demo.html 참고_

---

## 5.5 비동기 프로그래밍

### 동기 vs 비동기

**동기**(Synchronous)는 코드가 순서대로 실행되어 앞 작업이 끝나야 다음 작업이 시작된다.

**비동기**(Asynchronous)는 작업 완료를 기다리지 않고 다음 코드를 실행한다.

```javascript
console.log('1. 시작');

setTimeout(() => {
    console.log('2. 타이머 완료');
}, 1000);

console.log('3. 끝');

// 출력 순서: 1 → 3 → 2
```

```
┌─────────────────────────────────────────────────────────────┐
│                     비동기 처리 흐름                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   콜 스택        Web API          태스크 큐     이벤트 루프   │
│  ┌───────┐                       ┌───────┐                  │
│  │ main  │                       │       │                  │
│  └───────┘                       └───────┘                  │
│      │                                                      │
│      ▼          fetch 요청                                  │
│  fetch() ─────────────────> [서버 요청 대기]                 │
│      │                           │                          │
│      ▼                           │                          │
│  다음 코드                        │                          │
│  계속 실행                        ▼                          │
│      │                      응답 완료                        │
│      │                           │                          │
│      │              ┌────────────┘                          │
│      │              ▼                                       │
│      │         [콜백 등록] ──────> 큐에 추가                  │
│      │                                  │                   │
│      ▼                                  │                   │
│  스택 비어있음 <───────────── 이벤트 루프 확인                │
│      │                                                      │
│      ▼                                                      │
│  콜백 실행                                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

※ 그림 5.3 비동기 처리 흐름
```

### 5.5.1 콜백과 콜백 지옥

**콜백**(Callback)은 다른 함수에 인자로 전달되어 나중에 실행되는 함수이다:

```javascript
function fetchData(callback) {
    setTimeout(() => {
        const data = { id: 1, name: '데이터' };
        callback(data);
    }, 1000);
}

fetchData((data) => {
    console.log('받은 데이터:', data);
});
```

**콜백 지옥**(Callback Hell)은 콜백이 중첩되어 코드 가독성이 떨어지는 상황이다:

```javascript
// 안티패턴: 콜백 지옥
getUser(userId, (user) => {
    getPosts(user.id, (posts) => {
        getComments(posts[0].id, (comments) => {
            // 더 깊은 중첩...
        });
    });
});
```

### 5.5.2 Promise

**Promise**는 비동기 작업의 결과를 나타내는 객체로, 콜백 지옥을 해결한다.

**Promise 생성**
```javascript
const promise = new Promise((resolve, reject) => {
    const success = true;

    if (success) {
        resolve({ id: 1, name: '성공 데이터' });
    } else {
        reject(new Error('실패'));
    }
});
```

**Promise 사용**
```javascript
promise
    .then(data => {
        console.log('성공:', data);
        return data.id;  // 다음 then으로 전달
    })
    .then(id => {
        console.log('ID:', id);
    })
    .catch(error => {
        console.error('실패:', error.message);
    })
    .finally(() => {
        console.log('완료 (성공/실패 무관)');
    });
```

**Promise.all - 병렬 실행**
```javascript
const promise1 = fetch('/api/users');
const promise2 = fetch('/api/posts');

Promise.all([promise1, promise2])
    .then(([users, posts]) => {
        // 두 요청 모두 완료
    })
    .catch(error => {
        // 하나라도 실패하면 실행
    });
```

**Promise.allSettled**
```javascript
Promise.allSettled([promise1, promise2, promise3])
    .then(results => {
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                console.log('성공:', result.value);
            } else {
                console.log('실패:', result.reason);
            }
        });
    });
```

**표 5.3** 비동기 패턴 비교

| 패턴 | 장점 | 단점 |
|------|------|------|
| 콜백 | 단순함 | 중첩 시 가독성 저하 |
| Promise | 체이닝, 에러 처리 | 체인이 길면 복잡 |
| async/await | 동기 코드처럼 작성 | try-catch 필요 |

### 5.5.3 async/await

`async/await`는 Promise를 동기 코드처럼 작성할 수 있게 해주는 문법이다.

```javascript
async function fetchUserData() {
    try {
        const response = await fetch('/api/user');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('에러:', error);
        return null;
    }
}
```

**병렬 vs 순차 실행**
```javascript
// 순차 실행 (느림)
const user = await fetchUser();
const posts = await fetchPosts();

// 병렬 실행 (빠름)
const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
]);
```

### 5.5.4 fetch API

**fetch**는 네트워크 요청을 보내는 내장 API이다.

**GET 요청**
```javascript
async function getPosts() {
    const response = await fetch('https://api.example.com/posts');

    // 중요: fetch는 HTTP 에러(4xx, 5xx)에서 예외를 던지지 않음
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}
```

**POST 요청**
```javascript
async function createPost(title, body) {
    const response = await fetch('https://api.example.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}
```

**완전한 에러 처리 패턴**
```javascript
async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        if (error.name === 'TypeError') {
            console.error('네트워크 오류');
        } else {
            console.error('요청 실패:', error.message);
        }
        return null;
    }
}
```

_전체 코드는 practice/chapter5/code/5-5-async-examples.js 참고_

---

## 5.6 모듈 시스템

### 모듈이 필요한 이유

대규모 애플리케이션에서는 코드를 **모듈**(Module) 단위로 분리하여 관리한다:

- **재사용성**: 같은 코드를 여러 곳에서 사용
- **유지보수성**: 기능별로 파일 분리
- **네임스페이스**: 변수명 충돌 방지
- **의존성 관리**: 필요한 기능만 가져오기

### 5.6.1 ES6 import/export

**Named Export (이름 있는 내보내기)**

```javascript
// utils.js
export const API_URL = 'https://api.example.com';

export function formatDate(date) {
    return date.toLocaleDateString('ko-KR');
}

export function formatCurrency(amount) {
    return amount.toLocaleString('ko-KR') + '원';
}
```

```javascript
// main.js
import { API_URL, formatDate, formatCurrency } from './utils.js';

console.log(API_URL);
console.log(formatDate(new Date()));
```

**Default Export (기본 내보내기)**

```javascript
// User.js
export default class User {
    constructor(name) {
        this.name = name;
    }

    greet() {
        return `안녕하세요, ${this.name}입니다.`;
    }
}
```

```javascript
// main.js
import User from './User.js';  // 이름 자유롭게 지정 가능

const user = new User('김철수');
```

**혼합 사용**
```javascript
// api.js
export const BASE_URL = 'https://api.example.com';

export async function get(endpoint) { /* ... */ }
export async function post(endpoint, data) { /* ... */ }

export default {
    get,
    post
};
```

```javascript
// main.js
import api, { BASE_URL } from './api.js';

api.get('/users');
```

### 5.6.2 모듈 구조 설계

**권장 폴더 구조**
```
src/
├── components/       # UI 컴포넌트
│   ├── Header.js
│   └── Footer.js
├── services/         # API 호출
│   └── api.js
├── utils/            # 유틸리티 함수
│   ├── format.js
│   └── validation.js
├── constants/        # 상수
│   └── config.js
└── main.js           # 진입점
```

**HTML에서 모듈 사용**
```html
<script type="module" src="main.js"></script>
```

`type="module"`을 지정하면 ES6 모듈 시스템을 사용할 수 있다.

---

## 5.7 실습: 더미 API 연동

JSONPlaceholder API를 사용하여 게시글 목록을 불러오고 화면에 표시하는 실습을 진행한다.

### JSONPlaceholder API

**JSONPlaceholder**는 개발 및 테스트용 무료 REST API이다:

- 기본 URL: `https://jsonplaceholder.typicode.com`
- 제공 데이터: posts, users, comments, albums, photos, todos

### 구현 요구사항

1. 게시글 10개를 API에서 불러온다
2. 각 게시글의 작성자 정보도 함께 표시한다
3. 로딩/에러 상태를 처리한다

### 핵심 코드

**API 호출 함수**
```javascript
async function fetchPostsWithAuthors(limit = 10) {
    // 1. 게시글 가져오기
    const posts = await fetchPosts(limit);

    // 2. 고유한 userId 추출
    const userIds = [...new Set(posts.map(post => post.userId))];

    // 3. 사용자 정보 병렬로 가져오기
    const users = await Promise.all(
        userIds.map(id => fetchUser(id))
    );

    // 4. userId를 키로 하는 맵 생성
    const userMap = users.reduce((map, user) => {
        map[user.id] = user;
        return map;
    }, {});

    // 5. 게시글에 작성자 정보 추가
    return posts.map(post => ({
        ...post,
        author: userMap[post.userId]
    }));
}
```

**상태 관리**
```javascript
function showLoading() {
    elements.loadingStatus.classList.remove('hidden');
    elements.postList.classList.add('hidden');
    elements.errorMessage.classList.add('hidden');
}

function showSuccess() {
    elements.loadingStatus.classList.add('hidden');
    elements.postList.classList.remove('hidden');
}

function showError(message) {
    elements.loadingStatus.classList.add('hidden');
    elements.errorMessage.classList.remove('hidden');
    elements.errorDetail.textContent = message;
}
```

**메인 로드 함수**
```javascript
async function loadPosts() {
    showLoading();

    try {
        const posts = await fetchPostsWithAuthors(10);
        renderPosts(posts);
        showSuccess();
    } catch (error) {
        console.error('게시글 로드 실패:', error);
        showError(error.message);
    }
}

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', loadPosts);
```

_전체 코드는 practice/chapter5/code/5-7-api-demo.html과 5-7-api-demo.js 참고_

---

## 핵심 정리

1. **변수와 상수**: `const`를 기본으로 사용하고, 재할당이 필요한 경우에만 `let`을 사용한다. `var`는 지양한다.

2. **화살표 함수**: 간결한 문법과 lexical `this` 바인딩을 제공한다. 콜백 함수에 적합하다.

3. **배열 메서드**: `map`(변환), `filter`(필터링), `reduce`(누적)를 상황에 맞게 선택하고, 메서드 체이닝으로 간결하게 작성한다.

4. **DOM 조작**: `querySelector`로 요소를 선택하고, `addEventListener`로 이벤트를 처리한다. 다수 요소는 이벤트 위임을 활용한다.

5. **비동기 프로그래밍**: `async/await`로 가독성 높은 비동기 코드를 작성하고, `try-catch`로 에러를 처리한다. `fetch`는 HTTP 에러에서 예외를 던지지 않으므로 `response.ok`를 확인해야 한다.

6. **모듈 시스템**: `import/export`로 코드를 분리하여 재사용성과 유지보수성을 높인다.

---

## 연습문제

### 기초

**문제 1.** `let`, `const`, `var`의 차이점을 스코프와 재할당 관점에서 설명하시오.

**문제 2.** 다음 함수를 화살표 함수로 변환하시오.
```javascript
function multiply(a, b) {
    return a * b;
}
```

**문제 3.** 다음 배열에서 짝수만 골라 2배로 만든 새 배열을 `filter`와 `map`을 사용하여 만드시오.
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

### 중급

**문제 4.** DOM을 사용하여 다음 기능을 구현하시오.
- 입력 필드와 버튼이 있는 폼
- 버튼 클릭 시 입력 값을 리스트에 추가
- 각 항목에 삭제 버튼 추가 (이벤트 위임 사용)

**문제 5.** 다음 콜백 기반 코드를 Promise 체이닝으로 변환하시오.
```javascript
getUserById(1, (user) => {
    getPostsByUser(user.id, (posts) => {
        console.log(posts);
    });
});
```

**문제 6.** 문제 5의 코드를 다시 `async/await`로 변환하시오.

### 심화

**문제 7.** JSONPlaceholder API를 사용하여 다음 기능을 구현하시오.
- 특정 사용자의 게시글 목록 표시
- 게시글 클릭 시 해당 게시글의 댓글 목록 표시
- 로딩/에러 상태 처리
- 새로고침 버튼

---

## 다음 장 예고

제6장에서는 **React 기초**를 학습한다. 컴포넌트 기반 UI 개발, JSX 문법, props와 state, 이벤트 처리, 조건부 렌더링과 리스트 렌더링을 다룬다. 이번 장에서 배운 JavaScript 핵심 지식이 React 개발의 기반이 된다.

---

## 참고문헌

1. MDN Web Docs. *JavaScript Guide*. https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide
2. JavaScript.info. *The Modern JavaScript Tutorial*. https://javascript.info/
3. Haverbeke, M. *Eloquent JavaScript* (4th ed.). https://eloquentjavascript.net/
4. Simpson, K. *You Don't Know JS* (2nd ed.). https://github.com/getify/You-Dont-Know-JS
5. JSONPlaceholder. *Free Fake REST API*. https://jsonplaceholder.typicode.com/

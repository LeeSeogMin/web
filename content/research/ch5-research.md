# 제5장 리서치 결과: JavaScript 핵심

**조사일**: 2026-01-01

---

## 1. ES6+ 핵심 기능

### 1.1 let과 const

**블록 스코프 (Block Scope)**
- `let`: 재할당 가능한 블록 스코프 변수
- `const`: 재할당 불가능한 상수 선언
- `var` 지양: 함수 스코프로 인한 호이스팅 문제 발생

**Best Practice**
- 기본적으로 `const` 사용
- 재할당이 필요한 경우에만 `let` 사용
- `var`는 레거시 코드 유지보수 시에만 사용

### 1.2 화살표 함수 (Arrow Functions)

**특징**
- 간결한 문법: `function` 키워드 불필요
- 암묵적 반환: 단일 표현식일 때 `return` 생략 가능
- Lexical `this`: 외부 스코프의 `this` 바인딩 유지

**주의사항**
- 생성자 함수로 사용 불가 (`new` 사용 시 TypeError)
- `arguments` 객체 없음
- 제너레이터 함수로 사용 불가 (`yield` 사용 불가)

### 1.3 템플릿 리터럴 (Template Literals)

**기능**
- 백틱(`) 사용
- 변수/표현식 삽입: `${expression}`
- 멀티라인 문자열 지원
- 문자열 연결(concatenation) 대체

---

## 2. 배열 메서드

### 2.1 메서드 선택 기준

| 메서드 | 목적 | 반환값 |
|--------|------|--------|
| `forEach()` | 부수 효과 (side effects) | `undefined` |
| `map()` | 변환 (transformation) | 새 배열 |
| `filter()` | 선택 (selection) | 새 배열 |
| `reduce()` | 누적 (accumulation) | 단일 값 |
| `find()` | 첫 번째 매칭 요소 | 요소 또는 `undefined` |
| `some()` | 조건 충족 여부 | `boolean` |

### 2.2 성능 최적화

**효율적인 체이닝 순서**
1. `filter()` - 먼저 필터링
2. `map()` - 변환
3. `sort()` - 마지막에 정렬

**Anti-Pattern**
- `map()` 반환값을 사용하지 않으면 안티패턴 → `forEach()` 사용
- `filter().length > 0` 대신 `some()` 사용 (조기 종료)

### 2.3 메서드 체이닝

- `map()`과 `filter()`는 새 배열 반환 → 체이닝 가능
- `reduce()`가 배열이 아닌 값 반환 시 체인 끝에 위치
- `forEach()`는 `undefined` 반환 → 체인 끝에 위치

---

## 3. 비동기 프로그래밍

### 3.1 에러 처리 패턴

**패턴 1: try-catch 블록** (가장 일반적)
```javascript
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

**패턴 2: .catch() 체이닝**
```javascript
fetchData().catch(error => console.error(error));
```

**패턴 3: Mix and Match**
- `await`로 데이터 획득
- `.catch()`로 에러 처리

### 3.2 fetch() 주의사항

**중요**: `fetch()`는 HTTP 에러 상태(4xx, 5xx)에서 예외를 던지지 않음
- `response.ok` 확인 필수
- 수동으로 에러 던지기 필요

```javascript
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}
```

### 3.3 고급 패턴

**Promise.allSettled()**
- 모든 Promise 완료 대기 (성공/실패 무관)
- 각 결과를 개별 처리 가능

**AbortController**
- 타임아웃 설정
- 요청 취소 기능

**Retry with Exponential Backoff**
- 네트워크 불안정 대응
- 서버 과부하 방지

### 3.4 Best Practices

1. 단순 작업: 콜백 (중첩 피하기)
2. 깔끔한 비동기: Promise
3. 가독성/유지보수: async/await (권장)
4. 에러 처리: try-catch 또는 .catch() 필수
5. 병렬 실행: Promise.all() 활용

---

## 4. DOM 조작

### 4.1 요소 선택

**querySelector()**
- CSS 선택자 문법 지원
- 첫 번째 매칭 요소 반환
- 매칭 없으면 `null` 반환

**querySelectorAll()**
- 모든 매칭 요소를 NodeList로 반환
- `forEach()` 지원 (모던 NodeList)

### 4.2 addEventListener()

**문법**
```javascript
element.addEventListener(eventType, callback[, options]);
```

**옵션 객체**
- `once: true` - 한 번만 실행 후 자동 제거
- `passive: true` - 스크롤 성능 최적화
- `capture: true` - 캡처링 단계에서 실행

### 4.3 이벤트 위임 (Event Delegation)

**개념**
- 부모 요소에 이벤트 리스너 등록
- 이벤트 버블링 활용
- 동적 요소에 효과적

**장점**
- 메모리 효율성 (하나의 리스너)
- 동적 추가 요소도 자동 처리
- 코드 간결화

### 4.4 Best Practices

1. **관심사 분리**: HTML과 JavaScript 로직 분리
2. **Named Handler**: 익명 함수 대신 명명된 함수 사용
3. **DOMContentLoaded**: DOM 준비 후 코드 실행
4. **이벤트 위임**: 다수 요소 처리 시 권장

---

## 5. 모듈 시스템

### 5.1 ES6 Modules

**named export**
```javascript
export const name = 'value';
export function func() {}
```

**default export**
```javascript
export default function() {}
```

**import**
```javascript
import { name, func } from './module.js';
import defaultExport from './module.js';
```

### 5.2 장점

- 코드 재사용성
- 네임스페이스 격리
- 의존성 명시적 관리
- Tree-shaking 지원

---

## 참고 자료

1. [MDN - Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
2. [MDN - Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
3. [MDN - How to use promises](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
4. [MDN - querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
5. [MDN - addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
6. [JavaScript.info - async/await](https://javascript.info/async-await)
7. [freeCodeCamp - JavaScript Map, Reduce, and Filter](https://www.freecodecamp.org/news/javascript-map-reduce-and-filter-explained-with-examples/)

---

**작성일**: 2026-01-01

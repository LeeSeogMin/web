# 제5장 집필계획서: JavaScript 핵심

---

## 1. 장 개요

| 항목 | 내용 |
|------|------|
| 장 번호 | 5 |
| 장 제목 | JavaScript 핵심 |
| 목표 분량 | 700-800줄 (기술 심화 장) |
| 예상 페이지 | 약 45쪽 |
| 이론:실습 비율 | 50:50 |
| 선수 지식 | 3장(HTML), 4장(CSS) |

---

## 2. 학습 목표

이 장을 마치면 다음을 수행할 수 있다:
1. JavaScript의 변수, 자료형, 연산자를 이해하고 사용할 수 있다
2. 함수를 선언하고 스코프와 클로저 개념을 설명할 수 있다
3. 객체와 배열을 다루고 주요 배열 메서드를 활용할 수 있다
4. DOM을 조작하여 동적 웹 페이지를 만들 수 있다
5. Promise와 async/await로 비동기 코드를 작성할 수 있다

---

## 3. 절 구성 및 분량 배분

### 5.1 변수, 자료형, 연산자 (약 80줄)
- JavaScript란?
- 변수 선언: let, const (var 지양)
- 자료형: string, number, boolean, null, undefined, object
- 연산자: 산술, 비교, 논리
- 템플릿 리터럴
- **표 5.1**: 자료형 정리

### 5.2 함수와 스코프 (약 100줄)
- 5.2.1 함수 선언과 표현식
  - function 키워드
  - 함수 표현식
- 5.2.2 화살표 함수
  - 문법
  - this 바인딩 차이
- 5.2.3 클로저의 이해
  - 스코프 체인
  - 클로저 정의와 활용
- **그림 5.1**: 스코프 체인

### 5.3 객체와 배열 (약 120줄)
- 5.3.1 객체 리터럴과 프로퍼티
  - 객체 생성
  - 프로퍼티 접근/수정
  - 메서드 정의
- 5.3.2 배열 메서드
  - map, filter, reduce, find, forEach
  - 메서드 체이닝
  - **표 5.2**: 배열 메서드 정리
- 5.3.3 구조 분해 할당과 스프레드
  - 객체/배열 구조 분해
  - 스프레드 연산자 활용

### 5.4 DOM 조작 (약 120줄)
- DOM이란?
- 5.4.1 요소 선택
  - querySelector, querySelectorAll
  - getElementById 등
- 5.4.2 요소 생성, 수정, 삭제
  - createElement, appendChild
  - textContent, innerHTML
  - classList 조작
- 5.4.3 이벤트 리스너
  - addEventListener
  - 이벤트 객체
  - 이벤트 위임
- **그림 5.2**: DOM 트리 구조

### 5.5 비동기 프로그래밍 (약 150줄)
- 동기 vs 비동기
- 5.5.1 콜백과 콜백 지옥
- 5.5.2 Promise
  - Promise 생성
  - then, catch, finally
  - Promise.all
- 5.5.3 async/await
  - 문법
  - 에러 처리 (try-catch)
- 5.5.4 fetch API
  - GET, POST 요청
  - JSON 처리
  - 에러 처리 패턴
- **그림 5.3**: 비동기 처리 흐름
- **표 5.3**: 비동기 패턴 비교

### 5.6 모듈 시스템 (약 60줄)
- 모듈이 필요한 이유
- 5.6.1 ES6 import/export
  - named export
  - default export
- 5.6.2 모듈 구조 설계
  - 폴더 구조 예시

### 5.7 실습: 더미 API 연동 (약 70줄)
- JSONPlaceholder API 소개
- 게시글 목록 불러오기
- 로딩/에러 상태 처리
- 완성 코드 예제

---

## 4. 핵심 개념 및 용어

| 용어 | 영문 | 정의 |
|------|------|------|
| 변수 | Variable | 데이터를 저장하는 이름 붙은 공간 |
| 스코프 | Scope | 변수가 유효한 범위 |
| 클로저 | Closure | 외부 함수의 변수를 기억하는 함수 |
| DOM | Document Object Model | HTML을 객체로 표현한 모델 |
| 비동기 | Asynchronous | 순서대로 실행되지 않는 코드 |
| Promise | Promise | 비동기 작업의 결과를 나타내는 객체 |
| 콜백 | Callback | 다른 함수에 전달되어 나중에 실행되는 함수 |
| 모듈 | Module | 독립적인 기능을 가진 코드 단위 |

---

## 5. 다이어그램 계획

| 번호 | 제목 | 유형 | 설명 |
|------|------|------|------|
| 그림 5.1 | 스코프 체인 | 계층 다이어그램 | 전역-함수-블록 스코프 |
| 그림 5.2 | DOM 트리 구조 | 트리 다이어그램 | HTML → DOM 변환 |
| 그림 5.3 | 비동기 처리 흐름 | 시퀀스 다이어그램 | 콜스택, 이벤트 루프 |

---

## 6. 표 계획

| 번호 | 제목 | 내용 |
|------|------|------|
| 표 5.1 | JavaScript 자료형 | 타입, 예시, 특징 |
| 표 5.2 | 배열 메서드 정리 | 메서드, 반환값, 용도 |
| 표 5.3 | 비동기 패턴 비교 | 콜백, Promise, async/await |

---

## 7. 실습 코드 계획

| 파일명 | 내용 | 위치 |
|--------|------|------|
| 5-3-array-methods.js | 배열 메서드 예제 | practice/chapter5/code/ |
| 5-4-dom-manipulation.js | DOM 조작 예제 | practice/chapter5/code/ |
| 5-5-async-examples.js | 비동기 패턴 예제 | practice/chapter5/code/ |
| 5-7-api-demo.html | API 연동 완성본 | practice/chapter5/code/ |
| 5-7-api-demo.js | API 연동 스크립트 | practice/chapter5/code/ |

---

## 8. 연습문제 계획

| 번호 | 난이도 | 유형 | 내용 |
|------|--------|------|------|
| 1 | 기초 | 개념 | let, const, var 차이 |
| 2 | 기초 | 코드 작성 | 화살표 함수 변환 |
| 3 | 기초 | 코드 작성 | map, filter 활용 |
| 4 | 중급 | 실습 | DOM으로 리스트 렌더링 |
| 5 | 중급 | 실습 | Promise 체이닝 |
| 6 | 중급 | 코드 변환 | 콜백 → async/await |
| 7 | 심화 | 종합 | API 연동 + 에러/로딩 처리 |

---

## 9. 참고문헌 계획

1. MDN Web Docs - JavaScript Guide
2. JavaScript.info - The Modern JavaScript Tutorial
3. Eloquent JavaScript (Marijn Haverbeke)
4. You Don't Know JS (Kyle Simpson)
5. JSONPlaceholder - Free Fake API

---

## 10. 집필 시 주의사항

1. **실행 가능한 코드**: 모든 예제는 실제 실행하여 결과 확인
2. **현대 문법**: ES6+ 문법 중심 (let/const, 화살표 함수, 템플릿 리터럴)
3. **점진적 복잡도**: 기초 → 심화 순서로 난이도 증가
4. **React 연계**: 6장에서 배울 React를 위한 기반 지식 강조
5. **실무 패턴**: 실제 프로젝트에서 사용하는 패턴 중심

---

**작성일**: 2026-01-01

# 제1장 웹이 동작하는 방식 — 리서치 문서

## 조사 개요
- **조사 목적**: 웹 프로그래밍 입문자를 위한 웹 동작 원리 자료 수집
- **핵심 키워드**: 클라이언트-서버, HTTP, 브라우저 렌더링, DOM, DevTools
- **조사 범위**: 웹 기초 개념, 학부생 눈높이의 설명 자료

---

## 1. 클라이언트-서버 아키텍처

### 1.1 핵심 개념 정리

**클라이언트(Client)**
- 정의: 서비스를 요청하는 주체. 웹에서는 주로 웹 브라우저를 의미
- 역할: 사용자 입력 처리, 서버에 요청 전송, 응답 표시
- 예시: Chrome, Safari, Firefox, Edge 등

**서버(Server)**
- 정의: 클라이언트의 요청을 받아 처리하고 응답을 반환하는 시스템
- 역할: 데이터 저장, 비즈니스 로직 처리, 인증/권한 관리
- 예시: Apache, Nginx, Node.js, Django 등

**요청-응답 모델(Request-Response Model)**
- 클라이언트가 요청(Request)을 보내면 서버가 응답(Response)을 반환
- 무상태(Stateless): 각 요청은 독립적, 이전 요청의 상태를 기억하지 않음
- HTTP 프로토콜 기반

### 1.2 URL 구조

**URL 형식**: `protocol://domain:port/path?query#fragment`

| 구성 요소 | 예시 | 설명 |
|-----------|------|------|
| Protocol | https:// | 통신 규약 (http, https, ftp 등) |
| Domain | www.example.com | 서버의 주소 (IP의 별칭) |
| Port | :443 | 서버의 특정 서비스 입구 (생략 시 기본값) |
| Path | /products/list | 서버 내 리소스 경로 |
| Query | ?id=123&sort=name | 추가 파라미터 |
| Fragment | #section1 | 페이지 내 특정 위치 |

**기본 포트**
- HTTP: 80
- HTTPS: 443
- 기본 포트는 URL에서 생략 가능

### 1.3 학부생 친화적 비유

**식당 비유**
- 클라이언트 = 손님 (메뉴판 보고 주문)
- 서버 = 주방 (음식 조리)
- HTTP = 주문서 양식
- URL = 식당 주소 + 테이블 번호

**택배 비유**
- 요청 = 택배 주문
- 응답 = 택배 배송
- 상태 코드 = 배송 상태 (배송완료, 주소불명, 품절)

### 1.4 참고문헌
- MDN Web Docs. "How the Web works". https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works
- MDN Web Docs. "What is a URL?". https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL

---

## 2. HTTP 요청과 응답

### 2.1 HTTP 개요

**HTTP(HyperText Transfer Protocol)**
- 웹에서 데이터를 전송하기 위한 애플리케이션 계층 프로토콜
- 1991년 HTTP/0.9 → 1996년 HTTP/1.0 → 1997년 HTTP/1.1 → 2015년 HTTP/2 → 2022년 HTTP/3
- 현재 대부분의 웹사이트는 HTTP/1.1 또는 HTTP/2 사용

### 2.2 HTTP 요청 구조

```
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html
Accept-Language: ko-KR
Connection: keep-alive

(요청 바디 - POST 등에서 사용)
```

**요청 라인(Request Line)**
- 메서드 + 경로 + HTTP 버전
- 예: `GET /index.html HTTP/1.1`

**HTTP 메서드**

| 메서드 | 용도 | 특징 |
|--------|------|------|
| GET | 리소스 조회 | 바디 없음, 캐싱 가능 |
| POST | 리소스 생성 | 바디 있음, 캐싱 불가 |
| PUT | 리소스 전체 수정 | 바디 있음 |
| PATCH | 리소스 부분 수정 | 바디 있음 |
| DELETE | 리소스 삭제 | 바디 없음 |

### 2.3 HTTP 응답 구조

```
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 1234
Date: Mon, 01 Jan 2026 00:00:00 GMT

<!DOCTYPE html>
<html>
...
</html>
```

**상태 라인(Status Line)**
- HTTP 버전 + 상태 코드 + 상태 메시지
- 예: `HTTP/1.1 200 OK`

**주요 상태 코드**

| 범위 | 의미 | 주요 코드 |
|------|------|-----------|
| 1xx | 정보 | 100 Continue |
| 2xx | 성공 | 200 OK, 201 Created, 204 No Content |
| 3xx | 리다이렉션 | 301 Moved Permanently, 302 Found, 304 Not Modified |
| 4xx | 클라이언트 에러 | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found |
| 5xx | 서버 에러 | 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable |

### 2.4 요청-응답 사이클 상세

1. **사용자 행동**: URL 입력 또는 링크 클릭
2. **DNS 조회**: 도메인 → IP 주소 변환
3. **TCP 연결**: 3-way handshake (SYN → SYN-ACK → ACK)
4. **HTTP 요청 전송**: 클라이언트 → 서버
5. **서버 처리**: 요청 분석, 리소스 준비
6. **HTTP 응답 반환**: 서버 → 클라이언트
7. **브라우저 렌더링**: HTML/CSS/JS 처리

### 2.5 참고문헌
- MDN Web Docs. "HTTP 개요". https://developer.mozilla.org/ko/docs/Web/HTTP/Overview
- MDN Web Docs. "HTTP 메시지". https://developer.mozilla.org/ko/docs/Web/HTTP/Messages
- RFC 2616. "Hypertext Transfer Protocol -- HTTP/1.1"

---

## 3. 브라우저 렌더링 파이프라인

### 3.1 렌더링 과정 개요

**Critical Rendering Path (중요 렌더링 경로)**

```
HTML 파싱 → DOM 트리 생성
     ↓
CSS 파싱 → CSSOM 트리 생성
     ↓
DOM + CSSOM → 렌더 트리 생성
     ↓
레이아웃 (Layout/Reflow)
     ↓
페인트 (Paint)
     ↓
합성 (Composite)
```

### 3.2 각 단계 상세

**1. HTML 파싱 → DOM 트리**
- HTML 토큰화: 텍스트를 토큰으로 분해
- DOM 노드 생성: 토큰을 노드로 변환
- DOM 트리 구축: 부모-자식 관계 설정

```html
<html>
  <head><title>제목</title></head>
  <body>
    <div>
      <p>내용</p>
    </div>
  </body>
</html>
```

DOM 트리:
```
Document
└── html
    ├── head
    │   └── title
    │       └── "제목"
    └── body
        └── div
            └── p
                └── "내용"
```

**2. CSS 파싱 → CSSOM 트리**
- CSS 규칙 파싱
- 선택자 매칭
- 계산된 스타일 결정

**3. 렌더 트리 생성**
- DOM + CSSOM 결합
- 화면에 표시되는 요소만 포함
- `display: none`인 요소는 제외

**4. 레이아웃 (Layout/Reflow)**
- 각 요소의 위치와 크기 계산
- 뷰포트 기준 상대적 위치 결정
- 비용이 많이 드는 작업

**5. 페인트 (Paint)**
- 픽셀 단위로 화면에 그리기
- 텍스트, 색상, 이미지 등 렌더링
- 레이어별로 수행

**6. 합성 (Composite)**
- 여러 레이어 결합
- GPU 가속 활용
- 최종 화면 출력

### 3.3 성능 최적화 포인트

**리플로우(Reflow) 유발 요소**
- DOM 요소 추가/삭제
- 요소 크기/위치 변경
- 창 크기 변경
- 폰트 변경

**리플로우 최소화 방법**
- DOM 조작 일괄 처리
- CSS 클래스 변경 사용
- `transform`, `opacity` 활용 (합성 레이어)

### 3.4 참고문헌
- Google Developers. "Critical Rendering Path". https://developers.google.com/web/fundamentals/performance/critical-rendering-path
- MDN Web Docs. "Populating the page: how browsers work". https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work

---

## 4. DOM과 JavaScript 런타임

### 4.1 DOM (Document Object Model)

**정의**
- HTML 문서를 프로그래밍적으로 조작하기 위한 인터페이스
- 트리 구조로 문서 표현
- W3C 표준

**DOM vs HTML**
- HTML: 텍스트 기반 마크업
- DOM: 메모리에 있는 객체 트리
- 브라우저가 HTML을 파싱하여 DOM 생성

**DOM 노드 유형**
- Document: 문서 전체
- Element: HTML 요소 (`<div>`, `<p>` 등)
- Text: 텍스트 콘텐츠
- Attribute: 속성 (id, class 등)
- Comment: 주석

### 4.2 DOM API 기본

**요소 선택**
```javascript
// 단일 요소
document.getElementById('id')
document.querySelector('.class')

// 여러 요소
document.getElementsByClassName('class')
document.getElementsByTagName('tag')
document.querySelectorAll('.class')
```

**요소 조작**
```javascript
// 내용 변경
element.textContent = '새 텍스트'
element.innerHTML = '<span>HTML</span>'

// 속성 변경
element.setAttribute('id', 'newId')
element.classList.add('active')

// 스타일 변경
element.style.color = 'red'
```

**요소 생성/삭제**
```javascript
// 생성
const newEl = document.createElement('div')
parent.appendChild(newEl)

// 삭제
element.remove()
parent.removeChild(child)
```

**이벤트 처리**
```javascript
element.addEventListener('click', (event) => {
  console.log('클릭됨!')
})
```

### 4.3 JavaScript 런타임 환경

**구성 요소**
1. **JavaScript 엔진**: V8(Chrome), SpiderMonkey(Firefox) 등
2. **콜 스택(Call Stack)**: 함수 실행 순서 관리
3. **힙(Heap)**: 객체 메모리 할당
4. **Web APIs**: DOM, setTimeout, fetch 등 브라우저 제공 API
5. **콜백 큐(Callback Queue)**: 비동기 콜백 대기열
6. **이벤트 루프(Event Loop)**: 콜 스택과 큐 조정

**단일 스레드**
- JavaScript는 단일 스레드로 실행
- 한 번에 하나의 작업만 처리
- 비동기 처리로 블로킹 방지

**이벤트 루프 동작**
1. 콜 스택이 비어있는지 확인
2. 콜백 큐에서 대기 중인 콜백 확인
3. 콜백을 콜 스택으로 이동
4. 1-3 반복

### 4.4 참고문헌
- MDN Web Docs. "Document Object Model (DOM)". https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
- MDN Web Docs. "Introduction to the DOM". https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
- JavaScript.info. "Event loop". https://javascript.info/event-loop

---

## 5. Chrome DevTools 활용

### 5.1 DevTools 열기
- Windows/Linux: `F12` 또는 `Ctrl + Shift + I`
- macOS: `Cmd + Option + I`
- 또는 우클릭 → "검사"

### 5.2 주요 패널

**Elements 탭**
- DOM 트리 탐색
- 실시간 HTML/CSS 편집
- 계산된 스타일 확인
- 이벤트 리스너 확인

**Console 탭**
- JavaScript 실행
- 로그 메시지 확인
- 에러 디버깅
- DOM 요소 참조

**Network 탭**
- HTTP 요청/응답 모니터링
- 요청 헤더/응답 헤더 확인
- 응답 본문 확인
- 타이밍 정보
- 필터링 (XHR, JS, CSS 등)

**Sources 탭**
- 소스 코드 확인
- 브레이크포인트 설정
- 디버깅

**Performance 탭**
- 렌더링 성능 분석
- 타임라인 녹화

**Application 탭**
- 로컬 스토리지
- 세션 스토리지
- 쿠키
- 캐시

### 5.3 Network 탭 상세

**요청 정보**
- Name: 리소스 이름
- Status: HTTP 상태 코드
- Type: 리소스 유형 (document, script, stylesheet 등)
- Initiator: 요청을 시작한 주체
- Size: 전송 크기
- Time: 소요 시간

**헤더 확인**
1. 요청 클릭
2. Headers 탭 선택
3. Request Headers / Response Headers 확인

### 5.4 참고문헌
- Chrome DevTools Documentation. https://developer.chrome.com/docs/devtools/
- Google Developers. "Chrome DevTools". https://developers.google.com/web/tools/chrome-devtools

---

## 집필 시 활용 포인트

### 본문에서 강조할 핵심 개념
1. 클라이언트-서버 분리의 이점 (관심사 분리)
2. HTTP의 무상태(Stateless) 특성
3. DOM과 HTML의 차이
4. 렌더링 성능에 영향을 주는 요소

### 학생들이 흔히 하는 오해/오류
1. "서버 = 물리적 컴퓨터"라고만 생각 (프로그램도 서버)
2. DOM과 HTML을 동일시
3. JavaScript가 멀티스레드라고 오해
4. 모든 CSS 변경이 리플로우를 유발한다고 오해

### 일상적 비유/예시 아이디어
1. 클라이언트-서버 → 식당 손님-주방
2. HTTP 요청/응답 → 편지 주고받기
3. URL → 집 주소 + 호실
4. DOM 트리 → 가계도
5. 이벤트 루프 → 은행 창구
6. 렌더링 파이프라인 → 건축 과정

---

## 학부생 친화적 자료

### 비유/예시 자료
- 식당 비유 (요청-응답): 손님 주문 → 주방 조리 → 음식 서빙
- 택배 비유 (상태 코드): 배송완료(200), 주소불명(404), 창고화재(500)
- 건축 비유 (렌더링): 설계도(HTML) → 인테리어(CSS) → 시공(Paint)

### 입문자용 설명
- MDN "웹 시작하기" 시리즈
- 생활코딩 "WEB1 - HTML & Internet"

### 흔한 오해/실수
- GET과 POST의 차이를 "보안" 관점으로만 이해
- CSS와 JavaScript 로딩 순서의 중요성 간과
- DevTools를 단순 "검사" 도구로만 인식

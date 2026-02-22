# 제5장 집필계획서: Next.js 기초

---

## 1. 장 개요

| 항목 | 내용 |
|------|------|
| 장 번호 | 5 |
| 장 제목 | Next.js 기초 |
| 장 유형 | 기술 실습 장 |
| 목표 분량 | 620-680줄, ~35쪽 |
| 구성비 | 개념 15% + 프롬프트 35% + 코드읽기/검증 40% + 과제 10% |
| 선수 지식 | Ch3(HTML/Tailwind CSS), Ch4(JavaScript 핵심) |
| 미션 | 여러 페이지를 가진 게시판 앱을 만든다 |

---

## 2. 학습 목표

이 장을 마치면 다음을 수행할 수 있다:
1. React의 컴포넌트, JSX, Props 개념을 이해하고 AI 생성 코드에서 식별할 수 있다
2. Next.js App Router의 파일 기반 라우팅 구조를 설명할 수 있다
3. 동적 라우트를 구현하여 게시글 상세 페이지를 만들 수 있다
4. Link 컴포넌트와 useRouter로 페이지 간 내비게이션을 구현할 수 있다
5. Copilot에게 페이지 구현을 지시하고 생성된 코드를 검증할 수 있다

---

## 3. 수업 타임라인

| 교시 | 시간대 | 주제 | 해당 절 |
|:---:|--------|------|---------|
| 1교시 | 00:00~00:50 | React 핵심 개념 + App Router 구조 | 5.1~5.2.3 |
| 쉬는시간 | 00:50~01:00 | — | — |
| 2교시 | 01:00~01:50 | 특수 파일 + 동적 라우트 + 내비게이션 | 5.2.4~5.4 |
| 쉬는시간 | 01:50~02:00 | — | — |
| 3교시 | 02:00~02:50 | 게시판 페이지 구현 + 과제 제출 | 5.5 |

---

## 4. 절 구성 및 분량 배분

### 1교시: React 핵심 + App Router 구조

#### 5.1 React의 핵심 개념 (약 150줄, 개념+코드읽기)
- 5.1.1 선언적 UI와 컴포넌트 (~40줄)
  - React = UI 라이브러리, Next.js = React 기반 프레임워크
  - 선언적 vs 명령적 코드 비교 (Ch4 DOM 조작 vs React)
  - 컴포넌트 = 재사용 가능한 함수 (레고 블록 비유)
- 5.1.2 JSX 문법: 표현식, 조건부 렌더링, 리스트 (~60줄)
  - **표 5.1**: JSX 핵심 규칙 (HTML vs JSX 차이)
  - 중괄호 {} 표현식
  - 삼항 연산자 조건부 렌더링
  - map() 리스트 렌더링 + key 속성 필수
- 5.1.3 Props: 컴포넌트 간 데이터 전달 (~50줄)
  - 부모→자식 데이터 전달
  - 구조 분해 할당으로 props 받기
  - Props는 읽기 전용 (state는 Ch6에서)
  - Copilot 프롬프트 + 코드 읽기 포인트

#### 5.2 Next.js App Router 구조 — 1교시 분 (약 110줄, 개념+실습)
- 5.2.1 app 디렉토리와 파일 기반 라우팅 (~40줄)
  - **표 5.2**: 파일 경로 → URL 매핑
  - > **라이브 코딩 시연**: app/about/page.js 만들기
- 5.2.2 page.js — 페이지 정의 (~30줄)
  - export default function 패턴
  - > **함께 진행**: app/posts/page.js 만들기
- 5.2.3 layout.js — 공통 레이아웃 (~40줄)
  - {children} 슬롯 개념
  - **표 5.3**: Next.js 특수 파일 요약
  - Copilot 프롬프트

---

### 2교시: 특수 파일 + 동적 라우트 + 내비게이션

#### 5.2 (계속) App Router 특수 파일 (약 55줄)
- 5.2.4 loading.js — 로딩 UI (~25줄)
  - Tailwind animate-spin 스피너 예제
- 5.2.5 error.js — 에러 UI (~30줄)
  - "use client" 필수
  - error, reset props

#### 5.3 동적 라우트 (약 80줄, 프롬프트+코드읽기)
- 5.3.1 [id] 폴더와 params (~25줄)
  - 대괄호 폴더 = URL 변수
  - 파일 구조 다이어그램
- 5.3.2 동적 페이지 구현 (~55줄)
  - **Next.js 15**: params는 Promise → await 필수
  - 더미 데이터로 게시글 상세 페이지
  - 코드 읽기 포인트
  - Copilot 프롬프트
  - **좋은/나쁜 프롬프트 비교**

#### 5.4 내비게이션 (약 100줄, 프롬프트+코드읽기)
- 5.4.1 Link 컴포넌트 (~35줄)
  - **표 5.4**: Link vs a 태그 비교
  - 클라이언트 사이드 내비게이션
- 5.4.2 useRouter와 프로그래매틱 이동 (~40줄)
  - "use client" 필수
  - next/navigation (NOT next/router)
  - **표 5.5**: Link vs useRouter 사용 시점
- 5.4.3 활성 링크 스타일링 (~25줄)
  - usePathname 활용
  - > **함께 진행**: NavLink 컴포넌트 적용

---

### 3교시: 게시판 페이지 구현 + 과제

#### 5.5 과제 (약 130줄)
- 과제 안내: 3개 핵심 페이지 (목록/상세/작성)
- ① 더미 데이터 준비 (lib/posts.js)
- ② 목록 페이지 + Copilot 프롬프트
- ③ 상세 페이지 + Copilot 프롬프트
- ④ 작성 페이지 + Copilot 프롬프트
- ⑤ 레이아웃 업데이트
- **표 5.6**: 검증 체크리스트
- **표 5.7**: 흔한 AI 실수 패턴
- 과제 제출 + 마무리

---

## 5. 핵심 용어

| 용어 | 영문 | 정의 |
|------|------|------|
| 컴포넌트 | Component | 재사용 가능한 UI 부품. React에서 함수로 정의 |
| JSX | JavaScript XML | JavaScript 안에서 HTML을 작성하는 확장 문법 |
| Props | Properties | 부모 컴포넌트가 자식에게 전달하는 읽기 전용 데이터 |
| App Router | App Router | Next.js의 파일 기반 라우팅 시스템 (app/ 디렉토리) |
| 동적 라우트 | Dynamic Route | URL 일부를 변수로 처리하는 라우트 ([id] 폴더) |
| 레이아웃 | Layout | 여러 페이지에 공통으로 적용되는 UI 구조 |

---

## 6. 표 계획 (7개)

| 번호 | 제목 | 내용 |
|------|------|------|
| 표 5.1 | JSX 핵심 규칙 | HTML vs JSX 차이 (class/className, onclick/onClick 등) |
| 표 5.2 | 파일 경로 → URL 매핑 | app/ 디렉토리 구조와 URL의 대응 관계 |
| 표 5.3 | Next.js 특수 파일 요약 | page.js, layout.js, loading.js, error.js, not-found.js |
| 표 5.4 | Link vs a 태그 비교 | 클라이언트 사이드 vs 전체 새로고침 |
| 표 5.5 | Link vs useRouter 사용 시점 | 선언적 이동 vs 프로그래매틱 이동 |
| 표 5.6 | AI 생성 코드 검증 체크리스트 | App Router, params, import 경로 등 |
| 표 5.7 | 흔한 AI 실수 패턴 | next/router, params await, Pages Router 등 |

---

## 7. COPILOT_VERIFY 마커 (4개)

1. PostCard 컴포넌트 생성 프롬프트 결과 (5.1.3)
2. layout.js 수정 프롬프트 결과 (5.2.3)
3. 동적 라우트 params await 확인 (5.3.2)
4. 목록 페이지 Link 사용 확인 (5.5)

---

## 8. 참고문헌

- Next.js 공식 문서: Routing Fundamentals — https://nextjs.org/docs/app/building-your-application/routing
- Next.js 공식 문서: Layouts and Pages — https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates
- Next.js 공식 문서: Dynamic Routes — https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
- Next.js 공식 문서: Linking and Navigating — https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating
- React 공식 문서: Describing the UI — https://react.dev/learn/describing-the-ui

---

## 9. 현재 대비 변경 사항

**이전 schema/chap5.md**: "JavaScript 핵심" (구 15장 커리큘럼의 5장)
**현재**: "Next.js 기초" (현 13장 커리큘럼의 5장)

**전면 교체** — 이전 스키마의 JavaScript 내용은 현재 Ch4로 이동됨. Ch5는 React+Next.js 기초를 새로 작성.

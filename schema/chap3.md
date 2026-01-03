# 제3장 집필계획서: HTML 시맨틱과 접근성

---

## 1. 장 개요

| 항목 | 내용 |
|------|------|
| 장 번호 | 3 |
| 장 제목 | HTML 시맨틱과 접근성 |
| 목표 분량 | 600-700줄 |
| 예상 페이지 | 약 35쪽 |
| 이론:실습 비율 | 70:30 |
| 선수 지식 | 1장(웹 동작 원리), 2장(AI 도구 활용) |

---

## 2. 학습 목표

이 장을 마치면 다음을 수행할 수 있다:
1. HTML5 문서의 기본 구조를 설명하고 작성할 수 있다
2. 시맨틱 태그의 의미를 이해하고 적절히 활용할 수 있다
3. 폼 요소를 올바르게 마크업하고 레이블을 연결할 수 있다
4. 웹 접근성의 기본 원칙을 이해하고 적용할 수 있다
5. 접근성 검사 도구를 사용하여 문제를 발견하고 수정할 수 있다

---

## 3. 절 구성 및 분량 배분

### 3.1 HTML5 문서 구조 (약 80줄)
- DOCTYPE과 html 요소
- head 영역: meta, title, link
- body 영역: 콘텐츠 구조
- 문자 인코딩과 뷰포트 설정
- **그림 3.1**: HTML5 문서 기본 구조

### 3.2 시맨틱 태그의 의미와 활용 (약 150줄)
- 시맨틱 마크업이란?
- 왜 시맨틱 태그가 중요한가? (SEO, 접근성, 유지보수)
- 3.2.1 주요 시맨틱 태그
  - header, nav, main, section, article, aside, footer
  - 각 태그의 역할과 사용 시점
  - **표 3.1**: 시맨틱 태그 역할 비교
- 3.2.2 올바른 heading 계층 구조
  - h1~h6 사용 규칙
  - 문서 아웃라인
  - **그림 3.2**: heading 계층 구조 예시

### 3.3 폼 요소와 레이블링 (약 120줄)
- 웹 폼의 중요성
- 3.3.1 주요 폼 요소
  - input (text, email, password, checkbox, radio)
  - select와 option
  - textarea
  - button 타입들
  - **표 3.2**: input type 정리
- 3.3.2 label과 for 속성
  - 명시적 레이블 연결
  - 암시적 레이블 (중첩)
  - placeholder는 label이 아니다
  - **그림 3.3**: 레이블 연결 방식

### 3.4 웹 접근성 기초 (약 150줄)
- 웹 접근성이란?
- WCAG 가이드라인 개요
- 3.4.1 키보드 내비게이션
  - tabindex 속성
  - focus 스타일
  - 포커스 트랩 문제
- 3.4.2 ARIA 속성 기본
  - role 속성
  - aria-label, aria-labelledby
  - aria-hidden, aria-live
  - ARIA 사용 원칙: "첫 번째 규칙"
  - **표 3.3**: 자주 사용하는 ARIA 속성
- 3.4.3 접근성 검사 도구
  - Lighthouse (Chrome DevTools)
  - WAVE (WebAIM)
  - axe DevTools
  - **그림 3.4**: Lighthouse 접근성 검사 화면

### 3.5 실습: 로그인 폼과 게시판 마크업 (약 100줄)
- 실습 1: 접근성을 고려한 로그인 폼
- 실습 2: 시맨틱 게시판 레이아웃
- AI 도구 활용: 접근성 검증 프롬프트
- **코드 예제**: 완성된 마크업

---

## 4. 핵심 개념 및 용어

| 용어 | 영문 | 정의 |
|------|------|------|
| 시맨틱 마크업 | Semantic Markup | 의미를 담은 HTML 태그 사용 |
| 웹 접근성 | Web Accessibility | 모든 사용자가 웹을 이용할 수 있게 하는 것 |
| WCAG | Web Content Accessibility Guidelines | 웹 접근성 국제 표준 |
| ARIA | Accessible Rich Internet Applications | 접근성 향상을 위한 속성 |
| 스크린 리더 | Screen Reader | 시각장애인용 화면 읽기 프로그램 |
| 포커스 | Focus | 키보드 입력을 받는 현재 요소 |
| 레이블 | Label | 폼 요소의 설명 텍스트 |

---

## 5. 다이어그램 계획

| 번호 | 제목 | 유형 | 설명 |
|------|------|------|------|
| 그림 3.1 | HTML5 문서 기본 구조 | 블록 다이어그램 | 문서 구조 시각화 |
| 그림 3.2 | heading 계층 구조 | 트리 다이어그램 | h1~h6 계층 표현 |
| 그림 3.3 | 레이블 연결 방식 | 비교 다이어그램 | 명시적/암시적 비교 |
| 그림 3.4 | Lighthouse 접근성 검사 | 스크린샷 설명 | DevTools 활용 |
| 그림 3.5 | 시맨틱 페이지 레이아웃 | 레이아웃 다이어그램 | 태그 배치 시각화 |

---

## 6. 표 계획

| 번호 | 제목 | 내용 |
|------|------|------|
| 표 3.1 | 시맨틱 태그 역할 비교 | 태그명, 역할, 사용 시점 |
| 표 3.2 | input type 정리 | type, 용도, 예시 |
| 표 3.3 | 자주 사용하는 ARIA 속성 | 속성명, 역할, 예시 |
| 표 3.4 | 접근성 검사 도구 비교 | 도구명, 특징, URL |

---

## 7. 실습 코드 계획

| 파일명 | 내용 | 위치 |
|--------|------|------|
| 3-5-login-form.html | 접근성 고려 로그인 폼 | practice/chapter3/code/ |
| 3-5-board-layout.html | 시맨틱 게시판 레이아웃 | practice/chapter3/code/ |
| 3-4-aria-examples.html | ARIA 속성 예제 | practice/chapter3/code/ |

---

## 8. 연습문제 계획

| 번호 | 난이도 | 유형 | 내용 |
|------|--------|------|------|
| 1 | 기초 | 개념 | 시맨틱 태그 5가지 역할 설명 |
| 2 | 기초 | 코드 수정 | div를 시맨틱 태그로 변환 |
| 3 | 기초 | 개념 | label과 for 속성의 중요성 |
| 4 | 중급 | 실습 | 로그인 폼 접근성 개선 |
| 5 | 중급 | 분석 | heading 계층 구조 오류 찾기 |
| 6 | 중급 | 실습 | ARIA 속성 추가하기 |
| 7 | 심화 | 종합 | Lighthouse 100점 마크업 작성 |

---

## 9. 참고문헌 계획

1. MDN Web Docs - HTML elements reference
2. W3C - Web Content Accessibility Guidelines (WCAG) 2.1
3. WebAIM - Introduction to Web Accessibility
4. Google - Lighthouse documentation
5. WHATWG - HTML Living Standard

---

## 10. 집필 시 주의사항

1. **학부생 눈높이**: 접근성의 "왜"를 먼저 설명 (실제 사용자 사례)
2. **실용성 강조**: 바로 적용 가능한 체크리스트 제공
3. **AI 연계**: 2장에서 배운 AI 도구로 접근성 검증하는 방법
4. **코드 예제**: Before/After 비교로 개선 효과 시각화
5. **실습 중심**: 직접 만들어보며 체득하도록 유도

---

**작성일**: 2026-01-01

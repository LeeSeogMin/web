# 제4장 집필계획서: CSS 레이아웃과 반응형 디자인

---

## 1. 장 개요

| 항목 | 내용 |
|------|------|
| 장 번호 | 4 |
| 장 제목 | CSS 레이아웃과 반응형 디자인 |
| 목표 분량 | 650-750줄 (기술 심화 장) |
| 예상 페이지 | 약 40쪽 |
| 이론:실습 비율 | 60:40 |
| 선수 지식 | 3장(HTML 시맨틱과 접근성) |

---

## 2. 학습 목표

이 장을 마치면 다음을 수행할 수 있다:
1. CSS 선택자의 종류와 우선순위 규칙을 이해하고 적용할 수 있다
2. 박스 모델을 이해하고 요소의 크기를 정확히 제어할 수 있다
3. Flexbox를 사용하여 1차원 레이아웃을 구현할 수 있다
4. CSS Grid를 사용하여 2차원 레이아웃을 구현할 수 있다
5. 미디어 쿼리를 활용하여 반응형 웹사이트를 만들 수 있다

---

## 3. 절 구성 및 분량 배분

### 4.1 CSS 선택자와 우선순위 (약 80줄)
- CSS란 무엇인가?
- 선택자 종류: 요소, 클래스, ID, 속성, 가상 클래스/요소
- 결합자: 자손, 자식, 인접 형제
- 우선순위(Specificity) 계산법
- **표 4.1**: 선택자 종류와 우선순위

### 4.2 박스 모델의 이해 (약 70줄)
- 모든 요소는 박스이다
- content, padding, border, margin
- box-sizing: content-box vs border-box
- **그림 4.1**: CSS 박스 모델

### 4.3 Flexbox 레이아웃 (약 150줄)
- Flexbox를 왜 사용하는가?
- 4.3.1 flex container와 flex item
  - display: flex
  - flex-direction
  - flex-wrap
- 4.3.2 주축과 교차축 정렬
  - justify-content
  - align-items
  - align-self
  - gap
  - **그림 4.2**: Flexbox 축과 정렬
- 4.3.3 실전 패턴
  - 내비게이션 바
  - 카드 리스트
  - **표 4.2**: Flexbox 주요 속성 정리

### 4.4 Grid 레이아웃 (약 150줄)
- Grid vs Flexbox: 언제 무엇을?
- 4.4.1 grid-template 정의
  - grid-template-columns/rows
  - fr 단위
  - repeat(), minmax()
- 4.4.2 영역 배치와 gap
  - grid-column/row
  - grid-area
  - gap
  - **그림 4.3**: Grid 용어와 구조
- 4.4.3 실전 패턴
  - 대시보드 레이아웃
  - **표 4.3**: Grid 주요 속성 정리

### 4.5 반응형 디자인 (약 120줄)
- 반응형 디자인이란?
- 4.5.1 미디어 쿼리 기초
  - @media 문법
  - 브레이크포인트 설정
- 4.5.2 모바일 퍼스트 접근법
  - 왜 모바일 퍼스트인가?
  - min-width vs max-width
  - **표 4.4**: 일반적인 브레이크포인트
- 4.5.3 반응형 이미지와 타이포그래피
  - max-width: 100%
  - clamp(), vw 단위
  - **그림 4.4**: 반응형 디자인 흐름

### 4.6 실습: 게시판 UI 스타일링 (약 80줄)
- 실습 목표
- 3장에서 만든 게시판 마크업에 CSS 적용
- Flexbox로 헤더/내비게이션 구현
- Grid로 메인 레이아웃 구현
- 미디어 쿼리로 반응형 처리
- **코드 예제**: 완성된 CSS

---

## 4. 핵심 개념 및 용어

| 용어 | 영문 | 정의 |
|------|------|------|
| 선택자 | Selector | CSS 규칙을 적용할 요소 지정 |
| 우선순위 | Specificity | 충돌하는 규칙 중 어떤 것을 적용할지 결정 |
| 박스 모델 | Box Model | 요소의 크기와 여백을 정의하는 모델 |
| Flexbox | Flexible Box | 1차원 레이아웃 시스템 |
| Grid | CSS Grid | 2차원 레이아웃 시스템 |
| 반응형 | Responsive | 화면 크기에 따라 레이아웃이 변하는 디자인 |
| 미디어 쿼리 | Media Query | 화면 조건에 따른 CSS 적용 |
| 브레이크포인트 | Breakpoint | 레이아웃이 변하는 화면 너비 기준점 |

---

## 5. 다이어그램 계획

| 번호 | 제목 | 유형 | 설명 |
|------|------|------|------|
| 그림 4.1 | CSS 박스 모델 | 박스 다이어그램 | content/padding/border/margin |
| 그림 4.2 | Flexbox 축과 정렬 | 레이아웃 다이어그램 | 주축/교차축, 정렬 속성 |
| 그림 4.3 | Grid 용어와 구조 | 그리드 다이어그램 | track, cell, area, gap |
| 그림 4.4 | 반응형 디자인 흐름 | 플로우 다이어그램 | 모바일→태블릿→데스크톱 |

---

## 6. 표 계획

| 번호 | 제목 | 내용 |
|------|------|------|
| 표 4.1 | 선택자 종류와 우선순위 | 선택자, 예시, 우선순위 점수 |
| 표 4.2 | Flexbox 주요 속성 | 속성명, 적용 대상, 값, 설명 |
| 표 4.3 | Grid 주요 속성 | 속성명, 적용 대상, 값, 설명 |
| 표 4.4 | 일반적인 브레이크포인트 | 기기, 너비, 용도 |

---

## 7. 실습 코드 계획

| 파일명 | 내용 | 위치 |
|--------|------|------|
| 4-3-flexbox-examples.css | Flexbox 패턴 예제 | practice/chapter4/code/ |
| 4-4-grid-examples.css | Grid 패턴 예제 | practice/chapter4/code/ |
| 4-6-board-styles.css | 게시판 완성 스타일 | practice/chapter4/code/ |
| 4-6-board-styled.html | 스타일 적용된 게시판 | practice/chapter4/code/ |

---

## 8. 연습문제 계획

| 번호 | 난이도 | 유형 | 내용 |
|------|--------|------|------|
| 1 | 기초 | 개념 | 선택자 우선순위 계산 |
| 2 | 기초 | 코드 작성 | box-sizing 차이 설명 |
| 3 | 기초 | 개념 | Flexbox vs Grid 선택 기준 |
| 4 | 중급 | 실습 | Flexbox로 내비게이션 구현 |
| 5 | 중급 | 실습 | Grid로 카드 레이아웃 구현 |
| 6 | 중급 | 코드 수정 | 반응형으로 변환하기 |
| 7 | 심화 | 종합 | 반응형 대시보드 구현 |

---

## 9. 참고문헌 계획

1. MDN Web Docs - CSS reference
2. CSS-Tricks - A Complete Guide to Flexbox
3. CSS-Tricks - A Complete Guide to CSS Grid
4. web.dev - Responsive Web Design Basics
5. Kevin Powell - Modern CSS YouTube Channel

---

## 10. 집필 시 주의사항

1. **시각적 예제 중심**: CSS는 결과가 눈에 보이므로 시각적 설명 강조
2. **실전 패턴**: 자주 사용되는 레이아웃 패턴 중심으로 설명
3. **3장 연계**: 3장에서 만든 시맨틱 마크업에 스타일 적용
4. **비교 설명**: Flexbox vs Grid 언제 무엇을 쓸지 명확히
5. **모바일 퍼스트**: 현대 웹 개발 표준인 모바일 퍼스트 강조

---

**작성일**: 2026-01-01

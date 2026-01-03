# 제7장 집필계획서: Hooks 심화

---

## 1. 장 개요

| 항목 | 내용 |
|------|------|
| 장 번호 | 7 |
| 장 제목 | Hooks 심화 |
| 목표 분량 | 700-800줄 (기술 심화 장) |
| 예상 페이지 | 약 45쪽 |
| 이론:실습 비율 | 50:50 |
| 선수 지식 | 6장(React 기초, useState) |

---

## 2. 학습 목표

이 장을 마치면 다음을 수행할 수 있다:
1. useEffect로 사이드 이펙트와 생명주기를 관리할 수 있다
2. useRef로 DOM 접근과 값 저장을 수행할 수 있다
3. useContext로 전역 상태를 공유할 수 있다
4. useMemo와 useCallback으로 성능을 최적화할 수 있다
5. 커스텀 Hook을 만들어 로직을 재사용할 수 있다

---

## 3. 절 구성 및 분량 배분

### 7.1 useEffect 기초 (약 120줄)
- 7.1.1 사이드 이펙트란?
  - 순수 함수 vs 사이드 이펙트
  - 왜 useEffect가 필요한가
- 7.1.2 useEffect 기본 사용법
  - 문법과 실행 시점
  - 의존성 배열
- 7.1.3 클린업 함수
  - 구독 해제
  - 타이머 정리
- **그림 7.1**: useEffect 실행 흐름

### 7.2 useEffect 심화 (약 100줄)
- 7.2.1 의존성 배열 패턴
  - 빈 배열 []
  - 특정 값 의존
  - 배열 생략
- 7.2.2 데이터 페칭
  - fetch + useEffect
  - 로딩/에러 상태
  - 경쟁 상태(Race Condition) 방지
- **표 7.1**: 의존성 배열 패턴 비교

### 7.3 useRef (약 80줄)
- 7.3.1 DOM 요소 접근
  - input 포커스
  - 스크롤 제어
- 7.3.2 값 저장 (렌더링에 영향 없음)
  - 이전 값 저장
  - 타이머 ID 저장
- **표 7.2**: useState vs useRef 비교

### 7.4 useContext와 전역 상태 (약 120줄)
- 7.4.1 Context API 기초
  - createContext
  - Provider
  - useContext
- 7.4.2 테마 전환 예제
- 7.4.3 인증 상태 관리 패턴
- **그림 7.2**: Context 데이터 흐름

### 7.5 성능 최적화 Hooks (약 100줄)
- 7.5.1 useMemo
  - 값 메모이제이션
  - 언제 사용해야 하는가
- 7.5.2 useCallback
  - 함수 메모이제이션
  - 자식 컴포넌트 최적화
- 7.5.3 React.memo와 함께 사용
- **표 7.3**: 최적화 Hooks 비교

### 7.6 커스텀 Hook (약 80줄)
- 7.6.1 커스텀 Hook이란
  - 네이밍 규칙 (use-)
  - 로직 재사용
- 7.6.2 실용 커스텀 Hook 예제
  - useLocalStorage
  - useWindowSize
  - useFetch

### 7.7 실습: 게시글 뷰어 (약 100줄)
- API 데이터 페칭 (useEffect)
- 로딩/에러 상태 처리
- 게시글 상세 보기
- 테마 전환 (useContext)
- 완성 코드

---

## 4. 핵심 개념 및 용어

| 용어 | 영문 | 정의 |
|------|------|------|
| 사이드 이펙트 | Side Effect | 함수 외부에 영향을 주는 작업 |
| 의존성 배열 | Dependency Array | useEffect 재실행 조건 |
| 클린업 | Cleanup | 이펙트 정리 함수 |
| 메모이제이션 | Memoization | 계산 결과 캐싱 |
| Context | Context | 컴포넌트 트리 전역 데이터 |
| 커스텀 Hook | Custom Hook | 재사용 가능한 상태 로직 |

---

## 5. 다이어그램 계획

| 번호 | 제목 | 유형 | 설명 |
|------|------|------|------|
| 그림 7.1 | useEffect 실행 흐름 | 시퀀스 | 마운트→업데이트→언마운트 |
| 그림 7.2 | Context 데이터 흐름 | 트리 | Provider→Consumer 관계 |
| 그림 7.3 | 메모이제이션 개념 | 플로우 | 입력→캐시 확인→결과 |

---

## 6. 표 계획

| 번호 | 제목 | 내용 |
|------|------|------|
| 표 7.1 | 의존성 배열 패턴 | [], [deps], 생략 비교 |
| 표 7.2 | useState vs useRef | 리렌더링 여부, 용도 |
| 표 7.3 | 최적화 Hooks | useMemo, useCallback, memo |

---

## 7. 실습 코드 계획

| 파일명 | 내용 | 위치 |
|--------|------|------|
| 7-1-useEffect-basics.jsx | useEffect 기본 예제 | practice/chapter7/code/ |
| 7-2-data-fetching.jsx | 데이터 페칭 예제 | practice/chapter7/code/ |
| 7-4-theme-context.jsx | 테마 Context 예제 | practice/chapter7/code/ |
| 7-6-custom-hooks.js | 커스텀 Hook 모음 | practice/chapter7/code/ |
| 7-7-post-viewer/ | 게시글 뷰어 앱 | practice/chapter7/code/ |

---

## 8. 연습문제 계획

| 번호 | 난이도 | 유형 | 내용 |
|------|--------|------|------|
| 1 | 기초 | 개념 | useEffect 의존성 배열 설명 |
| 2 | 기초 | 코드 작성 | 타이머 구현 (클린업) |
| 3 | 기초 | 개념 | useState vs useRef 차이 |
| 4 | 중급 | 실습 | 무한 스크롤 구현 |
| 5 | 중급 | 실습 | Context로 다국어 지원 |
| 6 | 중급 | 코드 최적화 | 불필요한 리렌더링 방지 |
| 7 | 심화 | 종합 | 뉴스 피드 앱 (커스텀 Hook) |

---

## 9. 참고문헌 계획

1. React 공식 문서 - Hooks Reference
2. React 공식 문서 - useEffect
3. Dan Abramov - A Complete Guide to useEffect
4. Kent C. Dodds - Epic React (Hooks 섹션)
5. React Beta Docs - Synchronizing with Effects

---

## 10. 집필 시 주의사항

1. **6장 연계**: useState 복습 후 새로운 Hooks 소개
2. **실용 패턴 중심**: 실제 프로젝트에서 사용하는 패턴
3. **점진적 복잡도**: 기본 사용법 → 심화 패턴 → 조합
4. **성능 주의사항**: 과도한 최적화 경고
5. **8장 연계**: Supabase 연동을 위한 기반 마련

---

**작성일**: 2026-01-02

# 제10장 집필계획서: Supabase Database

## 1. 장 개요

### 1.1 위치 및 역할
- **Part 4**: Supabase 백엔드 통합의 세 번째 장
- **선수 지식**: 8장 Supabase 시작하기, 9장 Authentication
- **후속 장**: 11장 Row Level Security

### 1.2 핵심 목표
학부생이 관계형 데이터베이스의 기본 개념을 이해하고, Supabase를 사용하여 게시판 데이터베이스를 설계하며, React에서 CRUD 작업을 구현할 수 있다.

### 1.3 예상 분량
- 목표: 700-800줄 (기술 심화 장)
- 이론:실습 = 50:50
- A4 약 40쪽

---

## 2. 절 구성

### 10.1 PostgreSQL 기초 (약 120줄)
- 10.1.1 관계형 데이터베이스 개념
- 10.1.2 테이블, 행, 열의 이해
- 10.1.3 기본 SQL 문법 (SELECT, INSERT, UPDATE, DELETE)

### 10.2 데이터 모델링 (약 140줄)
- 10.2.1 게시판 스키마 설계 (users, posts, comments)
- 10.2.2 테이블 관계: 1:N, N:M
- 10.2.3 외래 키와 참조 무결성

### 10.3 CRUD 구현 (약 200줄)
- 10.3.1 select: 데이터 조회
- 10.3.2 insert: 데이터 생성
- 10.3.3 update: 데이터 수정
- 10.3.4 delete: 데이터 삭제

### 10.4 쿼리 심화 (약 150줄)
- 10.4.1 필터링: eq, neq, gt, lt, like, ilike
- 10.4.2 정렬과 페이지네이션
- 10.4.3 관계 데이터 조회 (JOIN 대체)

### 10.5 실습: 게시글 CRUD 연결 (약 90줄)
- 게시글 목록, 상세, 작성, 수정, 삭제 구현
- React와 Supabase 연동

---

## 3. 학습 목표

1. 관계형 데이터베이스의 기본 개념을 설명할 수 있다
2. 테이블 간의 관계(1:N, N:M)를 이해하고 설계할 수 있다
3. Supabase JavaScript API로 CRUD 작업을 수행할 수 있다
4. 필터링, 정렬, 페이지네이션을 구현할 수 있다
5. 관계 데이터를 한 번의 쿼리로 조회할 수 있다

---

## 4. 핵심 용어

| 용어 | 정의 |
|------|------|
| 관계형 DB | 테이블 형태로 데이터를 저장하는 데이터베이스 |
| 테이블 | 행과 열로 구성된 데이터 집합 |
| Primary Key | 각 행을 고유하게 식별하는 키 |
| Foreign Key | 다른 테이블을 참조하는 키 |
| CRUD | Create, Read, Update, Delete의 약자 |
| 페이지네이션 | 데이터를 페이지 단위로 나누어 조회 |

---

## 5. 실습 계획

### 실습 10-1: 게시판 스키마 생성
- SQL Editor에서 테이블 생성

### 실습 10-2: CRUD 함수 구현
- 파일: practice/chapter10/code/10-3-crud-functions.js

### 실습 10-3: 고급 쿼리
- 파일: practice/chapter10/code/10-4-advanced-queries.js

### 실습 10-4: React 게시판 컴포넌트
- 파일: practice/chapter10/code/10-5-post-crud.jsx

---

## 6. 그래픽 계획

### 그림 10.1: 관계형 데이터베이스 구조
- 테이블, 행, 열 시각화

### 그림 10.2: 게시판 ERD
- users, posts, comments 관계

### 그림 10.3: Supabase 쿼리 빌더 흐름
- from → select → filter → order → limit

---

## 7. 연습문제 계획

### 기초 (3문제)
1. Primary Key와 Foreign Key 차이
2. 1:N 관계 설명
3. SELECT 쿼리 작성

### 중급 (2문제)
4. 페이지네이션 구현
5. 관계 데이터 조회

### 심화 (1문제)
6. 댓글 CRUD 추가 구현

---

## 8. 다음 장 연결

10장에서 구현한 CRUD를 기반으로:
- 11장: RLS로 사용자별 권한 설정 (본인 글만 수정/삭제)

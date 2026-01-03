# 제8장 집필계획서: Supabase 시작하기

## 1. 장 개요

### 1.1 위치 및 역할
- **Part 4**: Supabase 백엔드 통합의 첫 번째 장
- **선수 지식**: React Hooks (7장), 비동기 프로그래밍 (5장)
- **후속 장**: 9장 Authentication, 10장 Database, 11장 RLS

### 1.2 핵심 목표
학부생이 BaaS 개념을 이해하고, Supabase 프로젝트를 생성하며, React와 연동하는 기본 설정을 완료한다.

### 1.3 예상 분량
- 목표: 600-700줄 (핵심 개념 장)
- 이론:실습 = 70:30
- A4 약 30쪽

---

## 2. 절 구성

### 8.1 BaaS(Backend as a Service) 개념 (약 80줄)
- 전통적인 백엔드 개발 vs BaaS
- BaaS의 장점과 적합한 사용 사례
- 주요 BaaS 서비스 소개

### 8.2 Supabase vs Firebase 비교 (약 70줄)
- 기술 스택 비교 (PostgreSQL vs NoSQL)
- 오픈소스 vs 독점
- 가격 정책 비교
- Supabase 선택 이유

### 8.3 Supabase 프로젝트 생성 (약 100줄)
- Supabase 계정 생성
- 새 프로젝트 생성 과정
- 프로젝트 설정 옵션
- API 키 확인 (anon key, service role key)

### 8.4 대시보드 탐색 (약 120줄)
- 8.4.1 Table Editor: 테이블 생성/수정
- 8.4.2 SQL Editor: SQL 직접 실행
- 8.4.3 Authentication: 인증 설정
- 8.4.4 API Docs: 자동 생성 API 문서

### 8.5 Supabase 클라이언트 설정 (약 150줄)
- 8.5.1 @supabase/supabase-js 설치
- 8.5.2 환경 변수 관리 (.env.local)
- 8.5.3 클라이언트 초기화 (src/lib/supabase.js)
- React 프로젝트에서 사용 예제

### 8.6 Context7로 Supabase 최신 문서 참조하기 (약 80줄)
- Context7 MCP 활용법
- Supabase 공식 문서 참조 방법
- 버전 확인 및 최신 API 체크

---

## 3. 학습 목표

1. BaaS의 개념과 장점을 설명할 수 있다
2. Supabase와 Firebase의 차이점을 비교할 수 있다
3. Supabase 프로젝트를 생성하고 대시보드를 탐색할 수 있다
4. React 프로젝트에 Supabase 클라이언트를 설정할 수 있다
5. 환경 변수를 안전하게 관리할 수 있다

---

## 4. 핵심 용어

| 용어 | 정의 |
|------|------|
| BaaS | Backend as a Service, 서버 인프라 없이 백엔드 기능 제공 |
| PostgreSQL | 오픈소스 관계형 데이터베이스 |
| API Key | 서비스 접근을 위한 인증 키 |
| anon key | 클라이언트에서 사용하는 공개 키 |
| service role key | 서버에서 사용하는 비밀 키 |
| 환경 변수 | 앱 설정을 외부에서 주입하는 변수 |

---

## 5. 실습 계획

### 실습 8-1: Supabase 프로젝트 생성
- Supabase 대시보드에서 프로젝트 생성
- API 키 확인

### 실습 8-2: React 프로젝트 연동
- 파일: practice/chapter8/code/8-5-supabase-client.js
- Supabase 클라이언트 초기화
- 연결 테스트

---

## 6. 그래픽 계획

### 그림 8.1: 전통적 백엔드 vs BaaS 아키텍처
- 기존 방식: 프론트 → 백엔드 서버 → DB
- BaaS 방식: 프론트 → BaaS → DB

### 그림 8.2: Supabase 아키텍처
- PostgreSQL, Auth, Storage, Edge Functions, Realtime

### 그림 8.3: Supabase 대시보드 주요 메뉴
- Table Editor, SQL Editor, Auth, Storage, API Docs 등

---

## 7. 연습문제 계획

### 기초 (3문제)
1. BaaS의 장점 3가지 설명
2. anon key와 service role key의 차이
3. 환경 변수 파일 작성

### 중급 (2문제)
4. Supabase와 Firebase 비교표 작성
5. 클라이언트 초기화 코드 작성

### 심화 (1문제)
6. 연결 테스트 + 에러 처리 구현

---

## 8. 참고문헌 계획

1. Supabase 공식 문서 (https://supabase.com/docs)
2. Supabase JavaScript 클라이언트 가이드
3. PostgreSQL 공식 문서
4. Firebase vs Supabase 비교 글

---

## 9. 다음 장 연결

8장에서 설정한 Supabase 클라이언트를 기반으로:
- 9장: Authentication 구현 (소셜 로그인)
- 10장: Database CRUD 구현
- 11장: Row Level Security 적용

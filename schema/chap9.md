# 제9장 집필계획서: Supabase Authentication

## 1. 장 개요

### 1.1 위치 및 역할
- **Part 4**: Supabase 백엔드 통합의 두 번째 장
- **선수 지식**: 8장 Supabase 시작하기, 7장 Context API
- **후속 장**: 10장 Database, 11장 RLS

### 1.2 핵심 목표
학부생이 인증의 기본 개념을 이해하고, Supabase를 사용하여 Google OAuth 소셜 로그인을 구현하며, React Context로 인증 상태를 관리할 수 있다.

### 1.3 예상 분량
- 목표: 650-750줄 (기술 심화 장)
- 이론:실습 = 60:40
- A4 약 35쪽

---

## 2. 절 구성

### 9.1 인증의 기본 개념 (약 100줄)
- 9.1.1 인증(Authentication) vs 인가(Authorization)
- 9.1.2 세션 기반 vs 토큰 기반 인증
- 9.1.3 JWT(JSON Web Token)의 구조

### 9.2 소셜 로그인 설정 (약 120줄)
- 9.2.1 OAuth 2.0 개념
- 9.2.2 Google Cloud Console 설정
- 9.2.3 Supabase Provider 설정
- 9.2.4 Redirect URL 구성

### 9.3 인증 구현 (약 150줄)
- 9.3.1 signInWithOAuth 사용법
- 9.3.2 signOut 구현
- 9.3.3 onAuthStateChange로 세션 감지
- 9.3.4 getUser, getSession 사용법

### 9.4 인증 상태 관리 (약 180줄)
- 9.4.1 AuthContext 설계
- 9.4.2 AuthProvider 구현
- 9.4.3 useAuth 커스텀 Hook
- 9.4.4 보호된 라우트 (ProtectedRoute)

### 9.5 실습: Google 로그인 구현 (약 100줄)
- 전체 프로젝트 구조
- 로그인/로그아웃 UI
- 사용자 정보 표시

---

## 3. 학습 목표

1. 인증과 인가의 차이를 설명할 수 있다
2. OAuth 2.0의 동작 원리를 이해할 수 있다
3. Supabase로 Google 소셜 로그인을 구현할 수 있다
4. React Context로 인증 상태를 전역 관리할 수 있다
5. 보호된 라우트를 만들어 인증된 사용자만 접근하게 할 수 있다

---

## 4. 핵심 용어

| 용어 | 정의 |
|------|------|
| 인증 (Authentication) | 사용자가 누구인지 확인하는 과정 |
| 인가 (Authorization) | 사용자가 무엇을 할 수 있는지 결정하는 과정 |
| OAuth 2.0 | 타사 서비스를 통한 인증 표준 프로토콜 |
| JWT | JSON 형태의 토큰으로 사용자 정보 전달 |
| 세션 | 서버에서 사용자 상태를 유지하는 방식 |
| Redirect URL | OAuth 인증 후 돌아올 URL |

---

## 5. 실습 계획

### 실습 9-1: Google OAuth 설정
- Google Cloud Console에서 OAuth 클라이언트 생성
- Supabase에서 Provider 설정

### 실습 9-2: 인증 기능 구현
- 파일: practice/chapter9/code/9-3-auth-functions.js
- signInWithOAuth, signOut 구현

### 실습 9-3: AuthContext 구현
- 파일: practice/chapter9/code/9-4-auth-context.jsx
- AuthProvider, useAuth Hook

### 실습 9-4: 보호된 라우트
- 파일: practice/chapter9/code/9-5-protected-route.jsx
- ProtectedRoute 컴포넌트

---

## 6. 그래픽 계획

### 그림 9.1: 인증 vs 인가 개념도
- 인증: 신원 확인 (로그인)
- 인가: 권한 확인 (접근 제어)

### 그림 9.2: OAuth 2.0 흐름
- 사용자 → 앱 → Google → Supabase → 앱

### 그림 9.3: AuthContext 데이터 흐름
- AuthProvider → 하위 컴포넌트들

---

## 7. 연습문제 계획

### 기초 (3문제)
1. 인증과 인가의 차이
2. JWT의 세 부분 설명
3. onAuthStateChange 이벤트 종류

### 중급 (2문제)
4. AuthContext 코드 완성
5. ProtectedRoute 동작 설명

### 심화 (1문제)
6. GitHub OAuth 추가 구현

---

## 8. 참고문헌 계획

1. Supabase 공식 문서 - Authentication
2. OAuth 2.0 스펙 (RFC 6749)
3. Google Cloud - OAuth 설정 가이드

---

## 9. 다음 장 연결

9장에서 구현한 인증을 기반으로:
- 10장: 인증된 사용자의 CRUD 구현
- 11장: RLS로 사용자별 권한 설정

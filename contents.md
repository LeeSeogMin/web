# 웹 프로그래밍(실전): AI 협업 기반 풀스택 리터러시

## Next.js + Tailwind CSS + Supabase + Vercel

### 바이브코딩 with GitHub Copilot

---

# 목차

---

## 수업 철학

> **"1주차에 배포하고, 매주 기능을 추가하고, 매주 재배포한다."**

- **기초 먼저**: HTML/CSS/JS 기본기가 있어야 AI 출력을 판단할 수 있다
- **설계 먼저**: 코딩 전에 페이지 구조와 데이터 흐름을 잡아야 AI에게 제대로 지시할 수 있다
- **컨텍스트 관리가 곧 실력**: copilot-instructions.md로 프로젝트를 이해시키고, @workspace로 맥락을 주고, MCP로 최신 문서를 연결한다
- **AI는 틀린다**: AI의 학습 시점과 현재 버전이 다르다 — 검증 능력이 핵심 역량이다
- **배포 우선**: 첫 수업에 Vercel 배포를 완료하고, 이후 매주 결과물이 실제 URL로 동작한다
- **매주 과제 제출**: 수업 시간 내에 과제를 완성하고 제출한다

---

## 15주 운영 계획

| 주차 | 챕터 | 주제 | 과제 (수업 중 제출) |
|:---:|:---:|------|-------------------|
| 1 | Ch1 | 첫 배포 | create-next-app → GitHub → Vercel 배포 |
| 2 | Ch2 | Copilot 세팅과 바이브코딩 | copilot-instructions.md 작성 + MCP 설정 + 자기소개 페이지 생성 |
| 3 | Ch3 | HTML 시맨틱과 Tailwind CSS | 게시판 UI 마크업 + 스타일링 |
| 4 | Ch4 | JavaScript 핵심 | API 데이터 연동 + 인터랙션 |
| 5 | Ch5 | Next.js 기초 | 게시판 목록/상세/작성 페이지 구현 |
| 6 | Ch6 | Next.js 상태 관리와 데이터 페칭 | 게시판 프론트엔드 완성 |
| 7 | Ch7 | 웹 앱 아키텍처 & 디자인 설계 | 프로젝트 설계서 + 와이어프레임 작성 |
| **8** | — | **중간고사** | **코딩 객관식 시험** |
| 9 | Ch8 | Supabase 시작하기 | 프로젝트 생성 + 테이블 설계 |
| 10 | Ch9 | Supabase Authentication | Google 소셜 로그인 구현 |
| 11 | Ch10 | Supabase Database CRUD | 게시글 CRUD 연결 |
| 12 | Ch11 | Row Level Security | 권한 정책 작성 + 검증 |
| 13 | Ch12 | 에러 처리와 UX 완성 | 로딩/에러 UI + 배포 |
| 14 | Ch13 | 개인 프로젝트 구현 | 프로젝트 완성 + 최종 배포 |
| **15** | — | **기말: 개인 프로젝트 제출** | **배포 URL + 소스코드 + AI 사용 로그** |

---

## Part 1. 첫 배포와 AI 협업 환경

### Chapter 1. 첫 배포 — create-next-app에서 Vercel까지

> **미션**: 수업이 끝나면 내 웹사이트가 인터넷에 올라간다

1.1 웹이 동작하는 방식
  - 1.1.1 클라이언트-서버 아키텍처
  - 1.1.2 HTTP 요청과 응답의 흐름
  - 1.1.3 브라우저가 화면을 그리는 과정
1.2 개발 환경 설정
  - 1.2.1 Node.js 설치
  - 1.2.2 VS Code 설치 및 필수 확장
  - 1.2.3 Git 설치 및 GitHub 계정 생성
  - 1.2.4 터미널 기본 명령어
1.3 Next.js 프로젝트 생성
  - 1.3.1 npx create-next-app@latest
  - 1.3.2 프로젝트 구조 살펴보기
  - 1.3.3 개발 서버 실행: npm run dev
  - 1.3.4 DevTools 실습: 요소/콘솔/네트워크 탭
1.4 GitHub에 올리기
  - 1.4.1 git init, add, commit, push
  - 1.4.2 GitHub 저장소 생성 및 연결
1.5 Vercel 배포
  - 1.5.1 Vercel 가입 및 GitHub 연동
  - 1.5.2 프로젝트 임포트
  - 1.5.3 자동 배포 확인: push → 배포
1.6 과제: 첫 페이지 수정 → git push → 배포 URL 제출

### Chapter 2. Copilot 세팅과 바이브코딩

> **미션**: Copilot을 제대로 세팅하고, 말로 설명해서 페이지를 만든다

2.1 바이브코딩이란
  - 2.1.1 AI 시대의 개발 방식 변화
  - 2.1.2 바이브코딩의 원리: 설명 → 생성 → 검증 → 반복
  - 2.1.3 기본기가 필요한 이유: AI 출력을 판단하려면
2.2 GitHub Copilot 설정
  - 2.2.1 GitHub 학생 계정 신청 (Copilot 무료)
  - 2.2.2 VS Code Copilot / Copilot Chat 확장 설치
  - 2.2.3 Copilot 자동완성: Tab 수락, 주석으로 의도 전달
  - 2.2.4 Copilot Chat: @workspace, /explain, /fix, Ctrl+I
2.3 AI 코딩의 3대 한계 — 이것을 모르면 바이브코딩은 실패한다
  - 2.3.1 한계 ①: 버전 불일치 — AI는 과거에 학습했지만, 라이브러리는 오늘 업데이트된다
    - 실제 사례: Next.js 15에서 AI가 14 문법을 제안하면 에러가 난다
    - Tailwind CSS 4 vs 3, Supabase v2 API 변경 등
  - 2.3.2 한계 ②: 컨텍스트 소실 — AI는 내 프로젝트를 모른다
    - 세션이 끝나면 모든 대화가 사라진다 (장기 기억 없음)
    - 열린 파일만 본다: 프로젝트 전체를 항상 파악하지 못한다
    - 설계 의도를 모른 채 코드를 생성한다
  - 2.3.3 한계 ③: 환각 — AI는 존재하지 않는 것을 만들어낸다
    - 없는 npm 패키지를 추천한다 (설치하면 에러 또는 악성 패키지)
    - 실재하지 않는 API 메서드를 쓴다 (supabase.from().upsertMany() 같은 가짜)
    - 공식 문서에 없는 옵션/파라미터를 자신 있게 제시한다
    - "그럴듯하지만 틀린" 코드가 가장 위험한 이유
  - 2.3.4 3대 한계의 관계: 버전 문제 + 컨텍스트 부족 → 환각 확률 증가
2.4 해결: 컨텍스트 관리 3계층 — AI에게 "내 프로젝트"를 이해시킨다
  - 2.4.1 1계층 — copilot-instructions.md (필수, 80% 해결)
    - .github/copilot-instructions.md: Copilot이 매 세션마다 자동으로 읽는 프로젝트 지시 파일
    - 기술 스택과 정확한 버전 명시
    - 올바른 API 패턴 vs 금지 패턴 (Known AI Mistakes)
    - 코딩 컨벤션과 프로젝트 구조 명시
    - 실습: 우리 프로젝트의 copilot-instructions.md 작성하기
  - 2.4.2 2계층 — 프로젝트 구조 파일 + @workspace (권장)
    - Copilot이 참조하는 파일들: README.md, ARCHITECTURE.md, package.json
    - @workspace 명령어: "프로젝트 전체를 보고 대답해줘"
    - 잘 정리된 프로젝트 구조 = 좋은 컨텍스트
    - 실습: @workspace로 프로젝트 파악 후 기능 추가 요청하기
  - 2.4.3 3계층 — MCP로 외부 지식 연결 (선택)
    - MCP(Model Context Protocol)란: AI에게 외부 도구를 연결하는 방법
    - Context7 MCP: 공식 문서를 실시간으로 참조
    - MCP 설치 및 VS Code 연동
    - 실습: MCP로 Next.js/Supabase 최신 API 확인하기
  - 2.4.4 package.json 버전 고정: 학생 전원이 같은 버전 → 같은 결과
    - 교수 제공 package.json 사용법
    - npm install vs npm ci
2.5 해결: 환각 검증법 — AI 출력을 믿지 말고 확인한다
  - 2.5.1 환각을 의심해야 하는 순간
    - 처음 보는 패키지명이 나올 때
    - 검색해도 공식 문서에 나오지 않는 API일 때
    - 코드가 "너무 깔끔하게" 동작하는 것처럼 보일 때
  - 2.5.2 패키지 검증: npm 공식 사이트에서 패키지명 검색
    - npmjs.com에 존재하는가?
    - 주간 다운로드 수, 최종 업데이트 날짜 확인
    - 악성 패키지(typosquatting) 주의
  - 2.5.3 API 검증: 공식 문서에서 메서드/옵션 대조
    - Supabase: supabase.com/docs 에서 실제 메서드 목록 확인
    - Next.js: nextjs.org/docs 에서 올바른 사용법 대조
    - MCP(Context7)로 실시간 검증
  - 2.5.4 코드 검증 체크리스트
    - import 경로가 실제 존재하는가?
    - 사용한 함수/메서드가 공식 API에 있는가?
    - 환경변수가 하드코딩되어 있지 않은가?
    - 에러 처리가 누락되어 있지 않은가?
  - 2.5.5 환각 발견 시 대응: AI에게 출처를 요구하고, copilot-instructions.md에 금지 패턴 추가
2.6 종합 대응 워크플로우 — AI가 틀렸을 때 어떻게 하는가
  - 2.6.1 Copilot이 코드 생성 → 에러 또는 의심스러운 코드 발견 시
  - 2.6.2 1차: 환각 체크 — 패키지/API/옵션이 실존하는가 확인
  - 2.6.3 2차: 버전 체크 — copilot-instructions.md에 버전/패턴 명시 확인
  - 2.6.4 3차: 컨텍스트 체크 — @workspace로 프로젝트 맥락 재제공
  - 2.6.5 4차: 외부 검증 — MCP 또는 공식 문서에서 직접 검색
  - 2.6.6 해결 후 반드시: copilot-instructions.md에 새로운 규칙/금지 패턴 추가
  - 2.6.7 이 과정 자체가 AI 시대 개발자의 핵심 역량이다
2.7 Copilot Skills와 Agent Mode
  - 2.7.1 Skills란: Copilot에게 특정 작업 능력을 부여
  - 2.7.2 커스텀 프롬프트로 반복 작업 자동화
  - 2.7.3 Agent Mode: 다단계 작업 자동 수행 — 컨텍스트 유지가 더욱 중요
2.8 AI 사용 로그 작성법
  - 2.8.1 어떤 프롬프트를 썼는가
  - 2.8.2 AI가 뭘 틀렸는가 (버전 문제, 컨텍스트 부족, 환각)
  - 2.8.3 어떻게 해결했는가 (copilot-instructions.md 수정 이력 포함)
2.9 과제: Copilot + MCP 설정 완료 + copilot-instructions.md 작성 + 자기소개 페이지 만들기 + 배포

---

## Part 2. 웹 기초: HTML, Tailwind CSS, JavaScript

### Chapter 3. HTML 시맨틱과 Tailwind CSS

> **미션**: Copilot과 함께 게시판 UI를 마크업하고 스타일링한다

3.1 HTML5 문서 구조
  - 3.1.1 DOCTYPE, html, head, body
  - 3.1.2 메타 태그와 SEO 기초
3.2 시맨틱 태그의 의미와 활용
  - 3.2.1 header, nav, main, section, article, aside, footer
  - 3.2.2 올바른 heading 계층 구조
3.3 폼 요소와 레이블링
  - 3.3.1 input, select, textarea
  - 3.3.2 label과 접근성
3.4 Tailwind CSS 기초
  - 3.4.1 유틸리티 퍼스트 CSS란
  - 3.4.2 Tailwind 클래스 읽는 법: p-4, text-lg, bg-blue-500
  - 3.4.3 색상, 타이포그래피, 간격 시스템
  - 3.4.4 Tailwind CSS IntelliSense 확장
3.5 레이아웃 with Tailwind
  - 3.5.1 Flexbox: flex, justify, items, gap
  - 3.5.2 Grid: grid, grid-cols, col-span
  - 3.5.3 반응형 디자인: sm, md, lg 브레이크포인트
  - 3.5.4 실전 패턴: 내비게이션 바, 카드 리스트
3.6 과제: 게시판 UI 마크업 + Tailwind 스타일링 + 배포

### Chapter 4. JavaScript 핵심

> **미션**: JavaScript로 페이지에 생명을 불어넣는다

4.1 변수, 자료형, 연산자
  - 4.1.1 let, const (var를 쓰지 않는 이유)
  - 4.1.2 문자열, 숫자, 불리언, null, undefined
  - 4.1.3 템플릿 리터럴
4.2 함수
  - 4.2.1 함수 선언과 표현식
  - 4.2.2 화살표 함수
  - 4.2.3 매개변수 기본값과 나머지 매개변수
4.3 객체와 배열
  - 4.3.1 객체 리터럴과 프로퍼티 접근
  - 4.3.2 배열 메서드: map, filter, find, reduce
  - 4.3.3 구조 분해 할당과 스프레드 연산자
4.4 비동기 프로그래밍
  - 4.4.1 동기 vs 비동기의 이해
  - 4.4.2 Promise의 개념
  - 4.4.3 async/await 패턴
  - 4.4.4 fetch API로 데이터 가져오기
  - 4.4.5 에러 처리: try-catch
4.5 모듈 시스템
  - 4.5.1 import/export
  - 4.5.2 모듈 구조 설계
4.6 과제: 더미 API 연동 + 필터/검색 인터랙션 + 배포

---

## Part 3. Next.js 프론트엔드

### Chapter 5. Next.js 기초

> **미션**: 여러 페이지를 가진 게시판 앱을 만든다

5.1 React의 핵심 개념
  - 5.1.1 선언적 UI와 컴포넌트
  - 5.1.2 JSX 문법: 표현식, 조건부 렌더링, 리스트
  - 5.1.3 Props: 컴포넌트 간 데이터 전달
5.2 Next.js App Router 구조
  - 5.2.1 app 디렉토리와 파일 기반 라우팅
  - 5.2.2 page.js — 페이지 정의
  - 5.2.3 layout.js — 공통 레이아웃
  - 5.2.4 loading.js — 로딩 UI
  - 5.2.5 error.js — 에러 UI
5.3 동적 라우트
  - 5.3.1 [id] 폴더와 params
  - 5.3.2 동적 페이지 구현
5.4 내비게이션
  - 5.4.1 Link 컴포넌트
  - 5.4.2 useRouter와 프로그래매틱 이동
  - 5.4.3 활성 링크 스타일링
5.5 과제: 게시글 목록/상세/작성 페이지 구현 + 배포

### Chapter 6. Next.js 상태 관리와 데이터 페칭

> **미션**: 게시판 프론트엔드를 완성한다

6.1 useState와 이벤트 처리
  - 6.1.1 상태의 개념과 useState
  - 6.1.2 이벤트 핸들러 작성
  - 6.1.3 폼 입력 처리
  - 6.1.4 상태 업데이트와 불변성
6.2 useEffect와 사이드 이펙트
  - 6.2.1 useEffect 기본 사용법
  - 6.2.2 의존성 배열
  - 6.2.3 클린업 함수
6.3 Server Component vs Client Component
  - 6.3.1 "use client" 지시어
  - 6.3.2 언제 서버 컴포넌트를 쓰는가
  - 6.3.3 언제 클라이언트 컴포넌트를 쓰는가
6.4 데이터 페칭 패턴
  - 6.4.1 서버 컴포넌트에서 fetch
  - 6.4.2 클라이언트 컴포넌트에서 useEffect + fetch
  - 6.4.3 로딩/에러 상태 처리
6.5 Context API와 커스텀 훅
  - 6.5.1 전역 상태와 Context
  - 6.5.2 커스텀 훅으로 로직 재사용
6.6 과제: 게시판 프론트엔드 완성 (더미 데이터) + 배포

---

## Part 4. 아키텍처 & 디자인 설계

### Chapter 7. 웹 앱 아키텍처 & 디자인 설계

> **미션**: 코딩 전에 "뭘 만들지"를 확실히 잡는다 — 설계가 바이브코딩의 품질을 결정한다

7.1 왜 설계가 먼저인가
  - 7.1.1 설계 없는 바이브코딩의 문제점
  - 7.1.2 AI에게 정확히 지시하려면 설계가 필요하다
  - 7.1.3 좋은 설계 = 좋은 프롬프트
7.2 페이지 구조 설계
  - 7.2.1 어떤 페이지가 필요한가 (페이지 맵)
  - 7.2.2 페이지별 URL 구조 정의
  - 7.2.3 페이지 간 이동 흐름
7.3 간단한 와이어프레임
  - 7.3.1 와이어프레임이란: 복잡한 디자인이 아닌 뼈대 잡기
  - 7.3.2 종이/화이트보드로 그리기
  - 7.3.3 각 페이지의 컴포넌트 배치
  - 7.3.4 심플한 디자인 원칙: 깔끔하고 명확하게
7.4 컴포넌트 계층 설계
  - 7.4.1 UI를 컴포넌트 단위로 분해
  - 7.4.2 컴포넌트 트리와 데이터 흐름
  - 7.4.3 어떤 컴포넌트가 상태를 가지는가
7.5 데이터 모델 설계
  - 7.5.1 어떤 데이터가 필요한가
  - 7.5.2 테이블 구조 미리 잡기 (Supabase 대비)
  - 7.5.3 사용자 → 게시글 → 댓글 관계
7.6 설계서를 컨텍스트로 전환하기 — Copilot에게 설계 의도를 심는다
  - 7.6.1 copilot-instructions.md 업데이트: 프로젝트 구조, 페이지 맵, 데이터 모델 반영
  - 7.6.2 ARCHITECTURE.md 작성: 설계 의도와 데이터 흐름 문서화
  - 7.6.3 설계가 달라지면 컨텍스트도 즉시 갱신한다
  - 7.6.4 @workspace + 설계 문서로 Copilot에게 "프로젝트를 이해시킨 후" 코드 생성 지시
7.7 과제: 개인 프로젝트 설계서 작성 (페이지 맵 + 와이어프레임 + 데이터 모델 + copilot-instructions.md + ARCHITECTURE.md)

---

## ※ 8주차: 중간고사

| 항목 | 내용 |
|------|------|
| 시험 형식 | **코딩 객관식** |
| 출제 범위 | Ch1~Ch7 (HTML, CSS, JavaScript, Next.js, 설계) |
| 배점 | 전체 평가의 20% |

---

## Part 5. Supabase 백엔드 통합

### Chapter 8. Supabase 시작하기

> **미션**: 게시판에 진짜 데이터베이스를 연결한다

8.1 BaaS(Backend as a Service) 개념
  - 8.1.1 프론트엔드 개발자가 백엔드를 다루는 시대
  - 8.1.2 Supabase란: 오픈소스 Firebase 대안
8.2 Supabase 프로젝트 생성
  - 8.2.1 가입 및 새 프로젝트 만들기
  - 8.2.2 대시보드 탐색: Table Editor, SQL Editor, Auth
  - 8.2.3 API 키 확인
8.3 Next.js와 Supabase 연결
  - 8.3.1 @supabase/supabase-js 설치
  - 8.3.2 환경 변수 설정 (.env.local)
  - 8.3.3 Supabase 클라이언트 초기화
  - 8.3.4 Vercel 환경 변수 등록
8.4 데이터 모델링
  - 8.4.1 관계형 데이터베이스 기초: 테이블, 행, 열
  - 8.4.2 7장 설계서를 기반으로 테이블 생성
  - 8.4.3 테이블 관계: 1:N (사용자 → 게시글)
  - 8.4.4 SQL로 테이블 생성
8.5 과제: Supabase 프로젝트 설정 + 테이블 생성 + 배포

### Chapter 9. Supabase Authentication

> **미션**: Google 계정으로 로그인할 수 있는 게시판을 만든다

9.1 인증의 기본 개념
  - 9.1.1 인증(Authentication) vs 인가(Authorization)
  - 9.1.2 세션과 토큰
  - 9.1.3 OAuth 소셜 로그인의 흐름
9.2 Google OAuth 설정
  - 9.2.1 Google Cloud Console 설정
  - 9.2.2 Supabase Auth Provider 설정
  - 9.2.3 콜백 URL 등록
9.3 인증 구현
  - 9.3.1 signInWithOAuth
  - 9.3.2 signOut
  - 9.3.3 onAuthStateChange: 세션 상태 감지
9.4 인증 상태 관리
  - 9.4.1 AuthContext 구현
  - 9.4.2 로그인/로그아웃 UI 흐름
  - 9.4.3 보호된 페이지 만들기 (미들웨어)
9.5 과제: Google 로그인 구현 + 배포

### Chapter 10. Supabase Database CRUD

> **미션**: 게시글을 생성, 조회, 수정, 삭제할 수 있다

10.1 기본 SQL 문법
  - 10.1.1 SELECT, INSERT, UPDATE, DELETE
  - 10.1.2 WHERE, ORDER BY, LIMIT
  - 10.1.3 JOIN 기초
10.2 Supabase 클라이언트로 CRUD
  - 10.2.1 select: 데이터 조회
  - 10.2.2 insert: 데이터 생성
  - 10.2.3 update: 데이터 수정
  - 10.2.4 delete: 데이터 삭제
10.3 쿼리 심화
  - 10.3.1 필터링: eq, neq, gt, lt, like, ilike
  - 10.3.2 정렬과 페이지네이션
  - 10.3.3 관계 데이터 조회
10.4 React와 CRUD 연결
  - 10.4.1 게시글 목록 조회
  - 10.4.2 게시글 작성 폼
  - 10.4.3 게시글 수정/삭제
  - 10.4.4 작성자 정보 표시
10.5 과제: 게시판 CRUD 완성 + 배포

### Chapter 11. Row Level Security (RLS)

> **미션**: "내 글은 나만 수정/삭제할 수 있다"를 데이터베이스가 강제한다

11.1 RLS의 필요성
  - 11.1.1 클라이언트 사이드 보안의 한계
  - 11.1.2 서버 사이드 권한 강제의 중요성
11.2 RLS 기본 문법
  - 11.2.1 정책 생성: CREATE POLICY
  - 11.2.2 USING과 WITH CHECK
  - 11.2.3 auth.uid() 함수
11.3 권한 시나리오 구현
  - 11.3.1 "누구나 읽기 가능"
  - 11.3.2 "로그인 사용자만 작성"
  - 11.3.3 "작성자만 수정/삭제"
  - 11.3.4 "관리자 전체 권한"
11.4 RLS 테스트와 디버깅
  - 11.4.1 다른 사용자 계정으로 테스트
  - 11.4.2 권한 실패 케이스 재현
  - 11.4.3 정책 충돌 해결
11.5 과제: 게시판 권한 정책 작성 + 검증 + 배포

---

## Part 6. 완성과 프로젝트

### Chapter 12. 에러 처리와 UX 완성

> **미션**: 사용자가 불편함 없이 쓸 수 있는 앱으로 다듬는다

12.1 에러의 종류
  - 12.1.1 네트워크 에러
  - 12.1.2 인증 에러
  - 12.1.3 권한 에러
  - 12.1.4 유효성 검증 에러
12.2 에러 처리 패턴
  - 12.2.1 try-catch 구조화
  - 12.2.2 Next.js error.js 활용
  - 12.2.3 사용자 친화적 에러 메시지
12.3 로딩 상태 관리
  - 12.3.1 Next.js loading.js 활용
  - 12.3.2 스켈레톤 UI with Tailwind
  - 12.3.3 Optimistic UI 패턴
12.4 폼 유효성 검증
  - 12.4.1 클라이언트 사이드 검증
  - 12.4.2 에러 메시지 표시 UX
12.5 성능 기초
  - 12.5.1 이미지 최적화: next/image
  - 12.5.2 메타데이터와 SEO
12.6 과제: UX 개선 + 최종 다듬기 + 배포

### Chapter 13. 개인 프로젝트 구현

> **미션**: 나만의 풀스택 웹 앱을 완성하고 세상에 공개한다

13.1 프로젝트 요구사항 확인
  - 13.1.1 7장 설계서 재검토 및 보완
  - 13.1.2 기능 우선순위 정리
  - 13.1.3 MVP(최소 기능 제품) 범위 확정
13.2 바이브코딩으로 구현
  - 13.2.1 기능별 Copilot 프롬프트 전략
  - 13.2.2 점진적 구현과 배포
  - 13.2.3 에러 대응과 디버깅
13.3 최종 배포
  - 13.3.1 Vercel 환경 변수 최종 점검
  - 13.3.2 배포 후 기능 테스트
  - 13.3.3 도메인 설정 (선택)
13.4 문서화
  - 13.4.1 README 작성
  - 13.4.2 AI 사용 로그 정리
13.5 과제: 프로젝트 완성 + 배포 URL 제출

---

## ※ 15주차: 기말 — 개인 프로젝트 제출

| 항목 | 내용 |
|------|------|
| 제출 형식 | **배포 URL + GitHub 저장소 + AI 사용 로그** |
| 평가 기준 | 기능 완성도, 배포 동작, 코드 품질, AI 활용 과정 |

### 전체 평가 비율

| 항목 | 비율 |
|------|:---:|
| 중간고사 (코딩 객관식) | 20% |
| 기말 프로젝트 (개인 프로젝트 제출) | 40% |
| 주차별 과제 (수업 중 제출, 13회) | 35% |
| 출석 | 5% |

---

## 부록

### Appendix A. 개발 환경 설정 가이드
A.1 Node.js 설치 (LTS 버전)
A.2 VS Code 설치 및 필수 확장
  - A.2.1 GitHub Copilot / Copilot Chat
  - A.2.2 Tailwind CSS IntelliSense
  - A.2.3 ES7+ React/Redux/React-Native snippets
  - A.2.4 Prettier - Code formatter
A.3 Git 설치 및 GitHub 계정
A.4 터미널 기본 명령어
A.5 Vercel 계정 생성

### Appendix B. AI 사용 로그 템플릿
B.1 로그 작성 양식
B.2 작성 예시
B.3 자주 하는 실수

### Appendix C. copilot-instructions.md 작성 가이드

#### 기본 템플릿

```markdown
# Project Context

## Tech Stack
- Next.js 15.x (App Router)
- Tailwind CSS 4.x
- Supabase JS v2.x
- Vercel 배포

## Project Structure
- app/ — 페이지 및 라우팅
- components/ — 재사용 UI 컴포넌트
- lib/ — Supabase 클라이언트, 유틸리티
- public/ — 정적 파일

## Page Map
- / — 메인 (게시글 목록)
- /posts/[id] — 게시글 상세
- /posts/new — 게시글 작성
- /login — 로그인

## Data Model
- users: id, email, name, avatar_url
- posts: id, title, content, author_id, created_at

## Coding Conventions
- 함수형 컴포넌트만 사용
- async/await 패턴 (then 체이닝 금지)
- Supabase 클라이언트는 lib/supabase.js에서 import
- Tailwind CSS 유틸리티 클래스만 사용
- Server Component 기본, 상호작용 시 "use client"

## Design Principle
- 심플하고 깔끔한 UI
- Tailwind 기본 컬러 활용
- 복잡한 애니메이션/장식 금지

## 금지 사항
- class 컴포넌트 사용 금지
- pages/ 라우터 금지 (App Router만)
- CSS Modules, styled-components 금지
- createClient를 컴포넌트 내부에서 호출 금지
```

#### 설계서 기반 확장 예시

```markdown
## 기능 명세
- 게시글 CRUD: 로그인 사용자만 작성, 작성자만 수정/삭제
- 소셜 로그인: Google OAuth
- RLS: 읽기는 공개, 쓰기는 인증 필요

## AI 작업 지침
- 새 기능 추가 시 기존 컴포넌트 구조를 따를 것
- 에러 처리는 try-catch + 사용자 메시지로 통일
- 로딩 상태는 loading.js 또는 스켈레톤 UI 사용
```

### Appendix D. MCP 설정 가이드
D.1 MCP(Model Context Protocol) 개념
D.2 Context7 MCP 설치
D.3 VS Code에서 MCP 서버 연동
D.4 최신 문서 참조 프롬프트 예시
D.5 트러블슈팅

### Appendix E. Copilot 단축키 및 활용법

#### 기본 단축키 (VS Code)

| 단축키 | 기능 |
|--------|------|
| `Tab` | 제안 수락 |
| `Esc` | 제안 거부 |
| `Alt + ]` | 다음 제안 보기 |
| `Alt + [` | 이전 제안 보기 |
| `Ctrl + Enter` | 여러 제안 패널로 보기 |
| `Ctrl + I` | Copilot Chat 인라인 열기 |

#### Copilot Chat 명령어

| 명령어 | 용도 |
|--------|------|
| `@workspace` | 프로젝트 전체 컨텍스트 참조 |
| `/explain` | 코드 설명 요청 |
| `/fix` | 에러 수정 요청 |
| `/tests` | 테스트 코드 생성 |
| `/doc` | 문서/주석 생성 |

### Appendix F. 체크리스트 모음
F.1 Copilot 코드 검증 체크리스트
F.2 보안 체크리스트
F.3 배포 전 체크리스트

### Appendix G. 참고 자료
G.1 공식 문서: Next.js, Tailwind CSS, Supabase, Vercel
G.2 추천 학습 자료
G.3 커뮤니티 및 포럼

---

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
- **매주 과제 제출**: B회차 수업 시간 내에 과제를 완성하고 Google Classroom에 제출한다
- **두 번의 시험**: 중간고사(Ch1-7)와 기말고사(Ch8-12) 모두 코딩 객관식으로 평가한다

---

## 수업 운영 구조 (주 2회 × 90분)

매주 2회 수업을 진행하며, A회차(강의+시연)와 B회차(개인 실습+코드리뷰)로 구분한다.

### A회차 (90분) — 강의 + 라이브 시연

| 시간 | 내용 | Copilot 사용 |
|------|------|-------------|
| 00:00~00:05 | 오늘의 미션 + 빠른 진단 (퀴즈 1문항) | 사용 안 함 |
| 00:05~00:45 | 핵심 개념 강의 + 프롬프트 패턴 | 사용 안 함 |
| 00:45~01:20 | 라이브 코딩 시연 (교수 주도) | 교수 시연 시 선택 사용 |
| 01:20~01:27 | 핵심 정리 + B회차 과제 스펙 공개 | |
| 01:27~01:30 | Exit ticket (1문항) | |

### B회차 (90분) — 개인 실습 + 코드리뷰

| 시간 | 내용 | Copilot 사용 |
|------|------|-------------|
| 00:00~00:05 | A회차 핵심 리캡 + 과제 스펙 확인 | |
| 00:05~00:10 | 바이브코딩 가이드 + 스타터 코드 안내 | |
| 00:10~01:00 | 개인 실습 (체크포인트 3회, 교수 순회 지도) | 적극 사용 |
| 01:00~01:05 | 배포 확인 + Google Classroom 제출 | |
| 01:05~01:25 | 결과 공유 + 코드리뷰 토론 (2-3명 발표) | |
| 01:25~01:30 | 교수 종합 피드백 + 다음 주 예고 | |

### 스타터 코드 정책

A회차와 B회차 사이 2일 간격으로 컨텍스트가 끊기는 문제를 해결한다:
- B회차 시작 시 **스타터 코드**(A회차 시연 결과물)를 제공하여 동일 출발선에서 시작
- `practice/chapter{N}/starter/` 폴더에 위치
- A회차에서 완성 못 한 학생도 B회차에서 바로 실습 가능

### 과제 제출 (매주 동일 형식)

Google Classroom에 아래 두 항목만 제출한다:

```
① 배포 URL (Vercel)
② AI가 틀린 부분 1개
   — 무엇이 잘못됐고 어떻게 고쳤는지 1-2문장
   — 딱히 없었으면 "Copilot이 생성한 코드에서 확인한 점" 기술
```

### 과제 채점 (매주 동일 기준)

| 항목 | 배점 |
|------|:---:|
| 배포 URL 동작 확인 | 7점 |
| AI 검증 서술 | 3점 |
| **합계** | **10점** |

※ B회차 과제는 12회 실시 (8주차 중간고사, 15주차 기말고사 제외). 12회 × 10점 = 120점 만점을 30%로 환산한다.

### C파일 (모범 구현 + 해설)

B회차 과제 제출 후 `docs/ch{N}C.md`로 공개한다. 모범 구현 코드 + 핵심 포인트 해설 형태로 제공한다.

### 교수 전용 요소

- `> **라이브 코딩 시연**:` — A회차에서 교수가 직접 코딩하며 보여주는 시연
- `> **Copilot 활용**:` — B회차에서 Copilot 사용 가이드
- `> **강의 팁**:` — 수업 운영 조언
- `> **토론 가이드**:` — B회차 코드리뷰 토론 운영 방향

### 크로스 플랫폼 원칙

모든 코드, 명령어, 실습은 **Windows와 macOS** 모두에서 동작해야 한다.

- **기본 기준은 Windows**, macOS가 다를 경우 부연 설명 추가
- 터미널 명령어: Windows 기준 + macOS 차이점 표기
  - 예: `del node_modules` (Windows) / `rm -rf node_modules` (macOS)
- 경로 구분자 하드코딩 금지 — Node.js `path.join()` 또는 `/` 사용
- OS 특정 도구 사용 금지 (pbcopy, open 등)
- 환경변수 설정: `.env.local` 파일 방식 통일 (export 명령 대신)
- 단축키 표기: `Ctrl` 기준, macOS는 `Cmd`로 병기

---

## 15주 운영 계획

| 주차 | 챕터 | A회차 (강의 + 시연) | B회차 (개인 실습 + 코드리뷰) | 과제 |
|:---:|:---:|------|------|------|
| 1 | Ch1 | 웹의 구조 + 환경 설정 + 첫 배포 시연 | 개인 프로필 페이지 수정 + 배포 | 배포 URL |
| 2 | Ch2 | AI 3대 한계 + Copilot 세팅 + 바이브코딩 시연 | copilot-instructions.md + 자기소개 페이지 | 배포 URL |
| 3 | Ch3 | HTML 시맨틱 + Tailwind CSS 강의 | 게시판 UI 마크업 + 스타일링 | 배포 URL |
| 4 | Ch4 | JavaScript 핵심 강의 | API 연동 + 인터랙션 구현 | 배포 URL |
| 5 | Ch5 | Next.js App Router 강의 | 게시글 목록/상세/작성 페이지 | 배포 URL |
| 6 | Ch6 | 상태 관리 + 데이터 페칭 강의 | 프론트엔드 완성 | 배포 URL |
| 7 | Ch7 | 아키텍처 + AI 디자인 설계 강의 | 설계서 작성 | 설계서 제출 |
| **8** | — | **중간고사 대비** | **중간고사** | **코딩 객관식** |
| 9 | Ch8 | Supabase 기초 + DB 연결 강의 | 테이블 생성 + 연동 | 배포 URL |
| 10 | Ch9 | 인증 개념 + OAuth 강의 | Google 로그인 구현 | 배포 URL |
| 11 | Ch10 | SQL + CRUD 강의 | 게시글 CRUD 구현 | 배포 URL |
| 12 | Ch11 | RLS 보안 강의 | 권한 정책 설정 + 검증 | 배포 URL |
| 13 | Ch12 | 에러 처리 + UX 강의 | 로딩/에러 UI 구현 | 배포 URL |
| 14 | Ch13 | 개인 프로젝트 가이드 + 워크숍 | 프로젝트 개발 + 코드리뷰 | 배포 URL |
| **15** | — | **프로젝트 최종 발표 + 제출** | **기말고사** | **코딩 객관식 (Ch8-12)** |

---

## Part 1. 첫 배포와 AI 협업 환경

### Chapter 1. 첫 배포 — create-next-app에서 Vercel까지

> **미션**: 수업이 끝나면 내 웹사이트가 인터넷에 올라간다

**A회차: 웹의 구조 + 환경 설정 + 첫 배포**

1.1 웹이 동작하는 방식
  - 1.1.1 클라이언트-서버 아키텍처
  - 1.1.2 HTTP 요청과 응답의 흐름
  - 1.1.3 브라우저가 화면을 그리는 과정
1.2 개발 환경 설정
  - 1.2.1 Node.js 설치 (Windows 설치 관리자 기준, macOS는 Homebrew 또는 공식 설치 관리자)
  - 1.2.2 VS Code 설치 및 필수 확장
  - 1.2.3 Git 설치 및 GitHub 계정 생성
  - 1.2.4 터미널 기본 명령어 (PowerShell 기준, macOS Terminal 병기)
1.3 Next.js 프로젝트 생성
  - 1.3.1 npx create-next-app@latest
  - 1.3.2 프로젝트 구조 살펴보기
  - 1.3.3 개발 서버 실행: npm run dev
  - 1.3.4 DevTools 실습: 요소/콘솔/네트워크 탭

> **라이브 코딩 시연**: 교수가 create-next-app부터 Vercel 배포까지 전 과정을 시연한다.

1.4 GitHub에 올리기
  - 1.4.1 git init, add, commit, push
  - 1.4.2 GitHub 저장소 생성 및 연결
1.5 Vercel 배포
  - 1.5.1 Vercel 가입 및 GitHub 연동
  - 1.5.2 프로젝트 임포트
  - 1.5.3 자동 배포 확인: push → 배포

**B회차: 개인 프로필 페이지 배포**

1.6 과제: 첫 페이지 수정 → git push → 배포 URL 제출

### Chapter 2. Copilot 세팅과 바이브코딩

> **미션**: Copilot을 제대로 세팅하고, 말로 설명해서 페이지를 만든다

**A회차: AI 3대 한계 + Copilot 세팅 + 바이브코딩**

2.1 바이브코딩이란
  - 2.1.1 AI 시대의 개발 방식 변화
  - 2.1.2 바이브코딩의 원리: 설명 → 생성 → 검증 → 반복
  - 2.1.3 기본기가 필요한 이유: AI 출력을 판단하려면
2.2 AI 코딩의 3대 한계 — 이것을 모르면 바이브코딩은 실패한다
  - 2.2.1 한계 ①: 버전 불일치 — AI는 과거에 학습했지만, 라이브러리는 오늘 업데이트된다
    - 실제 사례: Next.js 15에서 AI가 14 문법을 제안하면 에러가 난다
    - Tailwind CSS 4 vs 3, Supabase v2 API 변경 등
  - 2.2.2 한계 ②: 컨텍스트 소실 — AI는 내 프로젝트를 모른다
    - 세션이 끝나면 모든 대화가 사라진다 (장기 기억 없음)
    - 열린 파일만 본다: 프로젝트 전체를 항상 파악하지 못한다
    - 설계 의도를 모른 채 코드를 생성한다
  - 2.2.3 한계 ③: 환각 — AI는 존재하지 않는 것을 만들어낸다
    - 없는 npm 패키지를 추천한다 (설치하면 에러 또는 악성 패키지)
    - 실재하지 않는 API 메서드를 쓴다 (supabase.from().upsertMany() 같은 가짜)
    - 공식 문서에 없는 옵션/파라미터를 자신 있게 제시한다
    - "그럴듯하지만 틀린" 코드가 가장 위험한 이유
  - 2.2.4 3대 한계의 관계: 버전 문제 + 컨텍스트 부족 → 환각 확률 증가
2.3 GitHub Copilot 설정
  - 2.3.1 GitHub 학생 계정 신청 (Copilot 무료)
  - 2.3.2 VS Code Copilot / Copilot Chat 확장 설치
  - 2.3.3 Copilot 자동완성: Tab 수락, 주석으로 의도 전달
  - 2.3.4 Copilot Chat: @workspace, /explain, /fix, Ctrl+I (macOS: Cmd+I)

> **라이브 코딩 시연**: 교수가 copilot-instructions.md를 작성하고, Copilot에게 자기소개 페이지를 생성시키는 과정을 시연한다.

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

**B회차: Copilot 설정 + 자기소개 페이지**

2.9 과제: Copilot + MCP 설정 완료 + copilot-instructions.md 작성 + 자기소개 페이지 만들기 + 배포

---

## Part 2. 웹 기초: HTML, Tailwind CSS, JavaScript

### Chapter 3. HTML 시맨틱과 Tailwind CSS

> **미션**: Copilot과 함께 게시판 UI를 마크업하고 스타일링한다

**A회차: HTML + Tailwind CSS 강의**

3.1 HTML5 문서 구조
  - 3.1.1 DOCTYPE, html, head, body
  - 3.1.2 메타 태그와 SEO 기초
3.2 시맨틱 태그의 의미와 활용
  - 3.2.1 div vs 시맨틱 태그
  - 3.2.2 주요 시맨틱 태그 — 게시판 구조로 설명
  - 3.2.3 올바른 heading 계층 구조
3.3 폼 요소와 접근성
  - 3.3.1 input, select, textarea
  - 3.3.2 label과 접근성
  - 3.3.3 AI가 자주 틀리는 HTML 패턴
3.4 CSS의 변화와 Tailwind CSS
  - 3.4.1 CSS는 어떻게 발전해왔는가
  - 3.4.2 유틸리티 퍼스트 CSS란
  - 3.4.3 Tailwind 클래스 읽는 법: 속성-값 패턴, 색상, 타이포그래피, 간격 시스템
  - 3.4.4 Tailwind CSS IntelliSense 확장

> **라이브 코딩 시연**: 교수가 게시판 레이아웃을 Tailwind로 구현하는 과정을 시연한다.

3.5 레이아웃과 반응형
  - 3.5.1 Flexbox: flex, justify, items, gap
  - 3.5.2 Grid: grid, grid-cols, col-span
  - 3.5.3 반응형 디자인: sm, md, lg 브레이크포인트
  - 3.5.4 실전 패턴: 내비게이션 바, 카드 리스트

**B회차: 게시판 UI 마크업 실습**

3.6 과제: 게시판 UI 마크업 + Tailwind 스타일링 + 배포

### Chapter 4. JavaScript 핵심

> **미션**: JavaScript로 페이지에 생명을 불어넣는다

**A회차: JavaScript 핵심 강의**

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

> **라이브 코딩 시연**: 교수가 공개 API를 호출하여 데이터를 화면에 표시하는 과정을 시연한다.

4.5 모듈 시스템
  - 4.5.1 import/export
  - 4.5.2 모듈 구조 설계

**B회차: API 연동 + 인터랙션 실습**

4.6 과제: 더미 API 연동 + 필터/검색 인터랙션 + 배포

---

## Part 3. Next.js 프론트엔드

### Chapter 5. Next.js 기초

> **미션**: 여러 페이지를 가진 게시판 앱을 만든다

**A회차: Next.js App Router 강의**

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

> **라이브 코딩 시연**: 교수가 게시글 목록/상세 페이지를 App Router로 구현하는 과정을 시연한다.

5.4 내비게이션
  - 5.4.1 Link 컴포넌트
  - 5.4.2 useRouter와 프로그래매틱 이동
  - 5.4.3 활성 링크 스타일링

**B회차: 게시글 페이지 구현 실습**

5.5 과제: 게시글 목록/상세/작성 페이지 구현 + 배포

### Chapter 6. Next.js 상태 관리와 데이터 페칭

> **미션**: 게시판 프론트엔드를 완성한다

**A회차: 상태 관리 + 데이터 페칭 강의**

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

> **라이브 코딩 시연**: 교수가 게시판에 상태 관리와 데이터 페칭을 추가하는 과정을 시연한다.

6.4 데이터 페칭 패턴
  - 6.4.1 서버 컴포넌트에서 fetch
  - 6.4.2 클라이언트 컴포넌트에서 useEffect + fetch
  - 6.4.3 로딩/에러 상태 처리
6.5 Context API와 커스텀 훅
  - 6.5.1 전역 상태와 Context
  - 6.5.2 커스텀 훅으로 로직 재사용

**B회차: 프론트엔드 완성 실습**

6.6 과제: 게시판 프론트엔드 완성 (더미 데이터) + 배포

---

## Part 4. 아키텍처 & 디자인 설계

### Chapter 7. 웹 앱 아키텍처 & AI 디자인 설계

> **미션**: 코딩 전에 "뭘 만들지"를 확실히 잡는다 — AI 디자인 도구와 설계서가 바이브코딩의 품질을 결정한다

**A회차: 아키텍처 + AI 디자인 설계 강의**

7.1 왜 설계가 먼저인가
  - 7.1.1 설계 없는 바이브코딩의 문제점: "AI 슬롭"과 균일한 UI
  - 7.1.2 AI는 디자인 감각이 없다 — 시각적 컨텍스트가 필요한 이유
  - 7.1.3 좋은 설계 = 좋은 프롬프트: 3단계 디자인 파이프라인
7.2 페이지 구조 설계
  - 7.2.1 어떤 페이지가 필요한가 (페이지 맵)
  - 7.2.2 페이지별 URL 구조 정의 (Next.js App Router 기준)
  - 7.2.3 페이지 간 이동 흐름 (유저 플로우)
7.3 AI로 와이어프레임 만들기
  - 7.3.1 와이어프레임이란: 복잡한 디자인이 아닌 뼈대 잡기
  - 7.3.2 종이/화이트보드에서 시작하기
  - 7.3.3 Copilot Vision으로 스케치를 코드로 변환하기
  - 7.3.4 v0로 프로토타입 생성하고 프로젝트에 통합하기

> **라이브 코딩 시연**: 교수가 설계서를 작성하고, shadcn/ui를 설치하고, AI로 와이어프레임을 코드로 변환하는 과정을 시연한다.

7.4 shadcn/ui로 컴포넌트 시스템 구축하기
  - 7.4.1 shadcn/ui란: 복사해서 쓰는 컴포넌트 라이브러리
  - 7.4.2 npx shadcn init — 프로젝트에 설치하기
  - 7.4.3 핵심 컴포넌트 추가: Button, Card, Input, Dialog
  - 7.4.4 테마 커스터마이징: CSS 변수로 디자인 토큰 설정
7.5 디자인 프롬프트 전략 — AI에게 "우리 디자인"을 가르치기
  - 7.5.1 디자인 토큰이란: 색상, 타이포그래피, 간격의 체계화
  - 7.5.2 copilot-instructions.md에 디자인 규칙 추가하기
  - 7.5.3 효과적인 디자인 프롬프트 5가지 전략
  - 7.5.4 좋은 디자인 프롬프트 vs 나쁜 디자인 프롬프트
7.6 설계서를 AI 컨텍스트로 통합하기
  - 7.6.1 데이터 목록 정리: 어떤 데이터를 저장해야 하는가 (Supabase 대비)
  - 7.6.2 ARCHITECTURE.md 작성: 페이지 맵 + 컴포넌트 계층 + 데이터 모델
  - 7.6.3 AI 생성 디자인 검증 체크리스트: 접근성, 반응형, 일관성
  - 7.6.4 @workspace + 설계 문서로 Copilot에게 코드 생성 지시하기

**B회차: 설계서 작성 실습**

7.7 과제: 개인 프로젝트 설계서 작성
    (페이지 맵 + AI 와이어프레임 + shadcn/ui 테마 설정 + 데이터 모델 + copilot-instructions.md + ARCHITECTURE.md)

---

## ※ 8주차: 중간고사

| 항목 | 내용 |
|------|------|
| A회차 | 중간고사 대비 (Ch1~Ch7 복습) |
| B회차 | **중간고사 실시** |
| 시험 형식 | **코딩 객관식** |
| 출제 범위 | Ch1~Ch7 (HTML, CSS, JavaScript, Next.js, 설계) |
| 배점 | 전체 평가의 20% |

---

## Part 5. Supabase 백엔드 통합

### Chapter 8. Supabase 시작하기

> **미션**: 게시판에 진짜 데이터베이스를 연결한다

**A회차: Supabase 기초 + DB 연결 강의**

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
  - 8.3.5 연결 테스트

> **라이브 코딩 시연**: 교수가 Supabase 프로젝트를 생성하고 Next.js와 연결하는 전 과정을 시연한다.

8.4 데이터 모델링
  - 8.4.1 관계형 데이터베이스 기초: 테이블, 행, 열
  - 8.4.2 7장 설계서를 기반으로 테이블 생성
  - 8.4.3 테이블 관계: 1:N (사용자 → 게시글)
  - 8.4.4 SQL로 테이블 생성

**B회차: Supabase 연동 실습**

8.5 과제: Supabase 프로젝트 설정 + 테이블 생성 + 배포

### Chapter 9. Supabase Authentication

> **미션**: Google 계정으로 로그인할 수 있는 게시판을 만든다

**A회차: 인증 개념 + OAuth 강의**

9.1 인증의 기본 개념
  - 9.1.1 인증(Authentication) vs 인가(Authorization)
  - 9.1.2 세션과 토큰
  - 9.1.3 OAuth 소셜 로그인의 흐름
9.2 Google OAuth 설정
  - 9.2.1 Google Cloud Console 설정
  - 9.2.2 Supabase Auth Provider 설정
  - 9.2.3 콜백 URL 등록

> **라이브 코딩 시연**: 교수가 Google OAuth 설정부터 로그인/로그아웃 구현까지 시연한다.

9.3 인증 구현
  - 9.3.1 signInWithOAuth
  - 9.3.2 signOut
  - 9.3.3 onAuthStateChange: 세션 상태 감지
  - 9.3.4 콜백 페이지 구현
9.4 인증 상태 관리
  - 9.4.1 AuthContext 구현
  - 9.4.2 로그인/로그아웃 UI 흐름
  - 9.4.3 보호된 페이지 만들기 (미들웨어)

**B회차: Google 로그인 구현 실습**

9.5 과제: Google 로그인 구현 + 배포

### Chapter 10. Supabase Database CRUD

> **미션**: 게시글을 생성, 조회, 수정, 삭제할 수 있다

**A회차: SQL + CRUD 강의**

10.1 기본 SQL 문법
  - 10.1.1 SELECT, INSERT, UPDATE, DELETE
  - 10.1.2 WHERE, ORDER BY, LIMIT
  - 10.1.3 JOIN 기초
10.2 Supabase 클라이언트로 CRUD
  - 10.2.1 select: 데이터 조회
  - 10.2.2 insert: 데이터 생성
  - 10.2.3 update: 데이터 수정
  - 10.2.4 delete: 데이터 삭제

> **라이브 코딩 시연**: 교수가 게시글 CRUD 전 과정을 Supabase 클라이언트로 구현한다.

10.3 쿼리 심화
  - 10.3.1 필터링: eq, neq, gt, lt, like, ilike
  - 10.3.2 정렬과 페이지네이션
  - 10.3.3 관계 데이터 조회
  - 10.3.4 파일 업로드: Supabase Storage
10.4 React와 CRUD 연결
  - 10.4.1 게시글 목록 조회
  - 10.4.2 게시글 작성 폼
  - 10.4.3 게시글 수정/삭제
  - 10.4.4 작성자 정보 표시

**B회차: 게시글 CRUD 구현 실습**

10.5 과제: 게시판 CRUD 완성 + 배포

### Chapter 11. Row Level Security (RLS)

> **미션**: "내 글은 나만 수정/삭제할 수 있다"를 데이터베이스가 강제한다

**A회차: RLS 보안 강의**

11.1 RLS의 필요성
  - 11.1.1 클라이언트 사이드 보안의 한계
  - 11.1.2 서버 사이드 권한 강제의 중요성
11.2 RLS 기본 문법
  - 11.2.1 정책 생성: CREATE POLICY
  - 11.2.2 USING과 WITH CHECK
  - 11.2.3 auth.uid() 함수

> **라이브 코딩 시연**: 교수가 RLS 정책을 작성하고, 다른 계정으로 권한 테스트하는 과정을 시연한다.

11.3 권한 시나리오 구현
  - 11.3.1 "누구나 읽기 가능"
  - 11.3.2 "로그인 사용자만 작성"
  - 11.3.3 "작성자만 수정/삭제"
  - 11.3.4 "관리자 전체 권한"
11.4 RLS 테스트와 디버깅
  - 11.4.1 다른 사용자 계정으로 테스트
  - 11.4.2 권한 실패 케이스 재현
  - 11.4.3 SQL Editor에서 정책 확인
  - 11.4.4 정책 충돌 해결
  - 11.4.5 흔한 RLS 트러블슈팅

**B회차: 권한 정책 구현 실습**

11.5 과제: 게시판 권한 정책 작성 + 검증 + 배포

---

## Part 6. 완성과 프로젝트

### Chapter 12. 에러 처리와 UX 완성

> **미션**: 사용자가 불편함 없이 쓸 수 있는 앱으로 다듬는다

**A회차: 에러 처리 + UX 강의**

12.1 에러의 종류
  - 12.1.1 네트워크 에러
  - 12.1.2 인증 에러
  - 12.1.3 권한 에러
  - 12.1.4 유효성 검증 에러
12.2 에러 처리 패턴
  - 12.2.1 try-catch 구조화
  - 12.2.2 Next.js error.js 활용
  - 12.2.3 사용자 친화적 에러 메시지

> **라이브 코딩 시연**: 교수가 로딩/에러 UI를 구현하고 UX를 개선하는 과정을 시연한다.

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

**B회차: UX 개선 실습**

12.6 과제: UX 개선 + 최종 다듬기 + 배포

### Chapter 13. 개인 프로젝트 구현

> **미션**: 나만의 풀스택 웹 앱을 완성하고 세상에 공개한다

**A회차: 프로젝트 가이드 + 워크숍**

13.1 프로젝트 요구사항 확인
  - 13.1.1 7장 설계서 재검토 및 보완
  - 13.1.2 기능 우선순위 정리
  - 13.1.3 MVP(최소 기능 제품) 범위 확정
13.2 바이브코딩으로 구현
  - 13.2.1 기능별 Copilot 프롬프트 전략
  - 13.2.2 점진적 구현과 배포
  - 13.2.3 에러 대응과 디버깅

**B회차: 프로젝트 개발 + 코드리뷰**

13.3 최종 배포
  - 13.3.1 Vercel 환경 변수 최종 점검
  - 13.3.2 배포 후 기능 테스트
  - 13.3.3 도메인 설정 (선택)
13.4 문서화
  - 13.4.1 README 작성
  - 13.4.2 AI 사용 로그 정리
13.5 과제: 프로젝트 완성 + 배포 URL 제출

---

## ※ 15주차: 최종 평가

| 항목 | 내용 |
|------|------|
| A회차 | **프로젝트 최종 발표 + 제출** (개인 시연 + 배포 URL + GitHub + AI 로그) |
| B회차 | **기말고사** (코딩 객관식, Ch8-12) |

### 전체 평가 비율

| 항목 | 비율 | 비고 |
|------|:---:|------|
| 중간고사 | 20% | 코딩 객관식 (Ch1-7) |
| 기말고사 | 20% | 코딩 객관식 (Ch8-12) |
| B회차 과제 | 30% | Google Classroom, 12회 × 10점 |
| 개인 프로젝트 | 30% | 배포 URL + GitHub + AI 사용 로그 |
| 출석 | 감점제 | 결석 -2점, 지각 -1점 (총점에서 차감) |

---

## 부록

### Appendix A. 개발 환경 설정 가이드
A.1 Node.js 설치 (LTS 버전)
  - Windows: 공식 설치 관리자 (.msi)
  - macOS: 공식 설치 관리자 (.pkg) 또는 Homebrew (`brew install node`)
A.2 VS Code 설치 및 필수 확장
  - A.2.1 GitHub Copilot / Copilot Chat
  - A.2.2 Tailwind CSS IntelliSense
  - A.2.3 ES7+ React/Redux/React-Native snippets
  - A.2.4 Prettier - Code formatter
A.3 Git 설치 및 GitHub 계정
  - Windows: Git for Windows 설치 관리자
  - macOS: Xcode Command Line Tools (`xcode-select --install`) 또는 Homebrew
A.4 터미널 기본 명령어
  - Windows: PowerShell 기준
  - macOS: Terminal(zsh) 기준, 차이점 병기
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

| 단축키 (Windows) | 단축키 (macOS) | 기능 |
|--------|--------|------|
| `Tab` | `Tab` | 제안 수락 |
| `Esc` | `Esc` | 제안 거부 |
| `Alt + ]` | `Option + ]` | 다음 제안 보기 |
| `Alt + [` | `Option + [` | 이전 제안 보기 |
| `Ctrl + Enter` | `Cmd + Enter` | 여러 제안 패널로 보기 |
| `Ctrl + I` | `Cmd + I` | Copilot Chat 인라인 열기 |

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

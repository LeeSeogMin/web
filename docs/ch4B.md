# Chapter 4. JavaScript 핵심 — B회차: 실습

> **미션**: 더미 API에서 데이터를 가져와 필터/검색 기능이 있는 게시판을 구현하고 배포한다

---

## 수업 타임라인

**표 4.8** B회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | A회차 핵심 리캡 + 과제 스펙 확인 |
| 00:05~00:10 | 바이브코딩 가이드 + 스타터 코드 안내 |
| 00:10~00:25 | 체크포인트 1: API 데이터 가져오기 |
| 00:25~00:45 | 체크포인트 2: 필터 + 검색 기능 |
| 00:45~01:00 | 체크포인트 3: 검증 + 배포 |
| 01:00~01:05 | Google Classroom 제출 |
| 01:05~01:25 | 결과 공유 + 코드리뷰 토론 |
| 01:25~01:30 | 교수 종합 피드백 + 다음 주 예고 |

---

## 과제 스펙 + 스타터 코드 안내

### 과제 요구사항

**더미 API 연동 게시판**을 만든다:

① JSONPlaceholder API(`https://jsonplaceholder.typicode.com/posts`)에서 게시글 가져오기
② 가져온 데이터를 카드 형태로 화면에 표시
③ userId 필터 버튼 — 클릭하면 해당 사용자의 글만 표시
④ 제목 검색 — 키워드 입력 시 제목에 해당 키워드가 포함된 글만 표시
⑤ Vercel 배포

### 스타터 코드

`practice/chapter4/starter/` 폴더에 Ch3 complete 기반 + fetch 스켈레톤이 준비되어 있다.

```
practice/chapter4/starter/
├── app/
│   ├── layout.js       ← 공통 레이아웃 (Tailwind 설정 완료)
│   ├── page.js         ← 메인 페이지 (fetch 뼈대만 있음)
│   └── globals.css     ← Tailwind 기본 import
├── package.json        ← 의존성 (버전 고정)
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

**시작 방법** (PowerShell 기준):
```bash
cd practice/chapter4/starter
npm install
npm run dev
```
macOS Terminal도 동일하다.

브라우저에서 http://localhost:3000 을 열어 기본 페이지가 보이는지 확인한다.

---

## 바이브코딩 가이드

> **Copilot 활용**: 이번 실습에서는 Copilot Chat에 프롬프트를 입력하여 API 연동과 인터랙션을 구현한다. 생성된 코드를 그대로 쓰지 말고, A회차에서 배운 기준으로 반드시 검증한다.

**좋은 프롬프트 vs 나쁜 프롬프트**:

❌ 나쁜 프롬프트:
> "API에서 데이터 가져와서 보여줘"

문제: 어떤 API인지, 어떤 패턴(async/await vs .then)인지, 에러 처리는 필요한지 불명확. AI가 .then() 체이닝이나 var를 사용할 수 있다.

✅ 좋은 프롬프트:

> **Copilot 프롬프트**
> "app/page.js를 수정해줘.
> JSONPlaceholder API(https://jsonplaceholder.typicode.com/posts)에서
> 게시글을 가져와서 카드 리스트로 보여줘.
> async/await와 fetch를 사용하고, response.ok 체크와 try-catch 에러 처리도 포함해줘.
> Tailwind CSS로 스타일링해줘.
> Next.js 14 App Router, 'use client' 지시어 포함."

<!-- COPILOT_VERIFY: 위 프롬프트를 Copilot Chat에 입력하고 생성 결과를 캡처해주세요 -->

---

## 개인 실습

### 체크포인트 1: API 데이터 가져오기 (15분)

**목표**: JSONPlaceholder API에서 게시글을 가져와 화면에 표시한다.

① Copilot Chat에 프롬프트를 입력하여 API 연동 코드를 생성한다
② 생성된 코드를 `app/page.js`에 붙여넣는다
③ **async/await 확인**: `.then()` 체이닝이 아닌 async/await를 사용했는지 검사한다
④ **response.ok 확인**: fetch 후 `if (!response.ok)` 체크가 있는지 검사한다
⑤ **try-catch 확인**: 에러 처리가 포함되어 있는지 검사한다

> **강의 팁**: 순회하며 학생들이 async/await 패턴을 올바르게 사용하고 있는지 확인한다. `.then()` 체이닝이 있으면 "async/await로 바꿔줘"라고 Copilot에게 추가 요청하도록 안내한다.

### 체크포인트 2: 필터 + 검색 기능 (20분)

**목표**: userId 필터와 제목 검색 기능을 추가한다.

① 필터 버튼을 추가한다 — "전체", "User 1", "User 2" 등 버튼 클릭 시 해당 userId의 글만 표시
② 검색 input을 추가한다 — 입력한 키워드가 제목에 포함된 글만 표시
③ `filter` 메서드로 필터링 로직을 구현한다
④ 필터와 검색이 동시에 동작하는지 확인한다

Copilot에게 필터 기능을 요청할 때:

> **Copilot 프롬프트**
> "게시글 목록에 두 가지 필터 기능을 추가해줘.
> 1. userId 필터: 버튼 클릭으로 해당 사용자 글만 표시 (전체/User 1/User 2 등)
> 2. 제목 검색: input에 키워드 입력 시 제목에 포함된 글만 표시.
> filter 메서드 사용. useState로 상태 관리. Tailwind CSS 스타일링."

<!-- COPILOT_VERIFY: 필터+검색 기능 프롬프트를 실행하고, filter 메서드와 useState 사용 여부를 확인해주세요 -->

### 체크포인트 3: 검증 + 배포 (15분)

**목표**: AI 코드를 검증하고 배포한다.

① 아래 검증 체크리스트를 수행한다
② 문제가 있으면 수정한다
③ git add → git commit → git push 로 배포한다:
```bash
git add .
git commit -m "Ch4: API 연동 + 필터/검색 기능"
git push
```
④ Vercel 대시보드에서 배포 완료를 확인한다
⑤ 배포된 URL을 브라우저에서 열어 동작을 확인한다
⑥ 필터 버튼과 검색이 배포 환경에서도 동작하는지 확인한다

---

## 검증 체크리스트

**표 4.9** AI 코드 검증 체크리스트

| 항목 | 확인 |
|------|------|
| `async/await` 패턴을 사용했는가? (`.then()` 아님) | ☐ |
| `response.ok` 체크가 있는가? | ☐ |
| `await response.json()`으로 JSON 파싱을 했는가? | ☐ |
| `try-catch`로 에러를 처리했는가? | ☐ |
| `var` 대신 `const`/`let`을 사용했는가? | ☐ |
| `===`(엄격 비교)를 사용했는가? (`==` 아님) | ☐ |
| import 경로가 실제 파일과 일치하는가? | ☐ |
| `"use client"` 지시어가 필요한 파일에 있는가? | ☐ |
| 배포 URL에서 정상 동작하는가? | ☐ |

---

## 흔한 AI 실수

**표 4.10** Ch4에서 AI가 자주 틀리는 패턴

| AI 실수 | 올바른 코드 | 발생 원인 |
|---------|-----------|----------|
| `var` 사용 | `const` 또는 `let` | 레거시 학습 데이터 |
| `.then()` 체이닝 | `async/await` | 프로젝트 규칙 미반영 |
| `response.ok` 체크 누락 | `if (!response.ok)` 필수 | HTTP 에러 미처리 |
| `.json()` 누락 | `await response.json()` | fetch 응답 자동 파싱 착각 |
| 존재하지 않는 import 경로 | 실제 파일 경로 확인 | 환각 — 가짜 경로 생성 |
| `==` 비교 연산자 | `===` 사용 (엄격 비교) | 타입 변환 버그 방지 |
| `"use client"` 누락 | useState/이벤트 사용 시 필수 | Server Component 기본 미인지 |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch4 과제"에 아래 두 항목을 제출한다:

```
① 배포 URL
   예: https://내프로젝트.vercel.app

② AI가 틀린 부분 1개
   예: "Copilot이 .then() 체이닝으로 생성했는데,
       async/await로 변환했다."
```

---

## 코드리뷰 토론 가이드

> **토론 가이드**: 2-3명이 자발적으로 화면을 공유하며 결과를 발표한다.

**발표 포인트** (1인당 3-5분):
1. 배포된 URL을 브라우저에 띄운다
2. 필터 버튼과 검색 기능이 동작하는지 보여준다
3. Copilot이 틀린 부분과 어떻게 수정했는지 설명한다

**토론 질문**:
- "filter와 map을 체이닝한 부분이 있었는가? 어떤 순서로 적용했는가?"
- "검색과 필터를 동시에 적용하려면 어떻게 해야 하는가?"
- "Copilot이 .then()으로 생성했을 때 async/await로 어떻게 변환했는가?"

---

## 교수 피드백 포인트

**확인할 것**:
- async/await 패턴 사용 여부 — `.then()` 체이닝이면 변환 안내
- response.ok 체크 유무 — 누락 시 API 에러 처리의 중요성 설명
- filter/map 활용 — 배열 메서드 이해도 점검

**우수 사례 공유**:
- 잘 만든 페이지 1-2개를 화면에 띄워 동기부여

**다음 주 예고**:
> 다음 주에는 **Next.js 기초**를 배운다. 지금까지는 하나의 페이지(app/page.js)만 다루었지만, 다음 주에는 여러 페이지를 가진 게시판 앱을 만든다. App Router, 동적 라우트, Link 컴포넌트 등을 배운다.

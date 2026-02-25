# Chapter 2. Copilot 세팅과 바이브코딩 — B회차: 실습

> **미션**: Copilot으로 자기소개 페이지를 만들고 배포한다

---

## 수업 타임라인

**표 2.13** B회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | A회차 핵심 리캡 + 과제 스펙 확인 |
| 00:05~00:10 | 바이브코딩 가이드 + 스타터 코드 안내 |
| 00:10~00:25 | 체크포인트 1: Copilot 확인 + copilot-instructions.md 완성 |
| 00:25~00:45 | 체크포인트 2: 자기소개 페이지 생성 + 검증 |
| 00:45~01:00 | 체크포인트 3: AI 사용 로그 + 배포 |
| 01:00~01:05 | Google Classroom 제출 |
| 01:05~01:25 | 결과 공유 + 코드리뷰 토론 |
| 01:25~01:30 | 교수 종합 피드백 + 다음 주 예고 |

---

## 과제 스펙 + 스타터 코드 안내

### 과제 요구사항

**Copilot 설정 + 자기소개 페이지**를 만든다:

① GitHub Copilot / Copilot Chat 확장 설치 완료
② `.github/copilot-instructions.md` 파일 작성 완료
③ Copilot Chat을 사용하여 자기소개 페이지 생성 (이름, 학교, 전공, 취미 등)
④ AI 코드 검증 체크리스트 수행
⑤ git push → Vercel 배포 + AI 사용 로그 작성

### 스타터 코드

`practice/chapter2/starter/` 폴더에 Ch1 결과물 + copilot-instructions.md 템플릿이 준비되어 있다.

```
practice/chapter2/starter/
├── .github/
│   └── copilot-instructions.md  ← 템플릿 (TODO 항목 채워넣기)
├── app/
│   ├── layout.js       ← 공통 레이아웃 (Tailwind 설정 완료)
│   ├── page.js         ← 메인 페이지 (Ch1 프로필 뼈대)
│   └── globals.css     ← Tailwind 기본 import
├── package.json        ← 의존성 (버전 고정)
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

**시작 방법** (PowerShell 기준):
```bash
cd practice/chapter2/starter
npm install
npm run dev
```
macOS Terminal도 동일하다.

브라우저에서 http://localhost:3000 을 열어 기본 페이지가 보이는지 확인한다.

> **강의 팁**: Ch1에서 이미 프로젝트가 있는 학생은 자신의 프로젝트를 계속 사용해도 좋다. 새로 시작하는 학생은 스타터 코드를 사용한다.

---

## 바이브코딩 가이드

> **Copilot 활용**: 이번 실습에서는 Copilot Chat에 프롬프트를 입력하여 자기소개 페이지를 생성한다. 생성된 코드를 그대로 쓰지 말고, A회차에서 배운 검증 체크리스트로 반드시 확인한다.

**좋은 프롬프트 vs 나쁜 프롬프트**:

❌ 나쁜 프롬프트:
> "자기소개 페이지 만들어줘"

문제: 기술 스택, 파일 위치, 디자인 요구사항이 전혀 없다.

✅ 좋은 프롬프트:

> **Copilot 프롬프트**
> "Next.js App Router의 app/page.js에 자기소개 페이지를 만들어줘.
> Tailwind CSS를 사용하고, 배경은 밝은 회색(bg-gray-50).
> 중앙에 흰색 카드(bg-white, rounded-lg, shadow) 배치.
> 카드 안에 이름, 학교, 전공, 취미를 표시해줘.
> 이름은 text-3xl font-bold, 나머지는 text-gray-600."

<!-- COPILOT_VERIFY: 위 프롬프트를 Copilot Chat에 입력하고 생성 결과를 캡처해주세요 -->

---

## 개인 실습

### 체크포인트 1: Copilot 확인 + copilot-instructions.md 완성 (15분)

**목표**: Copilot이 정상 동작하고, copilot-instructions.md를 완성한다.

① VS Code에서 Copilot 아이콘이 보이는지 확인한다 (오른쪽 하단)
② Copilot Chat 패널을 열고 "Hello"라고 입력하여 응답이 오는지 확인한다
③ `.github/copilot-instructions.md` 파일을 열고 TODO 항목을 채운다
④ Tech Stack, Coding Conventions, Known AI Mistakes 섹션을 완성한다
⑤ 파일을 저장한다

> **강의 팁**: Copilot이 설치 안 된 학생은 Codeium(무료 대안)을 설치하도록 안내한다. copilot-instructions.md는 AI 도구에 관계없이 작성한다.

### 체크포인트 2: 자기소개 페이지 생성 + 검증 (20분)

**목표**: Copilot으로 자기소개 페이지를 만들고 검증한다.

① Copilot Chat에 프롬프트를 입력하여 자기소개 코드를 생성한다
② 생성된 코드를 `app/page.js`에 붙여넣는다
③ **검증 체크리스트 수행**:
   - import 경로가 올바른가?
   - Tailwind 클래스가 올바른가? (className으로 되어 있는가?)
   - "use client"가 불필요하게 들어있지 않은가?
   - 환경변수가 하드코딩되어 있지 않은가?
④ 본인 정보로 내용을 수정한다
⑤ 추가 프롬프트로 기능을 추가해도 좋다 (사진, 링크 등)

> **Copilot 프롬프트** (추가 기능 예시)
> "이 자기소개 페이지에 GitHub 링크와 이메일 링크를 추가해줘. 아이콘 대신 텍스트 링크로 하고, hover:text-blue-500 효과를 넣어줘."

> **강의 팁**: 순회하며 학생들이 검증 체크리스트를 실제로 수행하고 있는지 확인한다. "Copilot이 생성한 코드에서 뭔가 이상한 점을 발견했나요?"라고 질문한다.

### 체크포인트 3: AI 사용 로그 + 배포 (15분)

**목표**: AI 사용 로그를 작성하고 배포한다.

① AI 사용 로그를 작성한다:
```text
[프롬프트] (어떤 프롬프트를 사용했는가)
[AI 실수]  (AI가 틀린 부분이 있었는가)
[분류]     (버전 불일치 / 컨텍스트 소실 / 환각 / 없음)
[해결]     (어떻게 수정했는가)
[조치]     (copilot-instructions.md에 추가한 내용)
```
② git add → git commit → git push로 배포한다:
```bash
git add .
git commit -m "Ch2: 자기소개 페이지 + copilot-instructions.md"
git push
```
③ Vercel 대시보드에서 배포 완료를 확인한다
④ 배포된 URL을 브라우저에서 열어 동작을 확인한다

---

## 검증 체크리스트

**표 2.14** AI 코드 검증 체크리스트

| 항목 | 확인 |
|------|------|
| Copilot/Copilot Chat 확장이 설치되었는가? | ☐ |
| `.github/copilot-instructions.md`가 작성되었는가? | ☐ |
| import 경로가 올바른가? | ☐ |
| `className`을 사용했는가? (`class` 아님) | ☐ |
| 불필요한 `"use client"`가 없는가? | ☐ |
| 환경변수가 하드코딩되어 있지 않은가? | ☐ |
| 배포 URL에서 정상 동작하는가? | ☐ |

---

## 흔한 AI 실수

**표 2.15** Ch2에서 AI가 자주 틀리는 패턴

| AI 실수 | 올바른 코드 | 발생 원인 |
|---------|-----------|----------|
| `import { useRouter } from 'next/router'` | `from 'next/navigation'` | Pages Router 문법 (구 버전) |
| 불필요한 `"use client"` 추가 | Server Component로 충분한 경우 제거 | 클라이언트 컴포넌트 남용 |
| `class="..."` | `className="..."` | 순수 HTML 학습 데이터의 영향 |
| 존재하지 않는 패키지 추천 | npmjs.com에서 검증 후 설치 | 환각 |
| CSS Modules import | Tailwind 유틸리티 클래스 사용 | 프로젝트 컨텍스트 미인식 |
| `getServerSideProps` 사용 | App Router 서버 컴포넌트 | Pages Router 문법 (구 버전) |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch2 과제"에 아래 항목을 제출한다:

```
① 배포 URL
   예: https://내프로젝트.vercel.app

② AI가 틀린 부분 1개
   예: "Copilot이 'use client'를 불필요하게 추가했는데,
       이 페이지는 서버 컴포넌트로 충분하므로 제거했다."
```

> AI가 틀린 부분이 딱히 없었다면, "Copilot이 생성한 코드에서 확인한 점"을 기술한다. 예: "className이 올바르게 사용되었고, import 경로도 맞았다."

---

## 코드리뷰 토론 가이드

> **토론 가이드**: 2-3명이 자발적으로 화면을 공유하며 결과를 발표한다.

**발표 포인트** (1인당 3-5분):
1. 배포된 URL을 브라우저에 띄운다
2. Copilot에게 어떤 프롬프트를 줬는지 보여준다
3. AI가 틀린 부분과 어떻게 수정했는지 설명한다
4. copilot-instructions.md에 추가한 규칙이 있으면 공유한다

**토론 질문**:
- "같은 프롬프트인데 다른 결과가 나왔다면, 왜 그런가?"
- "copilot-instructions.md가 있을 때와 없을 때 AI 응답이 달랐는가?"
- "AI 사용 로그에서 가장 흔한 실수 유형은 무엇이었는가?"

---

## 교수 피드백 포인트

**확인할 것**:
- Copilot 설치 여부 — 미설치 학생은 Codeium 대안 확인
- copilot-instructions.md 내용 — "Known AI Mistakes" 섹션이 비어있으면 안 됨
- AI 사용 로그 — 프롬프트 → 실수 → 해결 흐름이 기록되어 있는지

**우수 사례 공유**:
- 체계적인 AI 사용 로그를 작성한 사례
- copilot-instructions.md에 새로운 규칙을 추가한 사례

**다음 주 예고**:
> 다음 주에는 **HTML 시맨틱과 Tailwind CSS**를 배운다. 오늘 설정한 Copilot과 함께, 게시판 UI를 마크업하고 스타일링하는 실습을 진행한다.

# Git & GitHub & Copilit 가이드

## 1단계: Git 설치 (3분)

**Windows**: https://git-scm.com/download/win → 다운로드 후 설치 (기본값 OK)

**macOS**: 터미널에서 실행

```bash
xcode-select --install
```

설치 확인:

```bash
git --version
```

## 2단계: GitHub 가입 (2분)

1. https://github.com 접속
2. "Sign up" → 학교 이메일로 가입
3. 이메일 인증

## 3단계: 로컬 연결 (1분)

> VSCode 통합 터미널(Ctrl+`), CMD, PowerShell 중 어디서든 실행 가능. VSCode 통합 터미널 권장.

```bash
git config --global user.name "홍길동"
git config --global user.email "학교이메일@ac.kr"
```


# GitHub Copilot 대학생 무료 사용 방법

GitHub는 **Copilot Free** (제한된 무료 플랜)와 **Copilot Pro** (고급 기능 풀버전)을 구분해서 운영하고 있으며,

**검증된 학생**은 **Copilot Pro**를 **학생 신분 유지 기간 동안 완전 무료**로 사용할 수 있습니다.

### 현재(2026년) 상황 요약

| 구분               | 대상자                     | 가격     | 주요 제한사항                                   | 모델/기능 수준          |
| ------------------ | -------------------------- | -------- | ----------------------------------------------- | ----------------------- |
| Copilot Free       | 누구나                     | 무료     | 월 2,000 코드 완성, 50 채팅 등 매우 제한적      | 기본 모델               |
| Copilot Pro        | 일반인                     | 월 $10   | 300 premium requests + 추가 과금 가능           | 최신 모델 풀 액세스     |
| Copilot Pro (학생) | GitHub Education 검증 학생 | **무료** | 월 300 premium requests (초과 시 다음달 초기화) | Pro 풀 기능 + 최신 모델 |

→ **우리가 원하는 건 Copilot Pro 무료**이며, 이를 위해서는 **GitHub Student Developer Pack** 승인이 필수입니다.

### 2026년 최신 정확한 등록 절차 (단계별)

1. **GitHub 계정 준비**
   - 이미 계정이 있다면 로그인
   - 없다면 [https://github.com](https://github.com/) 에서 새로 생성 (학교 이메일 추천)
   - 기존 계정이 있으면 설정(https://github.com/settings/emails)에서 학교 이메일(.ac.kr)을 추가
   - **학교 이메일을 primary email(기본 이메일)로 설정** (드롭다운에서 선택 후 Save → 인증 인식을 도움. 나중에 개인 이메일로 되돌릴 수 있음)
   - 이메일 추가 후 verification link(인증 링크)를 클릭해 verified 상태로 만들기
2. **GitHub Student Developer Pack 신청 페이지 이동**

   https://education.github.com/pack

   또는 [https://education.github.com](https://education.github.com/) → "Get your pack" 클릭

3. **학생 신분 증명** (가장 중요한 단계)

   대부분의 한국 대학생이 성공하는 순서 (우선순위 높은 순) :

   | 순위 | 증빙 방법                       | 성공률    | 소요시간    | 비고                                        |
   | ---- | ------------------------------- | --------- | ----------- | ------------------------------------------- |
   | 1    | 학교 공식 이메일 (.ac.kr)       | 매우 높음 | 즉시~수시간 | 대부분 자동 승인                            |
   | 2    | 학생증 사진 (재학증명서) 업로드 | 높음      | 1~5일       | 선명하게 촬영, 이름·학번·유효기간 보여야 함 |
   | 3    | 재학증명서 pdf 업로드           | 높음      | 1~7일       | 최근 3개월 이내 발급본                      |
   | 4    | 등록금 영수증 + 신분증          | 중간      | 3~10일      | 최후의 수단                                 |

   → **한국 4년제 대학 재학생이라면 대부분 학교 이메일만으로 1~24시간 내 자동 승인**됩니다.

4. **승인 확인**
   - https://education.github.com/pack 에서 "Your pack" 상태 확인
   - 승인 메일 도착 (보통 "You're all set!" 제목)
5. **Copilot Pro 무료 활성화** (승인 후 바로 가능)

   두 가지 방법 중 편한 것 선택:

   방법 A (가장 확실)
   - https://github.com/settings/copilot 이동
   - "Code, planning, and automation" → Copilot 클릭
   - 학생 혜택으로 무료 가입 버튼 나타남 → 클릭

   방법 B
   - https://github.com/features/copilot 로 이동
   - 학생으로 인식되면 "무료로 시작" 또는 "Claim free access" 버튼 등장

   방법 C (학생/교사 전용 무료 signup 페이지)
   - https://github.com/github-copilot/free_signup 으로 직접 이동

   > **주의**: 신용카드 입력이 요구되면 진행하지 마십시오. 학생 혜택은 완전 무료이며 결제 정보가 필요하지 않습니다.

6. **VS Code 등 에디터에서 사용 시작**
   - GitHub 계정으로 Copilot 확장 로그인
   - 학생 혜택이 정상 적용되어 풀 Pro 기능 사용 가능

### 주의사항 (2026년 기준 자주 발생하는 문제)

- 승인 후에도 바로 안 보일 때 → 72시간까지 기다린 뒤 재로그인 시도 (Incognito/시크릿 모드 사용 추천). 혜택 동기화에 72시간~최대 2주가 소요될 수 있음
- "무료 버튼이 안 보임" → 캐시 지우기 / 다른 브라우저 시도 / primary email을 학교 이메일로 재설정 후 대기 / https://github.com/settings/copilot 직접 들어가기
- 인증 실패 시 → GitHub Support(https://support.github.com/contact/education)에 티켓 제출 (카테고리: "Student having trouble redeeming offers")
- 월 300 premium requests 제한은 학생도 동일 (과거에는 무제한이었으나 2025년 중반부터 변경됨)
- 졸업하면 자동으로 Pro 유료 전환됨 → 재학생 기간에 최대한 활용 권장
- 공식 문서 참조: https://docs.github.com/en/education

위 방법은 2026년 2월 6일 기준 GitHub 공식 문서 및 실제 학생 사례들을 종합한 **현재 가장 정확한 절차**입니다.

학교 이메일이 있다면 거의 100% 성공한다고 봐도 무방합니다.


# GitHub Copilot 사용 설명서

이 문서는 VS Code에서 GitHub Copilot을 활용하는 방법을 안내합니다. 아래 캡처 이미지를 참고하여 주요 기능과 메뉴를 설명합니다.

---

## 1. Copilot Chat 세션 시작

- **새 챗 세션(New Chat Session)**: Ctrl+N 단축키로 새로운 Copilot Chat 세션을 시작할 수 있습니다.
  **Continue In**: 챗 세션을 실행할 환경을 선택할 수 있습니다.
  - Local(로컬): 현재 PC에서 직접 Copilot 챗을 실행합니다. 빠른 응답과 파일 접근이 가능합니다.
  - Background(@cli): 명령줄 환경에서 Copilot을 실행합니다. 백그라운드 작업이나 자동화에 적합합니다.
  - Cloud(@cloud): 클라우드 서버에서 Copilot 챗을 실행합니다. 대용량 작업, 서버 리소스 활용, 원격 협업에 유리합니다.

---

## 2. 에이전트 및 역할 선택

- **Agent 메뉴**: Ctrl+Shift+I로 Copilot의 역할을 선택할 수 있습니다.
  - coder: 코드 작성
  - graphic: 그래픽/다이어그램 생성
  - planner: 집필 계획
  - researcher: 자료 조사
  - reviewer: 품질 검토
  - writer: 원고 작성
- **Plan/Ask**: 계획 수립 또는 질문 모드로 전환 가능
- **커스텀 에이전트 구성**: 필요에 따라 직접 에이전트 역할을 추가/설정할 수 있습니다.

---

## 3. 도구(툴) 설정

- **Configure Tools**: Copilot이 사용할 수 있는 도구를 선택/해제할 수 있습니다.
  - 예시: edit(파일 편집), execute(코드 실행), search(검색), todo(할 일 관리), web(웹 정보 수집) 등
  - MCP 서버 기반의 확장 도구도 활성화 가능
- **도구 선택 후 OK 버튼으로 적용**

---

## 4. MCP 서버 및 확장 기능

- **MCP 서버 알림**: 새로운 MCP 서버(예: mcp-server-time, GitHub 등)가 활성화되면 알림이 표시됩니다.
- **자동 시작 옵션**: "Automatically start MCP servers" 체크박스로 서버 자동 실행 설정 가능

---

## 5. Copilot 모델 선택

- **모델 선택**: 하단 메뉴에서 GPT-4.1 등 Copilot이 사용할 모델을 선택할 수 있습니다.

---

## 6. 기타 기능

- **챗 세션 관리**: 여러 챗 세션을 동시에 운영 가능
- **도구/에이전트/모델 조합**: 작업 목적에 따라 자유롭게 조합하여 활용

---

## 참고

- Copilot은 코드 작성, 문서화, 그래픽 생성, 품질 검토 등 다양한 역할을 수행할 수 있습니다.
- 각 메뉴와 도구는 프로젝트 목적에 맞게 선택하여 사용하세요.

---


# GitHub Copilot에서 MCP(Model Context Protocol) 사용 방법

MCP는 Copilot이 외부 도구(예: GitHub, 브라우저 테스트 도구)를 호출할 수 있게 해주는 연결 규칙이다.
학부생 실습에서는 복잡하게 늘리지 말고 1~2개만 사용한다.

## 학부생용 최소 MCP 세트

1. **GitHub MCP (선택)**
   - 용도: 이슈 목록 확인, PR 초안 작성, 변경 요약
   - 사용 예:
     - `@github 이 저장소의 open 이슈 3개 요약해줘`
     - `@github 이번 커밋 기준 PR 설명 초안 만들어줘`

## 수업에서 지킬 규칙

- MCP는 동시에 2개 이상 켜지 않는다.
- 자동 생성 결과를 그대로 제출하지 않고, 본인이 수정 후 제출한다.
- 에러가 나면 프롬프트를 짧게 나눠 다시 요청한다.

# GitHub Copilot에서 Skills 사용 방법

Skills는 Copilot이 프로젝트 규칙을 더 잘 따르도록 하는 로컬 지침 파일이다.
폴더 위치: `.github/skills/{skill-name}/SKILL.md`

## 학부생용 추천 Skills 2개

1. **nextjs-basic-check**
   - 목적: App Router 구조, 파일명, 기본 컴포넌트 규칙 확인

2. **api-safety-check**
   - 목적: API 라우트에서 입력값 검사, `try/catch`, 상태코드 반환 강제

## Skills 생성 프롬프트 (바이브코딩)

아래 프롬프트를 Copilot Chat(Agent 모드)에 그대로 넣으면, 두 Skill 파일을 자동 생성할 수 있다.

> **Copilot 프롬프트**
> "이 프로젝트 루트에 아래 2개 Skill을 생성해줘.
> 1) .github/skills/nextjs-basic-check/SKILL.md
> 2) .github/skills/api-safety-check/SKILL.md
>
> 조건:
> - nextjs-basic-check에는 App Router(app/), Server/Client 컴포넌트 구분, next/navigation 사용 규칙을 넣어줘.
> - api-safety-check에는 try-catch, 입력값 검증, 상태코드+사용자 메시지 반환, 키/토큰 하드코딩 금지 규칙을 넣어줘.
> - 각 SKILL.md는 짧고 학부생이 이해할 수 있는 한국어 지침 4~6줄로 작성해줘.
> - 생성 후 어떤 파일을 만들었는지 목록으로 보고해줘."

생성 후에는 아래 점검 프롬프트를 사용한다.
- `nextjs-basic-check 기준으로 이 파일의 App Router 규칙 위반 3개만 찾아줘.`
- `api-safety-check 기준으로 에러 처리/입력 검증 누락을 찾아줘.`

## 권장 사용 순서

1. 과제 시작 전: Skills 적용
2. 구현 중: Copilot Chat으로 코드 생성/수정
3. 제출 전: GitHub MCP로 변경 요약 + 브라우저에서 최종 동작 점검

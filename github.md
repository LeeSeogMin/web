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

이 수업에서는 아래 2개 MCP만 사용한다.

1. **Context7 (필수)**
   - 용도: Next.js, Tailwind CSS, Supabase 등 라이브러리의 **최신 공식 문서**를 Copilot이 직접 참조
   - 왜 필요한가: AI는 학습 시점 이후의 API 변경을 모른다(버전 불일치 문제). Context7을 켜면 Copilot이 항상 최신 문서를 보고 코드를 생성한다.
   - 사용 예:
     - `use context7. Next.js App Router에서 동적 라우트 만드는 법 알려줘`
     - `use context7. Supabase JS v2에서 인증 상태 확인하는 코드 작성해줘`

2. **Supabase MCP (필수)**
   - 용도: Copilot 안에서 Supabase **테이블 생성, RLS 정책 설정, SQL 실행**을 직접 수행
   - 왜 필요한가: Ch9~11에서 인증/데이터베이스/스토리지를 다루며, DB 스키마와 코드가 항상 동기화되어야 한다.
   - 사용 예:
     - `Supabase에 posts 테이블 만들어줘. id, title, content, created_at 컬럼으로.`
     - `posts 테이블에 인증된 사용자만 읽기 가능한 RLS 정책 추가해줘`

## MCP 설치 (바이브코딩)

Copilot Agent 모드에서 아래 프롬프트를 그대로 입력하면 설정 파일이 자동 생성된다.

> **Copilot 프롬프트**
> "이 프로젝트에 MCP 서버 2개를 설정해줘.
>
> .vscode/mcp.json 파일을 생성하고 아래 내용을 넣어줘:
> ```json
> {
>   "servers": {
>     "context7": {
>       "command": "npx",
>       "args": ["-y", "@upstash/context7-mcp@latest"]
>     },
>     "supabase": {
>       "command": "npx",
>       "args": ["-y", "supabase-mcp-server@latest", "--read-only"],
>       "env": {
>         "SUPABASE_URL": "${input:supabaseUrl}",
>         "SUPABASE_SERVICE_ROLE_KEY": "${input:supabaseServiceRoleKey}"
>       }
>     }
>   },
>   "inputs": [
>     {
>       "id": "supabaseUrl",
>       "description": "Supabase 프로젝트 URL (예: https://xxx.supabase.co)",
>       "type": "promptString"
>     },
>     {
>       "id": "supabaseServiceRoleKey",
>       "description": "Supabase Service Role Key (Settings > API에서 복사)",
>       "type": "promptString",
>       "password": true
>     }
>   ]
> }
> ```
> 생성 후 어떤 파일을 만들었는지 알려줘."

<!-- COPILOT_VERIFY: 위 프롬프트로 .vscode/mcp.json이 정상 생성되는지, VS Code에서 MCP 서버가 활성화되는지 확인해주세요 -->

### 설치 후 확인

MCP가 정상 작동하는지 아래 프롬프트로 테스트한다.

- Context7 테스트: `use context7. Next.js 15의 App Router에서 layout.tsx 역할을 설명해줘`
- Supabase 테스트: `Supabase 프로젝트의 테이블 목록을 보여줘`

> **주의**: Supabase MCP에는 `--read-only` 옵션이 켜져 있다. 수업 중 실수로 데이터가 삭제되는 것을 방지하기 위해서이다. 테이블 생성 등 쓰기 작업이 필요한 챕터(Ch9~11)에서는 교수 안내에 따라 해제한다.

## MCP 사용법

### MCP 서버 켜기/끄기

VS Code 하단 상태 바 또는 Copilot Chat 패널의 **도구(Tools)** 버튼에서 MCP 서버를 켜고 끌 수 있다.

1. Copilot Chat 패널 열기 (Ctrl+Shift+I)
2. 입력창 아래 **도구 아이콘(🔧)** 클릭
3. `context7`, `supabase` 체크박스로 켜기/끄기

> **팁**: MCP 서버는 처음 호출할 때 자동 시작된다. 수동으로 켤 필요 없이 프롬프트에서 바로 사용하면 된다.

### Context7 사용법

프롬프트 앞에 `use context7`을 붙이면 Copilot이 최신 공식 문서를 참조한다.

**기본 패턴**: `use context7. [질문 또는 지시]`

| 상황 | 프롬프트 예시 |
|------|--------------|
| 최신 API 확인 | `use context7. Next.js에서 Image 컴포넌트 사용법 알려줘` |
| 코드 생성 | `use context7. Supabase Auth로 이메일 로그인 구현해줘` |
| 버전 차이 확인 | `use context7. Tailwind v4에서 바뀐 설정 방식 알려줘` |
| 에러 해결 | `use context7. next/router 대신 뭘 써야 하는지 알려줘` |

> **언제 쓰는가**: 라이브러리 API를 사용하는 코드를 생성할 때마다 붙인다. 단순 HTML/CSS 질문에는 불필요하다.

### Supabase MCP 사용법

Supabase MCP는 별도 키워드 없이 Supabase 관련 지시를 내리면 Copilot이 자동으로 MCP 도구를 호출한다.

| 상황 | 프롬프트 예시 |
|------|--------------|
| 테이블 조회 | `Supabase 프로젝트의 테이블 목록 보여줘` |
| 스키마 확인 | `posts 테이블의 컬럼 구조를 알려줘` |
| 데이터 확인 | `users 테이블에 저장된 데이터 5개만 보여줘` |
| SQL 실행 | `Supabase에서 SELECT * FROM posts WHERE id = 1 실행해줘` |
| RLS 확인 | `posts 테이블의 RLS 정책을 보여줘` |

> **주의**: 기본 설정은 `--read-only`(읽기 전용)이다. 테이블 생성·수정·삭제가 필요한 챕터(Ch9~11)에서는 교수 안내에 따라 읽기 전용을 해제한다.

### MCP 두 개를 함께 쓰는 예시

Supabase 코드를 생성할 때 Context7을 함께 쓰면 최신 API로 정확한 코드가 나온다.

> **Copilot 프롬프트**
> "use context7. Supabase Auth로 이메일/비밀번호 회원가입 페이지를 만들어줘.
> Supabase MCP로 현재 프로젝트의 auth 설정도 확인해줘."

## 수업에서 지킬 규칙

- MCP는 위 2개만 사용한다. 추가 설치하지 않는다.
- 자동 생성 결과를 그대로 제출하지 않고, 본인이 수정 후 제출한다.
- 에러가 나면 프롬프트를 짧게 나눠 다시 요청한다.

# GitHub Copilot에서 Skills 사용 방법

Skills는 Copilot이 프로젝트 규칙을 더 잘 따르도록 하는 로컬 지침 파일이다.
폴더 위치: `.github/skills/{skill-name}/SKILL.md`

## 학부생용 추천 Skills 2개

1. **nextjs-basic-check**
   - 목적: App Router 구조, 파일명, 기본 컴포넌트 규칙 확인
   - 적용 범위: Ch3~13 (거의 전체)
   - 검사 항목: `app/` 디렉토리 구조, Server/Client 컴포넌트 구분, `next/navigation` 사용 규칙

2. **secret-guard**
   - 목적: API 키·토큰이 코드에 노출되지 않도록 방지
   - 적용 범위: Ch1~13 (전체)
   - 검사 항목:
     - 모든 파일에서 API 키·토큰 하드코딩 금지
     - 비밀값은 반드시 `.env.local`에 저장
     - `NEXT_PUBLIC_` 접두사 변수에 민감한 키를 넣지 않았는지 확인
     - Supabase `service_role` 키가 클라이언트 코드에 노출되지 않았는지 확인

## Skills 생성 프롬프트 (바이브코딩)

아래 프롬프트를 Copilot Chat(Agent 모드)에 그대로 넣으면, 두 Skill 파일을 자동 생성할 수 있다.

> **Copilot 프롬프트**
> "이 프로젝트 루트에 아래 2개 Skill을 생성해줘.
> 1) .github/skills/nextjs-basic-check/SKILL.md
> 2) .github/skills/secret-guard/SKILL.md
>
> 조건:
> - nextjs-basic-check에는 App Router(app/), Server/Client 컴포넌트 구분, next/navigation 사용 규칙을 넣어줘.
> - secret-guard에는 다음 규칙을 넣어줘:
>   ① 모든 파일에서 API 키·토큰·비밀번호를 직접 문자열로 쓰지 말 것
>   ② 비밀값은 반드시 .env.local 파일에 저장하고 process.env로 읽을 것
>   ③ NEXT_PUBLIC_ 접두사 변수에 service_role 키 등 민감한 값을 넣지 말 것
>   ④ Supabase 클라이언트는 서버 전용(createServerClient)과 브라우저 전용(createBrowserClient)을 구분할 것
> - 각 SKILL.md는 짧고 학부생이 이해할 수 있는 한국어 지침 4~6줄로 작성해줘.
> - 생성 후 어떤 파일을 만들었는지 목록으로 보고해줘."

<!-- COPILOT_VERIFY: 위 프롬프트로 .github/skills/ 아래 두 Skill 파일이 정상 생성되는지 확인해주세요 -->

## Skills 사용법

### Skills의 동작 원리

Skills는 `.github/skills/{skill-name}/SKILL.md` 파일에 규칙을 적어두면, Copilot이 코드 생성 시 **자동으로 참고**한다. 별도 명령어를 입력할 필요가 없다.

```
프로젝트 루트/
└── .github/
    └── skills/
        ├── nextjs-basic-check/
        │   └── SKILL.md          ← Copilot이 자동 참조
        └── secret-guard/
            └── SKILL.md          ← Copilot이 자동 참조
```

### 자동 적용 (평소 사용)

Skills 파일이 프로젝트에 있으면 Copilot이 코드를 생성할 때 규칙을 반영한다.

예를 들어 secret-guard가 설정된 상태에서 아래 프롬프트를 입력하면:

> `Supabase 클라이언트 설정 코드 만들어줘`

Copilot은 secret-guard 규칙에 따라 키를 하드코딩하지 않고 `process.env`로 읽는 코드를 생성한다.

### 명시적 검사 (제출 전 점검)

과제 제출 전에 Skills 규칙을 기준으로 코드를 직접 점검할 수 있다.

**nextjs-basic-check 점검**:

| 상황 | 프롬프트 예시 |
|------|--------------|
| 특정 파일 점검 | `nextjs-basic-check 기준으로 app/page.tsx의 규칙 위반을 찾아줘` |
| 전체 프로젝트 점검 | `nextjs-basic-check 기준으로 이 프로젝트의 App Router 규칙 위반 3개만 찾아줘` |
| 수정 요청 | `nextjs-basic-check 규칙에 맞게 이 파일을 수정해줘` |

**secret-guard 점검**:

| 상황 | 프롬프트 예시 |
|------|--------------|
| 키 노출 점검 | `secret-guard 기준으로 이 프로젝트에서 키 노출 부분을 찾아줘` |
| .env 점검 | `secret-guard 기준으로 .env.local에 들어가야 할 값이 코드에 직접 쓰인 곳을 찾아줘` |
| Supabase 점검 | `secret-guard 기준으로 Supabase 클라이언트 설정이 올바른지 확인해줘` |

### 과제 워크플로우에서 MCP + Skills 함께 쓰기

| 단계 | 할 일 | 사용 도구 |
|------|-------|-----------|
| ① 과제 시작 | 스타터 코드 열기 | — |
| ② 코드 생성 | `use context7`로 최신 API 기반 코드 생성 | Context7 + Skills(자동) |
| ③ DB 작업 | Supabase 테이블·RLS 설정 | Supabase MCP |
| ④ 중간 점검 | `nextjs-basic-check 기준으로 점검해줘` | Skills(명시적) |
| ⑤ 제출 전 | `secret-guard 기준으로 키 노출 확인해줘` | Skills(명시적) |
| ⑥ 배포 | Vercel에 배포 후 URL 확인 | 브라우저 |
| ⑦ 제출 | 배포 URL + AI 검증 서술 제출 | Google Classroom |

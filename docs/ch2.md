# Chapter 2. Copilot 세팅과 바이브코딩

> **미션**: Copilot을 제대로 세팅하고, 말로 설명해서 페이지를 만든다

---

## 학습목표

이 장을 마치면 다음을 할 수 있다:

1. 바이브코딩의 원리(설명 → 생성 → 검증 → 반복)를 설명할 수 있다
2. GitHub Copilot과 Copilot Chat을 설치하고 사용할 수 있다
3. AI 코딩의 3대 한계(버전 불일치, 컨텍스트 소실, 환각)를 이해하고 대응할 수 있다
4. copilot-instructions.md를 작성하여 Copilot에게 프로젝트 컨텍스트를 제공할 수 있다
5. AI가 생성한 코드를 검증하는 체크리스트를 활용할 수 있다

---

## 2.1 바이브코딩이란

### 2.1.1 AI 시대의 개발 방식 변화

전통적인 개발은 개발자가 모든 코드를 직접 타이핑했다. 문법을 외우고, API 문서를 읽고, 한 줄씩 작성했다.

**바이브코딩**(Vibe Coding)은 다르다. 개발자가 "무엇을 만들고 싶은지"를 AI에게 설명하면, AI가 코드를 생성한다. 개발자의 역할은 코드를 타이핑하는 것에서 **코드를 검증하고 방향을 잡는 것**으로 바뀌었다.

쉽게 말해서, AI가 코드를 쓰고 내가 확인하는 방식이다.

### 2.1.2 바이브코딩의 원리: 설명 → 생성 → 검증 → 반복

바이브코딩은 네 단계를 반복한다:

```
① 설명: 만들고 싶은 것을 명확하게 AI에게 지시한다
② 생성: AI가 코드를 생성한다
③ 검증: 생성된 코드가 올바른지 확인한다
④ 반복: 틀린 부분을 수정 지시하거나, 다음 기능을 요청한다
```

이 중 가장 중요한 단계는 **③ 검증**이다. AI가 만든 코드를 그대로 사용하면 안 된다. 반드시 확인하고, 이해한 뒤 사용한다.

### 2.1.3 기본기가 필요한 이유: AI 출력을 판단하려면

"AI가 코드를 다 만들어주면, 기본기를 왜 배워야 하는가?"

AI가 만든 코드가 **맞는지 틀리는지 판단하려면** 기본기가 필요하다. HTML 구조를 모르면 AI가 잘못된 마크업을 생성해도 알아차리지 못한다. JavaScript를 모르면 에러 메시지를 읽을 수 없다.

비유하자면, 번역기가 아무리 좋아도 원어를 어느 정도 아는 사람이 결과를 더 잘 검증한다. 이 수업에서 3~6장에 걸쳐 HTML, CSS, JavaScript, Next.js 기본기를 배우는 이유가 바로 이것이다.

---

## 2.2 GitHub Copilot 설정

### 2.2.1 GitHub 학생 계정 신청 (Copilot 무료)

GitHub Copilot은 유료 서비스이지만, **GitHub Education** 인증을 받으면 무료로 사용할 수 있다.

**신청 방법**:

1. https://education.github.com/benefits 접속
2. **Get student benefits** 클릭
3. 학교 이메일(.ac.kr)로 인증
4. 학생증 사진 업로드 (필요 시)
5. 승인까지 수일~수주 소요

> 승인 대기 중에도 Copilot 무료 체험이 가능할 수 있다. GitHub 설정에서 확인한다.

### 2.2.2 VS Code Copilot / Copilot Chat 확장 설치

VS Code에서 다음 두 확장을 설치한다:

**표 2.1** Copilot 확장 설치

| 확장명 | 용도 |
|--------|------|
| GitHub Copilot | 코드 자동완성 (Tab으로 수락) |
| GitHub Copilot Chat | 대화형 코드 생성 (채팅 패널) |

설치 후 VS Code 오른쪽 하단에 Copilot 아이콘이 나타나면 성공이다. GitHub 로그인이 필요할 수 있다.

### 2.2.3 Copilot 자동완성: Tab 수락, 주석으로 의도 전달

Copilot의 가장 기본적인 기능은 **자동완성**이다. 코드를 타이핑하면 회색 글씨로 제안이 나타나고, `Tab`을 누르면 수락된다.

주석으로 의도를 전달하면 더 정확한 제안을 받을 수 있다:

```jsx
// 현재 날짜를 "2026년 2월 7일" 형식으로 반환하는 함수
```

이렇게 주석을 쓰면 Copilot이 그에 맞는 함수를 제안한다.

**표 2.2** Copilot 자동완성 단축키

| 단축키 | 기능 |
|--------|------|
| `Tab` | 제안 수락 |
| `Esc` | 제안 거부 |
| `Alt + ]` | 다음 제안 보기 |
| `Alt + [` | 이전 제안 보기 |

### 2.2.4 Copilot Chat: @workspace, /explain, /fix, Ctrl+I

Copilot Chat은 채팅 형태로 코드를 생성하거나 질문할 수 있는 기능이다.

**여는 방법**: VS Code 왼쪽 사이드바의 채팅 아이콘, 또는 `Ctrl + Shift + I` (macOS: `Cmd + Shift + I`)

자주 사용하는 명령어:

**표 2.3** Copilot Chat 주요 명령어

| 명령어 | 용도 | 예시 |
|--------|------|------|
| `@workspace` | 프로젝트 전체를 참조하여 대답 | "@workspace 이 프로젝트의 구조를 설명해줘" |
| `/explain` | 선택한 코드 설명 | 코드 선택 후 `/explain` |
| `/fix` | 에러 수정 제안 | 에러 코드 선택 후 `/fix` |
| `Ctrl + I` | 인라인 편집 | 코드 위에서 직접 수정 지시 |

<!-- COPILOT_VERIFY: @workspace 명령어로 실제 프로젝트 구조를 인식하는지 테스트하고, 응답 캡처해주세요 -->

---

## 2.3 AI 코딩의 3대 한계

AI 코딩 도구는 강력하지만, 반드시 알아야 할 세 가지 한계가 있다. **이것을 모르면 바이브코딩은 실패한다.**

### 2.3.1 한계 ①: 버전 불일치

AI는 과거 시점의 데이터로 학습한다. 그런데 라이브러리는 계속 업데이트된다.

**예를 들어**:
- AI가 2025년까지의 코드로 학습했다면, Next.js 14의 문법을 제안한다
- 그런데 지금 설치된 Next.js는 15 버전이다
- AI가 제안한 코드를 그대로 쓰면 에러가 난다

**실제 사례**:

```jsx
// AI가 제안하는 코드 (Next.js 14 방식 — 틀림)
import { useRouter } from 'next/router';

// 올바른 코드 (Next.js 15, App Router)
import { useRouter } from 'next/navigation';
```

`next/router`는 Pages Router(구 방식)의 import 경로이다. App Router에서는 `next/navigation`을 써야 한다. AI는 이 차이를 모르고 옛날 코드를 제안하는 경우가 많다.

이런 문제는 Tailwind CSS, Supabase 등 다른 라이브러리에서도 동일하게 발생한다.

### 2.3.2 한계 ②: 컨텍스트 소실

AI에게는 **장기 기억이 없다**. 채팅 세션이 끝나면 이전 대화를 모두 잊는다.

구체적으로:
- **세션 간 기억 없음**: 어제 나눈 대화를 오늘은 모른다
- **열린 파일 위주**: 프로젝트에 파일이 20개 있어도, 열려 있는 파일만 참고한다
- **설계 의도를 모른다**: "왜 이 컴포넌트를 이렇게 만들었는지" 모른 채 코드를 생성한다

결과적으로 AI는 프로젝트의 일부분만 보고 코드를 만든다. 전체 구조와 맞지 않는 코드를 생성하거나, 이미 있는 기능을 다시 만들거나, 일관성 없는 스타일로 코드를 작성한다.

### 2.3.3 한계 ③: 환각

**환각**(Hallucination)은 AI가 **존재하지 않는 것을 만들어내는 현상**이다. 이것이 가장 위험하다.

**환각의 유형**:

| 유형 | 예시 |
|------|------|
| 가짜 패키지 | `npm install next-auth-supabase` — 존재하지 않는 패키지 |
| 가짜 API | `supabase.from('posts').upsertMany([...])` — 없는 메서드 |
| 가짜 옵션 | `fetch(url, { retry: 3 })` — fetch에 retry 옵션은 없음 |
| 가짜 설정 | `next.config.js`에 존재하지 않는 설정 키 |

AI는 이런 가짜 코드를 **자신 있는 말투로** 제시한다. "이 패키지를 설치하면 됩니다"라고 당당하게 말하지만, 실제로는 그 패키지가 존재하지 않는다.

더 위험한 경우는 **비슷한 이름의 악성 패키지**가 존재하는 경우이다. AI가 추천한 패키지명을 그대로 설치했는데, 그것이 누군가 악의적으로 올려둔 패키지일 수 있다. 이를 **타이포스쿼팅**(Typosquatting)이라 한다.

### 2.3.4 3대 한계의 관계

세 가지 한계는 서로 연결되어 있다:

```
버전 불일치 + 컨텍스트 부족
        ↓
   환각 확률 증가
```

AI가 현재 버전을 모르고(버전 불일치), 프로젝트 맥락도 모르면(컨텍스트 부족), 그럴듯하지만 틀린 코드를 만들어낼 확률이 높아진다(환각).

이 세 가지 한계를 해결하는 것이 이 장의 나머지 내용이다.

---

## 2.4 해결: 컨텍스트 관리 3계층

AI에게 "내 프로젝트"를 이해시키는 방법은 세 단계로 나뉜다.

### 2.4.1 1계층 — copilot-instructions.md (필수)

**컨텍스트 문제의 80%를 해결하는 핵심 파일**이다.

`.github/copilot-instructions.md`는 Copilot이 **매 세션마다 자동으로 읽는** 프로젝트 지시 파일이다. 이 파일에 프로젝트 정보를 적어두면, Copilot이 매번 그 내용을 참고하여 코드를 생성한다.

**생성 방법**:

```bash
mkdir -p .github
```

macOS/Windows 모두 동일하다. 프로젝트 루트에서 `.github` 폴더를 만들고, 그 안에 `copilot-instructions.md` 파일을 생성한다.

**기본 템플릿**:

```markdown
# Project Context

## Tech Stack
- Next.js 15.x (App Router ONLY — Pages Router 사용 금지)
- Tailwind CSS 4.x
- Supabase (@supabase/ssr — @supabase/auth-helpers 사용 금지)
- Vercel 배포

## Project Structure
- app/ — 페이지 및 라우팅
- components/ — 재사용 UI 컴포넌트
- lib/ — Supabase 클라이언트, 유틸리티
- public/ — 정적 파일

## Coding Conventions
- Server Component 기본, "use client"는 필요할 때만
- async/await 패턴 (then 체이닝 금지)
- Tailwind CSS 유틸리티 클래스만 사용

## Known AI Mistakes (DO NOT)
- next/router 사용 금지 → next/navigation 사용
- getServerSideProps 사용 금지 → App Router 서버 컴포넌트 사용
- @supabase/auth-helpers 사용 금지 → @supabase/ssr 사용
- CSS Modules, styled-components 사용 금지
```

<!-- COPILOT_VERIFY: copilot-instructions.md 작성 전/후로 Copilot이 Next.js 코드를 생성할 때 차이가 있는지 비교 테스트해주세요 -->

**"Known AI Mistakes" 섹션이 핵심이다.** AI가 자주 틀리는 패턴을 미리 명시하면, Copilot이 그 실수를 피하도록 유도할 수 있다. 이 섹션은 수업이 진행되면서 계속 추가한다.

### 2.4.2 2계층 — 프로젝트 구조 파일 + @workspace (권장)

copilot-instructions.md가 "규칙"을 알려준다면, 프로젝트 구조 파일은 "맥락"을 제공한다.

**Copilot이 참조하는 파일들**:
- `README.md` — 프로젝트 개요
- `package.json` — 설치된 패키지와 버전
- 열려 있는 파일들

**@workspace 명령어**를 사용하면 Copilot이 프로젝트 전체를 탐색한 뒤 대답한다:

> **Copilot 프롬프트**
> "@workspace 현재 프로젝트의 페이지 구조를 파악하고, 새로운 /about 페이지를 추가해줘"

@workspace 없이 질문하면 열린 파일만 참고한다. @workspace를 붙이면 프로젝트 전체를 스캔한다.

<!-- COPILOT_VERIFY: @workspace 유무에 따른 Copilot 응답 차이를 비교 캡처해주세요 -->

### 2.4.3 3계층 — MCP로 외부 지식 연결 (선택)

**MCP**(Model Context Protocol)는 AI에게 **외부 도구를 연결하는 방법**이다.

그중 **Context7**이라는 MCP를 사용하면, Copilot이 **공식 문서를 실시간으로 참조**할 수 있다. AI의 학습 시점에 관계없이 최신 API를 확인할 수 있으므로, 버전 불일치 문제를 근본적으로 해결한다.

<!-- COPILOT_VERIFY: VS Code에서 Context7 MCP를 설치하고, Copilot이 실제로 최신 문서를 참조하는지 테스트해주세요 -->

> MCP 설정은 다소 복잡하므로, 이 수업에서는 소개 수준으로 다룬다. 자세한 설치 방법은 부록 D를 참고한다.

### 2.4.4 package.json 버전 고정

학생 전원이 **같은 버전의 라이브러리**를 사용해야 같은 결과를 얻을 수 있다.

교수가 제공하는 `package.json`을 사용한다:

```bash
# 기존 package.json을 교수 제공 파일로 교체한 후
npm ci
```

`npm install`과 `npm ci`의 차이:

| 명령어 | 동작 | 용도 |
|--------|------|------|
| `npm install` | package.json 기준 최신 호환 버전 설치 | 일반 개발 |
| `npm ci` | package-lock.json 기준 정확한 버전 설치 | 버전 통일 (수업용) |

수업에서는 `npm ci`를 사용하여 전원 동일한 환경을 유지한다.

---

## 2.5 해결: 환각 검증법

AI 출력을 **믿지 말고 확인한다**. 이것이 바이브코딩의 핵심 습관이다.

### 2.5.1 환각을 의심해야 하는 순간

다음 상황에서는 반드시 의심한다:

- 처음 보는 **패키지명**이 나올 때
- 검색해도 **공식 문서에 나오지 않는 API**일 때
- 코드가 **너무 깔끔하게** 한 번에 동작하는 것처럼 보일 때
- AI가 **"이렇게 하면 됩니다"라고 자신 있게** 말하는데, 실행하면 에러가 날 때

### 2.5.2 패키지 검증

AI가 새로운 패키지를 추천하면, **설치 전에 반드시 확인**한다:

1. https://www.npmjs.com 에서 패키지명 검색
2. 확인 항목:

**표 2.4** 패키지 검증 체크리스트

| 확인 항목 | 안전 기준 |
|-----------|----------|
| npmjs.com에 존재하는가? | 검색 결과에 나와야 함 |
| 주간 다운로드 수 | 최소 수천 이상 |
| 최종 업데이트 | 최근 1년 이내 |
| GitHub 저장소 | 링크가 있고, 실제 코드가 존재 |

다운로드 수가 매우 적거나 최근 만들어진 패키지는 주의한다. 타이포스쿼팅 패키지일 수 있다.

### 2.5.3 API 검증

AI가 제안한 함수/메서드가 실제로 존재하는지 **공식 문서에서 확인**한다:

| 라이브러리 | 공식 문서 |
|-----------|----------|
| Next.js | https://nextjs.org/docs |
| Tailwind CSS | https://tailwindcss.com/docs |
| Supabase | https://supabase.com/docs |

MCP(Context7)를 설정했다면, Copilot Chat에서 직접 최신 문서를 조회할 수도 있다.

### 2.5.4 코드 검증 체크리스트

AI가 생성한 코드를 받으면, 다음 항목을 확인한다:

**표 2.5** AI 코드 검증 체크리스트

| # | 확인 항목 | 확인 방법 |
|:-:|----------|----------|
| 1 | import 경로가 실제 존재하는가? | 파일 경로 클릭하여 이동 확인 |
| 2 | 사용한 함수/메서드가 공식 API에 있는가? | 공식 문서 검색 |
| 3 | 환경변수가 하드코딩되어 있지 않은가? | API 키가 코드에 직접 노출되면 안 됨 |
| 4 | 에러 처리가 있는가? | try-catch 또는 에러 상태 확인 |
| 5 | 현재 버전의 문법을 사용하는가? | copilot-instructions.md와 대조 |

이 체크리스트는 앞으로 **매 실습마다** 사용한다. 습관이 될 때까지 반복한다.

### 2.5.5 환각 발견 시 대응

환각을 발견하면:

1. AI에게 **"이 API의 공식 문서 출처를 알려줘"**라고 요청한다
2. 출처를 제시하지 못하거나 가짜 URL을 주면 환각이 확정된다
3. 올바른 API를 직접 찾아 수정한다
4. **copilot-instructions.md의 "Known AI Mistakes" 섹션에 추가**한다

```markdown
## Known AI Mistakes (DO NOT)
- supabase.from().upsertMany() 사용 금지 → .upsert() 사용
```

이렇게 하면 같은 환각이 반복되지 않는다.

---

## 2.6 종합 대응 워크플로우

AI가 생성한 코드에서 에러가 나거나 의심스러운 부분을 발견했을 때, 다음 순서로 대응한다:

```
① 환각 체크   — 패키지/API/옵션이 실존하는가?
      ↓
② 버전 체크   — copilot-instructions.md에 버전과 패턴이 명시되어 있는가?
      ↓
③ 컨텍스트 체크 — @workspace로 프로젝트 맥락을 다시 제공한다
      ↓
④ 외부 검증   — MCP 또는 공식 문서에서 직접 검색한다
      ↓
⑤ 해결 후     — copilot-instructions.md에 새 규칙/금지 패턴 추가
```

**⑤번이 가장 중요하다.** 문제를 해결한 뒤 copilot-instructions.md를 업데이트하지 않으면, 다음에 같은 실수가 반복된다. AI는 기억하지 못하지만, copilot-instructions.md는 기억한다.

이 워크플로우를 반복하면 copilot-instructions.md가 점점 정교해지고, AI의 실수가 줄어든다. 이 과정 자체가 **AI 시대 개발자의 핵심 역량**이다.

---

## 2.7 Copilot Skills와 Agent Mode

### 2.7.1 Skills란

**Copilot Skills**는 Copilot에게 특정 작업 능력을 부여하는 기능이다. 반복적인 작업을 자동화할 때 유용하다.

<!-- COPILOT_VERIFY: Copilot Skills 기능이 현재 VS Code에서 사용 가능한지, 실제 설정 화면을 캡처해주세요 -->

### 2.7.2 커스텀 프롬프트로 반복 작업 자동화

자주 사용하는 프롬프트를 저장해두면 매번 타이핑할 필요가 없다. 예를 들어 "새 페이지 생성" 작업을 하나의 커스텀 프롬프트로 만들 수 있다.

### 2.7.3 Agent Mode

**Agent Mode**는 Copilot이 여러 단계의 작업을 자동으로 수행하는 모드이다. 파일 생성, 코드 작성, 에러 수정까지 연속으로 처리한다.

Agent Mode에서는 **컨텍스트 관리가 더욱 중요**하다. AI가 여러 파일을 동시에 수정하므로, copilot-instructions.md에 프로젝트 구조와 규칙이 명확히 정의되어 있어야 한다.

<!-- COPILOT_VERIFY: Agent Mode에서 "게시판 페이지를 만들어줘"를 시도하고, 실제 동작 과정을 캡처해주세요 -->

---

## 2.8 AI 사용 로그 작성법

이 수업에서는 **AI 사용 로그**를 기록한다. 기말 프로젝트 제출 시 필수 제출물이다.

### 2.8.1 어떤 프롬프트를 썼는가

AI에게 어떤 지시를 내렸는지 기록한다:

```
프롬프트: "Tailwind CSS로 반응형 네비게이션 바를 만들어줘"
```

### 2.8.2 AI가 뭘 틀렸는가

AI의 실수를 분류하여 기록한다:

```
문제: next/router를 import함 (Pages Router 문법)
분류: 버전 불일치
```

### 2.8.3 어떻게 해결했는가

해결 과정과 copilot-instructions.md 수정 사항을 기록한다:

```
해결: next/navigation으로 변경
조치: copilot-instructions.md에 "next/router 사용 금지" 추가
```

> 로그 템플릿은 부록 B를 참고한다.

---

## 2.9 과제: Copilot 설정 + copilot-instructions.md + 자기소개 페이지

### 과제 내용

1. **GitHub Copilot / Copilot Chat** 확장을 설치한다
2. **`.github/copilot-instructions.md`** 파일을 작성한다 (2.4.1 템플릿 참고)
3. Copilot Chat을 사용하여 **자기소개 페이지**를 만든다
4. **AI 사용 로그**를 작성한다 (프롬프트, 실수, 해결 과정)
5. git push하여 **Vercel에 배포**한다

**프롬프트 예시**:

> **Copilot 프롬프트**
> "Tailwind CSS를 사용하여 자기소개 페이지를 만들어줘.
> 이름, 학교, 전공, 취미를 카드 형태로 보여주고,
> 배경은 밝은 회색, 카드는 흰색으로 해줘."

<!-- COPILOT_VERIFY: 위 프롬프트를 실제 Copilot Chat에 입력하고 결과를 캡처해주세요 -->

**제출물**:
- 배포된 Vercel URL
- copilot-instructions.md 파일 (GitHub에 포함)
- AI 사용 로그

---

## 장 요약

- **바이브코딩**은 AI에게 설명하고, 생성된 코드를 검증하는 방식이다
- AI 코딩에는 **3대 한계**가 있다: 버전 불일치, 컨텍스트 소실, 환각
- **copilot-instructions.md**가 컨텍스트 문제의 80%를 해결한다
- 컨텍스트 3계층: **copilot-instructions.md** → **@workspace** → **MCP**
- AI가 추천하는 **패키지와 API는 반드시 공식 문서에서 검증**한다
- 문제 해결 후 copilot-instructions.md를 **업데이트하는 습관**이 핵심이다
- AI 사용 과정을 **로그로 기록**한다

---

## 다음 장 예고

다음 장에서는 웹의 기본 구조인 **HTML**과 스타일링 도구인 **Tailwind CSS**를 배운다. 이 장에서 설정한 Copilot과 함께, 게시판 UI를 마크업하고 스타일링하는 실습을 진행한다.

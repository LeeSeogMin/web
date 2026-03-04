# Chapter 2. Copilot 세팅과 바이브코딩 — C: 모범 구현 + 해설

> B회차 과제 제출 후 공개

---

## 모범 구현 코드 해설

_전체 프로젝트는 practice/chapter2/complete/ 참고_

### 전체 구조

```
practice/chapter2/complete/
├── .github/
│   └── copilot-instructions.md  ← 모범 copilot-instructions.md
├── app/
│   ├── layout.js       ← 공통 레이아웃 (Tailwind 설정)
│   ├── page.js         ← 블로그 소개 페이지 (모범 구현)
│   └── globals.css     ← Tailwind 기본 import
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

---

### copilot-instructions.md 핵심 포인트

#### 1. Tech Stack 섹션

```markdown
## Tech Stack
- Next.js 14.2.21 (App Router ONLY — Pages Router 사용 금지)
- Tailwind CSS 3.4.17
- Vercel 배포
```

**왜 이렇게 했는가**: 기술 스택과 **정확한 버전**을 명시하면 AI가 올바른 API를 사용할 확률이 높아진다. 특히 "App Router ONLY"와 "Pages Router 사용 금지"를 함께 적어야 AI가 구 방식을 제안하지 않는다.

#### 2. Known AI Mistakes 섹션

```markdown
## Known AI Mistakes (DO NOT)
- next/router 사용 금지 → next/navigation 사용
- getServerSideProps 사용 금지 → App Router 서버 컴포넌트 사용
- @supabase/auth-helpers 사용 금지 → @supabase/ssr 사용
- CSS Modules, styled-components 사용 금지
```

**이 섹션이 가장 중요하다.** AI가 자주 틀리는 패턴을 "금지" + "대안"으로 명시한다. 단순히 "금지"만 적으면 AI가 무엇을 대신 써야 하는지 모른다. 반드시 **올바른 대안**을 함께 적는다.


---

### page.js 핵심 포인트

#### 1. 서버 컴포넌트로 작성

```jsx
// "use client" 지시어가 없다 → 서버 컴포넌트
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      {/* ... */}
    </main>
  );
}
```

**왜 이렇게 했는가**: 블로그 소개 페이지는 정적 콘텐츠이다. 상태(useState)나 이벤트 처리(onClick)가 필요 없으므로 **서버 컴포넌트**로 충분하다. `"use client"`를 추가하면 불필요하게 클라이언트 번들 크기가 커진다.

> Copilot은 습관적으로 `"use client"`를 추가하는 경향이 있다. 이것이 Ch2에서 가장 흔한 AI 실수 중 하나이다.

#### 2. 카드 레이아웃

```jsx
<div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
  <h1 className="text-3xl font-bold text-center mb-2">홍길동</h1>
  <p className="text-gray-500 text-center mb-6">컴퓨터공학과 3학년</p>

  <div className="space-y-3">
    <p><strong>학교:</strong> 한국대학교</p>
    <p><strong>전공:</strong> 컴퓨터공학</p>
    <p><strong>취미:</strong> 코딩, 독서, 게임</p>
  </div>
</div>
```

#### 3. Tailwind 핵심 클래스 해설

**카드 컨테이너**:

**표 2C.1** 카드 Tailwind 클래스 해설

| 클래스 | 의미 |
|--------|------|
| `bg-white` | 흰색 배경 |
| `rounded-xl` | 둥근 모서리 (12px, lg보다 약간 더 둥글다) |
| `shadow-lg` | 큰 그림자 (카드 느낌) |
| `p-8` | padding 32px |
| `max-w-md` | 최대 너비 448px (너무 넓어지지 않도록) |
| `w-full` | 너비 100% (max-w-md까지) |

**간격 유틸리티**:

| 클래스 | 의미 |
|--------|------|
| `mb-2` | margin-bottom 8px |
| `mb-6` | margin-bottom 24px |
| `space-y-3` | 자식 요소 사이 세로 간격 12px |

`space-y-3`은 자주 사용되는 패턴이다. 개별 요소에 `mb-3`을 일일이 붙이는 대신, 부모에 `space-y-3`을 주면 자식 요소 사이에 균등한 간격이 자동으로 생긴다.

#### 4. 링크 추가

```jsx
<div className="mt-6 flex gap-4 justify-center">
  <a href="https://github.com/본인아이디"
     className="text-blue-500 hover:text-blue-700 hover:underline">
    GitHub
  </a>
  <a href="mailto:본인@이메일.com"
     className="text-blue-500 hover:text-blue-700 hover:underline">
    이메일
  </a>
</div>
```

**표 2C.2** 링크 Tailwind 클래스 해설

| 클래스 | 의미 |
|--------|------|
| `text-blue-500` | 파란색 텍스트 |
| `hover:text-blue-700` | 마우스 올리면 진한 파란색 |
| `hover:underline` | 마우스 올리면 밑줄 |
| `flex gap-4` | 가로 배치 + 간격 16px |
| `justify-center` | 가운데 정렬 |

---

## 채점 기준 참고

**표 2C.3** 채점 기준

| 항목 | 배점 | 기준 |
|------|------|------|
| 배포 URL 동작 | 7점 | 페이지가 정상적으로 렌더링되는가 |
| AI 검증 서술 | 3점 | AI가 틀린 부분을 구체적으로 설명했는가 |

**URL 동작 (7점)** 세부:
- 페이지가 에러 없이 렌더링된다 (3점)
- 본인 정보(이름, 학교/전공/취미 중 1개 이상)가 표시된다 (2점)
- Tailwind CSS 스타일이 적용되어 있다 (카드 레이아웃 등) (2점)

**AI 검증 서술 (3점)** 세부:
- AI가 틀린 부분을 1개 이상 구체적으로 지적했다 (2점)
- 어떻게 수정했는지 설명했다 (1점)

---

## 우수 구현 사례

### 사례 1: 프로필 이미지 추가

```jsx
<div className="flex flex-col items-center mb-6">
  <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
    <span className="text-3xl">👤</span>
  </div>
  <h1 className="text-3xl font-bold">홍길동</h1>
</div>
```

이미지 대신 이모지와 회색 원으로 아바타를 만든 사례. `rounded-full`로 완전한 원을 만들고, `w-24 h-24`로 크기를 고정했다.

### 사례 2: 기술 스택 뱃지

```jsx
<div className="flex flex-wrap gap-2 mt-4">
  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
    Next.js
  </span>
  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
    Tailwind
  </span>
  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
    Supabase
  </span>
</div>
```

기술 스택을 컬러풀한 뱃지로 표시한 사례. `rounded-full` + 색상 조합으로 태그 느낌을 만들었다.

---

## 자주 하는 실수 정리

**표 2C.4** 학생들이 자주 하는 실수

| 실수 | 증상 | 해결 |
|------|------|------|
| Copilot 미설치 | 자동완성 안 됨 | VS Code 확장에서 GitHub Copilot 설치 |
| copilot-instructions.md 위치 오류 | Copilot이 규칙을 안 읽음 | `.github/` 폴더 안에 위치해야 함 |
| `"use client"` 불필요 추가 | 동작은 하지만 비효율 | 정적 페이지는 서버 컴포넌트로 |
| `class` 사용 | 콘솔에 경고, 스타일 미적용 | `className`으로 변경 |
| AI 사용 로그 미작성 | 제출물 누락 | 과제 제출 시 함께 작성 |
| Copilot이 TypeScript 코드 생성 | `.js` 파일에 타입 에러 | "JavaScript로 작성해줘" 명시 또는 타입 제거 |
| import 문이 추가됨 (불필요) | 사용하지 않는 import | 사용하지 않는 import 삭제 |

---

## 다음 장 연결

이번 장에서 설정한 Copilot과 copilot-instructions.md는 **이후 모든 장에서 사용**된다:

- Ch3(HTML + Tailwind): Copilot에게 블로그 레이아웃 생성을 요청하고, 시맨틱 태그와 Tailwind 클래스를 검증한다
- Ch4(JavaScript): Copilot에게 동적 기능 구현을 요청하고, 비동기 패턴을 검증한다
- Ch5~12: 매 장마다 copilot-instructions.md에 새로운 규칙을 추가하며, AI와의 협업 품질을 높여간다

copilot-instructions.md의 "Known AI Mistakes" 섹션이 학기 동안 계속 성장하는 것이 이 수업의 핵심이다. **AI는 기억하지 못하지만, copilot-instructions.md는 기억한다.**

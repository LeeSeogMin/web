# Chapter 1. 첫 배포 — create-next-app에서 Vercel까지 — C: 모범 구현 + 해설

> B회차 과제 제출 후 공개

---

## 모범 구현 코드 해설

_전체 프로젝트는 practice/chapter1/complete/ 참고_

### 전체 구조

```
practice/chapter1/complete/
├── app/
│   ├── layout.js       ← 공통 레이아웃 (Tailwind 설정)
│   ├── page.js         ← 프로필 페이지 (모범 구현)
│   └── globals.css     ← Tailwind 기본 import
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

---

### page.js 핵심 포인트

#### 1. 기본 구조: 함수형 컴포넌트

```jsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {/* 내용 */}
    </main>
  );
}
```

**왜 이렇게 했는가**: Next.js App Router에서 `app/page.js`는 `export default function`으로 컴포넌트를 내보내야 한다. `<main>` 시맨틱 태그를 사용하여 페이지의 핵심 콘텐츠임을 명시했다. `min-h-screen`으로 화면 전체 높이를 확보하고, `flex` + `items-center` + `justify-center`로 콘텐츠를 정중앙에 배치했다.

#### 2. Tailwind 핵심 클래스 해설

**페이지 레이아웃**:
```jsx
<main className="flex min-h-screen flex-col items-center justify-center p-24">
```

**표 1C.1** 레이아웃 클래스 해설

| 클래스 | 의미 |
|--------|------|
| `flex` | Flexbox 레이아웃 활성화 |
| `min-h-screen` | 최소 높이 = 화면 전체 (100vh) |
| `flex-col` | 세로 방향 배치 |
| `items-center` | 가로축 가운데 정렬 |
| `justify-center` | 세로축 가운데 정렬 |
| `p-24` | padding 96px (넓은 여백) |

**텍스트 스타일**:
```jsx
<h1 className="text-4xl font-bold">홍길동</h1>
<p className="mt-4 text-xl text-gray-600">웹 프로그래밍을 배우고 있습니다</p>
```

**표 1C.2** 텍스트 클래스 해설

| 클래스 | 의미 |
|--------|------|
| `text-4xl` | font-size: 36px (큰 제목) |
| `font-bold` | font-weight: 700 (굵은 글씨) |
| `mt-4` | margin-top: 16px (위쪽 간격) |
| `text-xl` | font-size: 20px (중간 텍스트) |
| `text-gray-600` | 중간 회색 텍스트 |

#### 3. layout.js의 역할

```jsx
import "./globals.css";

export const metadata = {
  title: "내 프로필",
  description: "Ch1 개인 프로필 페이지",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
```

**확인 포인트**:
- `import "./globals.css"` — Tailwind CSS를 전역으로 로드한다
- `metadata` — 브라우저 탭 제목과 검색 엔진 설명을 설정한다
- `<html lang="ko">` — 한국어 페이지임을 선언한다
- `{ children }` — 각 page.js의 내용이 여기에 들어간다

---

## 채점 기준 참고

**표 1C.3** 채점 기준

| 항목 | 배점 | 기준 |
|------|------|------|
| 배포 URL 동작 | 10점 | 페이지가 정상적으로 렌더링되는가 |

> Ch1은 첫 수업이므로 "AI 검증 서술" 항목이 없다. 배포 URL 동작만 확인한다.

**URL 동작 (10점)** 세부:
- Vercel URL에 접속하면 페이지가 에러 없이 나타난다 (5점)
- 본인 이름과 자기소개가 표시된다 (3점)
- Tailwind CSS 스타일이 적용되어 있다 (2점)

---

## 우수 구현 사례

### 사례 1: 추가 정보 카드

```jsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <h1 className="text-4xl font-bold mb-2">홍길동</h1>
      <p className="text-xl text-gray-600 mb-8">컴퓨터공학과 3학년</p>
      <div className="bg-white rounded-lg shadow p-6 max-w-md w-full">
        <p className="mb-2"><strong>학교:</strong> 한국대학교</p>
        <p className="mb-2"><strong>전공:</strong> 컴퓨터공학</p>
        <p className="mb-2"><strong>취미:</strong> 게임, 독서</p>
      </div>
    </main>
  );
}
```

카드 형태로 정보를 묶은 사례. `bg-white`, `rounded-lg`, `shadow`로 카드 효과를 만들었다. 3장에서 배울 패턴을 미리 활용한 것이다.

### 사례 2: 간단한 링크 추가

```jsx
<a href="https://github.com/본인아이디"
   className="mt-4 text-blue-500 hover:underline">
  GitHub 프로필
</a>
```

외부 링크를 추가한 사례. `hover:underline`로 마우스를 올리면 밑줄이 나타나는 인터랙션을 적용했다.

---

## 자주 하는 실수 정리

**표 1C.4** 학생들이 자주 하는 실수

| 실수 | 증상 | 해결 |
|------|------|------|
| `npm install` 누락 | `Module not found` 에러 | 프로젝트 폴더에서 `npm install` 실행 |
| `app/page.js` 대신 다른 파일 수정 | 변경 사항이 화면에 안 나타남 | `app/page.js`를 수정해야 메인 페이지가 바뀜 |
| `export default` 누락 | 빈 화면 또는 에러 | 함수 앞에 `export default` 필수 |
| JSX에서 `return` 괄호 누락 | Syntax error | `return ( ... )` 괄호로 감싸기 |
| `git push` 전 `git add` 누락 | `nothing to commit` | `git add .` 먼저 실행 |
| GitHub 저장소 미연결 | `remote: No such repository` | `git remote add origin` 으로 연결 |
| Vercel 배포 안 됨 | 대시보드에 에러 | GitHub 연동 확인, Build 로그 확인 |

---

## 다음 장 연결

이번 장에서 완성한 프로필 페이지는 Ch2(Copilot 세팅과 바이브코딩)에서 업그레이드된다:
- GitHub Copilot을 설치하고 AI에게 프로필 페이지 개선을 요청한다
- copilot-instructions.md를 작성하여 프로젝트 컨텍스트를 제공한다
- AI가 생성한 코드를 검증하는 방법을 배운다

지금 배운 **create-next-app → npm run dev → git push → Vercel 배포** 흐름은 이후 매주 반복되므로, 이 과정이 손에 익도록 연습해두는 것이 좋다.

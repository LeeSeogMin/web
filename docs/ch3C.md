# Chapter 3. HTML 시맨틱과 Tailwind CSS — C: 모범 구현 + 해설

> B회차 과제 제출 후 공개

---

## 모범 구현 코드 해설

_전체 프로젝트는 practice/chapter3/complete/ 참고_

### 전체 구조

```
practice/chapter3/complete/
├── app/
│   ├── layout.js       ← 공통 레이아웃 (Tailwind 설정)
│   ├── page.js         ← 블로그 메인 페이지 (모범 구현)
│   └── globals.css     ← Tailwind 기본 import
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

---

### page.js 핵심 포인트

#### 1. 더미 데이터 분리

```jsx
const posts = [
  {
    id: 1,
    title: "Next.js App Router 시작하기",
    content: "Next.js 14의 App Router를 사용하면...",
    author: "김개발",
    date: "2026-02-25",
  },
  // ...
];
```

**왜 이렇게 했는가**: 데이터를 JSX 바깥에 배열로 분리하면 나중에 API 데이터로 교체하기 쉽다. Ch5(JavaScript)에서 `fetch`로 서버 데이터를 가져올 때 이 구조가 그대로 활용된다.

> **강의 팁**: 학생 중 일부는 카드 3개를 JSX에 직접 복붙할 수 있다. 동작은 하지만, "데이터를 배열로 분리하고 `map()`으로 반복하는 패턴"이 더 좋은 이유를 설명한다 — 게시글이 100개가 되면 복붙은 불가능하다.

#### 2. 시맨틱 태그 구조

```
<div>           ← 최외곽 래퍼 (시맨틱 의미 없음, 스타일용)
  <header>      ← 헤더 영역
    <nav>       ← 내비게이션
  <main>        ← 핵심 콘텐츠
    <article>   ← 독립 콘텐츠 (게시글 1개)
    <article>
    <article>
  <footer>      ← 바닥글
```

**확인 포인트**:
- `<header>` 안에 `<nav>`가 있다 — 올바른 구조
- `<main>`은 페이지에 1개만 있다
- 각 게시글이 `<article>`로 감싸져 있다 — 독립적으로 의미를 가진다
- `<footer>`가 맨 아래에 있다

#### 3. heading 계층

```
<h1>게시판</h1>        ← 사이트 제목 (1개)
  <h2>최신 게시글</h2>  ← 메인 섹션 제목
    <h3>게시글 제목</h3> ← 개별 게시글 제목
```

h1 → h2 → h3 순서가 정확하다. AI는 시각적 크기를 맞추려고 h1 → h3으로 건너뛰는 실수를 자주 한다.

#### 4. Tailwind 핵심 클래스 해설

**내비게이션 바**:
```jsx
<nav className="max-w-4xl mx-auto flex justify-between items-center p-4">
```

| 클래스 | 의미 |
|--------|------|
| `max-w-4xl` | 최대 너비 896px (콘텐츠 중앙 정렬용) |
| `mx-auto` | 좌우 margin auto (가운데 배치) |
| `flex` | Flexbox 활성화 |
| `justify-between` | 양 끝 정렬 |
| `items-center` | 세로축 가운데 정렬 |
| `p-4` | padding 16px |

**반응형 그리드**:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
```

| 클래스 | 의미 |
|--------|------|
| `grid` | Grid 레이아웃 활성화 |
| `grid-cols-1` | 기본 1열 (모바일) |
| `md:grid-cols-2` | 768px 이상에서 2열 (태블릿/데스크톱) |
| `gap-6` | 카드 사이 간격 24px |

**게시글 카드**:
```jsx
<article className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
```

| 클래스 | 의미 |
|--------|------|
| `bg-white` | 흰색 배경 |
| `rounded-lg` | 둥근 모서리 (8px) |
| `shadow` | 기본 그림자 |
| `p-6` | padding 24px |
| `hover:shadow-lg` | 마우스 올리면 그림자 커짐 |
| `transition` | 변화가 부드럽게 적용 |

#### 5. JSX에서 주의할 점

```jsx
{/* ✅ JSX에서는 className 사용 */}
<div className="p-4">

{/* ✅ JSX에서는 htmlFor 사용 (폼이 있는 경우) */}
<label htmlFor="search">

{/* ✅ map()에는 key 필수 */}
{posts.map((post) => (
  <article key={post.id}>

{/* ✅ time 태그에 dateTime 속성 */}
<time dateTime={post.date}>{post.date}</time>
```

---

## 채점 기준 참고

**표 3C.1** 채점 기준

| 항목 | 배점 | 기준 |
|------|------|------|
| 배포 URL 동작 | 7점 | 페이지가 정상적으로 렌더링되는가 |
| AI 검증 서술 | 3점 | AI가 틀린 부분을 구체적으로 설명했는가 |

**URL 동작 (7점)** 세부:
- 페이지가 에러 없이 렌더링된다 (3점)
- 게시글 카드가 3개 이상 표시된다 (2점)
- 반응형이 동작한다 — 모바일 1열, 태블릿/데스크톱 2열 (2점)

**AI 검증 서술 (3점)** 세부:
- AI가 틀린 부분을 1개 이상 구체적으로 지적했다 (2점)
- 어떻게 수정했는지 설명했다 (1점)

---

## 우수 구현 사례

### 사례 1: 카테고리 태그 추가

```jsx
<article className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
    React
  </span>
  <h3 className="text-lg font-bold mt-2 mb-2">게시글 제목</h3>
  {/* ... */}
</article>
```

카테고리 라벨을 작은 뱃지로 추가한 사례. 과제 요구사항을 넘어서는 추가 기능이지만, Tailwind의 색상 + 패딩 + rounded 조합을 잘 활용했다.

### 사례 2: 다크 모드 토글

```jsx
<html lang="ko" className="dark">
  {/* ... */}
  <article className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
```

Tailwind의 `dark:` 접두어를 활용한 다크 모드 대응. Ch5 이후에 JavaScript로 토글 기능을 추가할 수 있다.

---

## 자주 하는 실수 정리

**표 3C.2** 학생들이 자주 하는 실수

| 실수 | 증상 | 해결 |
|------|------|------|
| `npm install` 누락 | `Module not found` 에러 | 스타터 폴더에서 `npm install` 실행 |
| `class` 사용 | 콘솔에 경고, 스타일 미적용 | `className`으로 변경 |
| `for` 사용 | 콘솔에 경고 | `htmlFor`로 변경 |
| h1 → h3 건너뜀 | 화면은 정상이나 시맨틱 오류 | h2를 중간에 추가 |
| `grid-cols-2`만 사용 (md: 없음) | 모바일에서도 2열 표시 | `grid-cols-1 md:grid-cols-2`로 수정 |
| `key` prop 누락 | 콘솔에 경고 | `map()` 안의 최상위 요소에 `key` 추가 |
| footer 누락 | 페이지 하단이 비어있음 | `<footer>` 태그 추가 |
| Tailwind 클래스 오타 | 스타일 미적용 (에러 없음) | DevTools에서 적용된 CSS 확인 |

---

## 다음 장 연결

이번 장에서 만든 정적 블로그는 Ch4(JavaScript 핵심)에서 동적 기능이 추가된다:
- 검색 기능
- 게시글 필터링
- 더보기 버튼

Ch5(JavaScript 비동기)에서는 더미 데이터 대신 API에서 실제 데이터를 가져온다. 지금 사용한 `posts` 배열 구조가 그대로 활용되므로, 데이터를 배열로 분리한 패턴이 왜 중요한지 다시 확인하게 된다.

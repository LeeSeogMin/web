# Chapter 3. HTML 시맨틱과 Tailwind CSS

> **미션**: Copilot과 함께 게시판 UI를 마크업하고 스타일링한다

---

## 학습목표

1. HTML5 문서 구조와 시맨틱 태그의 역할을 설명할 수 있다
2. 폼 요소를 올바르게 마크업하고 접근성을 고려할 수 있다
3. Tailwind CSS의 유틸리티 클래스를 읽고 이해할 수 있다
4. Flexbox와 Grid로 레이아웃을 구성할 수 있다
5. 반응형 디자인을 적용할 수 있다

---

## 수업 타임라인

| 시간 | 구분 | 내용 |
|------|------|------|
| 00:00~00:50 | **1교시** | HTML 구조 + 시맨틱 태그 + 폼 |
| 00:50~01:00 | 쉬는시간 | |
| 01:00~01:50 | **2교시** | Tailwind CSS 기초 + 레이아웃 + 반응형 |
| 01:50~02:00 | 쉬는시간 | |
| 02:00~02:50 | **3교시** | 게시판 UI 만들기 + 배포 + 과제 제출 |

---

# 1교시: HTML 이론

## 3.1 HTML5 문서 구조

HTML은 웹 페이지의 **뼈대**이다. 브라우저는 HTML을 읽어 화면의 구조를 결정한다. 스타일(CSS)과 동작(JavaScript)은 이 뼈대 위에 얹어진다.

### 3.1.1 DOCTYPE, html, head, body

모든 HTML 문서는 동일한 기본 구조를 가진다:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>페이지 제목</title>
</head>
<body>
  <!-- 화면에 보이는 내용 -->
</body>
</html>
```

각 부분의 역할:

**표 3.1** HTML5 기본 태그

| 태그 | 역할 |
|------|------|
| `<!DOCTYPE html>` | "이 문서는 HTML5입니다"라고 브라우저에 알린다 |
| `<html lang="ko">` | 문서 전체를 감싼다. `lang="ko"`는 한국어 문서임을 명시 |
| `<head>` | 브라우저 설정 정보 (화면에 보이지 않음) |
| `<body>` | 화면에 실제로 보이는 내용 |

> Next.js에서는 이 구조를 직접 작성하지 않는다. `app/layout.js`가 이 역할을 대신한다. 하지만 HTML의 기본 구조를 이해해야 AI가 생성한 마크업을 검증할 수 있다.

### 3.1.2 메타 태그와 SEO 기초

`<head>` 안의 메타 태그는 브라우저와 검색 엔진에게 문서 정보를 전달한다:

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="웹 프로그래밍 게시판" />
```

**표 3.2** 주요 메타 태그

| 메타 태그 | 역할 |
|-----------|------|
| `charset="UTF-8"` | 한글 등 다국어 문자 지원 |
| `viewport` | 모바일 화면 크기에 맞춰 표시 |
| `description` | 검색 결과에 나타나는 설명 문구 |

Next.js에서는 `metadata` 객체로 이를 설정한다. 12장에서 자세히 다룬다.

---

## 3.2 시맨틱 태그의 의미와 활용

### 3.2.1 div vs 시맨틱 태그

**시맨틱 태그**(Semantic Tag)는 "의미가 있는" 태그이다. `<div>`는 "구역"이라는 뜻밖에 없지만, `<header>`는 "머리글 영역"이라는 의미를 가진다.

왜 시맨틱 태그를 쓰는가:
- **검색 엔진**이 페이지 구조를 이해한다 (SEO 향상)
- **스크린 리더**가 시각 장애인에게 구조를 설명할 수 있다 (접근성)
- **AI가 코드를 더 정확하게 생성**한다 (시맨틱 태그를 쓰면 의도가 명확)

> **강의 팁**: "시맨틱 태그를 쓰면 3가지가 좋아진다"를 강조. 특히 세 번째(AI 생성 품질 향상)가 학생들의 관심을 끈다.

### 3.2.2 주요 시맨틱 태그 — 게시판 구조로 설명

**표 3.3** 시맨틱 태그와 용도

| 태그 | 용도 | 게시판 예시 |
|------|------|-----------|
| `<header>` | 페이지/섹션의 머리글 | 사이트 제목, 로고 |
| `<nav>` | 내비게이션 링크 | 메뉴 바 |
| `<main>` | 페이지의 핵심 콘텐츠 (하나만) | 게시글 목록 |
| `<section>` | 주제별 콘텐츠 구역 | 최신 글, 인기 글 |
| `<article>` | 독립적인 콘텐츠 단위 | 게시글 하나 |
| `<aside>` | 보조 콘텐츠 | 사이드바 |
| `<footer>` | 바닥글 | 저작권, 연락처 |

게시판 페이지의 구조를 시맨틱 태그로 표현하면:

```
┌─────────────────────────┐
│ <header>                │
│   <nav> 메뉴 </nav>     │
├─────────────────────────┤
│ <main>                  │
│   <section>             │
│     <article> 글1 </article> │
│     <article> 글2 </article> │
│   </section>            │
├─────────────────────────┤
│ <footer> © 2026 </footer>│
└─────────────────────────┘
```

```html
<header>
  <nav>게시판 | 로그인</nav>
</header>
<main>
  <section>
    <article>게시글 1</article>
    <article>게시글 2</article>
  </section>
</main>
<footer>© 2026 웹프로그래밍</footer>
```

### 3.2.3 올바른 heading 계층 구조

heading 태그(`<h1>` ~ `<h6>`)는 제목의 계층을 나타낸다. **`<h1>`은 페이지당 하나**만 사용하고, 순서를 건너뛰지 않는다:

```html
<!-- 올바른 구조 -->
<h1>게시판</h1>
  <h2>최신 글</h2>
    <h3>게시글 제목</h3>
  <h2>인기 글</h2>

<!-- 잘못된 구조 — h2를 건너뛰고 h3를 사용 -->
<h1>게시판</h1>
  <h3>최신 글</h3>
```

> AI가 heading 계층을 무시하고 코드를 생성하는 경우가 있다. h1 → h2 → h3 순서가 맞는지 반드시 확인한다.

---

## 3.3 폼 요소와 접근성

게시판에는 반드시 폼(입력 양식)이 필요하다. 게시글 작성, 검색, 로그인 등 사용자 입력을 받는 모든 곳에서 폼을 사용한다.

### 3.3.1 input, select, textarea

**표 3.4** 폼 요소 종류

| 요소 | 용도 | 예시 |
|------|------|------|
| `<input type="text">` | 한 줄 텍스트 | 제목, 이름 |
| `<input type="email">` | 이메일 | 이메일 주소 |
| `<input type="password">` | 비밀번호 | 비밀번호 입력 |
| `<textarea>` | 여러 줄 텍스트 | 게시글 본문 |
| `<select>` | 드롭다운 선택 | 카테고리 선택 |
| `<button>` | 버튼 | 제출, 취소 |

```html
<form>
  <input type="text" placeholder="제목을 입력하세요" />
  <textarea placeholder="내용을 입력하세요"></textarea>
  <button type="submit">작성</button>
</form>
```

### 3.3.2 label과 접근성

모든 입력 요소에는 **`<label>`을 연결**해야 한다. `<label>`이 없으면 스크린 리더 사용자가 이 입력칸이 무엇인지 알 수 없다. 또한 label을 클릭하면 해당 input에 자동으로 포커스가 이동하여 사용성도 향상된다.

```html
<!-- 올바른 방법: label의 htmlFor와 input의 id를 연결 -->
<label htmlFor="title">제목</label>
<input id="title" type="text" />

<!-- 올바른 방법: label로 input을 감싸기 -->
<label>
  제목
  <input type="text" />
</label>
```

> Next.js(JSX)에서는 `for` 대신 `htmlFor`를 사용한다. AI가 `for`로 생성하면 수정한다.

### 3.3.3 AI가 자주 틀리는 HTML 패턴

**표 3.5** AI가 자주 틀리는 HTML 패턴

| AI 실수 | 올바른 코드 |
|---------|-----------|
| heading 계층 무시 (h1 → h3) | h1 → h2 → h3 순서 유지 |
| label 없는 input | 반드시 label 연결 |
| JSX에서 `for` 사용 | `htmlFor` 사용 |
| JSX에서 `class` 사용 | `className` 사용 |
| `<img>` 닫기 태그 없음 | `<img />` 셀프 클로징 |

> **강의 팁**: 이 표를 슬라이드로 보여주고, "Copilot이 이 실수를 하면 바로 잡을 수 있어야 한다"고 강조한다. 3교시 과제에서 체크리스트로 활용.

---

# ― 쉬는시간 ―

---

# 2교시: Tailwind CSS 이론 + 시연

## 3.4 CSS의 변화와 Tailwind CSS

### 3.4.1 CSS는 어떻게 발전해왔는가

웹 초창기에는 HTML 태그에 직접 `style` 속성을 붙이거나, 별도의 `.css` 파일에 스타일을 작성했다. 프로젝트가 커지면서 CSS 관리가 점점 어려워졌고, 이를 해결하기 위해 다양한 방식이 등장했다.

**표 3.6** CSS 발전 흐름

| 시대 | 방식 | 특징 | 한계 |
|------|------|------|------|
| 초기 | 인라인 style / 별도 .css | HTML과 스타일 분리 | 파일이 늘수록 관리 복잡, 클래스 이름 충돌 |
| 2010년대 초 | **Sass**, **Less** (전처리기) | 변수, 중첩, 믹스인 지원 | 빌드 도구 필요, 네이밍 문제는 여전 |
| 2010년대 중 | **CSS Modules**, **styled-components** (CSS-in-JS) | 컴포넌트 단위로 스타일 격리 | 번들 크기 증가, 런타임 성능 비용 |
| 2020년대 | **Tailwind CSS** (유틸리티 퍼스트) | 미리 정의된 클래스를 조합 | **현재 주류** — AI 코드 생성과 궁합이 좋음 |

AI가 코드를 생성할 때, Sass나 styled-components 방식으로 만들어 주는 경우가 있다. 이 수업에서는 **Tailwind CSS만 사용**하므로, 다른 방식이 나오면 수정 지시하거나 copilot-instructions.md에 금지 규칙을 추가한다.

> **강의 팁**: "AI가 styled-components나 CSS Modules로 코드를 생성하면 틀린 것이다"라고 명확히 안내. copilot-instructions.md에 이미 `CSS Modules, styled-components 사용 금지` 규칙이 있음을 상기.

<!-- COPILOT_VERIFY: Copilot에게 "카드 컴포넌트를 스타일링해줘"라고 요청했을 때 Tailwind vs 다른 방식 중 어떤 것으로 생성하는지 확인. copilot-instructions.md 적용 전/후 차이 캡처 -->

### 3.4.2 유틸리티 퍼스트 CSS란

전통적인 CSS는 별도의 `.css` 파일에 스타일을 정의했다:

```css
/* 전통 CSS */
.card {
  padding: 16px;
  background-color: white;
  border-radius: 8px;
}
```

**Tailwind CSS**는 다르다. 미리 정의된 **유틸리티 클래스**를 HTML에 직접 붙인다:

```html
<!-- Tailwind CSS -->
<div class="p-4 bg-white rounded-lg">카드 내용</div>
```

`p-4`가 `padding: 16px`, `bg-white`가 `background-color: white`, `rounded-lg`가 `border-radius: 8px`이다.

**왜 Tailwind를 쓰는가**:
- CSS 파일을 따로 관리할 필요가 없다
- 클래스 이름을 고민할 필요가 없다 (`card`, `card-wrapper`, `card-container` 같은 네이밍 고민 없음)
- **AI가 Tailwind 코드를 매우 잘 생성한다** — 클래스명이 규칙적이기 때문
- 반응형 디자인을 쉽게 적용할 수 있다

### 3.4.3 Tailwind 클래스 읽는 법

> **강의 팁**: VS Code를 화면 공유하며 라이브 시연. 클래스를 하나씩 추가하면서 브라우저 변화를 보여준다.

Tailwind 클래스는 **`속성-값`** 패턴으로 구성된다:

**표 3.7** Tailwind 클래스 읽는 법

| 클래스 | 의미 | CSS 변환 |
|--------|------|---------|
| `p-4` | padding 4단위 (16px) | `padding: 1rem` |
| `px-6` | 좌우 padding 6단위 | `padding-left: 1.5rem; padding-right: 1.5rem` |
| `mt-2` | 위쪽 margin 2단위 | `margin-top: 0.5rem` |
| `text-lg` | 큰 텍스트 | `font-size: 1.125rem` |
| `font-bold` | 굵은 글씨 | `font-weight: 700` |
| `bg-blue-500` | 파란색 배경 | `background-color: #3b82f6` |
| `text-gray-600` | 회색 텍스트 | `color: #4b5563` |
| `rounded-lg` | 둥근 모서리 | `border-radius: 0.5rem` |
| `shadow-md` | 중간 그림자 | `box-shadow: ...` |
| `w-full` | 너비 100% | `width: 100%` |
| `h-screen` | 높이 화면 전체 | `height: 100vh` |

**접두어 규칙**:
- `p` = padding, `m` = margin
- `x` = 좌우, `y` = 상하, `t` = top, `b` = bottom, `l` = left, `r` = right

**숫자 체계**: 4px 단위
- `1` = 4px, `2` = 8px, `4` = 16px, `8` = 32px

**색상 체계**: `{색상}-{단계}` 형태. 단계는 50(연함)부터 950(진함)까지:

```
bg-blue-50   ← 아주 연한 파란색
bg-blue-500  ← 기본 파란색
bg-blue-900  ← 아주 진한 파란색
```

주요 색상: `gray`, `red`, `blue`, `green`, `yellow`, `purple`, `white`, `black`

**타이포그래피**:

| 클래스 | 크기 |
|--------|------|
| `text-xs` | 아주 작은 |
| `text-sm` | 작은 |
| `text-base` | 기본 (16px) |
| `text-lg` | 큰 |
| `text-xl` ~ `text-9xl` | 매우 큰 |

**간격 시스템**: 4px 단위로 통일한다.

| 단위 | px | 예시 |
|:---:|:---:|------|
| 1 | 4px | `p-1`, `m-1` |
| 2 | 8px | `p-2`, `m-2` |
| 4 | 16px | `p-4`, `m-4` |
| 8 | 32px | `p-8`, `m-8` |
| 16 | 64px | `p-16` |

### 3.4.4 Tailwind CSS IntelliSense 확장

> **함께 진행**: 교수와 학생이 동시에 확장 설치

VS Code에서 **Tailwind CSS IntelliSense** 확장을 설치하면, 클래스명을 입력할 때 자동완성과 미리보기가 나타난다.

설치: VS Code 확장 탭에서 "Tailwind CSS IntelliSense" 검색 → 설치

설치 후 `class="` 또는 `className="` 안에서 타이핑하면 Tailwind 클래스 목록이 자동완성된다. 각 클래스에 마우스를 올리면 실제 CSS 값이 표시된다.

<!-- COPILOT_VERIFY: Tailwind CSS IntelliSense 설치 후 자동완성 동작 화면 캡처 -->

---

## 3.5 레이아웃과 반응형

### 3.5.1 Flexbox: flex, justify, items, gap

> **라이브 코딩 시연**: 내비게이션 바를 만들면서 Flex 클래스를 하나씩 추가

**Flexbox**는 요소를 **한 줄로 배치**할 때 사용한다. 내비게이션 바, 버튼 그룹, 카드 안의 요소 정렬 등에 적합하다.

```html
<nav class="flex justify-between items-center px-6 py-4 bg-white shadow">
  <h1 class="text-xl font-bold">게시판</h1>
  <div class="flex gap-4">
    <a href="#">글 목록</a>
    <a href="#">로그인</a>
  </div>
</nav>
```

**표 3.8** Flexbox 클래스

| 클래스 | 의미 |
|--------|------|
| `flex` | Flexbox 활성화 |
| `flex-col` | 세로 방향 정렬 |
| `justify-between` | 양쪽 끝 정렬 |
| `justify-center` | 가운데 정렬 |
| `items-center` | 수직 가운데 정렬 |
| `gap-4` | 요소 간 간격 16px |

> **강의 팁**: `flex` 하나만 먼저 추가하여 가로 배치를 보여주고, `justify-between`, `items-center`, `gap-4`를 하나씩 추가하며 변화를 시연. 학생들이 각 클래스의 효과를 직접 눈으로 확인.

### 3.5.2 Grid: grid, grid-cols, col-span

**Grid**는 요소를 **격자 형태로 배치**할 때 사용한다. 카드 리스트, 대시보드 레이아웃 등에 적합하다.

```html
<div class="grid grid-cols-2 gap-4">
  <div class="bg-white p-4 rounded-lg shadow">카드 1</div>
  <div class="bg-white p-4 rounded-lg shadow">카드 2</div>
</div>
```

**표 3.9** Grid 클래스

| 클래스 | 의미 |
|--------|------|
| `grid` | Grid 활성화 |
| `grid-cols-2` | 2열 |
| `grid-cols-3` | 3열 |
| `col-span-2` | 2칸 차지 |
| `gap-4` | 격자 간 간격 |

### 3.5.3 반응형 디자인: sm, md, lg 브레이크포인트

> **라이브 시연**: 브라우저 크기를 조절하며 레이아웃 변화를 보여준다. DevTools의 디바이스 모드(F12 → 디바이스 모드 토글)를 사용.

Tailwind에서 반응형 디자인은 **접두어**로 처리한다. **모바일이 기본**이고, 화면이 커질수록 스타일을 추가한다:

**표 3.10** 브레이크포인트

| 접두어 | 최소 너비 | 대상 |
|--------|----------|------|
| (없음) | 0px | 모바일 (기본) |
| `sm:` | 640px | 소형 태블릿 |
| `md:` | 768px | 태블릿 |
| `lg:` | 1024px | 데스크톱 |
| `xl:` | 1280px | 대형 화면 |

```html
<!-- 모바일: 1열, 태블릿: 2열, 데스크톱: 3열 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  ...
</div>
```

이 한 줄로 모바일, 태블릿, 데스크톱 모두에서 적절한 레이아웃을 보여준다.

### 3.5.4 실전 패턴: 내비게이션 바, 카드 리스트

**내비게이션 바** (JSX):

```jsx
<nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
  <h1 className="text-xl font-bold">게시판</h1>
  <div className="flex gap-4">
    <a href="/posts" className="text-gray-600 hover:text-blue-500">글 목록</a>
    <a href="/login" className="text-gray-600 hover:text-blue-500">로그인</a>
  </div>
</nav>
```

`hover:text-blue-500`은 마우스를 올렸을 때 파란색으로 변하는 효과이다. `hover:` 접두어로 호버 상태 스타일을 지정한다.

**게시글 카드** (JSX):

```jsx
<article className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
  <h2 className="text-lg font-bold">게시글 제목</h2>
  <p className="mt-2 text-gray-600 text-sm">게시글 내용 미리보기...</p>
  <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
    <span>홍길동</span>
    <span>2026.03.21</span>
  </div>
</article>
```

`transition`은 스타일 변경 시 부드러운 애니메이션 효과를 추가한다.

**카드 리스트** (반응형):

```jsx
<main className="max-w-4xl mx-auto p-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* 카드들이 여기에 반복 */}
  </div>
</main>
```

`max-w-4xl mx-auto`는 내용물의 최대 너비를 제한하고 가운데 정렬한다. 웹 페이지에서 매우 자주 사용하는 패턴이다.

<!-- COPILOT_VERIFY: Copilot에게 "반응형 게시글 카드 리스트를 만들어줘"라고 요청하여 실제 생성 코드가 위 패턴과 유사한지 확인 -->

---

# ― 쉬는시간 ―

---

# 3교시: 실습 + 과제 제출

## 3.6 과제: 게시판 UI 마크업 + Tailwind 스타일링 + 배포

### 과제 안내

**과제 내용**: 게시판 메인 페이지 만들기

**요구사항**:
1. 내비게이션 바: 사이트 제목 + 메뉴 링크
2. 게시글 목록: 카드 형태, 최소 3개의 더미 게시글
3. 반응형: 모바일 1열, 데스크톱 2열
4. 시맨틱 태그 사용: header, nav, main, article, footer
5. Tailwind CSS로 스타일링
6. git push → Vercel 배포

**제출물**: 배포 URL + AI 사용 로그

### 실습 진행

> **학생 자율 실습** — 교수는 순회하며 지원

**① Copilot Chat에 프롬프트 입력**

> **Copilot 프롬프트**
> "게시판 메인 페이지를 만들어줘.
> 상단에 내비게이션 바(사이트 제목 + 로그인 링크),
> 중앙에 게시글 카드 리스트(제목, 내용 미리보기, 작성자, 날짜),
> 하단에 푸터.
> Tailwind CSS 사용, 시맨틱 태그 사용,
> 모바일 1열 데스크톱 2열 반응형으로 해줘."

<!-- COPILOT_VERIFY: 위 프롬프트를 Copilot Chat에 입력하고 생성 결과를 캡처해주세요 -->

**② AI 코드 검증**

체크리스트 적용:
- [ ] 시맨틱 태그를 사용했는가? (header, nav, main, article, footer)
- [ ] heading 계층이 올바른가? (h1 → h2 순서)
- [ ] 반응형 클래스가 있는가? (`md:grid-cols-2` 등)
- [ ] `className`을 사용했는가? (`class`가 아님)
- [ ] label과 input이 올바르게 연결되어 있는가? (폼이 있는 경우)
- [ ] `htmlFor`를 사용했는가? (`for`가 아님)

**③ 커스터마이징**

게시글 내용을 본인이 원하는 주제로 변경. 색상, 레이아웃 조정. 추가 기능: hover 효과, 그림자 등.

**④ 배포**

```bash
git add .
git commit -m "과제: 게시판 UI + Tailwind 스타일링"
git push
```

**⑤ AI 사용 로그 작성**

### 과제 제출 + 마무리

- 배포 URL 제출
- 제출 확인
- **잘 만든 학생 페이지 1~2개 화면 공유** (동기부여)
- **다음 주 예고**: JavaScript 핵심 — 오늘 만든 정적 페이지에 "동작"을 추가

---

## 장 요약

- HTML은 웹 페이지의 **뼈대**이며, `<head>`는 설정, `<body>`는 화면 내용이다
- **시맨틱 태그**(`header`, `nav`, `main`, `article`, `footer`)를 사용하면 검색 엔진, 스크린 리더, AI 모두에게 유리하다
- **폼 요소**에는 반드시 `<label>`을 연결하여 접근성을 확보한다
- JSX에서는 `class` → `className`, `for` → `htmlFor`로 변환한다
- **Tailwind CSS**는 유틸리티 클래스를 HTML에 직접 적용하는 방식이다
- 클래스 읽는 법: `속성-값` 패턴 (`p-4` = padding 16px, `text-lg` = 큰 텍스트)
- **Flexbox**(`flex`)는 한 줄 배치, **Grid**(`grid`)는 격자 배치에 사용한다
- **반응형**은 접두어로 처리한다: `md:grid-cols-2`는 태블릿 이상에서 2열

---

## 교수 메모

### 준비물
- [ ] Tailwind CSS IntelliSense 확장 설치 안내 슬라이드
- [ ] 라이브 코딩용 프로젝트 (1주차에 만든 my-first-web)
- [ ] 반응형 시연용 브라우저 DevTools 디바이스 모드
- [ ] 게시판 완성 예시 (참고용)

### 수업 후 체크
- [ ] 전원 Tailwind CSS IntelliSense 설치 확인
- [ ] 전원 게시판 UI 배포 URL 제출 확인
- [ ] AI 코드 검증 체크리스트 활용 여부 확인 (로그에서)
- [ ] 미제출자 파악 및 개별 안내

---

## 다음 장 예고

다음 장에서는 **JavaScript 핵심**을 배운다. 변수, 함수, 배열, 비동기 프로그래밍 등 웹 개발에 필요한 JavaScript 기본기를 익히고, 오늘 만든 정적 게시판에 동적 기능을 추가하는 실습을 진행한다.

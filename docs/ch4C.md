# Chapter 4. JavaScript 핵심 — C: 모범 구현 + 해설

> B회차 과제 제출 후 공개

---

## 모범 구현 코드 해설

_전체 프로젝트는 practice/chapter4/complete/ 참고_

### 전체 구조

```
practice/chapter4/complete/
├── app/
│   ├── layout.js       ← 공통 레이아웃 (Tailwind 설정)
│   ├── page.js         ← API 연동 + 필터/검색 (모범 구현)
│   └── globals.css     ← Tailwind 기본 import
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

---

### page.js 핵심 포인트

#### 1. "use client" 지시어

```jsx
"use client";
```

**왜 이렇게 했는가**: `useState`, `useEffect`, `onChange`, `onClick` 등 브라우저 측 상호작용이 필요하므로 클라이언트 컴포넌트로 선언해야 한다. Next.js App Router에서 컴포넌트는 기본적으로 서버 컴포넌트이므로, 이 지시어가 없으면 `useState is not defined` 에러가 발생한다.

#### 2. 상태 관리 구조

```jsx
const [posts, setPosts] = useState([]);           // 전체 게시글
const [filteredPosts, setFilteredPosts] = useState([]); // 필터 결과
const [selectedUser, setSelectedUser] = useState(null);  // 선택된 userId
const [searchTerm, setSearchTerm] = useState("");        // 검색 키워드
const [loading, setLoading] = useState(true);            // 로딩 상태
const [error, setError] = useState(null);                // 에러 상태
```

**왜 이렇게 했는가**: 원본 데이터(`posts`)와 표시용 데이터(`filteredPosts`)를 분리했다. 필터/검색 조건이 바뀌면 원본에서 다시 걸러내는 방식이다. 원본을 직접 수정하면 "전체 보기"로 되돌릴 수 없다.

> **강의 팁**: "왜 상태를 이렇게 많이 나누었는가?" 질문이 나올 수 있다. 각 상태가 독립적인 역할을 한다는 점을 설명한다 — posts는 API 원본, filteredPosts는 화면 표시용, selectedUser와 searchTerm은 필터 조건.

#### 3. fetch 패턴 (async/await + 에러 처리)

```jsx
useEffect(() => {
  async function fetchPosts() {
    try {
      setLoading(true);
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!response.ok) {
        throw new Error(`HTTP 에러: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  fetchPosts();
}, []);
```

**확인 포인트**:
- `async/await` 패턴 사용 (`.then()` 아님)
- `response.ok` 체크로 HTTP 에러 처리
- `try-catch`로 네트워크 에러 처리
- `finally`로 로딩 상태 해제 (성공/실패 무관)
- `useEffect`의 의존성 배열 `[]` — 컴포넌트 마운트 시 1회만 실행

#### 4. 필터 + 검색 로직

```jsx
useEffect(() => {
  let result = posts;

  // userId 필터 적용
  if (selectedUser !== null) {
    result = result.filter(post => post.userId === selectedUser);
  }

  // 검색어 필터 적용
  if (searchTerm.trim() !== "") {
    result = result.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  setFilteredPosts(result);
}, [posts, selectedUser, searchTerm]);
```

**확인 포인트**:
- `filter` 메서드로 조건에 맞는 게시글만 추출
- 필터와 검색이 **동시 적용** 가능 (두 조건을 순차적으로 적용)
- `toLowerCase()`로 대소문자 무관 검색
- `trim()`으로 공백만 입력된 경우 처리
- `useEffect` 의존성 배열에 `[posts, selectedUser, searchTerm]` — 세 값 중 하나라도 바뀌면 재필터링

#### 5. JSX에서 map 활용

```jsx
{filteredPosts.slice(0, 20).map((post) => (
  <article key={post.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
        User {post.userId}
      </span>
    </div>
    <h3 className="text-lg font-bold mb-2">{post.title}</h3>
    <p className="text-gray-600 text-sm">{post.body}</p>
  </article>
))}
```

**확인 포인트**:
- `key={post.id}` — map에서 key prop 필수
- `slice(0, 20)` — 100개 게시글 중 20개만 표시 (성능 고려)
- JSONPlaceholder의 필드명은 `body`이다 (`content`가 아님)

---

## 채점 기준 참고

**표 4C.1** 채점 기준

| 항목 | 배점 | 기준 |
|------|------|------|
| 배포 URL 동작 | 7점 | 페이지가 정상적으로 렌더링되고 API 데이터가 표시되는가 |
| AI 검증 서술 | 3점 | AI가 틀린 부분을 구체적으로 설명했는가 |

**URL 동작 (7점)** 세부:
- 페이지가 에러 없이 렌더링되고 API 데이터가 표시된다 (3점)
- 필터 버튼이 동작한다 — userId별 게시글 필터링 (2점)
- 검색 기능이 동작한다 — 키워드로 제목 검색 (2점)

**AI 검증 서술 (3점)** 세부:
- AI가 틀린 부분을 1개 이상 구체적으로 지적했다 (2점)
- 어떻게 수정했는지 설명했다 (1점)

---

## 우수 구현 사례

### 사례 1: 로딩 스피너 + 에러 메시지

```jsx
if (loading) {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
    </div>
  );
}

if (error) {
  return (
    <div className="text-center py-10">
      <p className="text-red-500">데이터를 불러오지 못했습니다: {error}</p>
    </div>
  );
}
```

로딩 중과 에러 상태를 별도로 처리하여 사용자 경험을 개선한 사례. Ch12에서 더 세련된 에러 UI를 배운다.

### 사례 2: 결과 개수 표시 + "결과 없음" 처리

```jsx
<p className="text-sm text-gray-500 mb-4">
  {filteredPosts.length}개의 게시글
</p>

{filteredPosts.length === 0 && (
  <p className="text-center text-gray-400 py-8">
    검색 결과가 없습니다.
  </p>
)}
```

필터/검색 결과가 없을 때 빈 화면이 아닌 안내 메시지를 표시한 사례. 작은 UX 개선이지만 완성도가 높아진다.

---

## 자주 하는 실수 정리

**표 4C.2** 학생들이 자주 하는 실수

| 실수 | 증상 | 해결 |
|------|------|------|
| `"use client"` 누락 | `useState is not defined` 에러 | 파일 맨 위에 `"use client"` 추가 |
| `.then()` 체이닝 사용 | 동작은 하지만 프로젝트 규칙 위반 | `async/await`로 변환 |
| `response.ok` 미확인 | 404 에러를 정상으로 처리 | `if (!response.ok)` 추가 |
| `post.content` 사용 | undefined 표시 | JSONPlaceholder 필드명은 `post.body` |
| `key` prop 누락 | 콘솔에 경고 | `map()` 안의 최상위 요소에 `key={post.id}` 추가 |
| `var` 사용 | 동작은 하지만 규칙 위반 | `const` 또는 `let`으로 변경 |
| 필터 시 원본 배열 직접 수정 | "전체 보기" 복구 불가 | 원본(`posts`)과 표시용(`filteredPosts`) 분리 |
| `===` 대신 `==` 사용 | 타입 변환으로 예상치 못한 동작 | 엄격 비교 `===` 사용 |

---

## 다음 장 연결

이번 장에서 배운 JavaScript 핵심(변수, 함수, 배열 메서드, async/await, 모듈)은 Ch5(Next.js 기초) 이후 모든 장에서 사용된다:

- **Ch5**: `map()`으로 블로그 글 목록 렌더링, `find()`로 상세 페이지 데이터 조회
- **Ch6**: `useState`(배열 구조 분해), `useEffect`(비동기 데이터 페칭)
- **Ch8**: `async/await`로 Supabase 데이터 CRUD
- **Ch10**: `filter()`와 `map()`으로 쿼리 결과 처리

특히 `async/await` + `try-catch` 패턴은 Supabase 연동에서 거의 동일하게 사용되므로, 이 패턴에 익숙해져야 한다.

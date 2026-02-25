# Chapter 10. Supabase Database CRUD — C: 모범 구현 + 해설

> B회차 과제 제출 후 공개

---

## 모범 구현 코드 해설

_전체 프로젝트는 practice/chapter10/complete/ 참고_

### 전체 구조

```
practice/chapter10/complete/
├── app/
│   ├── layout.js          ← AuthProvider 포함
│   ├── page.js            ← 메인: PostList 연결
│   ├── globals.css
│   └── posts/
│       ├── new/page.js    ← 게시글 작성
│       └── [id]/
│           ├── page.js    ← 게시글 상세 + 삭제
│           └── edit/page.js ← 게시글 수정
├── components/
│   ├── Navbar.js          ← 내비게이션 (인증 UI)
│   ├── PostList.js        ← 게시글 목록 (select)
│   └── PostForm.js        ← 게시글 작성 (insert)
├── contexts/
│   └── AuthContext.js     ← 인증 상태
├── lib/
│   └── supabase.js        ← Supabase 클라이언트
├── package.json
├── tailwind.config.js
└── next.config.js
```

---

### PostList.js 핵심 포인트

#### 1. 관계 데이터 조회

```javascript
const { data, error } = await supabase
  .from("posts")
  .select("*, profiles(username)")
  .order("created_at", { ascending: false });
```

**왜 이렇게 했는가**: `profiles(username)`으로 작성자 이름을 한 번의 쿼리로 가져온다. SQL의 `JOIN`과 같은 결과이지만, Supabase 클라이언트의 외래 키 기반 문법이 훨씬 간결하다. 별도의 쿼리를 두 번 보낼 필요가 없다.

#### 2. 옵셔널 체이닝

```jsx
{post.profiles?.username}
```

`profiles`가 `null`일 수 있다. 외래 키로 연결된 사용자가 탈퇴했거나 프로필이 아직 생성되지 않은 경우이다. `?.`를 빠뜨리면 "Cannot read properties of null" 에러가 발생한다.

> **강의 팁**: 학생 중 일부는 `post.profiles.username`으로 작성하여 에러가 나는 경우가 있다. "왜 `?.`가 필요한가?"를 질문으로 던지면 좋다.

---

### PostForm.js 핵심 포인트

#### 1. insert에 user_id 포함

```javascript
const { error } = await supabase
  .from("posts")
  .insert({
    title: title.trim(),
    content: content.trim(),
    user_id: user.id,  // ← useAuth()에서 가져온 사용자 ID
  });
```

**확인 포인트**:
- `user.id`를 하드코딩하지 않고 `useAuth()` Hook에서 가져온다
- `title.trim()`으로 앞뒤 공백을 제거한다
- `created_at`은 DB의 `default now()`에 맡긴다 -- 클라이언트에서 시간을 설정하면 안 된다

#### 2. 작성 후 목록으로 이동

```javascript
if (error) {
  alert("작성 실패: " + error.message);
} else {
  router.push("/");  // 목록으로 이동
}
```

에러가 없으면 `router.push("/")`로 메인 페이지로 이동한다. 이동하면 PostList의 `useEffect`가 다시 실행되어 새 게시글이 표시된다.

---

### 게시글 상세 페이지 핵심 포인트

#### 1. 단일 게시글 조회

```javascript
const { data, error } = await supabase
  .from("posts")
  .select("*, profiles(username)")
  .eq("id", id)
  .single();
```

`.single()`은 결과를 배열이 아닌 **단일 객체**로 반환한다. 게시글 상세 페이지에서는 항상 1개의 게시글만 필요하므로 `.single()`을 사용한다.

#### 2. 본인 글 확인 + 조건부 렌더링

```javascript
const isAuthor = user && user.id === post.user_id;
```

`user`가 `null`(비로그인)이면 `false`, 로그인했지만 작성자가 아니면 `false`. 본인 글일 때만 `true`가 된다.

> 이것은 **UI 레벨 접근 제어**이다. Ch11에서 RLS를 적용하기 전까지, 브라우저 콘솔에서 직접 API를 호출하면 다른 사람의 글도 수정/삭제할 수 있다.

#### 3. 삭제 확인 대화상자

```javascript
async function handleDelete() {
  if (!confirm("정말 삭제하시겠습니까?")) return;
  // ...삭제 로직
}
```

실수로 삭제를 방지하기 위해 `confirm()` 대화상자를 반드시 넣는다.

---

### 수정 페이지 핵심 포인트

#### 1. 기존 데이터 불러오기

```javascript
const { data, error } = await supabase
  .from("posts")
  .select("*")
  .eq("id", id)
  .single();

if (!error && data) {
  setTitle(data.title);
  setContent(data.content);
}
```

수정 폼을 열면 기존 게시글의 제목과 내용이 채워져 있어야 한다. 조회 후 `setTitle`, `setContent`로 상태에 설정한다.

#### 2. update에 반드시 .eq() 포함

```javascript
const { error } = await supabase
  .from("posts")
  .update({ title: title.trim(), content: content.trim() })
  .eq("id", id);
```

`.eq("id", id)` 없이 `.update()`를 실행하면 **테이블의 모든 행이 수정된다**. 이것은 가장 위험한 실수이므로 반드시 조건을 확인한다.

---

## 채점 기준 참고

**표 10C.1** 채점 기준

| 항목 | 배점 | 기준 |
|------|------|------|
| 배포 URL 동작 | 7점 | CRUD가 정상적으로 동작하는가 |
| AI 검증 서술 | 3점 | AI가 틀린 부분을 구체적으로 설명했는가 |

**URL 동작 (7점)** 세부:
- 게시글 목록이 표시된다 (2점)
- 게시글 작성이 동작한다 (2점)
- 게시글 수정/삭제가 동작한다 (2점)
- 작성자 이름이 표시된다 (1점)

**AI 검증 서술 (3점)** 세부:
- AI가 틀린 부분을 1개 이상 구체적으로 지적했다 (2점)
- 어떻게 수정했는지 설명했다 (1점)

---

## 우수 구현 사례

### 사례 1: 검색 기능 추가

```jsx
// 검색어로 게시글 필터링
const [searchKeyword, setSearchKeyword] = useState("");

async function handleSearch() {
  const supabase = createClient();
  const { data } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .ilike("title", `%${searchKeyword}%`)
    .order("created_at", { ascending: false });
  setPosts(data);
}
```

A회차에서 배운 `.ilike()` 필터를 활용하여 제목 검색 기능을 추가한 사례. 과제 요구사항을 넘어서는 기능이지만, 쿼리 심화를 잘 활용했다.

### 사례 2: 게시글 목록에 페이지네이션 추가

```jsx
const PAGE_SIZE = 5;
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

async function fetchPosts() {
  const supabase = createClient();
  const { data, count } = await supabase
    .from("posts")
    .select("*, profiles(username)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  setPosts(data);
  setTotalPages(Math.ceil(count / PAGE_SIZE));
}
```

`.range()`와 `{ count: "exact" }`를 활용한 페이지네이션. 게시글이 많아졌을 때 성능을 고려한 구현이다.

---

## 자주 하는 실수 정리

**표 10C.2** 학생들이 자주 하는 실수

| 실수 | 증상 | 해결 |
|------|------|------|
| `npm install` 누락 | `Module not found` 에러 | 스타터 폴더에서 `npm install` 실행 |
| `.eq()` 없이 update | 모든 게시글 제목이 바뀜 | `.update({...}).eq("id", id)` 추가 |
| `.eq()` 없이 delete | 모든 게시글이 삭제됨 | `.delete().eq("id", id)` 추가 |
| `profiles(username)` 오타 | 작성자 이름이 null | Supabase 대시보드에서 외래 키 확인 |
| `post.profiles.username` | "Cannot read properties of null" | `post.profiles?.username`으로 수정 |
| insert에 `user_id` 누락 | RLS 적용 후 INSERT 실패 | `user_id: user.id` 반드시 포함 |
| `.single()` 빠뜨림 | 데이터가 배열로 반환됨 | 단일 조회 시 `.single()` 추가 |
| 수정 페이지에서 기존 데이터 미로딩 | 폼이 빈 상태로 표시 | `useEffect`에서 조회 후 `setState` |

---

## 다음 장 연결

게시판 CRUD가 완성되었지만, **보안 구멍**이 있다. 브라우저 개발자 도구에서 API를 직접 호출하면 다른 사람의 글도 수정하거나 삭제할 수 있다. Ch11에서는 **RLS(Row Level Security)**를 적용하여, 데이터베이스가 스스로 "내 글은 나만 수정/삭제할 수 있다"를 강제하게 만든다.

UI에서 수정/삭제 버튼을 숨기는 것은 **UX 개선**이지 **보안이 아니다**. 진짜 보안은 서버(데이터베이스) 레벨에서 처리해야 한다. 이것이 Ch11 RLS의 핵심 주제이다.

# 2-3 버전 명시 프롬프트 템플릿

## 기본 프롬프트 템플릿

```
## 프로젝트 환경
- React: 18.2.x
- Supabase JS: v2.x
- Next.js: 14.x (App Router)
- Node.js: 18.x

## 코딩 규칙
- 함수형 컴포넌트만 사용
- async/await 패턴 사용 (then 체이닝 금지)
- 한국어 주석 사용

## 금지 사항
- class 컴포넌트 사용 금지
- var 키워드 사용 금지
- any 타입 사용 금지

## 요청
[여기에 구체적인 요청 내용 작성]
```

---

## package.json 기반 프롬프트

```
다음은 내 프로젝트의 package.json입니다:

{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@supabase/supabase-js": "^2.39.0",
    "next": "^14.0.0"
  }
}

위 버전에 맞는 코드로 다음을 구현해주세요:
[구체적인 요청 내용]
```

---

## 특정 기능 구현 프롬프트

### Supabase 인증 구현

```
## 환경
- Supabase JS v2.39.0
- React 18.2.0

## 요청
Supabase v2의 signInWithOAuth를 사용해서
Google 로그인 기능을 구현해주세요.

## 요구사항
- 에러 처리 포함
- 로딩 상태 관리
- 로그인 성공 시 /dashboard로 리다이렉트
```

### React 컴포넌트 구현

```
## 환경
- React 18.2.0
- 함수형 컴포넌트 + Hooks

## 요청
사용자 목록을 보여주는 UserList 컴포넌트를 만들어주세요.

## 요구사항
- useState, useEffect 사용
- 로딩, 에러, 빈 목록 상태 처리
- PropTypes 또는 TypeScript 타입 정의
```

---

## 잘못된 프롬프트 예시

### ❌ 나쁜 예시 1: 버전 미명시
```
React로 로그인 폼 만들어줘
```
→ AI가 React 17 문법을 사용할 수 있음

### ❌ 나쁜 예시 2: 모호한 요청
```
Supabase 인증 코드 줘
```
→ AI가 v1 API를 사용할 수 있음

### ✅ 좋은 예시
```
React 18.2와 Supabase JS v2를 사용합니다.
signInWithPassword 메서드로 이메일/비밀번호 로그인을 구현해주세요.
에러 처리와 로딩 상태도 포함해주세요.
```

---

## 체크리스트

프롬프트 작성 시 확인:
- [ ] 사용 중인 라이브러리 버전을 명시했는가?
- [ ] 코딩 컨벤션을 명시했는가?
- [ ] 금지 사항을 명시했는가?
- [ ] 요청이 구체적인가?
- [ ] 예상 결과물을 명시했는가?

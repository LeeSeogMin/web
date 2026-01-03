# Copilot Instructions Template

> 이 파일을 프로젝트의 `.github/copilot-instructions.md`에 복사하여 사용하세요.

---

```markdown
# Project Context for GitHub Copilot

## Tech Stack (버전 고정)
- React 18.2.x (함수형 컴포넌트, Hooks)
- React Router 6.x
- Supabase JS v2.x
- Vite 5.x
- Node.js 18.x

## Project Structure
```
src/
├── components/    # 재사용 컴포넌트
├── pages/         # 페이지 컴포넌트
├── hooks/         # 커스텀 훅
├── lib/           # 유틸리티, 설정
│   └── supabase.js  # Supabase 클라이언트
├── styles/        # CSS 파일
└── App.jsx        # 메인 앱
```

## Coding Conventions

### 컴포넌트 작성
- 함수형 컴포넌트만 사용 (class 컴포넌트 금지)
- 컴포넌트 파일명: PascalCase (예: UserProfile.jsx)
- 한 파일에 하나의 컴포넌트만 export

### 상태 관리
- useState, useReducer 사용
- 전역 상태는 Context API 사용
- 외부 상태 라이브러리 미사용

### 비동기 처리
- async/await 패턴 사용 (then 체이닝 금지)
- try-catch로 에러 처리
- 로딩 상태 관리 필수

### Supabase 사용
- 클라이언트는 src/lib/supabase.js에서 import
- 컴포넌트 내부에서 createClient 호출 금지
- RLS 정책 활용 (클라이언트 사이드 권한 체크 금지)

## Naming Conventions
- 변수/함수: camelCase
- 컴포넌트: PascalCase
- 상수: UPPER_SNAKE_CASE
- 이벤트 핸들러: handle + 동작 (예: handleSubmit)

## 금지 사항
- var 키워드 사용 금지
- any 타입 사용 금지 (TypeScript 시)
- console.log는 개발 중에만 (배포 전 제거)
- 인라인 스타일 최소화

## 선호 패턴

### 컴포넌트 구조
```jsx
// imports
import { useState, useEffect } from 'react';

// component
export default function ComponentName({ prop1, prop2 }) {
  // state
  const [state, setState] = useState(null);

  // effects
  useEffect(() => {
    // effect logic
  }, [dependencies]);

  // handlers
  const handleAction = () => {
    // handler logic
  };

  // render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### 에러 처리
```jsx
try {
  const { data, error } = await supabase.from('table').select();
  if (error) throw error;
  // success logic
} catch (error) {
  console.error('Error:', error.message);
  setError(error.message);
}
```

## 주석 스타일
- 한국어 주석 사용
- 복잡한 로직에만 주석 추가
- JSDoc 스타일 함수 문서화
```

---

## 사용 방법

1. 위 템플릿을 복사합니다.
2. 프로젝트 루트에 `.github` 폴더를 만듭니다.
3. `.github/copilot-instructions.md` 파일을 생성합니다.
4. 템플릿을 붙여넣고 프로젝트에 맞게 수정합니다.
5. VS Code를 재시작하면 Copilot이 이 파일을 참조합니다.

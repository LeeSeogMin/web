# 부록 D. GitHub Copilot 설정 가이드

이 부록에서는 VS Code에서 GitHub Copilot을 설정하고 효과적으로 활용하는 방법을 안내한다.

---

## D.1 GitHub 학생 계정 신청

GitHub Copilot은 유료 서비스지만, 학생은 무료로 사용할 수 있다.

### 신청 방법

1. [education.github.com](https://education.github.com) 접속
2. "Get benefits" 클릭
3. GitHub 계정으로 로그인 (없으면 생성)
4. 학생 인증 진행:
   - 학교 이메일 주소 입력
   - 학생증 또는 재학증명서 업로드
   - 학교명 및 졸업 예정 연도 입력
5. 승인 대기 (보통 수일 내)

### 승인 확인

1. [github.com/settings/copilot](https://github.com/settings/copilot) 접속
2. "GitHub Copilot" 활성화 상태 확인
3. "Enable GitHub Copilot" 클릭

---

## D.2 VS Code 확장 설치

### 확장 설치

1. VS Code 열기
2. 확장(Extensions) 패널 열기 (Ctrl+Shift+X)
3. "GitHub Copilot" 검색
4. **GitHub Copilot** 확장 설치
5. **GitHub Copilot Chat** 확장 설치 (선택, 권장)

### GitHub 로그인

1. VS Code 왼쪽 하단 계정 아이콘 클릭
2. "Sign in to use GitHub Copilot"
3. 브라우저에서 GitHub 로그인 및 권한 승인
4. VS Code로 돌아와 연결 확인

### 활성화 확인

- 상태 바에 Copilot 아이콘 표시
- 코드 작성 시 회색 제안 텍스트 표시

---

## D.3 copilot-instructions.md 템플릿

프로젝트 루트에 `.github/copilot-instructions.md` 파일을 생성하면 Copilot이 프로젝트 컨텍스트를 이해한다.

### 템플릿

```markdown
# Copilot Instructions

## Project Overview
React 18 + Supabase 기반 게시판 애플리케이션

## Tech Stack (버전 고정)
- React 18.2.x
- React Router 6.x
- @supabase/supabase-js 2.x
- Vite 5.x

## Coding Conventions

### Components
- 함수형 컴포넌트만 사용
- Props는 구조 분해 할당
- 파일명은 PascalCase (예: PostList.jsx)

### State Management
- useState, useContext 사용
- 복잡한 상태는 useReducer
- 외부 상태 관리 라이브러리 사용 금지

### Async
- async/await 패턴 사용
- then 체이닝 금지
- try-catch로 에러 처리

### Supabase
- 클라이언트는 src/lib/supabase.js에서 import
- createClient를 컴포넌트 내부에서 호출 금지
- 쿼리 결과는 반드시 error 체크

## File Structure
```
src/
├── components/     # 재사용 컴포넌트
├── pages/          # 페이지 컴포넌트
├── contexts/       # React Context
├── hooks/          # 커스텀 훅
├── lib/            # 외부 라이브러리 설정
│   └── supabase.js
├── styles/         # CSS 파일
└── utils/          # 유틸리티 함수
```

## 금지 사항
- class 컴포넌트 사용 금지
- any 타입 사용 금지 (TypeScript 사용 시)
- console.log 커밋 금지
- 하드코딩된 API 키 금지

## Examples

### Supabase 쿼리 패턴
```javascript
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .order('created_at', { ascending: false });

if (error) {
  console.error('Error:', error);
  return;
}
```

### 컴포넌트 패턴
```javascript
export default function ComponentName({ prop1, prop2 }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    // side effect
  }, [dependency]);

  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```
```

---

## D.4 단축키 및 명령어 치트시트

### 기본 단축키

| 단축키 | 기능 |
|--------|------|
| `Tab` | 제안 수락 |
| `Esc` | 제안 거부 |
| `Alt + ]` | 다음 제안 보기 |
| `Alt + [` | 이전 제안 보기 |
| `Ctrl + Enter` | 여러 제안 패널로 보기 |
| `Ctrl + I` | Copilot Chat 열기 (인라인) |

### Copilot Chat 명령어

| 명령어 | 용도 |
|--------|------|
| `@workspace` | 프로젝트 전체 컨텍스트 참조 |
| `/explain` | 코드 설명 요청 |
| `/fix` | 에러 수정 요청 |
| `/tests` | 테스트 코드 생성 |
| `/doc` | 문서/주석 생성 |
| `/new` | 새 프로젝트/파일 생성 |

### 활용 예시

```
@workspace Supabase v2에서 Google 로그인 구현 방법

@workspace 현재 프로젝트의 폴더 구조 설명해줘

/explain 이 useEffect가 무한 루프에 빠지는 이유

/fix "Cannot read properties of undefined" 에러 해결

/tests 이 함수에 대한 테스트 코드 작성
```

---

## D.5 트러블슈팅

### 문제 1: 제안이 표시되지 않음

**해결**:
1. 상태 바에서 Copilot 아이콘 확인
2. 아이콘 클릭 → "Enable Globally" 또는 "Enable for [language]"
3. VS Code 재시작

### 문제 2: GitHub 로그인 실패

**해결**:
1. VS Code에서 로그아웃 후 재로그인
2. 브라우저 캐시 삭제 후 재시도
3. GitHub 계정의 Copilot 구독 상태 확인

### 문제 3: 느린 응답

**해결**:
1. 인터넷 연결 확인
2. 너무 큰 파일에서 사용 시 느려질 수 있음
3. 다른 확장과의 충돌 확인

### 문제 4: 잘못된 버전의 코드 제안

**해결**:
1. `copilot-instructions.md`에 버전 명시
2. 파일 상단에 주석으로 버전 명시
3. 프롬프트에 버전 정보 포함

```javascript
// React 18, Supabase JS v2 사용
// 아래 코드 작성 시 이 버전을 기준으로 해주세요
```

### 문제 5: 학생 혜택 미적용

**해결**:
1. [education.github.com/discount_requests](https://education.github.com/discount_requests)에서 상태 확인
2. 승인까지 수일 소요될 수 있음
3. 학교 이메일이 인증되었는지 확인
4. 학생증 사진이 명확한지 확인

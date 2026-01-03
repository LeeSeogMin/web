# 부록 C. Context7 MCP 설정 가이드

이 부록에서는 Claude Desktop에서 Context7 MCP 서버를 설정하여 최신 라이브러리 문서를 참조하는 방법을 안내한다.

---

## C.1 Claude Desktop 설정

### Claude Desktop 설치

1. [claude.ai/download](https://claude.ai/download) 접속
2. 운영체제에 맞는 버전 다운로드
3. 설치 파일 실행

### MCP란?

**MCP**(Model Context Protocol)는 Claude가 외부 도구와 데이터 소스에 접근할 수 있게 해주는 프로토콜이다. MCP 서버를 통해 Claude는 실시간으로 최신 문서를 참조할 수 있다.

### 설정 파일 위치

**macOS**:
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows**:
```
%APPDATA%\Claude\claude_desktop_config.json
```

---

## C.2 Context7 서버 연동

### Context7이란?

**Context7**은 라이브러리 공식 문서를 Claude에게 제공하는 MCP 서버다. AI가 학습 시점 이후의 최신 API를 참조할 수 있게 해준다.

### 설정 방법

1. 설정 파일 열기 (없으면 생성)

2. 다음 내용 추가:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/context7-mcp"]
    }
  }
}
```

3. Claude Desktop 재시작

### 설정 확인

Claude Desktop에서 새 대화 시작 후:
- 도구 아이콘에 Context7이 표시되면 성공
- "Context7 도구를 사용할 수 있습니다" 메시지 확인

---

## C.3 문서 참조 프롬프트 예시

### 기본 사용법

```
Context7을 사용해서 React 18의 useEffect 공식 문서를 참조해줘.
의존성 배열 관련 최신 권장사항을 알려줘.
```

### Supabase 문서 참조

```
Context7로 Supabase JavaScript v2의 signInWithOAuth 문서를 찾아줘.
Google OAuth 설정 방법을 단계별로 설명해줘.
```

### React Router 문서 참조

```
Context7을 통해 React Router v6의 createBrowserRouter 문서를 참조해서
라우터 설정 코드를 작성해줘.
```

### 버전 명시 예시

```
Context7으로 다음 라이브러리의 최신 문서를 참조해줘:
- React 18.2
- @supabase/supabase-js 2.x
- react-router-dom 6.x

이 버전들을 기준으로 로그인 페이지 컴포넌트를 작성해줘.
```

### 특정 API 검색

```
Context7에서 Supabase의 RLS(Row Level Security) 관련 문서를 찾아줘.
CREATE POLICY 문법과 auth.uid() 사용법을 설명해줘.
```

---

## C.4 트러블슈팅

### 문제 1: Context7이 도구 목록에 없음

**원인**: 설정 파일 오류 또는 Claude Desktop 미재시작

**해결**:
1. 설정 파일 JSON 문법 확인 (쉼표, 따옴표 등)
2. Claude Desktop 완전 종료 후 재시작
3. 파일 경로가 정확한지 확인

### 문제 2: npx 명령어 없음

**원인**: Node.js가 설치되지 않음

**해결**:
1. Node.js LTS 버전 설치 (부록 A.1 참고)
2. 터미널에서 `npx --version` 확인
3. 설치 후 Claude Desktop 재시작

### 문제 3: 네트워크 오류

**원인**: 방화벽 또는 프록시 설정

**해결**:
1. 인터넷 연결 확인
2. 방화벽에서 Claude Desktop 허용
3. VPN 사용 중이라면 일시 비활성화 후 시도

### 문제 4: 문서를 찾지 못함

**원인**: 라이브러리명 또는 버전 오류

**해결**:
1. 정확한 라이브러리명 사용 (예: `@supabase/supabase-js`)
2. 메이저 버전만 명시 (예: `v2`, `v6`)
3. 공식 패키지명으로 요청

### 문제 5: 오래된 정보 반환

**원인**: 캐시 또는 색인 지연

**해결**:
1. "최신 문서를 다시 확인해줘" 요청
2. Claude Desktop 재시작
3. 특정 날짜 이후 업데이트된 내용 요청

---

## 추가 MCP 서버

Context7 외에도 유용한 MCP 서버들:

| 서버 | 용도 |
|------|------|
| **filesystem** | 로컬 파일 읽기/쓰기 |
| **github** | GitHub 저장소 접근 |
| **postgres** | PostgreSQL 데이터베이스 접근 |

설정 예시:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/context7-mcp"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/filesystem-mcp", "/path/to/project"]
    }
  }
}
```

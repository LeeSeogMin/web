# 제8장 Supabase 시작하기

---

## 학습 목표

이 장을 마치면 다음을 수행할 수 있다:

1. BaaS의 개념과 장점을 설명할 수 있다
2. Supabase와 Firebase의 차이점을 비교할 수 있다
3. Supabase 프로젝트를 생성하고 대시보드를 탐색할 수 있다
4. React 프로젝트에 Supabase 클라이언트를 설정할 수 있다
5. 환경 변수를 안전하게 관리할 수 있다

---

## 8.1 BaaS(Backend as a Service) 개념

### 8.1.1 전통적인 백엔드 개발

웹 애플리케이션을 만들려면 사용자가 보는 화면(프론트엔드)뿐만 아니라 데이터를 저장하고 처리하는 서버(백엔드)가 필요하다. 전통적인 방식에서는 다음과 같은 작업을 직접 수행해야 한다:

- 서버 구축 및 운영 (Node.js, Python, Java 등)
- 데이터베이스 설치 및 관리
- 사용자 인증 시스템 구현
- 파일 저장소 설정
- API 설계 및 구현
- 보안 설정

이 모든 것을 직접 구축하려면 많은 시간과 전문 지식이 필요하다.

### 8.1.2 BaaS란?

**BaaS**(Backend as a Service)는 백엔드 기능을 클라우드 서비스 형태로 제공한다. 개발자는 서버를 직접 구축하지 않고도 데이터베이스, 인증, 파일 저장 등의 기능을 바로 사용할 수 있다.

```
┌─────────────────────────────────────────────────────────────┐
│                   전통적 백엔드 개발                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│    프론트엔드 ──> 백엔드 서버 ──> 데이터베이스               │
│                      │                                      │
│                      ├──> 인증 서버                         │
│                      └──> 파일 스토리지                     │
│                                                             │
│    ※ 모든 서버를 직접 구축/운영해야 함                       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                      BaaS 방식                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│    프론트엔드 ──────> BaaS 플랫폼                           │
│                      (DB + 인증 + 스토리지 통합)             │
│                                                             │
│    ※ 클라우드에서 모든 기능 제공                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘

※ 그림 8.1 전통적 백엔드 vs BaaS 아키텍처
```

### 8.1.3 BaaS의 장점

**표 8.1** BaaS의 주요 장점

| 장점 | 설명 |
|------|------|
| 개발 속도 | 백엔드 코딩 시간을 최대 80% 단축 |
| 비용 효율 | 초기 서버 인프라 투자 불필요, 사용량 기반 과금 |
| 자동 스케일링 | 사용자 증가에 자동으로 대응 |
| 보안 내장 | 암호화, 인증, 접근 제어 기본 제공 |
| 크로스 플랫폼 | 하나의 API로 웹, iOS, Android 모두 지원 |

### 8.1.4 BaaS가 적합한 경우

BaaS는 다음과 같은 상황에서 효과적이다:

- **MVP 개발**: 빠르게 아이디어를 검증해야 할 때
- **스타트업**: 작은 팀으로 풀스택 앱을 만들어야 할 때
- **프론트엔드 중심 팀**: 백엔드 전문가 없이 앱을 개발할 때
- **학습 목적**: 백엔드 개념을 실습하며 배울 때

> **참고**: 복잡한 비즈니스 로직이나 특수한 보안 요구사항이 있다면 전통적인 백엔드가 더 적합할 수 있다.

---

## 8.2 Supabase vs Firebase 비교

### 8.2.1 두 플랫폼 개요

**Firebase**는 Google이 운영하는 BaaS 플랫폼으로, 2012년부터 서비스되었다. **Supabase**는 2020년에 시작된 오픈소스 프로젝트로, "Firebase의 오픈소스 대안"을 표방한다.

### 8.2.2 기술 스택 비교

**표 8.2** Supabase vs Firebase 기술 비교

| 항목 | Supabase | Firebase |
|------|----------|----------|
| 데이터베이스 | PostgreSQL (관계형) | Firestore (NoSQL) |
| 쿼리 언어 | SQL | Firebase Query Language |
| 오픈소스 | O (셀프 호스팅 가능) | X (Google 종속) |
| 실시간 기능 | PostgreSQL LISTEN/NOTIFY | 네이티브 실시간 DB |
| 서버리스 함수 | Edge Functions (Deno) | Cloud Functions (Node.js) |

### 8.2.3 관계형 vs NoSQL

**Firebase Firestore**는 문서(Document) 기반 NoSQL 데이터베이스다:
```javascript
// Firestore 구조 예시
users/
  user1/
    name: "홍길동"
    posts/
      post1/
        title: "첫 게시글"
```

**Supabase PostgreSQL**은 테이블 기반 관계형 데이터베이스다:
```sql
-- PostgreSQL 구조 예시
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name TEXT
);

CREATE TABLE posts (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    title TEXT
);
```

관계형 데이터베이스는 다음과 같은 상황에서 유리하다:
- 데이터 간 복잡한 관계가 있을 때
- SQL 쿼리로 유연하게 데이터를 조회할 때
- 데이터 무결성이 중요할 때

### 8.2.4 가격 정책

**Firebase**는 읽기/쓰기/삭제 연산 횟수에 따라 과금한다. 앱이 성장하면 비용이 급격히 증가할 수 있다.

**Supabase**는 리소스(스토리지, 대역폭) 기반으로 과금한다. 예측 가능한 월정액 요금이 장점이다.

**표 8.3** 무료 플랜 비교

| 항목 | Supabase Free | Firebase Spark |
|------|---------------|----------------|
| 데이터베이스 | 500MB | 1GB |
| 인증 사용자 | 무제한 | 무제한 |
| 스토리지 | 1GB | 5GB |
| 월 API 호출 | 무제한 | 제한 있음 |

### 8.2.5 Supabase를 선택하는 이유

이 교재에서 Supabase를 선택한 이유:

1. **SQL 학습**: 표준 SQL을 배울 수 있다
2. **오픈소스**: 소스 코드가 공개되어 동작 원리 학습 가능
3. **벤더 종속 없음**: 언제든 다른 PostgreSQL 호스팅으로 이전 가능
4. **Row Level Security**: 강력한 권한 관리 기능

---

## 8.3 Supabase 프로젝트 생성

### 8.3.1 계정 생성

1. https://supabase.com 접속
2. "Start your project" 클릭
3. GitHub 계정으로 로그인 (권장)

### 8.3.2 새 프로젝트 생성

로그인 후 다음 단계를 따른다:

1. **New Project** 버튼 클릭
2. 프로젝트 정보 입력:
   - **Name**: 프로젝트 이름 (예: my-board)
   - **Database Password**: 안전한 비밀번호 설정 (기록해둘 것)
   - **Region**: Northeast Asia (Seoul) 선택
3. **Create new project** 클릭

프로젝트 생성에는 약 2분이 소요된다.

### 8.3.3 API 키 확인

프로젝트 생성이 완료되면 **Settings > API** 메뉴에서 API 키를 확인할 수 있다.

**표 8.4** API 키 종류

| 키 종류 | 용도 | 보안 |
|---------|------|------|
| **anon key** (공개 키) | 클라이언트(브라우저)에서 사용 | 공개 가능, RLS로 보호 |
| **service role key** (비밀 키) | 서버에서 사용 | 절대 공개 금지 |

> **주의**: `service role key`는 RLS(Row Level Security)를 우회한다. 절대로 클라이언트 코드에 포함하지 않는다.

### 8.3.4 프로젝트 URL 확인

같은 페이지에서 프로젝트 URL도 확인한다:

```
https://your-project-id.supabase.co
```

이 URL과 anon key가 있으면 React 앱에서 Supabase에 연결할 수 있다.

---

## 8.4 대시보드 탐색

Supabase 대시보드는 데이터베이스 관리를 위한 다양한 도구를 제공한다.

```
┌─────────────────────────────────────────────────────────────┐
│                   Supabase 대시보드 메뉴                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│    [Home]          프로젝트 개요                            │
│    [Table Editor]  테이블 GUI 관리                          │
│    [SQL Editor]    SQL 직접 실행                            │
│    [Database]      스키마, 함수, 트리거                     │
│    [Auth]          사용자 인증 관리                         │
│    [Storage]       파일 저장소                              │
│    [Edge Functions] 서버리스 함수                           │
│    [API Docs]      자동 생성 API 문서                       │
│    [Settings]      프로젝트 설정                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘

※ 그림 8.2 Supabase 대시보드 메뉴 구조
```

### 8.4.1 Table Editor

Table Editor는 스프레드시트처럼 테이블을 관리할 수 있는 GUI 도구다.

**주요 기능**:
- 테이블 생성/수정/삭제
- 컬럼 추가 및 타입 설정
- 행 데이터 직접 편집
- 외래 키 관계 설정

**테이블 생성 예시**:
1. "New Table" 버튼 클릭
2. 테이블 이름 입력 (예: posts)
3. 컬럼 추가:
   - `id`: uuid (Primary Key, 자동 생성)
   - `title`: text
   - `content`: text
   - `created_at`: timestamptz (기본값: now())
4. "Save" 클릭

### 8.4.2 SQL Editor

SQL Editor에서 SQL 쿼리를 직접 실행할 수 있다.

**주요 기능**:
- 구문 강조 및 자동 완성
- 쿼리 실행 히스토리
- AI 지원 (자연어 → SQL 변환)
- 쿼리 저장 및 공유

**사용 예시**:
```sql
-- 게시글 테이블 생성
CREATE TABLE posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 데이터 조회
SELECT * FROM posts ORDER BY created_at DESC;
```

### 8.4.3 Authentication

Authentication 메뉴에서 사용자 인증을 설정한다.

**지원하는 인증 방식**:
- 이메일/비밀번호
- 매직 링크 (이메일 링크로 로그인)
- 소셜 로그인 (Google, GitHub, Apple 등)
- 전화번호 인증

**Providers 설정**:
1. Authentication > Providers 메뉴 이동
2. 원하는 Provider (예: Google) 활성화
3. OAuth 자격 증명 입력

### 8.4.4 API Docs

API Docs는 데이터베이스 스키마를 기반으로 API 문서를 자동 생성한다.

**제공 정보**:
- 테이블별 CRUD API
- 쿼리 파라미터 설명
- JavaScript/Python 코드 예제
- cURL 명령어

테이블을 생성하면 즉시 REST API가 자동으로 만들어진다:

```
GET    /rest/v1/posts          전체 조회
POST   /rest/v1/posts          생성
PATCH  /rest/v1/posts?id=eq.1  수정
DELETE /rest/v1/posts?id=eq.1  삭제
```

---

## 8.5 Supabase 클라이언트 설정

### 8.5.1 @supabase/supabase-js 설치

React 프로젝트에서 Supabase를 사용하려면 공식 JavaScript 클라이언트를 설치한다.

```bash
npm install @supabase/supabase-js
```

> **참고**: Node.js 20 이상이 필요하다 (supabase-js 2.79.0+).

### 8.5.2 환경 변수 관리

API 키를 코드에 직접 작성하면 보안 위험이 있다. **환경 변수**를 사용하여 안전하게 관리한다.

**Vite 프로젝트에서 환경 변수 설정**:

프로젝트 루트에 `.env.local` 파일 생성:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> **중요**: `.env.local` 파일은 `.gitignore`에 추가하여 Git에 커밋하지 않는다.

**Vite 환경 변수 규칙**:
- 반드시 `VITE_` 접두사 사용
- `import.meta.env.VITE_변수명`으로 접근

### 8.5.3 클라이언트 초기화

`src/lib/supabase.js` 파일을 생성하고 클라이언트를 초기화한다:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**사용 예시**:
```javascript
import { supabase } from './lib/supabase';

// 데이터 조회
const { data, error } = await supabase
    .from('posts')
    .select('*');

if (error) {
    console.error('에러:', error);
} else {
    console.log('데이터:', data);
}
```

### 8.5.4 연결 테스트

연결이 정상인지 확인하는 간단한 컴포넌트:

```jsx
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

function ConnectionTest() {
    const [status, setStatus] = useState('checking');

    useEffect(() => {
        async function check() {
            try {
                // PostgreSQL 서버 시간 조회
                const { data, error } = await supabase.rpc('now');

                if (error) throw error;
                setStatus('connected');
            } catch {
                setStatus('error');
            }
        }
        check();
    }, []);

    if (status === 'checking') return <p>연결 확인 중...</p>;
    if (status === 'error') return <p>❌ 연결 실패</p>;
    return <p>✅ Supabase 연결 성공!</p>;
}
```

_전체 코드는 practice/chapter8/code/8-5-supabase-client.js 참고_

---

## 8.6 Context7로 Supabase 최신 문서 참조하기

### 8.6.1 AI 도구의 버전 문제

AI 코딩 도구(ChatGPT, Claude, Copilot 등)는 학습 데이터 시점의 정보를 기반으로 한다. 빠르게 변화하는 라이브러리(React, Supabase 등)에서는 **오래된 API**를 제안할 수 있다.

예를 들어, Supabase 인증 API가 변경되었다면:
```javascript
// 과거 API (더 이상 동작하지 않을 수 있음)
const { user, error } = await supabase.auth.signIn({ email, password });

// 현재 API
const { data, error } = await supabase.auth.signInWithPassword({ email, password });
```

### 8.6.2 Context7 MCP란?

**Context7**은 Model Context Protocol(MCP)를 활용하여 AI 도구에 최신 문서를 제공하는 서비스다. 2024년 11월 Anthropic이 MCP를 발표한 이후, 여러 AI 도구에서 지원하고 있다.

**MCP의 동작 방식**:
1. 사용자가 "use context7" 프롬프트 입력
2. Context7이 공식 문서에서 최신 정보 가져옴
3. AI 모델의 컨텍스트에 문서 주입
4. AI가 최신 API 기반으로 응답

### 8.6.3 Context7 사용법

**Claude Desktop 또는 Cursor에서**:

```
use context7

Supabase에서 Google OAuth 로그인을 구현하려면 어떻게 해야 하나요?
```

Context7이 활성화되면 AI가 최신 Supabase 문서를 참조하여 정확한 코드를 제공한다.

### 8.6.4 버전 확인 습관

AI 코드를 사용할 때는 항상 다음을 확인한다:

1. **공식 문서 대조**: https://supabase.com/docs
2. **설치된 버전 확인**: `npm list @supabase/supabase-js`
3. **Changelog 확인**: 최근 변경사항 파악

**표 8.5** AI 코드 검증 체크리스트

| 항목 | 확인 방법 |
|------|----------|
| API 이름 | 공식 문서에서 동일한 함수명 확인 |
| 파라미터 | 함수 시그니처 비교 |
| 반환값 | data/error 구조 확인 |
| Deprecated | 경고 메시지 확인 |

---

## 핵심 정리

1. **BaaS**는 백엔드 기능을 클라우드로 제공하여 개발 속도를 높이고 비용을 절감한다.

2. **Supabase**는 PostgreSQL 기반 오픈소스 BaaS로, SQL과 관계형 데이터 모델을 사용한다.

3. **Firebase**와 비교하여 Supabase는 벤더 종속이 없고, 예측 가능한 비용 구조를 가진다.

4. **대시보드**에서 Table Editor, SQL Editor, Authentication 등을 통해 백엔드를 관리한다.

5. **환경 변수**로 API 키를 안전하게 관리하고, 절대로 Git에 커밋하지 않는다.

6. **Context7 MCP**를 활용하면 AI 도구에서 최신 Supabase 문서를 참조할 수 있다.

---

## 연습문제

### 기초

**문제 1.** BaaS의 장점 3가지를 설명하시오.

**문제 2.** anon key와 service role key의 차이점을 설명하고, 각각 어디에서 사용하는지 답하시오.

**문제 3.** 다음 .env.local 파일의 오류를 찾아 수정하시오.
```
SUPABASE_URL=https://abc.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 중급

**문제 4.** Supabase와 Firebase를 다음 기준으로 비교하는 표를 작성하시오: 데이터베이스 유형, 쿼리 언어, 오픈소스 여부, 가격 정책.

**문제 5.** React 프로젝트에서 Supabase 클라이언트를 초기화하는 코드를 작성하시오. 환경 변수를 사용해야 한다.

### 심화

**문제 6.** Supabase 연결 테스트 컴포넌트를 작성하시오. 다음 요구사항을 만족해야 한다:
- 연결 상태를 "확인 중", "성공", "실패"로 표시
- 실패 시 에러 메시지 표시
- useEffect를 사용하여 마운트 시 연결 확인

---

## 다음 장 예고

제9장에서는 **Supabase Authentication**을 학습한다. Google OAuth를 사용한 소셜 로그인을 구현하고, 인증 상태를 React 컨텍스트로 관리하는 방법을 다룬다.

---

## 참고문헌

1. Supabase 공식 문서. *Getting Started*. https://supabase.com/docs
2. Supabase 공식 문서. *React Quickstart*. https://supabase.com/docs/guides/getting-started/quickstarts/reactjs
3. Supabase 공식 문서. *JavaScript Client*. https://supabase.com/docs/reference/javascript/installing
4. Context7 MCP. *Up-to-Date Docs for Any Cursor Prompt*. https://upstash.com/blog/context7-mcp
5. Zapier. *Supabase vs. Firebase: Which is best?*. https://zapier.com/blog/supabase-vs-firebase/

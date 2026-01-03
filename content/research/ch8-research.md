# 제8장 리서치: Supabase 시작하기

## 1. BaaS (Backend as a Service) 개요

### 1.1 정의
- 서버 인프라 없이 백엔드 기능(DB, 인증, 스토리지 등) 제공
- 프론트엔드 개발자가 백엔드 없이 풀스택 앱 구축 가능

### 1.2 주요 장점
- **개발 속도**: 백엔드 코딩 시간 최대 80% 단축
- **비용 효율**: 초기 인프라 투자 불필요, 사용량 기반 과금
- **자동 스케일링**: 트래픽 증가에 자동 대응
- **보안 내장**: 암호화, 역할 기반 접근 제어 제공
- **크로스 플랫폼**: 하나의 API로 웹/iOS/Android 지원

### 1.3 시장 규모
- 2022년: $2.8B → 2032년 예상: $27.9B (CAGR 23.0%)

### 1.4 주요 BaaS 플랫폼
- Firebase (Google)
- Supabase (오픈소스)
- AWS Amplify
- Appwrite
- PocketBase

---

## 2. Supabase vs Firebase 비교

### 2.1 기술 스택
| 항목 | Supabase | Firebase |
|------|----------|----------|
| 데이터베이스 | PostgreSQL (관계형) | Firestore/RTDB (NoSQL) |
| 쿼리 언어 | SQL | Firebase Query |
| 오픈소스 | O (셀프 호스팅 가능) | X (Google 종속) |
| 실시간 | LISTEN/NOTIFY + WebSocket | 네이티브 실시간 DB |

### 2.2 가격 정책
- **Firebase**: 읽기/쓰기/삭제당 과금 → 스케일 시 비용 급증 가능
- **Supabase**: 리소스 기반 월정액 → 예측 가능한 비용

### 2.3 선택 기준
- **Firebase 적합**: 빠른 프로토타이핑, 모바일 앱, 실시간 채팅
- **Supabase 적합**: 복잡한 쿼리, SQL 선호, 벤더 종속 회피

---

## 3. Supabase 아키텍처

### 3.1 핵심 구성요소
1. **PostgreSQL**: 메인 데이터베이스
2. **PostgREST**: PostgreSQL → REST API 자동 생성
3. **GoTrue**: 인증 서비스
4. **Realtime**: WebSocket 기반 실시간 이벤트
5. **Storage**: 파일 저장소 (S3 호환)
6. **Edge Functions**: Deno 기반 서버리스 함수

### 3.2 API 키 종류
- **anon key (publishable)**: 클라이언트에서 사용, RLS 적용됨
- **service role key**: 서버에서 사용, RLS 우회

### 3.3 새로운 키 시스템 (2025)
- `sb_publishable_xxx` 형식의 새 키 도입 중
- 기존 anon/service_role 키와 공존

---

## 4. Supabase 대시보드 기능

### 4.1 Table Editor
- 노코드 방식 테이블 생성/수정
- 행/열 직접 편집
- 탭 기능 지원 (2025년 3월 추가)

### 4.2 SQL Editor
- 구문 강조, 자동 완성
- 실행 히스토리
- AI 통합 (자연어 → SQL)
- 공유 스니펫

### 4.3 Authentication
- 이메일/비밀번호
- 소셜 로그인 (Google, GitHub 등)
- MFA 지원

### 4.4 API Docs
- 스키마 기반 자동 생성 API 문서
- 실시간 코드 예제

---

## 5. React 연동 설정

### 5.1 설치
```bash
npm install @supabase/supabase-js
```

### 5.2 환경 변수 (.env.local)
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5.3 클라이언트 초기화
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### 5.4 Node.js 버전 요구사항
- Node.js 18: 2025년 4월 30일 EOL
- supabase-js 2.79.0+는 Node.js 20+ 필요

---

## 6. Context7 MCP

### 6.1 개요
- Model Context Protocol (MCP) 기반 문서 참조 도구
- 2024년 11월 Anthropic 도입, 2025년 3월 OpenAI 채택

### 6.2 목적
- LLM의 오래된 학습 데이터 문제 해결
- 최신 라이브러리 문서 실시간 참조

### 6.3 사용법
- Claude Desktop/Cursor에서 "use context7" 프롬프트
- 공식 문서에서 최신 예제 자동 주입

### 6.4 설치
```bash
npx -y @upstash/context7-mcp
```

---

## 참고 자료

1. Supabase 공식 문서: https://supabase.com/docs
2. Supabase React 퀵스타트: https://supabase.com/docs/guides/getting-started/quickstarts/reactjs
3. Context7 MCP: https://upstash.com/blog/context7-mcp
4. Model Context Protocol: https://modelcontextprotocol.io

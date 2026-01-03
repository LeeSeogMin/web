# 제13장 리서치: Vercel 배포

## 1. Vercel 플랫폼 개요

### 1.1 Vercel이란
- Next.js를 만든 회사에서 운영하는 프론트엔드 배포 플랫폼
- 서버리스 배포: 서버 관리 없이 코드만 배포
- Git 연동: 푸시만으로 자동 배포
- 무료 플랜: 개인/취미 프로젝트에 충분

### 1.2 주요 특징
- **제로 설정**: Vite, React 등 자동 감지
- **글로벌 CDN**: 전 세계 엣지 네트워크
- **프리뷰 배포**: PR마다 테스트 URL 자동 생성
- **즉시 롤백**: 문제 시 이전 버전으로 복구
- **HTTPS 기본**: SSL 인증서 자동 발급

### 1.3 다른 플랫폼 비교

| 플랫폼 | 장점 | 단점 |
|--------|------|------|
| Vercel | 간편함, 무료 플랜 | Next.js 외 최적화 덜함 |
| Netlify | 폼/함수 기본 제공 | 빌드 시간 제한 |
| GitHub Pages | 완전 무료 | 정적 사이트만 |
| AWS Amplify | AWS 통합 | 복잡한 설정 |

---

## 2. 배포 프로세스

### 2.1 배포 방법

**방법 1: Git 연동 (권장)**
1. GitHub/GitLab/Bitbucket 저장소 연결
2. 자동 배포 설정
3. 푸시할 때마다 자동 빌드 & 배포

**방법 2: Vercel CLI**
```bash
npm install -g vercel
vercel          # 프리뷰 배포
vercel --prod   # 프로덕션 배포
```

### 2.2 Vite 프로젝트 설정

**자동 감지 설정**:
- Build Command: `vite build`
- Output Directory: `dist`
- Framework Preset: Vite

**vercel.json (SPA 라우팅)**:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 2.3 빌드 프로세스

```
Git Push → Vercel 감지 → 빌드 시작 → 배포 → URL 생성
```

- 빌드 로그 실시간 확인 가능
- 빌드 실패 시 이전 배포 유지
- 성공 시 자동으로 프로덕션 URL 업데이트

---

## 3. 환경 변수

### 3.1 환경 구분

| 환경 | 설명 | VERCEL_ENV 값 |
|------|------|---------------|
| Production | 실제 사용자 대상 | production |
| Preview | PR 테스트용 | preview |
| Development | 로컬 개발용 | development |

### 3.2 설정 방법

**대시보드에서**:
1. Project Settings > Environment Variables
2. 변수 이름과 값 입력
3. 환경 선택 (Production/Preview/Development)

**CLI로**:
```bash
vercel env add VITE_SUPABASE_URL
vercel env pull .env.local  # 로컬에 다운로드
```

### 3.3 Vite 환경 변수 규칙

- 클라이언트에서 사용: `VITE_` 접두사 필수
- 예: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- 접두사 없으면 서버 사이드에서만 사용 가능

### 3.4 시크릿 관리 원칙

1. **절대 Git에 커밋하지 않기**: .env 파일을 .gitignore에 추가
2. **민감한 키는 서버에서만**: anon key는 클라이언트 OK, service role key는 금지
3. **환경별 분리**: 개발/프로덕션 Supabase 프로젝트 분리 권장

---

## 4. 배포 관리

### 4.1 도메인 설정

**기본 도메인**: `project-name.vercel.app`

**커스텀 도메인**:
1. Project Settings > Domains
2. 도메인 추가
3. DNS 레코드 설정 (CNAME 또는 A 레코드)
4. SSL 자동 발급

### 4.2 배포 로그

- 빌드 과정 전체 기록
- 에러 메시지 확인
- 빌드 시간 측정

### 4.3 롤백

**대시보드에서**:
1. Deployments 탭
2. 이전 배포 선택
3. Instant Rollback 클릭

**CLI로**:
```bash
vercel rollback  # 이전 배포로 복구
```

**주의**: Hobby 플랜은 바로 이전 배포만 롤백 가능

---

## 5. CI/CD 파이프라인

```
[개발자]
    │
    ▼
[Git Push]
    │
    ▼
[Vercel 감지]
    │
    ▼
[빌드 시작]
    │
    ├── 성공 ──▶ [배포] ──▶ [URL 업데이트]
    │
    └── 실패 ──▶ [알림] ──▶ [이전 배포 유지]
```

### 5.1 프리뷰 배포

- main/master 외 브랜치 푸시 시 자동 생성
- PR에 프리뷰 URL 자동 댓글
- 팀원 리뷰용 테스트 환경

### 5.2 프로덕션 배포

- main/master 브랜치 푸시 또는 머지 시
- 프로덕션 도메인 자동 업데이트
- 이전 배포는 기록에 보관

---

## 참고문헌

1. Vercel 공식 문서. *Vite on Vercel*. https://vercel.com/docs/frameworks/frontend/vite
2. Vercel 공식 문서. *Environment Variables*. https://vercel.com/docs/environment-variables
3. Vercel 공식 문서. *Instant Rollback*. https://vercel.com/docs/instant-rollback
4. Vercel 공식 문서. *Environments*. https://vercel.com/docs/deployments/environments
5. Vite 공식 문서. *Deploying a Static Site*. https://vite.dev/guide/static-deploy

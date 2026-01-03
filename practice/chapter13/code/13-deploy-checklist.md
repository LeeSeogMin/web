# 배포 전 체크리스트

## 1. 코드 준비

### 빌드 확인
- [ ] `npm run build` 로컬에서 성공
- [ ] `npm run preview`로 빌드 결과 확인
- [ ] 콘솔 에러 없음

### 환경 변수
- [ ] `.env` 파일이 `.gitignore`에 포함됨
- [ ] 모든 환경 변수가 `VITE_` 접두사 사용 (클라이언트용)
- [ ] 민감한 키(service_role)가 코드에 없음

### 라우팅 (SPA)
- [ ] `vercel.json` 파일 생성 (React Router 사용 시)
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 2. GitHub 준비

### 저장소
- [ ] 최신 코드가 커밋됨
- [ ] main/master 브랜치에 푸시됨
- [ ] README.md 작성됨

### .gitignore 확인
```
node_modules/
dist/
.env
.env.local
.env.*.local
```

---

## 3. Vercel 설정

### 프로젝트 임포트
- [ ] GitHub 저장소 연결
- [ ] Framework Preset: Vite 선택
- [ ] Build Command: `vite build`
- [ ] Output Directory: `dist`

### 환경 변수 설정
- [ ] VITE_SUPABASE_URL
- [ ] VITE_SUPABASE_ANON_KEY
- [ ] 기타 필요한 환경 변수

---

## 4. Supabase 설정

### URL 설정
- [ ] Authentication > URL Configuration
- [ ] Site URL: Vercel 배포 URL로 변경
- [ ] Redirect URLs에 Vercel URL 추가

### RLS 확인
- [ ] 모든 테이블에 RLS 활성화
- [ ] 정책이 올바르게 설정됨

---

## 5. 배포 후 확인

### 기능 테스트
- [ ] 홈페이지 로드
- [ ] 로그인/로그아웃 동작
- [ ] 게시글 CRUD 동작
- [ ] 모바일에서 테스트

### 에러 확인
- [ ] 브라우저 콘솔 에러 없음
- [ ] 네트워크 탭에서 API 호출 성공
- [ ] Vercel 로그에서 에러 없음

---

## 6. 문제 해결

### 빌드 실패
1. Vercel 로그 확인
2. 로컬에서 `npm run build` 다시 테스트
3. Node.js 버전 확인 (Vercel Settings > General)

### 환경 변수 문제
1. 변수 이름 확인 (`VITE_` 접두사)
2. Vercel 대시보드에서 값 확인
3. 재배포 필요 (환경 변수 변경 후)

### 라우팅 문제 (404)
1. vercel.json 확인
2. React Router의 BrowserRouter 사용 확인
3. basename 설정 확인

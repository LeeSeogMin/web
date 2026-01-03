# README 템플릿

---

# 프로젝트 이름

> 한 줄 설명: 프로젝트가 무엇을 하는지 간단히 설명

![배지](https://img.shields.io/badge/React-18-blue)
![배지](https://img.shields.io/badge/Supabase-green)
![배지](https://img.shields.io/badge/Deployed-Vercel-black)

## 📋 목차

- [소개](#-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [시작하기](#-시작하기)
- [환경 변수](#-환경-변수)
- [프로젝트 구조](#-프로젝트-구조)
- [라이선스](#-라이선스)

---

## 🎯 소개

이 프로젝트는 [문제/니즈]를 해결하기 위해 만들어졌습니다.

**배포 URL**: [https://your-app.vercel.app](https://your-app.vercel.app)

### 스크린샷

<!-- 앱 스크린샷 또는 GIF 첨부 -->
![스크린샷](./docs/screenshot.png)

---

## ✨ 주요 기능

- 🔐 **소셜 로그인**: Google OAuth를 통한 간편 로그인
- 📝 **게시글 CRUD**: 게시글 작성, 조회, 수정, 삭제
- 🔒 **권한 관리**: RLS를 통한 서버 레벨 권한 제어
- 📱 **반응형 디자인**: 모바일/태블릿/데스크톱 지원

---

## 🛠 기술 스택

| 분류 | 기술 |
|------|------|
| **Frontend** | React 18, Vite, React Router |
| **Backend** | Supabase (PostgreSQL, Auth) |
| **Deployment** | Vercel |
| **Styling** | CSS Modules / Tailwind CSS |

---

## 🚀 시작하기

### 사전 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn
- Supabase 계정

### 설치

```bash
# 저장소 클론
git clone https://github.com/username/project-name.git
cd project-name

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일을 편집하여 실제 값 입력

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 🔐 환경 변수

`.env.local` 파일에 다음 환경 변수를 설정하세요:

| 변수명 | 설명 | 필수 |
|--------|------|------|
| `VITE_SUPABASE_URL` | Supabase 프로젝트 URL | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Supabase Anonymous Key | ✅ |

```bash
# .env.local 예시
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **주의**: `.env.local` 파일은 절대 Git에 커밋하지 마세요!

---

## 📁 프로젝트 구조

```
src/
├── components/       # 재사용 가능한 컴포넌트
│   ├── common/       # 공통 UI 컴포넌트
│   └── features/     # 기능별 컴포넌트
├── contexts/         # React Context
├── hooks/            # 커스텀 훅
├── lib/              # 외부 라이브러리 설정
│   └── supabase.js   # Supabase 클라이언트
├── pages/            # 페이지 컴포넌트
├── styles/           # 스타일 파일
└── utils/            # 유틸리티 함수
```

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](./LICENSE) 파일을 참고하세요.

---

## 👥 기여자

<!-- 팀 프로젝트인 경우 -->
- [@username](https://github.com/username) - 역할

---

## 📞 문의

질문이나 제안이 있으시면 [이슈](https://github.com/username/project-name/issues)를 등록해주세요.

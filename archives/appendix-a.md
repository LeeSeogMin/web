# 부록 A. 개발 환경 설정 가이드

이 부록에서는 웹 개발에 필요한 기본 환경 설정 방법을 안내한다.

---

## A.1 Node.js 설치

### Node.js란?

**Node.js**는 JavaScript를 브라우저 밖에서 실행할 수 있게 해주는 런타임이다. React 개발에 필수적이며, npm(패키지 관리자)이 함께 설치된다.

### 설치 방법

**1. 공식 웹사이트에서 설치 (권장)**

1. [nodejs.org](https://nodejs.org) 접속
2. **LTS**(Long Term Support) 버전 다운로드
3. 설치 파일 실행 및 안내에 따라 설치

**2. 설치 확인**

터미널(또는 명령 프롬프트)에서:

```bash
node --version
# v18.17.0 또는 유사한 버전 출력

npm --version
# 9.6.7 또는 유사한 버전 출력
```

### 버전 관리 (선택)

여러 프로젝트에서 다른 Node.js 버전이 필요할 때 **nvm**(Node Version Manager)을 사용한다.

**macOS/Linux**:

```bash
# nvm 설치
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Node.js 18 설치
nvm install 18
nvm use 18
```

**Windows**:

[nvm-windows](https://github.com/coreybutler/nvm-windows)를 사용한다.

---

## A.2 VS Code 설정

### VS Code 설치

1. [code.visualstudio.com](https://code.visualstudio.com) 접속
2. 운영체제에 맞는 버전 다운로드
3. 설치 파일 실행

### 필수 확장 프로그램

| 확장 | 용도 |
|------|------|
| **ESLint** | JavaScript 코드 품질 검사 |
| **Prettier** | 코드 자동 포맷팅 |
| **ES7+ React Snippets** | React 코드 스니펫 |
| **Auto Rename Tag** | HTML/JSX 태그 자동 수정 |

**설치 방법**:

1. VS Code 왼쪽 사이드바에서 확장(Extensions) 아이콘 클릭 (Ctrl+Shift+X)
2. 확장 이름 검색
3. "Install" 클릭

### 권장 설정

`settings.json` (Ctrl+Shift+P → "Preferences: Open Settings (JSON)"):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "files.autoSave": "onFocusChange",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

---

## A.3 Git 기초

### Git 설치

**Windows**:

[git-scm.com](https://git-scm.com)에서 다운로드 및 설치

**macOS**:

```bash
# Xcode Command Line Tools와 함께 설치됨
xcode-select --install

# 또는 Homebrew로 설치
brew install git
```

**설치 확인**:

```bash
git --version
# git version 2.39.0 또는 유사한 버전 출력
```

### 초기 설정

```bash
# 사용자 정보 설정 (커밋에 기록됨)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 기본 브랜치 이름 설정
git config --global init.defaultBranch main
```

### 기본 명령어

| 명령어 | 설명 |
|--------|------|
| `git init` | 새 저장소 생성 |
| `git clone <url>` | 원격 저장소 복제 |
| `git status` | 현재 상태 확인 |
| `git add .` | 모든 변경사항 스테이징 |
| `git commit -m "메시지"` | 커밋 생성 |
| `git push` | 원격에 업로드 |
| `git pull` | 원격에서 다운로드 |

### .gitignore 파일

Git이 추적하지 않을 파일 목록:

```
# 의존성
node_modules/

# 빌드 결과물
dist/
build/

# 환경 변수
.env
.env.local
.env.*.local

# IDE 설정
.vscode/
.idea/

# 운영체제 파일
.DS_Store
Thumbs.db
```

---

## A.4 터미널 사용법

### 터미널 열기

**Windows**:
- PowerShell: 시작 메뉴에서 "PowerShell" 검색
- VS Code 내장 터미널: Ctrl+`

**macOS**:
- Terminal: Spotlight(Cmd+Space)에서 "Terminal" 검색
- VS Code 내장 터미널: Ctrl+`

### 기본 명령어

| 명령어 | Windows (PowerShell) | macOS/Linux | 설명 |
|--------|---------------------|-------------|------|
| 현재 위치 | `pwd` | `pwd` | 현재 디렉토리 표시 |
| 목록 보기 | `dir` 또는 `ls` | `ls` | 파일/폴더 목록 |
| 이동 | `cd 경로` | `cd 경로` | 디렉토리 이동 |
| 상위로 | `cd ..` | `cd ..` | 상위 디렉토리로 |
| 폴더 생성 | `mkdir 이름` | `mkdir 이름` | 새 폴더 생성 |
| 삭제 | `rm 파일` | `rm 파일` | 파일 삭제 |
| 지우기 | `cls` | `clear` | 화면 지우기 |

### npm 명령어

| 명령어 | 설명 |
|--------|------|
| `npm init -y` | package.json 생성 |
| `npm install` | 의존성 설치 |
| `npm install 패키지명` | 패키지 설치 |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |

### 유용한 단축키

| 단축키 | 설명 |
|--------|------|
| Tab | 자동 완성 |
| ↑/↓ | 이전 명령어 탐색 |
| Ctrl+C | 실행 중인 명령 중단 |
| Ctrl+L | 화면 지우기 |

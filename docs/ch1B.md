# Chapter 1. 첫 배포 — create-next-app에서 Vercel까지 — B회차: 실습

> **미션**: 개인 프로필 페이지를 수정하고 인터넷에 배포한다

---

## 수업 타임라인

**표 1.8** B회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | A회차 핵심 리캡 + 과제 스펙 확인 |
| 00:05~00:10 | 스타터 코드 안내 + 개발 서버 실행 확인 |
| 00:10~00:25 | 체크포인트 1: 환경 확인 + page.js 수정 |
| 00:25~00:45 | 체크포인트 2: 프로필 페이지 완성 + Tailwind 스타일링 |
| 00:45~01:00 | 체크포인트 3: git push + Vercel 배포 확인 |
| 01:00~01:05 | Google Classroom 제출 |
| 01:05~01:25 | 결과 공유 + 코드리뷰 토론 |
| 01:25~01:30 | 교수 종합 피드백 + 다음 주 예고 |

---

## 과제 스펙 + 스타터 코드 안내

### 과제 요구사항

**개인 프로필 페이지**를 만든다:

① `app/page.js`에서 기본 Next.js 템플릿 내용을 삭제한다
② 본인의 이름과 한 줄 자기소개를 표시한다
③ Tailwind CSS 클래스로 텍스트 크기, 정렬, 색상을 조정한다
④ git push하여 Vercel에 자동 배포한다
⑤ 배포된 URL을 제출한다

### 스타터 코드

`practice/chapter1/starter/` 폴더에 create-next-app 기본 결과물 + 간단한 프로필 뼈대가 준비되어 있다.

```
practice/chapter1/starter/
├── app/
│   ├── layout.js       ← 공통 레이아웃 (Tailwind 설정 완료)
│   ├── page.js         ← 메인 페이지 (프로필 뼈대)
│   └── globals.css     ← Tailwind 기본 import
├── package.json        ← 의존성 (버전 고정)
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

**시작 방법** (PowerShell 기준):
```bash
cd practice/chapter1/starter
npm install
npm run dev
```
macOS Terminal도 동일하다.

브라우저에서 http://localhost:3000 을 열어 기본 페이지가 보이는지 확인한다.

> **강의 팁**: A회차에서 create-next-app을 성공한 학생은 자신의 프로젝트를 그대로 사용해도 좋다. 설치에 실패하거나 프로젝트가 깨진 학생은 스타터 코드를 사용한다.

---

## 바이브코딩 가이드

> Ch1에서는 아직 Copilot을 설정하지 않았다. 이번 실습은 **코드를 직접 수정**하는 방식으로 진행한다. Copilot은 2장에서 설치한다.

**page.js 수정 예시**:

```jsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">홍길동</h1>
      <p className="mt-4 text-xl text-gray-600">웹 프로그래밍을 배우고 있습니다</p>
    </main>
  );
}
```

위 코드에서 `className` 안의 `text-4xl`, `font-bold` 등은 **Tailwind CSS** 클래스이다. 3장에서 자세히 배운다. 지금은 복사하여 사용하면 된다.

**표 1.9** 지금 바로 쓸 수 있는 Tailwind 클래스

| 클래스 | 효과 |
|--------|------|
| `text-4xl` | 큰 텍스트 (36px) |
| `text-xl` | 중간 텍스트 (20px) |
| `font-bold` | 굵은 글씨 |
| `text-gray-600` | 회색 글씨 |
| `mt-4` | 위쪽 여백 16px |
| `p-24` | 안쪽 여백 96px |
| `flex` | Flexbox 레이아웃 |
| `items-center` | 세로 가운데 정렬 |
| `justify-center` | 가로 가운데 정렬 |
| `min-h-screen` | 최소 높이 = 화면 전체 |

> 클래스 이름을 바꿔보며 변화를 확인하는 것이 가장 빠른 학습 방법이다. `text-4xl`을 `text-2xl`로 바꾸면 글씨가 작아지고, `text-gray-600`을 `text-blue-600`으로 바꾸면 파란색이 된다.

---

## 개인 실습

### 체크포인트 1: 환경 확인 + page.js 수정 (15분)

**목표**: 개발 서버가 정상 동작하고, page.js를 수정할 수 있다.

① 터미널에서 `node --version`, `git --version` 으로 설치를 확인한다
② `npm install` → `npm run dev`로 개발 서버를 실행한다
③ 브라우저에서 http://localhost:3000 을 열어 페이지를 확인한다
④ `app/page.js`를 열고 기본 내용을 삭제한다
⑤ 본인 이름과 자기소개를 작성한다

> **강의 팁**: 순회하며 `npm install`이 안 되는 학생을 우선 지원한다. 대부분 Node.js 미설치 또는 네트워크 문제이다.

### 체크포인트 2: 프로필 페이지 완성 + Tailwind 스타일링 (20분)

**목표**: Tailwind 클래스로 보기 좋은 프로필 페이지를 만든다.

① 표 1.9의 Tailwind 클래스를 참고하여 스타일을 적용한다
② 텍스트 크기, 색상, 정렬을 자유롭게 조정한다
③ 추가 정보(학교, 전공, 취미 등)를 넣어도 좋다
④ 브라우저에서 실시간으로 변화를 확인한다 (핫 리로드)

> **강의 팁**: "정답"이 없는 과제이다. 학생마다 다른 결과가 나오는 것이 정상이다. 너무 완벽하려 하지 말고, "내 페이지가 인터넷에 올라간다"는 경험에 집중하도록 안내한다.

### 체크포인트 3: git push + Vercel 배포 확인 (15분)

**목표**: 코드를 GitHub에 올리고 Vercel 자동 배포를 확인한다.

① 터미널에서 git 명령어를 실행한다:
```bash
git add .
git commit -m "Ch1: 개인 프로필 페이지"
git push
```
② GitHub 저장소 페이지에서 코드가 올라갔는지 확인한다
③ Vercel 대시보드에서 자동 배포가 시작되었는지 확인한다
④ 배포 완료 후 URL을 브라우저에서 열어본다
⑤ 모바일에서도 접속해본다 (본인 스마트폰)

> **트러블슈팅**: `git push`에서 인증 오류가 나면 `gh auth login` 또는 Personal Access Token을 사용한다. 자세한 방법은 부록 A 참고.

---

## 검증 체크리스트

**표 1.10** Ch1 검증 체크리스트

| 항목 | 확인 |
|------|------|
| `npm run dev`로 개발 서버가 실행되는가? | ☐ |
| localhost:3000에서 프로필 페이지가 보이는가? | ☐ |
| 본인 이름과 자기소개가 표시되는가? | ☐ |
| git push가 성공했는가? | ☐ |
| Vercel 배포 URL에서 페이지가 정상 동작하는가? | ☐ |

---

## 흔한 실수

**표 1.11** Ch1에서 자주 발생하는 실수

| 실수 | 증상 | 해결 |
|------|------|------|
| Node.js 미설치 | `npx: command not found` | Node.js LTS 설치 |
| 프로젝트 폴더 밖에서 `npm run dev` | `Missing script: dev` | `cd my-first-web`으로 폴더 이동 |
| `git push` 인증 실패 | `Authentication failed` | `gh auth login` 또는 PAT 발급 |
| Vercel에 저장소가 안 보임 | Import 목록 비어있음 | GitHub 앱 권한 재설정 |
| 기본 템플릿 미삭제 | 프로필 대신 Next.js 기본 페이지 | `app/page.js` 내용 교체 |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch1 과제"에 아래 항목을 제출한다:

```
① 배포 URL
   예: https://my-first-web-xxxxx.vercel.app
```

> Ch1은 첫 수업이므로 "AI가 틀린 부분" 항목은 없다. 배포 URL만 제출한다.

---

## 코드리뷰 토론 가이드

> **토론 가이드**: 2-3명이 자발적으로 화면을 공유하며 결과를 발표한다.

**발표 포인트** (1인당 2-3분):
1. 배포된 URL을 브라우저에 띄운다
2. 어떤 내용을 프로필에 넣었는지 간단히 소개한다
3. 막혔던 부분이 있으면 공유한다 (설치 문제, git 인증 등)

**토론 질문**:
- "create-next-app에서 Vercel 배포까지 과정에서 가장 어려웠던 단계는?"
- "내 웹사이트가 인터넷에 올라간 느낌이 어떤가?"
- "다음에는 이 페이지에 무엇을 추가하고 싶은가?"

---

## 교수 피드백 포인트

**확인할 것**:
- 전원 배포 URL 동작 확인 — 접속이 안 되면 Vercel 대시보드에서 배포 상태 확인
- git push 과정에서 인증 문제가 가장 흔함 — `gh auth login` 시연
- 스타일링은 최소한이면 충분 — 이름과 자기소개만 있으면 통과

**우수 사례 공유**:
- 추가 정보(취미, SNS 링크 등)를 넣은 페이지를 1-2개 띄워 동기부여

**다음 주 예고**:
> 다음 주에는 **GitHub Copilot**을 설치하고, AI에게 말로 설명해서 코드를 생성하는 **바이브코딩**을 시작한다. 오늘 배운 프로젝트 구조와 배포 흐름을 기반으로, AI와 함께 자기소개 페이지를 업그레이드한다.

# 제7장 집필계획서: 웹 앱 아키텍처 & AI 디자인 설계

---

## 1. 장 개요

| 항목 | 내용 |
|------|------|
| 장 번호 | 7 |
| 장 제목 | 웹 앱 아키텍처 & AI 디자인 설계 |
| 장 유형 | Copilot/설계 장 |
| 목표 분량 | 620-680줄, ~35쪽 |
| 구성비 | 개념 20% + 실습 가이드 50% + 검증 20% + 과제 10% |
| 선수 지식 | Ch5(Next.js 기초), Ch6(상태 관리와 데이터 페칭) |
| 미션 | 코딩 전에 "뭘 만들지"를 확실히 잡는다 — AI 디자인 도구와 설계서가 바이브코딩의 품질을 결정한다 |

---

## 2. 학습 목표

이 장을 마치면 다음을 수행할 수 있다:
1. 설계 없는 바이브코딩이 왜 "AI 슬롭"을 만드는지 설명할 수 있다
2. 페이지 맵과 유저 플로우로 앱 구조를 설계할 수 있다
3. Copilot Vision과 v0를 활용하여 스케치/프롬프트를 코드로 변환할 수 있다
4. shadcn/ui를 설치하고 디자인 토큰으로 테마를 커스터마이징할 수 있다
5. 설계서(ARCHITECTURE.md + copilot-instructions.md)를 작성하여 AI에게 프로젝트 컨텍스트를 제공할 수 있다

---

## 3. 수업 타임라인

| 교시 | 시간대 | 주제 | 해당 절 |
|:---:|--------|------|---------|
| 1교시 | 00:00~00:50 | 왜 설계인가 + 페이지 구조 + 와이어프레임 개념 | 7.1~7.3.2 |
| 쉬는시간 | 00:50~01:00 | — | — |
| 2교시 | 01:00~01:50 | AI 와이어프레임 + shadcn/ui + 디자인 토큰 | 7.3.3~7.5 |
| 쉬는시간 | 01:50~02:00 | — | — |
| 3교시 | 02:00~02:50 | 설계서 통합 + 과제 | 7.6~7.7 |

---

## 4. 절 구성 및 분량 배분

### 1교시: "왜 설계인가" + 페이지 구조 + 와이어프레임 개념

#### 7.1 왜 설계가 먼저인가 (약 80줄, 개념)
- 7.1.1 설계 없는 바이브코딩의 문제점: "AI 슬롭"과 균일한 UI
  - 설계 없이 AI에게 "게시판 만들어줘" → 모든 학생이 동일한 결과물
  - 사례 비교: 설계 없이 생성 vs 설계서 제공 후 생성 (스크린샷 2장)
  - "AI 슬롭" 용어 정의: AI가 생성한 매력 없고 균일한 UI
- 7.1.2 AI는 디자인 감각이 없다 — 시각적 컨텍스트가 필요한 이유
  - AI는 텍스트 기반 → 시각적 의도를 "설명"해야 한다
  - 동일한 "로그인 페이지" 프롬프트에 디자인 컨텍스트 유무에 따른 차이
- 7.1.3 좋은 설계 = 좋은 프롬프트: 3단계 디자인 파이프라인
  - **탐색**(레퍼런스 수집) → **프로토타입**(와이어프레임/v0) → **코드**(Copilot+shadcn/ui)
  - **그림 7.1**: 3단계 디자인 파이프라인 플로우차트

#### 7.2 페이지 구조 설계 (약 70줄, 개념+실습)
- 7.2.1 어떤 페이지가 필요한가 (페이지 맵)
  - 게시판 앱 예시: 메인, 목록, 상세, 작성, 로그인, 프로필
  - **그림 7.2**: 페이지 맵 예시 (트리 다이어그램)
- 7.2.2 페이지별 URL 구조 정의 (Next.js App Router 기준)
  - 페이지 맵 → app 디렉토리 구조 변환
  - `app/`, `app/posts/[id]/`, `app/posts/new/`, `app/login/` 등
- 7.2.3 페이지 간 이동 흐름 (유저 플로우)
  - 사용자 시나리오별 화면 이동 경로
  - "비로그인 사용자가 글을 쓰려고 하면?" → 로그인 → 작성 → 목록

#### 7.3 AI로 와이어프레임 만들기 — 도입부 (약 40줄, 개념)
- 7.3.1 와이어프레임이란: 복잡한 디자인이 아닌 뼈대 잡기
  - 색상/이미지 없이 레이아웃과 정보 배치만 표현
  - 완벽한 디자인이 아닌 "의도 전달"이 목적
- 7.3.2 종이/화이트보드에서 시작하기
  - 손그림 스케치 활동 안내 (수업 중 5분)
  - 메인 페이지 + 상세 페이지 2장 스케치
  - > **강의 팁**: 학생들에게 종이와 펜 준비 안내. 못 그려도 상관없다고 강조
- **라이브 시연**: tldraw Make Real
  - 교수가 화이트보드에 손그림 → tldraw에서 HTML+Tailwind 코드 변환 시연
  - > **라이브 코딩 시연**: tldraw.com/make-real에서 간단한 카드 UI 스케치 → 코드 변환

**도구 비교표** (1교시 마무리):
- **표 7.1**: AI 디자인 도구 비교

| 도구 | 비용 | 입력 | 출력 | 용도 |
|------|------|------|------|------|
| Copilot Vision | 학생 무료 | 스케치/스크린샷 | React+Tailwind | 스케치→코드 (필수) |
| v0 by Vercel | 무료 7-15회/월 | 텍스트 프롬프트 | React+Tailwind+shadcn | 프로토타입 생성 (필수) |
| tldraw Make Real | 무료 | 캔버스 손그림 | HTML+Tailwind | 교수 시연용 |
| screenshot-to-code | 무료 OSS | 스크린샷 | React+Tailwind | 레퍼런스 분석용 |
| Figma MCP | 무료 플랜 | Figma 디자인 | 코드 연동 | 전문가 워크플로우 |
| Google Stitch | 무료 | 이미지/텍스트 | 프로토타입 | 전문가 워크플로우 |

---

### 2교시: AI 와이어프레임 + shadcn/ui + 디자인 토큰

#### 7.3 AI로 와이어프레임 만들기 — 실습부 (약 80줄, 실습 가이드)
- 7.3.3 Copilot Vision으로 스케치를 코드로 변환하기
  - > **함께 진행**: 1교시에 그린 종이 스케치를 스마트폰으로 촬영
  - Copilot Chat에 이미지 드래그 + 프롬프트 예시
  - > **Copilot 프롬프트**: "이 손그림 스케치를 Next.js + Tailwind CSS로 변환해줘. App Router 구조, shadcn/ui 컴포넌트 사용"
  - <!-- COPILOT_VERIFY: 손그림 스케치를 Copilot Chat에 드래그하여 코드 변환 결과를 캡처해주세요 -->
  - 생성된 코드 읽기 가이드: 레이아웃 구조, Tailwind 클래스, 컴포넌트 분리
- 7.3.4 v0로 프로토타입 생성하고 프로젝트에 통합하기
  - v0.dev에서 프롬프트 → React+Tailwind+shadcn 프로토타입 생성
  - `npx v0 add` 명령어로 프로젝트에 직접 통합
  - > **Copilot 프롬프트** (v0 대체): "게시판 앱의 메인 페이지를 만들어줘. 게시글 카드 리스트, 검색바, 글쓰기 버튼 포함. shadcn/ui Card, Input, Button 사용"
  - v0 출력 코드 읽기: 어떤 shadcn 컴포넌트를 사용했는지 확인

#### 7.4 shadcn/ui로 컴포넌트 시스템 구축하기 (약 100줄, 실습 가이드)
- 7.4.1 shadcn/ui란: 복사해서 쓰는 컴포넌트 라이브러리
  - npm 패키지가 아니라 코드를 프로젝트에 복사 → "코드 읽기" 교육에 최적
  - v0, Bolt, Lovable 등 AI 도구들이 모두 shadcn/ui 기반
  - Tailwind CSS + Radix UI 조합
- 7.4.2 npx shadcn init — 프로젝트에 설치하기
  - > **함께 진행**: `npx shadcn@latest init` 실행
  - 설치 옵션 안내 (style, base color, CSS variables 등)
  - 생성되는 파일 구조: `components/ui/`, `lib/utils.ts`, `tailwind.config.ts`
- 7.4.3 핵심 컴포넌트 추가: Button, Card, Input, Dialog
  - `npx shadcn@latest add button card input dialog`
  - **표 7.2**: shadcn/ui 핵심 컴포넌트

| 컴포넌트 | 용도 | 설치 명령 |
|----------|------|-----------|
| Button | 버튼 (variant: default, outline, ghost 등) | `npx shadcn@latest add button` |
| Card | 콘텐츠 카드 (Header, Content, Footer) | `npx shadcn@latest add card` |
| Input | 텍스트 입력 필드 | `npx shadcn@latest add input` |
| Dialog | 모달 대화상자 | `npx shadcn@latest add dialog` |
| Avatar | 사용자 프로필 이미지 | `npx shadcn@latest add avatar` |
| Badge | 태그/상태 표시 | `npx shadcn@latest add badge` |

  - 복사된 코드 읽기 가이드: `components/ui/button.tsx` 열어보기
- 7.4.4 테마 커스터마이징: CSS 변수로 디자인 토큰 설정
  - `app/globals.css`의 `:root` CSS 변수 설명
  - 색상 팔레트 변경 실습 (shadcn/ui 테마 생성기 활용)
  - **표 7.3**: 디자인 토큰 체계

| 카테고리 | CSS 변수 | 기본값 예시 | 용도 |
|----------|----------|-------------|------|
| 배경 | `--background` | `0 0% 100%` | 페이지 배경색 |
| 전경 | `--foreground` | `222.2 84% 4.9%` | 기본 텍스트색 |
| 주요색 | `--primary` | `222.2 47.4% 11.2%` | 주요 버튼, 링크 |
| 보조색 | `--secondary` | `210 40% 96.1%` | 보조 요소 |
| 강조색 | `--accent` | `210 40% 96.1%` | 호버, 강조 |
| 경계 | `--border` | `214.3 31.8% 91.4%` | 테두리 |
| 둥글기 | `--radius` | `0.5rem` | 모서리 반경 |

#### 7.5 디자인 프롬프트 전략 — AI에게 "우리 디자인"을 가르치기 (약 90줄, 실습 가이드+검증)
- 7.5.1 디자인 토큰이란: 색상, 타이포그래피, 간격의 체계화
  - 디자인 토큰 = AI가 일관된 UI를 생성하기 위한 "규칙 세트"
  - 토큰 없이 AI에게 요청 → 매번 다른 색상/간격 사용
- 7.5.2 copilot-instructions.md에 디자인 규칙 추가하기
  - Design Tokens 섹션 추가 예시
  - 색상 팔레트, 폰트, 간격 규칙 명시
  - <!-- COPILOT_VERIFY: copilot-instructions.md에 Design Tokens 추가 전/후 Copilot 응답 차이를 확인해주세요 -->
- 7.5.3 효과적인 디자인 프롬프트 5가지 전략
  - **표 7.4**: NN/g 기반 디자인 프롬프트 5가지 전략

| 전략 | 설명 | 예시 |
|------|------|------|
| ① 레퍼런스 제시 | 참고할 UI/사이트 이름 명시 | "Notion 스타일의 사이드바" |
| ② 제약 조건 명시 | 사용할 컴포넌트/색상 제한 | "shadcn/ui Card만 사용, primary 색상 위주" |
| ③ 반복 다듬기 | 한 번에 완성하지 않고 단계적 수정 | "간격을 더 넓게" → "폰트 크기 키워줘" |
| ④ 부정 프롬프트 | 하지 말아야 할 것 명시 | "그라디언트 사용 금지, 그림자 최소화" |
| ⑤ 역할 부여 | AI에게 디자인 역할 지정 | "미니멀리스트 UI 디자이너로서 답변해줘" |

  - **표 7.5**: 좋은 vs 나쁜 디자인 프롬프트 비교

| 구분 | 나쁜 프롬프트 | 좋은 프롬프트 |
|------|-------------|-------------|
| 색상 | "예쁜 색으로 해줘" | "primary: hsl(222, 47%, 11%), 배경은 흰색, 강조색은 blue-500 사용" |
| 레이아웃 | "깔끔하게 배치해줘" | "2열 그리드, 좌측에 사이드바(w-64), 우측에 메인 콘텐츠" |
| 컴포넌트 | "카드로 만들어줘" | "shadcn/ui Card 사용, CardHeader에 제목, CardContent에 본문, CardFooter에 작성일" |
| 반응형 | "모바일에서도 보이게" | "md 이상 2열 그리드, sm 이하 1열 스택, 사이드바는 모바일에서 숨김" |

- 7.5.4 좋은 디자인 프롬프트 vs 나쁜 디자인 프롬프트 종합 실습
  - 동일한 "프로필 페이지" 기능에 대해 모호한 vs 구체적 프롬프트 비교
  - > **Copilot 프롬프트** (나쁜 예): "프로필 페이지 만들어줘"
  - > **Copilot 프롬프트** (좋은 예): "사용자 프로필 페이지를 만들어줘. shadcn/ui Avatar(lg 사이즈), Card, Badge 사용. 상단에 아바타+이름+이메일, 하단에 내가 쓴 게시글 목록. 간격은 space-y-6, 최대 너비 max-w-2xl mx-auto"

---

### 3교시: 설계서 통합 + 과제

#### 7.6 설계서를 AI 컨텍스트로 통합하기 (약 100줄, 검증)
- 7.6.1 데이터 모델 설계: 테이블 구조 미리 잡기 (Supabase 대비)
  - 어떤 데이터가 필요한가: 사용자, 게시글, 댓글
  - 테이블 관계: 1:N (사용자 → 게시글 → 댓글)
  - Ch8에서 실제 Supabase 테이블로 생성할 구조를 미리 설계
- 7.6.2 ARCHITECTURE.md 작성: 페이지 맵 + 컴포넌트 계층 + 데이터 모델
  - **그림 7.3**: 컴포넌트 계층 구조 (트리 다이어그램)
  - ARCHITECTURE.md 템플릿 제공
  - 페이지 맵, 컴포넌트 계층, 데이터 모델을 하나의 문서로 통합
  - **그림 7.4**: 설계→컨텍스트→코드 변환 흐름 (시퀀스 다이어그램)
- 7.6.3 AI 생성 디자인 검증 체크리스트: 접근성, 반응형, 일관성
  - **표 7.6**: AI 디자인 검증 체크리스트

| 검증 항목 | 확인 내용 | 도구/방법 |
|-----------|----------|-----------|
| 반응형 | 모바일(375px), 태블릿(768px), 데스크톱(1280px)에서 레이아웃 확인 | DevTools 반응형 모드 |
| 접근성 | 이미지에 alt 속성, 버튼에 aria-label, 충분한 색상 대비 | Lighthouse 접근성 탭 |
| 일관성 | 모든 페이지에서 동일한 디자인 토큰(색상/간격/폰트) 사용 | 육안 비교 |
| 컴포넌트 | shadcn/ui 컴포넌트를 올바르게 사용했는가 | 코드 리뷰 |
| 네비게이션 | 모든 페이지 간 이동이 페이지 맵과 일치하는가 | 직접 클릭 테스트 |

- 7.6.4 @workspace + 설계 문서로 Copilot에게 코드 생성 지시하기
  - ARCHITECTURE.md + copilot-instructions.md 완성 후 @workspace 활용
  - <!-- COPILOT_VERIFY: @workspace로 ARCHITECTURE.md를 참조하여 코드 생성이 설계와 일치하는지 확인해주세요 -->
  - 설계가 달라지면 컨텍스트도 즉시 갱신한다

#### 7.7 과제: 개인 프로젝트 설계서 작성 (약 60줄, 과제)
- 과제 안내
  - 개인 프로젝트 주제 선정 (게시판 변형 권장)
  - 제출물 체크리스트:
    - ① 페이지 맵 (최소 4페이지)
    - ② AI 와이어프레임 (Copilot Vision 또는 v0로 생성한 프로토타입 2장 이상)
    - ③ shadcn/ui 테마 설정 (`npx shadcn init` 완료 + 색상 커스터마이징)
    - ④ 데이터 모델 (테이블 2개 이상 + 관계 정의)
    - ⑤ copilot-instructions.md (Design Tokens 섹션 포함)
    - ⑥ ARCHITECTURE.md (페이지 맵 + 컴포넌트 계층 + 데이터 모델)
  - GitHub 저장소에 push + Vercel 배포 URL 제출
- 실습 진행
- 과제 제출 + 마무리

---

## 5. 핵심 개념 및 용어

| 용어 | 영문 | 정의 |
|------|------|------|
| 디자인 토큰 | Design Token | 색상, 간격, 폰트 등 디자인 규칙을 CSS 변수로 체계화한 것 |
| 와이어프레임 | Wireframe | 페이지의 뼈대 구조를 색상/이미지 없이 단순하게 표현한 설계도 |
| 페이지 맵 | Page Map | 앱에 필요한 모든 페이지와 이동 경로를 정리한 도표 |
| AI 슬롭 | AI Slop | AI가 설계 없이 생성한 균일하고 매력 없는 UI |
| 유저 플로우 | User Flow | 사용자가 특정 목표를 달성하기까지의 화면 이동 경로 |
| 컴포넌트 라이브러리 | Component Library | 재사용 가능한 UI 부품 모음 (예: shadcn/ui) |
| 디자인 파이프라인 | Design Pipeline | 탐색→프로토타입→코드의 3단계 디자인 과정 |

---

## 6. 다이어그램 계획

| 번호 | 제목 | 유형 | 설명 |
|------|------|------|------|
| 그림 7.1 | 3단계 디자인 파이프라인 | 플로우차트 | 탐색(레퍼런스) → 프로토타입(와이어프레임/v0) → 코드(Copilot+shadcn) |
| 그림 7.2 | 페이지 맵 예시 | 트리 다이어그램 | 홈→목록→상세/작성, 로그인→프로필 등 페이지 계층 |
| 그림 7.3 | 컴포넌트 계층 구조 | 트리 다이어그램 | Layout → Header/Main/Footer → 하위 컴포넌트 |
| 그림 7.4 | 설계→컨텍스트→코드 변환 흐름 | 시퀀스 다이어그램 | 설계서 작성 → copilot-instructions.md/ARCHITECTURE.md → @workspace → 코드 생성 |

---

## 7. 표 계획

| 번호 | 제목 | 내용 |
|------|------|------|
| 표 7.1 | AI 디자인 도구 비교 | 이름/비용/입력/출력/용도 (Tier 1~3 도구) |
| 표 7.2 | shadcn/ui 핵심 컴포넌트 | 컴포넌트/용도/설치 명령 |
| 표 7.3 | 디자인 토큰 체계 | 카테고리/CSS 변수/기본값/용도 |
| 표 7.4 | NN/g 디자인 프롬프트 5가지 전략 | 전략/설명/예시 |
| 표 7.5 | 좋은 vs 나쁜 디자인 프롬프트 | 구분(색상/레이아웃/컴포넌트/반응형)별 비교 |
| 표 7.6 | AI 디자인 검증 체크리스트 | 검증 항목/확인 내용/도구 |

---

## 8. 실습 코드 계획

| 파일/폴더 | 내용 | 위치 |
|-----------|------|------|
| shadcn 초기화 프로젝트 | `npx shadcn@latest init` 완료된 Next.js 프로젝트 | practice/chapter7/ |
| components/ui/ | shadcn/ui 핵심 컴포넌트 (Button, Card, Input, Dialog, Avatar, Badge) | practice/chapter7/components/ui/ |
| app/globals.css | 커스터마이징된 디자인 토큰 (CSS 변수) | practice/chapter7/app/ |
| ARCHITECTURE.md | 설계서 템플릿 + 게시판 앱 예시 | practice/chapter7/ |
| .github/copilot-instructions.md | Design Tokens 섹션 포함된 확장 버전 | practice/chapter7/.github/ |

---

## 9. 교수 검증 필요 항목 (COPILOT_VERIFY)

| 번호 | 위치 | 검증 내용 |
|------|------|----------|
| 1 | 7.3.3 | 손그림 스케치를 Copilot Chat에 드래그하여 코드 변환 결과를 캡처 |
| 2 | 7.5.2 | copilot-instructions.md에 Design Tokens 추가 전/후 Copilot 응답 차이 확인 |
| 3 | 7.6.4 | @workspace로 ARCHITECTURE.md를 참조하여 코드 생성이 설계와 일치하는지 확인 |

---

## 10. 참고문헌 계획

1. Nielsen Norman Group. (2025). *Vague Prototyping with GenAI*. https://www.nngroup.com/articles/vague-prototyping/
2. Builder.io. (2025). *11 Prompting Tips for Generating Better UIs*. https://www.builder.io/blog/prompting-tips-ui
3. shadcn/ui 공식 문서. https://ui.shadcn.com/
4. v0 by Vercel 공식 문서. https://v0.dev/
5. Figma. (2025). *Design Systems and AI*. https://www.figma.com/blog/
6. tldraw Make Real. https://makereal.tldraw.com/
7. screenshot-to-code (OSS). https://github.com/abi/screenshot-to-code

---

## 11. 집필 시 주의사항

1. **Copilot/설계 장 비율 준수**: 개념 20% + 실습 가이드 50% + 검증 20% + 과제 10%
2. **도구 독립적 원칙**: Copilot Vision 중심이지만, 핵심 원리(디자인 토큰, 설계서, 검증)는 도구 불문 적용
3. **Ch5-6 연계**: Next.js App Router, 컴포넌트, 상태 관리는 이미 학습 완료 — 중복 설명 금지
4. **Ch8 브릿지**: 7.6.1 데이터 모델 설계가 Ch8의 "7장 설계서를 기반으로 테이블 생성"과 연결
5. **무료 도구 우선**: 모든 필수 도구는 학생 무료 사용 가능 확인 (Copilot=학생 무료, v0=무료 티어, shadcn/ui=OSS)
6. **코드는 읽기용**: shadcn/ui 컴포넌트 코드를 직접 타이핑이 아닌 "복사된 코드를 읽고 이해"하는 방식
7. **크로스 플랫폼**: `npx shadcn@latest` 명령어는 macOS/Windows 공통, 경로 구분자 주의

---

## 12. 현재 대비 변경 사항

### 추가된 것
- AI 디자인 도구 (Copilot Vision, v0, tldraw, screenshot-to-code)
- shadcn/ui 컴포넌트 시스템 (7.4 전체)
- 디자인 토큰 + copilot-instructions.md 통합 (7.5)
- NN/g 기반 디자인 프롬프트 5가지 전략
- AI 디자인 검증 체크리스트
- 3단계 디자인 파이프라인 개념
- AI 슬롭 개념 도입

### 이동/재구성
- 컴포넌트 계층 설계 → 7.6.2 ARCHITECTURE.md 작성으로 흡수
- 데이터 모델 설계 → 7.6.1로 이동 (Ch8 Supabase 브릿지)

### 삭제
- "심플한 디자인 원칙: 깔끔하고 명확하게" → 디자인 토큰과 NN/g 전략으로 대체
- "컴포넌트 트리와 데이터 흐름" 독립 절 → Ch5-6에서 이미 학습
- "어떤 컴포넌트가 상태를 가지는가" → Ch6 주제, 중복
- Hooks 심화 관련 모든 내용 (useEffect, useRef, useContext, useMemo, useCallback, 커스텀 Hook) → 현재 커리큘럼에서 Ch6에 통합됨

---

**작성일**: 2026-02-22

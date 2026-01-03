# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

# 학부생 강의교재 작성 프로젝트 템플릿

## 빠른 시작 명령어

### MS Word 변환
```bash
cd ms-word && npm install              # 의존성 설치 (최초 1회)
npm run convert:chapter 2              # 개별 챕터 변환 (예: 2장)
npm run convert:all                    # 모든 챕터 일괄 변환
npm run create:book                    # 완전한 통합 도서 생성
```

### Python 실습 환경
```bash
cd practice/chapter{N}
python -m venv venv
source venv/bin/activate               # macOS/Linux
# venv\Scripts\activate                # Windows
pip install -r code/requirements.txt
python code/{N}-{M}-{주제}.py          # 실습 코드 실행
```

---

## 프로젝트 개요

이 프로젝트는 **학부생 강의교재 자동 집필 시스템**의 범용 템플릿입니다.

### 도서 정보 (사용 시 수정)
- **제목**: {도서 제목}
- **부제**: {부제}
- **대상 독자**: 일반 학부생 (전공/비전공 구분 명시)
- **선수 지식**: {필요한 선수 과목/지식}
- **구성**: {N} Part / {M}장 / 약 {X}절
- **실습**: {Y}개
- **예상 분량**: {Z}페이지
- **최종 목차**: `contents.md` 참조

---

## 최우선 원칙

### 1. 분량 기준 (탄력적 적용)
| 항목 | 기준 |
|------|------|
| 장 전체 | 약 600-700줄 전후 (난이도/중요성에 따라 조정) |
| A4 페이지 | 약 35쪽 내외 |
| 이론:코드 | 70% : 30% |

**장 유형별 분량**:
- 핵심 개념 장: 600-700줄 (이론:실습 = 70:30)
- 기술 심화 장: 700-800줄 (이론:실습 = 50:50)
- 실습 중심 장: 550-650줄 (이론:실습 = 30:70)

**분량보다 이해도**: 위 기준은 가이드일 뿐이며, 학생의 이해와 학습 효과가 우선

### 2. 실제 실행 원칙
- 모든 코드는 실제 실행하여 결과 획득
- 더미/가상 데이터 금지
- "예시 출력입니다" 형태의 가상 결과 금지
- **크로스 플랫폼 호환성**: 모든 코드는 Windows와 macOS 모두에서 실행 가능해야 함
  - 경로 구분자는 `os.path.join()` 또는 `pathlib.Path` 사용
  - 플랫폼 특정 명령어 사용 금지
  - 경로 하드코딩 대신 상대 경로 또는 환경 변수 활용

### 3. 참고문헌 검증
- 허구의 참고문헌 절대 금지
- 모든 인용은 실재 검증된 문헌만
- URL/DOI 가능한 포함

### 4. 학습 중심 집필 방향

**핵심 원칙**: 학부생이 개념을 정확히 이해하고, 스스로 응용할 수 있도록 하는 것이 목표.

#### 4.1 단계적 설명 원칙
- **"왜 배우는가" → "무엇인가" → "어떻게 사용하는가"** 순서
- 추상적 개념은 구체적 예시와 비유로 먼저 설명
- 수학적 증명보다는 직관적 이해에 집중
- 핵심 개념은 반복적으로 다른 맥락에서 재등장

#### 4.2 코드 제시 원칙
- **핵심 코드만 본문에 포함** (3-5줄)
- **단계별 설명**: 코드를 한 줄씩 또는 블록별로 설명
- **전체 구현 코드는 별도 파일로 분리**: `practice/chapter{N}/code/`
- 파일명은 절 번호와 주제를 반영: `{N}-{M}-{주제}.py`
- 본문에서는 참조 형태로만 언급

#### 4.3 실행 결과와 해석 필수 (CRITICAL)
- **절대 금지**: 가상의 결과값, "예시 출력", 임의로 만든 숫자
- **필수**: 코드를 실제로 실행하여 얻은 결과만 본문에 포함
- 결과 해석 시 **"이 결과가 의미하는 바"**를 학생 눈높이에서 설명

#### 4.4 교재 필수 구성요소
각 장은 다음 요소를 반드시 포함한다:
- **학습목표**: 장 시작 시 3-5개의 명확한 학습목표 제시
- **핵심 용어**: 새로 등장하는 용어는 정의와 함께 강조 표시
- **예제**: 개념마다 최소 1개 이상의 구체적 예제
- **장 요약**: 장 끝에 핵심 내용 요약 (bullet point 형식 허용)
- **연습문제**: 장 끝에 5-10개의 연습문제 (난이도 표시: 기초/중급/심화)

#### 4.5 표준 참조 문서
**집필 시 반드시 참조**: `docs/sample.md`
- practice 폴더 참조 형식: `_전체 코드는 practice/chapter{N}/code/{파일명}.py 참고_`

---

## 폴더 구조

```
project/
├── CLAUDE.md              # 이 파일 - 프로젝트 컨텍스트
├── AGENTS.md              # 운영 규칙
├── contents.md            # 최종 목차 및 집필 방향
├── schema/                # 집필계획서
│   └── chap{N}.md
├── .claude/
│   └── agents/            # 서브에이전트 정의 (6개)
│       ├── planner.md     # 집필계획자
│       ├── researcher.md  # 리서처
│       ├── writer.md      # 작가
│       ├── coder.md       # 코드작성자
│       ├── reviewer.md    # 검토자
│       └── graphic.md     # 그래픽
├── content/
│   ├── research/          # 리서치 결과
│   ├── drafts/            # 원고 초안
│   ├── graphics/          # 다이어그램/시각자료
│   └── reviews/           # LLM 리뷰 결과
├── docs/                  # 최종 완성 원고 (검토 완료)
│   ├── sample.md          # 집필 표준 참조 문서
│   └── ch{N}.md
├── practice/              # 실습 코드 및 데이터
│   └── chapter{N}/
│       ├── code/          # 실행 가능한 전체 코드
│       │   ├── {N}-{M}-{주제}.py
│       │   └── requirements.txt
│       └── data/          # 실제/가상 데이터
│           ├── input/
│           └── output/
├── ms-word/               # MS Word 변환 시스템
│   ├── config/            # 설정 파일
│   ├── src/               # 변환 스크립트
│   ├── output/            # 생성된 Word 파일
│   └── templates/         # 템플릿 (머리말, 참고문헌 등)
├── checklists/            # 진행 체크리스트
├── scripts/               # 자동화 스크립트
└── _archive/              # 이전 프로젝트 백업
```

---

## 7단계 워크플로우

```
[1단계: Planning] ⭐ Claude Code Plan Mode 사용
    EnterPlanMode
        │
    @planner ── 집필계획서 작성 ──▶ schema/chap{N}.md
        │
    ExitPlanMode (사용자 승인)
        │
        ▼
[2단계: Information Gathering]
    @researcher ── 자료 조사 ──▶ content/research/
        │
        ▼
[3단계: Analysis]
    정보 구조화 및 핵심 통찰 추출
        │
        ▼
[4단계: Implementation & Documentation]
    ├── @coder ── 코드 우선 작성 ──▶ practice/chapter{N}/code/
    ├── @writer ── 결과 기반 문서화 ──▶ content/drafts/
    └── @graphic ── 시각자료 ──▶ content/graphics/
        │
        ▼
[5단계: Optimization]
    일관성 및 완성도 검증
        │
        ▼
[6단계: Quality Verification]
    @reviewer ── 품질 검토 ──▶ docs/ch{N}.md (최종 완성본)
        │
        ▼
[7단계: MS Word Conversion]
    MS Word 변환 시스템 ──▶ ms-word/output/*.docx
```

### 필수 단계 (5-7단계는 자동 수행)

**CRITICAL**: 4단계 완료 후 5-6-7단계를 **자동으로 연속 수행**한다.

#### 작업 명령어 해석 기준
| 사용자 명령 | 수행 범위 | 비고 |
|---|---|---|
| "N장 작성" | 1~7단계 전체 | **모든 단계 자동 수행** (Word 변환 포함) |
| "N장 검토" | 5~7단계 | 일관성 검증 + 품질 리뷰 + Word 변환 |
| "N장 변환" | 7단계만 | docs/ch{N}.md → Word |

---

## 에이전트 라우팅 규칙

### @planner (집필계획자)
- **트리거**: "계획", "스키마", "집필계획서", "구성"
- **도구**: **Claude Code Plan Mode** (EnterPlanMode → 탐색/계획 → ExitPlanMode)
- **출력**: `schema/chap{N}.md`

### @researcher (리서처)
- **트리거**: "조사해줘", "리서치", "자료 찾아줘", "참고문헌"
- **출력**: `content/research/ch{N}-{절}.md`

### @writer (작가)
- **트리거**: "작성해줘", "초안", "원고", "본문"
- **출력**: `content/drafts/ch{N}-{절}.md`

### @coder (코드작성자)
- **트리거**: "코드", "실습", "예제", "구현"
- **출력**: `practice/chapter{N}/code/`

### @reviewer (검토자)
- **트리거**: "검토", "리뷰", "피드백", "수정"
- **출력**: 인라인 피드백 또는 `docs/ch{N}.md`

### @graphic (그래픽)
- **트리거**: "다이어그램", "그래픽", "플로우차트", "아키텍처"
- **출력**: `content/graphics/ch{N}/`

---

## 핵심 작업 규칙

### 문체 가이드 (교재 친화적 글쓰기)
- **문체**: 친근하면서도 명확한 설명체, 학생과 대화하듯 서술
- **종결어미**:
  - 본문: 격식체 평서문 ('이다', '한다', '보인다')
  - 예시/팁: 비격식체 허용 ('~해보자', '~라고 할 수 있다')
- **문장 구조**: 짧고 명확한 문장 선호, 한 문장에 하나의 개념
- **용어**: 전문 용어는 첫 등장 시 **굵게** 표시 + 영문 병기 (예: "**합성곱 신경망**(CNN, Convolutional Neural Network)")
- **난이도 조절**: 어려운 개념은 "쉽게 말해서..." 또는 "비유하자면..."으로 보충 설명

### 수식 표기 (Unicode 인라인)
```
✅ 올바름: Yᵢₜ = αᵢ + λₜ + δ·Dᵢₜ + εᵢₜ
❌ 금지: $Y_{it} = \alpha_i + \lambda_t$ (LaTeX)
```

### 코드 스타일
- Python 3.10+
- PEP 8 준수
- 한국어 주석/docstring
- 실제 실행 결과만 사용

### 참고문헌 형식
```
저자명. (연도). 논문제목. *저널명*. URL/DOI
```

### 표/그림 제목 형식
- **표 제목**: 표 위에 작성 (`**표 2.1** 제목`)
- **그림 제목**: 그림 아래에 작성 (`**그림 3.2** 제목`)
- **번호 체계**: `{장번호}.{순번}`

---

## 환경 변수 (.env)

```bash
# Multi-LLM 리뷰 (선택)
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...

# 웹 스크래핑 (선택)
FIRECRAWL_API_KEY=...

# Google AI (Gemini) - MCP 서버용
GEMINI_API_KEY=AIzaSyAUm5BMwxb6ldDM3nv2FS4aNJglCbCgJ4E
```

---

## 개발 도구 설정

### MCP 서버 (Nano Banana)

**Nano Banana MCP**는 Gemini Vision 및 이미지 생성 기능을 Claude Code에서 사용할 수 있게 하는 MCP 서버입니다.

#### 설치 위치
프로젝트 외부에 설치하여 여러 프로젝트에서 공통 사용:
```
~/Documents/mcp-servers/nanobanana-mcp/
```

#### 설치 방법

1. **저장소 클론 및 빌드**
   ```bash
   cd ~/Documents
   mkdir -p mcp-servers
   cd mcp-servers
   git clone https://github.com/YCSE/nanobanana-mcp.git
   cd nanobanana-mcp
   npm install
   npm run build
   ```

2. **API 키 설정**
   프로젝트 루트의 `.env` 파일에 추가 (또는 MCP 등록 시 환경 변수로 전달):
   ```bash
   GEMINI_API_KEY=AIzaSyAUm5BMwxb6ldDM3nv2FS4aNJglCbCgJ4E
   ```

3. **Claude Code에 MCP 서버 등록**
   ```bash
   claude mcp add nanobanana-mcp "node" \
     "/Users/callii/Documents/mcp-servers/nanobanana-mcp/dist/index.js" \
     -e "GEMINI_API_KEY=AIzaSyAUm5BMwxb6ldDM3nv2FS4aNJglCbCgJ4E"
   ```

4. **Claude Code 재시작**
   MCP 서버 등록 후 Claude Code를 재시작하여 변경사항 적용

#### 사용 가능 기능
- Gemini Vision API를 통한 이미지 분석
- AI 기반 이미지 생성
- 교재 작성 시 그래픽 리소스 생성 보조

#### 참고
- 공식 저장소: https://github.com/YCSE/nanobanana-mcp
- 다른 유사 프로젝트:
  - ConechoAI/Nano-Banana-MCP
  - chongdashu/cc-skills-nanobananapro

---

## 체크리스트 위치

진행 상황은 `checklists/book-progress.md`에서 추적합니다.

---

## MS Word 변환 시스템

### 개요
완성된 Markdown 원고(`docs/ch{N}.md`)를 전문적인 MS Word 문서(`.docx`)로 변환합니다.

### 사용법
```bash
cd ms-word
npm install                    # 의존성 설치 (최초 1회)
npm run convert:chapter 2      # 개별 챕터 변환
npm run convert:all            # 모든 챕터 일괄 변환
npm run create:book            # 완전한 통합 도서 생성
```

### 출력 파일
- **개별 챕터**: `ms-word/output/ch{N}.docx`
- **통합 도서**: `ms-word/output/{project}-complete-book.docx`

---

## 현재 프로젝트 상태

### 도서 정보
- **제목**: (미정 - contents.md에서 설정)
- **도서 유형**: 학부생 강의교재
- **현재 단계**: 템플릿 구축 완료

### 완료된 설정
- ✅ 6개 전문 에이전트 구성
- ✅ 7단계 워크플로우 정의
- ✅ 디렉토리 구조 생성
- ✅ 학부생 강의교재 형식으로 전환
- ⏳ contents.md 작성 대기
- ⏳ MS Word 변환 시스템 구축 대기

---

**마지막 업데이트**: 2026-01-01
**템플릿 버전**: 1.0

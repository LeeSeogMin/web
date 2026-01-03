# 제3장 리서치 결과: HTML 시맨틱과 접근성

**조사일**: 2026-01-01
**조사 방법**: MCP 웹 검색

---

## 1. HTML5 시맨틱 요소 최신 동향

### 핵심 시맨틱 태그 정의

| 태그 | 역할 | 사용 시점 |
|------|------|----------|
| `<header>` | 소개/내비게이션 콘텐츠 | 페이지/섹션 상단, 로고/검색바/메뉴 포함 |
| `<nav>` | 내비게이션 링크 블록 | 사이트 전체 메뉴, 페이지 내 링크 그룹 |
| `<main>` | 페이지 주요 콘텐츠 | **페이지당 1개만** 사용 |
| `<section>` | 주제별 콘텐츠 그룹 | heading이 있는 주제별 영역 |
| `<article>` | 독립적 배포 가능 콘텐츠 | 블로그 포스트, 뉴스 기사, 댓글 |
| `<aside>` | 보조 콘텐츠 | 사이드바, 광고, 관련 링크 |
| `<footer>` | 바닥글 콘텐츠 | 저작권, 연락처, 관련 링크 |

### 2025 Best Practices

1. **div 남용 금지**: 시맨틱 태그로 대체 가능하면 div 사용 자제
2. **main은 페이지당 1개**: 고유한 주요 콘텐츠만 포함
3. **heading 계층 준수**: h1 → h2 → h3 순서, 레벨 건너뛰기 금지
4. **얕은 중첩 유지**: 문서 아웃라인 단순화
5. **CSS가 아닌 의미로 태그 선택**: h1을 큰 글씨용으로 쓰지 않음

### 시맨틱 마크업의 이점

- **접근성**: 스크린 리더가 페이지 구조 파악 용이
- **SEO**: 검색 엔진이 콘텐츠 우선순위 이해
- **유지보수성**: 코드 가독성과 협업 효율 향상
- **성능**: 중첩 div 감소로 HTML 페이로드 축소

**출처**:
- [W3Schools - HTML Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp)
- [web.dev - Semantic HTML](https://web.dev/learn/html/semantic-html)
- [Semrush - Semantic HTML5 Guide](https://www.semrush.com/blog/semantic-html5-guide/)

---

## 2. WCAG 2.2 접근성 가이드라인

### WCAG 2.2 개요

- **발행일**: 2023년 10월 5일 (W3C Recommendation)
- **WCAG 2.1 대비**: 9개 신규 성공 기준 추가
- **주요 개선**: 포커스 가시성, 모바일 사용성, 인지 접근성, 대체 인증

### 준수 레벨

| 레벨 | 설명 | 법적 요구 |
|------|------|----------|
| A | 최소 기준 | 필수 |
| AA | 표준 기준 | 법적 표준 (ADA, EAA) |
| AAA | 최고 기준 | 정부/의료 권장 |

### 2025 법적 요구사항

- **미국 ADA Title II**: WCAG 2.1 AA 준수 요구 (2026년까지 5만 이상 기관, 2027년까지 5만 미만)
- **유럽 EAA**: 2025년 6월 28일부터 WCAG 2.1 AA 적용
- **ISO/IEC 40500:2025**: WCAG 2.2와 동일

### 핵심 원칙 (POUR)

1. **Perceivable (인식성)**: 정보를 인식할 수 있어야 함
2. **Operable (운용성)**: UI를 조작할 수 있어야 함
3. **Understandable (이해성)**: 정보와 UI가 이해 가능해야 함
4. **Robust (견고성)**: 다양한 기술에서 호환되어야 함

**출처**:
- [W3C - WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [W3C - What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
- [AllAccessible - WCAG 2.2 Complete Guide 2025](https://www.allaccessible.org/blog/wcag-22-complete-guide-2025)

---

## 3. ARIA 속성 Best Practices

### ARIA 첫 번째 규칙

> "네이티브 HTML로 구현 가능하면 ARIA를 사용하지 마라."

WebAIM 조사: ARIA가 있는 페이지가 없는 페이지보다 **41% 더 많은 오류** 발생

### aria-label vs aria-labelledby

| 속성 | 사용 시점 | 예시 |
|------|----------|------|
| `aria-labelledby` | 화면에 보이는 라벨이 있을 때 | 다른 요소의 id 참조 |
| `aria-label` | 보이는 라벨이 없을 때 | 아이콘 버튼, 복잡한 컨트롤 |

### 우선순위 규칙

```
네이티브 HTML > aria-labelledby > aria-label > 보이는 텍스트
```

### 주의사항

1. `aria-label`은 번역되지 않음 → 다국어 사이트에서 주의
2. 같은 요소에 둘 다 사용 시 `aria-labelledby`가 우선
3. 역할(role)이 정의된 요소에만 사용
4. 일관성 유지: 시각적 라벨과 접근 가능한 이름 일치

**출처**:
- [MDN - aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label)
- [MDN - aria-labelledby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-labelledby)
- [A11Y Collective - aria-label vs aria-labelledby](https://www.a11y-collective.com/blog/aria-label-vs-aria-labelledby/)

---

## 4. 폼 접근성 Best Practices

### 라벨 연결 방법

**방법 1: 명시적 연결 (for/id)**
```html
<label for="email">이메일</label>
<input type="email" id="email">
```

**방법 2: 암시적 연결 (중첩)**
```html
<label>
  이메일
  <input type="email">
</label>
```

### 핵심 원칙

1. **네이티브 HTML 우선**: `<label>`, `<fieldset>`, `<legend>` 활용
2. **placeholder ≠ label**: placeholder는 접근 가능한 이름이 아님
3. **필수 필드 표시**: `aria-required="true"` 또는 `required` 속성
4. **그룹화**: 관련 입력 요소는 `<fieldset>` + `<legend>`로 그룹화
5. **autocomplete 활용**: 개인정보 필드에 적절한 autocomplete 값 제공

### 라벨의 이점

- 클릭 영역 확대 (특히 체크박스/라디오)
- 스크린 리더가 입력 목적 안내
- 소형 화면에서 UX 개선

**출처**:
- [W3C WAI - Labeling Controls](https://www.w3.org/WAI/tutorials/forms/labels/)
- [WebAIM - Creating Accessible Forms](https://webaim.org/techniques/forms/controls)
- [Deque - Anatomy of Accessible Forms](https://www.deque.com/blog/anatomy-of-accessible-forms-best-practices/)

---

## 5. Chrome Lighthouse 접근성 감사

### 사용 방법

1. Chrome에서 페이지 열기
2. DevTools 열기 (F12 또는 우클릭 → 검사)
3. Lighthouse 탭 선택
4. Accessibility 체크박스 선택
5. "Analyze page load" 클릭

### 점수 계산 방식

- axe-core 라이브러리 기반
- 개별 감사 항목별 가중치 적용
- 합격/불합격 (부분 점수 없음)
- 0-100점 척도

### 100점의 의미와 한계

**100점 = 자동화 검사 통과**

그러나 다음은 검사하지 않음:
- 키보드 내비게이션 (탭 순서, 포커스 트랩)
- 논리적 읽기 순서
- 스크린 리더 실제 경험
- 색상 대비 미세 조정

### 추가 도구

| 도구 | 특징 | URL |
|------|------|-----|
| WAVE | 시각적 오류 표시 | wave.webaim.org |
| axe DevTools | 상세한 분석 | 브라우저 확장 |
| NVDA | 무료 스크린 리더 | nvaccess.org |

**출처**:
- [Chrome Developers - Lighthouse Accessibility](https://developer.chrome.com/docs/lighthouse/accessibility/scoring)
- [DebugBear - Understanding Lighthouse Accessibility](https://www.debugbear.com/blog/lighthouse-accessibility)
- [Microsoft - Test Accessibility with Lighthouse](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/accessibility/lighthouse)

---

## 6. 학부생 교육 시 강조점

### 왜 접근성이 중요한가?

1. **법적 의무**: ADA, EAA 등 법규 준수 필수
2. **사용자 확대**: 전 세계 인구 15%가 장애를 가짐
3. **SEO 이점**: 접근성 좋은 사이트가 검색 순위도 높음
4. **모두를 위한 개선**: 접근성은 모든 사용자의 UX 향상

### 실습 중심 접근

1. **Before/After 비교**: 비접근적 코드 → 접근적 코드 변환
2. **직접 체험**: 키보드만으로 사이트 탐색해보기
3. **도구 활용**: Lighthouse 점수 100점 도전
4. **체크리스트**: 실무에서 바로 쓸 수 있는 점검표

---

**조사 완료일**: 2026-01-01

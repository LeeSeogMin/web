# 제4장 리서치 결과: CSS 레이아웃과 반응형 디자인

**조사일**: 2026-01-01
**조사 방법**: MCP 웹 검색

---

## 1. CSS 선택자와 우선순위

### 우선순위 계층 (Specificity Hierarchy)

| 순위 | 선택자 유형 | 점수 | 예시 |
|------|------------|------|------|
| 1 | 인라인 스타일 | 1,0,0,0 | `style="..."` |
| 2 | ID 선택자 | 0,1,0,0 | `#header` |
| 3 | 클래스/속성/가상클래스 | 0,0,1,0 | `.nav`, `[type]`, `:hover` |
| 4 | 요소/가상요소 | 0,0,0,1 | `div`, `::before` |
| 5 | 전역 선택자 | 0,0,0,0 | `*` |

### 우선순위 계산 규칙

- ID 1개 = 클래스 1000개보다 높음
- 같은 우선순위면 나중에 선언된 것이 적용
- `!important`는 모든 것을 덮어씀 (사용 자제)
- `:where()` 안의 선택자는 우선순위 0

**출처**:
- [MDN - Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
- [CSS-Tricks - Specifics on CSS Specificity](https://css-tricks.com/specifics-on-css-specificity/)

---

## 2. Flexbox 핵심 정리

### 주요 정렬 속성

| 속성 | 대상 | 축 | 설명 |
|------|------|------|------|
| `justify-content` | container | 주축 | 아이템 전체 정렬 |
| `align-items` | container | 교차축 | 아이템 전체 정렬 |
| `align-self` | item | 교차축 | 개별 아이템 정렬 |
| `align-content` | container | 교차축 | 여러 줄 정렬 |
| `gap` | container | 양축 | 아이템 간격 |

### justify-content 값

- `flex-start`: 시작점 정렬 (기본값)
- `flex-end`: 끝점 정렬
- `center`: 중앙 정렬
- `space-between`: 양끝 정렬, 사이 균등
- `space-around`: 아이템 주변 균등 여백
- `space-evenly`: 모든 간격 균등

### align-items 값

- `stretch`: 교차축 방향으로 늘림 (기본값)
- `flex-start`: 시작점 정렬
- `flex-end`: 끝점 정렬
- `center`: 중앙 정렬
- `baseline`: 텍스트 기준선 정렬

### 완벽한 중앙 정렬 패턴

```css
.container {
    display: flex;
    justify-content: center;  /* 수평 중앙 */
    align-items: center;      /* 수직 중앙 */
}
```

### auto margin 기법

```css
/* 오른쪽으로 밀기 */
.push-right {
    margin-left: auto;
}
```

**출처**:
- [CSS-Tricks - A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [MDN - Aligning items in a flex container](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Aligning_items)

---

## 3. CSS Grid 핵심 정리

### grid-template-columns

```css
/* 고정 너비 */
grid-template-columns: 200px 1fr 200px;

/* 균등 분할 */
grid-template-columns: 1fr 1fr 1fr;
grid-template-columns: repeat(3, 1fr);

/* 반응형 (미디어 쿼리 없이) */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

### grid-template-areas

```css
.container {
    display: grid;
    grid-template-areas:
        "header header header"
        "sidebar content content"
        "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }
```

### 2025년 주요 기법

1. **Intrinsic Responsive Grid**: `repeat(auto-fit, minmax())` 활용
2. **Subgrid**: 자식 그리드가 부모 트랙 상속 (브라우저 지원 완료)
3. **Container Queries + Grid**: 컨테이너 크기 기반 반응형

### Flexbox vs Grid

| 상황 | 추천 |
|------|------|
| 1차원 (행 또는 열) | Flexbox |
| 2차원 (행과 열) | Grid |
| 컴포넌트 내부 정렬 | Flexbox |
| 페이지 전체 레이아웃 | Grid |
| 동적 아이템 개수 | Flexbox |
| 명확한 그리드 구조 | Grid |

**출처**:
- [CSS-Tricks - A Complete Guide to CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Josh W. Comeau - An Interactive Guide to CSS Grid](https://www.joshwcomeau.com/css/interactive-guide-to-grid/)

---

## 4. 반응형 디자인 Best Practices

### 모바일 퍼스트 접근법

> 2025년 웹 트래픽의 70% 이상이 모바일에서 발생

- 가장 작은 화면부터 디자인
- `min-width` 미디어 쿼리 사용 (확대 방향)
- 기본 스타일 = 모바일 스타일

```css
/* 모바일 퍼스트 */
.container { width: 100%; }

@media (min-width: 768px) {
    .container { width: 750px; }
}

@media (min-width: 1024px) {
    .container { width: 970px; }
}
```

### 2025년 권장 브레이크포인트

| 기기 | 브레이크포인트 | 용도 |
|------|--------------|------|
| 소형 모바일 | 320px | 기본 (미디어 쿼리 없음) |
| 대형 모바일 | 576px | 큰 스마트폰 |
| 태블릿 | 768px | 태블릿 세로 |
| 소형 데스크톱 | 992px | 태블릿 가로, 노트북 |
| 대형 데스크톱 | 1200px | 데스크톱 모니터 |

### 콘텐츠 기반 브레이크포인트

기기 크기가 아닌 콘텐츠가 깨지는 지점에서 브레이크포인트 설정

### 현대적 접근법

- Flexbox/Grid의 기본 반응형 기능 활용
- `repeat(auto-fit, minmax())` 패턴
- Container Queries 활용 (컴포넌트 기반)

### SEO 영향

Google 모바일 퍼스트 인덱싱: 모바일 버전이 검색 순위에 직접 영향

**출처**:
- [BrowserStack - Responsive Design Breakpoints 2025](https://www.browserstack.com/guide/responsive-design-breakpoints)
- [MDN - Responsive Web Design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)

---

## 5. 박스 모델

### 구성 요소

- **content**: 실제 콘텐츠 영역
- **padding**: 콘텐츠와 테두리 사이 여백
- **border**: 테두리
- **margin**: 요소 바깥 여백

### box-sizing

```css
/* content-box (기본값) */
/* width = 콘텐츠 너비만 */
width: 200px; /* + padding + border = 실제 크기 */

/* border-box (권장) */
/* width = 콘텐츠 + padding + border */
box-sizing: border-box;
width: 200px; /* 실제 크기 = 200px */
```

### 전역 설정 패턴

```css
*, *::before, *::after {
    box-sizing: border-box;
}
```

---

## 6. 학부생 교육 시 강조점

### 시각적 이해

- 박스 모델: DevTools로 실시간 확인
- Flexbox/Grid: 라이브 데모로 속성 효과 체험
- 반응형: 뷰포트 크기 조절하며 확인

### 실전 패턴 중심

- 내비게이션 바 (Flexbox)
- 카드 그리드 (Grid + auto-fit)
- 성배 레이아웃 (Grid areas)

### 점진적 학습

1. 박스 모델 이해
2. Flexbox로 1차원 정렬
3. Grid로 2차원 레이아웃
4. 미디어 쿼리로 반응형

---

**조사 완료일**: 2026-01-01

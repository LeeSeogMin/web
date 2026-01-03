# 14장 리서치: 프로젝트 설계

## 1. 유저 스토리 (User Story)

### 표준 형식
```
"As a <사용자 유형>, I want <목표> so that <이유>"
"<사용자>로서, <기능>을 원한다, 왜냐하면 <가치>이기 때문이다"
```

### 3C 프레임워크 (Ron Jeffries, 2001)
- **Card**: 스토리의 간략한 설명
- **Conversation**: 세부 사항을 논의하는 대화
- **Confirmation**: 완료 여부를 판단하는 테스트/인수 조건

### INVEST 원칙
좋은 유저 스토리는 INVEST 원칙을 따른다:
- **I**ndependent: 독립적
- **N**egotiable: 협상 가능
- **V**aluable: 가치 있음
- **E**stimable: 추정 가능
- **S**mall: 작음
- **T**estable: 테스트 가능

### 인수 조건 (Acceptance Criteria)
- 스토리 완료 기준을 명확히 정의
- Given-When-Then 형식 권장
- 예: Given 로그인 상태일 때, When 게시글 작성 버튼 클릭, Then 작성 폼 표시

---

## 2. MoSCoW 우선순위

### 개요
- Dai Clegg (1994, Oracle)가 개발
- DSDM, 애자일 개발에서 널리 사용
- 시간 제약 내 핵심 요구사항 집중

### 4가지 분류
| 분류 | 의미 | 비율 권장 |
|------|------|-----------|
| **Must Have** | 필수, MVP 구성 요소 | ~60% |
| **Should Have** | 중요하지만 연기 가능 | ~20% |
| **Could Have** | 있으면 좋음, 시간 허락 시 | ~20% |
| **Won't Have** | 이번 릴리즈 제외 | - |

### 주의사항
- Must Have가 60% 초과하면 위험
- 같은 분류 내 순위 결정은 별도 기준 필요
- Won't Have는 "안 함"이 아니라 "지금은 안 함"

---

## 3. ERD (Entity-Relationship Diagram)

### 개요
- Peter Chen (1970s, Carnegie-Mellon)이 개발
- 데이터베이스 설계의 표준 도구
- 엔티티, 속성, 관계를 시각화

### 구성 요소
1. **엔티티(Entity)**: 사각형, 데이터를 저장할 대상 (예: User, Post)
2. **속성(Attribute)**: 타원, 엔티티의 특성 (예: name, email)
3. **관계(Relationship)**: 마름모, 엔티티 간 연결 (예: "작성한다")
4. **카디널리티**: 관계의 수량 (1:1, 1:N, N:M)

### ERD 레벨
- **개념적 모델**: 고수준, 비즈니스 개념
- **논리적 모델**: 속성, 관계 상세화
- **물리적 모델**: 실제 테이블, 컬럼, 자료형

### 게시판 ERD 예시
```
[users] 1 ──< N [posts] N >── M [tags]
         └─< N [comments]
```

---

## 4. 권한 설계

### 역할 기반 접근 제어 (RBAC)
- 사용자를 역할에 할당
- 역할에 권한 부여
- 개별 사용자 관리보다 효율적

### 일반적 역할
- **Anonymous**: 비로그인 사용자
- **Member**: 일반 회원
- **Admin**: 관리자

### 권한 매트릭스
```
         | Create | Read | Update | Delete
---------|--------|------|--------|-------
Anonymous|   ✗    |  ✓   |   ✗    |   ✗
Member   |   ✓    |  ✓   |  본인   |  본인
Admin    |   ✓    |  ✓   |   ✓    |   ✓
```

---

## 5. AI 협업 전략

### AI 적합 작업
- 보일러플레이트 코드 생성
- 반복적인 CRUD 구현
- CSS 스타일링
- 테스트 코드 작성
- 문서화, 주석

### 인간 필수 작업
- 비즈니스 로직 설계
- 보안 정책 결정
- 아키텍처 선택
- 코드 리뷰 및 검증
- 최종 승인

### 검증 포인트
1. 생성된 코드가 프로젝트 버전과 호환되는가?
2. 보안 취약점이 없는가?
3. 기존 코드 스타일과 일관되는가?
4. 실제 실행하여 동작을 확인했는가?

---

## 참고 자료
- Mountain Goat Software. *User Stories*
- ProductPlan. *MoSCoW Prioritization*
- Lucidchart. *ER Diagrams*
- Visual Paradigm. *ERD Guide*

# Chapter 11. Row Level Security (RLS) — B회차: 실습

> **미션**: 게시판에 RLS 정책을 적용하고, 권한 검증을 통과한 뒤 배포한다

---

## 수업 타임라인

**표 11.6** B회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | A회차 핵심 리캡 + 과제 스펙 확인 |
| 00:05~00:10 | 바이브코딩 가이드 + 스타터 코드 안내 |
| 00:10~00:30 | 체크포인트 1: posts 테이블 RLS 4대 정책 |
| 00:30~00:50 | 체크포인트 2: profiles 테이블 RLS + 권한 테스트 |
| 00:50~01:05 | 체크포인트 3: 검증 + 배포 |
| 01:05~01:10 | Google Classroom 제출 |
| 01:10~01:25 | 결과 공유 + 코드리뷰 토론 |
| 01:25~01:30 | 교수 종합 피드백 + 다음 주 예고 |

---

## 과제 스펙 + 스타터 코드 안내

### 과제 요구사항

Ch10에서 완성한 CRUD 게시판에 RLS 정책을 적용하여 데이터베이스 수준 보안을 구현한다:

① posts 테이블 RLS 활성화 + 4대 정책 생성
② profiles 테이블 RLS 적용
③ 다른 계정으로 수정/삭제 차단 테스트
④ GitHub push + Vercel 배포

### 스타터 코드

`practice/chapter11/starter/` 폴더에 Ch10 완성 코드 기반이며, `supabase/policies.sql`에 TODO로 정책 작성 가이드가 제공된다.

```
practice/chapter11/starter/
├── app/                     ← Ch10 완성 코드 (CRUD 동작)
├── lib/                     ← Supabase 클라이언트 + 인증 + CRUD
├── supabase/
│   └── policies.sql         ← RLS 정책 SQL (TODO)
├── package.json
└── next.config.ts
```

**시작 방법** (PowerShell 기준):
```bash
cd practice/chapter11/starter
npm install
npm run dev
```
macOS Terminal도 동일하다.

이 장의 핵심은 SQL Editor에서 RLS 정책을 작성하는 것이므로, 코드 수정보다 Supabase 대시보드 작업이 중심이다.

---

## 바이브코딩 가이드

> **Copilot 활용**: 이번 실습에서는 Copilot Chat에 RLS 정책 SQL을 요청한다. 보안 정책은 한 글자 실수로도 전체 데이터가 노출될 수 있으므로, A회차에서 배운 USING vs WITH CHECK 규칙으로 반드시 검증한다.

**좋은 프롬프트 vs 나쁜 프롬프트**:

❌ 나쁜 프롬프트:
> "게시판 보안 만들어줘"

문제: 어떤 테이블에, 어떤 작업에, 어떤 조건으로 정책을 만들지 전혀 명시되지 않았다.

✅ 좋은 프롬프트:


> [버전 고정] Next.js 14.2.21, React 18.3.1, Tailwind CSS 3.4.17, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2 기준으로 작성해줘.
> [규칙] App Router만 사용하고 next/router, pages router, 구버전 API는 사용하지 마.
> [검증] 불확실하면 현재 프로젝트 package.json 기준으로 버전을 먼저 확인하고 답해줘.
> "Supabase posts 테이블에 RLS 정책 4개를 SQL로 작성해줘:
> 1) SELECT: 누구나 읽기 가능 (USING true)
> 2) INSERT: 로그인한 사용자만 작성 (WITH CHECK auth.uid() = user_id)
> 3) UPDATE: 작성자만 수정 (USING auth.uid() = user_id)
> 4) DELETE: 작성자만 삭제 (USING auth.uid() = user_id)
> ALTER TABLE posts ENABLE ROW LEVEL SECURITY; 도 포함해줘."

<!-- COPILOT_VERIFY: 위 프롬프트를 Copilot Chat에 입력하고 USING vs WITH CHECK가 올바르게 사용되었는지 확인해주세요 -->

---

## 개인 실습

### 체크포인트 1: posts 테이블 RLS 4대 정책

**목표**: posts 테이블에 RLS를 활성화하고 4가지 보안 정책을 생성한다.

① Supabase 대시보드 → SQL Editor를 연다
② posts 테이블 RLS를 활성화한다:

```sql
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
```

③ 4대 정책을 순서대로 생성한다:

```sql
-- 1) 누구나 읽기
CREATE POLICY "누구나 posts 읽기"
  ON posts FOR SELECT
  USING (true);

-- 2) 로그인한 사용자만 작성
CREATE POLICY "로그인 사용자 posts 작성"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 3) 작성자만 수정
CREATE POLICY "작성자만 posts 수정"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id);

-- 4) 작성자만 삭제
CREATE POLICY "작성자만 posts 삭제"
  ON posts FOR DELETE
  USING (auth.uid() = user_id);
```

④ Authentication → Users에서 SQL이 정상 실행되었는지 확인한다
⑤ 앱에서 게시글 목록이 여전히 표시되는지 확인한다 (SELECT 정책 동작 확인)

> **강의 팁**: RLS를 활성화하면 정책이 없는 상태에서 모든 접근이 차단된다. 학생이 "데이터가 안 보인다"고 하면 SELECT 정책이 누락된 것이다.

### 체크포인트 2: profiles 테이블 RLS + 권한 테스트

**목표**: profiles 테이블에도 RLS를 적용하고, 다른 계정으로 권한 테스트를 수행한다.

① profiles 테이블 RLS를 활성화하고 정책을 생성한다:

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 누구나 프로필 읽기
CREATE POLICY "누구나 profiles 읽기"
  ON profiles FOR SELECT
  USING (true);

-- 본인 프로필만 수정
CREATE POLICY "본인 profiles 수정"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

② 테스트용 두 번째 계정을 회원가입으로 만든다
③ 계정 A로 게시글 작성 → 계정 B로 로그인 → 수정/삭제 시도:

**표 11.7** RLS 권한 테스트 시나리오

| 테스트 | 기대 결과 | 확인 |
|--------|-----------|------|
| 계정 B로 계정 A 게시글 읽기 | 정상 표시 | ☐ |
| 계정 B로 새 게시글 작성 | 정상 작성 | ☐ |
| 계정 B로 계정 A 게시글 수정 시도 | 실패 (변경 없음) | ☐ |
| 계정 B로 계정 A 게시글 삭제 시도 | 실패 (삭제 없음) | ☐ |
| 비로그인 상태로 게시글 읽기 | 정상 표시 | ☐ |
| 비로그인 상태로 게시글 작성 시도 | 실패 (에러) | ☐ |

④ UI에서 수정/삭제 버튼이 숨겨져 있더라도, 브라우저 개발자 도구에서 직접 API를 호출해도 차단되는지 확인한다

<!-- COPILOT_VERIFY: RLS 정책 적용 후 다른 계정으로 수정/삭제가 실제로 차단되는지 테스트해주세요 -->

### 체크포인트 3: 검증 + 배포

**목표**: RLS 정책을 검증하고 배포한다.

① 아래 검증 체크리스트를 수행한다
② 문제가 있으면 SQL Editor에서 정책을 수정한다
③ git push로 배포한다:

```bash
git add .
git commit -m "Ch11: RLS 정책 적용"
git push
```

④ Vercel 대시보드에서 배포 완료를 확인한다
⑤ 배포된 URL에서 RLS가 정상 동작하는지 확인한다

---

## 검증 체크리스트

**표 11.8** RLS 정책 검증 체크리스트

| 항목 | 확인 내용 | 확인 |
|------|-----------|------|
| RLS 활성화 | posts + profiles 테이블 모두 RLS가 활성화되었는가? | ☐ |
| SELECT 정책 | 비로그인 사용자도 게시글을 읽을 수 있는가? | ☐ |
| INSERT 정책 | 로그인하지 않으면 게시글 작성이 차단되는가? | ☐ |
| UPDATE 정책 | 다른 사용자의 게시글 수정이 차단되는가? | ☐ |
| DELETE 정책 | 다른 사용자의 게시글 삭제가 차단되는가? | ☐ |
| USING vs WITH CHECK | INSERT에 WITH CHECK, SELECT/UPDATE/DELETE에 USING을 사용했는가? | ☐ |
| 에러 처리 | RLS 거부 시 사용자에게 적절한 메시지가 표시되는가? | ☐ |
| 배포 URL | 배포된 사이트에서 RLS가 동작하는가? | ☐ |

---

## 흔한 AI 실수

**표 11.9** Ch11에서 AI가 자주 틀리는 패턴

| AI 실수 | 올바른 방법 | 발생 원인 |
|---------|------------|----------|
| RLS 활성화 없이 정책만 생성 | `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` 먼저 실행 | 순서 혼동 |
| INSERT에 `USING` 사용 | INSERT는 `WITH CHECK` 사용 (새 행 검증) | USING vs WITH CHECK 혼동 |
| `auth.uid()` 대신 하드코딩된 UUID | `auth.uid()` 함수로 현재 사용자 확인 | 동적 함수 미인식 |
| 모든 작업을 하나의 정책으로 작성 | 작업별(SELECT/INSERT/UPDATE/DELETE) 개별 정책 | 정책 분리 원칙 미인식 |
| 정책 이름 중복 | 각 정책에 고유한 이름 부여 | 기존 정책 존재 미확인 |
| UPDATE에 WITH CHECK 누락 | UPDATE는 USING + WITH CHECK 모두 필요할 수 있음 | 수정된 행 검증 누락 |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch11 과제"에 아래 두 항목을 제출한다:

```
① 배포 URL
   예: https://내프로젝트.vercel.app

② AI가 틀린 부분 1개
   예: "Copilot이 INSERT 정책에 USING을 사용했는데,
       새 행을 검증하려면 WITH CHECK여야 해서 수정했다."
```

---

## 코드리뷰 토론 가이드

> **토론 가이드**: 2-3명이 자발적으로 화면을 공유하며 결과를 발표한다.

**발표 포인트** (1인당 3-5분):
1. 배포된 URL을 브라우저에 띄운다
2. 두 번째 계정으로 다른 사용자의 글 수정/삭제를 시도하여 차단되는 것을 보여준다
3. Supabase 대시보드에서 RLS 정책을 보여준다
4. Copilot이 틀린 부분과 어떻게 수정했는지 설명한다

**토론 질문**:
- "UI에서 수정/삭제 버튼을 숨기는 것만으로 충분하지 않은 이유는?"
- "USING과 WITH CHECK의 차이를 한 문장으로 설명할 수 있는가?"
- "RLS를 활성화했는데 데이터가 안 보인다면 어떤 정책이 빠진 것인가?"

---

## 교수 피드백 포인트

**확인할 것**:
- posts + profiles 테이블 모두 RLS가 활성화되었는지
- INSERT 정책에 `WITH CHECK`를 사용했는지 (USING 아님)
- `auth.uid()` 함수를 올바르게 사용하는지

**우수 사례 공유**:
- RLS 테스트를 체계적으로 수행한 학생 1-2명을 화면에 띄워 동기부여

**다음 주 예고**:
> 다음 주에는 **에러 처리와 UX 완성**을 배운다. 지금까지 만든 게시판에 에러 페이지, 로딩 UI, 폼 유효성 검증, 이미지 최적화를 추가하여 사용자가 불편함 없이 쓸 수 있는 앱으로 다듬는다.


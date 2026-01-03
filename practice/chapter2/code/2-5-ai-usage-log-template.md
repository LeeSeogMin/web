# AI 사용 로그 템플릿

> 이 템플릿을 복사하여 AI 도구를 사용할 때마다 기록하세요.

---

## 세션 정보

| 항목 | 내용 |
|------|------|
| 날짜 | YYYY-MM-DD |
| 시간 | HH:MM |
| AI 도구 | ChatGPT / Copilot / Claude / Cursor |
| 작업 목표 | [간단한 설명] |

---

## 프롬프트

```
[사용한 프롬프트를 그대로 복사]
```

---

## AI 응답 요약

### 핵심 코드
```javascript
// AI가 생성한 핵심 코드
```

### 설명 요약
- [AI가 제공한 주요 설명 1]
- [AI가 제공한 주요 설명 2]

---

## 검증 결과

### 체크리스트
- [ ] import 경로가 현재 라이브러리 버전과 일치하는가?
- [ ] 사용된 API가 현재 버전에서 지원되는가?
- [ ] deprecated 경고가 발생하지 않는가?
- [ ] 코드가 에러 없이 실행되는가?
- [ ] 공식 문서와 대조했는가?

### 참조한 공식 문서
- [문서 제목](URL)

### 발견된 문제
| 문제 | 원인 | 해결 방법 |
|------|------|----------|
| [문제 설명] | [원인 분석] | [해결 방법] |

---

## 수정 사항

### 원본 코드 (AI 생성)
```javascript
// AI가 생성한 원본 코드
```

### 수정된 코드 (최종)
```javascript
// 검증 후 수정된 코드
```

### 수정 이유
- [수정 사항 1]: [수정 이유]
- [수정 사항 2]: [수정 이유]

---

## 배운 점

### 기술적 학습
- [새로 알게 된 API/문법]
- [버전 차이로 인한 변경사항]

### AI 도구 활용 팁
- [효과적이었던 프롬프트 패턴]
- [개선할 점]

---

## 다음 세션을 위한 메모

- [다음에 시도해볼 것]
- [주의해야 할 점]

---

# 사용 예시

## 세션 정보

| 항목 | 내용 |
|------|------|
| 날짜 | 2026-01-01 |
| 시간 | 14:30 |
| AI 도구 | ChatGPT (GPT-4) |
| 작업 목표 | Supabase Google 로그인 구현 |

## 프롬프트

```
React 18과 Supabase JS v2를 사용합니다.
signInWithOAuth로 Google 로그인을 구현해주세요.
에러 처리와 로딩 상태도 포함해주세요.
```

## AI 응답 요약

### 핵심 코드
```javascript
const handleGoogleLogin = async () => {
  setLoading(true);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) setError(error.message);
  setLoading(false);
};
```

## 검증 결과

### 체크리스트
- [x] import 경로가 현재 라이브러리 버전과 일치하는가?
- [x] 사용된 API가 현재 버전에서 지원되는가?
- [x] deprecated 경고가 발생하지 않는가?
- [x] 코드가 에러 없이 실행되는가?
- [x] 공식 문서와 대조했는가?

### 참조한 공식 문서
- [Supabase Auth - Sign in with OAuth](https://supabase.com/docs/reference/javascript/auth-signinwithoauth)

### 발견된 문제
없음 - AI가 올바른 버전의 API를 사용함

## 배운 점

### 기술적 학습
- Supabase v2에서는 signInWithOAuth가 Promise를 반환
- redirectTo 옵션으로 로그인 후 리다이렉트 URL 지정 가능

### AI 도구 활용 팁
- 버전을 명시하니 정확한 코드가 생성됨
- 에러 처리 요청을 함께 하면 더 완성도 높은 코드 제공

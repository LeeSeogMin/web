// Ch13 개인 프로젝트 — 스타터 코드
// 기본 Next.js + Supabase + 인증 설정이 완료된 템플릿이다.
// ARCHITECTURE.md의 설계를 바탕으로 페이지와 기능을 추가한다.

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="bg-blue-600 text-white">
        <nav className="max-w-4xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">내 프로젝트</h1>
          <div className="flex gap-4">
            <a href="/" className="hover:underline">홈</a>
            <a href="/login" className="hover:underline">로그인</a>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto p-4 mt-8">
        <h2 className="text-2xl font-bold mb-4">프로젝트를 시작하세요</h2>
        <p className="text-gray-600 mb-6">
          이 템플릿에는 기본 레이아웃, Supabase 클라이언트, Google OAuth 로그인이 설정되어 있습니다.
          ARCHITECTURE.md의 설계를 바탕으로 페이지와 기능을 추가하세요.
        </p>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-bold mb-3">시작 체크리스트</h3>
          <ul className="space-y-2 text-gray-700">
            <li>1. .env.local에 Supabase URL과 키를 설정했는가?</li>
            <li>2. Supabase 대시보드에서 테이블을 생성했는가?</li>
            <li>3. RLS 정책을 활성화하고 추가했는가?</li>
            <li>4. Google OAuth가 동작하는가?</li>
          </ul>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto p-4 mt-8 text-center text-gray-400 text-sm">
        Ch13 개인 프로젝트
      </footer>
    </div>
  );
}

// Ch8 스타터 — Supabase 연동 전 기본 게시판 페이지
// B회차 과제: Supabase 클라이언트 설정 + 테이블 생성 + 데이터 읽기

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── 헤더 ── */}
      <header className="bg-blue-600 text-white">
        <nav className="max-w-4xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">게시판</h1>
          <div className="flex gap-4">
            <a href="/" className="hover:underline">홈</a>
          </div>
        </nav>
      </header>

      {/* ── 메인 ── */}
      <main className="max-w-4xl mx-auto p-4 mt-8">
        <h2 className="text-2xl font-bold mb-6">최신 게시글</h2>

        {/* TODO: Supabase에서 게시글 데이터를 가져와 표시하기 */}
        <p className="text-gray-500">
          아직 Supabase가 연결되지 않았습니다.
          lib/supabase.js를 설정하고 데이터를 가져오세요.
        </p>
      </main>

      {/* ── 푸터 ── */}
      <footer className="mt-16 bg-gray-800 text-gray-400 text-center p-6">
        <p className="text-sm">&copy; 2026 게시판. All rights reserved.</p>
      </footer>
    </div>
  );
}

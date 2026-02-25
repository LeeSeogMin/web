// 독서 기록 앱 — 메인 페이지 (모범 구현)
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="bg-indigo-600 text-white">
        <nav className="max-w-4xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">나의 책장</h1>
          <div className="flex gap-4">
            <Link href="/books" className="hover:underline">내 책</Link>
            <Link href="/login" className="hover:underline">로그인</Link>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto p-4 mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">읽은 책을 기록하세요</h2>
        <p className="text-gray-600 mb-8">
          책 제목, 저자, 메모를 등록하고 나만의 독서 기록을 관리하세요.
        </p>
        <Link
          href="/books"
          className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg"
        >
          시작하기
        </Link>
      </main>

      <footer className="max-w-4xl mx-auto p-4 mt-16 text-center text-gray-400 text-sm">
        &copy; 2026 나의 책장. Ch13 개인 프로젝트 모범 구현.
      </footer>
    </div>
  );
}

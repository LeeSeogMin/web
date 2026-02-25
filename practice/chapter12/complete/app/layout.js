import "./globals.css";

// 메타데이터 설정 — SEO 기초
export const metadata = {
  title: "My Board — 게시판",
  description: "Next.js + Supabase로 만든 게시판",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}

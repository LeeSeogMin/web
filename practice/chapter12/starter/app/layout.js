import "./globals.css";

export const metadata = {
  title: "게시판",
  description: "Ch12 게시판 — 에러 처리와 UX 완성",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}

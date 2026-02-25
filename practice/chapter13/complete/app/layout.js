import "./globals.css";

export const metadata = {
  title: "독서 기록 — 나의 책장",
  description: "읽은 책을 기록하고 관리하는 웹 앱",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}

import "./globals.css";

// TODO: 프로젝트에 맞게 metadata를 수정하세요
export const metadata = {
  title: "내 프로젝트",
  description: "Ch13 개인 프로젝트",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}

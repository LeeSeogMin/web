import "./globals.css";

export const metadata = {
  title: "게시판",
  description: "Ch3 게시판 메인 페이지",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

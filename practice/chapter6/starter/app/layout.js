import "./globals.css";

export const metadata = {
  title: "게시판",
  description: "Ch6 게시판 프론트엔드",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

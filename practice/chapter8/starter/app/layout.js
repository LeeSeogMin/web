import "./globals.css";

export const metadata = {
  title: "게시판",
  description: "Ch8 Supabase 연동 게시판",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

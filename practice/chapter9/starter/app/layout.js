import "./globals.css";

// TODO: AuthProvider를 import하여 감싸기
// import { AuthProvider } from "@/contexts/AuthContext";

export const metadata = {
  title: "게시판",
  description: "Ch9 인증 연동 게시판",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {/* TODO: <AuthProvider>로 감싸기 */}
        {children}
      </body>
    </html>
  );
}

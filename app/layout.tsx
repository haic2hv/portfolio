import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phạm Đăng Hải – Giáo viên Toán THCS",
  description:
    "Liên kết mạng xã hội của Phạm Đăng Hải – Giáo viên Toán tại Trường THCS Hùng Vương.",
  openGraph: {
    title: "Phạm Đăng Hải – Giáo viên Toán THCS",
    description: "Liên kết mạng xã hội của Phạm Đăng Hải – Giáo viên Toán THCS.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

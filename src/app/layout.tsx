'use client";';
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ConfigProvider } from "antd";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "LetraMundo",
  description: "Aprender é para todos! Acreditamos no poder da educação inclusiva para transformar vidas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#f4a460",
          },
        }}
      >
        <body className={inter.className}>{children}</body>
      </ConfigProvider>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: {
    default: "VibeLab - Vibe Coding 作品收录",
    template: "%s | VibeLab",
  },
  description:
    "发现最酷的 Vibe Coding 作品 —— 使用 Cursor, Claude, Copilot 等 AI 工具创作的网站、应用、游戏合集。",
  keywords: [
    "Vibe Coding",
    "AI 编程",
    "AI 作品展示",
    "Cursor",
    "AI 工具",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans bg-background text-text-primary min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

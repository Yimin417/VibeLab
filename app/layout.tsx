import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vibe-lab-three.vercel.app"),
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
  openGraph: {
    type: "website",
    siteName: "VibeLab",
    title: "VibeLab - Vibe Coding 作品收录",
    description:
      "发现最酷的 Vibe Coding 作品 —— 使用 Cursor, Claude, Copilot 等 AI 工具创作的网站、应用、游戏合集。",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeLab - Vibe Coding 作品收录",
    description:
      "发现最酷的 Vibe Coding 作品 —— 使用 Cursor, Claude, Copilot 等 AI 工具创作的网站、应用、游戏合集。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans bg-background text-text-primary min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

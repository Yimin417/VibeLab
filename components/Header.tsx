import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-color bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold gradient-text">
              VibeCodingShow
            </span>
            <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs text-primary">
              Beta
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              作品展示
            </Link>
            <Link
              href="/about"
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              关于
            </Link>
            <Link
              href="/submit"
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              提交作品
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

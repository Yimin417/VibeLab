import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-color">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-text-secondary">
            {year} VibeLab - Vibe Coding 作品收录
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="text-xs text-text-secondary/60 transition-colors hover:text-text-secondary"
            >
              关于
            </Link>
            <Link
              href="/submit"
              className="text-xs text-text-secondary/60 transition-colors hover:text-text-secondary"
            >
              提交作品
            </Link>
          </div>
          <p className="text-xs text-text-secondary/60">
            Built with AI assistance
          </p>
        </div>
      </div>
    </footer>
  );
}

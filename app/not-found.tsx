import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-8xl font-bold gradient-text font-mono">404</p>
      <h2 className="mt-4 text-xl font-semibold text-text-primary">
        页面不存在
      </h2>
      <p className="mt-2 text-sm text-text-secondary">
        你访问的页面可能已被移除或链接有误。
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-primary px-6 py-2 text-sm text-white hover:bg-primary-hover transition-colors"
      >
        返回首页
      </Link>
    </div>
  );
}

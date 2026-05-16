"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-xl font-semibold text-text-primary">
        加载出错了
      </h2>
      <p className="mt-2 text-sm text-text-secondary">
        {error.message || "页面加载失败，请稍后重试。"}
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-primary px-6 py-2 text-sm text-white hover:bg-primary-hover transition-colors"
      >
        重试
      </button>
    </div>
  );
}

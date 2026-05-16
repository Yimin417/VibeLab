"use client";

interface LoadMoreProps {
  onClick: () => void;
  loading?: boolean;
}

export default function LoadMore({ onClick, loading }: LoadMoreProps) {
  return (
    <div className="mt-10 text-center">
      <button
        onClick={onClick}
        disabled={loading}
        className="rounded-lg border border-border-color bg-card-bg px-6 py-3 text-sm text-text-secondary transition-all hover:border-primary hover:text-text-primary disabled:opacity-50"
      >
        {loading ? "加载中..." : "加载更多"}
      </button>
    </div>
  );
}

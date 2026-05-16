import { SearchX } from "lucide-react";

interface EmptyStateProps {
  hasFilters: boolean;
}

export default function EmptyState({ hasFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <SearchX className="h-16 w-16 text-text-secondary/40" />
      <h3 className="mt-4 text-lg font-semibold text-text-primary">
        没有找到作品
      </h3>
      <p className="mt-2 text-sm text-text-secondary max-w-md">
        {hasFilters
          ? "当前筛选条件下没有匹配的作品，请尝试调整筛选条件。"
          : "还没有收录作品，敬请期待。"}
      </p>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Trophy, TrendingUp, Loader2, AlertCircle } from "lucide-react";
import type { TimePeriod } from "@/types";

interface RankingItem {
  id: string;
  title: string;
  author: string;
  likes: number;
}

interface TodayRankingProps {
  period?: TimePeriod;
}

const PERIOD_LABELS: Record<TimePeriod, string> = {
  today: "今日",
  week: "本周",
  month: "本月",
  all: "全部",
};

export default function TodayRanking({
  period = "today",
}: TodayRankingProps) {
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRanking = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/ranking?period=today&limit=5`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setRanking(data.ranking);
    } catch {
      setError("加载排行榜失败");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  return (
    <div className="rounded-xl border border-border-color bg-card-bg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="h-4 w-4 text-yellow-400" />
        <h3 className="text-sm font-semibold text-text-primary">
          今日排行 Top 5
        </h3>
      </div>

      {loading ? (
        // Loading skeleton
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 animate-pulse"
            >
              <div className="h-5 w-5 rounded-full bg-text-secondary/20" />
              <div className="flex-1">
                <div className="h-3 w-24 bg-text-secondary/20 rounded mb-1" />
                <div className="h-2 w-16 bg-text-secondary/20 rounded" />
              </div>
              <div className="h-3 w-8 bg-text-secondary/20 rounded" />
            </div>
          ))}
        </div>
      ) : error ? (
        // Error state
        <div className="flex flex-col items-center py-4 text-center">
          <AlertCircle className="h-6 w-6 text-text-secondary/40" />
          <p className="mt-1 text-xs text-text-secondary">{error}</p>
          <button
            onClick={fetchRanking}
            className="mt-2 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            重试
          </button>
        </div>
      ) : ranking.length === 0 ? (
        // Empty state
        <div className="flex flex-col items-center py-4 text-center">
          <TrendingUp className="h-6 w-6 text-text-secondary/20" />
          <p className="mt-1 text-xs text-text-secondary">
            今天还没有点赞数据
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {ranking.map((item, i) => (
            <Link
              key={item.id}
              href={`/projects/${item.id}`}
              className="flex items-center gap-3 group"
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                  i === 0
                    ? "bg-yellow-400/20 text-yellow-400"
                    : i === 1
                    ? "bg-gray-300/20 text-gray-300"
                    : i === 2
                    ? "bg-amber-600/20 text-amber-600"
                    : "bg-text-secondary/10 text-text-secondary"
                }`}
              >
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary truncate group-hover:text-primary transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-text-secondary/50 font-mono">
                  {item.author}
                </p>
              </div>
              <span className="text-xs text-text-secondary shrink-0">
                {item.likes} 赞
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

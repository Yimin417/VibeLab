"use client";

import { useState, useEffect, useCallback } from "react";
import { Heart } from "lucide-react";
import { getFingerprint } from "@/lib/fingerprint";

interface LikeButtonProps {
  projectId: string;
  initialCount?: number;
  initialLiked?: boolean;
  onCountChange?: (count: number) => void;
}

export default function LikeButton({
  projectId,
  initialCount = 0,
  initialLiked = false,
  onCountChange,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial state on mount
  useEffect(() => {
    const fp = getFingerprint();
    const fetchCounts = async () => {
      try {
        const headers: Record<string, string> = {};
        if (fp) headers["x-fingerprint"] = fp;
        const res = await fetch(`/api/like/count?projectIds=${projectId}`, {
          headers,
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!ignore) {
          setCount(data.counts[projectId] ?? initialCount);
          setLiked(data.liked[projectId] ?? initialLiked);
        }
      } catch {
        // Use defaults on error
      }
    };

    let ignore = false;
    fetchCounts();
    return () => {
      ignore = true;
    };
  }, [projectId, initialCount, initialLiked]);

  const handleClick = useCallback(async () => {
    const fp = getFingerprint();
    if (!fp) return;

    setError(null);
    setLoading(true);

    // Optimistic update
    const prevLiked = liked;
    const prevCount = count;
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);
    onCountChange?.(liked ? count - 1 : count + 1);

    try {
      const res = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-fingerprint": fp,
        },
        body: JSON.stringify({ projectId }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      // Use server count as source of truth
      setLiked(data.liked);
      setCount(data.count);
      onCountChange?.(data.count);
    } catch {
      // Rollback
      setLiked(prevLiked);
      setCount(prevCount);
      onCountChange?.(prevCount);
      setError("点赞失败，请重试");
    } finally {
      setLoading(false);
    }
  }, [liked, count, projectId, onCountChange]);

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`inline-flex items-center gap-1 text-sm transition-colors ${
          loading ? "opacity-50 cursor-wait" : "cursor-pointer"
        } ${
          liked
            ? "text-red-400 hover:text-red-300"
            : "text-text-secondary hover:text-red-400"
        }`}
        title={liked ? "取消点赞" : "点赞"}
      >
        <Heart
          className={`h-4 w-4 transition-all ${
            liked ? "fill-current scale-110" : ""
          } ${loading ? "animate-pulse" : ""}`}
        />
        {count > 0 && (
          <span className="min-w-[1ch] text-xs">{count}</span>
        )}
      </button>
      {error && (
        <span className="text-xs text-red-400">{error}</span>
      )}
    </div>
  );
}

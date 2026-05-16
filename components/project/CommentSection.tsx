"use client";

import { useState, useEffect, useCallback, useRef, FormEvent } from "react";
import { MessageSquare, Send, Loader2, AlertCircle } from "lucide-react";
import { getFingerprint } from "@/lib/fingerprint";
import type { Comment } from "@/types";

interface CommentSectionProps {
  projectId: string;
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "刚刚";
  if (minutes < 60) return `${minutes} 分钟前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} 小时前`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} 天前`;
  return d.toLocaleDateString("zh-CN");
}

export default function CommentSection({ projectId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const fetchComments = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch(
        `/api/comment?projectId=${encodeURIComponent(projectId)}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setComments(data.comments);
    } catch {
      setError("加载评论失败");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const fp = getFingerprint();
    if (!fp || !author.trim() || !content.trim()) return;

    setSubmitError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-fingerprint": fp,
        },
        body: JSON.stringify({
          projectId,
          author: author.trim(),
          content: content.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "提交失败");
      }

      const data = await res.json();
      setComments((prev) => [data.comment, ...prev]);
      setContent("");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "提交失败，请重试"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border-t border-border-color pt-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-5 w-5 text-text-secondary" />
        <h2 className="text-lg font-semibold text-text-primary">
          留言 ({comments.length})
        </h2>
      </div>

      {/* Submit form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-3">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="你的名字"
          maxLength={30}
          required
          className="w-full max-w-xs rounded-lg border border-border-color bg-card-bg px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none"
        />
        <div className="flex gap-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="说点什么..."
            maxLength={500}
            required
            rows={2}
            className="flex-1 rounded-lg border border-border-color bg-card-bg px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none resize-none"
          />
          <button
            type="submit"
            disabled={submitting || !author.trim() || !content.trim()}
            className="self-end shrink-0 inline-flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
        <div className="flex justify-between text-xs text-text-secondary/60">
          <span>{content.length}/500</span>
          {submitError && (
            <span className="text-red-400">{submitError}</span>
          )}
        </div>
      </form>

      {/* Comments list */}
      <div ref={listRef} className="space-y-4">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg bg-card-bg border border-border-color p-4 animate-pulse"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-3 w-16 bg-text-secondary/20 rounded" />
                <div className="h-2 w-12 bg-text-secondary/20 rounded" />
              </div>
              <div className="h-3 w-full bg-text-secondary/20 rounded" />
            </div>
          ))
        ) : error ? (
          // Error state
          <div className="flex flex-col items-center py-8 text-center">
            <AlertCircle className="h-8 w-8 text-red-400/60" />
            <p className="mt-2 text-sm text-text-secondary">{error}</p>
            <button
              onClick={fetchComments}
              className="mt-3 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              重试
            </button>
          </div>
        ) : comments.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center py-8 text-center">
            <MessageSquare className="h-10 w-10 text-text-secondary/20" />
            <p className="mt-2 text-sm text-text-secondary">
              还没有留言，来做第一个评论的人吧
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-lg bg-card-bg border border-border-color p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-text-primary">
                  {comment.author}
                </span>
                <span className="text-xs text-text-secondary/50">
                  {formatTime(comment.createdAt)}
                </span>
              </div>
              <p className="text-sm text-text-secondary whitespace-pre-line">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

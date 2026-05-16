"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { SortOption } from "@/types";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "最新优先" },
  { value: "oldest", label: "最早优先" },
  { value: "featured", label: "精选优先" },
  { value: "most-liked", label: "最多喜欢" },
  { value: "most-commented", label: "最多评论" },
  { value: "alpha", label: "A-Z" },
];

export default function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = (searchParams.get("sort") as SortOption) || "newest";

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const params = new URLSearchParams(searchParams.toString());
      const value = e.target.value;
      if (value === "newest") {
        params.delete("sort");
      } else {
        params.set("sort", value);
      }
      router.push(`/?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <select
      value={currentSort}
      onChange={handleChange}
      className="rounded-lg border border-border-color bg-card-bg px-3 py-2 text-sm text-text-primary focus:border-primary focus:outline-none"
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

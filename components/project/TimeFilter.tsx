"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { TimePeriod } from "@/types";

const PERIODS: { value: TimePeriod; label: string }[] = [
  { value: "today", label: "今天" },
  { value: "week", label: "本周" },
  { value: "month", label: "本月" },
  { value: "all", label: "全部" },
];

export default function TimeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPeriod = (searchParams.get("period") as TimePeriod) || "all";

  const handleChange = useCallback(
    (period: TimePeriod) => {
      const params = new URLSearchParams(searchParams.toString());
      if (period === "all") {
        params.delete("period");
      } else {
        params.set("period", period);
      }
      router.push(`/?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div className="flex rounded-lg border border-border-color bg-card-bg p-0.5">
      {PERIODS.map((p) => (
        <button
          key={p.value}
          onClick={() => handleChange(p.value)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            currentPeriod === p.value
              ? "bg-primary text-white"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TOOL_OPTIONS, CATEGORY_OPTIONS, STYLE_OPTIONS } from "@/lib/constants";
import { Filter } from "lucide-react";
import { useState } from "react";

export default function ProjectFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const activeTools = searchParams.getAll("tool");
  const activeCategories = searchParams.getAll("category");
  const activeStyles = searchParams.getAll("style");

  function toggleFilter(type: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    const existing = params.getAll(type);
    if (existing.includes(value)) {
      params.delete(type);
      existing.filter((v) => v !== value).forEach((v) => params.append(type, v));
    } else {
      params.append(type, value);
    }
    const qs = params.toString();
    router.push(qs ? `/?${qs}` : "/", { scroll: false });
  }

  function clearAll() {
    router.push("/", { scroll: false });
  }

  const hasFilters =
    activeTools.length > 0 ||
    activeCategories.length > 0 ||
    activeStyles.length > 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="border-border-color text-text-secondary hover:text-text-primary"
        >
          <Filter className="mr-1 h-4 w-4" />
          筛选
        </Button>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-text-secondary hover:text-text-primary text-xs"
          >
            清除全部
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="space-y-4 rounded-xl border border-border-color bg-card-bg p-4">
          <FilterGroup
            label="AI 工具"
            options={TOOL_OPTIONS}
            active={activeTools}
            param="tool"
            onToggle={toggleFilter}
          />
          <FilterGroup
            label="分类"
            options={CATEGORY_OPTIONS}
            active={activeCategories}
            param="category"
            onToggle={toggleFilter}
          />
          <FilterGroup
            label="风格"
            options={STYLE_OPTIONS}
            active={activeStyles}
            param="style"
            onToggle={toggleFilter}
          />
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  options,
  active,
  param,
  onToggle,
}: {
  label: string;
  options: { value: string; label: string }[];
  active: string[];
  param: string;
  onToggle: (type: string, value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-text-secondary">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isActive = active.includes(opt.value);
          return (
            <Badge
              key={opt.value}
              variant={isActive ? "default" : "outline"}
              className={`cursor-pointer transition-colors ${
                isActive
                  ? "bg-primary hover:bg-primary-hover"
                  : "border-border-color text-text-secondary hover:text-text-primary hover:border-primary/50"
              }`}
              onClick={() => onToggle(param, opt.value)}
            >
              {opt.label}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

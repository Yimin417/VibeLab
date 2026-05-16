"use client";

import { useState, useCallback, useRef } from "react";
import type { Project } from "@/types";
import ProjectGrid from "./ProjectGrid";
import LoadMore from "./LoadMore";

const INITIAL_COUNT = 8;
const LOAD_MORE_COUNT = 8;

interface ProjectGridWithPaginationProps {
  projects: Project[];
}

export default function ProjectGridWithPagination({
  projects,
}: ProjectGridWithPaginationProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const isLoadingRef = useRef(false);

  const visible = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  const handleLoadMore = useCallback(() => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
    isLoadingRef.current = false;
  }, []);

  if (projects.length === 0) return null;

  return (
    <div>
      <ProjectGrid projects={visible} />
      {hasMore && <LoadMore onClick={handleLoadMore} />}
    </div>
  );
}

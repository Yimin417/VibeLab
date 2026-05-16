import { Suspense } from "react";
import type { Metadata } from "next";
import ProjectGrid from "@/components/project/ProjectGrid";
import ProjectFilters from "@/components/project/ProjectFilters";
import SearchBar from "@/components/project/SearchBar";
import EmptyState from "@/components/project/EmptyState";
import { getAllProjects, filterProjects, getFeaturedProjects } from "@/lib/data";
import type { FilterState } from "@/types";
import { ProjectGridSkeleton } from "@/components/project/ProjectCardSkeleton";

export const metadata: Metadata = {
  title: "VibeLab - Vibe Coding 作品收录",
};

interface HomePageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

function parseSearchParams(
  sp: Record<string, string | string[] | undefined>
): FilterState {
  const getArr = (key: string): string[] => {
    const v = sp[key];
    if (!v) return [];
    return Array.isArray(v) ? v : [v];
  };

  return {
    search: typeof sp.search === "string" ? sp.search : "",
    tools: getArr("tool") as FilterState["tools"],
    categories: getArr("category") as FilterState["categories"],
    styles: getArr("style") as FilterState["styles"],
  };
}

function HomeContent({ searchParams }: HomePageProps) {
  const filters = parseSearchParams(searchParams);
  const allProjects = getAllProjects();
  const filtered = filterProjects(filters);
  const featured = getFeaturedProjects();

  const hasActiveFilters =
    filters.tools.length > 0 ||
    filters.categories.length > 0 ||
    filters.styles.length > 0 ||
    filters.search !== "";

  const displayProjects = hasActiveFilters ? filtered : allProjects;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          <span className="gradient-text">VibeLab</span>
        </h1>
        <p className="mt-3 text-lg text-text-secondary">
          发现最酷的 Vibe Coding 作品
        </p>
        {!hasActiveFilters && featured.length > 0 && (
          <p className="mt-2 text-sm text-text-secondary/60">
            当前收录 {allProjects.length} 个作品，{featured.length} 个精选
          </p>
        )}
      </div>

      {/* Search + Filters */}
      <div className="mb-8 space-y-4">
        <Suspense fallback={null}>
          <SearchBar />
        </Suspense>
        <Suspense fallback={null}>
          <ProjectFilters />
        </Suspense>
      </div>

      {/* Results */}
      {displayProjects.length > 0 ? (
        <ProjectGrid projects={displayProjects} />
      ) : (
        <EmptyState hasFilters={hasActiveFilters} />
      )}
    </div>
  );
}

export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <Suspense fallback={<ProjectGridSkeleton />}>
      <HomeContent searchParams={searchParams} />
    </Suspense>
  );
}

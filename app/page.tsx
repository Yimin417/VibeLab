import { Suspense } from "react";
import type { Metadata } from "next";
import ProjectGridWithPagination from "@/components/project/ProjectGridWithPagination";
import ProjectFilters from "@/components/project/ProjectFilters";
import SearchBar from "@/components/project/SearchBar";
import SortSelect from "@/components/project/SortSelect";
import TimeFilter from "@/components/project/TimeFilter";
import TodayRanking from "@/components/project/TodayRanking";
import EmptyState from "@/components/project/EmptyState";
import { getAllProjects, filterProjects, getFeaturedProjects, sortProjects, filterByTimePeriod } from "@/lib/data";
import { getSupabase } from "@/lib/supabase";
import type { FilterState, SortOption, TimePeriod } from "@/types";
import { ProjectGridSkeleton } from "@/components/project/ProjectCardSkeleton";

export const metadata: Metadata = {
  title: "VibeCodingShow - Vibe Coding 作品收录",
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

function getSortOption(sp: Record<string, string | string[] | undefined>): SortOption {
  const sort = sp.sort;
  const validSorts = ["newest", "oldest", "featured", "alpha", "most-liked", "most-commented"];
  if (typeof sort === "string" && validSorts.includes(sort)) {
    return sort as SortOption;
  }
  return "newest";
}

function getTimePeriod(sp: Record<string, string | string[] | undefined>): TimePeriod {
  const period = sp.period;
  if (typeof period === "string" && ["today", "week", "month", "all"].includes(period)) {
    return period as TimePeriod;
  }
  return "all";
}

async function HomeContent({ searchParams }: HomePageProps) {
  const filters = parseSearchParams(searchParams);
  const sort = getSortOption(searchParams);
  const period = getTimePeriod(searchParams);
  const allProjects = getAllProjects();
  const filtered = filterProjects(filters);
  const featured = getFeaturedProjects();

  const hasActiveFilters =
    filters.tools.length > 0 ||
    filters.categories.length > 0 ||
    filters.styles.length > 0 ||
    filters.search !== "";

  const sourceProjects = hasActiveFilters ? filtered : allProjects;
  const timeFiltered = filterByTimePeriod(sourceProjects, period);

  // Fetch like/comment counts for relevant sort modes
  let likeCounts: Record<string, number> = {};
  let commentCounts: Record<string, number> = {};

  if (sort === "most-liked" || sort === "most-commented") {
    try {
      const projectIds = timeFiltered.map((p) => p.id);
      if (projectIds.length > 0) {
        // Fetch like counts
        const { data: likeData } = await getSupabase()
          .from("likes")
          .select("project_id")
          .in("project_id", projectIds);

        if (likeData) {
          for (const row of likeData) {
            likeCounts[row.project_id] = (likeCounts[row.project_id] || 0) + 1;
          }
        }

        // Fetch comment counts if needed
        if (sort === "most-commented") {
          const { data: commentData } = await getSupabase()
            .from("comments")
            .select("project_id")
            .in("project_id", projectIds);

          if (commentData) {
            for (const row of commentData) {
              commentCounts[row.project_id] =
                (commentCounts[row.project_id] || 0) + 1;
            }
          }
        }
      }
    } catch {
      // Sort without counts on error
    }
  }

  const displayProjects = sortProjects(
    timeFiltered,
    sort,
    likeCounts,
    commentCounts
  );

  const hasTimeFilter = period !== "all";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          <span className="gradient-text">VibeCodingShow</span>
        </h1>
        <p className="mt-3 text-lg text-text-secondary">
          发现最酷的 Vibe Coding 作品
        </p>
        {!hasActiveFilters && !hasTimeFilter && featured.length > 0 && (
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
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Suspense fallback={null}>
              <ProjectFilters />
            </Suspense>
            <TimeFilter />
          </div>
          <Suspense fallback={null}>
            <SortSelect />
          </Suspense>
        </div>
      </div>

      {/* Main content + sidebar */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        {/* Left: Project grid */}
        <div>
          {displayProjects.length > 0 ? (
            <ProjectGridWithPagination projects={displayProjects} />
          ) : (
            <EmptyState hasFilters={hasActiveFilters || hasTimeFilter} />
          )}
        </div>

        {/* Right: Today ranking */}
        <aside className="order-first lg:order-none">
          <TodayRanking period={period} />
        </aside>
      </div>
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

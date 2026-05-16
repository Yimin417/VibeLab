import { Project, FilterState } from "@/types";
import projectsData from "@/data/projects.json";

const projects: Project[] = projectsData as Project[];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function filterProjects(filters: FilterState): Project[] {
  let result = [...projects];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)
    );
  }

  if (filters.tools.length > 0) {
    result = result.filter((p) =>
      p.tools.some((t) => filters.tools.includes(t))
    );
  }

  if (filters.categories.length > 0) {
    result = result.filter((p) => filters.categories.includes(p.category));
  }

  if (filters.styles.length > 0) {
    result = result.filter((p) =>
      p.styles.some((s) => filters.styles.includes(s))
    );
  }

  return result;
}

import { SortOption } from "@/types";

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function sortProjects(
  projectList: Project[],
  sort: SortOption,
  likeCounts?: Record<string, number>,
  commentCounts?: Record<string, number>
): Project[] {
  const sorted = [...projectList];
  switch (sort) {
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "oldest":
      return sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    case "featured":
      return sorted.sort((a, b) => {
        if (a.featured === b.featured) return 0;
        return a.featured ? -1 : 1;
      });
    case "alpha":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "most-liked":
      return sorted.sort(
        (a, b) => (likeCounts?.[b.id] || 0) - (likeCounts?.[a.id] || 0)
      );
    case "most-commented":
      return sorted.sort(
        (a, b) =>
          (commentCounts?.[b.id] || 0) - (commentCounts?.[a.id] || 0)
      );
    default:
      return sorted;
  }
}

export type TimePeriod = import("@/types").TimePeriod;

export function filterByTimePeriod(
  projectList: Project[],
  period: TimePeriod
): Project[] {
  if (period === "all") return projectList;

  const now = new Date();
  let startDate: Date;

  switch (period) {
    case "today":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "week":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    default:
      return projectList;
  }

  return projectList.filter((p) => new Date(p.createdAt) >= startDate);
}

export function paginateProjects(
  projectList: Project[],
  page: number,
  pageSize: number
): { projects: Project[]; hasMore: boolean } {
  const end = page * pageSize;
  return {
    projects: projectList.slice(0, end),
    hasMore: end < projectList.length,
  };
}

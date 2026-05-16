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

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/data";

const BASE_URL = "https://vibe-coding-show.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects();

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.id}`,
    lastModified: new Date(project.createdAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/submit`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...projectPages,
  ];
}

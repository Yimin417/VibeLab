import type { Project } from "@/types";

const BASE_URL = "https://vibe-lab-three.vercel.app";

export function generateCollectionPageJsonLd(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "VibeLab - Vibe Coding 作品收录",
    description:
      "发现最酷的 Vibe Coding 作品 —— 使用 Cursor, Claude, Copilot 等 AI 工具创作的网站、应用、游戏合集。",
    url: BASE_URL,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: `${BASE_URL}/projects/${project.id}`,
        author: {
          "@type": "Person",
          name: project.author,
        },
        image: project.imageUrl,
        dateCreated: project.createdAt,
      },
    })),
  };
}

export function generateProjectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${BASE_URL}/projects/${project.id}`,
    author: {
      "@type": "Person",
      name: project.author,
    },
    image: project.imageUrl,
    dateCreated: project.createdAt,
    keywords: [project.category, ...project.tools, ...project.styles].join(
      ", "
    ),
    about: project.longDescription,
  };
}

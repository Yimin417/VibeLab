export type Tool = "Cursor" | "Windsurf" | "Bolt" | "Replit" | "Claude" | "Copilot" | "v0" | "Lovable";

export type Category = "Landing Page" | "Dashboard" | "SaaS" | "Game" | "Tool" | "Portfolio" | "Mobile App" | "AI Application";

export type Style = "Minimal" | "Glassmorphism" | "Brutalist" | "Retro" | "Dark Mode" | "Cyberpunk" | "Neumorphism" | "Gradient";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tools: Tool[];
  category: Category;
  styles: Style[];
  imageUrl: string;
  gallery: string[];
  demoUrl: string;
  repoUrl: string;
  author: string;
  createdAt: string;
  featured: boolean;
}

export interface FilterState {
  tools: Tool[];
  categories: Category[];
  styles: Style[];
  search: string;
}

export type SortOption = "newest" | "oldest" | "featured" | "alpha";

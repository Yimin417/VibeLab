import { Tool, Category, Style } from "@/types";

export const TOOL_OPTIONS: { value: Tool; label: string }[] = [
  { value: "Cursor", label: "Cursor" },
  { value: "Windsurf", label: "Windsurf" },
  { value: "Bolt", label: "Bolt" },
  { value: "Replit", label: "Replit" },
  { value: "Claude", label: "Claude" },
  { value: "Copilot", label: "Copilot" },
  { value: "v0", label: "v0" },
  { value: "Lovable", label: "Lovable" },
];

export const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: "Landing Page", label: "落地页" },
  { value: "Dashboard", label: "仪表盘" },
  { value: "SaaS", label: "SaaS" },
  { value: "Game", label: "游戏" },
  { value: "Tool", label: "工具" },
  { value: "Portfolio", label: "作品集" },
  { value: "Mobile App", label: "移动应用" },
  { value: "AI Application", label: "AI 应用" },
];

export const STYLE_OPTIONS: { value: Style; label: string }[] = [
  { value: "Minimal", label: "极简" },
  { value: "Glassmorphism", label: "玻璃态" },
  { value: "Brutalist", label: "粗野主义" },
  { value: "Retro", label: "复古" },
  { value: "Dark Mode", label: "暗黑模式" },
  { value: "Cyberpunk", label: "赛博朋克" },
  { value: "Neumorphism", label: "新拟态" },
  { value: "Gradient", label: "渐变" },
];

# VibeCodingShow - Claude Code 开发指南

## 项目概述
VibeCodingShow 是一个 Vibe Coding 作品收录网站，展示使用 AI 编程工具创建的作品。

## 常用命令
```bash
npm run dev          # 启动开发服务器
npm run build        # 生产构建
npm run start        # 启动生产服务器
npm run lint         # ESLint 检查
npx tsc --noEmit     # TypeScript 类型检查
```

## 技术栈约束
- Next.js 14+ App Router（必须使用 Server Components 优先）
- TypeScript 严格模式（禁止 any）
- Tailwind CSS（禁止内联样式，除非动态计算）
- shadcn/ui（优先使用，不自造基础组件）
- Framer Motion（动效库）

## 代码风格
- 组件文件使用 PascalCase：ProjectCard.tsx
- 工具函数文件使用 camelCase：formatDate.ts
- Props 接口以组件名 + Props 命名：interface ProjectCardProps
- 优先使用 const，避免 let
- 使用 early return 减少嵌套

## 架构约束
- 组件层级：page → section → component → ui
- 数据获取统一在 lib/data.ts，组件不直接访问数据源
- 业务组件放 components/project/，基础组件放 components/ui/
- 类型定义统一在 types/index.ts
- 禁止：直接操作 DOM、使用 any 类型、未优化的图片

## 设计系统
- 主背景 #0a0a0f / 卡片 #161622 / 主色 #8b5cf6 / 次色 #06b6d4
- 深色主题，赛博朋克 + 实验室风格
- 卡片悬停：上浮 + glow 发光效果
- 响应式：桌面 4 列 / 平板 3 列 / 手机 2 列

## 工作流规则
- 提交信息格式：feat|fix|refactor|docs: 简短描述
- 分支命名：feature/xxx、fix/xxx、chore/xxx
- 每个 PR 必须通过 lint + type-check
- 新增页面必须添加到 sitemap

## 常见陷阱
- Next.js Image 必须指定 width/height 或 fill，否则报错
- Framer Motion 的 AnimatePresence 需要子组件有 key
- shadcn/ui 组件需要先 npx shadcn-ui@latest add xxx 安装

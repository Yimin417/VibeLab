# VibeCodingShow

Vibe Coding 作品收录网站 —— 发现使用 AI 编程工具创作的最酷作品。

## 技术栈

- **框架**: Next.js 14 App Router
- **语言**: TypeScript (strict)
- **样式**: Tailwind CSS + shadcn/ui
- **动效**: Framer Motion
- **部署**: Vercel

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npx tsc --noEmit

# 代码检查
npm run lint

# 生产构建
npm run build
```

## 项目结构

```
app/                    # Next.js App Router 页面
  page.tsx              # 首页（筛选 + 搜索 + 项目网格）
  layout.tsx            # 根布局
  projects/[id]/        # 作品详情页
components/
  project/              # 业务组件（卡片、网格、筛选器等）
  ui/                   # shadcn/ui 基础组件
  Header.tsx            # 导航栏
  Footer.tsx            # 页脚
data/
  projects.json         # 作品数据
lib/
  data.ts               # 数据查询与筛选
  constants.ts          # 筛选选项常量
  formatDate.ts         # 日期格式化
  utils.ts              # className 合并工具
types/
  index.ts              # TypeScript 类型定义
```

## 功能

- 作品网格展示（响应式 4/3/2 列）
- 多选筛选：按 AI 工具、分类、设计风格
- 防抖搜索
- URL 参数驱动的筛选（可分享链接）
- 作品详情页（画廊、标签、外部链接）
- Framer Motion 动画（悬浮上浮、页面过渡）
- 骨架屏加载状态

## 添加作品

编辑 `data/projects.json`，按以下格式添加：

```json
{
  "id": "my-project",
  "title": "作品名称",
  "description": "简短描述",
  "longDescription": "详细介绍",
  "tools": ["Cursor", "Claude"],
  "category": "SaaS",
  "styles": ["Cyberpunk", "Dark Mode"],
  "imageUrl": "https://picsum.photos/seed/my-project/600/400",
  "gallery": [
    "https://picsum.photos/seed/p1/800/600",
    "https://picsum.photos/seed/p2/800/600"
  ],
  "demoUrl": "https://my-project.vercel.app",
  "repoUrl": "https://github.com/user/my-project",
  "author": "YourName",
  "createdAt": "2025-06-01",
  "featured": true
}
```

## 部署

项目可直接导入 Vercel，零配置自动部署。详情见 [Vercel 文档](https://vercel.com/docs)。

## 许可

MIT License

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "提交作品",
  description: "提交你的 Vibe Coding 作品到 VibeLab，让更多人看到你的创作。",
};

const JSON_TEMPLATE = `{
  "id": "your-project-id",
  "title": "你的项目名称",
  "description": "简短描述（一句话）",
  "longDescription": "详细描述项目的功能、技术栈和创作过程",
  "tools": ["Cursor", "Claude"],
  "category": "Game",
  "styles": ["Cyberpunk", "Dark Mode"],
  "imageUrl": "https://images.unsplash.com/...",
  "gallery": [
    "https://images.unsplash.com/...",
    "https://images.unsplash.com/..."
  ],
  "demoUrl": "https://your-project.vercel.app",
  "repoUrl": "https://github.com/yourname/your-project",
  "author": "你的昵称",
  "createdAt": "2026-01-15",
  "featured": false
}`;

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">
        <span className="gradient-text">提交作品</span>
      </h1>

      <section className="mt-8 space-y-6 text-text-secondary">
        <p>
          想要让你的作品出现在 VibeLab 上？请通过 GitHub Issue 提交，
          我们会尽快审核并收录。
        </p>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">
            提交步骤
          </h2>
          <ol className="list-decimal space-y-3 pl-5">
            <li>
              <a
                href="https://github.com/vibelab/vibelab/issues/new?title=作品提交:%20你的项目名称&labels=submission"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-primary-hover"
              >
                点击这里创建 GitHub Issue
              </a>
            </li>
            <li>将下方 JSON 模板复制到 Issue 中并填写你的项目信息</li>
            <li>提交 Issue 后将进入人工审核流程</li>
            <li>审核通过后你的作品将出现在 VibeLab 上</li>
          </ol>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">
            JSON 数据模板
          </h2>
          <pre className="overflow-x-auto rounded-xl border border-border-color bg-card-bg p-4 text-sm">
            <code>{JSON_TEMPLATE}</code>
          </pre>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">
            字段说明
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>tools</strong>：使用的 AI 工具，可选值：Cursor / Windsurf /
              Bolt / Replit / Claude / Copilot / v0 / Lovable
            </li>
            <li>
              <strong>category</strong>：项目分类，可选值：Landing Page /
              Dashboard / SaaS / Game / Tool / Portfolio / Mobile App / AI
              Application
            </li>
            <li>
              <strong>styles</strong>：设计风格，可选值：Minimal /
              Glassmorphism / Brutalist / Retro / Dark Mode / Cyberpunk /
              Neumorphism / Gradient
            </li>
            <li>
              <strong>imageUrl / gallery</strong>：建议使用 Unsplash
              图片（需提供完整的 https 链接）
            </li>
            <li>
              <strong>featured</strong>：是否推荐为精选，新提交设为 false
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

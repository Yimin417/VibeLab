import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于 VibeLab",
  description: "了解 Vibe Coding 和 VibeLab 的使命 —— 收录使用 AI 编程工具创作的作品。",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">
        <span className="gradient-text">关于 VibeLab</span>
      </h1>

      <section className="mt-8 space-y-6 text-text-secondary">
        <div>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">
            什么是 Vibe Coding？
          </h2>
          <p>
            Vibe Coding 是一种新兴的编程方式 —— 开发者通过与 AI 编程助手（如
            Cursor、Claude、Copilot 等）对话，用自然语言描述需求，让 AI
            生成代码。这种方式大幅降低了编程门槛，让更多人能够将创意转化为实际产品。
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">
            我们的使命
          </h2>
          <p>
            VibeLab 致力于收录和展示优秀的 Vibe Coding 作品。我们相信，AI
            辅助编程正在改变软件开发的方式，而这些作品正是这场变革的最好见证。
            无论你是有经验的开发者还是刚开始尝试的新手，都能在这里找到灵感。
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">
            提交指引
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>作品应主要通过 AI 编程工具辅助完成</li>
            <li>提交时需提供项目截图、描述和所使用的 AI 工具</li>
            <li>项目需要有可访问的演示链接或代码仓库</li>
            <li>我们欢迎任何类型的作品：网站、应用、游戏、工具等</li>
            <li>提交后我们会人工审核并决定是否收录</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">
            支持的工具
          </h2>
          <p>
            目前收录的作品涵盖以下 AI 编程工具：Cursor、Windsurf、Bolt、Replit、
            Claude、Copilot、v0、Lovable。如果你使用了其他工具，也欢迎提交。
          </p>
        </div>
      </section>
    </div>
  );
}

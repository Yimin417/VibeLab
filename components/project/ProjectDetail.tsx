"use client";

import { Badge } from "@/components/ui/badge";
import ProjectGallery from "@/components/project/ProjectGallery";
import ProjectLinks from "@/components/project/ProjectLinks";
import { formatDate } from "@/lib/formatDate";
import type { Project } from "@/types";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8"
    >
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        返回作品列表
      </Link>

      <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
        {/* Gallery */}
        <ProjectGallery
          images={project.gallery}
          title={project.title}
        />

        {/* Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold font-mono text-text-primary">
              {project.title}
            </h1>
            <p className="mt-2 text-text-secondary">{project.description}</p>
          </div>

          {/* Tools */}
          <div>
            <p className="text-xs font-medium text-text-secondary mb-2">
              AI 工具
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((tool) => (
                <Badge
                  key={tool}
                  className="border-primary/30 text-primary"
                  variant="outline"
                >
                  {tool}
                </Badge>
              ))}
            </div>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-text-secondary">分类</p>
              <p className="text-sm text-text-primary">{project.category}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-text-secondary">作者</p>
              <p className="text-sm text-text-primary font-mono">
                {project.author}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-text-secondary">提交日期</p>
              <p className="text-sm text-text-primary">
                {formatDate(project.createdAt)}
              </p>
            </div>
          </div>

          {/* Styles */}
          <div>
            <p className="text-xs font-medium text-text-secondary mb-2">
              设计风格
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.styles.map((style) => (
                <Badge
                  key={style}
                  variant="secondary"
                  className="bg-secondary/10 text-secondary hover:bg-secondary/20"
                >
                  {style}
                </Badge>
              ))}
            </div>
          </div>

          {/* Links */}
          <ProjectLinks
            demoUrl={project.demoUrl}
            repoUrl={project.repoUrl}
          />

          {/* Long description */}
          <div className="pt-4 border-t border-border-color">
            <h2 className="text-sm font-semibold text-text-primary mb-2">
              详细介绍
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
              {project.longDescription}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

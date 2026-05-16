import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/data";
import ProjectDetail from "@/components/project/ProjectDetail";
import ErrorState from "@/components/ui/ErrorState";

interface ProjectPageProps {
  params: { id: string };
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectById(params.id);
  if (!project) {
    return { title: "项目未找到" };
  }
  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectById(params.id);

  if (!project) {
    return (
      <ErrorState message={`项目 "${params.id}" 不存在，请检查链接是否正确。`} />
    );
  }

  return <ProjectDetail project={project} />;
}

import type { Metadata } from "next";

export const runtime = "edge";
import { getProjectById } from "@/lib/data";
import ProjectDetail from "@/components/project/ProjectDetail";
import LikeButton from "@/components/project/LikeButton";
import CommentSection from "@/components/project/CommentSection";
import ErrorState from "@/components/ui/ErrorState";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) {
    return { title: "项目未找到" };
  }
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      images: [{ url: project.imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.imageUrl],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return (
      <ErrorState message={`项目 "${id}" 不存在，请检查链接是否正确。`} />
    );
  }

  return (
    <>
      <ProjectDetail project={project} />
      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-center">
          <LikeButton projectId={project.id} />
        </div>
        <CommentSection projectId={project.id} />
      </div>
    </>
  );
}

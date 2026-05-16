"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
    >
      <Link
        href={`/projects/${project.id}`}
        className="group block rounded-xl border border-border-color bg-card-bg overflow-hidden transition-shadow hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]"
      >
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
          {project.featured && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-primary/90 text-white text-xs">
                精选
              </Badge>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-mono text-lg font-semibold text-text-primary truncate">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-text-secondary line-clamp-2">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tools.map((tool) => (
              <Badge
                key={tool}
                variant="outline"
                className="border-primary/30 text-primary text-xs"
              >
                {tool}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

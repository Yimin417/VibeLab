import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface ProjectLinksProps {
  demoUrl: string;
  repoUrl: string;
}

export default function ProjectLinks({ demoUrl, repoUrl }: ProjectLinksProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {demoUrl && (
        <Button asChild className="bg-primary hover:bg-primary-hover">
          <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            在线演示
          </Link>
        </Button>
      )}
      {repoUrl && (
        <Button
          asChild
          variant="outline"
          className="border-border-color text-text-secondary hover:text-text-primary"
        >
          <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            源代码
          </Link>
        </Button>
      )}
    </div>
  );
}

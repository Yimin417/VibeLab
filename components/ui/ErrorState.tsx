import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message?: string;
}

export default function ErrorState({
  message = "找不到该项目",
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <AlertCircle className="h-16 w-16 text-red-400/60" />
      <h2 className="mt-4 text-xl font-semibold text-text-primary">
        出错了
      </h2>
      <p className="mt-2 text-sm text-text-secondary max-w-md">{message}</p>
      <Button asChild className="mt-6 bg-primary hover:bg-primary-hover">
        <Link href="/">返回首页</Link>
      </Button>
    </div>
  );
}

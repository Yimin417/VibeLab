import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectDetailLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="h-4 w-24 mb-6" />
      <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-3">
          <Skeleton className="aspect-video w-full rounded-xl" />
          <div className="flex gap-2">
            <Skeleton className="h-16 w-24 rounded-lg" />
            <Skeleton className="h-16 w-24 rounded-lg" />
            <Skeleton className="h-16 w-24 rounded-lg" />
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-5 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
          </div>
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </div>
  );
}

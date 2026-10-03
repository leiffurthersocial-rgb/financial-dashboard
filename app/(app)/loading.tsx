import { Skeleton } from "@/components/feedback/skeleton";

export default function Loading() {
  return (
    <div role="status" aria-busy="true">
      <span className="sr-only">Loading page</span>
      <div className="mb-section space-y-3 border-b border-line pb-6">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-10 w-64" />
      </div>
      <div className="grid gap-gutter md:grid-cols-2 xl:grid-cols-12">
        <Skeleton className="h-72 rounded-card md:col-span-2 xl:col-span-7" />
        <Skeleton className="h-72 rounded-card xl:col-span-5" />
        <Skeleton className="h-64 rounded-card md:col-span-2 xl:col-span-8" />
        <Skeleton className="h-64 rounded-card xl:col-span-4" />
      </div>
    </div>
  );
}

export default function PostCardSkeleton() {
  return (
    <div className="animate-pulse rounded border border-card-border bg-card p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-card-border" />
        <div className="space-y-1">
          <div className="h-3 w-24 rounded bg-card-border" />
          <div className="h-2 w-16 rounded bg-card-border" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-card-border" />
        <div className="h-3 w-4/5 rounded bg-card-border" />
        <div className="h-3 w-3/5 rounded bg-card-border" />
      </div>
      <div className="mt-4 border-t border-card-border pt-4">
        <div className="h-3 w-20 rounded bg-card-border" />
      </div>
    </div>
  );
}

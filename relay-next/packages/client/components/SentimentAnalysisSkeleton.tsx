export default function SentimentAnalysisSkeleton() {
  return (
    <div className="rounded border border-card-border bg-card p-6">
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted">
        Sentiment Analysis
      </h2>
      <div className="flex items-center gap-3 text-sm text-foreground">
        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-card-border border-t-accent" />
        <span className="animate-pulse">Analyzing sentiment&hellip;</span>
      </div>
    </div>
  );
}

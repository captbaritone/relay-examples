import { graphql, serverFragment } from "@/relay/server";
import { SentimentAnalysis_post$key } from "./__generated__/SentimentAnalysis_post.graphql";

export default async function SentimentAnalysis({
  postRef,
}: {
  postRef: SentimentAnalysis_post$key;
}) {
  const post = await serverFragment(
    graphql`
      fragment SentimentAnalysis_post on Post {
        sentimentAnalysis
      }
    `,
    postRef,
  );

  return (
    <div className="rounded border border-card-border bg-card p-6">
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted">
        Sentiment Analysis
      </h2>
      <p className="leading-relaxed text-foreground italic">
        {post.sentimentAnalysis}
      </p>
    </div>
  );
}

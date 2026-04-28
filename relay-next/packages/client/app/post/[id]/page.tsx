import { Suspense } from "react";
import { notFound } from "next/navigation";
import { graphql, fetchQueryServer } from "@/relay/server";
import { PostPageQuery } from "./__generated__/PostPageQuery.graphql";
import PostCard from "@/components/PostCard";
import SentimentAnalysis from "@/components/SentimentAnalysis";
import SentimentAnalysisSkeleton from "@/components/SentimentAnalysisSkeleton";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = decodeURIComponent(id);

  const data = await fetchQueryServer<PostPageQuery>(
    graphql`
      query PostPageQuery($id: ID!) @throwOnFieldError {
        post(id: $id) {
          ...PostCard_post
          # Sentiment analysis is quite slow, so we fetch
          # it in a deferred fragment to allow the main
          # page to load while we wait for the analysis to complete.
          ...SentimentAnalysis_post @defer
        }
      }
    `,
    { id: postId },
  );

  if (!data.post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-8">
      <PostCard postRef={data.post} />
      <Suspense fallback={<SentimentAnalysisSkeleton />}>
        <SentimentAnalysis postRef={data.post} />
      </Suspense>
    </div>
  );
}

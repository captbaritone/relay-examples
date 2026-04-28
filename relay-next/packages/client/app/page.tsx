import { graphql, fetchQueryServer, StreamList } from "@/relay/server";
import { FeedQuery } from "./__generated__/FeedQuery.graphql";
import CreatePostForm from "@/components/CreatePostForm";
import { ForYouFeed_forYou$key } from "./__generated__/ForYouFeed_forYou.graphql";
import PostCard from "@/components/PostCard";
import PostCardSkeleton from "@/components/PostCardSkeleton";

export default async function Home() {
  const data = await fetchQueryServer<FeedQuery>(
    graphql`
      query FeedQuery @throwOnFieldError {
        forYou(first: 5) {
          ...ForYouFeed_forYou
        }
      }
    `,
    {},
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-14 text-4xl italic tracking-tight text-accent">
        For You
      </h1>
      <CreatePostForm />
      <div className="mt-10 space-y-10">
        <Feed forYouRef={data.forYou} />
      </div>
    </div>
  );
}

function Feed({ forYouRef }: { forYouRef: ForYouFeed_forYou$key }) {
  const fragment = graphql`
    fragment ForYouFeed_forYou on PostStreamableConnection @throwOnFieldError {
      edges @stream(initialCount: 1) {
        node {
          id
          ...PostCard_post
        }
      }
    }
  `;
  return (
    <StreamList
      fragmentInput={fragment}
      fragmentRef={forYouRef}
      getStreamField={(data) => data.edges}
      renderItem={(edge) => <PostCard key={edge.node.id} postRef={edge.node} />}
      loadingFallback={<PostCardSkeleton />}
    />
  );
}

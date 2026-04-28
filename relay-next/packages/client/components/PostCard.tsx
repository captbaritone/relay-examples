import { graphql, serverFragment } from "@/relay/server";
import { PostCard_post$key } from "./__generated__/PostCard_post.graphql";
import PostContent from "./PostContent";
import UpvoteButton from "./UpvoteButton";
import CommentSection from "./CommentSection";

export default async function PostCard({
  postRef,
}: {
  postRef: PostCard_post$key;
}) {
  const post = await serverFragment(
    graphql`
      fragment PostCard_post on Post @throwOnFieldError {
        id
        upvoteCount
        comments {
          totalCount
        }
        ...PostContent_post
        ...CommentSection_post
      }
    `,
    postRef,
  );

  return (
    <div className="rounded border border-card-border bg-card p-6">
      <PostContent postRef={post} />

      <div className="flex items-center gap-4 border-t border-card-border pt-4">
        <UpvoteButton postId={post.id} initialCount={post.upvoteCount} />
        <span className="text-sm text-muted">
          {post.comments.totalCount} {post.comments.totalCount === 1 ? "comment" : "comments"}
        </span>
      </div>

      <CommentSection postRef={post} />
    </div>
  );
}

import { graphql, serverFragment } from "@/relay/server";
import { CommentSection_post$key } from "./__generated__/CommentSection_post.graphql";
import AddCommentForm from "./AddCommentForm";

export default async function CommentSection({
  postRef,
}: {
  postRef: CommentSection_post$key;
}) {
  const post = await serverFragment(
    graphql`
      fragment CommentSection_post on Post @throwOnFieldError {
        id
        comments {
          edges {
            node {
              id
              content
              author {
                name
              }
            }
          }
        }
      }
    `,
    postRef,
  );

  const commentNodes = post.comments.edges.map((e) => e.node);

  return (
    <div className="mt-4 border-t border-card-border pt-4">
      {commentNodes.length > 0 && (
        <div className="mb-3 space-y-2">
          {commentNodes.map((c) => (
            <div key={c.id} className="text-sm">
              <span className="font-medium text-foreground">{c.author.name}</span>{" "}
              <span className="text-muted">
                {c.content}
              </span>
            </div>
          ))}
        </div>
      )}
      <AddCommentForm postId={post.id} />
    </div>
  );
}

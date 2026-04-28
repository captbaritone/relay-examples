import { graphql, serverFragment } from "@/relay/server";
import { TextPostContent_post$key } from "./__generated__/TextPostContent_post.graphql";
import PostBody from "./PostBody";
import Markdown from "./Markdown";

export default async function TextPostContent({
  postRef,
}: {
  postRef: TextPostContent_post$key;
}) {
  const post = await serverFragment(
    graphql`
      fragment TextPostContent_post on TextPost @throwOnFieldError {
        content
        ...PostBody_post
      }
    `,
    postRef,
  );

  return (
    <PostBody postRef={post}>
      <div className="mb-3 leading-relaxed text-foreground">
        <Markdown content={post.content} />
      </div>
    </PostBody>
  );
}

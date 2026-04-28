import { graphql, serverFragment } from "@/relay/server";
import { PostContent_post$key } from "./__generated__/PostContent_post.graphql";

export default async function PostContent({
  postRef,
}: {
  postRef: PostContent_post$key;
}) {
  const post = await serverFragment(
    graphql`
      fragment PostContent_post on Post @throwOnFieldError {
        __typename
        ...TextPostContent_post @alias
        ...ImagePostContent_post @alias
      }
    `,
    postRef,
  );

  // Dynamic imports here control which client bundles the browser downloads.
  // This is the RSC equivalent of Relay's @match/@module data-driven
  // dependencies — the server decides which component to render and only
  // that variant's client JS is referenced in the RSC payload.
  //
  // In practice, TextPostContent pulls in the Mermaid.js library (~218KB)
  // for rendering diagrams in markdown. With static imports, every route's
  // client-reference manifest would include the Mermaid chunk — so even
  // image post pages would download it. Dynamic imports ensure the chunk
  // is only requested when the server actually renders a text post.
  //
  // Note: Turbopack may split large dependencies into their own chunk
  // regardless of import style, but static imports still cause the chunk
  // to appear in the manifest for all routes. The dynamic import controls
  // *when* the chunk is loaded, not whether it's split.
  if (post.TextPostContent_post) {
    const TextPostContent = (await import("./TextPostContent")).default;
    return <TextPostContent postRef={post.TextPostContent_post} />;
  }
  if (post.ImagePostContent_post) {
    const ImagePostContent = (await import("./ImagePostContent")).default;
    return <ImagePostContent postRef={post.ImagePostContent_post} />;
  }
  return null;
}

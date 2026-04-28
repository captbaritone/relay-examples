import Link from "next/link";
import { graphql, serverFragment } from "@/relay/server";
import { ImagePostContent_post$key } from "./__generated__/ImagePostContent_post.graphql";
import PostBody from "./PostBody";

export default async function ImagePostContent({
  postRef,
}: {
  postRef: ImagePostContent_post$key;
}) {
  const post = await serverFragment(
    graphql`
      fragment ImagePostContent_post on ImagePost @throwOnFieldError {
        id
        content
        imageUrl
        imageAltText
        ...PostBody_post
      }
    `,
    postRef,
  );

  return (
    <PostBody postRef={post}>
      <p className="mb-3 leading-relaxed text-foreground">{post.content}</p>
      <Link href={`/image/${post.id}`}>
        <img
          src={post.imageUrl}
          alt={post.imageAltText ?? ""}
          className="mb-3 w-full cursor-pointer rounded-lg object-cover"
        />
      </Link>
    </PostBody>
  );
}

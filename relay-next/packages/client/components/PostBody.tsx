import Link from "next/link";
import { ReactNode } from "react";
import { graphql, serverFragment } from "@/relay/server";
import { PostBody_post$key } from "./__generated__/PostBody_post.graphql";
import UserAvatar from "./UserAvatar";

export default async function PostBody({
  postRef,
  children,
}: {
  postRef: PostBody_post$key;
  children?: ReactNode;
}) {
  const post = await serverFragment(
    graphql`
      fragment PostBody_post on Post @throwOnFieldError {
        id
        createdAt
        author {
          id
          name
          ...UserAvatar_user
        }
      }
    `,
    postRef,
  );

  const date = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(post.createdAt));

  return (
    <>
      <div className="mb-4 flex min-w-0 items-center gap-2">
        <Link href={`/user/${post.author.id}`}>
          <UserAvatar userRef={post.author} />
        </Link>
        <div className="min-w-0">
          <Link
            href={`/user/${post.author.id}`}
            className="font-medium text-foreground hover:text-accent truncate"
          >
            {post.author.name}
          </Link>
          <Link
            href={`/post/${post.id}`}
            className="ml-2 text-sm text-muted hover:text-accent"
          >
            <time dateTime={post.createdAt}>{date}</time>
          </Link>
        </div>
      </div>

      {children}
    </>
  );
}

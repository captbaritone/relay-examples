import { notFound } from "next/navigation";
import { graphql, fetchQueryServer } from "@/relay/server";
import { UserPageQuery } from "./__generated__/UserPageQuery.graphql";
import PostCard from "@/components/PostCard";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = decodeURIComponent(id);

  const data = await fetchQueryServer<UserPageQuery>(
    graphql`
      query UserPageQuery($id: ID!) @throwOnFieldError {
        user(id: $id) {
          name
          posts {
            ...PostCard_post
            id
          }
        }
      }
    `,
    { id: userId },
  );

  if (!data.user) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">{data.user.name}</h1>
      <div className="space-y-6">
        {data.user.posts.map((post) => (
          <PostCard key={post.id} postRef={post} />
        ))}
      </div>
    </div>
  );
}

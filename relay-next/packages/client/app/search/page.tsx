import { graphql, fetchQueryServer } from "@/relay/server";
import { SearchPageQuery } from "./__generated__/SearchPageQuery.graphql";
import PostCard from "@/components/PostCard";
import SearchInput from "@/components/SearchInput";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <SearchInput />
      {q?.trim() ? (
        <SearchResults query={q.trim()} />
      ) : (
        <p className="mt-16 text-center text-sm italic text-muted">
          Search the community
        </p>
      )}
    </div>
  );
}

async function SearchResults({ query }: { query: string }) {
  const data = await fetchQueryServer<SearchPageQuery>(
    graphql`
      query SearchPageQuery($query: String!) @throwOnFieldError {
        searchPosts(query: $query, first: 20) {
          edges {
            node {
              id
              ...PostCard_post
            }
          }
          totalCount
        }
      }
    `,
    { query },
  );

  const posts = data.searchPosts.edges;
  const count = data.searchPosts.totalCount;

  if (posts.length === 0) {
    return (
      <p className="mt-16 text-center text-sm italic text-muted">
        No results
      </p>
    );
  }

  return (
    <>
      <p className="mt-6 mb-10 text-xs uppercase tracking-widest text-muted">
        {count} result{count === 1 ? "" : "s"}
      </p>
      <div className="space-y-10">
        {posts.map((edge) => (
          <PostCard key={edge.node.id} postRef={edge.node} />
        ))}
      </div>
    </>
  );
}

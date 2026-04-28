import { notFound } from "next/navigation";
import { graphql, fetchQueryServer } from "@/relay/server";
import { ImageDetailQuery } from "./__generated__/ImageDetailQuery.graphql";

export default async function ImageDetail({ id }: { id: string }) {
  const data = await fetchQueryServer<ImageDetailQuery>(
    graphql`
      query ImageDetailQuery($id: ID!) @throwOnFieldError {
        post(id: $id) {
          ... on ImagePost {
            imageUrl
            imageAltText
          }
        }
      }
    `,
    { id },
  );

  const imageUrl = data.post?.imageUrl;
  const imageAltText = data.post?.imageAltText;
  if (!imageUrl) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center">
      <img
        src={imageUrl}
        alt={imageAltText ?? ""}
        className="max-h-[85vh] object-contain"
      />
      {imageAltText && (
        <p className="mt-3 text-center text-sm text-gray-300">
          {imageAltText}
        </p>
      )}
    </div>
  );
}

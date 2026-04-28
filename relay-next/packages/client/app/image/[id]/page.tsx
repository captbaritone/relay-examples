import ImageDetail from "@/components/ImageDetail";

export default async function ImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <ImageDetail id={decodedId} />
    </div>
  );
}

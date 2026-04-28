import Modal from "@/components/Modal";
import ImageDetail from "@/components/ImageDetail";

export default async function ImageModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  return (
    <Modal>
      <ImageDetail id={decodedId} />
    </Modal>
  );
}

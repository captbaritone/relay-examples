"use client";

import { useState, useTransition } from "react";
import { createPost } from "@/app/actions";

const inputClass =
  "w-full rounded border border-card-border bg-background px-3 py-1 text-sm text-foreground placeholder:text-muted disabled:opacity-50";

export default function CreatePostForm() {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAltText, setImageAltText] = useState("");
  const [includeImage, setIncludeImage] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="rounded border border-dashed border-card-border bg-card p-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isPending}
        placeholder="What's on your mind?"
        className={`${inputClass} resize-none p-3`}
        rows={3}
      />
      <div className="mt-2 flex items-center gap-3">
        <label className="flex items-center gap-1 text-sm text-muted">
          <input
            type="checkbox"
            checked={includeImage}
            disabled={isPending}
            onChange={() => setIncludeImage(!includeImage)}
          />
          Include image
        </label>
      </div>
      {includeImage && (
        <>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={isPending}
            placeholder="Image URL"
            className={`mt-2 ${inputClass}`}
          />
          <input
            type="text"
            value={imageAltText}
            onChange={(e) => setImageAltText(e.target.value)}
            disabled={isPending}
            placeholder="Alt text (optional)"
            className={`mt-2 ${inputClass}`}
          />
        </>
      )}
      <button
        disabled={isPending || content.trim() === ""}
        className="mt-3 rounded bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-50"
        onClick={() => {
          const c = content;
          const img = imageUrl;
          const alt = imageAltText;
          setContent("");
          setImageUrl("");
          setImageAltText("");
          setIncludeImage(false);
          startTransition(async () => {
            await createPost(c, includeImage ? img : undefined, includeImage ? alt || undefined : undefined);
          });
        }}
      >
        {isPending ? "Posting..." : "Post"}
      </button>
    </div>
  );
}

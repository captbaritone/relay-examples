"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { addComment } from "@/app/actions";

function FormContent() {
  const { pending } = useFormStatus();
  return (
    <>
      <input
        type="text"
        name="content"
        disabled={pending}
        placeholder="Add a comment..."
        className="flex-1 rounded border border-card-border bg-background px-3 py-1 text-sm text-foreground placeholder:text-muted disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded bg-accent px-4 py-1.5 text-sm text-white hover:bg-accent-hover disabled:opacity-50"
      >
        {pending ? "..." : "Comment"}
      </button>
    </>
  );
}

export default function AddCommentForm({ postId }: { postId: string }) {
  const [formKey, setFormKey] = useState(0);

  return (
    <form
      key={formKey}
      action={async (formData) => {
        const content = formData.get("content") as string;
        if (!content?.trim()) return;
        setFormKey((k) => k + 1);
        await addComment(postId, content);
      }}
      className="flex gap-2"
    >
      <FormContent />
    </form>
  );
}

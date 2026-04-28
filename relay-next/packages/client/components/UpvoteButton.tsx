"use client";

import { useState, useOptimistic, useTransition } from "react";
import { upvotePost } from "@/app/actions";

export default function UpvoteButton({
  postId,
  initialCount,
}: {
  postId: string;
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();
  const [optimisticCount, setOptimisticCount] = useOptimistic(count);

  return (
    <button
      aria-label={`Upvote (${optimisticCount})`}
      className="flex items-center gap-1 rounded px-2 py-1.5 text-sm text-muted hover:bg-background hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-50"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          setOptimisticCount((c) => c + 1);
          const newCount = await upvotePost(postId);
          if (newCount != null) {
            setCount(newCount);
          }
        });
      }}
    >
      <span aria-hidden="true">&#9650;</span>
      <span>{optimisticCount}</span>
    </button>
  );
}

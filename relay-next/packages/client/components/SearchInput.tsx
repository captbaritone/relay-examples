"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useTransition } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
      >
        <path
          fillRule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clipRule="evenodd"
        />
      </svg>
      <input
        type="search"
        ref={inputRef}
        defaultValue={searchParams.get("q") ?? ""}
        onChange={(e) => {
          const q = e.target.value;
          startTransition(() => {
            if (q.trim()) {
              router.replace(`/search?q=${encodeURIComponent(q.trim())}`, {
                scroll: false,
              });
            } else {
              router.replace("/search", { scroll: false });
            }
          });
        }}
        placeholder="Search posts…"
        className="w-full border-b border-card-border bg-transparent py-3 pl-10 pr-10 text-lg text-foreground outline-none placeholder:text-muted/60 focus:border-accent"
      />
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-[delayedFadeIn_300ms_ease-out_200ms_both]">
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-card-border border-t-accent" />
        </div>
      )}
    </div>
  );
}

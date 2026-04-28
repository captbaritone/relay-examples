"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect, useRef } from "react";

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    overlayRef.current?.focus();
    return () => {
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close]);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 overscroll-contain"
      onClick={close}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 text-3xl text-white hover:text-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
      >
        &times;
      </button>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

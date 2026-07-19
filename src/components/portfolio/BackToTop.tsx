"use client";

export function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed right-6 bottom-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center border-2 border-ink bg-accent font-display text-[20px] text-ink hover:bg-paper"
    >
      ↑
    </button>
  );
}
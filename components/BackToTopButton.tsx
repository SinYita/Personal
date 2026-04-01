"use client";

export default function BackToTopButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 rounded-full border border-[var(--border)] bg-[var(--background)]/90 px-4 py-2 text-sm font-medium text-[var(--muted)] shadow-sm backdrop-blur-md transition-colors hover:border-[var(--accent)] hover:text-[var(--foreground)]"
      aria-label="Back to top"
    >
      Back to top
    </button>
  );
}
"use client";
import Link from "next/link";

export default function BackButton() {
  return (
    <Link
      href="/blog"
      className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors inline-flex items-center gap-2"
    >
      <span>←</span> Back to blog
    </Link>
  );
}

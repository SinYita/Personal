"use client";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function BackButton() {
  const { t } = useLanguage();
  
  return (
    <Link
      href="/blog"
      className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors inline-flex items-center gap-2"
    >
      <span>←</span> {t.blog.back}
    </Link>
  );
}

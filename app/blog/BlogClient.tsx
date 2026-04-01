"use client";
import Link from "next/link";
import { PostMeta } from "@/lib/posts";

export default function BlogClient({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="flex flex-col space-y-16 pb-20">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">All Posts</h1>
        <p className="text-[var(--muted)] leading-relaxed">
          Notes, thoughts, and technical writing.
        </p>
      </section>

      <section>
        <div className="flex flex-col gap-10">
          {posts.length === 0 ? (
            <p className="text-[var(--muted)]">No posts available yet.</p>
          ) : (
            posts.map((post) => (
              <div key={post.slug} className="group">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-2 sm:gap-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-medium text-lg text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors"
                  >
                    {post.title}
                  </Link>
                  <span className="text-sm text-[var(--muted)] font-mono shrink-0">
                    {post.date}
                  </span>
                </div>
                {post.excerpt && (
                  <p className="text-[var(--muted)] leading-relaxed mb-3">
                    {post.excerpt}
                  </p>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-[var(--muted)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

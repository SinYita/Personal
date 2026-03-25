import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | SinYita",
  description: "Technical articles, learning notes, and thoughts.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col space-y-16 pb-20">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">所有博客</h1>
        <p className="text-[var(--muted)] leading-relaxed">
          记录技术学习、项目心得与思考。
        </p>
      </section>

      <section>
        <div className="flex flex-col gap-10">
          {posts.length === 0 ? (
            <p className="text-[var(--muted)]">暂无文章，敬请期待。</p>
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

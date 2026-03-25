import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "博客 | My Personal Website",
  description: "技术文章、学习笔记和思考记录。",
};

export default function BlogPage() {
  const posts = getAllPosts();

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">博客</h1>
        <p style={{ color: "var(--muted)" }}>
          记录技术学习、项目心得与思考，支持 Markdown 写作与 LaTeX 数学公式。
        </p>
      </div>

      {/* Tags filter bar (static display) */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm" style={{ color: "var(--muted)" }}>标签：</span>
        {allTags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full text-xs font-medium"
            style={{
              background: "color-mix(in srgb, var(--accent) 10%, transparent)",
              color: "var(--accent)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Posts list */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div
            className="rounded-xl p-8 text-center"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
          >
            <p style={{ color: "var(--muted)" }}>暂无文章，敬请期待。</p>
          </div>
        ) : (
          posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-xl p-5 transition-colors hover:shadow-md"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <div className="flex justify-between items-start gap-3 flex-wrap">
                <h2 className="font-semibold text-lg hover:underline">{post.title}</h2>
                <span className="text-xs shrink-0" style={{ color: "var(--muted)" }}>
                  {post.date}
                </span>
              </div>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-xs"
                    style={{ background: "var(--border)", color: "var(--muted)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

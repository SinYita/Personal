import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getAllPostSlugs } from "@/lib/posts";
import MarkdownContent from "@/components/MarkdownContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "文章未找到" };
  return {
    title: `${post.title} | 博客`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        href="/blog"
        className="text-sm inline-flex items-center gap-1"
        style={{ color: "var(--accent)" }}
      >
        ← 返回博客
      </Link>

      {/* Post header */}
      <header className="space-y-3">
        <h1 className="text-3xl font-bold leading-tight">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm" style={{ color: "var(--muted)" }}>
          <time dateTime={post.date}>{post.date}</time>
          <span>·</span>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-xs"
                style={{
                  background: "color-mix(in srgb, var(--accent) 12%, transparent)",
                  color: "var(--accent)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {post.excerpt && (
          <p className="text-base italic" style={{ color: "var(--muted)" }}>
            {post.excerpt}
          </p>
        )}
      </header>

      <hr style={{ borderColor: "var(--border)" }} />

      {/* Post content */}
      <MarkdownContent content={post.content} />

      <hr style={{ borderColor: "var(--border)" }} />

      {/* Footer nav */}
      <footer>
        <Link
          href="/blog"
          className="text-sm"
          style={{ color: "var(--accent)" }}
        >
          ← 返回博客列表
        </Link>
      </footer>
    </article>
  );
}

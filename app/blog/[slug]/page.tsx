import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackButton from "./BackButton";
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
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto flex flex-col pb-20 w-full">
      <div className="mb-10">
        <BackButton />
      </div>

      <header className="space-y-4 mb-16">
        <div className="flex flex-col gap-3">
          <time dateTime={post.date} className="text-sm text-[var(--muted)] font-mono">
            {post.date}
          </time>
          <h1 className="text-3xl font-semibold tracking-tight leading-snug">{post.title}</h1>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium text-[var(--muted)]">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {post.excerpt && (
          <p className="text-base text-[var(--muted)] leading-relaxed pt-2">
            {post.excerpt}
          </p>
        )}
      </header>

      <div className="mb-16">
        <MarkdownContent content={post.content} />
      </div>

      <hr className="border-t border-[var(--border)] my-8" />

      <footer>
        <BackButton />
      </footer>
    </article>
  );
}

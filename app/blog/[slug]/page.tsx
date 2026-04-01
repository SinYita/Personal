import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackButton from "./BackButton";
import { getPost, getAllPostSlugs } from "@/lib/posts";
import MarkdownContent from "@/components/MarkdownContent";

interface Props {
  params: Promise<{ slug: string }>;
}

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractToc(content: string): TocItem[] {
  const lines = content.split("\n");
  const items: TocItem[] = [];

  for (const line of lines) {
    const match = line.match(/^\s{0,3}(##|###)\s+(.+)\s*$/);
    if (!match) continue;

    const hashes = match[1];
    const rawText = match[2].replace(/[#*_`~\[\]]/g, "").trim();
    const id = slugify(rawText);
    if (!id) continue;

    items.push({
      id,
      text: rawText,
      level: hashes.length as 2 | 3,
    });
  }

  return items;
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

  const toc = extractToc(post.content);

  return (
    <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)] mb-4">
            On this page
          </p>
          {toc.length > 0 ? (
            <nav aria-label="Article table of contents">
              <ul className="space-y-2">
                {toc.map((item) => (
                  <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                    <a
                      href={`#${item.id}`}
                      className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : (
            <p className="text-sm text-[var(--muted)]">No headings</p>
          )}
        </div>
      </aside>

      <article className="max-w-3xl mx-auto flex flex-col pb-20 w-full">
        <div className="mb-10">
          <BackButton />
        </div>

        <header className="space-y-4 mb-16">
          <div className="flex flex-col gap-3">
            <time dateTime={post.date} className="text-sm text-[var(--muted)] font-mono">
              {post.date}
            </time>
            <h1 className="text-4xl font-semibold leading-snug">{post.title}</h1>
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
            <p className="text-lg text-[var(--muted)] leading-relaxed pt-2">
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
    </div>
  );
}

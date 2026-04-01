"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { PostMeta } from "@/lib/posts";

export default function BlogClient({ posts }: { posts: PostMeta[] }) {
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    selectedTag ? new Set([selectedTag]) : new Set()
  );

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
  const recentPosts = posts.slice(0, 5);
  const selectedTagList = Array.from(selectedTags);

  const handleTagClick = (tag: string) => {
    const newTags = new Set(selectedTags);
    if (newTags.has(tag)) {
      newTags.delete(tag);
    } else {
      newTags.add(tag);
    }
    setSelectedTags(newTags);
  };

  const filteredPosts =
    selectedTags.size === 0
      ? posts
      : posts.filter((post) =>
          Array.from(selectedTags).some((tag) => post.tags.includes(tag))
        );

  return (
    <div className="grid gap-12 pb-20 lg:grid-cols-[minmax(0,1fr)_260px]">
      <section className="space-y-10">
        <header className="space-y-4 border-b border-[var(--border)] pb-8">
          <p className="text-sm text-[var(--muted)]">
            <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
              Home
            </Link>
            <span className="px-2">›</span>
            <span>Blog</span>
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">Latest Posts</h1>
          <p className="text-[var(--muted)] leading-relaxed">
            Technical writing, research notes, and engineering walkthroughs.
          </p>
        </header>

        <div className="space-y-10">
          {filteredPosts.length === 0 ? (
            <p className="text-[var(--muted)]">No posts match the selected tags.</p>
          ) : (
            filteredPosts.map((post) => (
              <article key={post.slug} className="border-b border-[var(--border)] pb-10 last:border-b-0">
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-2xl font-semibold leading-tight hover:text-[var(--accent)] transition-colors"
                  >
                    {post.title}
                  </Link>
                  <time className="shrink-0 font-mono text-sm text-[var(--muted)]" dateTime={post.date}>
                    {post.date}
                  </time>
                </div>

                {post.excerpt && (
                  <p className="mb-4 text-[var(--muted)] leading-relaxed">{post.excerpt}</p>
                )}

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                          selectedTags.has(tag)
                            ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--background)]"
                            : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--foreground)]"
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                )}
              </article>
            ))
          )}
        </div>
      </section>

      <aside className="space-y-8 lg:sticky lg:top-24 lg:h-fit">
        <section className="border-l border-[var(--border)] pl-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">
            Recently Updated
          </h2>
          <ul className="space-y-2">
            {recentPosts.map((post) => (
              <li key={`recent-${post.slug}`}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-l border-[var(--border)] pl-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">
            Trending Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={`sidebar-${tag}`}
                onClick={() => handleTagClick(tag)}
                className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                  selectedTags.has(tag)
                    ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--background)]"
                    : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--foreground)]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {selectedTagList.length > 0 && (
          <section className="border-l border-[var(--border)] pl-4">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">
              Active Filters
            </h2>
            <div className="flex flex-wrap gap-2">
              {selectedTagList.map((tag) => (
                <button
                  key={`active-${tag}`}
                  onClick={() => handleTagClick(tag)}
                  className="rounded-full border border-[var(--accent)] bg-[var(--accent)] px-2.5 py-1 text-xs text-[var(--background)]"
                >
                  #{tag} ×
                </button>
              ))}
            </div>
          </section>
        )}
      </aside>
    </div>
  );
}

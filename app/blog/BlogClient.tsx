"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { PostMeta } from "@/lib/posts";
import TagChip from "@/components/TagChip";

export default function BlogClient({ posts }: { posts: PostMeta[] }) {
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag");
  const ALL_TAG = "All";
  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    selectedTag ? new Set([selectedTag]) : new Set([ALL_TAG])
  );

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();

  const handleTagClick = (tag: string) => {
    if (tag === ALL_TAG) {
      setSelectedTags(new Set([ALL_TAG]));
      return;
    }

    const newTags = new Set(selectedTags);
    newTags.delete(ALL_TAG);
    if (newTags.has(tag)) {
      newTags.delete(tag);
    } else {
      newTags.add(tag);
    }
    if (newTags.size === 0) {
      newTags.add(ALL_TAG);
    }
    setSelectedTags(newTags);
  };

  const filteredPosts =
    selectedTags.has(ALL_TAG)
      ? posts
      : posts.filter((post) =>
          Array.from(selectedTags).some((tag) => post.tags.includes(tag))
        );

  return (
    <div className="grid gap-10 pb-20 lg:grid-cols-[minmax(0,1fr)_160px]">
      <div className="space-y-16">
        <section className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight">All Posts</h1>
          <p className="text-base text-[var(--muted)] leading-relaxed">
            Notes, thoughts, and technical writing.
          </p>
        </section>

        <section>
          <div className="flex flex-col gap-10">
            {filteredPosts.length === 0 ? (
              <p className="text-[var(--muted)]">No posts available yet.</p>
            ) : (
              filteredPosts.map((post) => (
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
                    <p className="text-sm text-[var(--muted)] leading-relaxed mb-3">
                      {post.excerpt}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {post.tags.map((tag) => (
                        <TagChip
                          key={tag}
                          label={tag}
                          withHash
                          selected={selectedTags.has(tag)}
                          onClick={() => handleTagClick(tag)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {allTags.length > 0 && (
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-4 pl-2">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-[var(--foreground)]">Tags</h2>
            <div className="flex flex-wrap gap-2">
              <TagChip
                key={ALL_TAG}
                label={ALL_TAG}
                selected={selectedTags.has(ALL_TAG)}
                onClick={() => handleTagClick(ALL_TAG)}
              />
              {allTags.map((tag) => (
                <TagChip
                  key={tag}
                  label={tag}
                  withHash
                  selected={selectedTags.has(tag)}
                  onClick={() => handleTagClick(tag)}
                />
              ))}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

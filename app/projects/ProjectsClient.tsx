"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { ProjectMeta } from "@/lib/projects";

export default function ProjectsClient({ projects }: { projects: ProjectMeta[] }) {
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag");
  const ALL_TAG = "All";
  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    selectedTag ? new Set([selectedTag]) : new Set([ALL_TAG])
  );

  const skillTags = Array.from(new Set(projects.flatMap((project) => project.techStack))).sort();

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

  const filteredProjects =
    selectedTags.has(ALL_TAG)
      ? projects
      : projects.filter((project) =>
          Array.from(selectedTags).every((tag) => project.techStack.includes(tag))
        );

  return (
    <div className="flex flex-col space-y-16 pb-20">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <p className="text-[var(--muted)] leading-relaxed">
          A collection of production work, side projects, and technical experiments.
        </p>
      </section>

      {/* Skill Tags */}
      <section className="space-y-6">
        <h2 className="text-sm font-semibold tracking-wider uppercase text-[var(--foreground)]">Skill Tags</h2>
        <div className="flex flex-wrap gap-3">
          <button
            key={ALL_TAG}
            onClick={() => handleTagClick(ALL_TAG)}
            className={`rounded-full border px-3 py-1 text-sm transition-colors cursor-pointer ${
              selectedTags.has(ALL_TAG)
                ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--background)]"
                : "border-[var(--border)] bg-[var(--code-bg)] text-[var(--muted)] hover:border-[var(--accent)]"
            }`}
          >
            {ALL_TAG}
          </button>
          {skillTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`rounded-full border px-3 py-1 text-sm transition-colors cursor-pointer ${
                selectedTags.has(tag)
                  ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--background)]"
                  : "border-[var(--border)] bg-[var(--code-bg)] text-[var(--muted)] hover:border-[var(--accent)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Project Grid */}
      <div className="flex flex-col gap-12">
        {filteredProjects.length === 0 ? (
          <p className="text-[var(--muted)]">No projects match the selected tags.</p>
        ) : (
          filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col gap-4 border-t border-[var(--border)] pt-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-medium text-lg text-[var(--foreground)]">{project.title}</h3>
                  {project.featured && (
                    <span className="text-xs border border-[var(--border)] px-1.5 py-0.5 rounded text-[var(--muted)]">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--muted)] leading-relaxed max-w-2xl">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-4 pt-1">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--muted)] transition-colors"
                  >
                    Case Study →
                  </Link>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--muted)] transition-colors"
                    >
                      GitHub →
                    </a>
                  )}
                  {project.demo && project.demo !== "/" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--muted)] transition-colors"
                    >
                      Demo →
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-[var(--muted)]">
                {project.techStack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

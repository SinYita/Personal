"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { ProjectMeta } from "@/lib/projects";
import TagChip from "@/components/TagChip";

export default function ProjectsClient({ projects }: { projects: ProjectMeta[] }) {
  const searchParams = useSearchParams();
  const selectedTag = normalizeTag(searchParams.get("tag") ?? "");
  const ALL_TAG = "All";
  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    selectedTag ? new Set([selectedTag]) : new Set([ALL_TAG])
  );

  const projectTagMap = new Map(projects.map((project) => [project.id, getProjectTags(project)]));
  const tagOptions = Array.from(new Set(Array.from(projectTagMap.values()).flat())).sort();
  const tagCounts = new Map<string, number>(
    tagOptions.map((tag) => [
      tag,
      projects.reduce((count, project) => count + (projectTagMap.get(project.id)?.includes(tag) ? 1 : 0), 0),
    ])
  );

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
          Array.from(selectedTags).every((tag) => projectTagMap.get(project.id)?.includes(tag))
        );

  return (
    <div className="grid gap-10 pb-20 lg:grid-cols-[minmax(0,1fr)_180px]">
      <div className="space-y-16">
        <section className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="text-base text-[var(--muted)] leading-relaxed">
            A collection of production work, side projects, and technical experiments.
          </p>
        </section>

        <div className="flex flex-col gap-10">
          {filteredProjects.length === 0 ? (
            <p className="text-[var(--muted)]">No projects match the selected tags.</p>
          ) : (
            filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group flex flex-col gap-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="font-medium text-lg text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                    >
                      {project.title}
                    </Link>
                    {project.featured && (
                      <span className="text-xs border border-[var(--border)] px-1.5 py-0.5 rounded text-[var(--muted)]">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed max-w-2xl">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {getProjectTags(project).map((tag) => (
                      <TagChip
                        key={tag}
                        label={tag}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 pt-1">
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
              </article>
            ))
          )}
        </div>
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-28 space-y-4 pl-2">
          <h2 className="text-sm font-semibold tracking-wider uppercase text-[var(--foreground)]">Tags</h2>
          <div className="flex flex-wrap gap-2">
            <TagChip
              key={ALL_TAG}
              label={ALL_TAG}
              count={projects.length}
              selected={selectedTags.has(ALL_TAG)}
              onClick={() => handleTagClick(ALL_TAG)}
            />
            {tagOptions.map((tag) => (
              <TagChip
                key={tag}
                label={tag}
                count={tagCounts.get(tag) ?? 0}
                onClick={() => handleTagClick(tag)}
                selected={selectedTags.has(tag)}
              />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

function normalizeTag(tag: string) {
  return tag.replace(/^#+/, "").trim();
}

function getProjectTags(project: ProjectMeta) {
  return Array.from(new Set(project.tags.map(normalizeTag).filter(Boolean)));
}

"use client";
import Link from "next/link";
import type { ProjectMeta } from "@/lib/projects";

export default function ProjectsClient({ projects }: { projects: ProjectMeta[] }) {
  const skillTags = Array.from(new Set(projects.flatMap((project) => project.techStack))).sort();

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
          {skillTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--border)] bg-[var(--code-bg)] px-3 py-1 text-sm text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Project Grid */}
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group flex flex-col space-y-3"
          >
            <div className="flex items-center gap-3">
              <h3 className="font-medium text-lg text-[var(--foreground)]">{project.title}</h3>
              {project.featured && (
                <span className="text-xs border border-[var(--border)] px-1.5 py-0.5 rounded text-[var(--muted)]">
                  Featured
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed flex-1">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-[var(--muted)] pt-1">
              {project.techStack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
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
          </article>
        ))}
      </div>
    </div>
  );
}

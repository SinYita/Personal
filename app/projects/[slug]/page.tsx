import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import MarkdownContent from "@/components/MarkdownContent";
import { getAllProjectSlugs, getProject } from "@/lib/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <article className="max-w-3xl mx-auto flex flex-col pb-20">
      <div className="mb-8">
        <Link
          href="/projects"
          className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          ← Back to projects
        </Link>
      </div>

      <header className="space-y-4 mb-10">
        <h1 className="text-3xl font-semibold tracking-tight leading-snug">{project.title}</h1>
        <p className="text-base text-[var(--muted)] leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {Array.from(new Set(project.tags.map((tag) => tag.replace(/^#+/, "").trim()).filter(Boolean))).map((tag) => (
            <span key={tag} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 pt-2">
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
              Live Demo →
            </a>
          )}
        </div>
      </header>

      <MarkdownContent content={project.content} />
    </article>
  );
}

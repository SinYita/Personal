"use client";
import type { Project } from "@/lib/projects";
import SkillsChart from "@/components/SkillsChart";
import { useLanguage } from "@/components/LanguageProvider";

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const { t, locale } = useLanguage();

  return (
    <div className="flex flex-col space-y-16 pb-20">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">{t.projectsPage.title}</h1>
        <p className="text-[var(--muted)] leading-relaxed">
          {t.projectsPage.desc}
        </p>
      </section>

      {/* Chart Section */}
      <section className="space-y-6">
        <h2 className="text-sm font-semibold tracking-wider uppercase text-[var(--foreground)]">{t.projectsPage.chartTitle}</h2>
        <div className="border border-[var(--border)] rounded-lg p-6 max-w-xl mx-auto">
          <SkillsChart />
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
               <h3 className="font-medium text-lg text-[var(--foreground)]">
                 {typeof project.title === 'string' ? project.title : project.title[locale]}
               </h3>
               {project.featured && (
                <span className="text-xs border border-[var(--border)] px-1.5 py-0.5 rounded text-[var(--muted)]">
                  {t.projectsPage.featured}
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed flex-1">
              {project.description[locale]}
            </p>
            <div className="flex flex-wrap gap-2 text-sm text-[var(--muted)] pt-1">
              {project.techStack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="flex gap-4 pt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--muted)] transition-colors"
                >
                  {t.projectsPage.github}
                </a>
              )}
              {project.demo && project.demo !== "/" && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--muted)] transition-colors"
                >
                  {t.projectsPage.demo}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

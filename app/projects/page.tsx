import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import SkillsChart from "@/components/SkillsChart";

export const metadata: Metadata = {
  title: "Projects | SinYita",
  description: "My open source projects and personal works.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col space-y-16 pb-20">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">所有项目</h1>
        <p className="text-[var(--muted)] leading-relaxed">
          这里展示了我参与开发的项目，包含开源工具、Web 应用和学习项目。
        </p>
      </section>

      {/* Chart Section */}
      <section className="space-y-6">
        <h2 className="text-sm font-semibold tracking-wider uppercase text-[var(--foreground)]">技术栈分布</h2>
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

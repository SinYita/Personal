import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import SkillsChart from "@/components/SkillsChart";

export const metadata: Metadata = {
  title: "项目 | My Personal Website",
  description: "我的开源项目和个人作品展示。",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">我的项目</h1>
        <p style={{ color: "var(--muted)" }}>
          这里展示了我参与开发的项目，包含开源工具、Web 应用和学习项目。
        </p>
      </div>

      {/* Chart Section */}
      <section
        className="rounded-xl p-6 space-y-4"
        style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
      >
        <h2 className="text-xl font-semibold">技术栈分布</h2>
        <SkillsChart />
      </section>

      {/* Project Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((project) => (
          <article
            key={project.id}
            className="rounded-xl p-5 space-y-3 flex flex-col transition-shadow hover:shadow-md"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg leading-tight">{project.title}</h3>
              {project.featured && (
                <span
                  className="shrink-0 text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: "color-mix(in srgb, var(--accent) 15%, transparent)",
                    color: "var(--accent)",
                  }}
                >
                  精选
                </span>
              )}
            </div>
            <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--muted)" }}>
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{
                    background: "color-mix(in srgb, var(--accent) 10%, transparent)",
                    color: "var(--accent)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-3 pt-1">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  GitHub →
                </a>
              )}
              {project.demo && project.demo !== "/" && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium"
                  style={{ color: "var(--muted)" }}
                >
                  Demo →
                </a>
              )}
              <span className="ml-auto text-xs" style={{ color: "var(--muted)" }}>
                {project.date}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { projects } from "@/lib/projects";

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3);
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-16 space-y-6">
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center text-5xl font-bold"
          style={{ background: "color-mix(in srgb, var(--accent) 15%, transparent)", color: "var(--accent)" }}
        >
          S
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">你好，我是 SinYita 👋</h1>
          <p className="text-xl max-w-2xl" style={{ color: "var(--muted)" }}>
            全栈开发者 / 机器学习爱好者 / 技术写作者
          </p>
          <p className="max-w-xl text-base" style={{ color: "var(--muted)" }}>
            热衷于用代码解决真实问题，专注于 Web 全栈开发与 AI/ML 领域的学习与实践。
            在这里分享我的项目、思考与技术笔记。
          </p>
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/resume"
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
            style={{ background: "var(--accent)" }}
          >
            查看简历
          </Link>
          <Link
            href="/projects"
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
          >
            我的项目
          </Link>
          <Link
            href="/blog"
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
          >
            技术博客
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">精选项目</h2>
          <Link href="/projects" className="text-sm" style={{ color: "var(--accent)" }}>
            查看全部 →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl p-5 space-y-3 transition-shadow hover:shadow-lg"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <span className="text-xs" style={{ color: "var(--muted)" }}>{project.date}</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-xs font-medium"
                    style={{
                      background: "color-mix(in srgb, var(--accent) 12%, transparent)",
                      color: "var(--accent)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">最新博客</h2>
          <Link href="/blog" className="text-sm" style={{ color: "var(--accent)" }}>
            查看全部 →
          </Link>
        </div>
        <div className="space-y-3">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex items-start justify-between rounded-xl p-4 transition-colors group"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <div className="space-y-1">
                <h3
                  className="font-medium group-hover:underline"
                  style={{ color: "var(--foreground)" }}
                >
                  {post.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  {post.excerpt}
                </p>
                <div className="flex gap-1.5 mt-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{ background: "var(--border)", color: "var(--muted)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-xs shrink-0 ml-4 mt-0.5" style={{ color: "var(--muted)" }}>
                {post.date}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section
        className="rounded-xl p-6 space-y-4"
        style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
      >
        <h2 className="text-2xl font-bold">技术栈</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { category: "前端", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
            { category: "后端", skills: ["Node.js", "Python", "FastAPI", "PostgreSQL"] },
            { category: "AI/ML", skills: ["PyTorch", "Scikit-learn", "Pandas", "NumPy"] },
            { category: "工具", skills: ["Git", "Docker", "Linux", "VS Code"] },
          ].map((group) => (
            <div key={group.category} className="space-y-2">
              <h3 className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
                {group.category}
              </h3>
              <ul className="space-y-1">
                {group.skills.map((skill) => (
                  <li key={skill} className="text-sm" style={{ color: "var(--muted)" }}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

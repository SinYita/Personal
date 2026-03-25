import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { projects } from "@/lib/projects";

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 5);

  return (
    <div className="flex flex-col space-y-24 py-16 pb-32">
      {/* Hero Section */}
      <section id="about" className="scroll-mt-32">
        <h1 className="text-2xl font-semibold mb-6">你好，我是 SinYita</h1>
        <div className="space-y-4 max-w-2xl text-[var(--muted)] leading-relaxed">
          <p>
            全栈开发者 / 机器学习爱好者 / 技术写作者
          </p>
          <p>
            热衷于用代码解决真实问题，专注于 Web 全栈开发与 AI/ML 领域的学习与实践。
            在这里分享我的项目、思考与技术笔记。
          </p>
          <div className="flex gap-4 pt-4 text-sm font-medium">
            <a href="https://github.com/SinYita" target="_blank" rel="noreferrer" className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors">GitHub</a>
            <a href="mailto:your-email@example.com" className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors">Email</a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-32">
        <h2 className="text-xl font-semibold mb-8">精选项目</h2>
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
          {projects.map((project) => (
            <div key={project.id} className="group flex flex-col space-y-3">
              <div className="flex items-center gap-3">
                <Link 
                  href={project.demo || project.github || "#"} 
                  target={project.demo || project.github ? "_blank" : undefined}
                  className="font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors"
                >
                  {project.title}
                </Link>
                {project.date && (
                  <span className="text-xs text-[var(--muted)] border border-[var(--border)] px-1.5 py-0.5 rounded">
                    {project.date}
                  </span>
                )}
              </div>
              <p className="text-sm text-[var(--muted)] leading-relaxed flex-grow">
                {project.description}
              </p>
              <div className="flex gap-2 flex-wrap text-sm text-[var(--muted)] pt-1">
                {project.techStack.map(tech => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Writing Section */}
      <section id="blog" className="scroll-mt-32">
        <h2 className="text-xl font-semibold mb-8">最新博客</h2>
        <div className="flex flex-col gap-6">
          {recentPosts.map((post) => (
             <div key={post.slug} className="group">
               <Link href={`/blog/${post.slug}`} className="flex flex-col sm:flex-row sm:items-baseline justify-between transition-colors">
                 <span className="font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                   {post.title}
                 </span>
                 <span className="text-sm text-[var(--muted)] mt-1 sm:mt-0">{post.date}</span>
               </Link>
             </div>
          ))}
        </div>
      </section>
    </div>
  );
}

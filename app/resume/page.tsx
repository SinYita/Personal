import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | SinYita",
  description: "个人简历",
};

const resumeData = {
  name: "SinYita",
  title: "全栈开发工程师 / AI 爱好者",
  email: "contact@example.com",
  location: "中国",
  github: "github.com/SinYita",
  summary:
    "具有扎实编程基础的全栈开发者，对机器学习和数据科学有浓厚兴趣。擅长使用 React/Next.js 构建现代 Web 应用，同时具备 Python 后端开发和深度学习模型调研能力。",
  education: [
    {
      degree: "计算机科学与技术 学士",
      school: "XX 大学",
      duration: "2020 – 2024",
      gpa: "3.8/4.0",
      highlights: [
        "主修课程：数据结构、算法、操作系统、计算机网络",
        "辅修数学：线性代数、概率论、信息论",
        "毕业论文：基于 Transformer 的文本摘要模型",
      ],
    },
  ],
  experience: [
    {
      title: "前端开发实习生",
      company: "某科技公司",
      duration: "2023.07 – 2023.09",
      highlights: [
        "参与公司内部管理系统的前端开发，使用 React + TypeScript",
        "优化关键页面性能，首屏加载时间缩短 40%",
        "与后端团队协作，设计 RESTful API 接口规范",
      ],
    },
    {
      title: "开源贡献者",
      company: "GitHub",
      duration: "2022 – 至今",
      highlights: [
        "为多个开源项目提交 PR，修复 Bug 及新增特性",
        "维护个人开源项目，获得数十 Star",
        "参与技术社区讨论，撰写技术博客",
      ],
    },
  ],
  skills: [
    { category: "编程语言", items: ["TypeScript", "Python", "JavaScript", "SQL", "Bash"] },
    { category: "前端框架", items: ["React", "Next.js", "Vue.js", "Tailwind CSS"] },
    { category: "后端 / 数据库", items: ["Node.js", "FastAPI", "PostgreSQL", "MongoDB", "Redis"] },
    { category: "AI / 数据科学", items: ["PyTorch", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"] },
    { category: "DevOps / 工具", items: ["Git", "Docker", "Linux", "GitHub Actions", "Vercel"] },
  ],
  projects: [
    {
      name: "个人网站",
      desc: "基于 Next.js 构建的个人主页，支持 Markdown、LaTeX 和图表可视化。",
      tech: "Next.js · TypeScript · KaTeX · Chart.js",
    },
    {
      name: "机器学习笔记系统",
      desc: "带 LaTeX 支持的学习笔记平台，包含交互式数据可视化模块。",
      tech: "Python · FastAPI · Vue.js",
    },
  ],
  languages: [
    { lang: "中文", level: "母语" },
    { lang: "英语", level: "专业工作水平 (CET-6)" },
  ],
};

export default function ResumePage() {
  return (
    <div className="flex flex-col space-y-16 pb-20">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
        <div>
          <h1 className="text-3xl font-semibold mb-2">{resumeData.name}</h1>
          <p className="text-lg text-[var(--muted)]">
            {resumeData.title}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-[var(--muted)] font-mono">
            <a href={`mailto:${resumeData.email}`} className="hover:text-[var(--foreground)] transition-colors">
              {resumeData.email}
            </a>
            <span>{resumeData.location}</span>
            <a href={`https://${resumeData.github}`} target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)] transition-colors">
              {resumeData.github}
            </a>
          </div>
        </div>
        <a
          href="/resume.pdf"
          className="shrink-0 px-4 py-2 text-sm font-medium border border-[var(--border)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors duration-300"
        >
          下载 PDF
        </a>
      </section>

      {/* Summary */}
      <Section title="个人简介">
        <p className="text-[var(--muted)] leading-relaxed text-sm sm:text-base">
          {resumeData.summary}
        </p>
      </Section>

      {/* Education */}
      <Section title="教育背景">
        <div className="space-y-8">
          {resumeData.education.map((edu, i) => (
            <div key={i} className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="font-medium text-[var(--foreground)]">
                  {edu.school}，{edu.degree}
                </div>
                <span className="text-sm text-[var(--muted)] font-mono">{edu.duration}</span>
              </div>
              <p className="text-sm text-[var(--muted)]">GPA: {edu.gpa}</p>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--muted)]">
                {edu.highlights.map((h, j) => (
                  <li key={j} className="leading-relaxed">{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section title="工作经历">
        <div className="space-y-10">
          {resumeData.experience.map((exp, i) => (
            <div key={i} className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="font-medium text-[var(--foreground)]">
                  {exp.title} <span className="text-[var(--muted)] mx-2">@</span> {exp.company}
                </div>
                <span className="text-sm text-[var(--muted)] font-mono">{exp.duration}</span>
              </div>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--muted)]">
                {exp.highlights.map((h, j) => (
                  <li key={j} className="leading-relaxed">{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section title="技术技能">
        <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
          {resumeData.skills.map((group) => (
            <div key={group.category} className="space-y-2 text-sm">
              <div className="font-medium text-[var(--foreground)]">{group.category}</div>
              <div className="text-[var(--muted)] leading-relaxed">
                {group.items.join(", ")}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section title="项目经历">
        <div className="grid sm:grid-cols-2 gap-y-8 gap-x-12">
          {resumeData.projects.map((proj, i) => (
            <div key={i} className="space-y-2">
              <div className="font-medium text-[var(--foreground)]">{proj.name}</div>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{proj.desc}</p>
              <p className="text-xs text-[var(--muted)] font-mono mt-1">{proj.tech}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Languages */}
      <Section title="语言能力">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
          {resumeData.languages.map((l, i) => (
            <div key={i} className="text-sm">
              <span className="font-medium text-[var(--foreground)]">{l.lang}</span>
              <span className="ml-3 text-[var(--muted)]">{l.level}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-8 md:gap-12 items-start">
      <h2 className="text-sm font-semibold tracking-wider uppercase text-[var(--foreground)] mt-1">
        {title}
      </h2>
      <div className="min-w-0">
        {children}
      </div>
    </section>
  );
}

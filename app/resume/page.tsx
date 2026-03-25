import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "简历 | My Personal Website",
  description: "个人简历，包含教育背景、工作经历、技能和项目。",
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
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{resumeData.name}</h1>
          <p className="text-lg mt-1" style={{ color: "var(--muted)" }}>
            {resumeData.title}
          </p>
          <div className="flex flex-wrap gap-3 mt-2 text-sm" style={{ color: "var(--muted)" }}>
            <span>📧 {resumeData.email}</span>
            <span>📍 {resumeData.location}</span>
            <span>🐙 {resumeData.github}</span>
          </div>
        </div>
        <a
          href="/resume.pdf"
          className="shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-white"
          style={{ background: "var(--accent)" }}
        >
          下载 PDF
        </a>
      </div>

      <hr style={{ borderColor: "var(--border)" }} />

      {/* Summary */}
      <Section title="个人简介">
        <p style={{ color: "var(--muted)" }}>{resumeData.summary}</p>
      </Section>

      {/* Education */}
      <Section title="教育背景">
        {resumeData.education.map((edu, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between flex-wrap gap-2">
              <div>
                <span className="font-semibold">{edu.degree}</span>
                <span className="mx-2" style={{ color: "var(--muted)" }}>·</span>
                <span style={{ color: "var(--muted)" }}>{edu.school}</span>
              </div>
              <span className="text-sm" style={{ color: "var(--muted)" }}>{edu.duration}</span>
            </div>
            <p className="text-sm" style={{ color: "var(--accent)" }}>GPA: {edu.gpa}</p>
            <ul className="list-disc list-inside space-y-1 text-sm" style={{ color: "var(--muted)" }}>
              {edu.highlights.map((h, j) => (
                <li key={j}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      {/* Experience */}
      <Section title="工作经历">
        {resumeData.experience.map((exp, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between flex-wrap gap-2">
              <div>
                <span className="font-semibold">{exp.title}</span>
                <span className="mx-2" style={{ color: "var(--muted)" }}>·</span>
                <span style={{ color: "var(--muted)" }}>{exp.company}</span>
              </div>
              <span className="text-sm" style={{ color: "var(--muted)" }}>{exp.duration}</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm" style={{ color: "var(--muted)" }}>
              {exp.highlights.map((h, j) => (
                <li key={j}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      {/* Skills */}
      <Section title="技术技能">
        <div className="space-y-3">
          {resumeData.skills.map((group) => (
            <div key={group.category} className="flex flex-wrap gap-2 items-start">
              <span className="text-sm font-medium w-28 shrink-0">{group.category}</span>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-0.5 rounded text-xs"
                    style={{
                      background: "color-mix(in srgb, var(--accent) 12%, transparent)",
                      color: "var(--accent)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section title="项目经历">
        {resumeData.projects.map((proj, i) => (
          <div key={i} className="space-y-1">
            <span className="font-semibold">{proj.name}</span>
            <p className="text-sm" style={{ color: "var(--muted)" }}>{proj.desc}</p>
            <p className="text-xs" style={{ color: "var(--accent)" }}>{proj.tech}</p>
          </div>
        ))}
      </Section>

      {/* Languages */}
      <Section title="语言能力">
        <div className="flex gap-6">
          {resumeData.languages.map((l, i) => (
            <div key={i} className="text-sm">
              <span className="font-medium">{l.lang}</span>
              <span className="ml-2" style={{ color: "var(--muted)" }}>{l.level}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <span
          className="w-1 h-5 rounded-full inline-block"
          style={{ background: "var(--accent)" }}
        />
        {title}
      </h2>
      <div className="space-y-4 pl-3">{children}</div>
    </section>
  );
}

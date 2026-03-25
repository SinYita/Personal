export type Locale = "zh" | "en";

export interface Dictionary {
  nav: {
    title: string;
    home: string;
    resume: string;
    projects: string;
    blog: string;
  };
  home: {
    heroTitle: string;
    heroDesc: string[];
    github: string;
    email: string;
    featuredProjects: string;
    recentBlog: string;
  };
  blog: {
    title: string;
    desc: string;
    empty: string;
    back: string;
  };
  projectsPage: {
    title: string;
    desc: string;
    chartTitle: string;
    featured: string;
    demo: string;
    github: string;
  };
  resumePage: {
    download: string;
    summary: string;
    edu: string;
    exp: string;
    skills: string;
    proj: string;
    lang: string;
  };
}

export const dictionaries: Record<Locale, Dictionary> = {
  zh: {
    nav: {
      title: "SinYita",
      home: "首页",
      resume: "简历",
      projects: "项目",
      blog: "博客",
    },
    home: {
      heroTitle: "你好，我是 SinYita",
      heroDesc: [
        "全栈开发者 / 机器学习爱好者 / 技术写作者",
        "热衷于用代码解决真实问题，专注于 Web 全栈开发与 AI/ML 领域的学习与实践。在这里分享我的项目、思考与技术笔记。"
      ],
      github: "GitHub",
      email: "Email",
      featuredProjects: "精选项目",
      recentBlog: "最新博客",
    },
    blog: {
      title: "所有博客",
      desc: "记录技术学习、项目心得与思考。",
      empty: "暂无文章，敬请期待。",
      back: "返回博客"
    },
    projectsPage: {
      title: "所有项目",
      desc: "这里展示了我参与开发的项目，包含开源工具、Web 应用和学习项目。",
      chartTitle: "技术栈分布",
      featured: "精选",
      demo: "在线演示 →",
      github: "GitHub →",
    },
    resumePage: {
      download: "下载 PDF",
      summary: "个人简介",
      edu: "教育背景",
      exp: "工作经历",
      skills: "技术技能",
      proj: "项目经历",
      lang: "语言能力",
    }
  },
  en: {
    nav: {
      title: "SinYita",
      home: "Home",
      resume: "Resume",
      projects: "Projects",
      blog: "Blog",
    },
    home: {
      heroTitle: "Hi, I'm SinYita",
      heroDesc: [
        "Full-stack Developer / ML Enthusiast / Technical Writer",
        "Passionate about solving real-world problems with code. Focused on Web development and AI/ML. Sharing my projects, thoughts, and notes here."
      ],
      github: "GitHub",
      email: "Email",
      featuredProjects: "Featured Projects",
      recentBlog: "Recent Writing",
    },
    blog: {
      title: "All Posts",
      desc: "Notes, thoughts, and technical writing.",
      empty: "No posts available yet.",
      back: "Back to blog"
    },
    projectsPage: {
      title: "All Projects",
      desc: "A collection of my open source projects, web apps, and experiments.",
      chartTitle: "Tech Stack Distribution",
      featured: "Featured",
      demo: "Demo →",
      github: "GitHub →",
    },
    resumePage: {
      download: "Download PDF",
      summary: "Summary",
      edu: "Education",
      exp: "Experience",
      skills: "Skills",
      proj: "Projects",
      lang: "Languages",
    }
  },
};

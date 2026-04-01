import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ProjectMeta {
  slug: string;
  id: string;
  title: string;
  description: string;
  techStack: string[];
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  date: string;
}

export interface Project extends ProjectMeta {
  content: string;
}

const projectsDirectory = path.join(process.cwd(), "content/projects");

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) return [];
  return fs
    .readdirSync(projectsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllProjects(): ProjectMeta[] {
  if (!fs.existsSync(projectsDirectory)) return [];

  return getAllProjectSlugs()
    .map((slug) => getProjectMeta(slug))
    .filter(Boolean)
    .sort((a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()) as ProjectMeta[];
}

export function getProjectMeta(slug: string): ProjectMeta | null {
  const filePath = path.join(projectsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);

  return {
    slug,
    id: data.id ?? slug,
    title: data.title,
    description: data.description,
    techStack: data.techStack ?? [],
    tags: data.tags ?? [],
    github: data.github,
    demo: data.demo,
    featured: Boolean(data.featured),
    date: data.date ? String(data.date) : "",
  };
}

export function getProject(slug: string): Project | null {
  const filePath = path.join(projectsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    id: data.id ?? slug,
    title: data.title,
    description: data.description,
    techStack: data.techStack ?? [],
    tags: data.tags ?? [],
    github: data.github,
    demo: data.demo,
    featured: Boolean(data.featured),
    date: data.date ? String(data.date) : "",
    content,
  };
}

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Project {
  id: string;
  title: string | { zh: string; en: string };
  description: { zh: string; en: string };
  techStack: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  date: string;
}

const projectsDirectory = path.join(process.cwd(), "content/projects");

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDirectory)) return [];

  return fs
    .readdirSync(projectsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => getProject(file.replace(/\.md$/, "")))
    .filter(Boolean)
    .sort((a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()) as Project[];
}

export function getProject(slug: string): Project | null {
  const filePath = path.join(projectsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);

  return {
    id: data.id ?? slug,
    title: data.title,
    description: data.description,
    techStack: data.techStack ?? [],
    github: data.github,
    demo: data.demo,
    featured: Boolean(data.featured),
    date: data.date ? String(data.date) : "",
  };
}

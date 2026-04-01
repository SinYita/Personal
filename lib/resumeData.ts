import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ResumeData {
  name: string;
  email: string;
  github: string;
  title: string;
  location: string;
  summary: string;
  education: Array<{
    degree: string;
    school: string;
    duration: string;
    gpa: string;
    highlights: string[];
  }>;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    highlights: string[];
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  projects: Array<{
    name: string;
    desc: string;
    tech: string;
  }>;
  languages: Array<{
    lang: string;
    level: string;
  }>;
}

const resumeFilePath = path.join(process.cwd(), "content/resume.md");

export function getResumeData(): ResumeData {
  if (!fs.existsSync(resumeFilePath)) {
    throw new Error("Missing content/resume.md");
  }

  const raw = fs.readFileSync(resumeFilePath, "utf-8");
  const { data } = matter(raw);
  return data as ResumeData;
}

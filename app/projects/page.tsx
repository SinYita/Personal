import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects | SinYita",
  description: "My open source projects and personal works.",
};

export default function ProjectsPage() {
  return <ProjectsClient projects={projects} />;
}

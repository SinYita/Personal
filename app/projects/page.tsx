import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import ProjectsClient from "./ProjectsClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Projects | SinYita",
  description: "Project case studies, experiments, and engineering notes.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectsClient projects={projects} />
    </Suspense>
  );
}

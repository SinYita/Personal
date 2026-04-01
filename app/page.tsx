import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";
import HomeClient from "./HomeClient";

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 5);
  const projects = getAllProjects();

  return <HomeClient recentPosts={recentPosts} projects={projects} />;
}

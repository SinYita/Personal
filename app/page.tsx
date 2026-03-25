import { getAllPosts } from "@/lib/posts";
import { projects } from "@/lib/projects";
import HomeClient from "./HomeClient";

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 5);

  return <HomeClient recentPosts={recentPosts} projects={projects} />;
}

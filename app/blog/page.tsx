import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog | SinYita",
  description: "Technical articles, learning notes, and thoughts.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogClient posts={posts} />;
}

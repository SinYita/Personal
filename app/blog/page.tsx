import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import BlogClient from "./BlogClient";
import { Suspense } from "react";
import BackToTopButton from "@/components/BackToTopButton";

export const metadata: Metadata = {
  title: "Blog | Weiyuan",
  description: "Technical articles, learning notes, and thoughts.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BlogClient posts={posts} />
      </Suspense>
      <BackToTopButton />
    </>
  );
}

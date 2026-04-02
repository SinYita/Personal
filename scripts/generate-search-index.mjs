import fs from "fs";
import path from "path";
import matter from "gray-matter";

const rootDir = process.cwd();
const outputPath = path.join(rootDir, "public/search-index.json");

function readFrontmatterFiles(directory) {
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const filePath = path.join(directory, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: typeof data.title === "string" && data.title.trim() ? data.title.trim() : slug,
      };
    });
}

const posts = readFrontmatterFiles(path.join(rootDir, "content/posts")).map((item) => ({
  url: `/blog/${item.slug}`,
  title: item.title,
  kind: "blog",
}));

const projects = readFrontmatterFiles(path.join(rootDir, "content/projects")).map((item) => ({
  url: `/projects/${item.slug}`,
  title: item.title,
  kind: "project",
}));

const searchIndex = [...posts, ...projects].sort((a, b) => a.title.localeCompare(b.title));

fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));
console.log(`Wrote ${searchIndex.length} search index entries to ${outputPath}`);

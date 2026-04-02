import { MarkdownAsync } from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import type { ReactNode } from "react";
import { isValidElement } from "react";
import type { Components } from "react-markdown";

interface MarkdownContentProps {
  content: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function textFromNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textFromNode(node.props.children);
  }
  return "";
}

const components: Components = {
  h2: ({ children, ...props }) => {
    const id = slugify(textFromNode(children));
    return (
      <h2 id={id} {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const id = slugify(textFromNode(children));
    return (
      <h3 id={id} {...props}>
        {children}
      </h3>
    );
  },
};

const prettyCodeOptions = {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: false,
};

export default async function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose">
      <MarkdownAsync
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex, [rehypePrettyCode, prettyCodeOptions]]}
        components={components}
      >
        {content}
      </MarkdownAsync>
    </div>
  );
}

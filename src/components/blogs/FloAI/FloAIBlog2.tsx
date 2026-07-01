import raw from "@/content/floai/making-retrieval-understand-where.md?raw";
import BlogRenderer from "../BlogRenderer";
import { parseBlog } from "@/lib/blog";

// Content lives in the Markdown file so it renders both on GitHub and on the
// site. Meta is read from the file's frontmatter — one source of truth.
export const FloAIBlog2Meta = parseBlog(raw).meta;

export default function FloAIBlog2() {
  return <BlogRenderer raw={raw} />;
}

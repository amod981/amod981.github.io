import raw from "@/content/mcp/checking-llm-sql-without-running-it.md?raw";
import BlogRenderer from "../BlogRenderer";
import { parseBlog } from "@/lib/blog";

// Content lives in the Markdown file so it renders both on GitHub and on the
// site. Meta is read from the file's frontmatter — one source of truth.
export const McpBlog2Meta = parseBlog(raw).meta;

export default function McpBlog2() {
  return <BlogRenderer raw={raw} />;
}

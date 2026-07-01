import raw from "@/content/mcp/oauth-in-front-of-an-mcp-server.md?raw";
import BlogRenderer from "../BlogRenderer";
import { parseBlog } from "@/lib/blog";

// Content lives in the Markdown file so it renders both on GitHub and on the
// site. Meta is read from the file's frontmatter — one source of truth.
export const McpBlog3Meta = parseBlog(raw).meta;

export default function McpBlog3() {
  return <BlogRenderer raw={raw} />;
}

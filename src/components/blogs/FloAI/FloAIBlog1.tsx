import raw from "@/content/floai/knowing-when-not-to-answer.md?raw";
import BlogRenderer from "../BlogRenderer";
import { parseBlog } from "@/lib/blog";

// Content lives in the Markdown file so it renders both on GitHub and on the
// site. Meta is read from the file's frontmatter — one source of truth.
export const FloAIBlog1Meta = parseBlog(raw).meta;

export default function FloAIBlog1() {
  return <BlogRenderer raw={raw} />;
}

import raw from "@/content/bigdata/physical-layout-is-the-performance.md?raw";
import BlogRenderer from "../BlogRenderer";
import { parseBlog } from "@/lib/blog";

// Content lives in the Markdown file so it renders both on GitHub and on the
// site. Meta is read from the file's frontmatter — one source of truth.
export const BigDataBlog3Meta = parseBlog(raw).meta;

export default function BigDataBlog3() {
  return <BlogRenderer raw={raw} />;
}

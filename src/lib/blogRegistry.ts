import { parseBlog, type BlogMeta } from "./blog";

export interface BlogEntry {
  slug: string; // filename without extension, e.g. "knowing-when-not-to-answer"
  category: string; // folder name under content/, e.g. "floai"
  meta: BlogMeta;
  raw: string;
}

// Eagerly pull in every Markdown file under content/ as a raw string.
// Adding a post is just adding a .md file here — no wiring required.
const modules = import.meta.glob("/src/content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

// Display name + ordering per category. A category with no entry here still
// works — it just falls back to its folder name and sorts last.
export const CATEGORY_META: Record<string, { name: string; order: number }> = {
  floai: { name: "Healthcare AI", order: 1 },
  mcp: { name: "MCP / LLM + Data", order: 2 },
  bigdata: { name: "Data Engineering", order: 3 },
};

function toEntry(path: string, raw: string): BlogEntry {
  // path looks like: /src/content/floai/knowing-when-not-to-answer.md
  const parts = path.split("/");
  const file = parts[parts.length - 1];
  const category = parts[parts.length - 2];
  const slug = file.replace(/\.md$/, "");
  return { slug, category, meta: parseBlog(raw).meta, raw };
}

// All posts, newest first.
export const allBlogs: BlogEntry[] = Object.entries(modules)
  .map(([path, raw]) => toEntry(path, raw))
  .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));

export function getBlog(slug: string): BlogEntry | undefined {
  return allBlogs.find((e) => e.slug === slug);
}

export function getBlogsByCategory(category: string): BlogEntry[] {
  return allBlogs.filter((e) => e.category === category);
}

export function categoryName(category: string): string {
  return CATEGORY_META[category]?.name ?? category;
}

export function getCategories(): { key: string; name: string }[] {
  const keys = Array.from(new Set(allBlogs.map((e) => e.category)));
  return keys
    .map((key) => ({
      key,
      name: categoryName(key),
      order: CATEGORY_META[key]?.order ?? 99,
    }))
    .sort((a, b) => a.order - b.order)
    .map(({ key, name }) => ({ key, name }));
}

// One featured post per category (the most recent), for the homepage.
export function getFeatured(): BlogEntry[] {
  return getCategories()
    .map(({ key }) => getBlogsByCategory(key)[0])
    .filter(Boolean);
}

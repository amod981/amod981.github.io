import fm from "front-matter";

export interface BlogMeta {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface ParsedBlog {
  meta: BlogMeta;
  content: string;
}

/**
 * Parse a raw markdown string (imported via `?raw`) into its frontmatter
 * metadata and the markdown body. Keeping content in `.md` means the same
 * file renders on GitHub and on the site.
 */
export function parseBlog(raw: string): ParsedBlog {
  const { attributes, body } = fm<Partial<BlogMeta>>(raw);
  return {
    meta: {
      title: attributes.title ?? "",
      description: attributes.description ?? "",
      date: attributes.date ?? "",
      readTime: attributes.readTime ?? "",
      tags: attributes.tags ?? [],
    },
    content: body,
  };
}

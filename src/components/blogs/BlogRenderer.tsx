import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";
import { parseBlog } from "@/lib/blog";
import { categoryName } from "@/lib/blogRegistry";
import Mermaid from "./Mermaid";

// True when a fenced code block is a ```mermaid diagram.
function isMermaid(className?: string): boolean {
  return typeof className === "string" && className.includes("language-mermaid");
}

/**
 * Renders a raw markdown blog (frontmatter + body) with the site's dark theme.
 * The same `.md` source renders cleanly on GitHub; this component styles it for
 * the website. Pass the raw string imported via `import raw from "./post.md?raw"`.
 */
export default function BlogRenderer({ raw, category }: { raw: string; category?: string }) {
  const { meta, content } = parseBlog(raw);

  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-950 py-12 px-4">
      <article className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-xl p-8 md:p-10 text-zinc-300 font-sans text-lg leading-relaxed">
        {category && (
          <Link
            to={`/blogs/${category}`}
            className="inline-block text-sm text-blue-400 hover:text-blue-300 mb-6"
          >
            ← {categoryName(category)}
          </Link>
        )}

        <p className="text-xs text-zinc-500 mb-3">
          {meta.date} · {meta.readTime}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-zinc-800 text-zinc-400 px-2.5 py-0.5 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ ...props }) => (
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4 mt-2 leading-tight" {...props} />
            ),
            h2: ({ ...props }) => (
              <h2 className="text-2xl font-semibold text-zinc-100 mb-2 mt-8" {...props} />
            ),
            h3: ({ ...props }) => (
              <h3 className="text-xl font-semibold text-zinc-200 mb-2 mt-6" {...props} />
            ),
            p: ({ ...props }) => <p className="mb-4 text-zinc-300" {...props} />,
            ul: ({ ...props }) => (
              <ul className="list-disc list-outside ml-6 space-y-1 mb-4 text-zinc-300" {...props} />
            ),
            ol: ({ ...props }) => (
              <ol className="list-decimal list-outside ml-6 space-y-2 mb-4 text-zinc-300" {...props} />
            ),
            strong: ({ ...props }) => <strong className="font-semibold text-zinc-100" {...props} />,
            a: ({ ...props }) => (
              <a className="text-blue-400 underline hover:text-blue-300" {...props} />
            ),
            hr: ({ ...props }) => <hr className="border-zinc-800 my-6" {...props} />,
            code: ({ className, children, ...props }) => {
              if (isMermaid(className)) {
                return <Mermaid chart={String(children).trim()} />;
              }
              // Fenced blocks carry a language- className and are styled by <pre>;
              // only bare inline code gets the chip treatment.
              if (className) {
                return (
                  <code className={`${className} text-zinc-200`} {...props}>
                    {children}
                  </code>
                );
              }
              return (
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-zinc-200" {...props}>
                  {children}
                </code>
              );
            },
            pre: ({ children, ...props }) => {
              // A ```mermaid block renders as a diagram, not styled code —
              // so don't wrap it in the code-block <pre>.
              const child = Array.isArray(children) ? children[0] : children;
              const childClass = (child as { props?: { className?: string } })?.props?.className;
              if (isMermaid(childClass)) {
                return <>{children}</>;
              }
              return (
                <pre
                  className="rounded-lg bg-zinc-950 border border-zinc-800 p-4 overflow-x-auto text-sm mb-4"
                  {...props}
                >
                  {children}
                </pre>
              );
            },
            blockquote: ({ ...props }) => (
              <blockquote
                className="border-l-2 border-zinc-700 pl-4 italic text-zinc-400 mb-4"
                {...props}
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}

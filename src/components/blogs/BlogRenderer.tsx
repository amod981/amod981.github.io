import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { parseBlog } from "@/lib/blog";

/**
 * Renders a raw markdown blog (frontmatter + body) with the site's dark theme.
 * The same `.md` source renders cleanly on GitHub; this component styles it for
 * the website. Pass the raw string imported via `import raw from "./post.md?raw"`.
 */
export default function BlogRenderer({ raw }: { raw: string }) {
  const { meta, content } = parseBlog(raw);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181c2e] to-[#23284a] py-12">
      <article className="w-full max-w-5xl bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-2xl shadow-xl p-10 text-zinc-100 font-sans text-lg leading-relaxed">
        <div className="flex flex-wrap gap-2 mb-4">
          {meta.date && (
            <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">
              {meta.date}
            </span>
          )}
          {meta.readTime && (
            <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">
              {meta.readTime}
            </span>
          )}
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ ...props }) => (
              <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4 mt-2" {...props} />
            ),
            h2: ({ ...props }) => (
              <h2 className="text-2xl font-semibold text-blue-300 mb-2 mt-8" {...props} />
            ),
            h3: ({ ...props }) => (
              <h3 className="text-xl font-semibold text-blue-200 mb-2 mt-6" {...props} />
            ),
            p: ({ ...props }) => <p className="mb-4" {...props} />,
            ul: ({ ...props }) => (
              <ul className="list-disc list-inside ml-6 space-y-1 mb-4" {...props} />
            ),
            ol: ({ ...props }) => (
              <ol className="list-decimal list-inside ml-6 space-y-2 mb-4" {...props} />
            ),
            strong: ({ ...props }) => <strong className="font-semibold text-blue-200" {...props} />,
            a: ({ ...props }) => (
              <a className="text-blue-400 underline hover:text-blue-300" {...props} />
            ),
            hr: ({ ...props }) => <hr className="border-zinc-700 my-6" {...props} />,
            code: ({ ...props }) => (
              <code className="rounded bg-zinc-950/70 px-1.5 py-0.5 text-sm text-blue-200" {...props} />
            ),
            pre: ({ ...props }) => (
              <pre
                className="rounded-lg bg-zinc-950/70 p-4 overflow-x-auto text-sm mb-4"
                {...props}
              />
            ),
            blockquote: ({ ...props }) => (
              <blockquote
                className="border-l-4 border-blue-500/50 pl-4 italic text-zinc-300 mb-4"
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

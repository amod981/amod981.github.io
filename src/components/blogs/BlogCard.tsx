import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { BlogEntry } from "@/lib/blogRegistry";

// A single blog preview card. Used by both the homepage and the category lists,
// so the card markup lives in exactly one place.
export default function BlogCard({ entry }: { entry: BlogEntry }) {
  const { meta, slug } = entry;
  return (
    <div className="w-[420px] max-w-full rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-colors p-6 flex flex-col h-full justify-between">
      <p className="text-xs text-zinc-500 mb-3">{meta.readTime}</p>
      <div className="mb-2">
        <div className="text-xl font-semibold text-zinc-100 mb-1 leading-tight">
          {meta.title}
        </div>
      </div>
      <div className="text-sm text-zinc-400 mb-4 leading-relaxed">{meta.description}</div>
      <div className="flex flex-wrap gap-2 mb-5">
        {meta.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-zinc-800 text-zinc-400 px-2.5 py-0.5 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link to={`/blog/${slug}`}>
        <Button className="mt-auto bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm px-5 py-2 rounded-lg transition-colors flex items-center gap-2 w-full justify-center">
          Read More <span aria-hidden="true">→</span>
        </Button>
      </Link>
    </div>
  );
}

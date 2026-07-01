import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { BlogEntry } from "@/lib/blogRegistry";

// A single blog preview card. Used by both the homepage and the category lists,
// so the card markup lives in exactly one place.
export default function BlogCard({ entry }: { entry: BlogEntry }) {
  const { meta, slug } = entry;
  return (
    <div className="w-[420px] max-w-full rounded-2xl border border-blue-400/20 bg-[#20244a]/80 shadow-xl p-6 flex flex-col h-full justify-between">
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">
          {meta.date}
        </span>
        <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">
          {meta.readTime}
        </span>
      </div>
      <div className="p-0 mb-2">
        <div className="text-xl font-bold text-blue-400 mb-1 leading-tight">
          {meta.title}
        </div>
      </div>
      <div className="text-base text-blue-100 mb-4">{meta.description}</div>
      <div className="flex flex-wrap gap-2 mb-4">
        {meta.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link to={`/blog/${slug}`}>
        <Button className="mt-auto bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-base px-6 py-2 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition flex items-center gap-2 w-full justify-center">
          Read More <span aria-hidden="true">→</span>
        </Button>
      </Link>
    </div>
  );
}

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { McpBlog1Meta } from "./McpBlog1";
import { McpBlog2Meta } from "./McpBlog2";

const posts = [
  { meta: McpBlog1Meta, to: "/mcpBlog1" },
  { meta: McpBlog2Meta, to: "/mcpBlog2" },
];

export default function McpBlogs() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181c2e] to-[#23284a] py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {posts.map(({ meta, to }) => (
          <Card
            key={to}
            className="w-[420px] max-w-full rounded-2xl border border-blue-400/20 bg-[#20244a]/80 shadow-xl p-6 flex flex-col h-full justify-between"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">
                {meta.date}
              </span>
              <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">
                {meta.readTime}
              </span>
            </div>
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-xl font-bold text-blue-400 mb-1 leading-tight">
                {meta.title}
              </CardTitle>
            </CardHeader>
            <CardDescription className="text-base text-blue-100 mb-4">
              {meta.description}
            </CardDescription>
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
            <Link to={to}>
              <Button className="mt-auto bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-base px-6 py-2 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition flex items-center gap-2 w-full justify-center">
                Read More <span aria-hidden="true">→</span>
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

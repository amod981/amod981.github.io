import { useParams, Link } from "react-router-dom";
import BlogRenderer from "./BlogRenderer";
import { getBlog } from "@/lib/blogRegistry";

// Route: /blog/:slug — renders a single post from its Markdown source.
export default function BlogPost() {
  const { slug = "" } = useParams();
  const entry = getBlog(slug);

  if (!entry) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181c2e] to-[#23284a] text-blue-100 gap-4">
        <p className="text-xl">That post doesn't exist.</p>
        <Link to="/projects" className="text-blue-400 underline">
          Back to projects
        </Link>
      </div>
    );
  }

  return <BlogRenderer raw={entry.raw} />;
}

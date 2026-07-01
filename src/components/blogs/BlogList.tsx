import { useParams } from "react-router-dom";
import BlogCard from "./BlogCard";
import { getBlogsByCategory, categoryName } from "@/lib/blogRegistry";

// Route: /blogs/:category — lists every post in a category.
export default function BlogList() {
  const { category = "" } = useParams();
  const posts = getBlogsByCategory(category);

  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-950 py-16 px-4">
      <h1 className="text-3xl font-bold text-zinc-100 mb-10 text-center">
        {categoryName(category)}
      </h1>
      {posts.length === 0 ? (
        <p className="text-zinc-400">No posts here yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {posts.map((entry) => (
            <BlogCard key={entry.slug} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}

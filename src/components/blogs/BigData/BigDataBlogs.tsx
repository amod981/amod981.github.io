import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BigDataBlog1Meta } from "./BigDataBlog1";
import { BigDataBlog2Meta } from "./BigDataBlog2";

export default function BigDataBlogs() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181c2e] to-[#23284a] py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        <Card id="homeBlog3"
         className="w-[420px] max-w-full rounded-2xl border border-blue-400/20 bg-[#20244a]/80 shadow-xl p-6 flex flex-col h-full justify-between">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">{BigDataBlog1Meta.date}</span>
            <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">{BigDataBlog1Meta.readTime}</span>
          </div>
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-xl font-bold text-blue-400 mb-1 leading-tight">
              {BigDataBlog1Meta.title}
            </CardTitle>
          </CardHeader>
          <CardDescription className="text-base text-blue-100 mb-4">
            {BigDataBlog1Meta.description}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mb-4">
            {BigDataBlog1Meta.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">{tag}</span>
            ))}
          </div>
          <Link to="/bigDataBlog1"> 
            <Button className="mt-auto bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-base px-6 py-2 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition flex items-center gap-2 w-full justify-center">
              Read More <span aria-hidden="true">→</span>
            </Button>
          </Link>
        </Card>
        <Card className="w-[420px] max-w-full rounded-2xl border border-blue-400/20 bg-[#20244a]/80 shadow-xl p-6 flex flex-col h-full justify-between">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">{BigDataBlog2Meta.date}</span>
            <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">{BigDataBlog2Meta.readTime}</span>
          </div>
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-xl font-bold text-blue-400 mb-1 leading-tight">
              {BigDataBlog2Meta.title}
            </CardTitle>
          </CardHeader>
          <CardDescription className="text-base text-blue-100 mb-4">
            {BigDataBlog2Meta.description}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mb-4">
            {BigDataBlog2Meta.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">{tag}</span>
            ))}
          </div>
          <Link to="/bigDataBlog2"> 
            <Button className="mt-auto bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-base px-6 py-2 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition flex items-center gap-2 w-full justify-center">
              Read More <span aria-hidden="true">→</span>
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
} 
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { blog1Meta } from "./blogs/MyWebsite/Blog1";
import { blog2Meta } from "./blogs/MyWebsite/Blog2";
import { FloAIBlog2Meta } from "./blogs/FloAI/FloAIBlog2";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-gray-800 text-white px-4 pt-20">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-6 mt-2">
          Architecting Intelligent Systems with Scalable AI & Data.
        </h1>
        <p className="text-base text-zinc-300 text-center mb-8 max-w-xl">
          I'm Amod — a backend-focused machine learning engineer with expertise in OpenAI, AWS, and real-time data infrastructure. I build LLM-powered systems and ETL pipelines that drive decision-making at scale.
          <br />
          <br />
          My work blends deep experience in NLP, Big Data Engineering, and Cloud Computing with a strong command of backend engineering and system design. I approach every challenge with a focus on performance, creativity, and clean code.
        </p>
        <div className="w-24 h-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 mb-8" />
        <h2 className="text-2xl font-bold text-center mb-2 text-blue-400">
          Let's Connect!
        </h2>
        <p className="text-base text-blue-200 text-center mb-6">Find me on these platforms:</p>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <a href="https://github.com/amod981" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-full px-6 py-2 shadow hover:from-blue-600 hover:to-violet-600 transition text-base flex items-center gap-2">
            Github
          </a>
          <a href="https://www.linkedin.com/in/amod-shanker-20a0a1187/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-full px-6 py-2 shadow hover:from-blue-600 hover:to-violet-600 transition text-base flex items-center gap-2">
            LinkedIn
          </a>
          <a href="https://leetcode.com/amod981/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-full px-6 py-2 shadow hover:from-blue-600 hover:to-violet-600 transition text-base flex items-center gap-2">
            LeetCode
          </a>
          <a href="https://www.hackerrank.com/amod981" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-full px-6 py-2 shadow hover:from-blue-600 hover:to-violet-600 transition text-base flex items-center gap-2">
            HackerRank
          </a>
        </div>
        <div className="w-24 h-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 mb-8" />
      </div>
      {/* Featured Blogs Section - moved outside max-w-2xl */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center mb-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">Featured Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {/* Blog 1 Card */}
          <div className="w-[420px] max-w-full rounded-2xl border border-blue-400/20 bg-[#20244a]/80 shadow-xl p-6 flex flex-col h-full justify-between">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">{blog1Meta.date}</span>
              <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">{blog1Meta.readTime}</span>
            </div>
            <div className="p-0 mb-2">
              <div className="text-xl font-bold text-blue-400 mb-1 leading-tight">
                {blog1Meta.title}
              </div>
            </div>
            <div className="text-base text-blue-100 mb-4">
              {blog1Meta.description}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {blog1Meta.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">{tag}</span>
              ))}
            </div>
            <Link to="/blog1">
              <Button className="mt-auto bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-base px-6 py-2 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition flex items-center gap-2 w-full justify-center">
                Read More <span aria-hidden="true">→</span>
              </Button>
            </Link>
          </div>
          {/* Blog 2 Card */}
          <div className="w-[420px] max-w-full rounded-2xl border border-blue-400/20 bg-[#20244a]/80 shadow-xl p-6 flex flex-col h-full justify-between">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">{blog2Meta.date}</span>
              <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">{blog2Meta.readTime}</span>
            </div>
            <div className="p-0 mb-2">
              <div className="text-xl font-bold text-blue-400 mb-1 leading-tight">
                {blog2Meta.title}
              </div>
            </div>
            <div className="text-base text-blue-100 mb-4">
              {blog2Meta.description}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {blog2Meta.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">{tag}</span>
              ))}
            </div>
            <Link to="/blog2">
              <Button className="mt-auto bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-base px-6 py-2 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition flex items-center gap-2 w-full justify-center">
                Read More <span aria-hidden="true">→</span>
              </Button>
            </Link>
          </div>
          {/* FloAI Blog 2 Card */}
          <div className="w-[420px] max-w-full rounded-2xl border border-blue-400/20 bg-[#20244a]/80 shadow-xl p-6 flex flex-col h-full justify-between">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">{FloAIBlog2Meta.date}</span>
              <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">{FloAIBlog2Meta.readTime}</span>
            </div>
            <div className="p-0 mb-2">
              <div className="text-xl font-bold text-blue-400 mb-1 leading-tight">
                {FloAIBlog2Meta.title}
              </div>
            </div>
            <div className="text-base text-blue-100 mb-4">
              {FloAIBlog2Meta.description}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {FloAIBlog2Meta.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">{tag}</span>
              ))}
            </div>
            <Link to="/FloAIBlog2">
              <Button className="mt-auto bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-base px-6 py-2 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition flex items-center gap-2 w-full justify-center">
                Read More <span aria-hidden="true">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-8 w-full">
        <Link to="/projects" className="w-full max-w-xs">
          <Button className="w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-base px-6 py-3 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition">
            View My Work
          </Button>
        </Link>
      </div>
    </div>
  );
}

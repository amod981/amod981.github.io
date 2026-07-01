import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BlogCard from "./blogs/BlogCard";
import { getFeatured } from "@/lib/blogRegistry";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-gray-800 text-white px-4 pt-20">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-3">
          Backend Engineer · Data &amp; AI
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 mt-1 leading-tight">
          I design and own the backend systems behind production data and AI.
        </h1>
        <p className="text-base text-zinc-300 text-center mb-6 max-w-2xl">
          Over the last few years I've led and built several production systems: I drove the revamp of a high-throughput messaging backbone, and designed and built a multi-region data pipeline, a clinical assistant that reads and safely responds to patient messages, and an MCP server that lets a language model query a data warehouse in plain English.
        </p>
        <p className="text-base text-zinc-300 text-center mb-8 max-w-2xl">
          The common thread is <span className="text-blue-200 font-medium">backend engineering done properly</span> — event-driven services, idempotent jobs, reliable data flows, and the data modeling underneath. Data and AI are where I apply it; systems that survive contact with production are what I care about.
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
      {/* Featured Blogs — the latest post from each category, from the registry */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center mb-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">Featured Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {getFeatured().map((entry) => (
            <BlogCard key={entry.slug} entry={entry} />
          ))}
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

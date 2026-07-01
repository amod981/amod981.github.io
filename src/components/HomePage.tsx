import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BlogCard from "./blogs/BlogCard";
import { getFeatured } from "@/lib/blogRegistry";

const socials = [
  { label: "GitHub", href: "https://github.com/amod981" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/amod-shanker-20a0a1187/" },
  { label: "LeetCode", href: "https://leetcode.com/amod981/" },
  { label: "HackerRank", href: "https://www.hackerrank.com/amod981" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-950 text-zinc-100 px-4 pt-20">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-3">
          Backend Engineer · Data &amp; AI
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 mt-1 leading-tight text-zinc-100">
          I design and own the backend systems behind production data and AI.
        </h1>
        <p className="text-base text-zinc-400 text-center mb-6 max-w-2xl leading-relaxed">
          Over the last few years I've led and built several production systems: I drove the revamp of a high-throughput messaging backbone, and designed and built a multi-region data pipeline, a clinical assistant that reads and safely responds to patient messages, and an MCP server that lets a language model query a data warehouse in plain English.
        </p>
        <p className="text-base text-zinc-400 text-center mb-8 max-w-2xl leading-relaxed">
          The common thread is <span className="text-zinc-200 font-medium">backend engineering done properly</span> — event-driven services, idempotent jobs, reliable data flows, and the data modeling underneath. Data and AI are where I apply it; systems that survive contact with production are what I care about.
        </p>

        <div className="w-16 h-0.5 rounded-full bg-blue-600 mb-8" />

        <h2 className="text-xl font-semibold text-center mb-2 text-zinc-100">Let's connect</h2>
        <p className="text-sm text-zinc-500 text-center mb-6">Find me on these platforms:</p>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-white text-zinc-300 font-medium rounded-lg px-5 py-2 transition-colors text-sm"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Featured Blogs — the latest post from each category, from the registry */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center mb-12">
        <h2 className="text-2xl font-bold text-center mb-6 text-zinc-100">Featured Writing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {getFeatured().map((entry) => (
            <BlogCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </div>

      <div className="flex justify-center mb-16 w-full">
        <Link to="/projects" className="w-full max-w-xs">
          <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-base px-6 py-3 rounded-lg transition-colors">
            View My Work
          </Button>
        </Link>
      </div>
    </div>
  );
}

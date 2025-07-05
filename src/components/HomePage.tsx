import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
        <div className="flex justify-center mb-8 w-full">
          <Link to="/projects" className="w-full max-w-xs">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-base px-6 py-3 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition">
              View My Work
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

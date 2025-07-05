import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { blog1Meta } from "./Blog1";

export default function MyWebsiteBlogs() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181c2e] to-[#23284a] py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        <Card className="w-[420px] max-w-full rounded-2xl border border-blue-400/20 bg-[#20244a]/80 shadow-xl p-6 flex flex-col h-full justify-between">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">{blog1Meta.date}</span>
            <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">{blog1Meta.readTime}</span>
          </div>
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-xl font-bold text-blue-400 mb-1 leading-tight">
              {blog1Meta.title}
            </CardTitle>
          </CardHeader>
          <CardDescription className="text-base text-blue-100 mb-4">
            {blog1Meta.description}
          </CardDescription>
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
        </Card>
        <Card className="w-[420px] max-w-full rounded-2xl border border-blue-400/20 bg-[#20244a]/80 shadow-xl p-6 flex flex-col h-full justify-between">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">2024-02-10</span>
            <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">6 min read</span>
          </div>
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-xl font-bold text-blue-400 mb-1 leading-tight">
              Building Real-Time Healthcare Dashboards with Athena & QuickSight
            </CardTitle>
          </CardHeader>
          <CardDescription className="text-base text-blue-100 mb-4">
            A step-by-step guide to building scalable, real-time dashboards for healthcare analytics using AWS Athena and QuickSight.
          </CardDescription>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">AWS</span>
            <span className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">Athena</span>
            <span className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">QuickSight</span>
            <span className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">Healthcare</span>
          </div>
          <button className="mt-auto bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-base px-6 py-2 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition flex items-center gap-2 w-full justify-center">
            Read More <span aria-hidden="true">→</span>
          </button>
        </Card>
        <Card className="w-[420px] max-w-full rounded-2xl border border-blue-400/20 bg-[#20244a]/80 shadow-xl p-6 flex flex-col h-full justify-between">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">2024-03-05</span>
            <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">10 min read</span>
          </div>
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-xl font-bold text-blue-400 mb-1 leading-tight">
              Fine-Tuning LLMs for Medical Text: Lessons Learned
            </CardTitle>
          </CardHeader>
          <CardDescription className="text-base text-blue-100 mb-4">
            Insights and best practices from fine-tuning large language models for medical text classification and summarization tasks.
          </CardDescription>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">LLM</span>
            <span className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">NLP</span>
            <span className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">Healthcare</span>
            <span className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">Fine-tuning</span>
          </div>
          <button className="mt-auto bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-base px-6 py-2 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition flex items-center gap-2 w-full justify-center">
            Read More <span aria-hidden="true">→</span>
          </button>
        </Card>
        <Card className="w-[420px] max-w-full rounded-2xl border border-blue-400/20 bg-[#20244a]/80 shadow-xl p-6 flex flex-col h-full justify-between">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">2024-03-05</span>
            <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">10 min read</span>
          </div>
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-xl font-bold text-blue-400 mb-1 leading-tight">
              Fine-Tuning LLMs for Medical Text: Lessons Learned
            </CardTitle>
          </CardHeader>
          <CardDescription className="text-base text-blue-100 mb-4">
            Insights and best practices from fine-tuning large language models for medical text classification and summarization tasks.
          </CardDescription>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">LLM</span>
            <span className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">NLP</span>
            <span className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">Healthcare</span>
            <span className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">Fine-tuning</span>
          </div>
          <button className="mt-auto bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-base px-6 py-2 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition flex items-center gap-2 w-full justify-center">
            Read More <span aria-hidden="true">→</span>
          </button>
        </Card>
        <Card className="w-[420px] max-w-full rounded-2xl border border-blue-400/20 bg-[#20244a]/80 shadow-xl p-6 flex flex-col h-full justify-between">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">2024-03-05</span>
            <span className="rounded-full bg-blue-900/60 text-blue-200 px-3 py-0.5 text-xs font-semibold">10 min read</span>
          </div>
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-xl font-bold text-blue-400 mb-1 leading-tight">
              Fine-Tuning LLMs for Medical Text: Lessons Learned
            </CardTitle>
          </CardHeader>
          <CardDescription className="text-base text-blue-100 mb-4">
            Insights and best practices from fine-tuning large language models for medical text classification and summarization tasks.
          </CardDescription>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">LLM</span>
            <span className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">NLP</span>
            <span className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">Healthcare</span>
            <span className="rounded-full bg-blue-800/60 text-blue-200 px-3 py-0.5 text-xs font-medium">Fine-tuning</span>
          </div>
          <button className="mt-auto bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-base px-6 py-2 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition flex items-center gap-2 w-full justify-center">
            Read More <span aria-hidden="true">→</span>
          </button>
        </Card>
      </div>
    </div>
  );
} 
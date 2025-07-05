import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function Project() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181c2e] to-[#23284a] py-16 px-4">
      <h1 className="text-3xl font-bold text-white mb-10 text-center">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card className="bg-[#20244a]/80 rounded-xl p-6 shadow border border-blue-400/20 flex flex-col h-full justify-between">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-white text-xl font-semibold mb-2 leading-tight text-left">
              RAG-based FAQ System
            </CardTitle>
            <CardDescription className="text-zinc-300 text-base text-left max-w-xs">
              Built a retrieval-augmented generation framework with Pinecone & OpenAI, achieving a 92% accuracy rate.
            </CardDescription>
          </CardHeader>
          <Button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-lg px-6 py-3 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition">
            Know More
          </Button>
        </Card>
        <Card className="bg-[#20244a]/80 rounded-xl p-6 shadow border border-blue-400/20 flex flex-col h-full justify-between">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-white text-xl font-semibold mb-2 leading-tight text-left">
              Big Data Pipeline Orchestration
            </CardTitle>
            <CardDescription className="text-zinc-300 text-base text-left max-w-xs">
              Created a scalable and efficient data pipeline using Apache Airflow, allowing for the automated processing and analysis of large datasets.
            </CardDescription>
          </CardHeader>
          <Button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-lg px-6 py-3 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition">
            Know More
          </Button>
        </Card>
        <Card className="bg-[#20244a]/80 rounded-xl p-6 shadow border border-blue-400/20 flex flex-col h-full justify-between">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-white text-xl font-semibold mb-2 leading-tight text-left">
              Sentiment Analysis Using Deberta
            </CardTitle>
            <CardDescription className="text-zinc-300 text-base text-left max-w-xs">
              Achieved 95% accuracy in sentiment analysis using Deberta, a transformer-based model, and deployed it on AWS.
            </CardDescription>
          </CardHeader>
          <Button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-lg px-6 py-3 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition">
            Know More
          </Button>
        </Card>
        <Card className="bg-[#20244a]/80 rounded-xl p-6 shadow border border-blue-400/20 flex flex-col h-full justify-between">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-white text-xl font-semibold mb-2 leading-tight text-left">
              Implementing Encoder-Decoder Model for Text Summarization from Scratch
            </CardTitle>
            <CardDescription className="text-zinc-300 text-base text-left max-w-xs">
              Developed a text summarization model from scratch using encoder-decoder architecture, achieving 80% accuracy.
            </CardDescription>
          </CardHeader>
          <Button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-lg px-6 py-3 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition">
            Know More
          </Button>
        </Card>
        <Card className="bg-[#20244a]/80 rounded-xl p-6 shadow border border-blue-400/20 flex flex-col h-full justify-between">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-white text-xl font-semibold mb-2 leading-tight text-left">
              React Based Personal Website
            </CardTitle>
            <CardDescription className="text-zinc-300 text-base text-left max-w-xs">
              Built a personal website using React, Tailwind CSS, and TypeScript, allowing for the creation of a responsive and visually appealing website.
            </CardDescription>
          </CardHeader>
          <Link to="/MyWebsiteBlogs">
            <Button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-lg px-6 py-3 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition">
              Know More
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

const projects = [
  {
    title: "Messaging & Scheduling Systems",
    description:
      "Backend of a high-throughput messaging platform — a multi-provider SMS router, idempotent scheduled jobs across horizontally-scaled instances, and a durable message log that reconciles asynchronous delivery receipts.",
    to: "/blogs/systems",
  },
  {
    title: "Data Lakehouse & Warehouse Pipeline",
    description:
      "A multi-region ETL pipeline — orchestrated with Step Functions, incremental ingestion via Apache Hudi, and a Redshift warehouse tuned through deliberate distribution and sort key design.",
    to: "/blogs/bigdata",
  },
  {
    title: "Healthcare AI Assistant",
    description:
      "A production LLM assistant for patient messaging — hierarchical intent classification, retrieval-augmented answers, and safe escalation to a human when confidence is low.",
    to: "/blogs/floai",
  },
  {
    title: "MCP Analytics Server",
    description:
      "An MCP server that lets an LLM answer natural-language questions over a data warehouse — with per-table documentation as resources and schema-aware SQL guardrails.",
    to: "/blogs/mcp",
  },
];

export default function Project() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181c2e] to-[#23284a] py-16 px-4">
      <h1 className="text-3xl font-bold text-white mb-10 text-center">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((p) => (
          <Card
            key={p.to}
            className="bg-[#20244a]/80 rounded-xl p-6 shadow border border-blue-400/20 flex flex-col h-full justify-between"
          >
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-white text-xl font-semibold mb-2 leading-tight text-left">
                {p.title}
              </CardTitle>
              <CardDescription className="text-zinc-300 text-base text-left max-w-xs">
                {p.description}
              </CardDescription>
            </CardHeader>
            <Link to={p.to}>
              <Button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-lg px-6 py-3 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition">
                Know More
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

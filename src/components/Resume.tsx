import { Button } from "@/components/ui/button";

const experience = [
  {
    company: "Generated Health",
    period: "Sep 2023 – Present · London, UK",
    role: "Data & AI Engineer",
    bullets: [
      "Built the company's patient-messaging AI from the ground up — hierarchical intent classification, a retrieval-augmented knowledge base, and a safe human-escalation path — lifting intent-interpretation accuracy by ~86%.",
      "Designed and built an MCP server that lets an LLM answer analytics questions over the warehouse in natural language, with schema-aware guardrails that validate generated SQL before it runs.",
      "Owned the MongoDB → S3 → Redshift pipeline end to end: incremental ingestion with Apache Hudi, Step Functions orchestration as code, and a star schema tuned with deliberate distribution and sort keys — cutting average reporting query time by ~35%.",
    ],
  },
  {
    company: "AB InBev (Capstone with Imperial College)",
    period: "Jun 2023 – Aug 2023 · London, UK",
    role: "Data Science Intern",
    bullets: [
      "Built a model predicting new-customer purchase probability from early purchase patterns across UK and French markets, reaching 83% test accuracy.",
      "Ran inferential analysis to surface the market drivers that mattered most, sharpening the purchase-pattern predictions.",
    ],
  },
  {
    company: "Ola Cabs",
    period: "Jul 2019 – Aug 2022 · Bangalore, India",
    role: "Analytics Engineer",
    bullets: [
      "Built and ran end-to-end data pipelines with strict SLA and data-quality guarantees, relied on across analytics teams.",
      "Halved average query time on near-real-time pipelines by reading Presto execution plans and reworking the mapper/reducer logic.",
      "Built a PySpark application generating engagement features over a 1.2M-user dataset, and a lineage tool that cut dependency-tracing time dramatically.",
    ],
  },
];

const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "SQL", "TypeScript", "JavaScript"] },
  { group: "AI / ML", items: ["OpenAI", "LangChain", "RAG", "PyTorch", "MCP"] },
  { group: "Data", items: ["Spark", "Apache Hudi", "Redshift", "Kafka", "MongoDB"] },
  { group: "Cloud & Platform", items: ["AWS", "Step Functions", "Serverless", "Docker"] },
];

export default function Resume() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#181c2e] to-[#23284a] py-16 px-4">
      <div className="w-full max-w-3xl text-zinc-100">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-blue-400">Amod Shanker</h1>
          <p className="text-lg text-blue-200 mt-1">Data &amp; AI Engineer · London, UK</p>
          <p className="text-zinc-300 mt-4 leading-relaxed max-w-2xl">
            I design and ship production LLM systems and the data platforms behind them —
            end to end, from ingestion to the model that reads the message.
          </p>
          <div className="flex flex-wrap gap-4 mt-5 text-sm">
            <a href="https://www.linkedin.com/in/amod-shanker-20a0a1187/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">LinkedIn</a>
            <a href="https://github.com/amod981" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">GitHub</a>
            <a href="/Amod_Shanker_Resume.pdf" className="text-blue-400 underline hover:text-blue-300">Download CV (PDF)</a>
          </div>
        </header>

        {/* Experience */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-300 mb-6">Experience</h2>
          <div className="space-y-8">
            {experience.map((job) => (
              <div key={job.company} className="border-l-2 border-blue-500/40 pl-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-lg font-semibold text-blue-100">{job.company}</h3>
                  <span className="text-sm text-blue-400/80">{job.period}</span>
                </div>
                <p className="text-blue-400 font-medium text-sm mb-2">{job.role}</p>
                <ul className="list-disc list-outside ml-5 space-y-1.5 text-zinc-300 leading-relaxed">
                  {job.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-300 mb-6">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {skills.map((s) => (
              <div key={s.group}>
                <h4 className="text-sm font-semibold text-blue-200 mb-1">{s.group}</h4>
                <p className="text-zinc-300 text-sm">{s.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-4">Education</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-blue-100 font-semibold">Imperial College Business School</p>
                <p className="text-zinc-300">MSc Business Analytics — Distinction</p>
                <p className="text-blue-400/80">2022 – 2023</p>
              </div>
              <div>
                <p className="text-blue-100 font-semibold">IIT Madras</p>
                <p className="text-zinc-300">B.Tech — CGPA 8.46/10</p>
                <p className="text-blue-400/80">2015 – 2019</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-4">Certifications</h2>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>AWS Data Engineer Associate <span className="text-blue-400/80">· 2024</span></li>
              <li>Advanced SQL — HackerRank <span className="text-blue-400/80">· 2022</span></li>
            </ul>
          </div>
        </section>

        <div className="flex justify-center pt-12">
          <a href="/Amod_Shanker_Resume.pdf">
            <Button className="bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-base px-8 py-3 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition">
              Download CV (PDF)
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

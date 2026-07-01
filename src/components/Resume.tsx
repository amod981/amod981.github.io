const experience = [
  {
    company: "Generated Health",
    period: "Sep 2023 – Present · London, UK",
    role: "Backend / Data & AI Engineer",
    bullets: [
      "Led the revamp of the platform's messaging backend — a multi-provider SMS router, idempotent scheduled jobs that stay correct across horizontally-scaled instances, and a durable message log that reconciles asynchronous delivery receipts.",
      "Designed and built the MongoDB → S3 → Redshift pipeline: incremental ingestion with Apache Hudi, Step Functions orchestration deployed as code, and a star schema tuned with deliberate distribution and sort keys.",
      "Built the platform's patient-message AI from the ground up — hierarchical intent classification, a retrieval-augmented knowledge base, and a safe escalation path designed to hand off to a human rather than risk a wrong answer.",
      "Designed and built an MCP server that lets an LLM answer analytics questions over the warehouse in natural language, guarding generated SQL with schema-aware validation before it runs.",
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
    <div className="min-h-screen flex flex-col items-center bg-zinc-950 py-16 px-4">
      <div className="w-full max-w-3xl text-zinc-300">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-zinc-100">Amod Shanker</h1>
          <p className="text-base font-medium text-blue-400 mt-1">Backend Engineer · Data &amp; AI · London, UK</p>
          <p className="text-zinc-400 mt-4 leading-relaxed max-w-2xl">
            I design and own backend systems that run in production — event-driven services,
            data pipelines, and the AI that sits on top. Most of what I've built, I've built
            end to end.
          </p>
          <div className="flex flex-wrap gap-4 mt-5 text-sm">
            <a href="https://www.linkedin.com/in/amod-shanker-20a0a1187/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">LinkedIn</a>
            <a href="https://github.com/amod981" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">GitHub</a>
          </div>
        </header>

        {/* Experience */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Experience</h2>
          <div className="space-y-8">
            {experience.map((job) => (
              <div key={job.company} className="border-l-2 border-zinc-800 pl-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-lg font-semibold text-zinc-100">{job.company}</h3>
                  <span className="text-sm text-zinc-500">{job.period}</span>
                </div>
                <p className="text-blue-400 font-medium text-sm mb-2">{job.role}</p>
                <ul className="list-disc list-outside ml-5 space-y-1.5 text-zinc-400 leading-relaxed">
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
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {skills.map((s) => (
              <div key={s.group}>
                <h4 className="text-sm font-semibold text-zinc-200 mb-1">{s.group}</h4>
                <p className="text-zinc-400 text-sm">{s.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 mb-4">Education</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-zinc-100 font-semibold">Imperial College Business School</p>
                <p className="text-zinc-400">MSc Business Analytics — Distinction</p>
                <p className="text-zinc-500">2022 – 2023</p>
              </div>
              <div>
                <p className="text-zinc-100 font-semibold">IIT Madras</p>
                <p className="text-zinc-400">B.Tech — CGPA 8.46/10</p>
                <p className="text-zinc-500">2015 – 2019</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 mb-4">Certifications</h2>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>AWS Data Engineer Associate <span className="text-zinc-500">· 2024</span></li>
              <li>Advanced SQL — HackerRank <span className="text-zinc-500">· 2022</span></li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

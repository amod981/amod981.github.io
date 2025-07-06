export const FloAIBlog1Meta = {
  title: "How I Improved GPT-4o Classification in a RAG System by 42% Without Increasing Risk",
  description: "A deep dive into boosting LLM classification accuracy in a healthcare RAG system by 42%—with zero added risk. Learn the multi-stage approach and lessons for robust production AI.",
  date: "2024-06-01",
  readTime: "7 min read",
  tags: ["GPT-4o", "RAG", "LLM", "Healthcare", "Prompt Engineering"],
};

export default function FloAIBlog1() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181c2e] to-[#23284a] py-12">
      <div className="w-full max-w-5xl bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-2xl shadow-xl p-10 text-zinc-100 font-sans text-lg leading-relaxed space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4">
          How I Improved GPT-4o Classification in a RAG System by 42% Without Increasing Risk
        </h1>
        <p>
          When working with large language models in production, accuracy isn't just a quality metric — it's the foundation for downstream decisions, especially in healthcare. I recently rewired how our patient response classification works within a RAG-based assistant used by clinics — and boosted accuracy by <span className="font-semibold text-blue-300">42%</span> for knowledge base queries, all without adding clinical risk.
        </p>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">🧩 The Problem</h2>
        <p>
          Our assistant (Flo) uses LLMs to interpret patient replies, then routes them through a tree-like logic system called <span className="font-semibold text-blue-200">floKB</span>. This downstream logic assumes that the initial intent classification is reliable. But it wasn't.
        </p>
        <p>Patients often replied with vague, emotional, or indirect responses — things like:</p>
        <ul className="list-disc list-inside ml-6 space-y-1">
          <li>"Please stop!"</li>
          <li>"I've had a horrible day..."</li>
          <li>"I already told my doctor."</li>
        </ul>
        <p>
          The GPT-4o classification system misinterpreted these, triggering wrong flows, introducing clinical risk, and lowering end-to-end accuracy. A flat classification call was too brittle for the messy edges of human language.
        </p>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">🛠 My Solution: Drill-Down Classification with Consolidation</h2>
        <p>
          Rather than making one flat classification call to OpenAI, I redesigned the pipeline as a multi-stage system:
        </p>
        <ol className="list-decimal list-inside ml-6 space-y-2">
          <li>
            <span className="font-semibold text-blue-200">Level 1: High-Level Categorization</span>
            <p className="mt-1">A simple first pass determines the broad category:</p>
            <ul className="list-disc list-inside ml-6 space-y-1">
              <li>Reading</li>
              <li>Knowledge base query</li>
              <li>Acknowledgement</li>
              <li>General</li>
            </ul>
            <p className="mt-1">This level has fewer labels and clearer boundaries, which improves reliability.</p>
          </li>
          <li>
            <span className="font-semibold text-blue-200">Level 2: Targeted Subclassification</span>
            <p className="mt-1">Based on the Level 1 result, I trigger a second call only within that subdomain:</p>
            <ul className="list-disc list-inside ml-6 space-y-1">
              <li>A knowledge base query might become: assistance, reschedule, or question</li>
              <li>A reading might be further refined into: measurement, keyword, etc.</li>
            </ul>
            <p className="mt-1">Each Level 2 prompt is tightly scoped, which means:</p>
            <ul className="list-disc list-inside ml-6 space-y-1">
              <li>Fewer distractions for the model</li>
              <li>Less overlap between categories</li>
              <li>More accurate and scalable behavior without needing tons of examples</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold text-blue-200">Consolidation Logic</span>
            <p className="mt-1">Finally, I combine the Level 1 and 2 results into a single, production-ready label. This unified output plugs back into our RAG system without any downstream change.</p>
          </li>
        </ol>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">📊 The Results</h2>
        <p>After generating new labels using this multi-stage approach, I ran a full analysis comparing:</p>
        <ul className="list-disc list-inside ml-6 space-y-1">
          <li>🧠 Old (flat) labels</li>
          <li>✅ New consolidated labels</li>
          <li>🎯 Expected/Gold labels</li>
        </ul>
        <p>The improvements were clear:</p>
        <ul className="list-disc list-inside ml-6 space-y-1">
          <li><span className="font-semibold text-blue-200">42% increase</span> in correctly identified knowledge base queries</li>
          <li><span className="font-semibold text-blue-200">12% boost</span> in reading classification accuracy</li>
          <li><span className="font-semibold text-blue-200">13% better</span> acknowledgement detection</li>
          <li>All with <span className="font-semibold text-blue-200">0% increase</span> in clinical risk</li>
        </ul>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">⚠️ Lessons Learned</h2>
        <ul className="list-disc list-inside ml-6 space-y-1">
          <li>GPT-4o struggles with niche boundaries — even with good instructions. But narrowing scope dramatically improves results.</li>
          <li>More focused prompts = more reliable behavior, even with fewer examples.</li>
          <li>You don't need fine-tuning if you design your calls and consolidation logic carefully.</li>
        </ul>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">✅ Final Thoughts</h2>
        <p>
          The power of LLMs comes from their flexibility — but reliability comes from structure. By switching from flat prompting to a layered classification pipeline, I made our assistant more robust, interpretable, and production-ready.
        </p>
        <p>
          If you're building LLM-powered systems in noisy domains like healthcare, consider:
        </p>
        <ul className="list-disc list-inside ml-6 space-y-1">
          <li>✂️ Less generalization, more focus.</li>
        </ul>
      </div>
    </div>
  );
}
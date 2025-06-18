import React from "react";
import "./RagBlog.css";

function RagBlog() {
  return (
    <div className="blog-container">
      <h1>
        How I Improved GPT-4o Classification in a RAG System by 42% Without
        Increasing Risk
      </h1>

      <div className="blog-content">
        <p>
          When working with large language models in production, accuracy isn't
          just a quality metric — it's the foundation for downstream decisions,
          especially in healthcare. I recently rewired how our patient response
          classification works within a RAG-based assistant used by clinics —
          and boosted accuracy by 42% for knowledge base queries, all without
          adding clinical risk.
        </p>

        <h2>🧩 The Problem</h2>
        <p>
          Our assistant (Flo) uses LLMs to interpret patient replies, then
          routes them through a tree-like logic system called floKB. This
          downstream logic assumes that the initial intent classification is
          reliable. But it wasn't.
        </p>
        <p>
          Patients often replied with vague, emotional, or indirect responses —
          things like:
        </p>
        <ul>
          <li>"Please stop!"</li>
          <li>"I've had a horrible day..."</li>
          <li>"I already told my doctor."</li>
        </ul>
        <p>
          The GPT-4o classification system misinterpreted these, triggering
          wrong flows, introducing clinical risk, and lowering end-to-end
          accuracy. A flat classification call was too brittle for the messy
          edges of human language.
        </p>

        <h2>🛠 My Solution: Drill-Down Classification with Consolidation</h2>
        <p>
          Rather than making one flat classification call to OpenAI, I
          redesigned the pipeline as a multi-stage system:
        </p>

        <h3>1. Level 1: High-Level Categorization</h3>
        <p>A simple first pass determines the broad category:</p>
        <ul>
          <li>Reading</li>
          <li>Knowledge base query</li>
          <li>Acknowledgement</li>
          <li>General</li>
        </ul>
        <p>
          This level has fewer labels and clearer boundaries, which improves
          reliability.
        </p>

        <h3>2. Level 2: Targeted Subclassification</h3>
        <p>
          Based on the Level 1 result, I trigger a second call only within that
          subdomain:
        </p>
        <ul>
          <li>
            A knowledge base query might become: assistance, reschedule, or
            question
          </li>
          <li>
            A reading might be further refined into: measurement, keyword, etc.
          </li>
        </ul>
        <p>Each Level 2 prompt is tightly scoped, which means:</p>
        <ul>
          <li>Fewer distractions for the model</li>
          <li>Less overlap between categories</li>
          <li>
            More accurate and scalable behavior without needing tons of examples
          </li>
        </ul>

        <h3>3. Consolidation Logic</h3>
        <p>
          Finally, I combine the Level 1 and 2 results into a single,
          production-ready label. This unified output plugs back into our RAG
          system without any downstream change.
        </p>

        <h2>📊 The Results</h2>
        <p>
          After generating new labels using this multi-stage approach, I ran a
          full analysis comparing:
        </p>
        <ul>
          <li>🧠 Old (flat) labels</li>
          <li>✅ New consolidated labels</li>
          <li>🎯 Expected/Gold labels</li>
        </ul>
        <p>The improvements were clear:</p>
        <ul>
          <li>42% increase in correctly identified knowledge base queries</li>
          <li>12% boost in reading classification accuracy</li>
          <li>13% better acknowledgement detection</li>
          <li>All with 0% increase in clinical risk</li>
        </ul>

        <h2>⚠️ Lessons Learned</h2>
        <ul>
          <li>
            GPT-4o struggles with niche boundaries — even with good
            instructions. But narrowing scope dramatically improves results.
          </li>
          <li>
            More focused prompts = more reliable behavior, even with fewer
            examples.
          </li>
          <li>
            You don't need fine-tuning if you design your calls and
            consolidation logic carefully.
          </li>
        </ul>

        <h2>✅ Final Thoughts</h2>
        <p>
          The power of LLMs comes from their flexibility — but reliability comes
          from structure. By switching from flat prompting to a layered
          classification pipeline, I made our assistant more robust,
          interpretable, and production-ready.
        </p>
        <p>
          If you're building LLM-powered systems in noisy domains like
          healthcare, consider:
        </p>
        <p>✂️ Less generalization, more focus.</p>
      </div>
    </div>
  );
}

export default RagBlog;

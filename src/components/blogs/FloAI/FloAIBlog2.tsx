export const FloAIBlog2Meta = {
  title: "Making Vector Search Smarter with LLM Context Rewriting",
  description: "How to bridge the gap between vector search and real conversation using LLM-powered context rewriting. A practical approach for smarter, more human chatbots.",
  date: "2024-06-01",
  readTime: "6 min read",
  tags: ["Vector Search", "LLM", "Context Rewriting", "AI Assistant", "OpenAI"],
};

export default function FloAIBlog2() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181c2e] to-[#23284a] py-12">
      <div className="w-full max-w-5xl bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-2xl shadow-xl p-10 text-zinc-100 font-sans text-lg leading-relaxed space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4">
          Making Vector Search Smarter with LLM Context Rewriting
        </h1>
        <p>
          Most QA systems that use vector search rely on embedding similarity. It's a powerful method — but it has a big gap when it comes to real conversations.
        </p>
        <p>
          Here's a problem I ran into while building a chat-based health assistant:
        </p>
        <blockquote className="border-l-4 border-blue-400 pl-4 italic text-blue-200">
          The system can answer "What is the location of the clinic?" perfectly. But when the user just replies with "Where?" — it struggles.
        </blockquote>
        <p>
          That's because traditional vector search doesn't understand context like a human. It matches based on static embedding similarity, not conversation history.
        </p>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">Why Regular Embedding Search Fails</h2>
        <p>In a real chat, the bot might say:</p>
        <pre className="bg-zinc-900 rounded p-4 text-base overflow-x-auto text-blue-200 mb-4"><code>{`Bot: You're all set. Do visit us at 10.
User: Where?`}</code></pre>
        <p>
          If you embed the message "Where?" and do a similarity search, you'll likely get back irrelevant matches — because "Where?" has almost no information.
        </p>
        <p>
          That's the catch: <span className="font-semibold text-blue-300">embedding-based retrieval works best when the query is self-contained.</span> Short, vague follow-ups break it.
        </p>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">My Solution: Context-Aware Rewriting with LLMs</h2>
        <p>Here's what I built:</p>
        <ol className="list-decimal list-inside ml-6 space-y-2">
          <li>Run regular embedding search using the user's message (e.g., "Where?").</li>
          <li>Pass the result and chat history into an <span className="font-semibold text-blue-200">OpenAI function that checks if the retrieved answer logically follows</span>.</li>
          <li>If it fails:
            <ul className="list-disc list-inside ml-6 space-y-1">
              <li>Rewrite the vague query into a <span className="font-semibold text-blue-200">clearer version</span> (e.g., "Where is the clinic located?") using an LLM prompt.</li>
              <li>Re-run the embedding search with the rewritten query.</li>
              <li>Validate again.</li>
            </ul>
          </li>
        </ol>
        <p>
          Only if the first pass fails do I use the LLM to enhance the query. This keeps the system <span className="font-semibold text-blue-300">fast and cost-efficient</span>.
        </p>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">Why This Works</h2>
        <ul className="list-disc list-inside ml-6 space-y-1">
          <li><span className="font-semibold">Handles real-world vagueness</span> in chat ("how?", "what now?", "there?")</li>
          <li>Uses LLMs only when needed — not on every query</li>
          <li>Bridges retrieval with reasoning in a smart, layered way</li>
        </ul>
        <p>
          It's like giving your search engine a second chance to understand what the user <em>really</em> meant.
        </p>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">Final Thoughts</h2>
        <p>
          Vector search isn't broken — it just needs help sometimes.<br />
          By selectively combining LLMs with traditional retrieval, I was able to create a system that feels <span className="font-semibold text-blue-300">more human</span>, while still being performant and cost-aware.
        </p>
        <p>
          If you're building a conversational AI system, try this kind of fallback logic. It makes a big difference when users stop writing full sentences — which they always do.
        </p>
      </div>
    </div>
  );
}

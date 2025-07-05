export const blog1Meta = {
  title: "Mastering React Router in a Component-Styled SPA",
  description: "As a backend-focused AI/ML engineer, I'm no stranger to data pipelines and LLM architectures. But for my personal website, I wanted to do more than showcase projects — I wanted the navigation itself to be clean, fast, and semantically correct. This post is focused entirely on the React Router part of that effort.",
  date: "2024-01-15",
  readTime: "8 min read",
  tags: ["RAG", "GPT-4o", "Healthcare", "AI"],
};

export default function Blog1() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181c2e] to-[#23284a] py-12">
      <div className="w-full max-w-5xl bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-2xl shadow-xl p-10 text-zinc-100 font-sans text-lg leading-relaxed space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4">Mastering React Router in a Component-Styled SPA</h1>
        <p>
          As a backend-focused AI/ML engineer, I'm no stranger to data pipelines and LLM architectures. But for my personal website, I wanted to do more than showcase projects — I wanted the <span className="font-semibold text-white">navigation itself</span> to be clean, fast, and semantically correct. This post is focused entirely on the <span className="font-semibold text-white">React Router</span> part of that effort.
        </p>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">Why Routing Even in a Static Site?</h2>
        <ul className="list-disc list-inside ml-6 space-y-1">
          <li>Avoids full page reloads</li>
          <li>Supports direct links to pages like <span className="text-blue-400">/projects</span></li>
          <li>Encourages clean separation of view logic</li>
        </ul>
        <p>I wasn't just looking for functionality — I wanted <span className="font-semibold text-white">developer-quality navigation UX</span>.</p>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">Routing Setup in My Project</h2>
        <p>Here's the basic routing skeleton from my <span className="bg-zinc-800 px-1 rounded text-blue-300">App.tsx</span>:</p>
        <pre className="bg-zinc-900 rounded p-4 text-base overflow-x-auto text-blue-200 mb-4"><code>{`<BrowserRouter>
  <NavBar />
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/projects" element={<Project />} />
  </Routes>
</BrowserRouter>`}</code></pre>
        <ul className="list-disc list-inside ml-6 space-y-1">
          <li>Keeps all routes centralized</li>
          <li>Allows persistent UI (like <span className="bg-zinc-800 px-1 rounded text-blue-300">NavBar</span>) across pages</li>
          <li>Easy to extend</li>
        </ul>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2"><span className='bg-zinc-800 px-1 rounded text-blue-300'>asChild</span> + <span className='bg-zinc-800 px-1 rounded text-blue-300'>&lt;Link&gt;</span> = Semantic Routing</h2>
        <p>I use <span className="bg-zinc-800 px-1 rounded text-blue-300">shadcn/ui</span>, which offers styled components like <span className="bg-zinc-800 px-1 rounded text-blue-300">NavigationMenuLink</span>. To make these play nicely with <span className="bg-zinc-800 px-1 rounded text-blue-300">react-router-dom</span>, I needed <span className="bg-zinc-800 px-1 rounded text-blue-300">asChild</span>:</p>
        <pre className="bg-zinc-900 rounded p-4 text-base overflow-x-auto text-blue-200 mb-4"><code>{`<NavigationMenuLink asChild>
  <Link to="/projects">Projects</Link>
</NavigationMenuLink>`}</code></pre>
        <p>Without <span className="bg-zinc-800 px-1 rounded text-blue-300">asChild</span>, nesting a <span className="bg-zinc-800 px-1 rounded text-blue-300">&lt;Link&gt;</span> inside these UI components could produce invalid HTML (like <span className="bg-zinc-800 px-1 rounded text-blue-300">&lt;a&gt;&lt;button&gt;&lt;/button&gt;&lt;/a&gt;</span>). This pattern avoids that while keeping the design system intact.</p>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">Safe Navigation Buttons</h2>
        <p>A subtle problem: I initially wrapped a <span className="bg-zinc-800 px-1 rounded text-blue-300">shadcn/ui</span> <span className="bg-zinc-800 px-1 rounded text-blue-300">&lt;Button&gt;</span> inside a <span className="bg-zinc-800 px-1 rounded text-blue-300">&lt;Link&gt;</span> like this:</p>
        <pre className="bg-zinc-900 rounded p-4 text-base overflow-x-auto text-blue-200 mb-4"><code>{`<Link to="/projects">
  <Button>View My Work</Button>
</Link>`}</code></pre>
        <p>But again — potential HTML nesting issue. The better version:</p>
        <pre className="bg-zinc-900 rounded p-4 text-base overflow-x-auto text-blue-200 mb-4"><code>{`<Link asChild to="/projects">
  <Button>View My Work</Button>
</Link>`}</code></pre>
        <p>Now the button itself acts as the link, without extra markup.</p>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">Takeaways</h2>
        <p>React Router remains a lightweight, powerful tool — even for small sites. Combining it with UI libraries like <span className="bg-zinc-800 px-1 rounded text-blue-300">shadcn/ui</span> can introduce HTML and accessibility subtleties, but the <span className="bg-zinc-800 px-1 rounded text-blue-300">asChild</span> pattern makes it all click.</p>
        <ul className="list-disc list-inside ml-6 space-y-1">
          <li>Maintain clean routing logic</li>
          <li>Avoid invalid nesting and unexpected behaviors</li>
          <li>Keep my styled components fully functional</li>
        </ul>
        <p>If you're working on a component-styled React site and want routing that behaves <span className="italic">right</span>, hope this helps.</p>
      </div>
    </div>
  );
}
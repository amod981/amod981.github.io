export const blog2Meta = {
  title: "Setting Up GitHub Actions to Deploy My Website — What I Actually Learned",
  description: "Recently, I built my personal website and wanted to automate the deployment using GitHub Actions. I could've just used some template or auto-deploy setup, but I decided to do it from scratch. Not because I had to, but because I wanted to actually learn how it all works.",
  date: "2025-05-07",
  readTime: "10 min read",
  tags: ["GitHub Actions", "React", "TypeScript", "Deployment"],
};

export default function Blog2() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181c2e] to-[#23284a] py-12">
      <div className="w-full max-w-5xl bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-2xl shadow-xl p-10 text-zinc-100 font-sans text-lg leading-relaxed space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4">Setting Up GitHub Actions to Deploy My Website — What I Actually Learned</h1>
        <p>
          Recently, I built my personal website and wanted to automate the deployment using GitHub Actions. I could've just used some template or auto-deploy setup, but I decided to do it from scratch. Not because I had to, but because I wanted to actually learn how it all works.
        </p>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">Starting from Nothing</h2>
        <p>
          I created a <span className="bg-zinc-800 px-1 rounded text-blue-300">.github/workflows/</span> folder and... forgot to add a <span className="bg-zinc-800 px-1 rounded text-blue-300">.yml</span> file. So obviously, GitHub Actions didn't run. Took me a bit to realize that it needs a proper <span className="bg-zinc-800 px-1 rounded text-blue-300">.yml</span> file to even show up in the Actions tab. First small lesson.
        </p>
        <p>
          Once I added the file, I wrote everything by hand — not copied from StackOverflow. I just wanted to see what happens if I write it myself.
        </p>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">Thinking in Step Functions Helped</h2>
        <p>
          Since I've worked with AWS Step Functions a lot in data workflows, I found some similarities:
        </p>
        <ul className="list-disc list-inside ml-6 space-y-1">
          <li>The whole <span className="bg-zinc-800 px-1 rounded text-blue-300">.yml</span> file felt like a state machine</li>
          <li>Each job was like a state/task</li>
          <li><span className="bg-zinc-800 px-1 rounded text-blue-300">steps</span> inside a job = the actual commands you want to run</li>
          <li><span className="bg-zinc-800 px-1 rounded text-blue-300">needs:</span> = just like connecting states in Step Functions</li>
        </ul>
        <p>
          So in my head, I was treating each job as a box running in its own container, only connected if I told it to be.
        </p>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">I Over-Engineered It On Purpose</h2>
        <p>
          Instead of writing one job, I added three:
        </p>
        <pre className="bg-zinc-900 rounded p-4 text-base overflow-x-auto text-blue-200 mb-4"><code>{`jobs:
  start-check:      # just a dummy echo
  checkout-the-code:
    needs: start-check
    ...
  end-check:        # another dummy echo`}</code></pre>
        <p>
          The goal wasn't to be efficient — it was to learn:
        </p>
        <ul className="list-disc list-inside ml-6 space-y-1">
          <li>How <span className="bg-zinc-800 px-1 rounded text-blue-300">needs:</span> works</li>
          <li>That each job runs on a separate machine (clean environment)</li>
          <li>That you can't just write steps anywhere — they must go inside a job</li>
          <li>That every job needs a <span className="bg-zinc-800 px-1 rounded text-blue-300">runs-on</span>, and <span className="bg-zinc-800 px-1 rounded text-blue-300">steps</span>, and everything else fails silently if you miss them</li>
        </ul>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">The Error That Helped</h2>
        <p>
          At one point, the build failed. Not because of a GitHub Actions mistake — but because I had an unused import in a <span className="bg-zinc-800 px-1 rounded text-blue-300">.tsx</span> file. ESLint threw an error.
        </p>
        <p>
          This actually helped me realize something important: GitHub Actions is just running your local commands in a clean environment. So now, before pushing, I run the same commands locally to make sure it works: <span className="bg-zinc-800 px-1 rounded text-blue-300">npm ci</span>, <span className="bg-zinc-800 px-1 rounded text-blue-300">npm run build</span>, etc. It's faster than waiting for CI to fail.
        </p>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">The Deploy Step</h2>
        <p>
          Once the build passed, I added this:
        </p>
        <pre className="bg-zinc-900 rounded p-4 text-base overflow-x-auto text-blue-200 mb-4"><code>{`- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: \${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist`}</code></pre>
        <p>
          This action just takes the built <span className="bg-zinc-800 px-1 rounded text-blue-300">dist/</span> folder and pushes it to the <span className="bg-zinc-800 px-1 rounded text-blue-300">gh-pages</span> branch. Then I enabled GitHub Pages from the repo settings and pointed it to that branch. Done.
        </p>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">What I Took Away From This</h2>
        <ul className="list-disc list-inside ml-6 space-y-1">
          <li>Workflows only run if you create a <span className="bg-zinc-800 px-1 rounded text-blue-300">.yml</span> file in the right place</li>
          <li>Jobs are separate environments</li>
          <li>Steps have to be inside jobs</li>
          <li><span className="bg-zinc-800 px-1 rounded text-blue-300">uses:</span> is how you run third-party actions</li>
          <li><span className="bg-zinc-800 px-1 rounded text-blue-300">with:</span> is how you pass them config</li>
          <li>And GitHub Actions isn't complicated — it's just scripted automation, no magic</li>
        </ul>
        <p>
          That's it. No fancy setup, no frameworks. Just me trying to understand how deployment pipelines work under the hood.
        </p>
        <p>
          If you're building your site and haven't tried GitHub Actions yet, give it a go — writing your own workflow teaches you more than clicking a deploy button ever will.
        </p>
      </div>
    </div>
  );
}
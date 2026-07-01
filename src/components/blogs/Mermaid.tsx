import { useEffect, useRef, useState } from "react";

// Lazy-renders a Mermaid diagram. Mermaid is dynamically imported so it only
// loads on posts that actually contain a diagram — keeping the main bundle lean.
let seq = 0;

export default function Mermaid({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string>("");
  const idRef = useRef(`mermaid-${seq++}`);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          fontFamily: "inherit",
        });
        const { svg } = await mermaid.render(idRef.current, chart);
        if (!cancelled) setSvg(svg);
      } catch {
        // If rendering fails, fall back to the raw source below.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (!svg) {
    return (
      <pre className="rounded-lg bg-zinc-950/70 p-4 overflow-x-auto text-sm mb-6 text-zinc-400">
        <code>{chart}</code>
      </pre>
    );
  }

  return (
    <div
      className="my-6 flex justify-center overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

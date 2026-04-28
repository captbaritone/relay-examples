"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false, theme: "neutral" });

let counter = 0;

export default function MermaidDiagram({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    const id = `mermaid-${counter++}`;
    mermaid.render(id, code).then(({ svg }) => {
      setSvg(svg);
    });
  }, [code]);

  return <div ref={ref} className="flex justify-center" dangerouslySetInnerHTML={svg ? { __html: svg } : undefined} />;
}

'use client';
import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'neutral' });
    if (ref.current && !rendered) {
      mermaid.run({ nodes: [ref.current] });
      setRendered(true);
    }
  }, [chart, rendered]);

  return (
    <div ref={ref} className="mermaid my-6">
      {chart}
    </div>
  );
}

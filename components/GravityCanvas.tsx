"use client";
import { useEffect, useRef } from "react";
import { control, mousePos } from "@/lib/shared";

// Remounted (via `key` on ballColor) to fully rebuild the scene on palette change.
export default function GravityCanvas({ ballColor, onReady }: { ballColor: string; onReady: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readyRef = useRef(onReady);
  readyRef.current = onReady;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    // three.js is loaded on demand so it never blocks the first paint / hydration of the page
    let stop: (() => void) | undefined;
    let cancelled = false;
    import("@/lib/gravityScene").then(({ createGravityScene }) => {
      if (cancelled) return;
      stop = createGravityScene({
        canvas,
        container,
        ballColor,
        control,
        mousePos,
        onReady: () => readyRef.current(),
      });
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, [ballColor]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
}

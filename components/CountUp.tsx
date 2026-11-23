"use client";
import { useEffect, useRef, useState } from "react";

/** Counts a value like "350+" or "99%" up from 0 when it scrolls into view. */
export default function CountUp({ value, duration = 1500 }: { value: string; duration?: number }) {
  const m = value.match(/^(\d+)(.*)$/);
  const target = m ? parseInt(m[1], 10) : 0;
  const suffix = m ? m[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(m ? 0 : target);
  useEffect(() => {
    const el = ref.current;
    if (!el || !m) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [m, target, duration]);
  if (!m) return <span>{value}</span>;
  return <span ref={ref}>{n}{suffix}</span>;
}

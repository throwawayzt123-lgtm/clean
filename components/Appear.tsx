"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { EASE } from "@/lib/shared";

type From = "up" | "left" | "right" | "zoom";

/** Snappy scroll-in for cards: fades and slides/zooms into place once, with an optional stagger delay. */
export default function Appear({ children, delay = 0, from = "up", className }: { children: ReactNode; delay?: number; from?: From; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const hidden =
    from === "left" ? "translateX(-56px)" : from === "right" ? "translateX(56px)" : from === "zoom" ? "scale(0.9)" : "translateY(40px) scale(0.97)";
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : hidden,
        transition: `opacity 0.8s ${EASE} ${delay}s, transform 0.9s ${EASE} ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

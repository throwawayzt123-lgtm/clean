"use client";
import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { EASE } from "@/lib/shared";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
};

// Scroll-reveal: translateY(42px) + blur(8px) -> rest over 1.5s; triggers once at ~45% visible.
export default function Reveal({ children, delay = 0, className, as: Tag = "div", style }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // 45% of the element, or 45% of the viewport for elements taller than the screen
          const enough = e.intersectionRatio >= 0.45 || e.intersectionRect.height >= window.innerHeight * 0.45;
          if (e.isIntersecting && enough) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.45, 0.6, 0.8, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(42px)",
        filter: shown ? "blur(0px)" : "blur(8px)",
        transition: `opacity 1.5s ${EASE} ${delay}s, transform 1.5s ${EASE} ${delay}s, filter 1.5s ${EASE} ${delay}s`,
        willChange: "opacity, transform, filter",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

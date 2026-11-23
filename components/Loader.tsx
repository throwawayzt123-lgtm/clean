"use client";
import { useEffect, useRef, useState } from "react";

const SPRING = "cubic-bezier(0.34,1.4,0.5,1)"; // springy overshoot, approx stiffness 90 / damping 15

const FULL = ["Crystal", "Clear", "Cleaning", "Company"];

export default function Loader({ ready, onDone }: { ready: boolean; onDone: () => void }) {
  const [value, setValue] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const readyRef = useRef(ready);
  const doneRef = useRef(onDone);
  readyRef.current = ready;
  doneRef.current = onDone;

  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true));
    let raf = 0;
    let last = performance.now();
    let v = 0;
    const t0 = performance.now();
    let finished = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (finished) return;
      if (readyRef.current && now - t0 > 650) {
        v += (100 - v) * 14 * dt;
        if (v >= 99.4) v = 100;
      } else {
        v += (92 - v) * 1.7 * dt;
      }
      setValue(v);
      if (v >= 99.9 && readyRef.current && now - t0 > 650) {
        finished = true;
        timers.push(setTimeout(() => setLeaving(true), 60));
        timers.push(
          setTimeout(() => {
            doneRef.current();
            setGone(true);
          }, 60 + 420),
        );
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(r);
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (gone) return null;

  const pct = Math.min(100, Math.round(value));
  const item = (i: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(18px)",
    filter: mounted ? "blur(0px)" : "blur(6px)",
    transition: `opacity 0.9s ${SPRING} ${0.1 + i * 0.16}s, transform 0.9s ${SPRING} ${0.1 + i * 0.16}s, filter 0.9s ${SPRING} ${0.1 + i * 0.16}s`,
  });

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: "radial-gradient(circle at 50% 42%, #14170a 0%, #050505 55%, #000 100%)",
        gap: 26,
        opacity: leaving ? 0 : 1,
        pointerEvents: leaving ? "none" : "auto",
        transition: "opacity 0.42s cubic-bezier(0.65,0,0.35,1)",
      }}
      role="status"
      aria-live="polite"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/c4logo.png" alt="C4 Cleaning" className="w-20 h-auto rounded-2xl" style={item(0)} />
      {/* C4 = the four C's: animated full form */}
      <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-5 gap-y-1 px-6 text-center" aria-label="Crystal Clear Cleaning Company">
        {FULL.map((w, wi) => (
          <span key={w} className="inline-flex font-display font-semibold italic uppercase text-[1.35rem] sm:text-3xl md:text-4xl tracking-tight">
            {w.split("").map((ch, ci) => {
              const first = ci === 0;
              const d = 0.05 + wi * 0.1 + ci * 0.012;
              return (
                <span
                  key={ci}
                  style={{
                    display: "inline-block",
                    color: first ? "#DFFE12" : "rgba(255,255,255,0.88)",
                    textShadow: first ? "0 0 10px rgba(223,254,18,0.9), 0 0 30px rgba(223,254,18,0.55)" : "none",
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0) scale(1)" : first ? "translateY(26px) scale(1.6)" : "translateY(18px)",
                    filter: mounted ? "blur(0)" : "blur(8px)",
                    transition: `opacity 0.35s ${SPRING} ${d}s, transform 0.45s ${SPRING} ${d}s, filter 0.35s ${SPRING} ${d}s`,
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        ))}
      </div>
      <div className="font-mono uppercase" style={{ ...item(0), fontSize: 10, letterSpacing: "0.28em", color: "rgba(255,255,255,0.55)" }}>
        {pct >= 100 ? "Welcome" : "Getting things sparkling"}
      </div>
      <div style={item(1)}>
        <div style={{ width: "clamp(180px, 32vw, 280px)", height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 99 }}>
          <div
            style={{
              height: "100%",
              width: `${value}%`,
              borderRadius: 99,
              background: "linear-gradient(90deg, #f3ffa0 0%, #DFFE12 100%)",
              boxShadow: "0 0 14px rgba(223,254,18,0.55)",
              transition: "width 0.45s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>
      </div>
      <div className="font-mono font-bold tabular-nums" style={{ ...item(2), fontSize: 11, letterSpacing: "0.1em", color: "#DFFE12" }}>
        {String(pct).padStart(3, "0")}%
      </div>
    </div>
  );
}

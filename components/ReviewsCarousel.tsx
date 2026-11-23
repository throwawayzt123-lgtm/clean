"use client";
import { useEffect, useRef, useState } from "react";
import Appear from "./Appear";
import CountUp from "./CountUp";
import { EASE } from "@/lib/shared";
import { STATS, TESTIMONIALS } from "@/lib/content";

const DURATION = 7000;

/** Featured-review stage + selectable reviewer list with an auto-advancing progress bar. */
export default function ReviewsCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragX = useRef<number | null>(null);
  const go = (d: number) => setI((x) => (x + d + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setI((x) => (x + 1) % TESTIMONIALS.length), DURATION);
    return () => clearTimeout(id);
  }, [i, paused]);

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* featured: sliding carousel (swipe / drag, arrows, dots, auto-advance) */}
      <div className="lg:col-span-8 relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0c0c]/90 backdrop-blur-md min-h-[420px] md:min-h-[500px] flex flex-col select-none">
        <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(223,254,18,0.16), transparent 65%)", animation: "float-glow 9s ease-in-out infinite" }} />
        <span
          className="pointer-events-none select-none absolute right-6 md:right-10 top-0 font-display font-bold leading-none"
          style={{ fontSize: "clamp(140px, 22vw, 260px)", color: "transparent", WebkitTextStroke: "1.5px rgba(223,254,18,0.35)" }}
          aria-hidden="true"
        >
          ”
        </span>

        <div
          className="relative flex-1 overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => { dragX.current = e.clientX; }}
          onPointerUp={(e) => {
            if (dragX.current === null) return;
            const dx = e.clientX - dragX.current;
            dragX.current = null;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
          onPointerCancel={() => { dragX.current = null; }}
        >
          <div
            className="flex h-full"
            style={{ transform: `translateX(-${i * 100}%)`, transition: `transform 0.8s ${EASE}` }}
          >
            {TESTIMONIALS.map((x, k) => (
              <div key={x.name} className="w-full shrink-0 p-7 md:p-12 pb-24 md:pb-28 flex flex-col" aria-hidden={k !== i}>
                <div className="flex gap-1 text-volt text-base" aria-label="5 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <span key={n} style={k === i ? { display: "inline-block", animation: `star-pop 0.5s ${EASE} ${0.35 + n * 0.08}s both` } : { opacity: 0 }}>★</span>
                  ))}
                </div>
                <p className="font-display font-semibold text-[1.9rem] sm:text-4xl md:text-[3.2rem] leading-[1.06] tracking-[-0.025em] text-white mt-5 max-w-2xl" style={k === i ? { animation: `fade-up 0.8s ${EASE} 0.25s both` } : { opacity: 0 }}>
                  “{x.quote}”
                </p>
                <p className="font-sans text-[15px] md:text-[17px] text-white/60 mt-5 max-w-xl leading-relaxed" style={k === i ? { animation: `fade-up 0.8s ${EASE} 0.4s both` } : { opacity: 0 }}>{x.text}</p>
                <div className="mt-auto pt-8 flex items-center gap-4" style={k === i ? { animation: `fade-up 0.8s ${EASE} 0.55s both` } : { opacity: 0 }}>
                  <span className="w-12 h-12 rounded-full bg-volt text-black flex items-center justify-center font-display font-bold text-lg" style={k === i ? { animation: `star-pop 0.6s ${EASE} 0.6s both` } : undefined}>{x.name[0]}</span>
                  <div>
                    <p className="font-display font-semibold text-white text-[17px] leading-tight">{x.name}</p>
                    <p className="font-mono uppercase text-white/45" style={{ fontSize: 10, letterSpacing: "0.18em" }}>{x.city} · Verified client</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* controls */}
        <div className="absolute bottom-6 md:bottom-8 right-6 md:right-10 flex items-center gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Reviews">
            {TESTIMONIALS.map((x, k) => (
              <button
                key={x.name}
                role="tab"
                aria-selected={k === i}
                aria-label={`Review ${k + 1}`}
                onClick={() => setI(k)}
                className="h-2 rounded-full cursor-pointer"
                style={{ width: k === i ? 28 : 8, background: k === i ? "#DFFE12" : "rgba(255,255,255,0.25)", transition: "all 0.4s ease" }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {[-1, 1].map((d) => (
              <button
                key={d}
                onClick={() => go(d)}
                aria-label={d < 0 ? "Previous review" : "Next review"}
                className="w-11 h-11 rounded-full border border-white/20 bg-black/40 text-white hover:bg-volt hover:text-black hover:border-volt flex items-center justify-center cursor-pointer transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: d < 0 ? "rotate(180deg)" : "none" }}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* selector + stats */}
      <div className="lg:col-span-4 flex flex-col gap-3">
        {TESTIMONIALS.map((x, k) => {
          const on = k === i;
          return (
            <Appear key={x.name} delay={k * 0.1} from="right">
            <button
              onClick={() => setI(k)}
              aria-pressed={on}
              className="relative w-full text-left overflow-hidden rounded-2xl border px-5 py-4 cursor-pointer hover:translate-x-1 transition-transform"
              style={{
                borderColor: on ? "rgba(223,254,18,0.6)" : "rgba(255,255,255,0.1)",
                background: on ? "rgba(223,254,18,0.07)" : "rgba(12,12,12,0.85)",
                transition: "border-color 0.4s ease, background 0.4s ease",
              }}
            >
              <span className="flex items-center gap-3">
                <span
                  className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-display font-bold"
                  style={{ background: on ? "#DFFE12" : "rgba(255,255,255,0.1)", color: on ? "#000" : "#fff", transition: "all 0.4s ease" }}
                >
                  {x.name[0]}
                </span>
                <span className="min-w-0">
                  <span className="block font-display font-semibold text-white text-[15px] leading-tight">{x.name}</span>
                  <span className="block font-sans text-[12.5px] text-white/50 truncate">“{x.quote}”</span>
                </span>
              </span>
              {on && !paused && (
                <span
                  key={`p-${i}`}
                  className="absolute left-0 bottom-0 h-[2px] w-full bg-volt origin-left"
                  style={{ animation: `bar-fill ${DURATION}ms linear both` }}
                />
              )}
            </button>
            </Appear>
          );
        })}

        <div className="grid grid-cols-2 gap-3 mt-1">
          {STATS.slice(0, 2).map((s, si) => (
            <Appear key={s.label} delay={0.3 + si * 0.1} from="zoom">
            <div className="rounded-2xl border border-white/10 bg-[#0c0c0c]/85 px-4 py-4 hover:border-volt/60 transition-colors">
              <p className="font-display font-semibold text-3xl text-volt"><CountUp value={s.value} /></p>
              <p className="font-mono uppercase text-white/45 mt-1" style={{ fontSize: 9, letterSpacing: "0.15em" }}>{s.label}</p>
            </div>
            </Appear>
          ))}
        </div>
      </div>
    </div>
  );
}

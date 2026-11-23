"use client";
import { useCallback, useEffect, useState } from "react";
import { WORK, BRAND } from "@/lib/content";
import SmartLink from "@/components/SmartLink";
import Appear from "./Appear";
import { LABEL, LABEL_STYLE } from "./ui";

const FILTERS = ["All", "Residential", "Commercial"] as const;
type Filter = (typeof FILTERS)[number];

export default function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<number | null>(null);

  const items = WORK.filter((w) => filter === "All" || w.tag === filter);
  const count = (f: Filter) => (f === "All" ? WORK.length : WORK.filter((w) => w.tag === f).length);

  const step = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  const cur = open !== null ? items[open] : null;

  return (
    <>
      <section className="relative z-10 px-5 md:px-12 pt-32 md:pt-44 pb-10">
        <p className={LABEL} style={LABEL_STYLE}>[ Our portfolio ]</p>
        <h1 className="font-display font-semibold tracking-[-0.03em] leading-[0.95] text-5xl sm:text-6xl md:text-8xl mt-6 max-w-4xl">
          Spaces we&apos;ve left <span className="text-volt">spotless.</span>
        </h1>
        <p className="font-sans text-white/60 text-base md:text-lg mt-6 max-w-xl leading-relaxed">
          Real house and office cleaning projects from across Lahore. Browse residential and commercial work by C4 Cleaning.
        </p>

        <div className="mt-10 flex flex-wrap gap-2.5" role="tablist" aria-label="Filter projects">
          {FILTERS.map((f) => {
            const on = f === filter;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={on}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-5 py-2.5 font-sans text-sm font-semibold cursor-pointer transition-colors ${
                  on ? "bg-volt text-black border-volt" : "border-white/20 text-white/80 hover:border-volt hover:text-volt"
                }`}
              >
                {f} <span className={on ? "text-black/60" : "text-white/40"}>{count(f)}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 px-5 md:px-12 pb-20 md:pb-32">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5">
          {items.map((w, k) => (
            <Appear key={w.src} delay={(k % 3) * 0.08} from="zoom" className="break-inside-avoid">
            <button
              onClick={() => setOpen(k)}
              className="group relative block w-full mb-4 md:mb-5 overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0c] cursor-zoom-in break-inside-avoid text-left"
              aria-label={`Open ${w.tag} project, ${w.place}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={w.src}
                alt={`${w.tag} cleaning by C4 Cleaning in Lahore: ${w.place}`}
                loading="lazy" decoding="async"
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-3 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
                <span>
                  <span className="block font-display font-semibold text-white leading-tight">{w.place}</span>
                  <span className="block font-mono uppercase text-white/60 mt-0.5" style={{ fontSize: 10, letterSpacing: "0.16em" }}>{w.tag}</span>
                </span>
                <span className="rounded-full bg-volt text-black font-sans text-[11px] font-bold px-3 py-1">{w.tag}</span>
              </span>
            </button>
            </Appear>
          ))}
        </div>

        <div className="mt-16 md:mt-24 rounded-[2rem] border border-volt/40 bg-[#0c0c0c]/90 p-8 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="font-display font-semibold tracking-tight text-3xl md:text-5xl leading-tight">Want results like these?</h2>
            <p className="font-sans text-white/60 mt-3 max-w-md">Tell us about your space and we&apos;ll send a quote, usually the same day.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <SmartLink href="/contact" className="rounded-full bg-volt text-black font-sans font-bold px-7 py-3.5 text-[15px] hover:bg-white transition-colors">Get a quote</SmartLink>
            <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/25 text-white font-sans font-semibold px-7 py-3.5 text-[15px] hover:bg-white/10 transition-colors">WhatsApp us</a>
          </div>
        </div>
      </section>

      {cur && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Project photo"
          onClick={() => setOpen(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cur.src} alt={`${cur.tag} cleaning, ${cur.place}`} className="max-h-[82vh] max-w-full w-auto rounded-2xl object-contain" onClick={(e) => e.stopPropagation()} />
          <div className="absolute left-0 right-0 bottom-5 text-center pointer-events-none">
            <p className="font-display font-semibold text-white">{cur.place}</p>
            <p className="font-mono uppercase text-volt" style={{ fontSize: 10, letterSpacing: "0.18em" }}>{cur.tag} · {(open ?? 0) + 1} / {items.length}</p>
          </div>
          <button onClick={() => setOpen(null)} aria-label="Close" className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full border border-white/25 bg-white/10 text-white text-xl cursor-pointer hover:bg-volt hover:text-black transition-colors">×</button>
          {[-1, 1].map((d) => (
            <button
              key={d}
              onClick={(e) => { e.stopPropagation(); step(d); }}
              aria-label={d < 0 ? "Previous photo" : "Next photo"}
              className={`absolute top-1/2 -translate-y-1/2 ${d < 0 ? "left-3 md:left-6" : "right-3 md:right-6"} w-11 h-11 rounded-full border border-white/25 bg-white/10 text-white cursor-pointer hover:bg-volt hover:text-black transition-colors flex items-center justify-center`}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: d < 0 ? "rotate(180deg)" : "none" }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          ))}
        </div>
      )}
    </>
  );
}

"use client";
import { useEffect, useRef } from "react";
import Reveal from "./Reveal";
import { WORK } from "@/lib/content";
import { fx } from "@/lib/fx";

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * Scroll-pinned horizontal gallery. Vertical scroll drives the track sideways. Photos arrive dusty and
 * blurred and get "cleaned" as they reach the centre of the screen (dust fades, polish glint sweeps across,
 * a small ball splash fire the first time a photo turns spotless).
 */
// newest 8 projects feature in the pinned strip; the Gallery page shows them all
const FEATURED = WORK.slice(0, 8);

export default function Work() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const dustRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glintRefs = useRef<(HTMLDivElement | null)[]>([]);
  const capRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    const cleaned: boolean[] = FEATURED.map(() => false);
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let distance = 0;
    let raf = 0;
    let pending = false;

    const measure = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      distance = Math.max(0, track.scrollWidth - vw);
      outer.style.height = `${distance + vh}px`;
    };

    const update = () => {
      pending = false;
      // page-relative scroll through the pinned section
      const rect = outer.getBoundingClientRect();
      // far off-screen: skip all the per-card measuring and styling
      if (rect.top > vh * 1.5 || rect.bottom < -vh * 0.5) return;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, distance)));
      const x = -p * distance;
      track.style.transform = `translate3d(${x}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;

      const inView = rect.top < vh && rect.bottom > 0;
      // read every card position first, then write styles (interleaving them forces a layout per card)
      const rects = cardRefs.current.map((c) => (c ? c.getBoundingClientRect() : null));
      for (let i = 0; i < FEATURED.length; i++) {
        const cr = rects[i];
        if (!cr) continue;
        // cards well outside the screen need no per-frame styling
        if (cr.right < -vw * 0.3 || cr.left > vw * 1.3) continue;
        const cx = cr.left + cr.width / 2;
        const d = Math.abs(cx - vw / 2) / (vw * 0.34);
        const clean = 1 - smooth(0.12, 1, d); // 1 at centre → 0 at the sides
        const dust = 1 - clean;

        const img = imgRefs.current[i];
        if (img) {
          img.style.transform = `scale(${1.06 - clean * 0.05})`;
        }
        const dl = dustRefs.current[i];
        if (dl) dl.style.opacity = String(dust * 0.9);
        const gl = glintRefs.current[i];
        if (gl) {
          // polish glint sweeps across the photo as it travels across the screen
          const t = (vw - cx) / vw; // 0 (right) → 1 (left)
          gl.style.transform = `translateX(${(t * 2.4 - 0.7) * 100}%) skewX(-18deg)`;
          gl.style.opacity = String(clean * 0.75);
        }
        const cap = capRefs.current[i];
        if (cap) {
          cap.style.opacity = String(smooth(0.5, 1, clean));
          cap.style.transform = `translateY(${(1 - smooth(0.5, 1, clean)) * 14}px)`;
        }

        if (inView) {
          if (clean > 0.9 && !cleaned[i]) {
            cleaned[i] = true;
            fx.splash(cx, cr.bottom - 6, 12, 0.55);
          } else if (clean < 0.35) {
            cleaned[i] = false;
          }
        }
      }
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(update);
    };
    const onResize = () => { measure(); onScroll(); };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(track);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="work" aria-label="Our work">
      <div ref={outerRef} className="relative" style={{ height: "380vh" }}>
        <div className="sticky top-0 h-svh overflow-hidden flex flex-col justify-center">
          <div className="px-6 md:px-12 mb-6 md:mb-8">
            <Reveal>
              <p className="font-mono uppercase text-[11px]" style={{ letterSpacing: "0.25em", color: "#DFFE12" }}>
                [ 05 — Our work ]
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display font-semibold text-[2.2rem] leading-[1.0] sm:text-5xl md:text-[68px] md:leading-[0.95] tracking-tight text-white mt-4">
                Dust in. Shine out.
              </h2>
            </Reveal>
          </div>

          <div
            ref={trackRef}
            className="flex items-center gap-[4vw] pl-[8vw] pr-[20vw] will-change-transform"
            style={{ width: "max-content" }}
          >
            {FEATURED.map((w, i) => (
              <div
                key={w.src}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="relative shrink-0 w-[62vw] sm:w-[34vw] md:w-[22vw] aspect-[3/4] max-h-[58svh] rounded-[1.6rem] overflow-hidden bg-white/10"
                style={{
                  boxShadow: "0 30px 60px -24px rgba(223,254,18,0.18), 0 0 0 1px rgba(255,255,255,0.12)",
                  marginTop: i % 2 ? "3vh" : "-3vh",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={(el) => { imgRefs.current[i] = el; }}
                  src={w.src}
                  alt={`${w.tag} cleaning project — ${w.place}`}
                  className="absolute inset-0 w-full h-full object-cover will-change-transform"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <div ref={(el) => { dustRefs.current[i] = el; }} className="dust-layer absolute inset-0 pointer-events-none" />
                <div
                  ref={(el) => { glintRefs.current[i] = el; }}
                  className="absolute inset-y-0 -left-1/3 w-1/3 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)" }}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none bg-linear-to-t from-black/55 to-transparent" />
                <div ref={(el) => { capRefs.current[i] = el; }} className="absolute left-4 bottom-4 right-4 text-white">
                  <p className="font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.2em", opacity: 0.8 }}>
                    {String(i + 1).padStart(2, "0")} · {w.tag}
                  </p>
                  <p className="font-raleway text-[15px] font-medium mt-0.5">{w.place}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 md:px-12 mt-8 md:mt-10">
            <div className="h-[2px] w-full rounded-full" style={{ background: "rgba(255,255,255,0.12)" }}>
              <div
                ref={barRef}
                className="h-full origin-left rounded-full"
                style={{ background: "#DFFE12", transform: "scaleX(0)", boxShadow: "0 0 12px rgba(223,254,18,0.5)" }}
              />
            </div>
            <p className="font-mono uppercase text-white/50 mt-3" style={{ fontSize: 10, letterSpacing: "0.2em" }}>
              Keep scrolling — every photo comes clean in the centre
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

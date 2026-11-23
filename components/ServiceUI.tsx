"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon, CheckIcon } from "./Icons";
import { Photo, PillLink } from "./ui";
import { EASE } from "@/lib/shared";
import { BRAND, SERVICES } from "@/lib/content";

/**
 * Expanding image accordion: hover (desktop) or tap (mobile) a strip and it grows open,
 * the photo un-dims and zooms, and the details slide in.
 */
export function ServiceStrips() {
  const [active, setActive] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const lastStage = useRef(0);
  const pick = (i: number) => setActive(i);
  const N = SERVICES.length;

  // scroll position drives which strip is open (works on phones too, the strips pin while you scroll)
  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const stick = parseFloat(getComputedStyle(inner).top) || 0;
      const total = Math.max(1, outer.offsetHeight - inner.offsetHeight);
      const p = Math.min(0.999, Math.max(0, (stick - outer.getBoundingClientRect().top) / total));
      const stage = Math.min(N - 1, Math.floor(p * N));
      if (stage !== lastStage.current) {
        lastStage.current = stage;
        setActive(stage); // a manual tap/hover holds until scrolling reaches the next stage
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [N]);

  return (
    <div
      ref={outerRef}
      className="[--sh:min(520px,calc(100svh-7.5rem))] md:[--sh:min(600px,calc(100svh-7.5rem))] lg:[--sh:min(640px,calc(100svh-8.5rem))]"
      style={{ height: `calc(var(--sh) + ${N * 38}svh)` }}
    >
    <div ref={innerRef} className="sticky top-24 lg:top-28 flex flex-col lg:flex-row gap-2.5 md:gap-3" style={{ height: "var(--sh)" }}>
      {SERVICES.map((s, i) => {
        const on = active === i;
        return (
          <div
            key={s.id}
            role="button"
            tabIndex={0}
            aria-expanded={on}
            aria-label={s.title}
            onMouseEnter={() => pick(i)}
            onFocus={() => pick(i)}
            onClick={() => pick(i)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && pick(i)}
            className="relative min-h-0 min-w-0 overflow-hidden rounded-[1.6rem] border cursor-pointer outline-none"
            style={{
              flex: on ? 5.2 : 1,
              borderColor: on ? "rgba(223,254,18,0.55)" : "rgba(255,255,255,0.1)",
              boxShadow: on ? "0 30px 80px -30px rgba(223,254,18,0.35)" : "none",
              transition: `flex 0.8s ${EASE}, border-color 0.5s ease, box-shadow 0.6s ease`,
            }}
          >
            <Photo
              src={s.img}
              alt={`${s.title} by C4 Cleaning`}
              style={{
                transform: on ? "scale(1)" : "scale(1.18)",
                filter: on ? "brightness(0.92) saturate(1.05)" : "brightness(0.38) saturate(0.6)",
                transition: `transform 1.1s ${EASE}, filter 0.7s ease`,
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-black/30" />
            {/* polish sweep when a strip opens */}
            {on && (
              <div
                key={`sweep-${i}`}
                className="absolute inset-y-0 left-0 w-1/4 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(223,254,18,0.28), transparent)",
                  animation: "shine-sweep 1.3s ease-out 0.15s both",
                }}
              />
            )}

            <span
              className="absolute top-4 left-4 px-2.5 py-1 rounded-full font-mono text-[10px] font-bold transition-colors duration-500"
              style={{ background: on ? "#DFFE12" : "rgba(255,255,255,0.14)", color: on ? "#000" : "#fff" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* collapsed label */}
            <div
              className="absolute pointer-events-none left-14 right-3 bottom-[15px] lg:right-auto lg:left-1/2 lg:bottom-6 lg:-translate-x-1/2"
              style={{ opacity: on ? 0 : 1, transition: "opacity 0.3s ease" }}
            >
              <p className="font-display font-semibold text-white text-[15px] leading-tight lg:[writing-mode:vertical-rl] lg:rotate-180 lg:text-[19px] whitespace-nowrap">
                {s.title}
              </p>
            </div>

            {/* expanded content */}
            <div
              className="absolute inset-x-0 bottom-0 p-5 md:p-7"
              style={{
                opacity: on ? 1 : 0,
                transform: on ? "none" : "translateY(18px)",
                transition: on ? `opacity 0.6s ${EASE} 0.25s, transform 0.7s ${EASE} 0.25s` : "opacity 0.2s ease, transform 0.2s ease",
                pointerEvents: on ? "auto" : "none",
              }}
            >
              <h3 className="font-display font-semibold text-[1.65rem] md:text-[2.2rem] leading-[1.02] tracking-tight text-white">{s.title}</h3>
              <p className="font-sans text-[13px] md:text-[14.5px] text-white/75 mt-2.5 max-w-md leading-relaxed">{s.short}</p>
              <a
                href="#included"
                className="group mt-4 inline-flex items-center gap-2.5 font-sans text-[13px] font-bold text-black bg-volt rounded-full pl-4 pr-1.5 py-1.5"
              >
                See what&apos;s included
                <span className="w-7 h-7 rounded-full bg-black text-volt flex items-center justify-center">
                  <ArrowUpRightIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </a>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}

/**
 * Interactive service explorer: pick a service on the left, the photo cross-fades and the
 * checklist re-animates on the right.
 */
function ExplorerView({ active, setActive, pinned }: { active: number; setActive: (i: number) => void; pinned: boolean }) {
  const s = SERVICES[active];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8">
      {/* selector */}
      <div role="tablist" aria-label="Services" className="lg:col-span-4 flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible no-scrollbar -mx-5 px-5 md:mx-0 md:px-0 pb-1">
        {SERVICES.map((x, i) => {
          const on = active === i;
          return (
            <button
              key={x.id}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className="group relative shrink-0 lg:shrink text-left rounded-2xl border overflow-hidden px-4 py-3.5 md:px-5 md:py-4 cursor-pointer min-w-[210px] lg:min-w-0"
              style={{
                background: on ? "#DFFE12" : "rgba(12,12,12,0.85)",
                borderColor: on ? "#DFFE12" : "rgba(255,255,255,0.1)",
                color: on ? "#000" : "#fff",
                transition: "background 0.4s ease, border-color 0.4s ease, color 0.4s ease, transform 0.4s ease",
                transform: on ? "translateX(0)" : undefined,
              }}
            >
              <span className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-bold" style={{ opacity: on ? 0.7 : 0.45, color: on ? "#000" : "#DFFE12" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display font-semibold text-[17px] md:text-[21px] tracking-tight leading-tight">{x.title}</span>
                <ArrowUpRightIcon
                  className="ml-auto w-4 h-4 shrink-0 transition-all duration-300"
                  style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translate(-6px,6px)" } as React.CSSProperties}
                />
              </span>
              {on && (
                <span
                  key={`bar-${active}`}
                  className="absolute left-0 bottom-0 h-[3px] w-full bg-black/70 origin-left"
                  style={{ animation: "bar-fill 0.7s ease-out both" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* panel */}
      <div className="lg:col-span-8 relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0c0c0c]/90 backdrop-blur-md">
        <div className={`relative overflow-hidden ${pinned ? "h-[22svh] lg:h-[26svh]" : "h-52 sm:h-72"}`}>
          {SERVICES.map((x, i) => (
            <Photo
              key={x.id}
              src={x.img}
              alt={`${x.title} by C4 Cleaning`}
              style={{
                opacity: active === i ? 1 : 0,
                transform: active === i ? "scale(1)" : "scale(1.12)",
                transition: `opacity 0.8s ease, transform 1.4s ${EASE}`,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-linear-to-t from-[#0c0c0c] via-black/15 to-transparent" />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-volt text-black font-mono text-[10px] font-bold">
            {String(active + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
          </span>
        </div>

        <div key={s.id} className={pinned ? "px-5 lg:px-8 pb-5 lg:pb-6 pt-1" : "p-6 md:p-9 pt-2"}>
          <h3 className="font-display font-semibold text-[1.6rem] sm:text-[1.9rem] md:text-[2.4rem] leading-[1.02] tracking-tight text-white" style={{ animation: `fade-up 0.6s ${EASE} both` }}>
            {s.title}
          </h3>
          <p className={`font-sans text-[14.5px] md:text-[15.5px] text-white/60 mt-3 max-w-xl leading-relaxed ${pinned ? "max-lg:line-clamp-3" : ""}`} style={{ animation: `fade-up 0.6s ${EASE} 0.06s both` }}>
            {s.intro}
          </p>
          <ul className={`${pinned ? "mt-4" : "mt-6"} grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5 ${pinned ? "max-lg:[&>li:nth-child(n+5)]:hidden" : ""}`}>
            {s.bullets.map((b, i) => (
              <li
                key={b}
                className="flex items-start gap-3 font-sans text-[14px] text-white/80 leading-snug"
                style={{ animation: `fade-up 0.55s ${EASE} ${0.12 + i * 0.05}s both` }}
              >
                <span className="mt-px w-5 h-5 shrink-0 rounded-full bg-volt/15 flex items-center justify-center">
                  <CheckIcon className="w-3 h-3 text-volt" />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div className={pinned ? "mt-5" : "mt-8"} style={{ animation: `fade-up 0.6s ${EASE} 0.45s both` }}>
            <PillLink href={BRAND.whatsapp}>Get a Quote</PillLink>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Scroll-driven wrapper. On large screens the explorer pins to the viewport and the scroll position
 * opens the four services one after another (nothing to click). On phones / short screens it can't pin,
 * so it auto-advances once it is in view; tapping a tab takes over.
 */
export function ServiceExplorer() {
  const N = SERVICES.length;
  const outerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const check = () => setPinned(window.innerHeight >= 480);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // pinned: scroll position -> active service
  useEffect(() => {
    if (!pinned) return;
    const outer = outerRef.current;
    if (!outer) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = outer.getBoundingClientRect();
      const total = Math.max(1, outer.offsetHeight - window.innerHeight);
      const p = Math.min(0.999, Math.max(0, -rect.top / total));
      setActive(Math.min(N - 1, Math.floor(p * N)));
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, -rect.top / total))})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pinned, N]);

  // not pinned: auto-advance while visible
  useEffect(() => {
    if (pinned) return;
    const el = outerRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (timer) { clearInterval(timer); timer = undefined; }
        if (!e.isIntersecting) return;
        timer = setInterval(() => {
          if (touched.current) return;
          setActive((a) => (a + 1) % N);
        }, 4200);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => { io.disconnect(); if (timer) clearInterval(timer); };
  }, [pinned, N]);

  const choose = (i: number) => {
    touched.current = true;
    if (pinned && outerRef.current) {
      // jump to that stage of the pinned scroll
      const outer = outerRef.current;
      const total = outer.offsetHeight - window.innerHeight;
      const top = outer.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + ((i + 0.5) / N) * total, behavior: "smooth" });
    } else {
      setActive(i);
    }
  };

  if (!pinned) {
    return (
      <div ref={outerRef} className="px-5 md:px-12 pb-24">
        <ExplorerView active={active} setActive={choose} pinned={false} />
      </div>
    );
  }

  return (
    <div ref={outerRef} style={{ height: `calc(100svh + ${N * 55}svh)` }}>
      <div className="sticky top-0 h-svh overflow-hidden flex flex-col justify-center px-5 lg:px-12 pt-24 pb-4 lg:pb-6">
        <div className="flex items-center gap-4 mb-5">
          <p className="font-mono uppercase text-[11px] text-volt" style={{ letterSpacing: "0.25em" }}>
            [ {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")} — scroll to explore ]
          </p>
          <div className="flex-1 h-[2px] rounded-full bg-white/10 overflow-hidden">
            <div ref={barRef} className="h-full bg-volt origin-left" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
        <ExplorerView active={active} setActive={choose} pinned />
      </div>
    </div>
  );
}

"use client";
import type { CSSProperties, ReactNode } from "react";
import Reveal from "./Reveal";
import { ArrowDownIcon, CheckIcon } from "./Icons";
import { EASE } from "@/lib/shared";
import { BRAND, PLANS, PROCESS, PROMISES, STATS, VALUES, WORK } from "@/lib/content";
import { BODY, Card, Halo, H2, LABEL, LABEL_STYLE, Photo, PillLink } from "./ui";
import { ServiceExplorer, ServiceStrips } from "./ServiceUI";
import ReviewsCarousel from "./ReviewsCarousel";
import ContactForm from "./ContactForm";

/* ---------- 01 HERO ---------- */
export function Hero({ revealed }: { revealed: boolean }) {
  const rise = (y: number, delay: number, dur = 0.9): CSSProperties => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : `translateY(${y}px)`,
    transition: `opacity ${dur}s ${EASE} ${delay}s, transform ${dur}s ${EASE} ${delay}s`,
  });

  return (
    <section
      id="top"
      className="relative z-10 min-h-svh flex items-end px-5 md:px-12 pb-10 md:pb-14 pointer-events-none"
      style={{ opacity: revealed ? 1 : 0, transition: "opacity 0.6s ease" }}
    >
      <div className="relative w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="relative flex flex-col gap-3.5 items-start pointer-events-auto">
          <Halo />
          <p
            className="font-sans font-semibold uppercase text-xs md:text-[13px] mb-3 md:mb-[24px] text-volt text-legible"
            style={{ ...rise(14, 0.15), letterSpacing: "0.05em" }}
          >
            [ Cleaning company in Lahore ]
          </p>
          <h1
            className="font-display font-semibold text-[2.7rem] leading-[0.96] sm:text-6xl md:text-[88px] md:leading-[0.95] tracking-[-0.035em] text-white text-legible"
            style={rise(22, 0.28, 1)}
          >
            Shining standards,<br />
            <span className="text-volt">spotless results.</span>
            <span className="sr-only"> C4 Cleaning: professional house, office, window and post-construction cleaning services in Lahore</span>
          </h1>
        </div>

        <div className="relative md:w-[280px] pointer-events-auto" style={rise(18, 0.45)}>
          <Halo />
          <p className="font-sans text-[15px] font-medium leading-[1.5] text-white/90 text-legible">
            Reliable, professional, high-quality cleaning for homes and businesses, from deep cleaning to routine maintenance.
          </p>
          <p className="font-mono uppercase text-white/40 mt-4" style={{ fontSize: 10, letterSpacing: "0.18em" }}>
            © 2026 — {BRAND.availability}
          </p>
          <div className="hidden md:flex items-center gap-2 mt-4 text-white/50 animate-pulse">
            <ArrowDownIcon className="w-3.5 h-3.5" />
            <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.2em" }}>Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 02 SERVICES (drop) ---------- */
export function Drop() {
  return (
    <section id="services" className="relative z-10 min-h-svh flex items-center pt-28 md:pt-40 pb-28 md:pb-40 px-5 md:px-12 pointer-events-none">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-5 pointer-events-auto">
          <Reveal><p className={LABEL} style={LABEL_STYLE}>[ 02 — Services ]</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className={`${H2} mt-6`}>Every space,<br /><span className="text-volt">made spotless.</span></h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={`${BODY} mt-7 max-w-lg`}>
              Homes, offices, glass and freshly built spaces. Whatever needs cleaning, our trained team brings the right tools, safe products and a thorough checklist, then leaves it settled and spotless.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-8">
            <PillLink href={BRAND.whatsapp}>Get a Quote</PillLink>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:col-span-7 pointer-events-auto">
          <ServiceStrips />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 03 PROCESS (shape) ---------- */
export function Shape() {
  return (
    <section id="process" className="relative z-10 min-h-svh flex flex-col justify-between py-32 md:py-44 px-5 md:px-12 pointer-events-none">
      <div className="pointer-events-auto">
        <Reveal><p className={LABEL} style={LABEL_STYLE}>[ 03 — Process ]</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className={`${H2} mt-6 max-w-2xl`}>Four steps to <span className="text-volt">spotless.</span></h2>
        </Reveal>
      </div>

      <div className="self-end w-full max-w-md pointer-events-auto mt-16">
        <Reveal delay={0.15}>
          <p className={`${BODY} text-left md:text-right`}>
            From first message to final walkthrough, every clean follows the same simple, transparent path.
          </p>
        </Reveal>
        <div className="mt-7 flex flex-col gap-3">
          {PROCESS.map((p, i) => (
            <Reveal key={p.n} delay={0.22 + i * 0.07}>
              <div className="group/card flex items-center gap-4 pl-3 pr-5 py-3 rounded-full border border-white/10 bg-[#0c0c0c]/85 hover:border-volt/60 transition-colors">
                <span className="w-11 h-11 shrink-0 rounded-full bg-volt text-black flex items-center justify-center font-mono text-[12px] font-bold">{p.n}</span>
                <div>
                  <p className="font-display text-[16px] font-semibold text-white leading-tight">{p.title}</p>
                  <p className="font-sans text-[12px] text-white/50">{p.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 04 PROMISE (release) ---------- */
export function Release() {
  return (
    <section id="promise" className="relative z-10 min-h-svh flex flex-col items-center justify-center text-center py-32 md:py-44 px-5 md:px-12 pointer-events-none">
      <div className="max-w-3xl pointer-events-auto">
        <Reveal><p className={LABEL} style={LABEL_STYLE}>[ 04 — Promise ]</p></Reveal>
        <Reveal delay={0.12}>
          <h2 className="font-display font-semibold tracking-[-0.03em] text-legible text-[2.6rem] leading-[1.0] sm:text-7xl md:text-[88px] md:leading-[0.92] text-white mt-7">
            Clean homes.<br /><span className="text-volt">Calm minds.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.24}>
          <p className={`${BODY} mt-8 mx-auto max-w-md`}>
            Expertise, reliability and top-tier standards, with transparent pricing, trusted professionals and guaranteed satisfaction. Customers first, always.
          </p>
        </Reveal>
        <Reveal delay={0.34} className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-[#0c0c0c]/85 px-4 py-5">
              <p className="font-display text-3xl md:text-4xl font-semibold text-volt">{s.value}</p>
              <p className="font-mono uppercase text-white/50 mt-1.5" style={{ fontSize: 9, letterSpacing: "0.15em" }}>{s.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 06 WHAT'S INCLUDED ---------- */
export function Included() {
  return (
    <section id="included" className="relative z-10">
      <div className="px-5 md:px-12 pt-24 md:pt-40 pb-12 md:pb-16">
      <Reveal><p className={LABEL} style={LABEL_STYLE}>[ 06 — What&apos;s included ]</p></Reveal>
      <Reveal delay={0.1}>
        <h2 className={`${H2} mt-6 max-w-3xl`}>Our cleaning team <span className="text-volt">will…</span></h2>
      </Reveal>
      <Reveal delay={0.18}>
        <ul className="mt-8 flex flex-wrap gap-2.5 max-w-4xl">
          {PROMISES.map((p) => (
            <li key={p} className="flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 font-sans text-[13px] text-white/80">
              <CheckIcon className="w-3.5 h-3.5 text-volt" /> {p}
            </li>
          ))}
        </ul>
      </Reveal>

      </div>
      <ServiceExplorer />
    </section>
  );
}

/* ---------- 07 ABOUT ---------- */
export function About() {
  return (
    <section id="about" className="relative z-10 px-5 md:px-12 py-24 md:py-40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal><p className={LABEL} style={LABEL_STYLE}>[ 07 — About us ]</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className={`${H2} mt-6`}>Setting new standards in <span className="text-volt">cleaning.</span></h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={`${BODY} mt-7 max-w-md`}>
              Affordable, high-quality cleaning for residential, commercial and specialized spaces, built on trust, professionalism and attention to detail. We use modern equipment, safe products and proven techniques.
            </p>
          </Reveal>
          <Reveal delay={0.28} className="mt-9">
            <Card className="aspect-[4/3]">
              <Photo src={WORK[0].src} alt="A freshly cleaned marble-floor interior by C4 Cleaning" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <p className="absolute left-5 bottom-4 font-mono uppercase text-volt" style={{ fontSize: 10, letterSpacing: "0.2em" }}>Spotless, top to bottom</p>
            </Card>
          </Reveal>
        </div>
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={(i % 2) * 0.08}>
              <Card className="h-full p-6">
                <span
                  className="font-display text-6xl font-bold leading-none select-none"
                  style={{ color: "transparent", WebkitTextStroke: "1px rgba(223,254,18,0.55)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-display text-[20px] font-semibold text-white mt-4 leading-snug">{v.title}</p>
                <p className="font-sans text-[13.5px] text-white/55 mt-2 leading-relaxed">{v.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 08 REVIEWS ---------- */
export function Reviews() {
  return (
    <section id="reviews" className="relative z-10 px-5 md:px-12 py-24 md:py-40">
      <Reveal><p className={LABEL} style={LABEL_STYLE}>[ 08 — Our happy customers ]</p></Reveal>
      <Reveal delay={0.1}>
        <h2 className={`${H2} mt-6 max-w-3xl`}>Five stars, <span className="text-volt">every time.</span></h2>
      </Reveal>
      <Reveal delay={0.1} className="mt-12 md:mt-14">
        <ReviewsCarousel />
      </Reveal>
    </section>
  );
}

/* ---------- 09 PLANS ---------- */
export function Plans() {
  return (
    <section id="plans" className="relative z-10 px-5 md:px-12 py-24 md:py-40">
      <Reveal><p className={LABEL} style={LABEL_STYLE}>[ 09 — Price &amp; plans ]</p></Reveal>
      <Reveal delay={0.1}>
        <h2 className={`${H2} mt-6 max-w-3xl`}>Clear, <span className="text-volt">fair pricing.</span></h2>
      </Reveal>
      <Reveal delay={0.16}>
        <p className={`${BODY} mt-6 max-w-lg`}>No hidden charges. Fixed prices by property size. Pick yours and message us to book.</p>
      </Reveal>
      <div className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        {PLANS.map((p, i) => {
          const featured = i === 1;
          return (
            <Reveal key={p.name} delay={i * 0.1}>
              <Card featured={featured} className="h-full p-7 md:p-8">
                {featured && (
                  <span className="absolute top-5 right-5 px-3 py-1 rounded-full bg-black text-volt font-mono text-[9px] font-bold uppercase" style={{ letterSpacing: "0.15em" }}>
                    Popular
                  </span>
                )}
                <p className={`font-mono uppercase text-[11px] ${featured ? "text-black/60" : "text-white/45"}`} style={{ letterSpacing: "0.2em" }}>{p.name}</p>
                <p className="font-display font-semibold tracking-tight mt-3 flex items-baseline gap-2">
                  <span className={`text-lg ${featured ? "text-black/60" : "text-white/50"}`}>PKR</span>
                  <span className="text-5xl md:text-[3.4rem] leading-none">{p.price}</span>
                </p>
                <p className={`font-sans text-[13px] mt-2 ${featured ? "text-black/65" : "text-white/45"}`}>{p.note}</p>
                <p className="mt-5">
                  <em className={`inline-block rounded-md px-2.5 py-1 font-display text-[15px] font-semibold italic ${featured ? "bg-black text-volt" : "bg-volt/15 text-volt"}`}>
                    Full house cleaned
                  </em>
                </p>
                <ul className="mt-5 space-y-3">
                  {p.items.map((it) => (
                    <li key={it} className={`flex items-center gap-2.5 font-sans text-[14px] ${featured ? "text-black/80" : "text-white/75"}`}>
                      <CheckIcon className={`w-4 h-4 shrink-0 ${featured ? "text-black" : "text-volt"}`} /> {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-8"><PillLink href={BRAND.whatsapp} dark={featured}>Book Now</PillLink></div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- 10 CONTACT FORM ---------- */
export function Contact() {
  return (
    <section id="quote" className="relative z-10 px-5 md:px-12 py-24 md:py-40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal><p className={LABEL} style={LABEL_STYLE}>[ 10 — Get in touch ]</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className={`${H2} mt-6`}>Tell us what needs <span className="text-volt">cleaning.</span></h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={`${BODY} mt-7 max-w-md`}>
              Send us a few details and our team will get back to you with a quote, usually the same day. Prefer to talk? Call or message us any time, we work for you 24/7.
            </p>
          </Reveal>
          <Reveal delay={0.28} className="mt-8 flex flex-col gap-3 font-sans text-[15px] text-white/80">
            <a href={BRAND.phoneHref} className="hover:text-volt transition-colors">{BRAND.phone}</a>
            <a href={`mailto:${BRAND.officialEmail}`} className="hover:text-volt transition-colors break-all">{BRAND.officialEmail}</a>
            <p className="text-white/50">{BRAND.address}</p>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

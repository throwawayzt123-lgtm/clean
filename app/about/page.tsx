import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumb, pageMeta } from "@/lib/seo";
import SmartLink from "@/components/SmartLink";
import Appear from "@/components/Appear";
import CountUp from "@/components/CountUp";
import { Card } from "@/components/ui";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import { BRAND, PROCESS, PROMISES, SERVICES, STATS, VALUES, WORK } from "@/lib/content";
import { CheckIcon } from "@/components/Icons";

export const metadata: Metadata = pageMeta({
  title: "About Us: Lahore's Trusted Cleaning Company",
  description:
    "Meet C4 Cleaning (Crystal Clear Cleaning Company) in DHA Phase 6, Lahore. Trained teams, safe products, fair pricing and 350+ satisfied clients across homes and offices.",
  path: "/about",
  image: "/opengraph-image",
  keywords: ["about C4 Cleaning", "Crystal Clear Cleaning Company Lahore", "trusted cleaning company Lahore"],
});

const EYEBROW = "font-mono uppercase text-[11px] text-volt";
const H2 = "font-display font-semibold tracking-tight text-3xl md:text-5xl leading-[1.05]";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-clip">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[80vh]" style={{ background: "radial-gradient(ellipse at 80% 0%, #1b2105 0%, #050505 55%, #000 100%)" }} aria-hidden="true" />
      <JsonLd data={breadcrumb([{ name: "Home", path: "/" }, { name: "About Us", path: "/about" }])} />
      <Header revealed />

      {/* hero */}
      <section className="relative z-10 px-5 md:px-12 pt-32 md:pt-44 pb-12 md:pb-20">
        <p className={EYEBROW} style={{ letterSpacing: "0.25em" }}>[ About us ]</p>
        <h1 className="font-display font-semibold tracking-[-0.03em] leading-[0.95] text-5xl sm:text-6xl md:text-8xl mt-6 max-w-5xl">
          Shining standards, <span className="text-volt">spotless results.</span>
        </h1>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end">
          <p className="lg:col-span-6 font-sans text-white/65 text-base md:text-xl leading-relaxed">
            C4 Cleaning (Crystal Clear Cleaning Company) is a professional cleaning company based in {BRAND.address}. We provide house deep cleaning, commercial and office cleaning, window and facade cleaning and post-construction cleaning. We look after homes and offices with trained teams, modern tools and safe products. {BRAND.availability}.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={WORK[0].src} alt="Freshly cleaned luxury home in Lahore by C4 Cleaning" className="lg:col-span-6 w-full h-64 md:h-96 object-cover rounded-[2rem] border border-white/10" />
        </div>
      </section>

      {/* stats */}
      <section className="relative z-10 px-5 md:px-12 pb-16 md:pb-28">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <Appear key={s.label} delay={i * 0.1} from="zoom" className="h-full">
            <Card className="h-full p-6 md:p-8">
              <p className="font-display font-semibold text-5xl md:text-6xl text-volt"><CountUp value={s.value} /></p>
              <p className="font-mono uppercase text-white/50 mt-3" style={{ fontSize: 10, letterSpacing: "0.16em" }}>{s.label}</p>
            </Card>
            </Appear>
          ))}
        </div>
      </section>

      {/* mission */}
      <section className="relative z-10 px-5 md:px-12 pb-16 md:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <p className={EYEBROW} style={{ letterSpacing: "0.25em" }}>[ Our mission ]</p>
          <h2 className={`${H2} mt-5`}>A cleaner space, without the stress.</h2>
        </div>
        <div className="lg:col-span-7 font-sans text-white/65 text-base md:text-lg leading-relaxed space-y-5">
          <p>We make professional cleaning simple and dependable: you tell us what needs cleaning, we show up on time, and we finish the job properly.</p>
          <p>Every project follows a checklist, and every corner is inspected with you before we leave. We use modern equipment and eco-friendly products that are safe for families, staff and the environment.</p>
          <ul className="grid sm:grid-cols-2 gap-3 pt-2">
            {PROMISES.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] text-white/80">
                <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-volt text-black flex items-center justify-center"><CheckIcon className="w-3 h-3" /></span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* values */}
      <section className="relative z-10 px-5 md:px-12 pb-16 md:pb-28">
        <p className={EYEBROW} style={{ letterSpacing: "0.25em" }}>[ What we stand for ]</p>
        <h2 className={`${H2} mt-5 max-w-2xl`}>Six values behind every clean.</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VALUES.map((v, i) => (
            <Appear key={v.title} delay={(i % 3) * 0.12} className="h-full">
            <Card className="h-full p-7">
              <span className="font-mono text-volt text-sm">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display font-semibold text-xl mt-4 leading-snug">{v.title}</h3>
              <p className="font-sans text-white/55 mt-3 text-[15px] leading-relaxed">{v.text}</p>
            </Card>
            </Appear>
          ))}
        </div>
      </section>

      {/* process */}
      <section className="relative z-10 px-5 md:px-12 pb-16 md:pb-28">
        <p className={EYEBROW} style={{ letterSpacing: "0.25em" }}>[ How we work ]</p>
        <h2 className={`${H2} mt-5`}>From booking to spotless.</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS.map((p, i) => (
            <Appear key={p.n} delay={i * 0.12} className="h-full">
            <Card className="relative h-full p-7">
              <span className="absolute -right-2 -top-4 font-display font-bold text-8xl text-volt/10 transition-all duration-500 group-hover/card:text-volt/25 group-hover/card:scale-110">{p.n}</span>
              <p className="relative font-display font-semibold text-xl">{p.title}</p>
              <p className="relative font-sans text-white/55 mt-2 text-[15px]">{p.text}</p>
            </Card>
            </Appear>
          ))}
        </div>
      </section>

      {/* services */}
      <section className="relative z-10 px-5 md:px-12 pb-16 md:pb-28">
        <p className={EYEBROW} style={{ letterSpacing: "0.25em" }}>[ What we do ]</p>
        <h2 className={`${H2} mt-5`}>Cleaning for every space.</h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => (
            <Appear key={s.id} delay={i * 0.1} className="h-full">
            <SmartLink href="/services" className="group relative block h-72 rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 hover:-translate-y-1.5 hover:border-volt/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} alt={s.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
              <span className="absolute left-5 right-5 bottom-5">
                <span className="block font-display font-semibold text-lg leading-tight">{s.title}</span>
                <span className="block font-sans text-[13px] text-white/60 mt-1 line-clamp-2">{s.short}</span>
              </span>
            </SmartLink>
            </Appear>
          ))}
        </div>
      </section>

      {/* reviews */}
      <section className="relative z-10 px-5 md:px-12 pb-16 md:pb-28">
        <p className={EYEBROW} style={{ letterSpacing: "0.25em" }}>[ Client love ]</p>
        <h2 className={`${H2} mt-5 mb-10`}>What our clients say.</h2>
        <ReviewsCarousel />
      </section>

      {/* CTA */}
      <section className="relative z-10 px-5 md:px-12 pb-20 md:pb-32">
        <div className="rounded-[2rem] border border-volt/40 bg-[#0c0c0c]/90 p-8 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <h2 className="font-display font-semibold tracking-tight text-3xl md:text-5xl leading-tight max-w-xl">Ready for a spotless space?</h2>
          <div className="flex flex-wrap gap-3">
            <SmartLink href="/contact" className="rounded-full bg-volt text-black font-sans font-bold px-7 py-3.5 text-[15px] hover:bg-white transition-colors">Get a quote</SmartLink>
            <SmartLink href="/gallery" className="rounded-full border border-white/25 font-sans font-semibold px-7 py-3.5 text-[15px] hover:bg-white/10 transition-colors">See our work</SmartLink>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

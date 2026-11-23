import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SERVICE_SEO, abs, breadcrumb, pageMeta, serviceSchema } from "@/lib/seo";
import Appear from "@/components/Appear";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmartLink from "@/components/SmartLink";
import { BRAND, PLANS, PROCESS, SERVICES } from "@/lib/content";
import { CheckIcon } from "@/components/Icons";

export const metadata: Metadata = pageMeta({
  title: "Cleaning Services in Lahore: House, Office, Window & Post-Construction",
  description:
    "C4 Cleaning services in Lahore: house deep cleaning, commercial and office cleaning, window and facade cleaning and post-construction cleaning. Fixed prices from PKR 70,000. Get a quote.",
  path: "/services",
  image: "/opengraph-image",
  keywords: ["cleaning services Lahore", "cleaning company Lahore", "deep cleaning Lahore price", "DHA cleaning services"],
});

const EYEBROW = "font-mono uppercase text-[11px] text-volt";
const H2 = "font-display font-semibold tracking-tight text-3xl md:text-5xl leading-[1.05]";

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-clip">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[80vh]" style={{ background: "radial-gradient(ellipse at 20% 0%, #1b2105 0%, #050505 55%, #000 100%)" }} aria-hidden="true" />
      <JsonLd
        data={[
          breadcrumb([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]),
          ...SERVICES.map((s) => serviceSchema(s.id)),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: SERVICES.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.title, url: abs(`/services/${s.id}`) })),
          },
        ]}
      />
      <Header revealed />

      <section className="relative z-10 px-5 md:px-12 pt-32 md:pt-44 pb-10 md:pb-16">
        <p className={EYEBROW} style={{ letterSpacing: "0.25em" }}>[ Our services ]</p>
        <h1 className="font-display font-semibold tracking-[-0.03em] leading-[0.95] text-5xl sm:text-6xl md:text-8xl mt-6 max-w-5xl">
          Cleaning services in <span className="text-volt">Lahore.</span>
        </h1>
        <p className="font-sans text-white/60 text-base md:text-lg mt-6 max-w-xl leading-relaxed">
          House deep cleaning, commercial and office cleaning, window and facade cleaning and post-construction cleaning across Lahore. Trained teams, safe products and a thorough checklist on every job.
        </p>
        <div className="mt-8 flex flex-wrap gap-2.5">
          {SERVICES.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="rounded-full border border-white/20 px-5 py-2.5 font-sans text-sm font-semibold text-white/85 hover:border-volt hover:text-volt transition-colors">
              {s.title}
            </a>
          ))}
        </div>
      </section>

      {SERVICES.map((s, i) => (
        <section key={s.id} id={s.id} className="relative z-10 px-5 md:px-12 py-10 md:py-16 scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <Appear from={i % 2 ? "right" : "left"} className={`lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}>
              <div className="group relative overflow-hidden rounded-[2rem] border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={`${s.title} by C4 Cleaning`} loading={i === 0 ? "eager" : "lazy"} className="w-full h-[320px] md:h-[520px] object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
                <span className="absolute top-4 left-4 rounded-full bg-volt text-black font-mono text-[10px] font-bold px-3 py-1">
                  {String(i + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                </span>
              </div>
            </Appear>
            <Appear from={i % 2 ? "left" : "right"} delay={0.1} className="lg:col-span-6">
              <h2 className={H2}>{SERVICE_SEO[s.id].h1}</h2>
              <p className="font-sans text-white/65 text-base md:text-lg mt-4 leading-relaxed">{s.intro}</p>
              <ul className="mt-6 space-y-3">
                {s.bullets.map((b, bi) => (
                  <li key={b} className="flex items-start gap-3 font-sans text-[15px] text-white/80 leading-snug">
                    <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-volt/15 flex items-center justify-center"><CheckIcon className="w-3 h-3 text-volt" /></span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <SmartLink href="/contact" className="rounded-full bg-volt text-black font-sans font-bold px-7 py-3.5 text-[15px] hover:bg-white transition-colors">Get a quote</SmartLink>
                <SmartLink href={`/services/${s.id}`} className="rounded-full border border-volt/50 text-volt font-sans font-semibold px-7 py-3.5 text-[15px] hover:bg-volt/10 transition-colors">Full details</SmartLink>
                <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/25 font-sans font-semibold px-7 py-3.5 text-[15px] hover:bg-white/10 transition-colors">WhatsApp us</a>
              </div>
            </Appear>
          </div>
        </section>
      ))}

      {/* pricing */}
      <section id="plans" className="relative z-10 px-5 md:px-12 py-16 md:py-24 scroll-mt-28">
        <p className={EYEBROW} style={{ letterSpacing: "0.25em" }}>[ Home deep clean pricing ]</p>
        <h2 className={`${H2} mt-5`}>Fixed prices by property size.</h2>
        <p className="font-sans text-white/60 mt-4 max-w-lg">No hidden charges. Pick your size and message us to book.</p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {PLANS.map((p, i) => {
            const featured = i === 1;
            return (
              <Appear key={p.name} delay={i * 0.12} className="h-full">
              <div
                className={`relative h-full rounded-[2rem] p-7 md:p-8 border transition-all duration-500 hover:-translate-y-2 ${featured ? "bg-volt text-black border-volt hover:shadow-[0_30px_80px_-30px_rgba(223,254,18,0.6)]" : "bg-[#0c0c0c]/90 border-white/10 hover:border-volt/60"}`}
              >
                {featured && <span className="absolute top-5 right-5 rounded-full bg-black text-volt font-mono text-[9px] font-bold uppercase px-3 py-1" style={{ letterSpacing: "0.15em" }}>Popular</span>}
                <p className={`font-mono uppercase text-[11px] ${featured ? "text-black/60" : "text-white/45"}`} style={{ letterSpacing: "0.2em" }}>{p.name}</p>
                <p className="font-display font-semibold tracking-tight mt-3 flex items-baseline gap-2">
                  <span className={`text-lg ${featured ? "text-black/60" : "text-white/50"}`}>PKR</span>
                  <span className="text-5xl leading-none">{p.price}</span>
                </p>
                <p className={`font-sans text-[13px] mt-2 ${featured ? "text-black/65" : "text-white/45"}`}>{p.note}</p>
                <p className="mt-5">
                  <em className={`inline-block rounded-md px-2.5 py-1 font-display text-[15px] font-semibold italic ${featured ? "bg-black text-volt" : "bg-volt/15 text-volt"}`}>Full house cleaned</em>
                </p>
                <ul className="mt-5 space-y-3">
                  {p.items.map((it) => (
                    <li key={it} className={`flex items-center gap-2.5 font-sans text-[14px] ${featured ? "text-black/80" : "text-white/75"}`}>
                      <CheckIcon className={`w-4 h-4 shrink-0 ${featured ? "text-black" : "text-volt"}`} /> {it}
                    </li>
                  ))}
                </ul>
                <a
                  href={BRAND.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex rounded-full px-7 py-3.5 font-sans font-bold text-[15px] transition-colors ${featured ? "bg-black text-volt hover:bg-white hover:text-black" : "bg-volt text-black hover:bg-white"}`}
                >
                  Book Now
                </a>
              </div>
              </Appear>
            );
          })}
        </div>
      </section>

      {/* process */}
      <section className="relative z-10 px-5 md:px-12 py-10 md:py-16">
        <p className={EYEBROW} style={{ letterSpacing: "0.25em" }}>[ How it works ]</p>
        <h2 className={`${H2} mt-5`}>From booking to spotless.</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS.map((p, i) => (
            <Appear key={p.n} delay={i * 0.12} className="h-full">
            <div className="relative h-full rounded-3xl border border-white/10 bg-[#0c0c0c]/90 p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:border-volt/60">
              <span className="absolute -right-2 -top-4 font-display font-bold text-8xl text-volt/10">{p.n}</span>
              <p className="relative font-display font-semibold text-xl">{p.title}</p>
              <p className="relative font-sans text-white/55 mt-2 text-[15px]">{p.text}</p>
            </div>
            </Appear>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-5 md:px-12 py-16 md:py-24">
        <div className="rounded-[2rem] border border-volt/40 bg-[#0c0c0c]/90 p-8 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <h2 className="font-display font-semibold tracking-tight text-3xl md:text-5xl leading-tight max-w-xl">Not sure which service you need?</h2>
          <SmartLink href="/contact" className="self-start rounded-full bg-volt text-black font-sans font-bold px-7 py-3.5 text-[15px] hover:bg-white transition-colors">Talk to our team</SmartLink>
        </div>
      </section>

      <Footer />
    </main>
  );
}

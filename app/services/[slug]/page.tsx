import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Appear from "@/components/Appear";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import SmartLink from "@/components/SmartLink";
import { CheckIcon } from "@/components/Icons";
import { BRAND, PLANS, PROCESS, SERVICES } from "@/lib/content";
import { SERVICE_SEO, breadcrumb, faqSchema, pageMeta, serviceSchema } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.id === slug);
  if (!s) return {};
  const seo = SERVICE_SEO[slug];
  return pageMeta({ title: seo.title, description: seo.description, path: `/services/${slug}`, image: s.img, keywords: seo.keywords });
}

const EYEBROW = "font-mono uppercase text-[11px] text-volt";
const H2 = "font-display font-semibold tracking-tight text-3xl md:text-5xl leading-[1.05]";

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.id === slug);
  if (!s) notFound();
  const seo = SERVICE_SEO[slug];
  const others = SERVICES.filter((x) => x.id !== slug);

  const faq: string[][] = [
    [`What does ${s.title.toLowerCase()} include?`, `${s.bullets.slice(0, 4).join(". ")}. Our team follows a thorough checklist and inspects every corner with you at the end.`],
    [`How do I get a quote for ${s.title.toLowerCase()} in Lahore?`, "Call or WhatsApp us, or send the contact form. We reply with a clear, fair price, usually the same day, with no hidden charges."],
    ["Can I book at a time that suits me?", "Yes. We work for you 24/7, so choose a time slot that fits your schedule."],
    ...(slug === "residential"
      ? [["How much does house deep cleaning cost in Lahore?", `Fixed prices by property size: ${PLANS.map((p) => `${p.name} PKR ${p.price}`).join(", ")}.`]]
      : []),
  ];

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-clip">
      <JsonLd data={[breadcrumb([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.title, path: `/services/${slug}` }]), serviceSchema(slug), faqSchema(faq)]} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[80vh]" style={{ background: "radial-gradient(ellipse at 80% 0%, #1b2105 0%, #050505 55%, #000 100%)" }} aria-hidden="true" />
      <Header revealed />

      <section className="relative z-10 px-5 md:px-12 pt-32 md:pt-44 pb-10">
        <nav aria-label="Breadcrumb" className="font-mono uppercase text-white/45 text-[11px]" style={{ letterSpacing: "0.18em" }}>
          <SmartLink href="/" className="hover:text-volt">Home</SmartLink> / <SmartLink href="/services" className="hover:text-volt">Services</SmartLink> / <span className="text-volt">{s.title}</span>
        </nav>
        <h1 className="font-display font-semibold tracking-[-0.03em] leading-[0.95] text-4xl sm:text-6xl md:text-7xl mt-6 max-w-5xl">{seo.h1}</h1>
        <p className="font-sans text-white/65 text-base md:text-xl mt-6 max-w-2xl leading-relaxed">
          {s.intro} C4 Cleaning serves {seo.area}, with trained teams, safe products and no hidden charges.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <SmartLink href="/contact" className="rounded-full bg-volt text-black font-sans font-bold px-7 py-3.5 text-[15px] hover:bg-white transition-colors">Get a free quote</SmartLink>
          <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/25 font-sans font-semibold px-7 py-3.5 text-[15px] hover:bg-white/10 transition-colors">WhatsApp us</a>
        </div>
      </section>

      <section className="relative z-10 px-5 md:px-12 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        <Appear from="left" className="lg:col-span-6">
          <div className="overflow-hidden rounded-[2rem] border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.img} alt={`${s.title} in Lahore by C4 Cleaning`} width={1200} height={1600} fetchPriority="high" className="w-full h-[340px] md:h-[560px] object-cover" />
          </div>
        </Appear>
        <Appear from="right" delay={0.1} className="lg:col-span-6">
          <p className={EYEBROW} style={{ letterSpacing: "0.25em" }}>[ What&apos;s included ]</p>
          <h2 className={`${H2} mt-4`}>{s.title}, done properly.</h2>
          <ul className="mt-6 space-y-3">
            {s.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 font-sans text-[15px] text-white/80 leading-snug">
                <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-volt/15 flex items-center justify-center"><CheckIcon className="w-3 h-3 text-volt" /></span>
                {b}
              </li>
            ))}
          </ul>
        </Appear>
      </section>

      {slug === "residential" && (
        <section className="relative z-10 px-5 md:px-12 py-10 md:py-16">
          <p className={EYEBROW} style={{ letterSpacing: "0.25em" }}>[ Pricing ]</p>
          <h2 className={`${H2} mt-4`}>House deep cleaning prices in Lahore</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {PLANS.map((p, i) => (
              <Appear key={p.name} delay={i * 0.1} className="h-full">
                <div className={`h-full rounded-[2rem] border p-7 ${i === 1 ? "bg-volt text-black border-volt" : "bg-[#0c0c0c]/90 border-white/10"}`}>
                  <p className={`font-mono uppercase text-[11px] ${i === 1 ? "text-black/60" : "text-white/45"}`} style={{ letterSpacing: "0.2em" }}>{p.name}</p>
                  <p className="font-display font-semibold mt-3 flex items-baseline gap-2"><span className="text-lg opacity-60">PKR</span><span className="text-5xl leading-none">{p.price}</span></p>
                  <p className={`font-sans text-[13px] mt-2 ${i === 1 ? "text-black/65" : "text-white/45"}`}>{p.note}</p>
                  <p className="mt-4"><em className={`inline-block rounded-md px-2.5 py-1 font-display text-[15px] font-semibold italic ${i === 1 ? "bg-black text-volt" : "bg-volt/15 text-volt"}`}>Full house cleaned</em></p>
                </div>
              </Appear>
            ))}
          </div>
        </section>
      )}

      <section className="relative z-10 px-5 md:px-12 py-10 md:py-16">
        <p className={EYEBROW} style={{ letterSpacing: "0.25em" }}>[ How it works ]</p>
        <h2 className={`${H2} mt-4`}>From booking to spotless</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS.map((p, i) => (
            <Appear key={p.n} delay={i * 0.1} className="h-full">
              <div className="relative h-full rounded-3xl border border-white/10 bg-[#0c0c0c]/90 p-7 overflow-hidden">
                <span className="absolute -right-2 -top-4 font-display font-bold text-8xl text-volt/10">{p.n}</span>
                <h3 className="relative font-display font-semibold text-xl">{p.title}</h3>
                <p className="relative font-sans text-white/55 mt-2 text-[15px]">{p.text}</p>
              </div>
            </Appear>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-5 md:px-12 py-10 md:py-16">
        <p className={EYEBROW} style={{ letterSpacing: "0.25em" }}>[ FAQ ]</p>
        <h2 className={`${H2} mt-4 mb-8`}>{s.title} questions</h2>
        <Faq items={faq} />
      </section>

      <section className="relative z-10 px-5 md:px-12 py-10 md:py-16">
        <h2 className={H2}>Other cleaning services</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {others.map((o) => (
            <SmartLink key={o.id} href={`/services/${o.id}`} className="group relative block h-60 rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 hover:-translate-y-1.5 hover:border-volt/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={o.img} alt={`${o.title} in Lahore`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
              <span className="absolute left-5 right-5 bottom-5 font-display font-semibold text-lg leading-tight">{o.title}</span>
            </SmartLink>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-5 md:px-12 py-16 md:py-24">
        <div className="rounded-[2rem] border border-volt/40 bg-[#0c0c0c]/90 p-8 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <h2 className="font-display font-semibold tracking-tight text-3xl md:text-5xl leading-tight max-w-xl">Book {s.title.toLowerCase()} in Lahore</h2>
          <SmartLink href="/contact" className="self-start rounded-full bg-volt text-black font-sans font-bold px-7 py-3.5 text-[15px] hover:bg-white transition-colors">Get a free quote</SmartLink>
        </div>
      </section>

      <Footer />
    </main>
  );
}

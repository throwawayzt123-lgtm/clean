import Appear from "./Appear";
import Faq from "./Faq";
import PageShell from "./PageShell";
import SmartLink from "./SmartLink";
import { CheckIcon } from "./Icons";
import { AREAS } from "@/lib/keywords";
import { BRAND, PLANS, PROMISES, SERVICES, STATS } from "@/lib/content";
import { breadcrumb, faqSchema, webPageSchema } from "@/lib/seo";

const EYEBROW = "font-mono uppercase text-[11px] text-volt";
const H2 = "font-display font-semibold tracking-tight text-3xl md:text-5xl leading-[1.05]";

export type LandingProps = {
  path: string;
  crumb: string;
  eyebrow: string;
  h1: string;
  title: string;
  description: string;
  /** 40-60 word direct answer: the block AI answer engines and featured snippets quote. */
  quickAnswer: string;
  criteriaTitle: string;
  criteria: { title: string; text: string }[];
  whyTitle: string;
  whyParagraphs: string[];
  faq: string[][];
};

/** Reusable keyword landing page: quick answer, selection criteria, services, prices, areas, FAQ. */
export default function LandingPage(p: LandingProps) {
  return (
    <PageShell
      schema={[
        breadcrumb([{ name: "Home", path: "/" }, { name: p.crumb, path: p.path }]),
        webPageSchema({ path: p.path, name: p.title, description: p.description }),
        faqSchema(p.faq),
      ]}
    >
      <section className="relative z-10 px-5 md:px-12 pt-32 md:pt-44 pb-10">
        <p className={EYEBROW} style={{ letterSpacing: "0.25em" }}>{p.eyebrow}</p>
        <h1 className="font-display font-semibold tracking-[-0.03em] leading-[0.98] text-4xl sm:text-6xl md:text-7xl mt-6 max-w-5xl">{p.h1}</h1>
        <p className="speakable font-sans text-white/75 text-base md:text-xl mt-6 max-w-3xl leading-relaxed">{p.quickAnswer}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <SmartLink href="/contact" className="rounded-full bg-volt text-black font-sans font-bold px-7 py-3.5 text-[15px] hover:bg-white transition-colors">Get a free quote</SmartLink>
          <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/25 font-sans font-semibold px-7 py-3.5 text-[15px] hover:bg-white/10 transition-colors">WhatsApp us</a>
        </div>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-[#0c0c0c]/90 px-5 py-4">
              <p className="font-display font-semibold text-3xl text-volt">{s.value}</p>
              <p className="font-mono uppercase text-white/50 mt-1" style={{ fontSize: 10, letterSpacing: "0.15em" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-5 md:px-12 py-12 md:py-20">
        <h2 className={H2}>{p.criteriaTitle}</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {p.criteria.map((c, i) => (
            <Appear key={c.title} delay={(i % 3) * 0.1} className="h-full">
              <div className="h-full rounded-3xl border border-white/10 bg-[#0c0c0c]/90 p-7 hover:border-volt/60 transition-colors">
                <span className="font-mono text-volt text-sm">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display font-semibold text-xl mt-3">{c.title}</h3>
                <p className="font-sans text-white/60 mt-2 text-[15px] leading-relaxed">{c.text}</p>
              </div>
            </Appear>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-5 md:px-12 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <h2 className={H2}>{p.whyTitle}</h2>
        </div>
        <div className="lg:col-span-7">
          <div className="font-sans text-white/65 text-base md:text-lg leading-relaxed space-y-5">
            {p.whyParagraphs.map((t) => <p key={t}>{t}</p>)}
          </div>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3">
            {PROMISES.map((t) => (
              <li key={t} className="flex gap-3 text-[15px] text-white/80">
                <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-volt text-black flex items-center justify-center"><CheckIcon className="w-3 h-3" /></span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative z-10 px-5 md:px-12 py-12 md:py-20">
        <h2 className={H2}>Our cleaning services</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s) => (
            <SmartLink key={s.id} href={`/services/${s.id}`} className="group relative block h-72 rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 hover:-translate-y-1.5 hover:border-volt/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} alt={`${s.title} in Lahore by C4 Cleaning`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
              <span className="absolute left-5 right-5 bottom-5">
                <span className="block font-display font-semibold text-lg leading-tight">{s.title}</span>
                <span className="block font-sans text-[13px] text-white/60 mt-1 line-clamp-2">{s.short}</span>
              </span>
            </SmartLink>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-5 md:px-12 py-12 md:py-20">
        <h2 className={H2}>House deep cleaning prices in Lahore</h2>
        <div className="mt-8 overflow-x-auto rounded-3xl border border-white/10 bg-[#0c0c0c]/90">
          <table className="w-full min-w-[520px] text-left font-sans">
            <thead>
              <tr className="font-mono uppercase text-white/45 text-[11px]" style={{ letterSpacing: "0.15em" }}>
                <th className="px-6 py-4">Property</th><th className="px-6 py-4">Scope</th><th className="px-6 py-4">Price</th>
              </tr>
            </thead>
            <tbody>
              {PLANS.map((pl) => (
                <tr key={pl.name} className="border-t border-white/10">
                  <td className="px-6 py-4 font-display font-semibold">{pl.name}</td>
                  <td className="px-6 py-4 text-white/65">Full house cleaned · {pl.note}</td>
                  <td className="px-6 py-4 font-display font-semibold text-volt">PKR {pl.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="relative z-10 px-5 md:px-12 py-12 md:py-20">
        <h2 className={H2}>Where we work in Lahore</h2>
        <p className="font-sans text-white/60 mt-4 max-w-2xl">Based in {BRAND.address}. We serve homes and offices across Lahore, including:</p>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {AREAS.map((a) => (
            <li key={a} className="rounded-full border border-white/15 px-4 py-2 font-sans text-sm text-white/80">{a}</li>
          ))}
        </ul>
      </section>

      <section className="relative z-10 px-5 md:px-12 py-12 md:py-20">
        <h2 className={`${H2} mb-8`}>Frequently asked questions</h2>
        <Faq items={p.faq} />
      </section>

      <section className="relative z-10 px-5 md:px-12 py-16 md:py-24">
        <div className="rounded-[2rem] border border-volt/40 bg-[#0c0c0c]/90 p-8 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <h2 className="font-display font-semibold tracking-tight text-3xl md:text-5xl leading-tight max-w-xl">Ready for a spotless space? Get your free quote.</h2>
          <SmartLink href="/contact" className="self-start rounded-full bg-volt text-black font-sans font-bold px-7 py-3.5 text-[15px] hover:bg-white transition-colors">Talk to our team</SmartLink>
        </div>
      </section>
    </PageShell>
  );
}

import type { Metadata } from "next";
import Faq from "@/components/Faq";
import PageShell from "@/components/PageShell";
import SmartLink from "@/components/SmartLink";
import { FAQ_GENERAL } from "@/lib/faq";
import { breadcrumb, faqSchema, pageMeta, webPageSchema } from "@/lib/seo";

const TITLE = "Cleaning FAQ: Prices & Deep Cleaning in Lahore";
const DESC =
  "Answers to common questions about cleaning in Lahore: deep cleaning prices for 10 Marla and 1 Kanal houses, what is included, commercial and post-construction cleaning, areas and booking.";

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESC,
  path: "/faq",
  image: "/opengraph-image",
  keywords: ["deep cleaning price Lahore", "how much does house cleaning cost in Lahore", "best deep cleaning services in Lahore", "cleaning services FAQ"],
});

export default function FaqPage() {
  return (
    <PageShell
      schema={[
        breadcrumb([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]),
        webPageSchema({ path: "/faq", name: TITLE, description: DESC }),
        faqSchema(FAQ_GENERAL),
      ]}
    >
      <section className="relative z-10 px-5 md:px-12 pt-32 md:pt-44 pb-16">
        <p className="font-mono uppercase text-[11px] text-volt" style={{ letterSpacing: "0.25em" }}>[ FAQ ]</p>
        <h1 className="font-display font-semibold tracking-[-0.03em] leading-[0.95] text-5xl sm:text-6xl md:text-7xl mt-6 max-w-5xl">
          Cleaning questions, <span className="text-volt">answered.</span>
        </h1>
        <p className="speakable font-sans text-white/65 text-base md:text-xl mt-6 max-w-2xl leading-relaxed">
          C4 Cleaning is a professional cleaning company in DHA Phase 6, Lahore. House deep cleaning starts at PKR 70,000 for a 10 Marla home, PKR 110,000 for 1 Kanal and PKR 160,000 for 1 Kanal with basement.
        </p>
        <div className="mt-10"><Faq items={FAQ_GENERAL} /></div>
        <div className="mt-12 flex flex-wrap gap-3">
          <SmartLink href="/contact" className="rounded-full bg-volt text-black font-sans font-bold px-7 py-3.5 text-[15px] hover:bg-white transition-colors">Get a free quote</SmartLink>
          <SmartLink href="/services" className="rounded-full border border-white/25 font-sans font-semibold px-7 py-3.5 text-[15px] hover:bg-white/10 transition-colors">See all services</SmartLink>
        </div>
      </section>
    </PageShell>
  );
}

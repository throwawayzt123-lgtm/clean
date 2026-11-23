import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { abs, FAQ_ITEMS, breadcrumb, faqSchema, pageMeta } from "@/lib/seo";
import Appear from "@/components/Appear";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";
import ContactForm from "@/components/ContactForm";
import { BRAND } from "@/lib/content";
import { InstagramIcon, MailIcon, PhoneIcon, ArrowUpRightIcon } from "@/components/Icons";

export const metadata: Metadata = pageMeta({
  title: "Contact & Free Quote: Cleaning Services in Lahore",
  description:
    "Get a free cleaning quote in Lahore. Call +92 329 6017412, WhatsApp or email info@c4cleanings.com. C4 Cleaning, DHA Phase 6, available 24/7.",
  path: "/contact",
  image: "/opengraph-image",
  keywords: ["cleaning quote Lahore", "book cleaning service Lahore", "contact C4 Cleaning"],
});

const CHANNELS = [
  { Icon: PhoneIcon, label: "Call us", value: BRAND.phone, href: BRAND.phoneHref },
  { Icon: ArrowUpRightIcon, label: "WhatsApp", value: "Chat with our team", href: BRAND.whatsapp, ext: true },
  { Icon: MailIcon, label: "Email", value: BRAND.officialEmail, href: `mailto:${BRAND.officialEmail}` },
  { Icon: InstagramIcon, label: "Instagram", value: "@crystalclear.cleaningcompany", href: BRAND.instagram, ext: true },
];

const STEPS = [
  ["01", "Send your details", "Tell us the space, size and what you need."],
  ["02", "Get your quote", "We reply with a clear fixed price, usually the same day."],
  ["03", "We make it spotless", "Pick a time. Our team arrives equipped and gets to work."],
];


export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-clip">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[80vh]" style={{ background: "radial-gradient(ellipse at 20% 0%, #1b2105 0%, #050505 55%, #000 100%)" }} aria-hidden="true" />
      <JsonLd data={[breadcrumb([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]), faqSchema(FAQ_ITEMS), { "@context": "https://schema.org", "@type": "ContactPage", url: abs("/contact"), name: "Contact C4 Cleaning" }]} />
      <Header revealed />

      <section className="relative z-10 px-5 md:px-12 pt-32 md:pt-44 pb-10">
        <p className="font-mono uppercase text-[11px] text-volt" style={{ letterSpacing: "0.25em" }}>[ Contact ]</p>
        <h1 className="font-display font-semibold tracking-[-0.03em] leading-[0.95] text-5xl sm:text-6xl md:text-8xl mt-6 max-w-4xl">
          Let&apos;s make it <span className="text-volt">spotless.</span>
        </h1>
        <p className="font-sans text-white/60 text-base md:text-lg mt-6 max-w-xl leading-relaxed">
          Tell us what needs cleaning and we&apos;ll send a quote. {BRAND.availability}.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CHANNELS.map(({ Icon, label, value, href, ext }, i) => (
            <Appear key={label} delay={i * 0.1} className="h-full">
            <a
              href={href}
              {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group block h-full rounded-3xl border border-white/10 bg-[#0c0c0c]/90 p-6 hover:border-volt/60 hover:bg-volt/[0.06] hover:-translate-y-1.5 transition-all duration-500"
            >
              <span className="w-11 h-11 rounded-full bg-volt text-black flex items-center justify-center transition-transform group-hover:scale-110">
                <Icon className="w-5 h-5" />
              </span>
              <p className="font-mono uppercase text-white/45 mt-5" style={{ fontSize: 10, letterSpacing: "0.18em" }}>{label}</p>
              <p className="font-display font-semibold text-lg mt-1 break-words">{value}</p>
            </a>
            </Appear>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-5 md:px-12 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-5">
          <h2 className="font-display font-semibold tracking-tight text-3xl md:text-5xl leading-tight">How it works</h2>
          <div className="mt-8 space-y-6">
            {STEPS.map(([n, t, d], i) => (
              <Appear key={n} delay={i * 0.12} from="left">
              <div className="flex gap-5">
                <span className="font-mono text-volt text-sm pt-1">{n}</span>
                <div className="border-l border-white/15 pl-5">
                  <p className="font-display font-semibold text-xl">{t}</p>
                  <p className="font-sans text-white/55 mt-1 text-[15px]">{d}</p>
                </div>
              </div>
              </Appear>
            ))}
          </div>
          <div className="mt-10 rounded-3xl border border-white/10 bg-[#0c0c0c]/90 p-6">
            <p className="font-mono uppercase text-white/45" style={{ fontSize: 10, letterSpacing: "0.18em" }}>Visit / service area</p>
            <p className="font-display font-semibold text-xl mt-2">{BRAND.address}</p>
            <a href={`https://www.google.com/maps/search/${encodeURIComponent(BRAND.address)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 font-sans text-sm font-semibold text-volt hover:underline">
              Open in Maps <ArrowUpRightIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
        <Appear from="right" className="lg:col-span-7">
          <ContactForm />
        </Appear>
      </section>

      <section className="relative z-10 px-5 md:px-12 pb-20 md:pb-32">
        <h2 className="font-display font-semibold tracking-tight text-3xl md:text-5xl">Quick answers</h2>
        <div className="mt-8"><Faq items={FAQ_ITEMS} /></div>
      </section>

      <Footer />
    </main>
  );
}

"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRightIcon, InstagramIcon, MailIcon, PhoneIcon } from "./Icons";
import SmartLink from "@/components/SmartLink";
import { EASE } from "@/lib/shared";
import { BRAND, SERVICES } from "@/lib/content";

const WORDS = ["Shining standards", "Spotless results", "Customers first", "Call for estimate"];

const COLUMNS: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  { title: "Services", links: SERVICES.map((x) => ({ label: x.title, href: `/services/${x.id}` })) },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Best Cleaning Company in Lahore", href: "/best-cleaning-company-in-lahore" },
      { label: "Cleaning Services in Pakistan", href: "/cleaning-services-pakistan" },
      { label: "FAQ", href: "/faq" },
      { label: "Gallery", href: "/gallery" },
      { label: "About Us", href: "/about" },
      { label: "Reviews", href: "/#reviews" },
      { label: "Plans", href: "/#plans" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Contact page", href: "/contact" },
      { label: BRAND.phone, href: BRAND.phoneHref },
      { label: BRAND.officialEmail, href: `mailto:${BRAND.officialEmail}` },
      { label: BRAND.email, href: `mailto:${BRAND.email}` },
      { label: "WhatsApp", href: BRAND.whatsapp, external: true },
      { label: "Instagram", href: BRAND.instagram, external: true },
    ],
  },
];

// Fade-up reveal used by the footer (0.7s, y:24, ease-out-expo), triggered once when in view.
function FadeUp({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ${EASE} ${delay}s, transform 0.7s ${EASE} ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function MarqueeSet() {
  return (
    <div className="inline-flex items-center shrink-0" aria-hidden="true">
      {WORDS.map((w) => (
        <span key={w} className="inline-flex items-center">
          <span className="px-8 whitespace-nowrap">{w}</span>
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: "#DFFE12" }} />
        </span>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="relative z-10 mt-8 md:mt-16 text-white">
      {/* animated water-wave edge */}
      <div className="absolute inset-x-0 -top-[58px] h-[60px] overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="wave-b absolute inset-y-0 left-0 w-[200%] opacity-40">
          <svg viewBox="0 0 2400 60" preserveAspectRatio="none" className="w-full h-full block">
            <path d="M0 26 Q150 -4 300 26 T600 26 T900 26 T1200 26 T1500 26 T1800 26 T2100 26 T2400 26 V60 H0Z" fill="#0a0a0a" />
          </svg>
        </div>
        <div className="wave-a absolute inset-y-0 left-0 w-[200%]">
          <svg viewBox="0 0 2400 60" preserveAspectRatio="none" className="w-full h-full block">
            <path d="M0 36 Q150 6 300 36 T600 36 T900 36 T1200 36 T1500 36 T1800 36 T2100 36 T2400 36 V60 H0Z" fill="#0a0a0a" />
          </svg>
        </div>
      </div>
      <div className="relative bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[28rem] h-[28rem] rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, #DFFE1226 0%, transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-52 -left-48 w-[32rem] h-[32rem] rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, #DFFE1218 0%, transparent 65%)" }}
      />
      </div>

      {/* marquee */}
      <div className="relative border-b border-white/10 py-5 overflow-hidden">
        <div
          className="marquee-track inline-flex w-max font-display font-semibold text-white/90"
          style={{ fontSize: "clamp(28px, 6vw, 64px)" }}
        >
          <MarqueeSet />
          <MarqueeSet />
        </div>
      </div>

      <div className="relative px-6 md:px-12 pt-16 md:pt-24 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <FadeUp className="lg:col-span-5">
            <p className="font-mono uppercase text-[11px] text-white/40" style={{ letterSpacing: "0.25em" }}>[ Call for estimate ]</p>
            <h2 className="font-display font-semibold tracking-tight text-4xl md:text-6xl leading-[0.95] mt-6">
              Ready for a<br />spotless space?
            </h2>
            <a
              href={`mailto:${BRAND.email}`}
              className="group mt-10 inline-flex items-center gap-4 sm:gap-6 pl-5 sm:pl-7 pr-2 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition-colors max-w-full"
            >
              <span className="font-raleway font-medium text-sm sm:text-base break-all">{BRAND.email}</span>
              <span className="blue-orb w-10 h-10 rounded-full flex items-center justify-center">
                <ArrowUpRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </a>
          </FadeUp>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {COLUMNS.map((col, i) => (
              <FadeUp key={col.title} delay={i * 0.08}>
                <p className="font-mono uppercase text-[10px] text-white/40" style={{ letterSpacing: "0.25em" }}>{col.title}</p>
                <ul className="mt-6 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <SmartLink href={l.href} {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group inline-flex items-center gap-1.5 font-raleway text-[15px] text-white/75 hover:text-white transition-colors">
                        {l.label}
                        <ArrowUpRightIcon className="w-3.5 h-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            ))}
          </div>
        </div>

        <div className="mt-20 md:mt-28 pt-7 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/c4logo-sm.webp" width={256} height={197} decoding="async" alt="C4 Cleaning" className="h-10 w-auto rounded-lg" />
            <span className="w-1.5 h-1.5 rounded-full bg-volt" />
            <span className="font-mono text-[11px] text-white/40">© 2026 C4 Cleaning — {BRAND.address}. {BRAND.availability}.</span>
          </div>
          <div className="flex items-center gap-3">
            {[
              { Icon: InstagramIcon, label: "Instagram", href: BRAND.instagram },
              { Icon: PhoneIcon, label: "Call us", href: BRAND.phoneHref },
              { Icon: MailIcon, label: "Email us", href: `mailto:${BRAND.email}` },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}

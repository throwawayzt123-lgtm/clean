"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronRightIcon, MailIcon, PhoneIcon } from "./Icons";
import SmartLink from "@/components/SmartLink";
import { EASE } from "@/lib/shared";
import { BRAND } from "@/lib/content";

const NAV = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Header({ revealed }: { revealed: boolean }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // smart bar: slides away when scrolling down, returns on scroll up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) > 6) {
        setHidden(y > 140 && y > last);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock page scroll while the full-screen menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && pathname === href;
  const away = hidden && !open;

  return (
    <header
      className="fixed top-0 inset-x-0 z-30 pointer-events-none"
      style={{ opacity: revealed ? 1 : 0, transition: `opacity 0.8s ${EASE}` }}
    >
      {/* floating pill */}
      <div
        className="relative z-10 flex flex-col items-center px-3 pt-3 md:pt-5"
        style={{
          transform: away ? "translateY(-140%)" : "none",
          transition: `transform 0.5s ${EASE}`,
        }}
      >
        <div
          className="pointer-events-auto flex w-full max-w-[min(100%,820px)] items-center justify-between gap-1.5 md:gap-2 rounded-full border p-1 md:p-2 backdrop-blur-xl"
          style={{
            background: scrolled || open ? "rgba(8,8,8,0.82)" : "rgba(8,8,8,0.6)",
            borderColor: scrolled ? "rgba(223,254,18,0.28)" : "rgba(255,255,255,0.14)",
            boxShadow: scrolled ? "0 10px 40px rgba(0,0,0,0.55), 0 0 30px rgba(223,254,18,0.07)" : "none",
            transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
          }}
        >
          <SmartLink href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5 shrink-0" aria-label="C4 Cleaning, home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/c4logo.png" alt="" className="h-9 md:h-11 w-auto rounded-lg md:rounded-xl" />
          </SmartLink>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => {
              const on = isActive(n.href);
              return (
                <SmartLink
                  key={n.label}
                  href={n.href}
                  className={`rounded-full px-4 py-2 font-sans text-[14.5px] font-semibold transition-colors ${on ? "text-volt bg-white/[0.07]" : "text-white/85 hover:text-volt hover:bg-white/[0.05]"}`}
                >
                  {n.label}
                </SmartLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
            <SmartLink
              href="/contact"
              className="group flex items-center gap-2 rounded-full bg-volt text-black pl-3.5 md:pl-5 pr-1 md:pr-1.5 py-1 md:py-1.5 transition-colors hover:bg-white"
            >
              <span className="font-sans text-[12.5px] md:text-[14px] font-bold whitespace-nowrap">Let&apos;s talk</span>
              <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-black flex items-center justify-center text-volt transition-transform group-hover:scale-105">
                <ChevronRightIcon className="w-4 h-4" />
              </span>
            </SmartLink>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="lg:hidden shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/20 bg-white/10 flex flex-col items-center justify-center gap-[5px] cursor-pointer"
            >
              <span className="block w-4 h-px bg-white transition-transform duration-300" style={{ transform: open ? "translateY(3px) rotate(45deg)" : "none" }} />
              <span className="block w-4 h-px bg-white transition-transform duration-300" style={{ transform: open ? "translateY(-3px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </div>
        <p
          className="pointer-events-none mt-2 text-center font-display italic font-semibold uppercase text-volt text-[10px] sm:text-[11px] md:text-xs"
          style={{ letterSpacing: "0.32em", textShadow: "0 0 8px rgba(223,254,18,0.85), 0 0 22px rgba(223,254,18,0.5), 0 0 44px rgba(223,254,18,0.3)", opacity: scrolled ? 0 : 1, transition: "opacity 0.3s" }}
        >
          Crystal Clear Cleaning Company
        </p>
      </div>

      {/* full-height mobile menu */}
      <div
        className="lg:hidden fixed inset-0 h-svh z-0 flex flex-col px-6 pt-24 pb-8 overflow-y-auto"
        style={{
          background: "radial-gradient(ellipse at 80% 0%, #1b2105 0%, #050505 55%, #000 100%)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
          transition: `opacity 0.4s ${EASE}, visibility 0s linear ${open ? "0s" : "0.4s"}`,
        }}
        data-lenis-prevent
      >
        <nav className="flex flex-col">
          {NAV.map((n, i) => (
            <SmartLink
              key={n.label}
              href={n.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 py-3.5 border-b border-white/10"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(24px)",
                transition: `opacity 0.6s ${EASE} ${0.08 + i * 0.05}s, transform 0.6s ${EASE} ${0.08 + i * 0.05}s`,
              }}
            >
              <span className="font-mono text-[11px] text-volt">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display font-semibold text-[2.4rem] leading-none tracking-tight text-white group-active:text-volt">{n.label}</span>
            </SmartLink>
          ))}
        </nav>

        <div
          className="mt-auto pt-8 flex flex-col gap-4"
          style={{
            opacity: open ? 1 : 0,
            transition: `opacity 0.6s ${EASE} 0.4s`,
          }}
        >
          <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full bg-volt text-black text-center font-sans font-bold py-4 text-[15px]">
            Get a quote on WhatsApp
          </a>
          <div className="flex flex-col gap-2.5 font-sans text-[14px] text-white/65">
            <a href={BRAND.phoneHref} className="flex items-center gap-2.5"><PhoneIcon className="w-4 h-4 text-volt" /> {BRAND.phone}</a>
            <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2.5 break-all"><MailIcon className="w-4 h-4 text-volt shrink-0" /> {BRAND.email}</a>
            <p className="font-mono uppercase text-white/35 mt-1" style={{ fontSize: 10, letterSpacing: "0.18em" }}>{BRAND.address}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

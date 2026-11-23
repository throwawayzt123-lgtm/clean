"use client";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { ArrowUpRightIcon } from "./Icons";

export const LABEL = "font-mono uppercase text-[11px] text-volt text-legible";
export const LABEL_STYLE: CSSProperties = { letterSpacing: "0.25em" };
export const H2 =
  "font-display font-semibold text-[2.3rem] leading-[1.02] sm:text-6xl md:text-[76px] md:leading-[0.94] tracking-[-0.03em] text-white text-legible";
export const BODY = "font-sans text-[15px] md:text-[17px] leading-[1.65] text-white/70 text-legible";

/** Dark card shell with a cursor-following volt spotlight and a hairline border that lights up on hover. */
export function Card({ children, className = "", featured = false }: { children: ReactNode; className?: string; featured?: boolean }) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      onPointerMove={onMove}
      className={`group/card relative overflow-hidden rounded-[1.75rem] border transition-all duration-500 hover:-translate-y-1.5 ${
        featured ? "bg-volt text-black border-volt" : "bg-[#0c0c0c]/90 backdrop-blur-md border-white/10 hover:border-volt/60 text-white"
      } ${className}`}
    >
      {!featured && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
          style={{ background: "radial-gradient(380px circle at var(--mx,50%) var(--my,50%), rgba(223,254,18,0.13), transparent 62%)" }}
        />
      )}
      {children}
    </div>
  );
}

export function PillLink({ href, children, dark = false }: { href: string; children: ReactNode; dark?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full transition-colors ${
        dark ? "bg-black text-volt hover:bg-neutral-900" : "bg-volt text-black hover:bg-white"
      }`}
    >
      <span className="font-sans text-[13px] font-bold">{children}</span>
      <span className={`w-7 h-7 rounded-full flex items-center justify-center ${dark ? "bg-volt text-black" : "bg-black text-volt"}`}>
        <ArrowUpRightIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" />
      </span>
    </a>
  );
}

export function Photo({ src, alt, className = "", style }: { src: string; alt: string; className?: string; style?: CSSProperties }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" draggable={false} style={style} className={`absolute inset-0 w-full h-full object-cover ${className}`} />
  );
}

/** Soft, edgeless dark glow placed behind copy so it stays readable over bright spheres (no hard edges). */
export function Halo() {
  return (
    <div
      className="pointer-events-none absolute -inset-x-8 -inset-y-6 md:-inset-x-14 md:-inset-y-10 -z-10 rounded-[50%] blur-3xl"
      style={{ background: "radial-gradient(closest-side, rgba(0,0,0,0.72), rgba(0,0,0,0.4) 60%, transparent)" }}
      aria-hidden="true"
    />
  );
}

"use client";
import { useEffect } from "react";
import Lenis from "lenis";

/** Site-wide Lenis smooth scrolling. Pauses automatically while the page scroll is locked
 *  (loader, mobile menu, lightbox set html overflow:hidden). */
export default function LenisProvider() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // touch devices already scroll natively and smoothly; weak machines are faster without the extra smoothing loop
    const weak = (navigator.hardwareConcurrency || 8) <= 4;
    if (window.matchMedia("(pointer: coarse)").matches || weak) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true, anchors: true });

    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const html = document.documentElement;
    const sync = () => (html.style.overflow === "hidden" ? lenis.stop() : lenis.start());
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(html, { attributes: true, attributeFilter: ["style"] });

    return () => {
      mo.disconnect();
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}

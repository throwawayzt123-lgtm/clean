"use client";
import { useEffect, useState } from "react";
import { BRAND } from "@/lib/content";
import { EASE } from "@/lib/shared";

/** Floating WhatsApp quick-chat button, bottom right on every page. */
export default function WhatsAppButton() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2200);
    return () => clearTimeout(t);
  }, []);

  const href = `${BRAND.whatsapp}?text=${encodeURIComponent("Hi C4 Cleaning, I'd like a quote.")}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed z-40 right-4 bottom-4 md:right-7 md:bottom-7 flex items-center gap-3"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "none" : "translateY(30px) scale(0.6)",
        pointerEvents: show ? "auto" : "none",
        transition: `opacity 0.6s ${EASE}, transform 0.7s ${EASE}`,
      }}
    >
      <span className="hidden md:block rounded-full bg-black/85 border border-white/15 backdrop-blur-md px-4 py-2 font-sans text-[13px] font-semibold text-white opacity-0 translate-x-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
        Chat with us
      </span>
      <span className="relative flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-transform duration-300 group-hover:scale-110">
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" aria-hidden="true" />
        <svg viewBox="0 0 32 32" className="relative h-7 w-7 md:h-8 md:w-8" fill="currentColor" aria-hidden="true">
          <path d="M16.04 3C9.4 3 4 8.38 4 15.01c0 2.12.55 4.19 1.6 6.01L4 29l8.17-1.57a12.02 12.02 0 0 0 3.87.64C22.67 28.07 28 22.7 28 16.07 28 9.4 22.68 3 16.04 3zm0 22.04c-1.2 0-2.38-.2-3.5-.6l-.5-.18-4.85.93.95-4.72-.2-.5a9.9 9.9 0 0 1-1.5-5.2c0-5.5 4.5-9.97 10.04-9.97 5.5 0 9.96 4.47 9.96 9.97 0 5.52-4.46 10.27-9.96 10.27zm5.5-7.4c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.65-.93-2.25-.25-.6-.5-.5-.68-.5h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.1 3.2 5.1 4.5.72.3 1.28.5 1.7.63.72.23 1.37.2 1.88.12.58-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.12-.28-.2-.58-.35z" />
        </svg>
      </span>
    </a>
  );
}

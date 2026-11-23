"use client";
import { useState } from "react";

export default function Faq({ items }: { items: string[][] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 items-start">
      {items.map(([q, a], i) => {
        const on = open === i;
        return (
          <div
            key={q}
            className="rounded-2xl border bg-[#0c0c0c]/90 transition-colors duration-300"
            style={{ borderColor: on ? "rgba(223,254,18,0.5)" : "rgba(255,255,255,0.1)" }}
          >
            <button
              onClick={() => setOpen(on ? null : i)}
              aria-expanded={on}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer font-display font-semibold text-lg"
            >
              {q}
              <span
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xl leading-none transition-all duration-300"
                style={{ background: on ? "#DFFE12" : "rgba(255,255,255,0.08)", color: on ? "#000" : "#DFFE12", transform: on ? "rotate(45deg)" : "none" }}
              >
                +
              </span>
            </button>
            <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: on ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="font-sans text-white/60 px-6 pb-5 text-[15px] leading-relaxed">{a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

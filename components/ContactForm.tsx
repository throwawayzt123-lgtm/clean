"use client";
import { useState, type FormEvent } from "react";
import { SERVICES } from "@/lib/content";

// Every enquiry lands in BOTH mailboxes (primary + cc).
const PRIMARY = "Crystalclearcleaning.co@gmail.com";
const COPY_TO = "info@c4cleanings.com";

const SIZES = ["10 Marla house", "1 Kanal (no basement)", "1 Kanal with basement", "Office / commercial", "Other"];

const FIELD =
  "w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3.5 font-sans text-[15px] text-white placeholder:text-white/30 outline-none transition-colors focus:border-volt focus:bg-white/[0.07]";
const LBL = "block font-mono uppercase text-[10px] text-white/50 mb-2";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setStatus("sending");
    setError("");
    try {
      // plain browser fetch, no server code or keys: works on localhost and in production
      const res = await fetch(`https://formsubmit.co/ajax/${PRIMARY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: f.name,
          phone: f.phone,
          email: f.email || "not provided",
          service: f.service || "-",
          property_size: f.size || "-",
          message: f.message,
          _subject: `New enquiry from ${f.name}${f.service ? " — " + f.service : ""}`,
          _cc: COPY_TO, // second mailbox gets every message too
          _template: "table",
          _captcha: "false",
          _honey: f._honey || "", // spam trap, left empty by real visitors
          ...(f.email ? { _replyto: f.email } : {}),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) !== "true") {
        throw new Error(json.message || "Something went wrong. Please try again or message us on WhatsApp.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-[1.75rem] border border-volt/50 bg-[#0c0c0c]/90 p-8 md:p-12 text-center" role="status">
        <div className="mx-auto w-16 h-16 rounded-full bg-volt text-black flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </div>
        <h3 className="font-display font-semibold text-3xl md:text-4xl text-white mt-6 tracking-tight">Message sent!</h3>
        <p className="font-sans text-white/60 mt-3 max-w-sm mx-auto">Thank you. Our team will contact you shortly with your quote.</p>
        <button onClick={() => setStatus("idle")} className="mt-7 rounded-full border border-white/20 px-6 py-2.5 font-sans text-sm font-semibold text-white hover:bg-white/10 transition-colors cursor-pointer">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[1.75rem] border border-white/10 bg-[#0c0c0c]/90 backdrop-blur-md p-6 md:p-9 grid grid-cols-1 sm:grid-cols-2 gap-5" noValidate={false}>
      <div>
        <label htmlFor="cf-name" className={LBL} style={{ letterSpacing: "0.18em" }}>Full name *</label>
        <input id="cf-name" name="name" required maxLength={80} autoComplete="name" placeholder="Your name" className={FIELD} />
      </div>
      <div>
        <label htmlFor="cf-phone" className={LBL} style={{ letterSpacing: "0.18em" }}>Phone / WhatsApp *</label>
        <input id="cf-phone" name="phone" required maxLength={30} inputMode="tel" autoComplete="tel" placeholder="+92 3xx xxxxxxx" className={FIELD} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-email" className={LBL} style={{ letterSpacing: "0.18em" }}>Email (optional)</label>
        <input id="cf-email" name="email" type="email" maxLength={120} autoComplete="email" placeholder="you@example.com" className={FIELD} />
      </div>
      <div>
        <label htmlFor="cf-service" className={LBL} style={{ letterSpacing: "0.18em" }}>Service</label>
        <select id="cf-service" name="service" defaultValue="" className={`${FIELD} appearance-none`}>
          <option value="" className="bg-neutral-900">Select a service</option>
          {SERVICES.map((s) => <option key={s.id} value={s.title} className="bg-neutral-900">{s.title}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="cf-size" className={LBL} style={{ letterSpacing: "0.18em" }}>Property size</label>
        <select id="cf-size" name="size" defaultValue="" className={`${FIELD} appearance-none`}>
          <option value="" className="bg-neutral-900">Select size</option>
          {SIZES.map((s) => <option key={s} value={s} className="bg-neutral-900">{s}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-msg" className={LBL} style={{ letterSpacing: "0.18em" }}>Message *</label>
        <textarea id="cf-msg" name="message" required minLength={5} maxLength={2000} rows={5} placeholder="Tell us about the space, location and when you need us." className={`${FIELD} resize-y`} />
      </div>

      {/* honeypot: real visitors never see or fill this */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center justify-center gap-3 pl-6 pr-2 py-2 rounded-full bg-volt text-black hover:bg-white disabled:opacity-60 disabled:cursor-wait transition-colors cursor-pointer"
        >
          <span className="font-sans text-[14px] font-bold">{status === "sending" ? "Sending…" : "Send message"}</span>
          <span className="w-9 h-9 rounded-full bg-black text-volt flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </button>
        {status === "error" && <p className="font-sans text-[14px] text-red-400" role="alert">{error}</p>}
      </div>
    </form>
  );
}

import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import JsonLd from "./JsonLd";

/** Shared layout for content pages: dark glow background, header, footer and optional JSON-LD. */
export default function PageShell({ children, schema }: { children: ReactNode; schema?: unknown }) {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-clip">
      {schema ? <JsonLd data={schema} /> : null}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[80vh]" style={{ background: "radial-gradient(ellipse at 80% 0%, #1b2105 0%, #050505 55%, #000 100%)" }} aria-hidden="true" />
      <Header revealed />
      {children}
      <Footer />
    </main>
  );
}

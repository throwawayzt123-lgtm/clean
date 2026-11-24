"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LenisProvider = dynamic(() => import("./LenisProvider"), { ssr: false });
const FxCanvas = dynamic(() => import("./FxCanvas"), { ssr: false });

/** Smooth scrolling + the bubble/dust overlay. Mounted only once the browser is idle, so they never
 *  compete with hydration and the first paint. */
export default function Effects() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setOn(true), { timeout: 1200 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setOn(true), 500);
    return () => clearTimeout(t);
  }, []);
  if (!on) return null;
  return (
    <>
      <LenisProvider />
      <FxCanvas />
    </>
  );
}

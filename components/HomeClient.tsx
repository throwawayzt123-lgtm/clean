"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import GravityCanvas from "@/components/GravityCanvas";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import { Hero, Drop, Shape, Release, Included, About, Reviews, Plans, Contact } from "@/components/Sections";
import Footer from "@/components/Footer";
import Work from "@/components/Work";
import { control, mousePos } from "@/lib/shared";

const GRADIENTS = [
  "radial-gradient(ellipse at 50% 35%, #14170a 0%, #060606 55%, #000 100%)",
  "radial-gradient(ellipse at 20% 30%, #161a05 0%, #050505 55%, #000 100%)",
  "radial-gradient(ellipse at 80% 60%, #161a05 0%, #050505 55%, #000 100%)",
];

let introSeen = false;

const BALL_COLOR = "#DFFE12";

export default function HomeClient() {
  const dimRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef(0);
  const [skipLoader, setSkipLoader] = useState(false);

  // Scroll -> physics progress + background stage
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const progress = window.scrollY / vh;
      control.progress = progress;
      const next = progress > 1.55 ? 2 : progress > 0.7 ? 1 : 0;
      // soften the sphere field behind the copy once the hero is left, so text stays readable
      if (dimRef.current) {
        const t = Math.min(1, Math.max(0, (progress - 0.3) / 0.6));
        const floor = window.innerWidth < 768 ? 0.42 : 0.62;
        dimRef.current.style.opacity = String(1 - (1 - floor) * t);
      }
      // set the backdrop directly: a React state change here re-rendered the entire home page on every stage change
      if (next !== stageRef.current && bgRef.current) {
        stageRef.current = next;
        bgRef.current.style.background = GRADIENTS[next];
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Pointer tracking
  useEffect(() => {
    const move = (e: PointerEvent) => {
      mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const down = () => (mousePos.isDown = true);
    const up = () => (mousePos.isDown = false);
    const leave = () => {
      mousePos.x = 99;
      mousePos.y = 99;
      mousePos.isDown = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  // Keep scrolling disabled until the loader is done
  useEffect(() => {
    document.documentElement.style.overflow = revealed ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [revealed]);

  // returning to home via in-app navigation skips the intro (module flag resets on every reload)
  useEffect(() => {
    if (introSeen) {
      setSkipLoader(true);
      control.started = true;
      setRevealed(true);
    }
  }, []);

  const handleReady = useCallback(() => setReady(true), []);
  const handleDone = useCallback(() => {
    introSeen = true;
    control.started = true;
    setRevealed(true);
  }, []);

  return (
    <main className="relative">
      <div
        className="fixed inset-0 -z-10"
        ref={bgRef}
        style={{ background: GRADIENTS[0], transition: "background 1.2s cubic-bezier(0.65,0,0.35,1)" }}
        aria-hidden="true"
      />

      <div ref={dimRef} className="fixed inset-0 z-0 pointer-events-none">
        <GravityCanvas ballColor={BALL_COLOR} onReady={handleReady} />
      </div>

      {!skipLoader && <Loader ready={ready} onDone={handleDone} />}
      <Header revealed={revealed} />

      <Hero revealed={revealed} />
      <Drop />
      <Shape />
      <Release />
      <Work />
      <Included />
      <About />
      <Reviews />
      <Plans />
      <Contact />
      <Footer />

    </main>
  );
}

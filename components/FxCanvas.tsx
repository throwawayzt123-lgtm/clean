"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { control } from "@/lib/shared";
import { fxHandlers } from "@/lib/fx";

type Ball = { x: number; y: number; vx: number; vy: number; r: number; col: number; glass: boolean; life: number; max: number; rot: number };
type Spark = { x: number; y: number; s: number; life: number; max: number; rot: number };
type Trail = { x: number; y: number; vx: number; vy: number; r: number; life: number; max: number; phase: number };
type Mote = { x: number; y: number; z: number; r: number; vx: number; vy: number; phase: number };

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * Full-screen 2D overlay (pointer-events: none):
 *  - drifting dust motes that get swept by scroll speed and wiped by the cursor
 *  - a playful 2D ball pit (click bursts, ball rain, cleaned-photo pops) that bounces, collides, gets shoved by the cursor and shaken by scrolling
 *  - soap-bubble cursor trail and cleaning sparkles
 * Active once the sphere field has been released (progress > ~3), so the whole remaining page keeps the "residue".
 */
export default function FxCanvas() {
  const pathname = usePathname();
  const onHome = useRef(pathname === "/");
  onHome.current = pathname === "/";
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const balls: Ball[] = [];
    const sparks: Spark[] = [];
    const trail: Trail[] = [];
    const isMobile = w < 768;
    const motes: Mote[] = Array.from({ length: isMobile ? 18 : 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: 0.3 + Math.random() * 0.9,
      r: 0.6 + Math.random() * 1.9,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -0.05 - Math.random() * 0.12,
      phase: Math.random() * Math.PI * 2,
    }));

    const cursor = { x: -999, y: -999, lx: -999, ly: -999, speed: 0 };
    let trailAcc = 0;

    // ---- spawners ----
    const COLORS = [
      [223, 254, 18], [223, 254, 18], [239, 255, 105], [169, 201, 0], [235, 235, 235], [60, 60, 60],
    ];
    const CAP = isMobile ? 7 : 22;
    const addBall = (x: number, y: number, vx: number, vy: number, r?: number) => {
      balls.push({
        x, y, vx, vy,
        r: r ?? (isMobile ? 7 : 13) + Math.random() * (isMobile ? 8 : 20),
        col: Math.floor(Math.random() * COLORS.length),
        glass: Math.random() < 0.28,
        life: 0,
        max: 1500 + Math.random() * 900, // ~25–40s on the floor, then they pop away
        rot: Math.random() * 6.28,
      });
      // keep the pit tidy: oldest balls start shrinking away
      if (balls.length > CAP) {
        const o = balls.find((q) => q.life < q.max - 40);
        if (o) o.life = o.max - 40;
      }
    };
    // burst of balls fountaining up out of a point (clicks, cleaned photos)
    const splash = (x: number, y: number, count: number, power: number) => {
      const n = Math.max(2, Math.round(count / 7));
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.8;
        const sp = (7 + Math.random() * 9) * Math.min(1.2, 0.6 + power * 0.5);
        addBall(x, y, Math.cos(a) * sp, Math.sin(a) * sp);
      }
    };
    // ball rain from above (when the hero field is released)
    const curtain = () => {
      const n = isMobile ? 3 : 10;
      for (let i = 0; i < n; i++) {
        addBall(Math.random() * w, -30 - Math.random() * h * 0.9, (Math.random() - 0.5) * 3, 2 + Math.random() * 4);
      }
    };
    const sparkle = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        sparks.push({
          x: x + (Math.random() - 0.5) * 90,
          y: y + (Math.random() - 0.5) * 90,
          s: 6 + Math.random() * 12,
          life: -Math.random() * 18,
          max: 42 + Math.random() * 22,
          rot: Math.random() * 0.8,
        });
      }
    };
    fxHandlers.splash = splash;
    fxHandlers.curtain = curtain;
    fxHandlers.sparkle = sparkle;

    // ---- input ----
    const onMove = (e: PointerEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };
    const onDown = (e: PointerEvent) => {
      if (onHome.current && !control.started) return;
      splash(e.clientX, e.clientY, 21, 1);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);

    // ---- loop ----
    let raf = 0;
    let lastScroll = window.scrollY;
    let scrollV = 0;
    let curtainArmed = true;

    const drawBubble = (x: number, y: number, r: number, a: number) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${0.12 * a})`;
      ctx.fill();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = `rgba(255,255,255,${0.85 * a})`;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, r * 0.72, Math.PI * 1.1, Math.PI * 1.55);
      ctx.strokeStyle = `rgba(255,255,255,${0.95 * a})`;
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, r * 0.86, Math.PI * 0.1, Math.PI * 0.45);
      ctx.strokeStyle = `rgba(160,190,255,${0.55 * a})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      // other pages have no scroll-driven intro: the bubble/dust effects are simply always on
      const progress = onHome.current ? control.progress : 3.5;
      const f = smooth(2.9, 3.5, progress);

      // scroll velocity (px / frame, smoothed)
      const sy = window.scrollY;
      scrollV += ((sy - lastScroll) - scrollV) * 0.18;
      lastScroll = sy;

      // ball rain when the field is released (re-arms when scrolling back up)
      if (onHome.current && progress > 3.3 && curtainArmed && control.started) { curtainArmed = false; curtain(); }
      if (progress < 2.8) curtainArmed = true;

      cursor.speed = Math.hypot(cursor.x - cursor.lx, cursor.y - cursor.ly);

      // soap-bubble trail
      if (f > 0.3 && cursor.x > -900) {
        trailAcc += cursor.speed;
        if (trailAcc > 16) {
          trailAcc = 0;
          trail.push({
            x: cursor.x + (Math.random() - 0.5) * 8,
            y: cursor.y + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 0.5,
            vy: -0.35 - Math.random() * 0.5,
            r: 3 + Math.random() * 7,
            life: 0,
            max: 80 + Math.random() * 50,
            phase: Math.random() * 6.28,
          });
        }
      }
      cursor.lx = cursor.x;
      cursor.ly = cursor.y;

      ctx.clearRect(0, 0, w, h);

      // ---- dust motes: swept by scroll, wiped by cursor ----
      if (f > 0.01) {
        const t = performance.now() / 1000;
        for (const m of motes) {
          m.x += m.vx + Math.sin(t * 0.5 + m.phase) * 0.12 - scrollV * 0.05 * m.z;
          m.y += m.vy - scrollV * 0.55 * m.z;
          // cursor wipe
          const dx = m.x - cursor.x, dy = m.y - cursor.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 120 * 120 && d2 > 1) {
            const d = Math.sqrt(d2);
            const push = (1 - d / 120) * 3.2;
            m.x += (dx / d) * push;
            m.y += (dy / d) * push;
          }
          if (m.y < -10) { m.y = h + 10; m.x = Math.random() * w; }
          if (m.y > h + 10) { m.y = -10; m.x = Math.random() * w; }
          if (m.x < -10) m.x = w + 10;
          if (m.x > w + 10) m.x = -10;

          const a = f * (0.12 + m.z * 0.25);
          const streak = Math.min(26, Math.abs(scrollV) * 1.6 * m.z);
          ctx.strokeStyle = `rgba(223,254,18,${a})`;
          ctx.fillStyle = `rgba(223,254,18,${a})`;
          if (streak > 2) {
            ctx.lineWidth = m.r;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(m.x, m.y + Math.sign(scrollV) * streak);
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.arc(m.x, m.y, m.r * 0.7, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // ---- playful ball pit: gravity, bounce, collisions, cursor push, scroll shake ----
      const shake = Math.min(1, Math.abs(scrollV) / 22);
      for (let i = balls.length - 1; i >= 0; i--) {
        const p = balls[i];
        p.life++;
        if (p.life >= p.max) { balls.splice(i, 1); continue; }
        p.vy += 0.5;
        p.vx *= 0.998;
        // scrolling kicks the pile up and sideways
        if (shake > 0.03 && p.y > h - p.r - 14) {
          p.vy -= shake * (4 + Math.random() * 7);
          p.vx += (Math.random() - 0.5) * shake * 7;
        }
        // cursor shoves balls around
        const dx = p.x - cursor.x, dy = p.y - cursor.y;
        const rr = p.r + 46;
        const d2 = dx * dx + dy * dy;
        if (d2 < rr * rr && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const k = (1 - d / rr) * (1.2 + Math.min(10, cursor.speed) * 0.35);
          p.vx += (dx / d) * k;
          p.vy += (dy / d) * k - 0.2;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vx * 0.02;
        if (p.x < p.r) { p.x = p.r; p.vx = Math.abs(p.vx) * 0.7; }
        if (p.x > w - p.r) { p.x = w - p.r; p.vx = -Math.abs(p.vx) * 0.7; }
        if (p.y > h - p.r) {
          p.y = h - p.r;
          p.vy = -Math.abs(p.vy) * 0.62;
          p.vx *= 0.96;
          if (Math.abs(p.vy) < 1.2) p.vy = 0;
        }
      }
      // ball-ball collisions (2 passes)
      for (let it = 0; it < 2; it++) {
        for (let i = 0; i < balls.length; i++) {
          const a = balls[i];
          for (let j = i + 1; j < balls.length; j++) {
            const b = balls[j];
            const dx = b.x - a.x, dy = b.y - a.y;
            const min = a.r + b.r;
            const d2 = dx * dx + dy * dy;
            if (d2 >= min * min || d2 < 0.0001) continue;
            const d = Math.sqrt(d2);
            const nx = dx / d, ny = dy / d;
            const ma = a.r * a.r, mb = b.r * b.r;
            const push = (min - d);
            a.x -= nx * push * (mb / (ma + mb));
            a.y -= ny * push * (mb / (ma + mb));
            b.x += nx * push * (ma / (ma + mb));
            b.y += ny * push * (ma / (ma + mb));
            const rv = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
            if (rv < 0) {
              const imp = -(1 + 0.55) * rv / (1 / ma + 1 / mb);
              a.vx -= (imp * nx) / ma; a.vy -= (imp * ny) / ma;
              b.vx += (imp * nx) / mb; b.vy += (imp * ny) / mb;
            }
          }
        }
      }
      for (const p of balls) {
        const left = p.max - p.life;
        const sc = Math.min(1, left / 40) * Math.min(1, 0.4 + p.life / 12);
        const r = p.r * sc;
        if (r < 0.5) continue;
        const [cr, cg, cb] = COLORS[p.col];
        // soft contact shadow
        ctx.beginPath();
        ctx.ellipse(p.x, Math.min(h - 1, p.y + r * 0.95), r * 0.8, r * 0.18, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(223,254,18,0.06)";
        ctx.fill();
        const g = ctx.createRadialGradient(p.x - r * 0.35, p.y - r * 0.4, r * 0.1, p.x, p.y, r);
        if (p.glass) {
          g.addColorStop(0, "rgba(255,255,255,0.75)");
          g.addColorStop(0.55, `rgba(${cr},${cg},${cb},0.18)`);
          g.addColorStop(1, `rgba(${cr},${cg},${cb},0.42)`);
        } else {
          g.addColorStop(0, `rgba(${Math.min(255, cr + 90)},${Math.min(255, cg + 90)},${Math.min(255, cb + 90)},0.98)`);
          g.addColorStop(0.55, `rgba(${cr},${cg},${cb},0.95)`);
          g.addColorStop(1, `rgba(${cr * 0.55 | 0},${cg * 0.55 | 0},${cb * 0.55 | 0},0.95)`);
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = p.glass ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)";
        ctx.stroke();
        // glossy highlight
        ctx.beginPath();
        ctx.ellipse(p.x - r * 0.32, p.y - r * 0.4, r * 0.28, r * 0.17, -0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.fill();
      }

      // ---- cursor soap-bubble trail ----
      for (let i = trail.length - 1; i >= 0; i--) {
        const b = trail[i];
        b.life++;
        const k = b.life / b.max;
        if (k >= 1) { trail.splice(i, 1); continue; }
        b.x += b.vx + Math.sin(b.life * 0.07 + b.phase) * 0.35;
        b.y += b.vy;
        drawBubble(b.x, b.y, b.r * (0.7 + 0.3 * Math.min(1, b.life / 14)), (1 - k) * f);
      }

      // ---- sparkles ----
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life++;
        if (s.life < 0) continue;
        const k = s.life / s.max;
        if (k >= 1) { sparks.splice(i, 1); continue; }
        const pulse = Math.sin(k * Math.PI);
        const L = s.s * pulse;
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot + k * 0.8);
        ctx.shadowColor = "rgba(255,255,255,0.9)";
        ctx.shadowBlur = 10;
        ctx.strokeStyle = `rgba(255,255,255,${0.95 * pulse})`;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-L, 0); ctx.lineTo(L, 0);
        ctx.moveTo(0, -L); ctx.lineTo(0, L);
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-L * 0.5, -L * 0.5); ctx.lineTo(L * 0.5, L * 0.5);
        ctx.moveTo(-L * 0.5, L * 0.5); ctx.lineTo(L * 0.5, -L * 0.5);
        ctx.stroke();
        ctx.restore();
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      fxHandlers.splash = undefined;
      fxHandlers.curtain = undefined;
      fxHandlers.sparkle = undefined;
    };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 z-20 pointer-events-none" aria-hidden="true" />;
}

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  r: number;
  p: number;
  s: number;
};

export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stars: Star[] = [];
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth || window.innerWidth;
      h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars.length = 0;
      const count = Math.min(280, Math.floor((w * h) / 4200));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random(),
          r: Math.random() * 1.15 + 0.2,
          p: Math.random() * Math.PI * 2,
          s: 0.35 + Math.random() * 1.5,
        });
      }
    };

    const onMove = (event: PointerEvent) => {
      mouse.tx = (event.clientX / w - 0.5) * 18;
      mouse.ty = (event.clientY / h - 0.5) * 14;
    };

    const draw = () => {
      t += 0.016;
      mouse.x += (mouse.tx - mouse.x) * 0.045;
      mouse.y += (mouse.ty - mouse.y) * 0.045;
      ctx.clearRect(0, 0, w, h);
      for (const star of stars) {
        const x = star.x + mouse.x * star.z;
        const y = star.y + mouse.y * star.z;
        const twinkle = reduce
          ? 0.75
          : 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * star.s + star.p));
        const alpha = (0.2 + star.z * 0.8) * twinkle;
        ctx.fillStyle = `rgba(231, 228, 218, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, star.r * (0.55 + star.z * 0.7), 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
